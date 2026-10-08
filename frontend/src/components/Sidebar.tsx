'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LearnIcon,
  LeaderboardsIcon,
  QuestsIcon,
  ShopIcon,
  ProfileIcon,
  MoreIcon,
} from './icons/DuoIcons';
import { Settings, HelpCircle } from 'lucide-react';
import clsx from 'clsx';

export default function Sidebar() {
  const pathname = usePathname();
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  // Close more menu when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setShowMoreMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <aside className="hidden lg:flex flex-col w-64 xl:w-68 border-r-2 border-gray-100 dark:border-[#2b3940] bg-white dark:bg-[#131f24] px-4 py-6 h-screen sticky top-0 shrink-0 z-40">
      {/* Duolingo Logo */}
      <Link href="/" className="flex items-center gap-2 px-3 mb-8 group">
        <span className="text-[#58cc02] font-black text-3xl tracking-tight">duolingo</span>
      </Link>

      {/* Main Navigation */}
      <nav className="flex flex-col gap-2 flex-1">
        {/* 1. LEARN */}
        <Link
          href="/"
          className={clsx(
            'flex items-center gap-4 px-4 py-3 rounded-2xl font-black text-xs tracking-wider transition-all uppercase',
            pathname === '/' || pathname.startsWith('/lesson')
              ? 'bg-[#ddf4ff] dark:bg-[#103040] text-[#1cb0f6] border-2 border-[#84d8ff] dark:border-[#38bdf8] shadow-sm'
              : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#202f36] border-2 border-transparent'
          )}
        >
          <div className="w-7 h-7 flex items-center justify-center">
            <LearnIcon className="w-7 h-7" />
          </div>
          <span>LEARN</span>
        </Link>

        {/* 2. LEADERBOARDS */}
        <Link
          href="/leaderboard"
          className={clsx(
            'flex items-center gap-4 px-4 py-3 rounded-2xl font-black text-xs tracking-wider transition-all uppercase',
            pathname === '/leaderboard'
              ? 'bg-[#ddf4ff] dark:bg-[#103040] text-[#1cb0f6] border-2 border-[#84d8ff] dark:border-[#38bdf8] shadow-sm'
              : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#202f36] border-2 border-transparent'
          )}
        >
          <div className="w-7 h-7 flex items-center justify-center">
            <LeaderboardsIcon className="w-7 h-7" />
          </div>
          <span>LEADERBOARDS</span>
        </Link>

        {/* 3. QUESTS */}
        <Link
          href="/profile"
          className={clsx(
            'flex items-center gap-4 px-4 py-3 rounded-2xl font-black text-xs tracking-wider transition-all uppercase',
            'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#202f36] border-2 border-transparent'
          )}
        >
          <div className="w-7 h-7 flex items-center justify-center">
            <QuestsIcon className="w-7 h-7" />
          </div>
          <span>QUESTS</span>
        </Link>

        {/* 4. SHOP */}
        <Link
          href="/settings"
          className={clsx(
            'flex items-center gap-4 px-4 py-3 rounded-2xl font-black text-xs tracking-wider transition-all uppercase',
            'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#202f36] border-2 border-transparent'
          )}
        >
          <div className="w-7 h-7 flex items-center justify-center">
            <ShopIcon className="w-7 h-7" />
          </div>
          <span>SHOP</span>
        </Link>

        {/* 5. PROFILE */}
        <Link
          href="/profile"
          className={clsx(
            'flex items-center gap-4 px-4 py-3 rounded-2xl font-black text-xs tracking-wider transition-all uppercase',
            pathname === '/profile'
              ? 'bg-[#ddf4ff] dark:bg-[#103040] text-[#1cb0f6] border-2 border-[#84d8ff] dark:border-[#38bdf8] shadow-sm'
              : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#202f36] border-2 border-transparent'
          )}
        >
          <div className="w-7 h-7 flex items-center justify-center">
            <ProfileIcon className="w-7 h-7" />
          </div>
          <span>PROFILE</span>
        </Link>

        {/* 6. MORE (With interactive popover flyout matching screenshot) */}
        <div className="relative" ref={moreRef}>
          <button
            onClick={() => setShowMoreMenu((prev) => !prev)}
            className={clsx(
              'w-full flex items-center gap-4 px-4 py-3 rounded-2xl font-black text-xs tracking-wider transition-all uppercase text-left',
              pathname === '/settings' || pathname === '/help'
                ? 'bg-[#ddf4ff] dark:bg-[#103040] text-[#1cb0f6] border-2 border-[#84d8ff] dark:border-[#38bdf8] shadow-sm'
                : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#202f36] border-2 border-transparent'
            )}
          >
            <div className="w-7 h-7 flex items-center justify-center">
              <MoreIcon className="w-7 h-7" />
            </div>
            <span>MORE</span>
          </button>

          {/* Popover Flyout Menu (Only keep HELP and SETTINGS as requested) */}
          {showMoreMenu && (
            <div className="absolute left-4 top-14 w-52 bg-white dark:bg-[#182228] border-2 border-gray-200 dark:border-[#2b3940] rounded-2xl shadow-xl overflow-hidden py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
              <Link
                href="/settings"
                onClick={() => setShowMoreMenu(false)}
                className="flex items-center gap-3 px-4 py-3 text-xs font-black uppercase tracking-wider text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-[#202f36] transition-colors"
              >
                <Settings className="w-4 h-4 text-gray-400" />
                <span>SETTINGS</span>
              </Link>
              <div className="h-[1px] bg-gray-100 dark:bg-[#2b3940] my-1" />
              <Link
                href="/help"
                onClick={() => setShowMoreMenu(false)}
                className="flex items-center gap-3 px-4 py-3 text-xs font-black uppercase tracking-wider text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-[#202f36] transition-colors"
              >
                <HelpCircle className="w-4 h-4 text-gray-400" />
                <span>HELP</span>
              </Link>
            </div>
          )}
        </div>
      </nav>
    </aside>
  );
}
