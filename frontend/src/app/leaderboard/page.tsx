export const dynamic = 'force-dynamic';

import { fetchLeaderboard, fetchUser } from '@/lib/api';
import TopBar from '@/components/TopBar';
import { Trophy, Flame, Shield, ArrowUpCircle } from 'lucide-react';
import clsx from 'clsx';

const MEDAL_EMOJI  = ['🥇', '🥈', '🥉'];

export default async function LeaderboardPage() {
  let users: any[] = [];
  let currentUser: any;

  try {
    const [u, cu] = await Promise.all([
      fetchLeaderboard(),
      fetchUser(1),
    ]);
    users = u;
    currentUser = cu;
  } catch {
    users = [
      { id: 2, username: 'polyglot99', display_name: 'Maria', xp: 1850, streak: 21 },
      { id: 4, username: 'verbmaster', display_name: 'Sofia', xp: 980, streak: 14 },
      { id: 3, username: 'language_fan', display_name: 'Ryu', xp: 640, streak: 3 },
      { id: 5, username: 'hola_amigo', display_name: 'Diego', xp: 430, streak: 8 },
      { id: 1, username: 'learner123', display_name: 'Alex', xp: 320, streak: 5 },
    ];
    currentUser = { id: 1, username: 'learner123', display_name: 'Alex', xp: 320, streak: 5, hearts: 4, gems: 450, daily_xp: 30, daily_goal: 50 };
  }

  // Find current user's rank
  const myRank = users.findIndex((u) => u.id === 1) + 1;

  return (
    <>
      <TopBar user={currentUser} />

      <div className="max-w-[720px] mx-auto px-4 lg:px-8 py-8 pb-24">
        {/* League Header Banner */}
        <div className="flex items-center gap-4 bg-gradient-to-r from-amber-500 to-yellow-500 text-white p-5 rounded-2xl mb-8 shadow-sm">
          <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center text-3xl shrink-0">
            🛡️
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">Bronze League</h1>
              <span className="text-xs bg-white/25 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
                Rank #{myRank || '-'}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-amber-100 font-semibold mt-0.5">
              Top 3 learners advance to the Silver League on Sunday!
            </p>
          </div>
        </div>

        {/* Promotion Zone notification */}
        <div className="flex items-center gap-2 text-xs font-bold text-[#58cc02] bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 px-4 py-2.5 rounded-xl mb-6">
          <ArrowUpCircle className="w-4 h-4 shrink-0" />
          <span>Promotion Zone: Top 3 ranks advance to the next league!</span>
        </div>

        {/* User list */}
        <div className="flex flex-col gap-3">
          {(users as any[]).map((user: any, idx: number) => {
            const isMe = user.id === 1;
            const top3 = idx < 3;

            return (
              <div
                key={user.id}
                className={clsx(
                  'flex items-center gap-3 sm:gap-4 px-4 sm:px-5 py-4 rounded-2xl border-2 transition-all',
                  isMe
                    ? 'border-[#84d8ff] bg-[#ddf4ff] dark:bg-[#103040] dark:border-[#105070] shadow-sm'
                    : 'border-gray-100 dark:border-[#2b3940] bg-white dark:bg-[#182228] hover:bg-gray-50 dark:hover:bg-[#202f36]',
                )}
              >
                {/* Rank number or medal */}
                <div className="w-8 sm:w-10 text-center shrink-0">
                  {top3 ? (
                    <span className="text-xl sm:text-2xl">{MEDAL_EMOJI[idx]}</span>
                  ) : (
                    <span className="font-extrabold text-gray-400 dark:text-gray-500 text-base sm:text-lg">
                      {idx + 1}
                    </span>
                  )}
                </div>

                {/* Avatar */}
                <div className={clsx(
                  'w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-extrabold text-lg sm:text-xl shrink-0',
                  isMe ? 'bg-[#1cb0f6] text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                )}>
                  {(user.display_name || user.username)[0].toUpperCase()}
                </div>

                {/* Name & streak */}
                <div className="flex-1 min-w-0">
                  <p className={clsx(
                    'font-extrabold text-sm sm:text-base truncate',
                    isMe ? 'text-[#1cb0f6]' : 'text-gray-700 dark:text-white'
                  )}>
                    {user.display_name || user.username}
                    {isMe && (
                      <span className="ml-2 text-[10px] bg-[#1cb0f6] text-white px-2 py-0.5 rounded-full font-bold uppercase">
                        You
                      </span>
                    )}
                  </p>
                  <div className="flex items-center gap-1 text-[#ff9600] text-xs font-bold mt-0.5">
                    <Flame className="w-3.5 h-3.5 fill-[#ff9600]" />
                    <span>{user.streak} day streak</span>
                  </div>
                </div>

                {/* XP */}
                <div className="text-right shrink-0">
                  <p className="font-extrabold text-gray-700 dark:text-white text-base sm:text-lg">
                    {user.xp.toLocaleString()}
                  </p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase">XP</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
