export const dynamic = 'force-dynamic';

import { fetchUser, fetchAchievements } from '@/lib/api';
import TopBar from '@/components/TopBar';
import { CheckCircle, Lock } from 'lucide-react';
import clsx from 'clsx';

export default async function ProfilePage() {
  let user: any;
  let achievements: any[] = [];

  try {
    const [u, a] = await Promise.all([
      fetchUser(1),
      fetchAchievements(1),
    ]);
    user = u;
    achievements = a.achievements || [];
  } catch {
    user = {
      username: 'learner123',
      display_name: 'Alex',
      streak: 5,
      xp: 320,
      hearts: 4,
      gems: 450,
      daily_xp: 30,
      daily_goal: 50,
      completed_skills: [1, 2],
    };
    achievements = [
      { id: "first_lesson", title: "First Step", desc: "Complete your first skill", icon: "🎓", progress: 1, target: 1, unlocked: true },
      { id: "wildfire", title: "Wildfire", desc: "Reach a 7-day streak", icon: "🔥", progress: 5, target: 7, unlocked: false },
      { id: "sage", title: "Sage", desc: "Earn 500 total XP", icon: "⭐", progress: 320, target: 500, unlocked: false },
      { id: "scholar", title: "Scholar", desc: "Complete 3 skills", icon: "📚", progress: 2, target: 3, unlocked: false },
      { id: "heart_guard", title: "Heart Guard", desc: "Keep all 5 hearts", icon: "❤️", progress: 4, target: 5, unlocked: false },
      { id: "legendary", title: "Legendary Master", desc: "Complete a Legendary timed challenge", icon: "👑", progress: 1, target: 1, unlocked: true },
    ];
  }

  const stats = [
    { label: 'Day Streak',      value: `${user.streak} Days`, icon: '🔥', color: 'text-orange-500' },
    { label: 'Total XP',        value: `${user.xp} XP`,       icon: '⭐', color: 'text-yellow-500' },
    { label: 'Hearts',          value: `${user.hearts} / 5`,  icon: '❤️', color: 'text-red-500'    },
    { label: 'Gems',            value: user.gems,             icon: '💎', color: 'text-blue-500'   },
    { label: 'Skills Mastered', value: (user.completed_skills as number[]).length, icon: '🏅', color: 'text-green-500' },
    { label: 'Daily Goal',      value: `${user.daily_xp}/${user.daily_goal} XP`, icon: '🎯', color: 'text-purple-500' },
  ];

  const totalUnlocked = achievements.filter((a) => a.unlocked).length;

  return (
    <>
      <TopBar user={user} />

      <div className="max-w-[760px] mx-auto px-4 lg:px-8 py-8 pb-24">
        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-10 pb-8 border-b-2 border-gray-100 dark:border-[#2b3940]">
          <div className="w-24 h-24 rounded-full bg-[#ddf4ff] dark:bg-[#103040] text-[#1cb0f6] flex items-center justify-center text-5xl font-extrabold shadow-inner shrink-0">
            {(user.display_name || user.username)[0].toUpperCase()}
          </div>
          <div className="text-center sm:text-left flex-1">
            <h1 className="text-3xl font-extrabold text-gray-700 dark:text-white">
              {user.display_name || user.username}
            </h1>
            <p className="text-gray-400 font-semibold text-sm mt-0.5">@{user.username}</p>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-3">
              <span className="text-xs bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 font-bold px-3 py-1 rounded-full border border-emerald-300 dark:border-emerald-800">
                🇪🇸 Learning Spanish
              </span>
              <span className="text-xs bg-purple-100 dark:bg-purple-950/40 text-purple-700 dark:text-purple-400 font-bold px-3 py-1 rounded-full border border-purple-300 dark:border-purple-800">
                👑 Bronze League
              </span>
              <span className="text-xs bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 font-bold px-3 py-1 rounded-full border border-amber-300 dark:border-amber-800">
                🏆 {totalUnlocked}/{achievements.length} Badges
              </span>
            </div>
          </div>
        </div>

        {/* Statistics Grid */}
        <h2 className="text-xl font-extrabold text-gray-700 dark:text-white mb-4">Statistics</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-10">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="border-2 border-gray-100 dark:border-[#2b3940] bg-white dark:bg-[#182228] rounded-2xl p-4 flex flex-col items-center text-center shadow-sm"
            >
              <span className="text-3xl mb-1">{stat.icon}</span>
              <span className={`font-extrabold text-xl ${stat.color}`}>{stat.value}</span>
              <span className="text-xs text-gray-400 font-bold uppercase tracking-wide mt-0.5">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Dynamic Achievements & Badges Grid */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-extrabold text-gray-700 dark:text-white">
            Achievements & Badges
          </h2>
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            {totalUnlocked} of {achievements.length} Unlocked
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {achievements.map((a) => {
            const pct = Math.min(100, Math.round(((a.progress || 0) / (a.target || 1)) * 100));

            return (
              <div
                key={a.id}
                className={clsx(
                  'border-2 rounded-2xl p-4 flex items-start gap-4 transition-all',
                  a.unlocked
                    ? 'border-[#ffc800] bg-[#fff9e6] dark:bg-[#2e2600]/40'
                    : 'border-gray-200 dark:border-[#2b3940] bg-white dark:bg-[#182228] opacity-80'
                )}
              >
                <div className={clsx(
                  'w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shrink-0 shadow-sm',
                  a.unlocked ? 'bg-[#ffc800]/20' : 'bg-gray-100 dark:bg-gray-800'
                )}>
                  {a.unlocked ? a.icon : <Lock className="w-6 h-6 text-gray-400" />}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-extrabold text-gray-800 dark:text-white text-sm truncate">
                      {a.title}
                    </p>
                    {a.unlocked && (
                      <CheckCircle className="w-4 h-4 text-[#ffc800] fill-[#ffc800] shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{a.desc}</p>

                  {/* Progress bar */}
                  <div className="mt-3">
                    <div className="flex justify-between text-[10px] font-bold text-gray-400 mb-1">
                      <span>Progress</span>
                      <span>{a.progress} / {a.target}</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className={clsx(
                          'h-full rounded-full transition-all duration-500',
                          a.unlocked ? 'bg-[#ffc800]' : 'bg-[#1cb0f6]'
                        )}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
