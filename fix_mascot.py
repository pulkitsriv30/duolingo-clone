import re

path = 'frontend/src/app/page.tsx'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# Remove the static absolute mascot
content = re.sub(
    r'\{/\* ANIMATED DUO THE OWL MASCOT.*?</DuoMascot>.*?</div>\s*</div>',
    '',
    content,
    flags=re.DOTALL
)

# Wait, let's just use string replace for safety
# Actually, the original static mascot looks like this:
# {/* ANIMATED DUO THE OWL MASCOT (Placed on the path beside node 2/3 just like screenshot) */}
# <div
#   className="absolute right-4 sm:right-10 top-[140px] z-20 flex flex-col items-center pointer-events-none select-none"
#   style={{ transform: 'translateX(20px)' }}
# >
#   <DuoMascot className="w-24 h-24 sm:w-28 sm:h-28" />
# </div>

content = re.sub(
    r'\{/\* ANIMATED DUO THE OWL MASCOT.*?</DuoMascot>\s*</div>',
    '',
    content,
    flags=re.DOTALL
)

mascot_code = '''
                        {/* ANIMATED DUO THE OWL MASCOT */}
                        {isFirstActive && (
                          <div className="absolute right-[-80px] sm:right-[-120px] top-0 z-20 flex flex-col items-center pointer-events-none select-none">
                            <DuoMascot className="w-24 h-24 sm:w-28 sm:h-28" />
                          </div>
                        )}
'''

content = content.replace('{/* Floating "START" speech bubble for the active node (Authentic dark tooltip with bright green text) */}', mascot_code + '\n                        {/* Floating "START" speech bubble for the active node (Authentic dark tooltip with bright green text) */}')

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)
