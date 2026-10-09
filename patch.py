
import sys, re
with open('fallback.json', 'r', encoding='utf-16') as f:
    json_data = f.read()

path = 'frontend/src/app/lesson/[id]/page.tsx'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

new_content = re.sub(r'const fallbackExercises: Record<number, any\[\]> = \{[\s\S]*?\};', 'const fallbackExercises: Record<number, any[]> = ' + json_data + ';', content)

with open(path, 'w', encoding='utf-8') as f:
    f.write(new_content)

