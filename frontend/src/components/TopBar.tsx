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
    <header className="sticky top-0 bg-white/95 dark:bg-[#182228]/95 backdrop-blur-sm z-40 border-b-2 border-gray-100 dark:border-[#2b3940]">
      <div className="max-w-[1040px] mx-auto px-4 lg:px-8 h-16 flex items-center justify-between sm:justify-end gap-4 sm:gap-6">

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
            <span className="text-sm sm:text-base">{user.streak ?? 0}</span>
          </div>

          {/* Gems */}
          <div className="flex items-center gap-1.5 font-extrabold text-[#1cb0f6]">
            <Gem className="w-5 h-5 sm:w-6 sm:h-6 fill-[#1cb0f6] text-[#1cb0f6]" />
            <span className="text-sm sm:text-base">{user.gems ?? 0}</span>
          </div>

          {/* Hearts */}
          <div className="flex items-center gap-1.5 font-extrabold text-[#ff4b4b]">
            <Heart className="w-5 h-5 sm:w-6 sm:h-6 fill-[#ff4b4b] text-[#ff4b4b]" />
            <span className="text-sm sm:text-base">{user.hearts ?? 5}</span>
          </div>

          {/* Dark Mode Toggle */}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
