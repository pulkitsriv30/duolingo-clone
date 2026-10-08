import { Flame, Gem, Heart } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

interface TopBarProps {
  user: {
    streak: number;
    gems: number;
    hearts: number;
    daily_xp: number;
    daily_goal: number;
  };
}

export default function TopBar({ user }: TopBarProps) {
  const xpPct = Math.min(100, Math.round(((user.daily_xp ?? 0) / (user.daily_goal ?? 50)) * 100));

  return (
    <header className="sticky top-0 bg-white/95 dark:bg-[#131f24]/95 backdrop-blur-sm z-40 border-b-2 border-gray-100 dark:border-[#2b3940]">
      <div className="max-w-[1040px] mx-auto px-4 lg:px-8 h-16 flex items-center justify-between sm:justify-end gap-3 sm:gap-6">

        {/* Course Flag Badge (Matches screenshot: Spanish flag with unit number) */}
        <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-[#202f36] cursor-pointer transition-colors">
          <span className="text-xl">🇪🇸</span>
          <span className="text-xs font-black text-gray-700 dark:text-gray-300">1</span>
        </div>

        {/* Daily XP Goal bar */}
        <div className="hidden md:flex items-center gap-2">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">Daily Goal</span>
          <div className="w-24 h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#ffc800] rounded-full transition-all duration-500"
              style={{ width: `${xpPct}%` }}
            />
          </div>
          <span className="text-xs font-bold text-gray-500">{user.daily_xp ?? 0}/{user.daily_goal ?? 50} XP</span>
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          {/* Streak */}
          <div className="flex items-center gap-1.5 font-extrabold text-[#ff9600]">
            <Flame className="w-5 h-5 sm:w-6 sm:h-6 fill-[#ff9600] text-[#ff9600]" />
            <span className="text-sm sm:text-base font-black">{user.streak ?? 1}</span>
          </div>

          {/* Gems */}
          <div className="flex items-center gap-1.5 font-extrabold text-[#1cb0f6]">
            <Gem className="w-5 h-5 sm:w-6 sm:h-6 fill-[#1cb0f6] text-[#1cb0f6]" />
            <span className="text-sm sm:text-base font-black">{user.gems ?? 505}</span>
          </div>

          {/* Hearts */}
          <div className="flex items-center gap-1.5 font-extrabold text-[#ff4b4b]">
            <Heart className="w-5 h-5 sm:w-6 sm:h-6 fill-[#ff4b4b] text-[#ff4b4b]" />
            <span className="text-sm sm:text-base font-black">{user.hearts ?? 5}</span>
          </div>

          {/* Dark Mode Toggle */}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
