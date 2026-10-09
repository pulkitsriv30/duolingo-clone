'use client';

import { useState, useEffect } from 'react';
import clsx from 'clsx';
import { playSound, speakText } from '@/lib/audio';

interface Pair { left: string; right: string; }

interface Props {
  pairs: Pair[];
  isChecked: boolean;
  onComplete: () => void;
}

// Classic Duolingo match-pairs: click left then right to match.
export default function MatchPairsExercise({ pairs, isChecked, onComplete }: Props) {
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [selectedRight, setSelectedRight] = useState<string | null>(null);
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [wrong, setWrong] = useState<string | null>(null);

  // Shuffle right column once
  const [rightItems] = useState(() => [...pairs].sort(() => Math.random() - 0.5));

  useEffect(() => {
    if (matched.size === pairs.length * 2 && pairs.length > 0) {
      onComplete();
    }
  }, [matched, pairs.length, onComplete]);

  const handleLeft = (left: string) => {
    if (matched.has(left) || isChecked) return;
    playSound('click');
    speakText(left);
    setSelectedLeft(left);
    checkMatch(left, selectedRight);
  };

  const handleRight = (right: string) => {
    if (matched.has(right) || isChecked) return;
    playSound('click');
    setSelectedRight(right);
    checkMatch(selectedLeft, right);
  };

  const checkMatch = (left: string | null, right: string | null) => {
    if (!left || !right) return;

    const pair = pairs.find((p) => p.left === left && p.right === right);
    if (pair) {
      playSound('correct');
      setMatched((prev) => new Set([...prev, left, right]));
      setSelectedLeft(null);
      setSelectedRight(null);
    } else {
      playSound('wrong');
      setWrong(`${left}-${right}`);
      setTimeout(() => {
        setWrong(null);
        setSelectedLeft(null);
        setSelectedRight(null);
      }, 500);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-3 max-w-lg">
      {/* Left column */}
      <div className="flex flex-col gap-3">
        {pairs.map((p) => (
          <button
            key={p.left}
            onClick={() => handleLeft(p.left)}
            disabled={matched.has(p.left) || isChecked}
            className={clsx(
              'px-4 py-3 border-2 border-b-4 rounded-2xl font-bold text-left transition-all',
              matched.has(p.left)
                ? 'border-[#58cc02] bg-[#d7ffb8] dark:bg-[#183910] text-[#58cc02] opacity-50'
                : selectedLeft === p.left
                ? 'border-[#84d8ff] bg-[#ddf4ff] dark:bg-[#103040] text-[#1cb0f6]'
                : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-[#182228] text-gray-700 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700',
              wrong?.startsWith(p.left) && 'border-[#ff4b4b] bg-[#ffe0e0] dark:bg-[#3d1414] text-[#ff4b4b]',
            )}
          >
            {p.left}
          </button>
        ))}
      </div>

      {/* Right column (shuffled) */}
      <div className="flex flex-col gap-3">
        {rightItems.map((p) => (
          <button
            key={p.right}
            onClick={() => handleRight(p.right)}
            disabled={matched.has(p.right) || isChecked}
            className={clsx(
              'px-4 py-3 border-2 border-b-4 rounded-2xl font-bold text-left transition-all',
              matched.has(p.right)
                ? 'border-[#58cc02] bg-[#d7ffb8] dark:bg-[#183910] text-[#58cc02] opacity-50'
                : selectedRight === p.right
                ? 'border-[#84d8ff] bg-[#ddf4ff] dark:bg-[#103040] text-[#1cb0f6]'
                : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-[#182228] text-gray-700 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700',
              wrong?.endsWith(p.right) && 'border-[#ff4b4b] bg-[#ffe0e0] dark:bg-[#3d1414] text-[#ff4b4b]',
            )}
          >
            {p.right}
          </button>
        ))}
      </div>
    </div>
  );
}
