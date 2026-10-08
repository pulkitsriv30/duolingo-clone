from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, JSON
from sqlalchemy.orm import relationship
from database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    display_name = Column(String, default="Learner")
    streak = Column(Integer, default=0)
    xp = Column(Integer, default=0)
    hearts = Column(Integer, default=5)
    gems = Column(Integer, default=0)
    last_active = Column(String, nullable=True)   # ISO date string YYYY-MM-DD
    daily_xp = Column(Integer, default=0)         # XP earned today
    daily_goal = Column(Integer, default=50)      # daily XP target
    completed_skills = Column(JSON, default=list) # list of skill IDs


class Unit(Base):
    __tablename__ = "units"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    order = Column(Integer)
    description = Column(String)
    color = Column(String, default="bg-emerald-500")
    language = Column(String, default="Spanish")

    skills = relationship("Skill", back_populates="unit", order_by="Skill.order")


class Skill(Base):
    __tablename__ = "skills"

    id = Column(Integer, primary_key=True, index=True)
    unit_id = Column(Integer, ForeignKey("units.id"))
    title = Column(String)
    order = Column(Integer)
    icon = Column(String, default="⭐")
    color = Column(String, default="bg-yellow-400")

    unit = relationship("Unit", back_populates="skills")
    lessons = relationship("Lesson", back_populates="skill", order_by="Lesson.order")


class Lesson(Base):
    __tablename__ = "lessons"

    id = Column(Integer, primary_key=True, index=True)
    skill_id = Column(Integer, ForeignKey("skills.id"))
    order = Column(Integer)

    skill = relationship("Skill", back_populates="lessons")
    exercises = relationship("Exercise", back_populates="lesson", order_by="Exercise.id")


class Exercise(Base):
    __tablename__ = "exercises"

    id = Column(Integer, primary_key=True, index=True)
    lesson_id = Column(Integer, ForeignKey("lessons.id"))
    # types: multiple_choice | translate | type_answer | fill_blank | match_pairs
    type = Column(String)
    question = Column(String)
    options = Column(JSON)   # varies by type; stored as JSON
    answer = Column(String)

    lesson = relationship("Lesson", back_populates="exercises")
