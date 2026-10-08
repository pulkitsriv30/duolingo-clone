'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Trophy, User, Settings, Timer } from 'lucide-react';
import clsx from 'clsx';

const navItems = [
  { href: '/',                        label: 'Learn',     icon: Home },
  { href: '/lesson/1?mode=legendary', label: 'Timed',     icon: Timer },
  { href: '/leaderboard',             label: 'Ranks',     icon: Trophy },
  { href: '/profile',                 label: 'Profile',   icon: User },
  { href: '/settings',                label: 'Settings',  icon: Settings },
];

export default function MobileBottomBar() {
  const pathname = usePathname();

  // Hide the bottom bar when inside the lesson player
  if (pathname.startsWith('/lesson')) return null;

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-white dark:bg-[#182228] border-t-2 border-gray-100 dark:border-[#2b3940] flex items-center justify-around z-50 px-1">
      {navItems.map(({ href, label, icon: Icon }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className={clsx(
              'flex flex-col items-center gap-0.5 px-2 py-1 rounded-xl transition-all',
              active
                ? 'text-[#1cb0f6]'
                : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'
            )}
          >
            <Icon className="w-5 h-5" />
            <span className="text-[10px] font-extrabold uppercase tracking-tight">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
