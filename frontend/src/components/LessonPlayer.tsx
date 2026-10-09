'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { X, Heart, Check, Volume2, Timer, Crown } from 'lucide-react';
import clsx from 'clsx';
import { completeSkill, refillHearts } from '@/lib/api';
import { playSound, speakText } from '@/lib/audio';
import MatchPairsExercise from './exercises/MatchPairsExercise';
import MultipleChoiceExercise from './exercises/MultipleChoiceExercise';
import TranslateExercise from './exercises/TranslateExercise';
import FillBlankExercise from './exercises/FillBlankExercise';
import TypeAnswerExercise from './exercises/TypeAnswerExercise';

const USER_ID = 1; // mocked logged-in user

interface LessonPlayerProps {
  lesson: any;
  skillId: number;
  mode?: 'standard' | 'legendary';
}

export default function LessonPlayer({
  lesson,
  skillId,
  mode = 'standard',
}: LessonPlayerProps) {
  const router = useRouter();
  const exercises: any[] = lesson.exercises;
  const isLegendary = mode === 'legendary';
  const xpReward = isLegendary ? 40 : 15;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isChecked, setIsChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [hearts, setHearts] = useState(5);
  const [isFinished, setIsFinished] = useState(false);
  const [showOutOfHearts, setShowOutOfHearts] = useState(false);

  // Timed challenge state (60s countdown for Legendary mode)
  const [timeLeft, setTimeLeft] = useState(60);
  const [isTimeUp, setIsTimeUp] = useState(false);

  const current = exercises[currentIndex];
  const progress = Math.round((currentIndex / exercises.length) * 100);



  // Timer logic for Legendary / Timed practice
  useEffect(() => {
    if (!isLegendary || isFinished || showOutOfHearts || isTimeUp) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsTimeUp(true);
          playSound('wrong');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isLegendary, isFinished, showOutOfHearts, isTimeUp]);

  // Keyboard shortcut: Enter = Check / Continue
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Enter') handleCheck();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isChecked, selectedAnswer]);

  const handleCheck = useCallback(() => {
    if (isChecked) {
      if (currentIndex + 1 < exercises.length) {
        setCurrentIndex((i) => i + 1);
        setSelectedAnswer(null);
        setIsChecked(false);
        setIsCorrect(false);
      } else {
        finishLesson();
      }
      return;
    }

    if (!selectedAnswer) return;

    let correct = false;
    if (current.type === 'match_pairs') {
      correct = selectedAnswer === 'matched';
    } else {
      correct =
        selectedAnswer.toLowerCase().trim() ===
        current.answer.toLowerCase().trim();
    }

    setIsCorrect(correct);
    setIsChecked(true);

    if (correct) {
      playSound('correct');
    } else {
      playSound('wrong');
      const newHearts = Math.max(0, hearts - 1);
      setHearts(newHearts);
      if (newHearts === 0) {
        setTimeout(() => setShowOutOfHearts(true), 900);
      }
    }
  }, [isChecked, selectedAnswer, currentIndex, exercises.length, hearts, current]);

  const finishLesson = async () => {
    setIsFinished(true);
    playSound('complete');
    document.cookie = `completed_${skillId}=true; path=/; max-age=3600`;
    try {
      await completeSkill(USER_ID, skillId, xpReward);
    } catch {
      // ignore network error
    }
  };

  const handleRefillHearts = async () => {
    await refillHearts(USER_ID);
    setHearts(5);
    setShowOutOfHearts(false);
  };

  // ======================================================
  // LESSON COMPLETE screen
  // ======================================================
  if (isFinished) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-8 p-6 text-center bounce-in">
        <div className="text-8xl animate-bounce">{isLegendary ? '👑' : '🎉'}</div>
        <h1 className={clsx(
          "text-4xl font-extrabold",
          isLegendary ? "text-[#ce82ff]" : "text-gray-700 dark:text-white"
        )}>
          {isLegendary ? 'Legendary Challenge Complete!' : 'Lesson Complete!'}
        </h1>
        <p className="text-gray-500 dark:text-gray-300 font-semibold">
          You earned <span className="text-[#ffc800] font-extrabold">+{xpReward} XP</span>
        </p>

        <div className="flex gap-4 sm:gap-6">
          <StatCard label="Total XP" value={`+${xpReward}`} color="text-[#ffc800]" bg="bg-[#fff9e6] dark:bg-[#332a00]" />
          <StatCard label="Accuracy" value="100%" color="text-[#58cc02]" bg="bg-[#e7ffd4] dark:bg-[#143300]" />
          {isLegendary && (
            <StatCard label="Time Left" value={`${timeLeft}s`} color="text-[#ce82ff]" bg="bg-[#f7edff] dark:bg-[#2b1040]" />
          )}
        </div>

        <div className="fixed bottom-0 left-0 right-0 p-4 lg:p-6 bg-white dark:bg-[#182228] border-t-2 border-gray-100 dark:border-[#2b3940]">
          <button
            onClick={() => router.push('/')}
            className={clsx(
              "w-full max-w-[500px] mx-auto block text-white font-extrabold py-4 rounded-2xl text-lg uppercase tracking-wider active:translate-y-1 active:shadow-none transition-all",
              isLegendary
                ? "bg-[#ce82ff] shadow-[0_4px_0_#9d40e0]"
                : "bg-[#58cc02] shadow-[0_4px_0_#46a302]"
            )}
          >
            Continue
          </button>
        </div>
      </div>
    );
  }

  // ======================================================
  // TIME'S UP modal (for Timed / Legendary mode)
  // ======================================================
  if (isTimeUp) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-6 p-6 text-center">
        <div className="text-8xl">⏰</div>
        <h1 className="text-3xl font-extrabold text-[#ff4b4b]">Time&apos;s Up!</h1>
        <p className="text-gray-500 dark:text-gray-300 font-semibold max-w-sm">
          You ran out of time for this Legendary challenge. Practice your speed and try again!
        </p>
        <div className="fixed bottom-0 left-0 right-0 p-4 lg:p-6 bg-white dark:bg-[#182228] border-t-2 border-gray-100 dark:border-[#2b3940] flex flex-col gap-3">
          <button
            onClick={() => {
              setTimeLeft(60);
              setIsTimeUp(false);
              setCurrentIndex(0);
              setSelectedAnswer(null);
              setIsChecked(false);
            }}
            className="w-full max-w-[500px] mx-auto block bg-[#ce82ff] text-white font-extrabold py-4 rounded-2xl text-lg uppercase tracking-wider shadow-[0_4px_0_#9d40e0] active:translate-y-1 active:shadow-none transition-all"
          >
            Try Again
          </button>
          <button
            onClick={() => router.push('/')}
            className="w-full max-w-[500px] mx-auto block bg-white dark:bg-[#182228] text-gray-700 dark:text-gray-200 border-2 border-gray-200 dark:border-gray-700 font-extrabold py-4 rounded-2xl text-lg uppercase tracking-wider hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
          >
            Back to Path
          </button>
        </div>
      </div>
    );
  }

  // ======================================================
  // OUT OF HEARTS modal
  // ======================================================
  if (showOutOfHearts) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-6 p-6 text-center">
        <div className="text-8xl">💔</div>
        <h1 className="text-3xl font-extrabold text-[#ff4b4b]">Out of Hearts!</h1>
        <p className="text-gray-500 dark:text-gray-300 font-semibold max-w-sm">
          You made too many mistakes. Take a break or refill your hearts to keep going!
        </p>

        <div className="fixed bottom-0 left-0 right-0 p-4 lg:p-6 bg-white dark:bg-[#182228] border-t-2 border-gray-100 dark:border-[#2b3940] flex flex-col gap-3">
          <button
            onClick={handleRefillHearts}
            className="w-full max-w-[500px] mx-auto block bg-[#1cb0f6] text-white font-extrabold py-4 rounded-2xl text-lg uppercase tracking-wider shadow-[0_4px_0_#0a8fc5] active:translate-y-1 active:shadow-none transition-all"
          >
            Refill Hearts (Free)
          </button>
          <button
            onClick={() => router.push('/')}
            className="w-full max-w-[500px] mx-auto block bg-white dark:bg-[#182228] text-[#ff4b4b] border-2 border-gray-200 dark:border-gray-700 font-extrabold py-4 rounded-2xl text-lg uppercase tracking-wider hover:bg-red-50 dark:hover:bg-red-950/20 transition-all"
          >
            End Lesson
          </button>
        </div>
      </div>
    );
  }

  const options = parseOptions(current.options);

  // ======================================================
  // MAIN LESSON PLAYER
  // ======================================================
  return (
    <div className={clsx(
      "flex-1 flex flex-col min-h-screen",
      isLegendary ? "bg-[#1f102e] text-white dark:bg-[#150b20]" : "bg-white dark:bg-[#131f24]"
    )}>
      {/* ── Header bar ── */}
      <div className="flex items-center gap-4 px-6 py-4 max-w-[1040px] mx-auto w-full">
        <button
          onClick={() => router.push('/')}
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
          aria-label="Close lesson"
        >
          <X className="w-8 h-8" strokeWidth={3} />
        </button>

        {/* Progress bar */}
        <div className="flex-1 h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className={clsx(
              "h-full rounded-full transition-all duration-500 ease-out",
              isLegendary ? "bg-[#ce82ff]" : "bg-[#58cc02]"
            )}
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Timed Challenge indicator */}
        {isLegendary && (
          <div className="flex items-center gap-1.5 font-extrabold text-[#ce82ff] bg-purple-950/50 px-3 py-1.5 rounded-full border border-purple-500">
            <Timer className="w-5 h-5 animate-pulse" />
            <span className="text-sm">{timeLeft}s</span>
          </div>
        )}

        {/* Hearts */}
        <div className="flex items-center gap-1 font-extrabold text-[#ff4b4b]">
          {Array.from({ length: 5 }).map((_, i) => (
            <Heart
              key={i}
              className="w-5 h-5 sm:w-6 sm:h-6"
              fill={i < hearts ? '#ff4b4b' : 'transparent'}
              stroke={i < hearts ? '#ff4b4b' : '#888'}
            />
          ))}
        </div>
      </div>

      {/* ── Legendary Badge banner ── */}
      {isLegendary && (
        <div className="max-w-[700px] mx-auto w-full px-6 pt-2">
          <div className="flex items-center gap-2 bg-[#ce82ff]/20 text-[#ce82ff] border border-[#ce82ff]/40 px-3 py-1 rounded-xl text-xs font-extrabold uppercase tracking-wider w-fit">
            <Crown className="w-4 h-4" />
            Legendary Challenge &bull; +40 XP
          </div>
        </div>
      )}

      {/* ── Exercise content ── */}
      <div className="flex-1 flex flex-col max-w-[700px] mx-auto w-full px-6 pt-6">
        {/* Direction text */}
        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">
          {getDirection(current.type)}
        </p>

        {/* NEW WORD badge matching Duolingo screenshot */}
        {current.type === 'multiple_choice' && (
          <div className="flex items-center gap-1.5 bg-[#ce82ff]/15 text-[#a855f7] dark:text-[#ce82ff] border border-[#ce82ff]/30 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider w-fit mb-3">
            <span>✨</span>
            <span>NEW WORD</span>
          </div>
        )}

        {/* Question Heading (No voice readout of question, only selected option is read) */}
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 dark:text-white mb-8 leading-snug">
          {current.question}
        </h2>

        {/* Render the appropriate exercise component */}
        {current.type === 'multiple_choice' && (
          <MultipleChoiceExercise
            options={options}
            selected={selectedAnswer}
            isChecked={isChecked}
            correctAnswer={current.answer}
            onSelect={setSelectedAnswer}
          />
        )}

        {current.type === 'translate' && (
          <TranslateExercise
            words={options}
            selected={selectedAnswer}
            isChecked={isChecked}
            onSelect={setSelectedAnswer}
          />
        )}

        {current.type === 'type_answer' && (
          <TypeAnswerExercise
            value={selectedAnswer || ''}
            isChecked={isChecked}
            isCorrect={isCorrect}
            onChange={setSelectedAnswer}
          />
        )}

        {current.type === 'fill_blank' && (
          <FillBlankExercise
            options={options}
            selected={selectedAnswer}
            isChecked={isChecked}
            correctAnswer={current.answer}
            onSelect={setSelectedAnswer}
          />
        )}

        {current.type === 'match_pairs' && (
          <MatchPairsExercise
            key={currentIndex}
            pairs={options.pairs || (Array.isArray(options) ? options : [])}
            isChecked={isChecked}
            onComplete={() => setSelectedAnswer('matched')}
          />
        )}
      </div>

      {/* ── Feedback bar + Check button ── */}
      <FeedbackBar
        isChecked={isChecked}
        isCorrect={isCorrect}
        correctAnswer={current.answer}
        canCheck={!!selectedAnswer}
        onCheck={handleCheck}
        isLegendary={isLegendary}
      />
    </div>
  );
}

