'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Shield,
  Zap,
  Store,
  User,
  MoreHorizontal,
} from 'lucide-react';
import clsx from 'clsx';

const navItems = [
  { href: '/',             label: 'LEARN',        icon: Home,           color: 'text-[#58cc02]' },
  { href: '/leaderboard',  label: 'LEADERBOARDS', icon: Shield,         color: 'text-[#ffc800]' },
  { href: '/profile',      label: 'QUESTS',       icon: Zap,            color: 'text-[#ff9600]' },
  { href: '/settings',     label: 'SHOP',         icon: Store,          color: 'text-[#1cb0f6]' },
  { href: '/profile',      label: 'PROFILE',      icon: User,           color: 'text-[#ce82ff]' },
  { href: '/settings',     label: 'MORE',         icon: MoreHorizontal, color: 'text-gray-400' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex flex-col w-64 xl:w-68 border-r-2 border-gray-100 dark:border-[#2b3940] bg-white dark:bg-[#131f24] px-4 py-6 h-screen sticky top-0 shrink-0">
      {/* Duolingo Logo */}
      <Link href="/" className="flex items-center gap-2 px-3 mb-8 group">
        <span className="text-[#58cc02] font-black text-3xl tracking-tight">duolingo</span>
      </Link>

      {/* Navigation links matching screenshot */}
      <nav className="flex flex-col gap-2 flex-1">
        {navItems.map(({ href, label, icon: Icon, color }) => {
          const active =
            label === 'LEARN'
              ? pathname === '/' || pathname.startsWith('/lesson')
              : label === 'LEADERBOARDS'
              ? pathname === '/leaderboard'
              : label === 'PROFILE'
              ? pathname === '/profile'
              : label === 'SHOP'
              ? pathname === '/settings'
              : false;

          return (
            <Link
              key={label}
              href={href}
              className={clsx(
                'flex items-center gap-4 px-4 py-3 rounded-2xl font-black text-xs tracking-wider transition-all uppercase',
                active
                  ? 'bg-[#ddf4ff] dark:bg-[#103040] text-[#1cb0f6] border-2 border-[#84d8ff] dark:border-[#38bdf8] shadow-sm'
                  : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#202f36] border-2 border-transparent'
              )}
            >
              <div className="w-7 h-7 flex items-center justify-center">
                <Icon className={clsx('w-6 h-6', active ? 'text-[#1cb0f6]' : color)} strokeWidth={2.5} />
              </div>
              <span className="font-extrabold text-xs tracking-wider">{label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
