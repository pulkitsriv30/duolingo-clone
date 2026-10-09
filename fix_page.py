import re

path = 'frontend/src/app/page.tsx'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

if 'from "next/headers"' not in content and "from 'next/headers'" not in content:
    content = content.replace("import Link from 'next/link';", "import { cookies } from 'next/headers';\nimport Link from 'next/link';")

if 'const cookieStore =' not in content:
    content = re.sub(
        r'export default async function Home\(\) \{',
        'export default async function Home() {\n  const cookieStore = cookies();\n  const localCompleted = cookieStore.getAll().filter(c => c.name.startsWith("completed_")).map(c => parseInt(c.name.split("_")[1]));',
        content
    )

content = re.sub(
    r'const completedSet = new Set<number>\(user\.completed_skills as number\[\]\);',
    'const completedSet = new Set<number>([ ...(user.completed_skills as number[]), ...localCompleted ]);',
    content
)

content = re.sub(
    r'function isUnlocked\(allSkills: any\[\], index: number\): boolean \{\s*return true; // Unlocked for easy testing/demo\s*\}',
    'function isUnlocked(allSkills: any[], index: number): boolean {\n    if (index === 0) return true;\n    return completedSet.has(allSkills[index - 1].id);\n  }',
    content
)

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)
