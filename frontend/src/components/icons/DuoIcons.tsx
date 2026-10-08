import React from 'react';

// 1. LEARN (Red-roof house with yellow window & door)
export function LearnIcon({ className = 'w-7 h-7' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 3L3 13.5H6V27C6 28.1 6.9 29 8 29H24C25.1 29 26 28.1 26 27V13.5H29L16 3Z" fill="#FF4B4B" />
      <path d="M16 5.5L6 13.5V26.5H26V13.5L16 5.5Z" fill="#FF6565" />
      {/* Yellow door */}
      <rect x="12" y="17" width="8" height="10" rx="1.5" fill="#FFC800" />
      <circle cx="14" cy="22" r="1" fill="#78350F" />
      {/* Chimney */}
      <rect x="21" y="6" width="3" height="7" rx="1" fill="#E02E2E" />
    </svg>
  );
}

// 2. LEADERBOARDS (Glossy golden shield with star / crest)
export function LeaderboardsIcon({ className = 'w-7 h-7' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 2L6 6V14C6 21.5 10.3 27.5 16 30C21.7 27.5 26 21.5 26 14V6L16 2Z" fill="#E6AC00" />
      <path d="M16 3.5L7.5 7V13.5C7.5 20.2 11.2 25.8 16 28.2C20.8 25.8 24.5 20.2 24.5 13.5V7L16 3.5Z" fill="#FFC800" />
      <path d="M16 4.5V27.5C19.8 25.2 23 20 23 13.5V7.5L16 4.5Z" fill="#FFD940" />
    </svg>
  );
}

// 3. QUESTS (Golden treasure chest with lock)
export function QuestsIcon({ className = 'w-7 h-7' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="12" width="24" height="15" rx="3" fill="#D97706" />
      <rect x="4" y="12" width="24" height="6" rx="2" fill="#F59E0B" />
      <path d="M4 12C4 8 8 6 16 6C24 6 28 8 28 12H4Z" fill="#FBBF24" />
      <rect x="13.5" y="13" width="5" height="7" rx="1.5" fill="#FEF08A" stroke="#B45309" strokeWidth="1" />
      <circle cx="16" cy="16.5" r="1" fill="#78350F" />
    </svg>
  );
}

// 4. SHOP (Red and white striped marketplace awning)
export function ShopIcon({ className = 'w-7 h-7' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="15" width="22" height="13" rx="2" fill="#E2E8F0" />
      <rect x="11" y="20" width="10" height="8" rx="1.5" fill="#1E293B" />
      {/* Awning stripes */}
      <path d="M4 8L6 16H26L28 8H4Z" fill="#FF4B4B" />
      <polygon points="8,8 10,16 13,16 11,8" fill="#FFFFFF" />
      <polygon points="15,8 17,16 20,16 18,8" fill="#FFFFFF" />
      <polygon points="22,8 24,16 27,16 25,8" fill="#FFFFFF" />
    </svg>
  );
}

// 5. PROFILE (Cute character avatar with purple hair)
export function ProfileIcon({ className = 'w-7 h-7' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="14" fill="#CE82FF" />
      <circle cx="16" cy="13" r="6" fill="#FDE68A" />
      <path d="M11 11C11 7 13 6 16 6C19 6 21 7 21 11C20 9 17 8 16 8C15 8 12 9 11 11Z" fill="#A855F7" />
      <path d="M8 26C8 21 12 19 16 19C20 19 24 21 24 26" fill="#1CB0F6" />
    </svg>
  );
}

// 6. MORE (Purple circle with 3 white dots matching screenshot)
export function MoreIcon({ className = 'w-7 h-7' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="13" fill="#CE82FF" />
      <circle cx="11" cy="16" r="1.7" fill="#FFFFFF" />
      <circle cx="16" cy="16" r="1.7" fill="#FFFFFF" />
      <circle cx="21" cy="16" r="1.7" fill="#FFFFFF" />
    </svg>
  );
}
