'use client';

import clsx from 'clsx';
import { playSound, speakText } from '@/lib/audio';

interface Props {
  options: string[];
  selected: string | null;
  isChecked: boolean;
  correctAnswer: string;
  onSelect: (value: string) => void;
}

export default function FillBlankExercise({ options, selected, isChecked, correctAnswer, onSelect }: Props) {
  const handleClick = (opt: string) => {
    if (isChecked) return;
    playSound('click');
    speakText(opt);
    onSelect(opt);
  };

  return (
    <div className="flex flex-wrap gap-3">
      {options.map((opt) => {
        const isSelected = selected === opt;
        const isRight = isChecked && opt === correctAnswer;
        const isWrong = isChecked && isSelected && opt !== correctAnswer;

        return (
          <button
            key={opt}
            onClick={() => handleClick(opt)}
            disabled={isChecked}
            className={clsx(
              'px-6 py-3 border-2 border-b-4 rounded-2xl font-bold text-base transition-all shadow-sm',
              !isChecked && !isSelected && 'border-gray-300 dark:border-gray-700 bg-white dark:bg-[#182228] text-gray-700 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-400',
              !isChecked && isSelected  && 'border-[#84d8ff] dark:border-[#105070] bg-[#ddf4ff] dark:bg-[#103040] text-[#1cb0f6]',
              isRight                   && 'border-[#58cc02] bg-[#d7ffb8] dark:bg-[#183910] text-[#58cc02]',
              isWrong                   && 'border-[#ff4b4b] bg-[#ffe0e0] dark:bg-[#3d1414] text-[#ff4b4b]',
              isChecked && !isSelected && !isRight && 'opacity-40',
            )}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}
