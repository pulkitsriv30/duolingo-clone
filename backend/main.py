from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List
from datetime import datetime

import models, schemas
from database import engine, get_db

# Create all DB tables if not already present
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Duolingo Clone API")

# Auto-seed database if empty (ensures cloud deployment works out-of-the-box)
@app.on_event("startup")
def auto_seed_if_empty():
    from database import SessionLocal
    db = SessionLocal()
    try:
        if db.query(models.Unit).count() == 0:
            import seed
            seed.seed_db()
    except Exception as e:
        print(f"Startup seed notice: {e}")
    finally:
        db.close()

# Allow the Next.js frontend (any origin for local dev and cloud)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ------------------------------------------------------------------ #
#  Root                                                               #
# ------------------------------------------------------------------ #

@app.get("/")
def read_root():
    return {"message": "Duolingo Clone API is running 🦉"}


# ------------------------------------------------------------------ #
#  Users                                                              #
# ------------------------------------------------------------------ #

@app.post("/users/", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = models.User(
        username=user.username,
        display_name=user.display_name or user.username,
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


@app.get("/users/{user_id}", response_model=schemas.User)
def read_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


# ------------------------------------------------------------------ #
#  Units / Skills                                                     #
# ------------------------------------------------------------------ #

@app.get("/units/", response_model=List[schemas.Unit])
def read_units(db: Session = Depends(get_db)):
    return db.query(models.Unit).order_by(models.Unit.order).all()


# ------------------------------------------------------------------ #
#  Lessons / Exercises                                                #
# ------------------------------------------------------------------ #

@app.get("/skills/{skill_id}/lesson", response_model=schemas.Lesson)
def get_lesson_for_skill(skill_id: int, db: Session = Depends(get_db)):
    lesson = (
        db.query(models.Lesson)
        .filter(models.Lesson.skill_id == skill_id)
        .order_by(models.Lesson.order)
        .first()
    )
    if not lesson:
        raise HTTPException(status_code=404, detail="Lesson not found for this skill")
    return lesson


# ------------------------------------------------------------------ #
#  Gamification                                                       #
# ------------------------------------------------------------------ #

class CompleteSkillRequest(BaseModel):
    skill_id: int
    xp: int


@app.post("/users/{user_id}/complete_skill")
def complete_skill(user_id: int, req: CompleteSkillRequest, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Mark skill as completed if not already done
    completed = list(user.completed_skills or [])
    if req.skill_id not in completed:
        completed.append(req.skill_id)
        user.completed_skills = completed

    # Add XP (total and daily)
    user.xp += req.xp
    user.daily_xp = (user.daily_xp or 0) + req.xp

    # Streak logic: if last_active was yesterday, extend streak; else reset to 1
    today_str = datetime.utcnow().date().isoformat()
    if user.last_active != today_str:
        # Increment streak (day logic; for testing we just always increment)
        user.streak = (user.streak or 0) + 1
        user.last_active = today_str

    db.commit()
    return {
        "status": "success",
        "xp": user.xp,
        "daily_xp": user.daily_xp,
        "streak": user.streak,
        "completed_skills": user.completed_skills,
    }


@app.post("/users/{user_id}/refill_hearts")
def refill_hearts(user_id: int, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    user.hearts = 5
    db.commit()
    return {"status": "success", "hearts": 5}


@app.post("/users/{user_id}/lose_heart")
def lose_heart(user_id: int, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    user.hearts = max(0, (user.hearts or 5) - 1)
    db.commit()
    return {"status": "success", "hearts": user.hearts}


# ------------------------------------------------------------------ #
#  Leaderboard                                                        #
# ------------------------------------------------------------------ #

@app.get("/leaderboard", response_model=List[schemas.User])
def get_leaderboard(db: Session = Depends(get_db)):
    return (
        db.query(models.User)
        .order_by(models.User.xp.desc())
        .limit(10)
        .all()
    )


# ------------------------------------------------------------------ #
#  Achievements & Testing Utilities                                   #
# ------------------------------------------------------------------ #

@app.get("/users/{user_id}/achievements")
def get_user_achievements(user_id: int, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    completed_count = len(user.completed_skills or [])
    streak = user.streak or 0
    xp = user.xp or 0

    achievements = [
        {
            "id": "first_lesson",
            "title": "First Step",
            "desc": "Complete your first skill",
            "icon": "🎓",
            "progress": min(completed_count, 1),
            "target": 1,
            "unlocked": completed_count >= 1,
        },
        {
            "id": "wildfire",
            "title": "Wildfire",
            "desc": "Reach a 7-day streak",
            "icon": "🔥",
            "progress": min(streak, 7),
            "target": 7,
            "unlocked": streak >= 7,
        },
        {
            "id": "sage",
            "title": "Sage",
            "desc": "Earn 500 total XP",
            "icon": "⭐",
            "progress": min(xp, 500),
            "target": 500,
            "unlocked": xp >= 500,
        },
        {
            "id": "scholar",
            "title": "Scholar",
            "desc": "Complete 3 skills",
            "icon": "📚",
            "progress": min(completed_count, 3),
            "target": 3,
            "unlocked": completed_count >= 3,
        },
        {
            "id": "heart_guard",
            "title": "Heart Guard",
            "desc": "Keep all 5 hearts",
            "icon": "❤️",
            "progress": user.hearts or 0,
            "target": 5,
            "unlocked": (user.hearts or 0) >= 5,
        },
        {
            "id": "legendary",
            "title": "Legendary Master",
            "desc": "Complete a Legendary timed challenge",
            "icon": "👑",
            "progress": 1 if completed_count >= 2 else 0,
            "target": 1,
            "unlocked": completed_count >= 2,
        },
    ]

    return {
        "user_id": user.id,
        "achievements": achievements,
        "total_unlocked": sum(1 for a in achievements if a["unlocked"]),
    }


@app.post("/users/{user_id}/simulate_day")
def simulate_day(user_id: int, db: Session = Depends(get_db)):
    """Simulates a day passing for streak testing."""
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    user.streak = (user.streak or 0) + 1
    user.daily_xp = 0  # reset daily goal for the new day
    db.commit()
    return {
        "status": "success",
        "message": f"Simulated new day! Streak incremented to {user.streak}.",
        "streak": user.streak,
        "daily_xp": user.daily_xp,
    }

