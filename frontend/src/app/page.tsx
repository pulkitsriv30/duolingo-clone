export const dynamic = 'force-dynamic';

import { fetchUnits, fetchUser } from '@/lib/api';
import Link from 'next/link';
import TopBar from '@/components/TopBar';
import TestSimulateWidget from '@/components/TestSimulateWidget';
import clsx from 'clsx';
import { Lock, Crown, Timer, Sparkles } from 'lucide-react';

const PATH_OFFSETS = [-50, 0, 50, 0];

export default async function HomePage() {
  let units: any[] = [];
  let user: any;
  try {
    const [un, us] = await Promise.all([fetchUnits(), fetchUser(1)]);
    units = un;
    user = us;
  } catch {
    units = [
      {
        id: 1,
        title: "Unit 1",
        description: "Basics 1",
        color: "bg-emerald-500",
        language: "Spanish",
        skills: [
          { id: 1, title: "Intro", icon: "⭐", color: "bg-yellow-400" },
          { id: 2, title: "Greetings", icon: "👋", color: "bg-orange-400" },
          { id: 3, title: "Animals", icon: "🐶", color: "bg-pink-400" },
        ],
      },
      {
        id: 2,
        title: "Unit 2",
        description: "Phrases",
        color: "bg-blue-500",
        language: "Spanish",
        skills: [
          { id: 4, title: "Food", icon: "🍎", color: "bg-red-400" },
          { id: 5, title: "Numbers", icon: "🔢", color: "bg-blue-400" },
          { id: 6, title: "Colors", icon: "🎨", color: "bg-indigo-400" },
        ],
      },
      {
        id: 3,
        title: "Unit 3",
        description: "Travel",
        color: "bg-purple-500",
        language: "Spanish",
        skills: [
          { id: 7, title: "Travel", icon: "✈️", color: "bg-teal-400" },
          { id: 8, title: "Restaurant", icon: "🍽️", color: "bg-amber-400" },
        ],
      },
    ];
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
  }

  const completedSet = new Set<number>(user.completed_skills as number[]);

  function isUnlocked(allSkills: any[], index: number): boolean {
    if (index === 0) return true;
    return completedSet.has(allSkills[index - 1].id);
  }

  return (
    <>
      <TopBar user={user} />

      <div className="flex max-w-[1040px] mx-auto w-full px-4 lg:px-8">
        {/* Learning Path (center column) */}
        <div className="flex-1 py-8 pb-24">
          {(units as any[]).map((unit: any) => {
            const skills: any[] = unit.skills;

            return (
              <section key={unit.id} className="mb-16">
                {/* Unit Header Banner */}
                <div className={clsx(
                  'rounded-2xl p-5 text-white font-extrabold mb-10 flex items-center justify-between shadow-sm',
                  unit.color || 'bg-emerald-500'
                )}>
                  <div>
                    <p className="text-xs sm:text-sm font-bold uppercase opacity-80 tracking-wider">{unit.language}</p>
                    <h2 className="text-lg sm:text-xl">{unit.title} — {unit.description}</h2>
                  </div>
                  <span className="text-3xl sm:text-4xl">📖</span>
                </div>

                {/* Skill Nodes — winding path */}
                <div className="flex flex-col items-center gap-10">
                  {skills.map((skill: any, idx: number) => {
                    const done = completedSet.has(skill.id);
                    const unlocked = isUnlocked(skills, idx);
                    const offset = PATH_OFFSETS[idx % PATH_OFFSETS.length];

                    return (
                      <div
                        key={skill.id}
                        className="relative flex flex-col items-center"
                        style={{ transform: `translateX(${offset}px)` }}
                      >
                        {/* Connector line above (except first) */}
                        {idx > 0 && (
                          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-1.5 h-10 bg-gray-200 dark:bg-gray-700 rounded-full" />
                        )}

                        {unlocked ? (
                          <div className="relative group">
                            <Link href={`/lesson/${skill.id}`} className="skill-node block">
                              <SkillNode skill={skill} done={done} />
                            </Link>

                            {/* Legendary Challenge button for completed skills */}
                            {done && (
                              <Link
                                href={`/lesson/${skill.id}?mode=legendary`}
                                className="absolute -top-2 -right-3 bg-[#ce82ff] hover:bg-[#b85eff] text-white p-1.5 rounded-full shadow-[0_2px_0_#8e26ca] transition-all hover:scale-110"
                                title="Play Legendary Challenge (Timed, +40 XP)"
                              >
                                <Crown className="w-4 h-4" />
                              </Link>
                            )}
                          </div>
                        ) : (
                          <div className="skill-node opacity-60 cursor-not-allowed">
                            <SkillNode skill={skill} done={done} locked />
                          </div>
                        )}

                        {/* Skill title below node */}
                        <p className="text-center text-xs font-extrabold text-gray-500 dark:text-gray-400 uppercase tracking-wide mt-2 w-28">
                          {skill.title}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>

        {/* Right-side widgets (desktop only) */}
        <aside className="hidden xl:flex flex-col w-80 py-8 pl-8 gap-5 shrink-0">
          <ProfileWidget user={user} />
          <LegendaryTimedWidget />
          <DailyGoalWidget user={user} />
          <TestSimulateWidget currentStreak={user.streak ?? 5} />
        </aside>
      </div>
    </>
  );
}

// ---------- Sub-components ----------

function SkillNode({ skill, done, locked }: { skill: any; done: boolean; locked?: boolean }) {
  const colors = {
    done:     { bg: 'bg-[#ffc800]', border: 'border-[#e6ac00]', shadow: 'shadow-[0_6px_0_#b38600]' },
    active:   { bg: 'bg-[#58cc02]', border: 'border-[#46a302]', shadow: 'shadow-[0_6px_0_#378000]' },
    locked:   { bg: 'bg-gray-300 dark:bg-gray-700',  border: 'border-gray-400 dark:border-gray-600',  shadow: 'shadow-[0_6px_0_#888]' },
  };
  const style = done ? colors.done : locked ? colors.locked : colors.active;

  return (
    <div className={clsx(
      'w-20 h-20 rounded-full flex items-center justify-center text-3xl font-extrabold transition-all duration-150 active:translate-y-1 active:shadow-none cursor-pointer',
      style.bg,
      style.shadow,
      'border-b-[6px]',
      style.border
    )}>
      {locked ? <Lock className="w-8 h-8 text-gray-500 dark:text-gray-400" /> : <span>{skill.icon}</span>}
    </div>
  );
}

function LegendaryTimedWidget() {
  return (
    <div className="border-2 border-purple-200 dark:border-purple-900/60 rounded-2xl p-4 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-[#201030] dark:to-[#18152c]">
      <div className="flex items-center gap-2 mb-2">
        <Sparkles className="w-5 h-5 text-[#ce82ff]" />
        <p className="font-extrabold text-purple-950 dark:text-purple-200 text-sm">
          Legendary Challenge
        </p>
      </div>
      <p className="text-xs text-purple-800 dark:text-purple-300 mb-3">
        Test your speed! 60s timed session for <span className="font-extrabold text-[#9d40e0] dark:text-[#ce82ff]">+40 XP</span>.
      </p>
      <Link
        href="/lesson/1?mode=legendary"
        className="flex items-center justify-center gap-2 w-full text-center text-xs font-extrabold text-white bg-[#ce82ff] hover:bg-[#b85eff] rounded-xl py-2.5 shadow-[0_3px_0_#8e26ca] active:translate-y-0.5 active:shadow-none transition-all uppercase tracking-wider"
      >
        <Timer className="w-4 h-4" />
        Start Timed Practice
      </Link>
    </div>
  );
}

function ProfileWidget({ user }: { user: any }) {
  return (
    <div className="border-2 border-gray-200 dark:border-[#2b3940] rounded-2xl p-4 bg-white dark:bg-[#182228]">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-12 h-12 rounded-full bg-[#ddf4ff] dark:bg-[#103040] flex items-center justify-center text-2xl font-extrabold text-[#1cb0f6]">
          {(user.display_name || user.username || 'L')[0].toUpperCase()}
        </div>
        <div>
          <p className="font-extrabold text-gray-700 dark:text-white">{user.display_name || user.username}</p>
          <p className="text-xs text-gray-400 font-semibold">{user.xp} Total XP</p>
        </div>
      </div>
      <Link
        href="/profile"
        className="block text-center text-xs font-extrabold uppercase tracking-wider text-[#1cb0f6] border-2 border-[#84d8ff] dark:border-[#105070] rounded-xl py-2 hover:bg-[#ddf4ff] dark:hover:bg-[#153545] transition-colors"
      >
        View Profile & Badges
      </Link>
    </div>
  );
}

function DailyGoalWidget({ user }: { user: any }) {
  const dailyXp = user.daily_xp ?? 0;
  const dailyGoal = user.daily_goal ?? 50;
  const pct = Math.min(100, Math.round((dailyXp / dailyGoal) * 100));
  const done = dailyXp >= dailyGoal;

  return (
    <div className="border-2 border-gray-200 dark:border-[#2b3940] rounded-2xl p-4 bg-white dark:bg-[#182228]">
      <p className="font-extrabold text-gray-700 dark:text-white text-sm mb-3">Daily XP Goal</p>
      <div className="flex items-center gap-3">
        <span className="text-2xl">{done ? '🏆' : '🎯'}</span>
        <div className="flex-1">
          <div className="flex justify-between text-xs font-bold text-gray-500 dark:text-gray-400 mb-1">
            <span>{dailyXp} XP</span>
            <span>{dailyGoal} XP</span>
          </div>
          <div className="w-full h-3.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className={clsx(
                'h-full rounded-full transition-all duration-500',
                done ? 'bg-[#58cc02]' : 'bg-[#ffc800]'
              )}
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      </div>
      {done && (
        <p className="text-xs text-[#58cc02] font-bold mt-2 text-center">Goal reached! Keep going!</p>
      )}
    </div>
  );
}
