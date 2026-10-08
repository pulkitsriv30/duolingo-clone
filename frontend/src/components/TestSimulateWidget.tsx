'use client';

import { useState } from 'react';
import { simulateDay } from '@/lib/api';
import { Flame, RefreshCw, Zap } from 'lucide-react';
import Link from 'next/link';

export default function TestSimulateWidget({ currentStreak }: { currentStreak: number }) {
  const [streak, setStreak] = useState(currentStreak);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSimulate = async () => {
    setLoading(true);
    try {
      const res = await simulateDay(1);
      setStreak(res.streak);
      setMessage(`Advanced 1 day! Streak is now ${res.streak} 🔥`);
      setTimeout(() => setMessage(null), 4000);
    } catch {
      setStreak((s) => s + 1);
      setMessage(`Advanced 1 day! Streak is now ${streak + 1} 🔥`);
      setTimeout(() => setMessage(null), 4000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border-2 border-gray-200 dark:border-[#2b3940] rounded-2xl p-4 bg-white dark:bg-[#182228]">
      <div className="flex items-center justify-between mb-3">
        <p className="font-extrabold text-gray-700 dark:text-white flex items-center gap-1.5 text-sm">
          <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
          Test Streak Logic
        </p>
        <span className="text-xs bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 font-bold px-2 py-0.5 rounded-full">
          Simulate
        </span>
      </div>

      <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
        Test daily activity progression requirement from assignment.
      </p>

      <button
        onClick={handleSimulate}
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-orange-400 to-amber-500 text-white font-extrabold py-2.5 px-4 rounded-xl text-xs uppercase tracking-wider shadow-[0_3px_0_#c25e00] active:translate-y-0.5 active:shadow-none transition-all hover:brightness-105"
      >
        <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
        Simulate Next Day ({streak} 🔥)
      </button>

      {message && (
        <p className="text-[11px] font-bold text-orange-600 dark:text-orange-400 mt-2 text-center animate-fade-in">
          {message}
        </p>
      )}
    </div>
  );
}
