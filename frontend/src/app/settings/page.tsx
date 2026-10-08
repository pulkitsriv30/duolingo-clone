export const dynamic = 'force-dynamic';

import { fetchUser } from '@/lib/api';
import TopBar from '@/components/TopBar';
import ThemeToggle from '@/components/ThemeToggle';
import TestSimulateWidget from '@/components/TestSimulateWidget';

interface SettingRow {
  label: string;
  desc: string;
  value: string;
  badge?: string;
  isDarkToggle?: boolean;
}

const SECTIONS: { title: string; rows: SettingRow[] }[] = [
  {
    title: 'Account',
    rows: [
      { label: 'Username',          desc: 'Your unique learner handle',               value: 'learner123' },
      { label: 'Display Name',      desc: 'How you appear on leaderboards',           value: 'Alex' },
      { label: 'Email',             desc: 'Used for streak reminders',                value: 'alex@example.com' },
    ],
  },
  {
    title: 'Learning & Audio',
    rows: [
      { label: 'Daily Goal',        desc: 'XP target for daily streak',               value: '50 XP / day' },
      { label: 'Course',            desc: 'Currently learning',                       value: 'Spanish 🇪🇸' },
      { label: 'Audio Engine',      desc: 'Web Speech API Text-to-Speech',            value: 'Active 🔊' },
      { label: 'Sound FX',          desc: 'Native Web Audio synth chimes',            value: 'Enabled 🎵' },
    ],
  },
  {
    title: 'Appearance',
    rows: [
      { label: 'Dark Mode',         desc: 'Toggle dark / light theme',                value: '', isDarkToggle: true },
    ],
  },
  {
    title: 'Subscription',
    rows: [
      { label: 'Super Duolingo',    desc: 'Unlimited hearts, no ads, legendary badge', value: 'Free Plan', badge: 'Active' },
      { label: 'Streak Freeze',     desc: 'Protect your streak for one missed day',    value: 'Equipped ❄️' },
    ],
  },
];

export default async function SettingsPage() {
  let user: any;
  try {
    user = await fetchUser(1);
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
  }

  return (
    <>
      <TopBar user={user} />

      <div className="max-w-[700px] mx-auto px-4 lg:px-8 py-8 pb-24">
        <h1 className="text-3xl font-extrabold text-gray-700 dark:text-white mb-2">Settings</h1>
        <p className="text-sm text-gray-400 font-semibold mb-8">Manage your account, audio, and appearance</p>

        <div className="flex flex-col gap-8">
          {SECTIONS.map((section) => (
            <div key={section.title}>
              <h2 className="text-xs font-extrabold text-gray-400 uppercase tracking-widest mb-3">
                {section.title}
              </h2>
              <div className="flex flex-col border-2 border-gray-100 dark:border-[#2b3940] rounded-2xl overflow-hidden divide-y divide-gray-100 dark:divide-[#2b3940] bg-white dark:bg-[#182228]">
                {section.rows.map((row) => (
                  <div key={row.label} className="flex items-center justify-between px-5 py-4 hover:bg-gray-50 dark:hover:bg-[#202f36] transition-colors">
                    <div>
                      <p className="font-bold text-gray-700 dark:text-gray-100">{row.label}</p>
                      <p className="text-xs text-gray-400 font-semibold mt-0.5">{row.desc}</p>
                    </div>
                    <div className="flex items-center gap-2 text-right">
                      {row.isDarkToggle ? (
                        <ThemeToggle />
                      ) : (
                        <>
                          <span className="text-sm font-bold text-gray-500 dark:text-gray-400">{row.value}</span>
                          {row.badge && (
                            <span className="text-xs bg-[#ddf4ff] dark:bg-[#103040] text-[#1cb0f6] font-bold px-2.5 py-1 rounded-full border border-[#84d8ff] dark:border-[#105070]">
                              {row.badge}
                            </span>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Test Streak Simulation tool */}
          <div>
            <h2 className="text-xs font-extrabold text-gray-400 uppercase tracking-widest mb-3">
              Developer / Evaluation Tools
            </h2>
            <TestSimulateWidget currentStreak={user.streak ?? 5} />
          </div>
        </div>
      </div>
    </>
  );
}
