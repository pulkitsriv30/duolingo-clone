'use client';

import { useState } from 'react';
import Link from 'next/link';
import TopBar from '@/components/TopBar';
import { ChevronDown, ChevronRight } from 'lucide-react';
import clsx from 'clsx';

const FAQS = [
  {
    q: 'Why did my course change?',
    a: 'Duolingo frequently updates courses to align with CEFR (Common European Framework of Reference) language standards. New lessons and units are introduced so you get the most up-to-date conversational practice.',
  },
  {
    q: 'What is a streak?',
    a: 'A streak is a counter of how many consecutive days you have completed a lesson. Completing at least one lesson each day extends your streak by 1. If you miss a day, your streak will reset unless protected by a Streak Freeze.',
  },
  {
    q: 'What are leaderboards and leagues?',
    a: 'Leaderboards allow you to compete with other learners in weekly XP leagues. The top learners in your league advance to the next tier (e.g., Bronze League → Silver League) every Sunday at midnight UTC!',
  },
  {
    q: 'Does Duolingo use any open source libraries?',
    a: 'Yes! This application is built using modern open source web technologies including Next.js, React, Tailwind CSS, Lucide icons, FastAPI, and SQLite.',
  },
];

export default function HelpPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(0); // First accordion open by default

  const toggleAccordion = (idx: number) => {
    setOpenIdx((current) => (current === idx ? null : idx));
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

      <div className="max-w-[840px] mx-auto px-4 lg:px-8 py-8 pb-24">
        {/* Breadcrumb matching Screenshot 3 */}
        <div className="flex items-center gap-2 text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-6">
          <Link href="/help" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
            HELP CENTER
          </Link>
          <span>&gt;</span>
          <span className="text-[#1cb0f6]">HOME</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-3xl sm:text-4xl font-black text-gray-800 dark:text-white text-center mb-10">
          Frequently Asked Questions
        </h1>

        {/* FAQ Container Box matching Screenshot 3 */}
        <div className="border-2 border-gray-200 dark:border-[#2b3940] rounded-2xl bg-white dark:bg-[#182228] overflow-hidden shadow-sm">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-100 dark:border-[#2b3940]">
            <h2 className="text-sm font-black text-gray-800 dark:text-white">
              Using Duolingo
            </h2>
          </div>

          {/* Accordion List */}
          <div className="divide-y divide-gray-100 dark:divide-[#2b3940]">
            {FAQS.map((faq, idx) => {
              const isOpen = openIdx === idx;

              return (
                <div key={faq.q} className="transition-colors">
                  <button
                    onClick={() => toggleAccordion(idx)}
                    className="w-full flex items-center justify-between px-6 py-5 text-left font-bold text-sm sm:text-base text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-[#202f36] transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={clsx(
                        'w-5 h-5 text-gray-400 shrink-0 transition-transform duration-200',
                        isOpen ? 'rotate-180 text-[#1cb0f6]' : ''
                      )}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-semibold">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
