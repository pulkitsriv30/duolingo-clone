'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  User,
  Settings,
  Trophy,
  Timer,
  Crown,
} from 'lucide-react';
import clsx from 'clsx';

const navItems = [
  { href: '/',                      label: 'Learn',            icon: Home },
  { href: '/lesson/1?mode=legendary', label: 'Timed Practice', icon: Timer, highlight: true },
  { href: '/leaderboard',           label: 'Leaderboard',      icon: Trophy },
  { href: '/profile',               label: 'Profile & Badges', icon: User },
  { href: '/settings',              label: 'Settings',         icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex flex-col w-64 xl:w-72 border-r-2 border-gray-100 dark:border-[#2b3940] bg-white dark:bg-[#182228] px-4 py-6 h-screen sticky top-0 shrink-0">
      {/* Duolingo logo */}
      <Link href="/" className="flex items-center gap-2.5 px-4 mb-8 group">
        <span className="text-4xl transition-transform group-hover:scale-110">🦉</span>
        <span className="text-[#58cc02] font-black text-2xl tracking-tight">duolingo</span>
      </Link>

      {/* Navigation links */}
      <nav className="flex flex-col gap-1.5 flex-1">
        {navItems.map(({ href, label, icon: Icon, highlight }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={clsx(
                'flex items-center gap-4 px-4 py-3 rounded-2xl uppercase font-extrabold text-xs tracking-wider transition-all',
                active
                  ? 'bg-[#ddf4ff] dark:bg-[#103040] text-[#1cb0f6] border-2 border-[#84d8ff] dark:border-[#105070]'
                  : highlight
                  ? 'text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950/30 border-2 border-transparent'
                  : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#202f36] border-2 border-transparent'
              )}
            >
              <Icon className="w-5 h-5 shrink-0" />
              <span>{label}</span>
              {highlight && (
                <span className="ml-auto text-[10px] bg-[#ce82ff] text-white px-1.5 py-0.5 rounded-full font-bold">
                  Bonus
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer hint */}
      <div className="px-4 py-3 bg-gray-50 dark:bg-[#202f36] rounded-2xl border border-gray-100 dark:border-[#2b3940]">
        <p className="text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1">
          Fullstack SDE Project
        </p>
        <p className="text-xs font-extrabold text-gray-600 dark:text-gray-300">
          FastAPI + Next.js + SQLite
        </p>
      </div>
    </aside>
  );
}
