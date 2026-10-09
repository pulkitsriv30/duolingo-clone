'use client';

import React, { useState } from 'react';
import clsx from 'clsx';

interface DuoMascotProps {
  className?: string;
}

export default function DuoMascot({ className = 'w-24 h-24' }: DuoMascotProps) {
  const [extraTwirl, setExtraTwirl] = useState(false);

  const handleClick = () => {
    setExtraTwirl(true);
    setTimeout(() => setExtraTwirl(false), 1400);
  };

  return (
    <div
      onClick={handleClick}
      className={clsx(
        'relative inline-block cursor-pointer select-none',
        className
      )}
      title="Click Duo to make him pirouette on one foot!"
    >
      {/* Stone Pedestal Pad beneath Duo (Dark circular base matching screenshot) */}
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-20 h-6 bg-[#202f36] border-2 border-[#2b3940] rounded-full shadow-inner flex items-center justify-center">
        <div className="w-14 h-3.5 bg-[#182228] rounded-full opacity-60" />
      </div>

      {/* Duo Character Container (Single unified character retaining 3D volumetric form throughout twirl) */}
      <div
        className={clsx(
          'w-full h-full relative z-10 duo-actor',
          extraTwirl && 'animate-manual-twirl'
        )}
        style={{
          transformOrigin: '38% 85%',
        }}
      >
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full overflow-visible"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* 3D Spherical volume shading for Duo's body */}
            <radialGradient id="duoBodyVolumetric" cx="38%" cy="30%" r="65%">
              <stop offset="0%" stopColor="#7ee418" />
              <stop offset="55%" stopColor="#58cc02" />
              <stop offset="88%" stopColor="#449e02" />
              <stop offset="100%" stopColor="#357c00" />
            </radialGradient>

            {/* Belly highlight gradient */}
            <radialGradient id="duoBellyVolumetric" cx="50%" cy="38%" r="60%">
              <stop offset="0%" stopColor="#b2f43a" />
              <stop offset="70%" stopColor="#84d800" />
              <stop offset="100%" stopColor="#68b000" />
            </radialGradient>

            {/* Eye 3D sheen */}
            <linearGradient id="eyeSheen" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#f0f3f6" />
            </linearGradient>

            {/* Beak top facet */}
            <linearGradient id="beakTopFacet" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffa012" />
              <stop offset="100%" stopColor="#ff8400" />
            </linearGradient>

            {/* Beak bottom facet */}
            <linearGradient id="beakBottomFacet" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#e05b00" />
              <stop offset="100%" stopColor="#b44200" />
            </linearGradient>
          </defs>

          {/* Planted Left Foot (Stays firmly grounded on the stone pedestal as pivot) */}
          <g className="duo-left-foot">
            <ellipse cx="38" cy="85" rx="9" ry="5" fill="#E05B00" />
            <ellipse cx="38" cy="84" rx="8" ry="4" fill="#FF9600" />
          </g>

          {/* Lifted Right Foot (Lifts up into the air during the twirl!) */}
          <g
            className="duo-right-foot"
            style={{ transformBox: 'fill-box', transformOrigin: 'center top' }}
          >
            <ellipse cx="62" cy="85" rx="9" ry="5" fill="#E05B00" />
            <ellipse cx="62" cy="84" rx="8" ry="4" fill="#FF9600" />
          </g>

          {/* Cute Tail Feathers at lower base */}
          <g className="duo-tail">
            <path d="M44 76 C47 83 53 83 56 76 Z" fill="#357c00" />
          </g>

          {/* 3D Rounded Body Sphere (Preserves full volumetric roundness at all times!) */}
          <g className="duo-body-sphere">
            <ellipse cx="50" cy="54" rx="34" ry="32" fill="url(#duoBodyVolumetric)" />
            {/* Ambient 3D surface sheen */}
            <ellipse cx="44" cy="46" rx="20" ry="16" fill="#ffffff" opacity="0.14" />
          </g>

          {/* Left Wing */}
          <g
            className="duo-left-wing"
            style={{ transformBox: 'fill-box', transformOrigin: 'right top' }}
          >
            <ellipse cx="18" cy="56" rx="8" ry="14" transform="rotate(15 18 56)" fill="#357c00" />
            <ellipse cx="19" cy="55" rx="7" ry="12" transform="rotate(15 19 55)" fill="#58CC02" />
          </g>

          {/* Right Wing */}
          <g
            className="duo-right-wing"
            style={{ transformBox: 'fill-box', transformOrigin: 'left top' }}
          >
            <ellipse cx="82" cy="56" rx="8" ry="14" transform="rotate(-15 82 56)" fill="#357c00" />
            <ellipse cx="81" cy="55" rx="7" ry="12" transform="rotate(-15 81 55)" fill="#58CC02" />
          </g>

          {/* 3D Facial & Front Features (Maintains single structure, moves seamlessly across surface during 3D twirl) */}
          <g
            className="duo-face-features"
            style={{ transformBox: 'fill-box', transformOrigin: 'center center' }}
          >
            {/* Belly Patch */}
            <ellipse cx="50" cy="63" rx="20" ry="16" fill="url(#duoBellyVolumetric)" />

            {/* Head & Expression (Turns left, center, right; blinks; twirls) */}
            <g
              className="duo-head"
              style={{ transformBox: 'fill-box', transformOrigin: 'center 75%' }}
            >
              {/* Cute Feathers on Head (Tufts) */}
              <path d="M42 24C45 20 50 20 52 24" stroke="#357c00" strokeWidth="3.2" strokeLinecap="round" />
              <path d="M48 22C52 17 58 18 60 22" stroke="#58CC02" strokeWidth="3.2" strokeLinecap="round" />

              {/* Big White 3D Eyes */}
              <ellipse cx="36" cy="46" rx="13" ry="15" fill="url(#eyeSheen)" stroke="#357c00" strokeWidth="2.2" />
              <ellipse cx="64" cy="46" rx="13" ry="15" fill="url(#eyeSheen)" stroke="#357c00" strokeWidth="2.2" />

              {/* Pupils (Animate looking left & right + blinking) */}
              <g
                className="duo-pupils"
                style={{ transformBox: 'fill-box', transformOrigin: 'center center' }}
              >
                {/* Left Pupil */}
                <circle cx="39" cy="47" r="7.5" fill="#1CB0F6" />
                <circle cx="39" cy="47" r="4.5" fill="#0A3048" />
                <circle cx="37" cy="44.5" r="2.2" fill="#FFFFFF" />

                {/* Right Pupil */}
                <circle cx="61" cy="47" r="7.5" fill="#1CB0F6" />
                <circle cx="61" cy="47" r="4.5" fill="#0A3048" />
                <circle cx="59" cy="44.5" r="2.2" fill="#FFFFFF" />
              </g>

              {/* 3D Beveled Orange Beak */}
              <polygon points="50,62 42,52 58,52" fill="url(#beakBottomFacet)" />
              <polygon points="50,60 43,52.5 57,52.5" fill="url(#beakTopFacet)" />
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}
