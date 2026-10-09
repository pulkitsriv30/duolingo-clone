
import sys, re
with open('backend/seed.py', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('json.dumps(', '')
content = re.sub(r'(\],?\s*)answer=', r'\1answer=', content) # this doesn't remove the closing paren
# Actually let's just do a regex replace
content = re.sub(r'options=json\.dumps\((.*?)\), answer=', r'options=\1, answer=', content)

with open('backend/seed.py', 'w', encoding='utf-8') as f:
    f.write(content)

