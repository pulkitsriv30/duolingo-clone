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
    <header className="sticky top-0 bg-white/95 dark:bg-[#131f24]/95 backdrop-blur-sm z-40 border-b border-gray-100 dark:border-[#202f36]">
      <div className="max-w-[1080px] mx-auto px-4 lg:px-8 h-16 flex items-center justify-end gap-5 sm:gap-7">
        {/* Course Flag Badge (Spanish flag with section/level number 1) */}
        <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-[#202f36] cursor-pointer transition-colors">
          <span className="text-xl leading-none">🇪🇸</span>
          <span className="text-sm font-black text-gray-700 dark:text-gray-200">1</span>
        </div>

        {/* Streak */}
        <div className="flex items-center gap-1.5 font-black text-[#ff9600]">
          <Flame className="w-5 h-5 sm:w-6 sm:h-6 fill-[#ff9600] text-[#ff9600]" />
          <span className="text-sm sm:text-base font-black">{user.streak ?? 1}</span>
        </div>

        {/* Gems */}
        <div className="flex items-center gap-1.5 font-black text-[#1cb0f6]">
          <Gem className="w-5 h-5 sm:w-6 sm:h-6 fill-[#1cb0f6] text-[#1cb0f6]" />
          <span className="text-sm sm:text-base font-black">{user.gems ?? 505}</span>
        </div>

        {/* Hearts */}
        <div className="flex items-center gap-1.5 font-black text-[#ff4b4b]">
          <Heart className="w-5 h-5 sm:w-6 sm:h-6 fill-[#ff4b4b] text-[#ff4b4b]" />
          <span className="text-sm sm:text-base font-black">{user.hearts ?? 5}</span>
        </div>

        {/* Dark Mode Toggle */}
        <ThemeToggle />
      </div>
    </header>
  );
}
