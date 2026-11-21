import React from 'react';

export const OZGamingRigsLogo: React.FC<{ className?: string }> = ({ className = '' }) => {
  const gradientId = React.useId().replace(/:/g, '');

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Emblem Icon: Hexagonal Chassis + OZ Monogram + Performance Spark */}
      <svg
        width="42"
        height="42"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        <defs>
          <linearGradient id={`${gradientId}-ozCyanGrad`} x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#00E5FF" />
            <stop offset="100%" stopColor="#0077FF" />
          </linearGradient>
          <linearGradient id={`${gradientId}-ozAmberGrad`} x1="28" y1="10" x2="42" y2="38" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FF5E1A" />
            <stop offset="100%" stopColor="#FF9900" />
          </linearGradient>
        </defs>

        {/* Outer Industrial Chassis Frame */}
        <path
          d="M24 3L42 13.5V34.5L24 45L6 34.5V13.5L24 3Z"
          fill="#141821"
          stroke={`url(#${gradientId}-ozCyanGrad)`}
          strokeWidth="2.5"
        />

        {/* Inner Corner Tech Accents */}
        <path
          d="M11 16.5L24 9L37 16.5"
          stroke="#232936"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* Bold Stylized 'O' (Left) */}
        <path
          d="M14.5 18.5H21.5V29.5H14.5V18.5Z"
          stroke="#FFFFFF"
          strokeWidth="2.6"
          strokeLinejoin="miter"
        />

        {/* Sharp Angled 'Z' (Right - Performance Orange/Amber) */}
        <path
          d="M25.5 18.5H34.5L25.5 29.5H34.5"
          stroke={`url(#${gradientId}-ozAmberGrad)`}
          strokeWidth="2.6"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />

        {/* Bottom Airflow / Frame Accent Bar */}
        <rect x="17" y="34.5" width="14" height="2.2" rx="1.1" fill="#00E5FF" />
      </svg>

      {/* Wordmark */}
      <div className="flex flex-col leading-none">
        <div className="flex items-baseline tracking-tight font-extrabold text-xl">
          <span className="text-[#00E5FF]">OZ</span>
          <span className="text-white">GAMING</span>
          <span className="text-[#FF5E1A]">RIGS</span>
        </div>
        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-400 mt-1">
          Engineered For Every Frame
        </span>
      </div>
    </div>
  );
};
