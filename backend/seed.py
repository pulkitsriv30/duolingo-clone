import json
from datetime import datetime
from database import engine, SessionLocal, Base
import models


def seed_db():
    # Drop and recreate all tables fresh
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)

    db = SessionLocal()

    # --------------------------------------------------
    # USERS  (main learner + leaderboard users)
    # --------------------------------------------------
    today = datetime.utcnow().date().isoformat()

    main_user = models.User(
        username="learner123",
        display_name="Alex",
        streak=5,
        xp=320,
        hearts=4,
        gems=450,
        last_active=today,
        daily_xp=30,
        daily_goal=50,
        completed_skills=[],  # will be set after skill IDs are known
    )
    user2 = models.User(
        username="polyglot99",
        display_name="Maria",
        streak=21,
        xp=1850,
        hearts=5,
        gems=1200,
        last_active=today,
        daily_xp=50,
        daily_goal=50,
        completed_skills=[],
    )
    user3 = models.User(
        username="language_fan",
        display_name="Ryu",
        streak=3,
        xp=640,
        hearts=3,
        gems=200,
        last_active=today,
        daily_xp=10,
        daily_goal=20,
        completed_skills=[],
    )
    user4 = models.User(
        username="verbmaster",
        display_name="Sofia",
        streak=14,
        xp=980,
        hearts=5,
        gems=800,
        last_active=today,
        daily_xp=50,
        daily_goal=50,
        completed_skills=[],
    )
    user5 = models.User(
        username="hola_amigo",
        display_name="Diego",
        streak=8,
        xp=430,
        hearts=2,
        gems=100,
        last_active=today,
        daily_xp=20,
        daily_goal=30,
        completed_skills=[],
    )
    db.add_all([main_user, user2, user3, user4, user5])

    # --------------------------------------------------
    # UNITS
    # --------------------------------------------------
    unit1 = models.Unit(
        title="Unit 1",
        order=1,
        description="Basics 1",
        color="bg-emerald-500",
        language="Spanish",
    )
    unit2 = models.Unit(
        title="Unit 2",
        order=2,
        description="Phrases",
        color="bg-blue-500",
        language="Spanish",
    )
    unit3 = models.Unit(
        title="Unit 3",
        order=3,
        description="Travel",
        color="bg-purple-500",
        language="Spanish",
    )
    db.add_all([unit1, unit2, unit3])
    db.commit()

    # --------------------------------------------------
    # SKILLS
    # --------------------------------------------------
    s1  = models.Skill(unit_id=unit1.id, title="Intro",        order=1, icon="⭐",  color="bg-yellow-400")
    s2  = models.Skill(unit_id=unit1.id, title="Greetings",    order=2, icon="👋",  color="bg-orange-400")
    s3  = models.Skill(unit_id=unit1.id, title="Animals",      order=3, icon="🐶",  color="bg-pink-400")
    s4  = models.Skill(unit_id=unit2.id, title="Food",         order=1, icon="🍎",  color="bg-red-400")
    s5  = models.Skill(unit_id=unit2.id, title="Numbers",      order=2, icon="🔢",  color="bg-blue-400")
    s6  = models.Skill(unit_id=unit2.id, title="Colors",       order=3, icon="🎨",  color="bg-indigo-400")
    s7  = models.Skill(unit_id=unit3.id, title="Travel",       order=1, icon="✈️",  color="bg-teal-400")
    s8  = models.Skill(unit_id=unit3.id, title="Restaurant",   order=2, icon="🍽️",  color="bg-amber-400")
    db.add_all([s1, s2, s3, s4, s5, s6, s7, s8])
    db.commit()

    # Mark learner progress: main user completed s1 and s2
    main_user.completed_skills = [s1.id, s2.id]
    user2.completed_skills = [s1.id, s2.id, s3.id, s4.id, s5.id]
    user3.completed_skills = [s1.id, s2.id, s3.id]
    user4.completed_skills = [s1.id, s2.id, s3.id, s4.id]
    user5.completed_skills = [s1.id]
    db.commit()

    # --------------------------------------------------
    # LESSONS  (one per skill)
    # --------------------------------------------------
    l1 = models.Lesson(skill_id=s1.id, order=1)
    l2 = models.Lesson(skill_id=s2.id, order=1)
    l3 = models.Lesson(skill_id=s3.id, order=1)
    l4 = models.Lesson(skill_id=s4.id, order=1)
    l5 = models.Lesson(skill_id=s5.id, order=1)
    l6 = models.Lesson(skill_id=s6.id, order=1)
    l7 = models.Lesson(skill_id=s7.id, order=1)
    l8 = models.Lesson(skill_id=s8.id, order=1)
    db.add_all([l1, l2, l3, l4, l5, l6, l7, l8])
    db.commit()

    # --------------------------------------------------
    # EXERCISES — varied types per lesson
    # --------------------------------------------------

    # ---- LESSON 1: Intro ----
    intro_exercises = [
        models.Exercise(
            lesson_id=l1.id, type="multiple_choice",
            question='Which one of these is "suitcase"?',
            options=json.dumps(["casa", "leche", "maleta"]),
            answer="maleta"
        ),
        models.Exercise(
            lesson_id=l1.id, type="translate",
            question="The woman drinks water.",
            options=json.dumps(["la", "mujer", "bebe", "agua", "el", "hombre", "come"]),
            answer="la mujer bebe agua"
        ),
        models.Exercise(
            lesson_id=l1.id, type="type_answer",
            question="Type the Spanish word for 'water'",
            options=json.dumps([]),
            answer="agua"
        ),
        models.Exercise(
            lesson_id=l1.id, type="fill_blank",
            question="El hombre ___ pan.",  # blank = come
            options=json.dumps(["come", "bebe", "es", "tiene"]),
            answer="come"
        ),
        models.Exercise(
            lesson_id=l1.id, type="multiple_choice",
            question="Which of these means 'the girl'?",
            options=json.dumps(["la niña", "el niño", "la mujer", "el hombre"]),
            answer="la niña"
        ),
    ]

    # ---- LESSON 2: Greetings ----
    greet_exercises = [
        models.Exercise(
            lesson_id=l2.id, type="multiple_choice",
            question="How do you say 'Good morning' in Spanish?",
            options=json.dumps(["Buenos días", "Buenas noches", "Buenas tardes", "Hola"]),
            answer="Buenos días"
        ),
        models.Exercise(
            lesson_id=l2.id, type="translate",
            question="How are you?",
            options=json.dumps(["¿Cómo", "estás", "tú", "te", "llamas", "?", "¿Qué"]),
            answer="¿Cómo estás?"
        ),
        models.Exercise(
            lesson_id=l2.id, type="type_answer",
            question="Type the Spanish word for 'goodbye'",
            options=json.dumps([]),
            answer="adiós"
        ),
        models.Exercise(
            lesson_id=l2.id, type="match_pairs",
            question="Match the words to their translations",
            options=json.dumps({
                "pairs": [
                    {"left": "Hola", "right": "Hello"},
                    {"left": "Adiós", "right": "Goodbye"},
                    {"left": "Gracias", "right": "Thank you"},
                    {"left": "Por favor", "right": "Please"},
                ]
            }),
            answer="matched"
        ),
    ]

    # ---- LESSON 3: Animals ----
    animal_exercises = [
        models.Exercise(
            lesson_id=l3.id, type="multiple_choice",
            question="Which of these means 'the dog'?",
            options=json.dumps(["el perro", "el gato", "el pájaro", "el pez"]),
            answer="el perro"
        ),
        models.Exercise(
            lesson_id=l3.id, type="translate",
            question="The cat drinks milk.",
            options=json.dumps(["el", "gato", "bebe", "leche", "come", "la", "perro"]),
            answer="el gato bebe leche"
        ),
        models.Exercise(
            lesson_id=l3.id, type="fill_blank",
            question="El ___ es grande.",  # blank = perro
            options=json.dumps(["perro", "leche", "agua", "niña"]),
            answer="perro"
        ),
        models.Exercise(
            lesson_id=l3.id, type="multiple_choice",
            question="Which of these means 'the bird'?",
            options=json.dumps(["el pájaro", "el pez", "el gato", "el perro"]),
            answer="el pájaro"
        ),
    ]

    # ---- LESSON 4: Food ----
    food_exercises = [
        models.Exercise(
            lesson_id=l4.id, type="multiple_choice",
            question="Which of these means 'the apple'?",
            options=json.dumps(["la manzana", "el pan", "la leche", "el agua"]),
            answer="la manzana"
        ),
        models.Exercise(
            lesson_id=l4.id, type="translate",
            question="I eat bread and cheese.",
            options=json.dumps(["Yo", "como", "pan", "y", "queso", "bebo", "leche"]),
            answer="Yo como pan y queso"
        ),
        models.Exercise(
            lesson_id=l4.id, type="type_answer",
            question="Type the Spanish word for 'bread'",
            options=json.dumps([]),
            answer="pan"
        ),
        models.Exercise(
            lesson_id=l4.id, type="match_pairs",
            question="Match food words to translations",
            options=json.dumps({
                "pairs": [
                    {"left": "manzana", "right": "apple"},
                    {"left": "pan",     "right": "bread"},
                    {"left": "leche",   "right": "milk"},
                    {"left": "queso",   "right": "cheese"},
                ]
            }),
            answer="matched"
        ),
    ]

    # ---- LESSON 5: Numbers ----
    number_exercises = [
        models.Exercise(
            lesson_id=l5.id, type="multiple_choice",
            question="How do you say '3' in Spanish?",
            options=json.dumps(["tres", "dos", "cuatro", "uno"]),
            answer="tres"
        ),
        models.Exercise(
            lesson_id=l5.id, type="fill_blank",
            question="___ más dos son cinco.",
            options=json.dumps(["Tres", "Cuatro", "Uno", "Seis"]),
            answer="Tres"
        ),
        models.Exercise(
            lesson_id=l5.id, type="type_answer",
            question="Type the Spanish word for '10'",
            options=json.dumps([]),
            answer="diez"
        ),
    ]

    # ---- LESSON 6: Colors ----
    color_exercises = [
        models.Exercise(
            lesson_id=l6.id, type="multiple_choice",
            question="Which of these means 'blue'?",
            options=json.dumps(["azul", "rojo", "verde", "amarillo"]),
            answer="azul"
        ),
        models.Exercise(
            lesson_id=l6.id, type="match_pairs",
            question="Match colors to translations",
            options=json.dumps({
                "pairs": [
                    {"left": "rojo",     "right": "red"},
                    {"left": "azul",     "right": "blue"},
                    {"left": "verde",    "right": "green"},
                    {"left": "amarillo", "right": "yellow"},
                ]
            }),
            answer="matched"
        ),
        models.Exercise(
            lesson_id=l6.id, type="type_answer",
            question="Type the Spanish word for 'green'",
            options=json.dumps([]),
            answer="verde"
        ),
    ]

    # ---- LESSON 7: Travel ----
    travel_exercises = [
        models.Exercise(
            lesson_id=l7.id, type="multiple_choice",
            question="How do you say 'the airport'?",
            options=json.dumps(["el aeropuerto", "el hotel", "el tren", "el autobús"]),
            answer="el aeropuerto"
        ),
        models.Exercise(
            lesson_id=l7.id, type="translate",
            question="Where is the hotel?",
            options=json.dumps(["¿Dónde", "está", "el", "hotel", "aeropuerto", "?", "tren"]),
            answer="¿Dónde está el hotel?"
        ),
        models.Exercise(
            lesson_id=l7.id, type="fill_blank",
            question="El ___ llega a las diez.",
            options=json.dumps(["tren", "manzana", "perro", "agua"]),
            answer="tren"
        ),
    ]

    # ---- LESSON 8: Restaurant ----
    restaurant_exercises = [
        models.Exercise(
            lesson_id=l8.id, type="multiple_choice",
            question="How do you say 'the menu'?",
            options=json.dumps(["el menú", "la cuenta", "el mesero", "la mesa"]),
            answer="el menú"
        ),
        models.Exercise(
            lesson_id=l8.id, type="translate",
            question="I would like the chicken please.",
            options=json.dumps(["Quisiera", "el", "pollo", "por", "favor", "la", "carne", "gracias"]),
            answer="Quisiera el pollo por favor"
        ),
        models.Exercise(
            lesson_id=l8.id, type="type_answer",
            question="Type the Spanish word for 'water' (used at a restaurant)",
            options=json.dumps([]),
            answer="agua"
        ),
    ]

    all_exercises = (
        intro_exercises + greet_exercises + animal_exercises + food_exercises
        + number_exercises + color_exercises + travel_exercises + restaurant_exercises
    )
    db.add_all(all_exercises)
    db.commit()
    db.close()
    print("Database seeded successfully!")


if __name__ == "__main__":
    seed_db()