// ------------------------------------------------------------------ //
// Helper functions
// ------------------------------------------------------------------ //
function parseOptions(raw: any): any {
  if (typeof raw === 'string') {
    try { return JSON.parse(raw); } catch { return []; }
  }
  return raw ?? [];
}

function getDirection(type: string): string {
  switch (type) {
    case 'translate':       return 'Write this in Spanish';
    case 'multiple_choice': return 'Select the correct meaning';
    case 'type_answer':     return 'Type the missing word';
    case 'fill_blank':      return 'Fill in the blank';
    case 'match_pairs':     return 'Tap the matching pairs';
    default:                return 'Complete the exercise';
  }
}

// ------------------------------------------------------------------ //
// Feedback bar at bottom
// ------------------------------------------------------------------ //
function FeedbackBar({
  isChecked,
  isCorrect,
  correctAnswer,
  canCheck,
  onCheck,
  isLegendary,
}: {
  isChecked: boolean;
  isCorrect: boolean;
  correctAnswer: string;
  canCheck: boolean;
  onCheck: () => void;
  isLegendary?: boolean;
}) {
  const bgColor = !isChecked
    ? 'bg-white dark:bg-[#182228] border-gray-200 dark:border-[#2b3940]'
    : isCorrect
    ? 'bg-[#d7ffb8] dark:bg-[#183910] border-[#58cc02]'
    : 'bg-[#ffe0e0] dark:bg-[#3d1414] border-[#ff4b4b]';

  return (
    <div className={clsx('border-t-2 px-6 py-4 lg:py-6 transition-colors duration-300', bgColor)}>
      <div className="max-w-[1040px] mx-auto flex items-center justify-between gap-6">
        <div className="flex-1">
          {isChecked && isCorrect && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#58cc02] rounded-full flex items-center justify-center shrink-0">
                <Check className="w-6 h-6 text-white" strokeWidth={3} />
              </div>
              <div>
                <p className="font-extrabold text-[#58cc02] text-lg">Correct!</p>
                <p className="text-[#58cc02] text-sm font-semibold">
                  {isLegendary ? 'Legendary precision!' : 'Amazing work!'}
                </p>
              </div>
            </div>
          )}
          {isChecked && !isCorrect && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#ff4b4b] rounded-full flex items-center justify-center shrink-0">
                <X className="w-6 h-6 text-white" strokeWidth={3} />
              </div>
              <div>
                <p className="font-extrabold text-[#ff4b4b] text-lg">Incorrect</p>
                <p className="text-[#ff4b4b] text-sm font-semibold">
                  Correct answer: <span className="font-extrabold">{correctAnswer}</span>
                </p>
              </div>
            </div>
          )}
        </div>

        <button
          onClick={onCheck}
          disabled={!canCheck && !isChecked}
          className={clsx(
            'px-8 sm:px-10 py-3 rounded-2xl font-extrabold text-base uppercase tracking-wider transition-all',
            !canCheck && !isChecked
              ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed shadow-none'
              : isChecked && isCorrect
              ? 'bg-[#58cc02] text-white shadow-[0_4px_0_#46a302] active:translate-y-1 active:shadow-none'
              : isChecked && !isCorrect
              ? 'bg-[#ff4b4b] text-white shadow-[0_4px_0_#cc0000] active:translate-y-1 active:shadow-none'
              : isLegendary
              ? 'bg-[#ce82ff] text-white shadow-[0_4px_0_#9d40e0] active:translate-y-1 active:shadow-none'
              : 'bg-[#58cc02] text-white shadow-[0_4px_0_#46a302] active:translate-y-1 active:shadow-none'
          )}
        >
          {isChecked ? 'Continue' : 'Check'}
        </button>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  color,
  bg,
}: {
  label: string;
  value: string;
  color: string;
  bg: string;
}) {
  return (
    <div className={clsx('rounded-2xl px-6 py-4 flex flex-col items-center', bg)}>
      <span className={clsx('text-2xl sm:text-3xl font-extrabold', color)}>{value}</span>
      <span className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wide mt-1">{label}</span>
    </div>
  );
}
