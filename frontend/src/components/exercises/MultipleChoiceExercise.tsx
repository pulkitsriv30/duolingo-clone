'use client';

import { useEffect } from 'react';
import clsx from 'clsx';
import { playSound, speakText } from '@/lib/audio';
import OptionIllustration from '../illustrations/OptionIllustration';

interface Props {
  options: any[]; // string[] or { text: string; image?: string }[]
  selected: string | null;
  isChecked: boolean;
  correctAnswer: string;
  onSelect: (value: string) => void;
}

export default function MultipleChoiceExercise({
  options,
  selected,
  isChecked,
  correctAnswer,
  onSelect,
}: Props) {
  // Normalize options to string format
  const normalizedOptions: string[] = options.map((opt) =>
    typeof opt === 'string' ? opt : opt.text || String(opt)
  );

  const handleSelect = (opt: string) => {
    if (isChecked) return;
    playSound('click');
    // Only speak the selected option, as requested by the user
    speakText(opt);
    onSelect(opt);
  };

  // Keyboard shortcut listener: pressing 1, 2, 3 selects the option
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isChecked) return;
      const num = parseInt(e.key, 10);
      if (!isNaN(num) && num >= 1 && num <= normalizedOptions.length) {
        handleSelect(normalizedOptions[num - 1]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isChecked, normalizedOptions]);

  // If 3 or fewer options, use 3 columns layout matching user's screenshot
  const isCardLayout = normalizedOptions.length <= 4;

  return (
    <div
      className={clsx(
        'w-full gap-3 sm:gap-4',
        isCardLayout
          ? 'grid grid-cols-1 sm:grid-cols-3'
          : 'grid grid-cols-1 sm:grid-cols-2'
      )}
    >
      {normalizedOptions.map((opt, idx) => {
        const isSelected = selected === opt;
        const isRight = isChecked && opt === correctAnswer;
        const isWrong = isChecked && isSelected && opt !== correctAnswer;

        return (
          <button
            key={opt}
            onClick={() => handleSelect(opt)}
            disabled={isChecked}
            className={clsx(
              'group relative flex flex-col justify-between items-center rounded-2xl p-4 sm:p-5 transition-all cursor-pointer text-left',
              'border-2 border-b-4 active:translate-y-0.5 active:shadow-none shadow-sm',
              // Normal state
              !isChecked && !isSelected && 'border-gray-200 dark:border-[#2b3940] bg-white dark:bg-[#182228] hover:bg-gray-50 dark:hover:bg-[#202f36] hover:border-gray-300 dark:hover:border-[#3d5059]',
              // Selected state (Duolingo blue)
              !isChecked && isSelected && 'border-[#84d8ff] dark:border-[#38bdf8] bg-[#ddf4ff] dark:bg-[#103040] shadow-[0_4px_0_#38bdf8]',
              // Correct state (Duolingo green)
              isRight && 'border-[#58cc02] bg-[#d7ffb8] dark:bg-[#183910] text-[#58cc02] shadow-[0_4px_0_#46a302]',
              // Wrong state (Duolingo red)
              isWrong && 'border-[#ff4b4b] bg-[#ffe0e0] dark:bg-[#3d1414] text-[#ff4b4b] shadow-[0_4px_0_#cc0000]',
              // Inactive state after check
              isChecked && !isSelected && !isRight && 'border-gray-200 dark:border-gray-800 text-gray-400 dark:text-gray-600 opacity-40'
            )}
          >
            {/* Top: Vector illustration (Matches screenshot) */}
            <div className="w-full flex items-center justify-center py-2 sm:py-4 transition-transform group-hover:scale-105">
              <OptionIllustration
                name={opt}
                className="w-20 h-20 sm:w-28 sm:h-28 object-contain"
              />
            </div>

            {/* Bottom Row: Option Word + Number Key Shortcut */}
            <div className="w-full flex items-center justify-between pt-3 border-t border-gray-100 dark:border-[#2b3940]">
              <span
                className={clsx(
                  'font-black text-base sm:text-lg',
                  isSelected && !isChecked
                    ? 'text-[#1cb0f6]'
                    : isRight
                    ? 'text-[#58cc02]'
                    : isWrong
                    ? 'text-[#ff4b4b]'
                    : 'text-gray-700 dark:text-gray-100'
                )}
              >
                {opt}
              </span>

              {/* Number badge (1, 2, 3) */}
              <span
                className={clsx(
                  'text-xs font-bold px-2 py-0.5 rounded-lg border transition-colors',
                  isSelected && !isChecked
                    ? 'border-[#38bdf8] text-[#1cb0f6] bg-white/60 dark:bg-[#182228]'
                    : 'border-gray-300 dark:border-gray-600 text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-800'
                )}
              >
                {idx + 1}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
