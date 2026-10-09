export const dynamic = 'force-dynamic';

import { fetchLesson } from '@/lib/api';
import LessonPlayer from '@/components/LessonPlayer';

interface LessonPageProps {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ mode?: string }>;
}

export default async function LessonPage({ params, searchParams }: LessonPageProps) {
  const { id } = await params;
  const skillId = parseInt(id, 10);
  const sp = searchParams ? await searchParams : {};
  const mode = sp.mode === 'legendary' ? 'legendary' : 'standard';

  let lesson = null;
  try {
    lesson = await fetchLesson(skillId);
  } catch {
    // Resilient fallback lesson data (ensures lesson always plays even if Render backend is cold-starting)
    const fallbackExercises: Record<number, any[]> = {
  "1": [
    {
      "id": 1,
      "type": "multiple_choice",
      "question": "Which one of these is \"suitcase\"?",
      "options": "[\"casa\", \"leche\", \"maleta\"]",
      "answer": "maleta"
    },
    {
      "id": 2,
      "type": "translate",
      "question": "The woman drinks water.",
      "options": "[\"la\", \"mujer\", \"bebe\", \"agua\", \"el\", \"hombre\", \"come\"]",
      "answer": "la mujer bebe agua"
    },
    {
      "id": 3,
      "type": "type_answer",
      "question": "Type the Spanish word for 'water'",
      "options": "[]",
      "answer": "agua"
    },
    {
      "id": 4,
      "type": "fill_blank",
      "question": "El hombre ___ pan.",
      "options": "[\"come\", \"bebe\", \"es\", \"tiene\"]",
      "answer": "come"
    },
    {
      "id": 5,
      "type": "multiple_choice",
      "question": "Which of these means 'the girl'?",
      "options": "[\"la ni\u00f1a\", \"el ni\u00f1o\", \"la mujer\", \"el hombre\"]",
      "answer": "la niña"
    }
  ],
  "2": [
    {
      "id": 6,
      "type": "multiple_choice",
      "question": "How do you say 'Good morning' in Spanish?",
      "options": "[\"Buenos d\u00edas\", \"Buenas noches\", \"Buenas tardes\", \"Hola\"]",
      "answer": "Buenos días"
    },
    {
      "id": 7,
      "type": "translate",
      "question": "How are you?",
      "options": "[\"\u00bfC\u00f3mo\", \"est\u00e1s\", \"t\u00fa\", \"te\", \"llamas\", \"?\", \"\u00bfQu\u00e9\"]",
      "answer": "¿Cómo estás?"
    },
    {
      "id": 8,
      "type": "type_answer",
      "question": "Type the Spanish word for 'goodbye'",
      "options": "[]",
      "answer": "adiós"
    },
    {
      "id": 9,
      "type": "match_pairs",
      "question": "Match the words to their translations",
      "options": "{\"pairs\": [{\"left\": \"Hola\", \"right\": \"Hello\"}, {\"left\": \"Adi\u00f3s\", \"right\": \"Goodbye\"}, {\"left\": \"Gracias\", \"right\": \"Thank you\"}, {\"left\": \"Por favor\", \"right\": \"Please\"}]}",
      "answer": "matched"
    }
  ],
  "3": [
    {
      "id": 10,
      "type": "multiple_choice",
      "question": "Which of these means 'the dog'?",
      "options": "[\"el perro\", \"el gato\", \"el p\u00e1jaro\", \"el pez\"]",
      "answer": "el perro"
    },
    {
      "id": 11,
      "type": "translate",
      "question": "The cat drinks milk.",
      "options": "[\"el\", \"gato\", \"bebe\", \"leche\", \"come\", \"la\", \"perro\"]",
      "answer": "el gato bebe leche"
    },
    {
      "id": 12,
      "type": "fill_blank",
      "question": "El ___ es grande.",
      "options": "[\"perro\", \"leche\", \"agua\", \"ni\u00f1a\"]",
      "answer": "perro"
    },
    {
      "id": 13,
      "type": "multiple_choice",
      "question": "Which of these means 'the bird'?",
      "options": "[\"el p\u00e1jaro\", \"el pez\", \"el gato\", \"el perro\"]",
      "answer": "el pájaro"
    }
  ],
  "4": [
    {
      "id": 14,
      "type": "multiple_choice",
      "question": "Which of these means 'the apple'?",
      "options": "[\"la manzana\", \"el pan\", \"la leche\", \"el agua\"]",
      "answer": "la manzana"
    },
    {
      "id": 15,
      "type": "translate",
      "question": "I eat bread and cheese.",
      "options": "[\"Yo\", \"como\", \"pan\", \"y\", \"queso\", \"bebo\", \"leche\"]",
      "answer": "Yo como pan y queso"
    },
    {
      "id": 16,
      "type": "type_answer",
      "question": "Type the Spanish word for 'bread'",
      "options": "[]",
      "answer": "pan"
    },
    {
      "id": 17,
      "type": "match_pairs",
      "question": "Match food words to translations",
      "options": "{\"pairs\": [{\"left\": \"manzana\", \"right\": \"apple\"}, {\"left\": \"pan\", \"right\": \"bread\"}, {\"left\": \"leche\", \"right\": \"milk\"}, {\"left\": \"queso\", \"right\": \"cheese\"}]}",
      "answer": "matched"
    }
  ],
  "5": [
    {
      "id": 18,
      "type": "multiple_choice",
      "question": "How do you say '3' in Spanish?",
      "options": "[\"tres\", \"dos\", \"cuatro\", \"uno\"]",
      "answer": "tres"
    },
    {
      "id": 19,
      "type": "fill_blank",
      "question": "___ más dos son cinco.",
      "options": "[\"Tres\", \"Cuatro\", \"Uno\", \"Seis\"]",
      "answer": "Tres"
    },
    {
      "id": 20,
      "type": "type_answer",
      "question": "Type the Spanish word for '10'",
      "options": "[]",
      "answer": "diez"
    }
  ],
  "6": [
    {
      "id": 21,
      "type": "multiple_choice",
      "question": "Which of these means 'blue'?",
      "options": "[\"azul\", \"rojo\", \"verde\", \"amarillo\"]",
      "answer": "azul"
    },
    {
      "id": 22,
      "type": "match_pairs",
      "question": "Match colors to translations",
      "options": "{\"pairs\": [{\"left\": \"rojo\", \"right\": \"red\"}, {\"left\": \"azul\", \"right\": \"blue\"}, {\"left\": \"verde\", \"right\": \"green\"}, {\"left\": \"amarillo\", \"right\": \"yellow\"}]}",
      "answer": "matched"
    },
    {
      "id": 23,
      "type": "type_answer",
      "question": "Type the Spanish word for 'green'",
      "options": "[]",
      "answer": "verde"
    }
  ],
  "7": [
    {
      "id": 24,
      "type": "multiple_choice",
      "question": "How do you say 'the airport'?",
      "options": "[\"el aeropuerto\", \"el hotel\", \"el tren\", \"el autob\u00fas\"]",
      "answer": "el aeropuerto"
    },
    {
      "id": 25,
      "type": "translate",
      "question": "Where is the hotel?",
      "options": "[\"\u00bfD\u00f3nde\", \"est\u00e1\", \"el\", \"hotel\", \"aeropuerto\", \"?\", \"tren\"]",
      "answer": "¿Dónde está el hotel?"
    },
    {
      "id": 26,
      "type": "fill_blank",
      "question": "El ___ llega a las diez.",
      "options": "[\"tren\", \"manzana\", \"perro\", \"agua\"]",
      "answer": "tren"
    }
  ],
  "8": [
    {
      "id": 27,
      "type": "multiple_choice",
      "question": "How do you say 'the menu'?",
      "options": "[\"el men\u00fa\", \"la cuenta\", \"el mesero\", \"la mesa\"]",
      "answer": "el menú"
    },
    {
      "id": 28,
      "type": "translate",
      "question": "I would like the chicken please.",
      "options": "[\"Quisiera\", \"el\", \"pollo\", \"por\", \"favor\", \"la\", \"carne\", \"gracias\"]",
      "answer": "Quisiera el pollo por favor"
    },
    {
      "id": 29,
      "type": "type_answer",
      "question": "Type the Spanish word for 'water' (used at a restaurant)",
      "options": "[]",
      "answer": "agua"
    }
  ]
};

    lesson = {
      id: skillId || 1,
      skill_id: skillId || 1,
      order: 1,
      exercises: fallbackExercises[skillId as keyof typeof fallbackExercises] || fallbackExercises[1],
    };
  }

  return (
    <div className="fixed inset-0 bg-white dark:bg-[#131f24] z-50 flex flex-col overflow-y-auto">
      <LessonPlayer lesson={lesson} skillId={skillId} mode={mode} />
    </div>
  );
}
