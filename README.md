# Duolingo Web App Clone

A functional, full-stack clone of the Duolingo web application built as an SDE Fullstack Assignment.

## Tech Stack

| Layer    | Technology                                         |
|----------|----------------------------------------------------|
| Frontend | Next.js 16 (App Router, TypeScript), Tailwind CSS  |
| Backend  | Python 3.13, FastAPI, Uvicorn                      |
| Database | SQLite via SQLAlchemy ORM                          |
| Fonts    | Nunito (closest free match to Duolingo's rounded font) |
| Icons    | Lucide React                                       |
| Audio    | Web Speech API (TTS) + Web Audio API (Synthesizer) |

---

## Features Implemented

### Core Features (Must Have)
1. **Learning Path / Skill Tree**
   - Winding zig-zag visual path of units and skills
   - Lock/unlock progression: skills unlock sequentially as previous ones are completed
   - Completed (gold), available (green), and locked (gray) states
   - Top stats bar showing Streak (🔥), Gems (💎), Hearts (❤️), and Daily XP Goal progress

2. **Lesson Player (The Core Loop)**
   - Sequence of exercises with dynamic progress bar
   - 5 distinct exercise types:
     - **Multiple Choice** (2-column responsive grid)
     - **Translate** (tap-the-words sentence builder with dimming used words)
     - **Type the Answer** (text input with case-insensitive validation)
     - **Fill in the Blank** (contextual blank with selectable word chips)
     - **Match Pairs** (interactive 2-column vocabulary matching with wrong-flash animation)
   - Signature animated bottom feedback bar (green for correct, red with answer for incorrect)
   - Hearts mechanic: lose a heart on wrong answer; out-of-hearts modal with free refill
   - Completion screen awarding XP and updating backend state

3. **Gamification & Progress**
   - Streak counter that tracks daily activity
   - Daily activity / streak simulation testing tool (`/users/{id}/simulate_day`)
   - Daily XP goal bar in TopBar and right-side widget
   - Hearts regeneration via `/users/{id}/refill_hearts`
   - Real persistent user state (XP, streak, hearts, completed skills) in SQLite

4. **Content Management**
   - Course content (3 units, 8 skills, lessons, 27+ exercises) stored in SQLite and seeded
   - Spanish language curriculum with varied vocabulary
   - Learner profile page with stats and badges

5. **Duolingo Experience**
   - Duolingo color palette and styling (bouncy 3D buttons, mascot flourishes)
   - Celebratory modals and states
   - Keyboard accessibility: press **Enter** to Check / Continue

---

### Bonus Features (All Implemented)
- [x] **Audio for exercises**:
  - Native **Web Speech API** text-to-speech for Spanish pronunciation
  - Interactive speaker button (🔊) on exercise questions
  - Native **Web Audio API** synthesized chimes: ascending two-tone for correct, low buzz for wrong, celebratory fanfare for lesson completion, and subtle pop on word chip taps
- [x] **Achievements / badges system**:
  - Dynamic backend evaluation endpoint (`/users/{id}/achievements`)
  - Badges include: First Step (🎓), Wildfire (🔥 7-day streak), Sage (⭐ 500 XP), Scholar (📚 3 skills), Heart Guard (❤️ 5 hearts), Legendary Master (👑)
  - Interactive progress bars on locked badges and gold checkmarks on unlocked ones
- [x] **Real functioning leaderboard**:
  - Ranked leaderboard with seeded learners sorted by live XP
  - Duolingo League tier ("Bronze League") with shield emblem
  - Top 3 "Promotion Zone" indicators and medals (🥇🥈🥉)
  - Current user highlighted with "You" badge
- [x] **Timed practice / "Legendary" challenge mode**:
  - Accessible via the "👑" crown button on completed skills, the sidebar, or `/lesson/1?mode=legendary`
  - 60-second countdown timer with animated clock
  - High-stakes purple Legendary styling
  - Awards **+40 XP** on completion
  - Time's Up modal with retry option
- [x] **Dark mode**:
  - Complete Duolingo dark theme palette (charcoal `#131f24`, cards `#182228`, borders `#2b3940`)
  - Toggle button in TopBar and in Settings
  - Persisted in browser `localStorage`
- [x] **Responsive design**:
  - Fully responsive across mobile, tablet, and desktop
  - Desktop: Left sidebar navigation + center skill path + right widgets column
  - Mobile: Sticky bottom navigation bar (auto-hides inside lessons) + compact top stats bar

---

## Project Structure

```
duolingo-clone/
├── backend/
│   ├── main.py         # FastAPI application with gamification & achievements APIs
│   ├── models.py       # SQLAlchemy ORM models (User, Unit, Skill, Lesson, Exercise)
│   ├── schemas.py      # Pydantic schemas
│   ├── database.py     # SQLite connection & session maker
│   └── seed.py         # Seed script with units, skills, exercises, and learners
│
└── frontend/
    └── src/
        ├── app/
        │   ├── layout.tsx          # Root layout with Nunito font & responsive navigation
        │   ├── globals.css         # Duolingo CSS variables, dark mode & animations
        │   ├── page.tsx            # Learning path / Skill tree + widgets
        │   ├── lesson/[id]/page.tsx# Lesson page (standard and timed legendary modes)
        │   ├── leaderboard/page.tsx# Leaderboard with leagues & promotion zone
        │   ├── profile/page.tsx    # User stats & backend-driven achievements
        │   └── settings/page.tsx   # Account, audio, appearance & developer tools
        ├── components/
        │   ├── LessonPlayer.tsx    # Interactive lesson loop with audio & timer
        │   ├── Sidebar.tsx         # Desktop navigation sidebar
        │   ├── TopBar.tsx          # Sticky stats bar with dark mode toggle
        │   ├── MobileBottomBar.tsx # Mobile bottom navigation
        │   ├── ThemeToggle.tsx     # Dark/light mode switcher
        │   ├── TestSimulateWidget.tsx # Developer tool to test streak simulation
        │   └── exercises/
        │       ├── MultipleChoiceExercise.tsx
        │       ├── TranslateExercise.tsx
        │       ├── TypeAnswerExercise.tsx
        │       ├── FillBlankExercise.tsx
        │       └── MatchPairsExercise.tsx
        └── lib/
            ├── api.ts              # Typed API helpers
            └── audio.ts            # Web Speech TTS & Web Audio chime synthesizers
```

---

## API Overview

| Method | Path                                 | Description                          |
|--------|--------------------------------------|--------------------------------------|
| GET    | `/`                                  | Health check                         |
| GET    | `/units/`                            | Units with skills and exercises      |
| GET    | `/users/{id}`                        | Fetch user stats                     |
| POST   | `/users/`                            | Create a user                        |
| GET    | `/skills/{id}/lesson`                | Lesson & exercises for a skill       |
| POST   | `/users/{id}/complete_skill`         | Award XP, mark complete, advance day |
| POST   | `/users/{id}/refill_hearts`          | Restore user hearts to 5             |
| POST   | `/users/{id}/lose_heart`             | Decrement a heart                    |
| GET    | `/leaderboard`                       | Top learners ranked by XP            |
| GET    | `/users/{id}/achievements`           | Dynamic achievements evaluation     |
| POST   | `/users/{id}/simulate_day`           | Advance day to test streak logic     |

---

## How to Run Locally

### Backend
```bash
cd backend
.\venv\Scripts\activate      # Windows (or source venv/bin/activate on Mac/Linux)
pip install fastapi uvicorn sqlalchemy pydantic
python seed.py               # Seeds the database with units, skills, exercises, learners
uvicorn main:app --port 8000 --reload
```
Runs at `http://localhost:8000`.

### Frontend
```bash
cd frontend
npm install
npm run dev
```
Runs at `http://localhost:3000`.

---

## Deployment Guide

### 1. Push Code to GitHub

```bash
# In the root repository folder
git add .
git commit -m "Complete Duolingo clone with gamification, lesson player, and 3D mascot"
git branch -M main
git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/<YOUR_REPO_NAME>.git
git push -u origin main
```

### 2. Deploy Backend (Render / Railway)

#### Option A: Render (Free Tier)
1. Go to [render.com](https://render.com) and log in with GitHub.
2. Click **New +** -> **Web Service**.
3. Select your repository.
4. Configure:
   - **Name**: `duolingo-clone-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. Click **Deploy Web Service**.
6. Once deployed, copy your backend URL: e.g. `https://duolingo-clone-backend.onrender.com`.

#### Option B: Railway
1. Go to [railway.app](https://railway.app) and click **New Project** -> **Deploy from GitHub repo**.
2. Set Root Directory to `/backend`.
3. Railway automatically detects `requirements.txt` and `Procfile`.
4. Generate domain under Settings and copy the URL.

---

### 3. Deploy Frontend (Vercel)

1. Go to [vercel.com](https://vercel.com) and log in with GitHub.
2. Click **Add New...** -> **Project**.
3. Import your GitHub repository.
4. In Project Settings:
   - **Framework Preset**: `Next.js`
   - **Root Directory**: Click Edit and select `frontend`
   - **Environment Variables**:
     - Key: `NEXT_PUBLIC_API_URL`
     - Value: `https://your-backend-url.onrender.com` (your deployed backend URL from Step 2)
5. Click **Deploy**.
6. In ~1 minute, your live site will be ready at `https://your-duolingo-app.vercel.app`!

