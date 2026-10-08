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
    return (
      <div className="flex items-center justify-center min-h-screen bg-white dark:bg-[#131f24]">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h1 className="text-2xl font-extrabold text-gray-700 dark:text-white">Lesson not found</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">This skill doesn&apos;t have any exercises yet.</p>
          <a href="/" className="mt-6 inline-block bg-[#58cc02] text-white font-bold px-8 py-3 rounded-2xl">
            Go Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-white dark:bg-[#131f24] z-50 flex flex-col overflow-y-auto">
      <LessonPlayer lesson={lesson} skillId={skillId} mode={mode} />
    </div>
  );
}
