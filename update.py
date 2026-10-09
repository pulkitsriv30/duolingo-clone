import os, json, re

seed_content = """
import json
from database import engine, Base
import models

def seed_db():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)

    from database import SessionLocal
    db = SessionLocal()

    u1 = models.User(username="learner123", display_name="Alex", streak=1, xp=10, hearts=5, gems=505, completed_skills=[1, 2])
    db.add(u1)
    db.commit()

    unit1 = models.Unit(title="Unit 1", order=1, description="Form basic sentences, greet people", color="bg-[#58cc02]")
    unit2 = models.Unit(title="Unit 2", order=2, description="Get around in a city", color="bg-[#ce82ff]")
    unit3 = models.Unit(title="Unit 3", order=3, description="Order food and drinks", color="bg-[#00cd9c]")
    db.add_all([unit1, unit2, unit3])
    db.commit()

    s1 = models.Skill(unit_id=unit1.id, title="Intro", order=1, icon="⭐", color="bg-[#58cc02]")
    s2 = models.Skill(unit_id=unit1.id, title="Greetings", order=2, icon="⭐", color="bg-[#58cc02]")
    s3 = models.Skill(unit_id=unit1.id, title="Chest", order=3, icon="🎁", color="bg-[#58cc02]")
    s4 = models.Skill(unit_id=unit1.id, title="Animals", order=4, icon="⭐", color="bg-[#58cc02]")
    s5 = models.Skill(unit_id=unit1.id, title="Food", order=5, icon="⭐", color="bg-[#58cc02]")
    s6 = models.Skill(unit_id=unit2.id, title="Numbers", order=6, icon="⭐", color="bg-[#ce82ff]")
    s7 = models.Skill(unit_id=unit2.id, title="Colors", order=7, icon="⭐", color="bg-[#ce82ff]")
    s8 = models.Skill(unit_id=unit3.id, title="Travel", order=8, icon="⭐", color="bg-[#00cd9c]")
    db.add_all([s1, s2, s3, s4, s5, s6, s7, s8])
    db.commit()

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

    intro_exercises = [
        models.Exercise(lesson_id=l1.id, type="multiple_choice", question="Which one of these is 'suitcase'?", options=json.dumps(["🏠 casa", "🥛 leche", "🧳 maleta"]), answer="🧳 maleta"),
        models.Exercise(lesson_id=l1.id, type="match_pairs", question="Match the pairs", options=json.dumps({"pairs": [{"left": "woman", "right": "mujer"}, {"left": "man", "right": "hombre"}, {"left": "water", "right": "agua"}, {"left": "bread", "right": "pan"}]}), answer="matched"),
        models.Exercise(lesson_id=l1.id, type="translate", question="The woman drinks water.", options=json.dumps(["la", "mujer", "bebe", "agua", "el", "hombre", "come"]), answer="la mujer bebe agua"),
        models.Exercise(lesson_id=l1.id, type="fill_blank", question="El hombre ___ pan.", options=json.dumps(["come", "bebe", "es", "tiene"]), answer="come"),
        models.Exercise(lesson_id=l1.id, type="type_answer", question="Type the Spanish word for 'water'", options=json.dumps([]), answer="agua")
    ]

    greet_exercises = [
        models.Exercise(lesson_id=l2.id, type="multiple_choice", question="How do you say 'Good morning' in Spanish?", options=json.dumps(["🌅 Buenos días", "🌙 Buenas noches", "🌇 Buenas tardes", "👋 Hola"]), answer="🌅 Buenos días"),
        models.Exercise(lesson_id=l2.id, type="match_pairs", question="Match the words to their translations", options=json.dumps({"pairs": [{"left": "Hola", "right": "Hello"}, {"left": "Adiós", "right": "Goodbye"}, {"left": "Gracias", "right": "Thank you"}, {"left": "Por favor", "right": "Please"}]}), answer="matched"),
        models.Exercise(lesson_id=l2.id, type="translate", question="How are you?", options=json.dumps(["¿Cómo", "estás", "tú", "te", "llamas", "?", "¿Qué"]), answer="¿Cómo estás?"),
        models.Exercise(lesson_id=l2.id, type="type_answer", question="Type the Spanish word for 'goodbye'", options=json.dumps([]), answer="adiós")
    ]

    animal_exercises = [
        models.Exercise(lesson_id=l3.id, type="multiple_choice", question="Which of these means 'the dog'?", options=json.dumps(["🐶 el perro", "🐱 el gato", "🐦 el pájaro", "🐟 el pez"]), answer="🐶 el perro"),
        models.Exercise(lesson_id=l3.id, type="multiple_choice", question="Which of these means 'the bird'?", options=json.dumps(["🐦 el pájaro", "🐟 el pez", "🐱 el gato", "🐶 el perro"]), answer="🐦 el pájaro"),
        models.Exercise(lesson_id=l3.id, type="translate", question="The cat drinks milk.", options=json.dumps(["el", "gato", "bebe", "leche", "come", "la", "perro"]), answer="el gato bebe leche"),
        models.Exercise(lesson_id=l3.id, type="fill_blank", question="El ___ es grande.", options=json.dumps(["perro", "leche", "agua", "niña"]), answer="perro")
    ]

    food_exercises = [
        models.Exercise(lesson_id=l4.id, type="multiple_choice", question="Which of these means 'the apple'?", options=json.dumps(["🍎 la manzana", "🍞 el pan", "🥛 la leche", "💧 el agua"]), answer="🍎 la manzana"),
        models.Exercise(lesson_id=l4.id, type="match_pairs", question="Match food words to translations", options=json.dumps({"pairs": [{"left": "manzana", "right": "apple"}, {"left": "pan", "right": "bread"}, {"left": "leche", "right": "milk"}, {"left": "queso", "right": "cheese"}]}), answer="matched"),
        models.Exercise(lesson_id=l4.id, type="translate", question="I eat bread and cheese.", options=json.dumps(["Yo", "como", "pan", "y", "queso", "bebo", "leche"]), answer="Yo como pan y queso"),
        models.Exercise(lesson_id=l4.id, type="type_answer", question="Type the Spanish word for 'bread'", options=json.dumps([]), answer="pan")
    ]

    number_exercises = [
        models.Exercise(lesson_id=l5.id, type="multiple_choice", question="How do you say '3' in Spanish?", options=json.dumps(["3️⃣ tres", "2️⃣ dos", "4️⃣ cuatro", "1️⃣ uno"]), answer="3️⃣ tres"),
        models.Exercise(lesson_id=l5.id, type="fill_blank", question="___ más dos son cinco.", options=json.dumps(["Tres", "Cuatro", "Uno", "Seis"]), answer="Tres"),
        models.Exercise(lesson_id=l5.id, type="type_answer", question="Type the Spanish word for '10'", options=json.dumps([]), answer="diez")
    ]

    color_exercises = [
        models.Exercise(lesson_id=l6.id, type="multiple_choice", question="Which of these means 'blue'?", options=json.dumps(["🔵 azul", "🔴 rojo", "🟢 verde", "🟡 amarillo"]), answer="🔵 azul"),
        models.Exercise(lesson_id=l6.id, type="match_pairs", question="Match colors to translations", options=json.dumps({"pairs": [{"left": "rojo", "right": "red"}, {"left": "azul", "right": "blue"}, {"left": "verde", "right": "green"}, {"left": "amarillo", "right": "yellow"}]}), answer="matched"),
        models.Exercise(lesson_id=l6.id, type="type_answer", question="Type the Spanish word for 'green'", options=json.dumps([]), answer="verde")
    ]

    travel_exercises = [
        models.Exercise(lesson_id=l7.id, type="multiple_choice", question="How do you say 'the airport'?", options=json.dumps(["✈️ el aeropuerto", "🏨 el hotel", "🚆 el tren", "🚌 el autobús"]), answer="✈️ el aeropuerto"),
        models.Exercise(lesson_id=l7.id, type="translate", question="Where is the hotel?", options=json.dumps(["¿Dónde", "está", "el", "hotel", "aeropuerto", "?", "tren"]), answer="¿Dónde está el hotel?"),
        models.Exercise(lesson_id=l7.id, type="fill_blank", question="El ___ llega a las diez.", options=json.dumps(["tren", "manzana", "perro", "agua"]), answer="tren")
    ]

    restaurant_exercises = [
        models.Exercise(lesson_id=l8.id, type="multiple_choice", question="How do you say 'the menu'?", options=json.dumps(["📋 el menú", "🧾 la cuenta", "🤵 el mesero", "🍽️ la mesa"]), answer="📋 el menú"),
        models.Exercise(lesson_id=l8.id, type="translate", question="I would like the chicken please.", options=json.dumps(["Quisiera", "el", "pollo", "por", "favor", "la", "carne", "gracias"]), answer="Quisiera el pollo por favor"),
        models.Exercise(lesson_id=l8.id, type="type_answer", question="Type the Spanish word for 'water' (used at a restaurant)", options=json.dumps([]), answer="agua")
    ]

    all_exercises = intro_exercises + greet_exercises + animal_exercises + food_exercises + number_exercises + color_exercises + travel_exercises + restaurant_exercises
    db.add_all(all_exercises)
    db.commit()
    db.close()
    print('Database seeded successfully!')

if __name__ == '__main__':
    seed_db()
"""

