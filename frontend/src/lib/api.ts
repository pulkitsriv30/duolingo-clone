const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// Generic fetcher
async function apiFetch(path: string, options?: RequestInit) {
  const res = await fetch(`${API_URL}${path}`, {
    cache: 'no-store',
    ...options,
  });
  if (!res.ok) {
    throw new Error(`API error ${res.status}: ${path}`);
  }
  return res.json();
}

export async function fetchUnits() {
  return apiFetch('/units/');
}

export async function fetchUser(userId: number) {
  return apiFetch(`/users/${userId}`);
}

export async function fetchLesson(skillId: number) {
  return apiFetch(`/skills/${skillId}/lesson`);
}

export async function fetchLeaderboard() {
  return apiFetch('/leaderboard');
}

export async function completeSkill(userId: number, skillId: number, xp: number) {
  return apiFetch(`/users/${userId}/complete_skill`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ skill_id: skillId, xp }),
  });
}

export async function refillHearts(userId: number) {
  return apiFetch(`/users/${userId}/refill_hearts`, { method: 'POST' });
}

export async function fetchAchievements(userId: number) {
  return apiFetch(`/users/${userId}/achievements`);
}

export async function simulateDay(userId: number) {
  return apiFetch(`/users/${userId}/simulate_day`, { method: 'POST' });
}

