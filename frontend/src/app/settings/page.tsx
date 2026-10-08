'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import TopBar from '@/components/TopBar';
import TestSimulateWidget from '@/components/TestSimulateWidget';
import clsx from 'clsx';
import { ChevronDown } from 'lucide-react';

export default function SettingsPage() {
  // State for lesson experience toggles (Screenshot 2)
  const [soundEffects, setSoundEffects] = useState(true);
  const [animations, setAnimations] = useState(true);
  const [motivationalMessages, setMotivationalMessages] = useState(true);
  const [listeningExercises, setListeningExercises] = useState(true);

  // State for dark mode dropdown (SYSTEM DEFAULT, DARK, LIGHT)
  const [darkMode, setDarkMode] = useState('DARK');

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'light') {
      setDarkMode('LIGHT');
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    } else {
      setDarkMode('DARK');
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    }
  }, []);

  const handleThemeChange = (val: string) => {
    setDarkMode(val);
    if (val === 'LIGHT') {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      localStorage.setItem('theme', 'dark');
    }
  };

  const user = {
    streak: 1,
    gems: 505,
    hearts: 5,
    daily_xp: 10,
    daily_goal: 10,
  };

  return (
    <>
      <TopBar user={user} />

      <div className="max-w-[1040px] mx-auto px-4 lg:px-8 py-8 pb-24">
        <div className="flex flex-col lg:flex-row gap-10 items-start">
          {/* Left Column: Preferences (Matches Screenshot 2) */}
          <div className="flex-1 w-full max-w-[620px]">
            <h1 className="text-3xl font-black text-gray-800 dark:text-white mb-8">
              Preferences
            </h1>

            {/* Section: Lesson experience */}
            <div className="mb-10">
              <h2 className="text-lg font-black text-gray-800 dark:text-gray-100 mb-6">
                Lesson experience
              </h2>

              <div className="flex flex-col gap-6">
                {/* 1. Sound effects */}
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-sm sm:text-base text-gray-700 dark:text-gray-200">
                    Sound effects
                  </span>
                  <ToggleSwitch
                    checked={soundEffects}
                    onChange={() => setSoundEffects((prev) => !prev)}
                  />
                </div>

                {/* 2. Animations */}
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-sm sm:text-base text-gray-700 dark:text-gray-200">
                    Animations
                  </span>
                  <ToggleSwitch
                    checked={animations}
                    onChange={() => setAnimations((prev) => !prev)}
                  />
                </div>

                {/* 3. Motivational messages */}
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-sm sm:text-base text-gray-700 dark:text-gray-200">
                    Motivational messages
                  </span>
                  <ToggleSwitch
                    checked={motivationalMessages}
                    onChange={() => setMotivationalMessages((prev) => !prev)}
                  />
                </div>

                {/* 4. Listening exercises */}
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-sm sm:text-base text-gray-700 dark:text-gray-200">
                    Listening exercises
                  </span>
                  <ToggleSwitch
                    checked={listeningExercises}
                    onChange={() => setListeningExercises((prev) => !prev)}
                  />
                </div>
              </div>
            </div>

            {/* Section: Appearance */}
            <div className="mb-10">
              <h2 className="text-lg font-black text-gray-800 dark:text-gray-100 mb-6">
                Appearance
              </h2>

              <div>
                <p className="font-extrabold text-sm text-gray-700 dark:text-gray-300 mb-3">
                  Dark mode
                </p>

                {/* Dropdown Select (Matches screenshot) */}
                <div className="relative max-w-sm">
                  <select
                    value={darkMode}
                    onChange={(e) => handleThemeChange(e.target.value)}
                    className="w-full appearance-none bg-white dark:bg-[#182228] border-2 border-gray-300 dark:border-[#2b3940] rounded-2xl px-5 py-3.5 font-extrabold text-xs sm:text-sm uppercase tracking-wider text-gray-700 dark:text-white outline-none cursor-pointer hover:border-gray-400 dark:hover:border-gray-500 transition-colors shadow-sm"
                  >
                    <option value="SYSTEM DEFAULT">SYSTEM DEFAULT</option>
                    <option value="DARK">DARK</option>
                    <option value="LIGHT">LIGHT</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Developer Testing Tools */}
            <div className="pt-4 border-t border-gray-200 dark:border-[#2b3940]">
              <h2 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">
                Streak Simulation Test
              </h2>
              <TestSimulateWidget currentStreak={user.streak} />
            </div>
          </div>

          {/* Right Column Cards (Matches Screenshot 2) */}
          <div className="w-full lg:w-72 flex flex-col gap-6 shrink-0">
            {/* Card 1: Account, Preferences, Privacy settings */}
            <div className="border-2 border-gray-200 dark:border-[#2b3940] rounded-2xl p-5 bg-white dark:bg-[#182228] flex flex-col gap-4">
              <span className="font-black text-sm text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-200 cursor-pointer transition-colors">
                Account
              </span>
              <span className="font-black text-sm text-gray-900 dark:text-white transition-colors">
                Preferences
              </span>
              <span className="font-black text-sm text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-200 cursor-pointer transition-colors">
                Privacy settings
              </span>
            </div>

            {/* Card 2: Support (Links to Help Center) */}
            <div className="border-2 border-gray-200 dark:border-[#2b3940] rounded-2xl p-5 bg-white dark:bg-[#182228] flex flex-col gap-4">
              <h3 className="font-black text-sm text-gray-800 dark:text-white">
                Support
              </h3>
              <Link
                href="/help"
                className="font-black text-sm text-gray-400 dark:text-gray-400 hover:text-[#1cb0f6] dark:hover:text-[#1cb0f6] transition-colors"
              >
                Help Center
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Cyan Toggle Switch Component matching Duolingo screenshot
function ToggleSwitch({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      type="button"
      className={clsx(
        'relative inline-flex h-8 w-14 items-center rounded-full transition-colors cursor-pointer border-2',
        checked
          ? 'bg-[#1cb0f6] border-[#0ea5e9]'
          : 'bg-gray-200 dark:bg-gray-700 border-gray-300 dark:border-gray-600'
      )}
    >
      <span
        className={clsx(
          'inline-block h-6 w-6 transform rounded-full bg-white shadow-md transition-transform',
          checked ? 'translate-x-7' : 'translate-x-1'
        )}
      />
    </button>
  );
}
