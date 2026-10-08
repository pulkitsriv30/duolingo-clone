import React from 'react';

interface IllustrationProps {
  name: string;
  className?: string;
}

export default function OptionIllustration({ name, className = 'w-24 h-24' }: IllustrationProps) {
  const n = (name || '').toLowerCase().trim();

  // 1. SUITCASE / MALETA (Matches Duolingo screenshot: brown leather with handle & travel stickers)
  if (n.includes('maleta') || n.includes('suitcase')) {
    return (
      <svg viewBox="0 0 120 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M48 20C48 15 52 11 57 11H63C68 11 72 15 72 20V24H48V20Z" stroke="#78350F" strokeWidth="5" />
        <rect x="15" y="24" width="90" height="64" rx="12" fill="#92400E" />
        <rect x="18" y="27" width="84" height="58" rx="9" fill="#B45309" />
        <path d="M15 36V24H27C27 30 21 36 15 36Z" fill="#FBBF24" />
        <path d="M105 36V24H93C93 30 99 36 105 36Z" fill="#FBBF24" />
        <path d="M15 76V88H27C27 82 21 76 15 76Z" fill="#FBBF24" />
        <path d="M105 76V88H93C93 82 99 76 105 76Z" fill="#FBBF24" />
        <rect x="34" y="24" width="8" height="64" fill="#78350F" />
        <rect x="78" y="24" width="8" height="64" fill="#78350F" />
        <rect x="32" y="52" width="12" height="8" rx="2" fill="#FCD34D" />
        <rect x="76" y="52" width="12" height="8" rx="2" fill="#FCD34D" />
        <circle cx="82" cy="68" r="8" fill="#EF4444" />
        <circle cx="82" cy="68" r="6" fill="#FEE2E2" />
        <rect x="25" y="56" width="18" height="10" rx="5" fill="#F97316" />
        <rect x="68" y="40" width="22" height="11" rx="5.5" fill="#06B6D4" />
      </svg>
    );
  }

  // 2. HOUSE / CASA (Matches Duolingo screenshot: purple cottage, chimney, round window)
  if (n.includes('casa') || n.includes('house')) {
    return (
      <svg viewBox="0 0 120 110" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="26" y="16" width="12" height="26" rx="2" fill="#EA580C" />
        <rect x="23" y="13" width="18" height="5" rx="1.5" fill="#C2410C" />
        <path d="M12 48L60 12L108 48H12Z" fill="#374151" />
        <path d="M15 46L60 14L105 46H15Z" fill="#4B5563" />
        <rect x="24" y="44" width="72" height="56" rx="4" fill="#8B5CF6" />
        <rect x="62" y="66" width="22" height="34" rx="3" fill="#B45309" />
        <circle cx="67" cy="83" r="2.5" fill="#FCD34D" />
        <rect x="34" y="62" width="20" height="20" rx="3" fill="#E0F2FE" stroke="#38BDF8" strokeWidth="3" />
        <line x1="44" y1="62" x2="44" y2="82" stroke="#38BDF8" strokeWidth="2.5" />
        <line x1="34" y1="72" x2="54" y2="72" stroke="#38BDF8" strokeWidth="2.5" />
        <circle cx="60" cy="34" r="9" fill="#E0F2FE" stroke="#38BDF8" strokeWidth="3" />
        <line x1="60" y1="25" x2="60" y2="43" stroke="#38BDF8" strokeWidth="2" />
        <line x1="51" y1="34" x2="69" y2="34" stroke="#38BDF8" strokeWidth="2" />
        <ellipse cx="32" cy="98" rx="10" ry="5" fill="#22C55E" />
      </svg>
    );
  }

  // 3. MILK / LECHE (Matches Duolingo screenshot: blue milk carton + glass)
  if (n.includes('leche') || n.includes('milk')) {
    return (
      <svg viewBox="0 0 120 110" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M30 30L44 14H66L80 30H30Z" fill="#0284C7" />
        <rect x="42" y="10" width="26" height="5" fill="#38BDF8" rx="1" />
        <rect x="30" y="30" width="50" height="68" rx="6" fill="#38BDF8" />
        <rect x="30" y="44" width="50" height="34" fill="#FFFFFF" />
        <ellipse cx="55" cy="60" rx="10" ry="7" fill="#0284C7" />
        <path d="M47 54L45 50L49 52" stroke="#0284C7" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M63 54L65 50L61 52" stroke="#0284C7" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="51" cy="59" r="1.5" fill="#FFFFFF" />
        <circle cx="59" cy="59" r="1.5" fill="#FFFFFF" />
        <path d="M72 48L76 96C76 98 78 100 80 100H94C96 100 98 98 98 96L102 48H72Z" fill="#E0F2FE" stroke="#38BDF8" strokeWidth="3" />
        <path d="M74 58L77 94H97L100 58H74Z" fill="#FFFFFF" />
      </svg>
    );
  }

  // 4. APPLE / MANZANA
  if (n.includes('manzana') || n.includes('apple')) {
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
  if (n.includes('pan') || n.includes('bread')) {
    return (
      <svg viewBox="0 0 120 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="60" cy="56" rx="44" ry="24" fill="#B45309" />
        <ellipse cx="60" cy="52" rx="42" ry="22" fill="#D97706" />
        <ellipse cx="60" cy="48" rx="38" ry="18" fill="#F59E0B" />
        <line x1="42" y1="40" x2="48" y2="54" stroke="#FFFBEB" strokeWidth="3.5" strokeLinecap="round" />
        <line x1="58" y1="38" x2="62" y2="54" stroke="#FFFBEB" strokeWidth="3.5" strokeLinecap="round" />
        <line x1="74" y1="40" x2="76" y2="54" stroke="#FFFBEB" strokeWidth="3.5" strokeLinecap="round" />
      </svg>
    );
  }

  // 6. WATER / AGUA
  if (n.includes('agua') || n.includes('water')) {
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
  if (n.includes('perro') || n.includes('dog')) {
    return (
      <svg viewBox="0 0 120 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="32" cy="44" rx="10" ry="20" transform="rotate(-15 32 44)" fill="#B45309" />
        <ellipse cx="88" cy="44" rx="10" ry="20" transform="rotate(15 88 44)" fill="#B45309" />
        <circle cx="60" cy="50" r="28" fill="#F59E0B" />
        <ellipse cx="60" cy="60" rx="16" ry="12" fill="#FEF3C7" />
        <ellipse cx="60" cy="55" rx="5" ry="3.5" fill="#1F2937" />
        <circle cx="48" cy="45" r="4" fill="#1F2937" />
        <circle cx="72" cy="45" r="4" fill="#1F2937" />
        <circle cx="49" cy="43.5" r="1.5" fill="#FFFFFF" />
        <circle cx="73" cy="43.5" r="1.5" fill="#FFFFFF" />
        <path d="M58 66C58 70 60 74 62 74C64 74 66 70 66 66H58Z" fill="#F43F5E" />
      </svg>
    );
  }

  // 8. CAT / GATO
  if (n.includes('gato') || n.includes('cat')) {
    return (
      <svg viewBox="0 0 120 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <polygon points="34,22 46,46 26,46" fill="#F97316" />
        <polygon points="36,27 44,44 30,44" fill="#FECDD3" />
        <polygon points="86,22 94,46 74,46" fill="#F97316" />
        <polygon points="84,27 90,44 76,44" fill="#FECDD3" />
        <circle cx="60" cy="54" r="28" fill="#FB923C" />
        <ellipse cx="48" cy="50" rx="4.5" ry="6" fill="#15803D" />
        <ellipse cx="72" cy="50" rx="4.5" ry="6" fill="#15803D" />
        <circle cx="48" cy="50" r="2" fill="#000000" />
        <circle cx="72" cy="50" r="2" fill="#000000" />
        <polygon points="60,60 56,57 64,57" fill="#F43F5E" />
        <line x1="32" y1="58" x2="46" y2="60" stroke="#78350F" strokeWidth="1.5" />
        <line x1="32" y1="64" x2="46" y2="63" stroke="#78350F" strokeWidth="1.5" />
        <line x1="74" y1="60" x2="88" y2="58" stroke="#78350F" strokeWidth="1.5" />
        <line x1="74" y1="63" x2="88" y2="64" stroke="#78350F" strokeWidth="1.5" />
      </svg>
    );
  }

  // 9. BIRD / PÁJARO
  if (n.includes('pájaro') || n.includes('pajaro') || n.includes('bird')) {
    return (
      <svg viewBox="0 0 120 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="56" cy="52" r="26" fill="#38BDF8" />
        <ellipse cx="42" cy="56" rx="14" ry="10" fill="#0284C7" />
        {/* Yellow beak */}
        <polygon points="76,48 94,54 76,60" fill="#F59E0B" />
        {/* Eye */}
        <circle cx="66" cy="46" r="5" fill="#FFFFFF" />
        <circle cx="68" cy="46" r="2.5" fill="#0F172A" />
        {/* Belly */}
        <ellipse cx="54" cy="62" rx="14" ry="12" fill="#BAE6FD" />
        {/* Tail */}
        <polygon points="32,56 16,50 18,66" fill="#0284C7" />
      </svg>
    );
  }

  // 10. FISH / PEZ
  if (n.includes('pez') || n.includes('fish')) {
    return (
      <svg viewBox="0 0 120 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Tail fin */}
        <polygon points="34,50 14,32 18,68" fill="#EA580C" />
        {/* Body */}
        <ellipse cx="60" cy="50" rx="34" ry="22" fill="#F97316" />
        {/* White clownfish stripes */}
        <path d="M52 30C55 42 55 58 52 70C58 70 58 30 52 30Z" fill="#FFFFFF" />
        <path d="M72 32C74 44 74 56 72 68C76 68 76 32 72 32Z" fill="#FFFFFF" />
        {/* Eye */}
        <circle cx="82" cy="46" r="5.5" fill="#FFFFFF" />
        <circle cx="83" cy="46" r="3" fill="#0F172A" />
        {/* Bubbles */}
        <circle cx="98" cy="38" r="3.5" fill="#BAE6FD" opacity="0.8" />
        <circle cx="106" cy="28" r="2.5" fill="#BAE6FD" opacity="0.8" />
      </svg>
    );
  }

  // 11. AIRPORT / AEROPUERTO / AIRPLANE
  if (n.includes('aeropuerto') || n.includes('airport') || n.includes('avión') || n.includes('plane')) {
    return (
      <svg viewBox="0 0 120 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22 66C32 60 48 58 60 58H88C96 58 102 54 102 48C102 42 96 38 88 38H60C48 38 32 36 22 30V66Z" fill="#38BDF8" />
        <polygon points="52,42 66,12 78,12 68,42" fill="#0284C7" />
        <polygon points="52,54 66,84 78,84 68,54" fill="#0284C7" />
        <polygon points="22,34 12,18 24,18 32,34" fill="#0284C7" />
        <circle cx="90" cy="44" r="3" fill="#FFFFFF" />
        <circle cx="80" cy="44" r="3" fill="#FFFFFF" />
        <circle cx="70" cy="44" r="3" fill="#FFFFFF" />
      </svg>
    );
  }

  // 12. HOTEL
  if (n.includes('hotel')) {
    return (
      <svg viewBox="0 0 120 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="30" y="22" width="60" height="68" rx="6" fill="#3B82F6" />
        <rect x="44" y="10" width="32" height="12" rx="3" fill="#F59E0B" />
        <text x="60" y="19" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontWeight="bold">HOTEL</text>
        {/* Windows */}
        <rect x="38" y="30" width="10" height="10" rx="2" fill="#E0F2FE" />
        <rect x="55" y="30" width="10" height="10" rx="2" fill="#E0F2FE" />
        <rect x="72" y="30" width="10" height="10" rx="2" fill="#E0F2FE" />
        <rect x="38" y="46" width="10" height="10" rx="2" fill="#E0F2FE" />
        <rect x="55" y="46" width="10" height="10" rx="2" fill="#E0F2FE" />
        <rect x="72" y="46" width="10" height="10" rx="2" fill="#E0F2FE" />
        {/* Door with awning */}
        <rect x="50" y="66" width="20" height="24" rx="2" fill="#1E293B" />
        <path d="M46 66L60 58L74 66H46Z" fill="#EF4444" />
      </svg>
    );
  }

  // 13. TRAIN / TREN
  if (n.includes('tren') || n.includes('train')) {
    return (
      <svg viewBox="0 0 120 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="24" y="24" width="72" height="54" rx="14" fill="#06B6D4" />
        <rect x="28" y="28" width="64" height="26" rx="8" fill="#1E293B" />
        <rect x="32" y="32" width="26" height="18" rx="4" fill="#BAE6FD" />
        <rect x="62" y="32" width="26" height="18" rx="4" fill="#BAE6FD" />
        {/* Headlights */}
        <circle cx="38" cy="64" r="5" fill="#FBBF24" />
        <circle cx="82" cy="64" r="5" fill="#FBBF24" />
        {/* Bumper and track */}
        <rect x="20" y="78" width="80" height="6" rx="3" fill="#475569" />
        <line x1="16" y1="88" x2="104" y2="88" stroke="#64748B" strokeWidth="4" />
      </svg>
    );
  }

  // 14. BUS / AUTOBÚS / AUTOBUS
  if (n.includes('autobús') || n.includes('autobus') || n.includes('bus')) {
    return (
      <svg viewBox="0 0 120 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="24" width="80" height="50" rx="10" fill="#F59E0B" />
        <rect x="26" y="30" width="68" height="18" rx="4" fill="#1E293B" />
        <rect x="30" y="32" width="18" height="14" rx="2" fill="#BAE6FD" />
        <rect x="52" y="32" width="18" height="14" rx="2" fill="#BAE6FD" />
        <rect x="74" y="32" width="16" height="14" rx="2" fill="#BAE6FD" />
        <circle cx="28" cy="62" r="4" fill="#FBBF24" />
        <circle cx="92" cy="62" r="4" fill="#FBBF24" />
        {/* Wheels */}
        <circle cx="38" cy="74" r="8" fill="#1E293B" />
        <circle cx="38" cy="74" r="3.5" fill="#94A3B8" />
        <circle cx="82" cy="74" r="8" fill="#1E293B" />
        <circle cx="82" cy="74" r="3.5" fill="#94A3B8" />
      </svg>
    );
  }

  // 15. MENU / MENÚ
  if (n.includes('menú') || n.includes('menu')) {
    return (
      <svg viewBox="0 0 120 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="34" y="16" width="52" height="68" rx="6" fill="#EA580C" />
        <rect x="38" y="20" width="44" height="60" rx="4" fill="#FEF3C7" />
        {/* Fork & knife emblem */}
        <path d="M52 30V44M48 30V36H56V30" stroke="#B45309" strokeWidth="2" strokeLinecap="round" />
        <path d="M68 30C68 36 64 36 64 44M68 30V44" stroke="#B45309" strokeWidth="2" strokeLinecap="round" />
        {/* Text lines */}
        <line x1="46" y1="52" x2="74" y2="52" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="46" y1="60" x2="70" y2="60" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="46" y1="68" x2="64" y2="68" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    );
  }

  // 16. CHECK / BILL / CUENTA
  if (n.includes('cuenta') || n.includes('bill') || n.includes('check')) {
    return (
      <svg viewBox="0 0 120 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M34 16H86V80L80 76L74 80L68 76L60 80L52 76L46 80L40 76L34 80V16Z" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="3" />
        <line x1="42" y1="28" x2="78" y2="28" stroke="#0284C7" strokeWidth="3" strokeLinecap="round" />
        <line x1="42" y1="38" x2="68" y2="38" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
        <line x1="42" y1="46" x2="72" y2="46" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
        <line x1="42" y1="54" x2="60" y2="54" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
        <line x1="42" y1="64" x2="78" y2="64" stroke="#16A34A" strokeWidth="3.5" strokeLinecap="round" />
      </svg>
    );
  }

  // 17. WAITER / MESERO
  if (n.includes('mesero') || n.includes('waiter')) {
    return (
      <svg viewBox="0 0 120 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="60" cy="36" r="16" fill="#FDE68A" />
        <path d="M44 32C44 22 52 18 60 18C68 18 76 22 76 32Z" fill="#1E293B" />
        <rect x="42" y="52" width="36" height="38" rx="8" fill="#1E293B" />
        <polygon points="60,60 52,52 68,52" fill="#FFFFFF" />
        <polygon points="60,62 56,58 64,58" fill="#DC2626" />
        {/* Silver Serving Cloche Platter */}
        <ellipse cx="88" cy="62" rx="14" ry="4" fill="#94A3B8" />
        <path d="M76 62C76 52 100 52 100 62H76Z" fill="#CBD5E1" />
        <circle cx="88" cy="51" r="2.5" fill="#94A3B8" />
      </svg>
    );
  }

  // 18. TABLE / MESA
  if (n.includes('mesa') || n.includes('table')) {
    return (
      <svg viewBox="0 0 120 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="60" cy="46" rx="46" ry="16" fill="#B45309" />
        <ellipse cx="60" cy="44" rx="44" ry="14" fill="#F59E0B" />
        {/* Tablecloth */}
        <ellipse cx="60" cy="44" rx="30" ry="9" fill="#FFFFFF" />
        {/* Legs */}
        <rect x="28" y="48" width="6" height="42" rx="3" fill="#92400E" />
        <rect x="86" y="48" width="6" height="42" rx="3" fill="#92400E" />
        <rect x="57" y="48" width="6" height="42" rx="3" fill="#78350F" />
      </svg>
    );
  }

  // 19. GREETINGS: BUENOS DÍAS / MORNING SUN
  if (n.includes('buenos días') || n.includes('buenos dias') || n.includes('días') || n.includes('morning')) {
    return (
      <svg viewBox="0 0 120 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Horizon */}
        <line x1="16" y1="72" x2="104" y2="72" stroke="#38BDF8" strokeWidth="4" strokeLinecap="round" />
        {/* Rising Sun */}
        <path d="M36 72C36 48 84 48 84 72H36Z" fill="#F59E0B" />
        <circle cx="60" cy="56" r="4" fill="#FBBF24" />
        {/* Sun Rays */}
        <line x1="60" y1="36" x2="60" y2="24" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" />
        <line x1="42" y1="42" x2="34" y2="34" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" />
        <line x1="78" y1="42" x2="86" y2="34" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" />
        <line x1="28" y1="62" x2="18" y2="60" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" />
        <line x1="92" y1="62" x2="102" y2="60" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" />
      </svg>
    );
  }

  // 20. BUENAS NOCHES / NIGHT MOON
  if (n.includes('buenas noches') || n.includes('noches') || n.includes('night')) {
    return (
      <svg viewBox="0 0 120 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Crescent Moon */}
        <path d="M70 24C52 24 38 38 38 56C38 74 52 88 70 88C76 88 82 86 86 84C72 80 62 68 62 56C62 44 72 32 86 28C82 26 76 24 70 24Z" fill="#FBBF24" />
        {/* Stars */}
        <polygon points="32,32 34,26 36,32 42,34 36,36 34,42 32,36 26,34" fill="#FEF08A" />
        <polygon points="86,44 87,40 89,44 93,45 89,46 87,50 86,46 82,45" fill="#FEF08A" />
        <polygon points="38,70 39,66 41,70 45,71 41,72 39,76 38,72 34,71" fill="#FEF08A" />
      </svg>
    );
  }

  // 21. BUENAS TARDES / AFTERNOON SUN & CLOUD
  if (n.includes('buenas tardes') || n.includes('tardes') || n.includes('afternoon')) {
    return (
      <svg viewBox="0 0 120 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="68" cy="44" r="22" fill="#F97316" />
        {/* Cloud in front of afternoon sun */}
        <ellipse cx="48" cy="62" rx="18" ry="12" fill="#E2E8F0" />
        <ellipse cx="68" cy="60" rx="22" ry="14" fill="#F8FAFC" />
        <ellipse cx="88" cy="64" rx="14" ry="10" fill="#E2E8F0" />
      </svg>
    );
  }

  // 22. HOLA / HELLO (Waving Hand)
  if (n.includes('hola') || n.includes('hello')) {
    return (
      <svg viewBox="0 0 120 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M46 76V56C46 52 50 50 54 54V76" fill="#FBBF24" />
        {/* Palm & fingers */}
        <rect x="42" y="44" width="36" height="38" rx="12" fill="#F59E0B" />
        <rect x="44" y="24" width="8" height="26" rx="4" fill="#FBBF24" />
        <rect x="54" y="18" width="8" height="32" rx="4" fill="#FBBF24" />
        <rect x="64" y="22" width="8" height="28" rx="4" fill="#FBBF24" />
        <rect x="74" y="30" width="8" height="20" rx="4" fill="#FBBF24" />
        {/* Thumb */}
        <path d="M42 56L30 46C27 43 32 38 36 42L44 48" stroke="#F59E0B" strokeWidth="6" strokeLinecap="round" />
      </svg>
    );
  }

  // 23. NUMBERS: 1 / UNO
  if (n === '1' || n.includes('uno') || n.includes('one')) {
    return (
      <svg viewBox="0 0 120 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="30" y="16" width="60" height="68" rx="14" fill="#3B82F6" />
        <path d="M50 38L62 28V72M52 72H72" stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  // 24. NUMBERS: 2 / DOS
  if (n === '2' || n.includes('dos') || n.includes('two')) {
    return (
      <svg viewBox="0 0 120 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="30" y="16" width="60" height="68" rx="14" fill="#10B981" />
        <path d="M48 38C48 30 68 30 68 40C68 50 48 58 48 70H72" stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  // 25. NUMBERS: 3 / TRES
  if (n === '3' || n.includes('tres') || n.includes('three')) {
    return (
      <svg viewBox="0 0 120 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="30" y="16" width="60" height="68" rx="14" fill="#F59E0B" />
        <path d="M48 32H70L58 48C66 48 72 52 72 60C72 68 62 72 50 70" stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  // 26. NUMBERS: 4 / CUATRO
  if (n === '4' || n.includes('cuatro') || n.includes('four')) {
    return (
      <svg viewBox="0 0 120 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="30" y="16" width="60" height="68" rx="14" fill="#EC4899" />
        <path d="M64 28V72M64 56H46L64 28" stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  // 27. COLORS: AZUL / BLUE
  if (n.includes('azul') || n.includes('blue')) {
    return (
      <svg viewBox="0 0 120 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="60" cy="50" r="30" fill="#2563EB" />
        <ellipse cx="50" cy="42" rx="8" ry="14" transform="rotate(-30 50 42)" fill="#60A5FA" opacity="0.6" />
        <circle cx="86" cy="62" r="8" fill="#1D4ED8" />
        <circle cx="36" cy="66" r="6" fill="#3B82F6" />
      </svg>
    );
  }

  // 28. COLORS: ROJO / RED
  if (n.includes('rojo') || n.includes('red')) {
    return (
      <svg viewBox="0 0 120 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="60" cy="50" r="30" fill="#DC2626" />
        <ellipse cx="50" cy="42" rx="8" ry="14" transform="rotate(-30 50 42)" fill="#F87171" opacity="0.6" />
        <circle cx="86" cy="62" r="8" fill="#B91C1C" />
        <circle cx="36" cy="66" r="6" fill="#EF4444" />
      </svg>
    );
  }

  // 29. COLORS: VERDE / GREEN
  if (n.includes('verde') || n.includes('green')) {
    return (
      <svg viewBox="0 0 120 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="60" cy="50" r="30" fill="#16A34A" />
        <ellipse cx="50" cy="42" rx="8" ry="14" transform="rotate(-30 50 42)" fill="#4ADE80" opacity="0.6" />
        <circle cx="86" cy="62" r="8" fill="#15803D" />
        <circle cx="36" cy="66" r="6" fill="#22C55E" />
      </svg>
    );
  }

  // 30. COLORS: AMARILLO / YELLOW
  if (n.includes('amarillo') || n.includes('yellow')) {
    return (
      <svg viewBox="0 0 120 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="60" cy="50" r="30" fill="#EAB308" />
        <ellipse cx="50" cy="42" rx="8" ry="14" transform="rotate(-30 50 42)" fill="#FDE047" opacity="0.7" />
        <circle cx="86" cy="62" r="8" fill="#CA8A04" />
        <circle cx="36" cy="66" r="6" fill="#FACC15" />
      </svg>
    );
  }

  // 31. BOY / NIÑO / NINO
  if (n.includes('niño') || n.includes('nino') || n.includes('boy')) {
    return (
      <svg viewBox="0 0 120 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="60" cy="48" r="20" fill="#FDE68A" />
        {/* Cap */}
        <path d="M40 40C40 28 50 22 60 22C70 22 80 28 80 40H36L40 40Z" fill="#EF4444" />
        <rect x="56" y="38" width="30" height="5" rx="2.5" fill="#DC2626" />
        <circle cx="53" cy="48" r="2.5" fill="#1E293B" />
        <circle cx="67" cy="48" r="2.5" fill="#1E293B" />
        <path d="M55 58C57 61 63 61 65 58" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
        <rect x="44" y="68" width="32" height="24" rx="6" fill="#3B82F6" />
      </svg>
    );
  }

  // 32. GIRL / NIÑA / NINA
  if (n.includes('niña') || n.includes('nina') || n.includes('girl')) {
    return (
      <svg viewBox="0 0 120 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Pigtails */}
        <circle cx="36" cy="42" r="9" fill="#B45309" />
        <circle cx="84" cy="42" r="9" fill="#B45309" />
        <circle cx="60" cy="48" r="20" fill="#FDE68A" />
        <path d="M42 42C44 30 52 26 60 26C68 26 76 30 78 42Z" fill="#B45309" />
        <circle cx="53" cy="48" r="2.5" fill="#1E293B" />
        <circle cx="67" cy="48" r="2.5" fill="#1E293B" />
        <path d="M55 58C57 61 63 61 65 58" stroke="#E11D48" strokeWidth="2.5" strokeLinecap="round" />
        <rect x="44" y="68" width="32" height="24" rx="6" fill="#EC4899" />
      </svg>
    );
  }

  // 33. MAN / HOMBRE
  if (n.includes('hombre') || n.includes('man')) {
    return (
      <svg viewBox="0 0 120 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="60" cy="46" r="20" fill="#FCD34D" />
        <path d="M40 38C40 26 50 22 60 22C70 22 80 26 80 38C74 32 66 30 60 30C54 30 46 32 40 38Z" fill="#78350F" />
        <circle cx="53" cy="44" r="2.5" fill="#1F2937" />
        <circle cx="67" cy="44" r="2.5" fill="#1F2937" />
        {/* Beard / Mustache */}
        <path d="M52 54C56 57 64 57 68 54" stroke="#78350F" strokeWidth="3" strokeLinecap="round" />
        <rect x="42" y="66" width="36" height="26" rx="6" fill="#2563EB" />
      </svg>
    );
  }

  // 34. WOMAN / MUJER
  if (n.includes('mujer') || n.includes('woman')) {
    return (
      <svg viewBox="0 0 120 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="60" cy="52" rx="26" ry="30" fill="#B45309" />
        <circle cx="60" cy="46" r="18" fill="#FDE68A" />
        <path d="M44 40C44 28 52 24 60 24C68 24 76 28 76 40Z" fill="#B45309" />
        <circle cx="53" cy="44" r="2.5" fill="#1F2937" />
        <circle cx="67" cy="44" r="2.5" fill="#1F2937" />
        <path d="M55 54C57 57 63 57 65 54" stroke="#E11D48" strokeWidth="2.5" strokeLinecap="round" />
        <rect x="44" y="64" width="32" height="28" rx="6" fill="#A855F7" />
      </svg>
    );
  }

  // Generic fallback: Star / Book
  return (
    <svg viewBox="0 0 120 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="50" r="30" fill="#E0F2FE" />
      <path d="M60 28L66 42L80 44L69 54L72 68L60 61L48 68L51 54L40 44L54 42L60 28Z" fill="#FBBF24" stroke="#F59E0B" strokeWidth="2" />
    </svg>
  );
}