with open('backend/seed.py', 'w', encoding='utf-8') as f:
    f.write(seed_content)

fallback = {}
lesson_map = {1: 'intro_exercises', 2: 'greet_exercises', 3: 'animal_exercises', 4: 'food_exercises', 5: 'number_exercises', 6: 'color_exercises', 7: 'travel_exercises', 8: 'restaurant_exercises'}
import sqlite3
# Assuming sqlite DB is generated from seed.py, let's re-run seed.py to update db first
import subprocess
subprocess.run(['backend/venv/Scripts/python.exe', 'backend/seed.py'])

conn = sqlite3.connect('backend/duolingo.db')
cur = conn.cursor()
for lesson_id in range(1, 9):
    cur.execute("SELECT id, type, question, options, answer FROM exercises WHERE lesson_id=?", (lesson_id,))
    exs = []
    for r in cur.fetchall():
        exs.append({
            "id": r[0],
            "type": r[1],
            "question": r[2],
            "options": r[3],
            "answer": r[4]
        })
    fallback[lesson_id] = exs
conn.close()

fallback_json = json.dumps(fallback, indent=2, ensure_ascii=False)

path = 'frontend/src/app/lesson/[id]/page.tsx'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

new_content = re.sub(r'const fallbackExercises: Record<number, any\[\]> = \{[\s\S]*?\};', 'const fallbackExercises: Record<number, any[]> = ' + fallback_json + ';', content)

with open(path, 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Successfully updated seed.py, duolingo.db, and fallback json!")
