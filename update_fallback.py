import sqlite3
import json
import re
import subprocess

subprocess.run(['backend/venv/Scripts/python.exe', 'backend/seed.py'])

fallback = {}
conn = sqlite3.connect('backend/duolingo.db')
cur = conn.cursor()
for lesson_id in range(1, 9):
    cur.execute("SELECT id, type, question, options, answer FROM exercises WHERE lesson_id=?", (lesson_id,))
    exs = []
    for r in cur.fetchall():
        options = r[3]
        if isinstance(options, str):
            try:
                options = json.loads(options)
            except:
                pass
        
        exs.append({
            "id": r[0],
            "type": r[1],
            "question": r[2],
            "options": options,
            "answer": r[4]
        })
    fallback[lesson_id] = exs
conn.close()

fallback_json = json.dumps(fallback, indent=2, ensure_ascii=False)

path = 'frontend/src/app/lesson/[id]/page.tsx'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

new_content = re.sub(r'const fallbackExercises: Record<number, any\[\]> = \{[\s\S]*?\};\s*lesson = \{', 'const fallbackExercises: Record<number, any[]> = ' + fallback_json + ';\n\n    lesson = {', content)

with open(path, 'w', encoding='utf-8') as f:
    f.write(new_content)
