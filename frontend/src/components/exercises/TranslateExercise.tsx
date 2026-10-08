'use client';

import { useState } from 'react';
import clsx from 'clsx';
import { playSound, speakText } from '@/lib/audio';

interface Props {
  words: string[];
  selected: string | null;
  isChecked: boolean;
  onSelect: (sentence: string) => void;
}

// Tap-the-words sentence builder (Duolingo style)
export default function TranslateExercise({ words, selected, isChecked, onSelect }: Props) {
  const [answer, setAnswer] = useState<string[]>([]);

  const addWord = (word: string) => {
    if (isChecked) return;
    playSound('click');
    speakText(word);
    const next = [...answer, word];
    setAnswer(next);
    onSelect(next.join(' '));
  };

  const removeWord = (index: number) => {
    if (isChecked) return;
    playSound('click');
    const next = answer.filter((_, i) => i !== index);
    setAnswer(next);
    onSelect(next.join(' '));
  };

  const usedIndices = new Set<number>();
  const remainingWords = words.filter((w, i) => {
    if (!usedIndices.has(i) && answer.includes(w)) {
      usedIndices.add(i);
      return false;
    }
    return true;
  });

  return (
    <div className="flex flex-col gap-6">
      {/* Answer dropzone */}
      <div className={clsx(
        'min-h-[72px] border-b-2 flex flex-wrap items-start gap-2.5 pb-3',
        isChecked ? 'border-gray-200 dark:border-gray-700' : 'border-gray-300 dark:border-gray-600',
      )}>
        {answer.length === 0 && !isChecked && (
          <span className="text-gray-400 dark:text-gray-500 font-semibold text-sm mt-2">
            Tap words below to build your answer
          </span>
        )}
        {answer.map((word, i) => (
          <button
            key={`${word}-${i}`}
            onClick={() => removeWord(i)}
            disabled={isChecked}
            className="px-4 py-2.5 bg-white dark:bg-[#182228] border-2 border-b-4 border-gray-300 dark:border-gray-600 rounded-xl font-bold text-gray-700 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700 active:translate-y-0.5 transition-all shadow-sm"
          >
            {word}
          </button>
        ))}
      </div>

      {/* Word bank */}
      <div className="flex flex-wrap justify-center gap-2.5">
        {words.map((word, i) => {
          const isUsed = answer.filter((w) => w === word).length > 0 &&
            answer.indexOf(word) <= i;

          return (
            <button
              key={`bank-${word}-${i}`}
              onClick={() => addWord(word)}
              disabled={isChecked || answer.includes(word)}
              className={clsx(
                'px-4 py-2.5 border-2 border-b-4 rounded-xl font-bold transition-all shadow-sm',
                answer.includes(word)
                  ? 'bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-transparent pointer-events-none'
                  : 'bg-white dark:bg-[#182228] border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700 active:translate-y-0.5',
              )}
            >
              {word}
            </button>
          );
        })}
      </div>
    </div>
  );
}
