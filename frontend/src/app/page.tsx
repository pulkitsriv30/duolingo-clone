export const dynamic = 'force-dynamic';

import { fetchUnits, fetchUser } from '@/lib/api';
import { cookies } from 'next/headers';
import Link from 'next/link';
import TopBar from '@/components/TopBar';
import TestSimulateWidget from '@/components/TestSimulateWidget';
import DuoMascot from '@/components/illustrations/DuoMascot';
import clsx from 'clsx';
import { Lock, Crown, Star, BookOpen, Shield, Zap, Gift } from 'lucide-react';

const PATH_OFFSETS = [-45, 0, 45, 0];

export default async function HomePage() {
  const cookieStore = await cookies();
  const localCompleted = cookieStore.getAll().filter((c: any) => c.name.startsWith("completed_")).map((c: any) => parseInt(c.name.split("_")[1]));
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
        title: "Section 1, Unit 1",
        description: "Order at a café",
        color: "bg-[#58cc02]",
        language: "Spanish",
        skills: [
          { id: 1, title: "Intro", icon: "⭐", color: "bg-[#58cc02]" },
          { id: 2, title: "Greetings", icon: "⭐", color: "bg-[#202f36]" },
          { id: 3, title: "Chest", icon: "🎁", isChest: true, color: "bg-[#202f36]" },
          { id: 4, title: "Animals", icon: "⭐", color: "bg-[#202f36]" },
          { id: 5, title: "Food", icon: "⭐", color: "bg-[#202f36]" },
        ],
      },
    ];
    user = {
      username: 'learner123',
      display_name: 'Alex',
      streak: 1,
      xp: 10,
      hearts: 5,
      gems: 505,
      daily_xp: 10,
      daily_goal: 10,
      completed_skills: [],
    };
  }

  const completedSet = new Set<number>([ ...(user.completed_skills as number[]), ...localCompleted ]);

  function isUnlocked(allSkills: any[], index: number): boolean {
    if (index === 0) return true;
    return completedSet.has(allSkills[index - 1].id);
  }

  return (
    <>
      <TopBar user={user} />

      <div className="flex max-w-[1080px] mx-auto w-full px-4 lg:px-8">
        {/* Learning Path (Center Column matching Duolingo screenshot) */}
        <div className="flex-1 py-6 pb-24 max-w-[580px] mx-auto">
          {(units as any[]).map((unit: any, uIdx: number) => {
            const skills: any[] = unit.skills || [];

            return (
              <section key={unit.id} className="mb-14">
                {/* Unit Header Banner (Matches screenshot: Green banner with Section 1 Unit 1 + GUIDEBOOK button) */}
                <div className="rounded-2xl p-4 sm:p-5 text-white font-extrabold mb-10 flex items-center justify-between bg-[#58cc02] shadow-[0_4px_0_#46a302]">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-white/90 mb-1">
                      <span>&larr;</span>
                      <span>SECTION {unit.order || uIdx + 1}, UNIT 1</span>
                    </div>
                    <h2 className="text-2xl sm:text-[28px] font-black tracking-tight text-white leading-tight">
                      {unit.description || 'Order at a café'}
                    </h2>
                  </div>

                  {/* GUIDEBOOK pill button */}
                  <Link
                    href={`/lesson/${skills[0]?.id || 1}`}
                    className="flex items-center gap-2.5 bg-transparent hover:bg-black/10 active:translate-y-0.5 border-2 border-white/40 text-white px-4 py-2.5 rounded-2xl font-black text-xs sm:text-sm uppercase tracking-wider transition-all"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>GUIDEBOOK</span>
                  </Link>
                </div>

                {/* Skill Nodes Path */}
                <div className="relative flex flex-col items-center gap-9 py-2">
                  {skills.map((skill: any, idx: number) => {
                    const done = completedSet.has(skill.id);
                    const unlocked = isUnlocked(skills, idx);
                    const isFirstActive = unlocked && !done && (idx === 0 || completedSet.has(skills[idx - 1]?.id));
                    const offset = PATH_OFFSETS[idx % PATH_OFFSETS.length];

                    return (
                      <div
                        key={skill.id}
                        className="relative flex flex-col items-center z-10"
                        style={{ transform: `translateX(${offset}px)` }}
                      >
                        {/* Connector track line above (except first) */}
                        {idx > 0 && (
                          <div className="absolute -top-9 left-1/2 -translate-x-1/2 w-2 h-9 bg-gray-200 dark:bg-[#202f36] rounded-full" />
                        )}

                        
                        {/* ANIMATED DUO THE OWL MASCOT */}
                        {isFirstActive && (
                          <div className="absolute right-[-80px] sm:right-[-120px] top-0 z-20 flex flex-col items-center pointer-events-none select-none">
                            <DuoMascot className="w-24 h-24 sm:w-28 sm:h-28" />
                          </div>
                        )}

                        {/* Floating "START" speech bubble for the active node (Authentic dark tooltip with bright green text) */}
                        {isFirstActive && (
                          <div className="absolute -top-11 left-1/2 -translate-x-1/2 z-30 start-bounce pointer-events-none">
                            <div className="relative bg-[#202f36] border-2 border-[#2b3940] text-[#58cc02] px-4 py-1.5 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider shadow-lg whitespace-nowrap">
                              START
                              {/* Speech bubble down arrow pointing to the node */}
                              <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-[#202f36] border-b-2 border-r-2 border-[#2b3940] rotate-45" />
                            </div>
                          </div>
                        )}

                        {unlocked ? (
                          <div className="relative group">
                            <Link href={`/lesson/${skill.id}`} className="block">
                              <SkillNode
                                skill={skill}
                                done={done}
                                active={isFirstActive}
                              />
                            </Link>

                            {/* Legendary Challenge crown button for completed skills */}
                            {done && (
                              <Link
                                href={`/lesson/${skill.id}?mode=legendary`}
                                className="absolute -top-2 -right-2 bg-[#ce82ff] hover:bg-[#b85eff] text-white p-1.5 rounded-full shadow-[0_2px_0_#8e26ca] transition-all hover:scale-110"
                                title="Play Legendary Challenge (Timed, +40 XP)"
                              >
                                <Crown className="w-3.5 h-3.5" />
                              </Link>
                            )}
                          </div>
                        ) : (
                          <div className="opacity-90 cursor-not-allowed">
                            <SkillNode skill={skill} done={done} locked />
                          </div>
                        )}
                      </div>
                    );
                  })}

                  {/* Treasure Chest Node at the bottom (Matches screenshot: slate chest with keyhole) */}
                  <div
                    className="relative flex flex-col items-center z-10"
                    style={{ transform: 'translateX(0px)' }}
                  >
                    <div className="w-16 h-14 bg-[#202f36] border-2 border-b-[5px] border-[#2b3940] rounded-2xl flex items-center justify-center shadow-md">
                      <svg viewBox="0 0 24 24" className="w-8 h-8 text-[#4b5e68] fill-[#37464f]" stroke="currentColor" strokeWidth="1.5">
                        <path d="M4 8h16v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8z" />
                        <path d="M2 5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v3H2V5z" fill="#43535d" />
                        <circle cx="12" cy="13" r="1.5" fill="#202f36" />
                      </svg>
                    </div>
                  </div>
                </div>
              </section>
            );
          })}
        </div>

        {/* Right-Side Column Widgets (Matches screenshot layout & authentic styling) */}
        <aside className="hidden xl:flex flex-col w-84 py-6 pl-8 gap-5 shrink-0">
          {/* Widget 1: Unlock Leaderboards! (Matches screenshot) */}
          <div className="border-2 border-[#2b3940] rounded-2xl p-4 bg-[#182228]">
            <h3 className="font-black text-white text-base mb-3">
              Unlock Leaderboards!
            </h3>
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-14 bg-[#202f36] rounded-xl flex items-center justify-center border border-[#2b3940] shrink-0">
                <Shield className="w-6 h-6 text-[#52656d]" />
              </div>
              <p className="text-sm font-bold text-[#839299] leading-snug">
                Complete 2 more lessons to start competing
              </p>
            </div>
          </div>

          {/* Widget 2: Daily Quests (Matches screenshot: Earn 10 XP with lightning & golden progress bar) */}
          <div className="border-2 border-[#2b3940] rounded-2xl p-4 bg-[#182228]">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-black text-white text-base">
                Daily Quests
              </h3>
              <Link href="/profile" className="text-xs font-black text-[#1cb0f6] uppercase tracking-wider hover:underline">
                VIEW ALL
              </Link>
            </div>

            <div className="flex items-center gap-3">
              {/* Lightning Bolt Icon */}
              <div className="w-10 h-10 rounded-xl bg-amber-400/20 flex items-center justify-center text-[#ffc800] shrink-0">
                <Zap className="w-6 h-6 fill-[#ffc800]" />
              </div>

              <div className="flex-1">
                <p className="text-sm font-black text-white mb-1.5">
                  Earn 10 XP
                </p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-4 bg-[#202f36] rounded-full overflow-hidden p-0.5 border border-[#2b3940]">
                    <div
                      className="h-full bg-gradient-to-r from-[#ffd900] to-[#ffc800] rounded-full flex items-center justify-center transition-all duration-500"
                      style={{ width: `${Math.min(100, Math.round(((user.daily_xp || 10) / 10) * 100))}%` }}
                    >
                      <span className="text-[10px] font-black text-[#6a4700]">10 / 10</span>
                    </div>
                  </div>
                  <Gift className="w-5 h-5 text-[#a57134] fill-[#a57134]/30 shrink-0" />
                </div>
              </div>
            </div>
          </div>

          {/* Widget 3: Create a profile to save your progress! (Matches screenshot buttons) */}
          <div className="border-2 border-[#2b3940] rounded-2xl p-4 bg-[#182228] flex flex-col gap-3">
            <h3 className="font-black text-white text-base leading-snug">
              Create a profile to save your progress!
            </h3>
            <Link
              href="/profile"
              className="w-full text-center bg-[#58cc02] text-white font-black py-3.5 rounded-2xl text-xs sm:text-sm uppercase tracking-wider shadow-[0_4px_0_#46a302] active:translate-y-1 active:shadow-none transition-all hover:brightness-105"
            >
              CREATE A PROFILE
            </Link>
            <Link
              href="/profile"
              className="w-full text-center bg-[#1cb0f6] text-white font-black py-3.5 rounded-2xl text-xs sm:text-sm tracking-wider uppercase shadow-[0_4px_0_#1899d6] active:translate-y-1 active:shadow-none transition-all hover:brightness-105"
            >
              SIGN IN
            </Link>
          </div>

          {/* Streak Simulation Testing Tool */}
          <TestSimulateWidget currentStreak={user.streak ?? 1} />

          {/* Footer Links (Matches screenshot bottom text) */}
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[11px] font-black text-[#52656d] uppercase tracking-widest pt-2">
            <span>ABOUT</span>
            <span>&bull;</span>
            <span>BLOG</span>
            <span>&bull;</span>
            <span>STORE</span>
            <span>&bull;</span>
            <span>EFFICACY</span>
            <span>&bull;</span>
            <span>CAREERS</span>
          </div>
        </aside>
      </div>
    </>
  );
}

// ---------- Skill Node Component matching Duolingo circular star buttons ----------

function SkillNode({
  skill,
  done,
  locked,
  active,
}: {
  skill: any;
  done: boolean;
  locked?: boolean;
  active?: boolean;
}) {
  if (locked) {
    return (
      <div className="relative w-20 h-20 rounded-full flex items-center justify-center bg-[#202f36] border-b-[6px] border-[#18252b] shadow-[0_4px_0_#141f24] transition-all">
        <Star className="w-8 h-8 text-[#37464f] fill-[#37464f]" />
      </div>
    );
  }

  if (done) {
    return (
      <div className="relative w-20 h-20 rounded-full flex items-center justify-center bg-[#ffc800] border-b-[6px] border-[#e6ac00] shadow-[0_6px_0_#b38600] active:translate-y-1 active:shadow-none transition-all cursor-pointer">
        <Star className="w-9 h-9 text-white fill-white" />
      </div>
    );
  }

  // Active Node with Progress Ring (Matches screenshot: bright green with outer track ring)
  return (
    <div className="relative flex items-center justify-center w-24 h-24">
      {/* Outer circular progress track */}
      <div className="absolute inset-0 rounded-full border-[5px] border-[#202f36]" />
      <div className="absolute inset-0 rounded-full border-[5px] border-[#58cc02] border-t-transparent border-l-transparent -rotate-45" />

      {/* Center green button */}
      <div className="w-18 h-18 rounded-full flex items-center justify-center bg-[#58cc02] border-b-[6px] border-[#46a302] shadow-[0_6px_0_#378000] active:translate-y-1 active:shadow-none transition-all cursor-pointer">
        <Star className="w-9 h-9 text-white fill-white" />
      </div>
    </div>
  );
}
