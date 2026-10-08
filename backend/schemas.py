from pydantic import BaseModel
from typing import List, Optional, Any


class UserBase(BaseModel):
    username: str
    display_name: Optional[str] = "Learner"


class UserCreate(UserBase):
    pass


class User(UserBase):
    id: int
    streak: int
    xp: int
    hearts: int
    gems: int
    last_active: Optional[str] = None
    daily_xp: int
    daily_goal: int
    completed_skills: List[int]

    class Config:
        from_attributes = True


class ExerciseBase(BaseModel):
    type: str
    question: str
    options: Any
    answer: str


class Exercise(ExerciseBase):
    id: int
    lesson_id: int

    class Config:
        from_attributes = True


class LessonBase(BaseModel):
    order: int


class Lesson(LessonBase):
    id: int
    skill_id: int
    exercises: List[Exercise] = []

    class Config:
        from_attributes = True


class SkillBase(BaseModel):
    title: str
    order: int
    icon: str
    color: str


class Skill(SkillBase):
    id: int
    unit_id: int
    lessons: List[Lesson] = []

    class Config:
        from_attributes = True


class UnitBase(BaseModel):
    title: str
    order: int
    description: str
    color: str
    language: str


class Unit(UnitBase):
    id: int
    skills: List[Skill] = []

    class Config:
        from_attributes = True
