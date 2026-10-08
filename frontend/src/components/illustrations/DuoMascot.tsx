'use client';

import React from 'react';
import clsx from 'clsx';

interface DuoMascotProps {
  className?: string;
}

export default function DuoMascot({ className = 'w-24 h-24' }: DuoMascotProps) {
  return (
    <div className={clsx('relative inline-block duo-float', className)}>
      {/* Ground shadow platform beneath Duo */}
      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-16 h-3.5 bg-black/30 rounded-full filter blur-[1px] duo-shadow" />

      {/* Duo SVG Mascot */}
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full relative z-10 filter drop-shadow-sm"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Duo Body (Vibrant Green) */}
        <ellipse cx="50" cy="54" rx="34" ry="32" fill="#58CC02" />
        {/* Body highlight */}
        <ellipse cx="50" cy="50" rx="31" ry="28" fill="#78C800" />
        {/* Belly patch */}
        <ellipse cx="50" cy="62" rx="20" ry="17" fill="#84D800" />

        {/* Orange Feet */}
        <ellipse cx="38" cy="85" rx="9" ry="5" fill="#E05B00" />
        <ellipse cx="38" cy="84" rx="8" ry="4" fill="#FF9600" />
        <ellipse cx="62" cy="85" rx="9" ry="5" fill="#E05B00" />
        <ellipse cx="62" cy="84" rx="8" ry="4" fill="#FF9600" />

        {/* Left Wing (Animated Waving) */}
        <g className="duo-left-wing">
          <ellipse cx="18" cy="56" rx="8" ry="14" transform="rotate(15 18 56)" fill="#46A302" />
          <ellipse cx="19" cy="55" rx="7" ry="12" transform="rotate(15 19 55)" fill="#58CC02" />
        </g>

        {/* Right Wing */}
        <g className="duo-right-wing">
          <ellipse cx="82" cy="56" rx="8" ry="14" transform="rotate(-15 82 56)" fill="#46A302" />
          <ellipse cx="81" cy="55" rx="7" ry="12" transform="rotate(-15 81 55)" fill="#58CC02" />
        </g>

        {/* HEAD GROUP (Head tilts left and right playfully, as requested!) */}
        <g className="duo-head">
          {/* Cute Feathers on Head (Tufts) */}
          <path d="M42 24C45 20 50 20 52 24" stroke="#46A302" strokeWidth="3" strokeLinecap="round" />
          <path d="M48 22C52 17 58 18 60 22" stroke="#58CC02" strokeWidth="3" strokeLinecap="round" />

          {/* Big White Eyes */}
          <ellipse cx="36" cy="46" rx="13" ry="15" fill="#FFFFFF" />
          <ellipse cx="64" cy="46" rx="13" ry="15" fill="#FFFFFF" />

          {/* Eye Outlines */}
          <ellipse cx="36" cy="46" rx="13" ry="15" stroke="#46A302" strokeWidth="2" />
          <ellipse cx="64" cy="46" rx="13" ry="15" stroke="#46A302" strokeWidth="2" />

          {/* Pupils (Animated Blinking + Shifting Gaze Left & Right) */}
          <g className="duo-pupils">
            {/* Left Pupil */}
            <circle cx="39" cy="47" r="7.5" fill="#1CB0F6" />
            <circle cx="39" cy="47" r="4.5" fill="#0A3048" />
            <circle cx="37" cy="44.5" r="2.2" fill="#FFFFFF" />

            {/* Right Pupil */}
            <circle cx="61" cy="47" r="7.5" fill="#1CB0F6" />
            <circle cx="61" cy="47" r="4.5" fill="#0A3048" />
            <circle cx="59" cy="44.5" r="2.2" fill="#FFFFFF" />
          </g>

          {/* Orange Beak */}
          <polygon points="50,62 42,52 58,52" fill="#E05B00" />
          <polygon points="50,61 43,52.5 57,52.5" fill="#FF9600" />
        </g>
      </svg>
    </div>
  );
}
