import React from 'react';

export const ClipboardIllustration: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative flex items-center justify-center select-none pointer-events-none ${className}`}>
      <svg
        className="w-full h-auto max-w-[145px] overflow-visible"
        viewBox="0 0 200 210"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="subtleDrop" x="-10%" y="-10%" width="130%" height="130%">
            <feDropShadow dx="0" dy="3" stdDeviation="5" floodColor="#155B4D" floodOpacity="0.06" />
          </filter>
        </defs>

        {/* 1. Warm Circular Background matching reference */}
        <circle cx="120" cy="110" r="82" fill="#FCE7A6" />

        {/* 2. Clipboard Body */}
        <g transform="rotate(3 112 118)" filter="url(#subtleDrop)">
          {/* Board: Green Border + White Body */}
          <rect
            x="48"
            y="30"
            width="106"
            height="148"
            rx="16"
            fill="#FFFFFF"
            stroke="#155B4D"
            strokeWidth="5"
          />

          {/* Top Yellow Hanging Clip */}
          <path
            d="M80 30 C80 20, 88 15, 101 15 C114 15, 122 20, 122 30 Z"
            fill="#EEB028"
          />
          {/* Clip Hole */}
          <circle cx="101" cy="23" r="4.5" fill="#FFFFFF" />

          {/* Horizontal Clamp Plate */}
          <rect
            x="72"
            y="28"
            width="58"
            height="11"
            rx="5.5"
            fill="#E5A720"
          />

          {/* Checklist Items: 3 Rows */}
          {/* --- ROW 1 --- */}
          <g transform="translate(62, 54)">
            {/* Green Rounded Checkbox */}
            <rect x="0" y="0" width="18" height="18" rx="4.5" fill="#72C17D" />
            {/* White Checkmark */}
            <path
              d="M4.5 9.5 L7.5 12.5 L13.5 5.5"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Horizontal Text Bars */}
            <rect x="25" y="3.5" width="48" height="4.5" rx="2.25" fill="#BDDCC8" />
            <rect x="25" y="10.5" width="34" height="4.5" rx="2.25" fill="#BDDCC8" />
          </g>

          {/* --- ROW 2 --- */}
          <g transform="translate(62, 85)">
            {/* Green Rounded Checkbox */}
            <rect x="0" y="0" width="18" height="18" rx="4.5" fill="#72C17D" />
            {/* White Checkmark */}
            <path
              d="M4.5 9.5 L7.5 12.5 L13.5 5.5"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Horizontal Text Bars */}
            <rect x="25" y="3.5" width="44" height="4.5" rx="2.25" fill="#BDDCC8" />
            <rect x="25" y="10.5" width="28" height="4.5" rx="2.25" fill="#BDDCC8" />
          </g>

          {/* --- ROW 3 --- */}
          <g transform="translate(62, 116)">
            {/* Green Rounded Checkbox */}
            <rect x="0" y="0" width="18" height="18" rx="4.5" fill="#72C17D" />
            {/* White Checkmark */}
            <path
              d="M4.5 9.5 L7.5 12.5 L13.5 5.5"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Horizontal Text Bars */}
            <rect x="25" y="3.5" width="46" height="4.5" rx="2.25" fill="#BDDCC8" />
            <rect x="25" y="10.5" width="32" height="4.5" rx="2.25" fill="#BDDCC8" />
          </g>
        </g>
      </svg>
    </div>
  );
};
