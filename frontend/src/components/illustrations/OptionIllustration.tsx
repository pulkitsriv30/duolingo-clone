import React from 'react';

interface IllustrationProps {
  name: string;
  className?: string;
}

export default function OptionIllustration({ name, className = 'w-24 h-24' }: IllustrationProps) {
  const normalized = (name || '').toLowerCase().trim();

  // 1. SUITCASE / MALETA (Matches user's screenshot: brown leather with handle & travel stickers)
  if (normalized.includes('maleta') || normalized.includes('suitcase')) {
    return (
      <svg viewBox="0 0 120 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Handle */}
        <path d="M48 20C48 15 52 11 57 11H63C68 11 72 15 72 20V24H48V20Z" stroke="#78350F" strokeWidth="5" />
        {/* Main Suitcase Body */}
        <rect x="15" y="24" width="90" height="64" rx="12" fill="#92400E" />
        <rect x="18" y="27" width="84" height="58" rx="9" fill="#B45309" />
        {/* Leather Corner Guards */}
        <path d="M15 36V24H27C27 30 21 36 15 36Z" fill="#FBBF24" />
        <path d="M105 36V24H93C93 30 99 36 105 36Z" fill="#FBBF24" />
        <path d="M15 76V88H27C27 82 21 76 15 76Z" fill="#FBBF24" />
        <path d="M105 76V88H93C93 82 99 76 105 76Z" fill="#FBBF24" />
        {/* Vertical Straps */}
        <rect x="34" y="24" width="8" height="64" fill="#78350F" />
        <rect x="78" y="24" width="8" height="64" fill="#78350F" />
        {/* Brass Buckles */}
        <rect x="32" y="52" width="12" height="8" rx="2" fill="#FCD34D" />
        <rect x="76" y="52" width="12" height="8" rx="2" fill="#FCD34D" />
        {/* Stickers (Red circle & cyan rounded pill like in screenshot) */}
        <circle cx="82" cy="68" r="8" fill="#EF4444" />
        <circle cx="82" cy="68" r="6" fill="#FEE2E2" />
        <rect x="25" y="56" width="18" height="10" rx="5" fill="#F97316" />
        <rect x="68" y="40" width="22" height="11" rx="5.5" fill="#06B6D4" />
      </svg>
    );
  }

  // 2. HOUSE / CASA (Matches user's screenshot: purple cottage, chimney, round attic window)
  if (normalized.includes('casa') || normalized.includes('house')) {
    return (
      <svg viewBox="0 0 120 110" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Chimney */}
        <rect x="26" y="16" width="12" height="26" rx="2" fill="#EA580C" />
        <rect x="23" y="13" width="18" height="5" rx="1.5" fill="#C2410C" />
        {/* Roof */}
        <path d="M12 48L60 12L108 48H12Z" fill="#374151" />
        <path d="M15 46L60 14L105 46H15Z" fill="#4B5563" />
        {/* House Main Body (Purple) */}
        <rect x="24" y="44" width="72" height="56" rx="4" fill="#8B5CF6" />
        {/* Wooden Door */}
        <rect x="62" y="66" width="22" height="34" rx="3" fill="#B45309" />
        <circle cx="67" cy="83" r="2.5" fill="#FCD34D" />
        {/* Front Window with Cross Panes */}
        <rect x="34" y="62" width="20" height="20" rx="3" fill="#E0F2FE" stroke="#38BDF8" strokeWidth="3" />
        <line x1="44" y1="62" x2="44" y2="82" stroke="#38BDF8" strokeWidth="2.5" />
        <line x1="34" y1="72" x2="54" y2="72" stroke="#38BDF8" strokeWidth="2.5" />
        {/* Round Attic Window */}
        <circle cx="60" cy="34" r="9" fill="#E0F2FE" stroke="#38BDF8" strokeWidth="3" />
        <line x1="60" y1="25" x2="60" y2="43" stroke="#38BDF8" strokeWidth="2" />
        <line x1="51" y1="34" x2="69" y2="34" stroke="#38BDF8" strokeWidth="2" />
        {/* Lawn shrub */}
        <ellipse cx="32" cy="98" rx="10" ry="5" fill="#22C55E" />
      </svg>
    );
  }

  // 3. MILK / LECHE (Matches user's screenshot: blue milk carton with cow emblem + glass)
  if (normalized.includes('leche') || normalized.includes('milk')) {
    return (
      <svg viewBox="0 0 120 110" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Milk Carton Gable Top */}
        <path d="M30 30L44 14H66L80 30H30Z" fill="#0284C7" />
        <rect x="42" y="10" width="26" height="5" fill="#38BDF8" rx="1" />
        {/* Milk Carton Body */}
        <rect x="30" y="30" width="50" height="68" rx="6" fill="#38BDF8" />
        {/* White Center Band */}
        <rect x="30" y="44" width="50" height="34" fill="#FFFFFF" />
        {/* Cow Silhouette Icon on Carton */}
        <ellipse cx="55" cy="60" rx="10" ry="7" fill="#0284C7" />
        <path d="M47 54L45 50L49 52" stroke="#0284C7" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M63 54L65 50L61 52" stroke="#0284C7" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="51" cy="59" r="1.5" fill="#FFFFFF" />
        <circle cx="59" cy="59" r="1.5" fill="#FFFFFF" />
        {/* Glass of Milk */}
        <path d="M72 48L76 96C76 98 78 100 80 100H94C96 100 98 98 98 96L102 48H72Z" fill="#E0F2FE" stroke="#38BDF8" strokeWidth="3" />
        <path d="M74 58L77 94H97L100 58H74Z" fill="#FFFFFF" />
      </svg>
    );
  }

  // 4. APPLE / MANZANA
  if (normalized.includes('manzana') || normalized.includes('apple')) {
    return (
      <svg viewBox="0 0 120 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M60 26C60 18 64 12 68 8" stroke="#78350F" strokeWidth="4" strokeLinecap="round" />
        <path d="M64 16C72 13 80 16 82 22C74 25 66 22 64 16Z" fill="#22C55E" />
        <path d="M60 30C52 24 38 24 30 32C18 44 20 72 38 86C48 94 56 94 60 90C64 94 72 94 82 86C100 72 102 44 90 32C82 24 68 24 60 30Z" fill="#EF4444" />
        <path d="M60 34C64 30 76 28 84 35C94 46 92 68 78 80C70 86 64 86 60 84" fill="#DC2626" opacity="0.4" />
        <ellipse cx="42" cy="44" rx="4" ry="8" transform="rotate(-30 42 44)" fill="#FFFFFF" opacity="0.6" />
      </svg>
    );
  }

  // 5. BREAD / PAN
  if (normalized.includes('pan') || normalized.includes('bread')) {
    return (
      <svg viewBox="0 0 120 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="60" cy="56" rx="44" ry="24" fill="#B45309" />
        <ellipse cx="60" cy="52" rx="42" ry="22" fill="#D97706" />
        <ellipse cx="60" cy="48" rx="38" ry="18" fill="#F59E0B" />
        {/* Flour score slits */}
        <line x1="42" y1="40" x2="48" y2="54" stroke="#FFFBEB" strokeWidth="3.5" strokeLinecap="round" />
        <line x1="58" y1="38" x2="62" y2="54" stroke="#FFFBEB" strokeWidth="3.5" strokeLinecap="round" />
        <line x1="74" y1="40" x2="76" y2="54" stroke="#FFFBEB" strokeWidth="3.5" strokeLinecap="round" />
      </svg>
    );
  }

  // 6. WATER / AGUA
  if (normalized.includes('agua') || normalized.includes('water')) {
    return (
      <svg viewBox="0 0 120 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M42 22L48 84C48 88 52 92 56 92H64C68 92 72 88 72 84L78 22H42Z" fill="#E0F2FE" stroke="#38BDF8" strokeWidth="4" />
        <path d="M46 38L50 82C50 84 53 86 56 86H64C67 86 70 84 70 82L74 38H46Z" fill="#38BDF8" />
        <rect x="52" y="48" width="12" height="12" rx="2" fill="#BAE6FD" opacity="0.8" />
        <rect x="58" y="64" width="10" height="10" rx="2" fill="#BAE6FD" opacity="0.8" />
      </svg>
    );
  }

  // 7. DOG / PERRO
  if (normalized.includes('perro') || normalized.includes('dog')) {
    return (
      <svg viewBox="0 0 120 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Ears */}
        <ellipse cx="32" cy="44" rx="10" ry="20" transform="rotate(-15 32 44)" fill="#B45309" />
        <ellipse cx="88" cy="44" rx="10" ry="20" transform="rotate(15 88 44)" fill="#B45309" />
        {/* Head */}
        <circle cx="60" cy="50" r="28" fill="#F59E0B" />
        {/* Snout */}
        <ellipse cx="60" cy="60" rx="16" ry="12" fill="#FEF3C7" />
        <ellipse cx="60" cy="55" rx="5" ry="3.5" fill="#1F2937" />
        {/* Eyes */}
        <circle cx="48" cy="45" r="4" fill="#1F2937" />
        <circle cx="72" cy="45" r="4" fill="#1F2937" />
        <circle cx="49" cy="43.5" r="1.5" fill="#FFFFFF" />
        <circle cx="73" cy="43.5" r="1.5" fill="#FFFFFF" />
        {/* Tongue */}
        <path d="M58 66C58 70 60 74 62 74C64 74 66 70 66 66H58Z" fill="#F43F5E" />
      </svg>
    );
  }

  // 8. CAT / GATO
  if (normalized.includes('gato') || normalized.includes('cat')) {
    return (
      <svg viewBox="0 0 120 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Ears */}
        <polygon points="34,22 46,46 26,46" fill="#F97316" />
        <polygon points="36,27 44,44 30,44" fill="#FECDD3" />
        <polygon points="86,22 94,46 74,46" fill="#F97316" />
        <polygon points="84,27 90,44 76,44" fill="#FECDD3" />
        {/* Head */}
        <circle cx="60" cy="54" r="28" fill="#FB923C" />
        {/* Eyes */}
        <ellipse cx="48" cy="50" rx="4.5" ry="6" fill="#15803D" />
        <ellipse cx="72" cy="50" rx="4.5" ry="6" fill="#15803D" />
        <circle cx="48" cy="50" r="2" fill="#000000" />
        <circle cx="72" cy="50" r="2" fill="#000000" />
        {/* Nose */}
        <polygon points="60,60 56,57 64,57" fill="#F43F5E" />
        {/* Whiskers */}
        <line x1="32" y1="58" x2="46" y2="60" stroke="#78350F" strokeWidth="1.5" />
        <line x1="32" y1="64" x2="46" y2="63" stroke="#78350F" strokeWidth="1.5" />
        <line x1="74" y1="60" x2="88" y2="58" stroke="#78350F" strokeWidth="1.5" />
        <line x1="74" y1="63" x2="88" y2="64" stroke="#78350F" strokeWidth="1.5" />
      </svg>
    );
  }

  // 9. MAN / HOMBRE / BOY / NIÑO
  if (normalized.includes('hombre') || normalized.includes('niño') || normalized.includes('man') || normalized.includes('boy')) {
    return (
      <svg viewBox="0 0 120 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="60" cy="48" r="22" fill="#FCD34D" />
        {/* Hair */}
        <path d="M38 42C38 28 50 24 60 24C70 24 82 28 82 42C76 34 68 32 60 32C52 32 44 34 38 42Z" fill="#78350F" />
        {/* Eyes */}
        <circle cx="52" cy="46" r="3" fill="#1F2937" />
        <circle cx="68" cy="46" r="3" fill="#1F2937" />
        {/* Smile */}
        <path d="M54 58C56 61 64 61 66 58" stroke="#1F2937" strokeWidth="2.5" strokeLinecap="round" />
        {/* Shirt */}
        <path d="M40 76C40 68 48 64 60 64C72 64 80 68 80 76V88H40V76Z" fill="#3B82F6" />
      </svg>
    );
  }

  // 10. WOMAN / MUJER / GIRL / NIÑA
  if (normalized.includes('mujer') || normalized.includes('niña') || normalized.includes('woman') || normalized.includes('girl')) {
    return (
      <svg viewBox="0 0 120 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Long hair back */}
        <ellipse cx="60" cy="54" rx="28" ry="32" fill="#B45309" />
        {/* Face */}
        <circle cx="60" cy="48" r="20" fill="#FDE68A" />
        {/* Hair bangs */}
        <path d="M40 42C42 30 52 26 60 26C68 26 78 30 80 42C74 34 66 32 60 32C54 32 46 34 40 42Z" fill="#B45309" />
        {/* Eyes */}
        <circle cx="53" cy="46" r="2.5" fill="#1F2937" />
        <circle cx="67" cy="46" r="2.5" fill="#1F2937" />
        {/* Smile */}
        <path d="M55 56C57 59 63 59 65 56" stroke="#E11D48" strokeWidth="2.5" strokeLinecap="round" />
        {/* Shirt */}
        <path d="M42 74C42 66 50 62 60 62C70 62 78 66 78 74V88H42V74Z" fill="#EC4899" />
      </svg>
    );
  }

  // Generic fallback: Star / Book
  return (
    <svg viewBox="0 0 120 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="50" r="32" fill="#E0F2FE" />
      <path d="M60 28L66 42L80 44L69 54L72 68L60 61L48 68L51 54L40 44L54 42L60 28Z" fill="#FBBF24" stroke="#F59E0B" strokeWidth="2" />
    </svg>
  );
}
