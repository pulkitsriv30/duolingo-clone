'use client';

import clsx from 'clsx';

interface Props {
  value: string;
  isChecked: boolean;
  isCorrect: boolean;
  onChange: (value: string) => void;
}

export default function TypeAnswerExercise({ value, isChecked, isCorrect, onChange }: Props) {
  return (
    <div className="flex flex-col gap-3">
      <input
        type="text"
        value={value}
        onChange={(e) => !isChecked && onChange(e.target.value)}
        disabled={isChecked}
        placeholder="Type your answer in Spanish..."
        autoFocus
        className={clsx(
          'w-full border-2 border-b-4 rounded-2xl px-5 py-4 text-lg font-bold outline-none transition-all shadow-sm',
          !isChecked
            ? 'border-gray-300 dark:border-gray-700 bg-white dark:bg-[#182228] focus:border-[#84d8ff] dark:focus:border-[#105070] focus:bg-[#f0f9ff] dark:focus:bg-[#103040] text-gray-700 dark:text-gray-100'
            : isCorrect
            ? 'border-[#58cc02] bg-[#d7ffb8] dark:bg-[#183910] text-[#58cc02]'
            : 'border-[#ff4b4b] bg-[#ffe0e0] dark:bg-[#3d1414] text-[#ff4b4b]',
        )}
      />
      <p className="text-xs text-gray-400 dark:text-gray-500 font-semibold">
        Hint: accents and capitalization are optional
      </p>
    </div>
  );
}
