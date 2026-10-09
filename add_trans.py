import re

path = 'backend/seed.py'
with open(path, 'r', encoding='utf-8') as f:
    seed_content = f.read()

seed_content = seed_content.replace(
    '''        models.Exercise(lesson_id=l1.id, type="type_answer", question="Type the Spanish word for 'water'", options=[], answer="agua")\n    ]''',
    '''        models.Exercise(lesson_id=l1.id, type="type_answer", question="Type the Spanish word for 'water'", options=[], answer="agua"),\n        models.Exercise(lesson_id=l1.id, type="translate", question="Write this in English||La mujer bebe agua.", options=["The", "woman", "drinks", "water", "man", "eats", "apple"], answer="The woman drinks water")\n    ]'''
)
seed_content = seed_content.replace(
    '''        models.Exercise(lesson_id=l2.id, type="type_answer", question="Type the Spanish word for 'goodbye'", options=[], answer="adiós")\n    ]''',
    '''        models.Exercise(lesson_id=l2.id, type="type_answer", question="Type the Spanish word for 'goodbye'", options=[], answer="adiós"),\n        models.Exercise(lesson_id=l2.id, type="translate", question="Write this in English||¿Cómo estás tú?", options=["How", "are", "you", "What", "is", "your", "name"], answer="How are you")\n    ]'''
)
seed_content = seed_content.replace(
    '''        models.Exercise(lesson_id=l3.id, type="fill_blank", question="El ___ es grande.", options=["perro", "leche", "agua", "niña"], answer="perro")\n    ]''',
    '''        models.Exercise(lesson_id=l3.id, type="fill_blank", question="El ___ es grande.", options=["perro", "leche", "agua", "niña"], answer="perro"),\n        models.Exercise(lesson_id=l3.id, type="translate", question="Write this in English||El perro bebe agua.", options=["The", "dog", "drinks", "water", "cat", "milk", "eats"], answer="The dog drinks water")\n    ]'''
)
seed_content = seed_content.replace(
    '''        models.Exercise(lesson_id=l4.id, type="type_answer", question="Type the Spanish word for 'bread'", options=[], answer="pan")\n    ]''',
    '''        models.Exercise(lesson_id=l4.id, type="type_answer", question="Type the Spanish word for 'bread'", options=[], answer="pan"),\n        models.Exercise(lesson_id=l4.id, type="translate", question="Write this in English||Yo como una manzana.", options=["I", "eat", "an", "apple", "bread", "drink", "milk"], answer="I eat an apple")\n    ]'''
)
seed_content = seed_content.replace(
    '''        models.Exercise(lesson_id=l5.id, type="type_answer", question="Type the Spanish word for '10'", options=[], answer="diez")\n    ]''',
    '''        models.Exercise(lesson_id=l5.id, type="type_answer", question="Type the Spanish word for '10'", options=[], answer="diez"),\n        models.Exercise(lesson_id=l5.id, type="translate", question="Write this in English||Tengo tres manzanas.", options=["I", "have", "three", "apples", "dogs", "four", "are"], answer="I have three apples")\n    ]'''
)
seed_content = seed_content.replace(
    '''        models.Exercise(lesson_id=l6.id, type="type_answer", question="Type the Spanish word for 'green'", options=[], answer="verde")\n    ]''',
    '''        models.Exercise(lesson_id=l6.id, type="type_answer", question="Type the Spanish word for 'green'", options=[], answer="verde"),\n        models.Exercise(lesson_id=l6.id, type="translate", question="Write this in English||Mi libro es verde.", options=["suitcase", "book", "is", "green", "My", "blue"], answer="My book is green")\n    ]'''
)
seed_content = seed_content.replace(
    '''        models.Exercise(lesson_id=l7.id, type="fill_blank", question="El ___ llega a las diez.", options=["tren", "manzana", "perro", "agua"], answer="tren")\n    ]''',
    '''        models.Exercise(lesson_id=l7.id, type="fill_blank", question="El ___ llega a las diez.", options=["tren", "manzana", "perro", "agua"], answer="tren"),\n        models.Exercise(lesson_id=l7.id, type="translate", question="Write this in English||El aeropuerto es grande.", options=["The", "airport", "is", "big", "hotel", "small", "train"], answer="The airport is big")\n    ]'''
)
seed_content = seed_content.replace(
    '''        models.Exercise(lesson_id=l8.id, type="type_answer", question="Type the Spanish word for 'water' (used at a restaurant)", options=[], answer="agua")\n    ]''',
    '''        models.Exercise(lesson_id=l8.id, type="type_answer", question="Type the Spanish word for 'water' (used at a restaurant)", options=[], answer="agua"),\n        models.Exercise(lesson_id=l8.id, type="translate", question="Write this in English||La cuenta por favor.", options=["The", "check", "please", "menu", "waiter", "table", "thank"], answer="The check please")\n    ]'''
)

with open(path, 'w', encoding='utf-8') as f:
    f.write(seed_content)
