import sys, json

intro = [
    {'id': 101, 'type': 'multiple_choice', 'question': 'Which one of these is "suitcase"?', 'options': '["casa", "leche", "maleta"]', 'answer': 'maleta'},
    {'id': 102, 'type': 'translate', 'question': 'The woman drinks water.', 'options': '["la", "mujer", "bebe", "agua", "el", "hombre", "come"]', 'answer': 'la mujer bebe agua'},
    {'id': 103, 'type': 'type_answer', 'question': "Type the Spanish word for 'water'", 'options': '[]', 'answer': 'agua'},
    {'id': 104, 'type': 'fill_blank', 'question': 'El hombre ___ pan.', 'options': '["come", "bebe", "es", "tiene"]', 'answer': 'come'},
    {'id': 105, 'type': 'match_pairs', 'question': 'Match the pairs', 'options': '{"pairs":[{"left":"woman","right":"mujer"},{"left":"man","right":"hombre"},{"left":"water","right":"agua"},{"left":"bread","right":"pan"}]}', 'answer': 'matched'}
]

greet = [
    {'id': 201, 'type': 'multiple_choice', 'question': "How do you say 'Good morning' in Spanish?", 'options': '["Buenos días", "Buenas noches", "Buenas tardes", "Hola"]', 'answer': 'Buenos días'},
    {'id': 202, 'type': 'translate', 'question': 'How are you?', 'options': '["¿Cómo", "estás", "tú", "te", "llamas", "?", "¿Qué"]', 'answer': '¿Cómo estás?'},
    {'id': 203, 'type': 'type_answer', 'question': "Type the Spanish word for 'goodbye'", 'options': '[]', 'answer': 'adiós'},
    {'id': 204, 'type': 'match_pairs', 'question': 'Match the words to their translations', 'options': '{"pairs": [{"left": "Hola", "right": "Hello"}, {"left": "Adiós", "right": "Goodbye"}, {"left": "Gracias", "right": "Thank you"}, {"left": "Por favor", "right": "Please"}]}', 'answer': 'matched'}
]

animal = [
    {'id': 301, 'type': 'multiple_choice', 'question': "Which of these means 'the dog'?", 'options': '["el perro", "el gato", "el pájaro", "el pez"]', 'answer': 'el perro'},
    {'id': 302, 'type': 'translate', 'question': 'The cat drinks milk.', 'options': '["el", "gato", "bebe", "leche", "come", "la", "perro"]', 'answer': 'el gato bebe leche'},
    {'id': 303, 'type': 'fill_blank', 'question': 'El ___ es grande.', 'options': '["perro", "leche", "agua", "niña"]', 'answer': 'perro'},
    {'id': 304, 'type': 'multiple_choice', 'question': "Which of these means 'the bird'?", 'options': '["el pájaro", "el pez", "el gato", "el perro"]', 'answer': 'el pájaro'}
]

food = [
    {'id': 401, 'type': 'multiple_choice', 'question': "Which of these means 'the apple'?", 'options': '["la manzana", "el pan", "la leche", "el agua"]', 'answer': 'la manzana'},
    {'id': 402, 'type': 'translate', 'question': 'I eat bread and cheese.', 'options': '["Yo", "como", "pan", "y", "queso", "bebo", "leche"]', 'answer': 'Yo como pan y queso'},
    {'id': 403, 'type': 'type_answer', 'question': "Type the Spanish word for 'bread'", 'options': '[]', 'answer': 'pan'},
    {'id': 404, 'type': 'match_pairs', 'question': 'Match food words to translations', 'options': '{"pairs": [{"left": "manzana", "right": "apple"}, {"left": "pan", "right": "bread"}, {"left": "leche", "right": "milk"}, {"left": "queso", "right": "cheese"}]}', 'answer': 'matched'}
]

number = [
    {'id': 501, 'type': 'multiple_choice', 'question': "How do you say '3' in Spanish?", 'options': '["tres", "dos", "cuatro", "uno"]', 'answer': 'tres'},
    {'id': 502, 'type': 'fill_blank', 'question': '___ más dos son cinco.', 'options': '["Tres", "Cuatro", "Uno", "Seis"]', 'answer': 'Tres'},
    {'id': 503, 'type': 'type_answer', 'question': "Type the Spanish word for '10'", 'options': '[]', 'answer': 'diez'}
]

color = [
    {'id': 601, 'type': 'multiple_choice', 'question': "Which of these means 'blue'?", 'options': '["azul", "rojo", "verde", "amarillo"]', 'answer': 'azul'},
    {'id': 602, 'type': 'match_pairs', 'question': 'Match colors to translations', 'options': '{"pairs": [{"left": "rojo", "right": "red"}, {"left": "azul", "right": "blue"}, {"left": "verde", "right": "green"}, {"left": "amarillo", "right": "yellow"}]}', 'answer': 'matched'},
    {'id': 603, 'type': 'type_answer', 'question': "Type the Spanish word for 'green'", 'options': '[]', 'answer': 'verde'}
]

travel = [
    {'id': 701, 'type': 'multiple_choice', 'question': "How do you say 'the airport'?", 'options': '["el aeropuerto", "el hotel", "el tren", "el autobús"]', 'answer': 'el aeropuerto'},
    {'id': 702, 'type': 'translate', 'question': 'Where is the hotel?', 'options': '["¿Dónde", "está", "el", "hotel", "aeropuerto", "?", "tren"]', 'answer': '¿Dónde está el hotel?'},
    {'id': 703, 'type': 'fill_blank', 'question': 'El ___ llega a las diez.', 'options': '["tren", "manzana", "perro", "agua"]', 'answer': 'tren'}
]

restaurant = [
    {'id': 801, 'type': 'multiple_choice', 'question': "How do you say 'the menu'?", 'options': '["el menú", "la cuenta", "el mesero", "la mesa"]', 'answer': 'el menú'},
    {'id': 802, 'type': 'translate', 'question': 'I would like the chicken please.', 'options': '["Quisiera", "el", "pollo", "por", "favor", "la", "carne", "gracias"]', 'answer': 'Quisiera el pollo por favor'},
    {'id': 803, 'type': 'type_answer', 'question': "Type the Spanish word for 'water' (used at a restaurant)", 'options': '[]', 'answer': 'agua'}
]

out = {1: intro, 2: greet, 3: animal, 4: food, 5: number, 6: color, 7: travel, 8: restaurant}
print(json.dumps(out, indent=2, ensure_ascii=False))
