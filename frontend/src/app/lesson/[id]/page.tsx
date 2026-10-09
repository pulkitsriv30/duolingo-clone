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
      1: [
        {
          id: 101,
          type: 'multiple_choice',
          question: 'Which one of these is "suitcase"?',
          options: '["casa", "leche", "maleta"]',
          answer: 'maleta',
        },
        {
          id: 102,
          type: 'translate',
          question: 'The woman drinks water.',
          options: '["la", "mujer", "bebe", "agua", "el", "hombre", "come"]',
          answer: 'la mujer bebe agua',
        },
        {
          id: 103,
          type: 'type_answer',
          question: "Type the Spanish word for 'water'",
          options: '[]',
          answer: 'agua',
        },
        {
          id: 104,
          type: 'fill_blank',
          question: 'El hombre ___ pan.',
          options: '["come", "bebe", "es", "tiene"]',
          answer: 'come',
        },
        {
          id: 105,
          type: 'match_pairs',
          question: 'Match the pairs',
          options: '[{"left":"woman","right":"mujer"},{"left":"man","right":"hombre"},{"left":"water","right":"agua"},{"left":"bread","right":"pan"}]',
          answer: 'pairs',
        },
      ],
      2: [
        {
          id: 201,
          type: 'multiple_choice',
          question: "How do you say 'Good morning' in Spanish?",
          options: '["Buenos días", "Buenas noches", "Buenas tardes", "Hola"]',
          answer: 'Buenos días',
        },
        {
          id: 202,
          type: 'translate',
          question: 'How are you?',
          options: '["¿Cómo", "estás", "tú", "te", "llamas", "?", "¿Qué"]',
          answer: '¿Cómo estás?',
        },
        {
          id: 203,
          type: 'type_answer',
          question: "Type the Spanish word for 'goodbye'",
          options: '[]',
          answer: 'adiós',
        },
      ],
    };

    lesson = {
      id: skillId || 1,
      skill_id: skillId || 1,
      order: 1,
      exercises: fallbackExercises[skillId] || fallbackExercises[1],
    };
  }

  return (
    <div className="fixed inset-0 bg-white dark:bg-[#131f24] z-50 flex flex-col overflow-y-auto">
      <LessonPlayer lesson={lesson} skillId={skillId} mode={mode} />
    </div>
  );
}
