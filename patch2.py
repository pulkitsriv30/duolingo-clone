
import re

path = 'frontend/src/app/page.tsx'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

content = re.sub(
    r'const isUnlocked = \(skillsList: any\[\], idx: number\) => \{.*?return completedSet\.has\(skillsList\[idx - 1\]\.id\);\s*\};',
    'const isUnlocked = (skillsList: any[], idx: number) => { return true; };',
    content,
    flags=re.DOTALL
)

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

