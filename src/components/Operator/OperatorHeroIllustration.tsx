import React from 'react';

export const OperatorHeroIllustration: React.FC<{ className?: string }> = ({ className = 'w-24 h-24' }) => {
  return (
    <div className={`relative shrink-0 flex items-center justify-center select-none ${className}`}>
      <svg
        viewBox="0 0 160 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-2xs"
        aria-label="e-Sevai Assistance Centre Woman Operator"
      >
        {/* Soft Mint Circular Backdrop */}
        <circle cx="80" cy="80" r="72" fill="#E2EDE3" />
        <path
          d="M24 126C36 100 60 88 94 88C120 88 140 102 148 126"
          stroke="#D2E4D4"
          strokeWidth="1.5"
          strokeDasharray="3 3"
        />

        {/* Desk Surface */}
        <path
          d="M20 134L140 134"
          stroke="#C5DBC8"
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* Woman Operator - Torso & Saree */}
        {/* Body Base */}
        <path
          d="M62 134V102C62 93 70 86 80 86C90 86 98 93 98 102V134H62Z"
          fill="#145B49"
        />

        {/* Saree Pallu across shoulder with Golden Yellow Trim */}
        <path
          d="M66 104C74 96 90 90 98 104L94 134H78L66 104Z"
          fill="#0E4839"
        />
        {/* Saree Golden Border */}
        <path
          d="M68 103C76 96 91 91 97 103"
          stroke="#F5A623"
          strokeWidth="3.5"
          strokeLinecap="round"
        />

        {/* Operator ID Lanyard / Card */}
        <path
          d="M77 92L78 108L83 108L84 92"
          stroke="#F5A623"
          strokeWidth="1.2"
        />
        <rect x="76.5" y="108" width="8" height="10" rx="1.5" fill="#FFFFFF" stroke="#145B49" strokeWidth="0.8" />
        <rect x="78" y="110" width="5" height="2" fill="#145B49" />

        {/* Neck */}
        <path
          d="M75 74H85V86H75V74Z"
          fill="#E5A67C"
        />

        {/* Head & Face */}
        <ellipse cx="80" cy="64" rx="14" ry="16" fill="#F3B993" />

        {/* Hair - Neat Professional Bun & Side Sweep */}
        <path
          d="M66 64C66 51 72 45 80 45C88 45 94 51 94 64C94 67 93 72 91 75C89 67 85 58 80 58C75 58 71 67 69 75C67 72 66 67 66 64Z"
          fill="#232B2B"
        />
        <ellipse cx="94" cy="56" rx="6" ry="6" fill="#1E2322" />
        {/* Jasmine Flower / Pin in hair */}
        <circle cx="95" cy="53" r="2.5" fill="#FFF7ED" />
        <circle cx="97" cy="56" r="2" fill="#FDE047" />

        {/* Eyes & Friendly Expression */}
        <circle cx="76" cy="64" r="1.5" fill="#232B2B" />
        <circle cx="84" cy="64" r="1.5" fill="#232B2B" />
        {/* Eyebrows */}
        <path d="M74 61C75 60.5 77 60.5 78 61" stroke="#232B2B" strokeWidth="0.8" strokeLinecap="round" />
        <path d="M82 61C83 60.5 85 60.5 86 61" stroke="#232B2B" strokeWidth="0.8" strokeLinecap="round" />
        {/* Bindi */}
        <circle cx="80" cy="61" r="1" fill="#DC2626" />
        {/* Smile */}
        <path
          d="M77 71C78.5 73 81.5 73 83 71"
          stroke="#994D26"
          strokeWidth="1.2"
          strokeLinecap="round"
        />

        {/* Arms typing on laptop */}
        <path
          d="M64 104C55 110 50 118 64 126L74 125"
          stroke="#F3B993"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M96 104C102 110 100 118 86 126L78 125"
          stroke="#F3B993"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Green Bangles */}
        <circle cx="68" cy="122" r="3" stroke="#F5A623" strokeWidth="1" fill="none" />

        {/* Laptop open in dark teal */}
        {/* Screen */}
        <path
          d="M48 106L68 106L64 125L42 125Z"
          fill="#1F2937"
        />
        <path
          d="M50 108L66 108L63 123L45 123Z"
          fill="#0D9488"
        />
        {/* Government Emblem on laptop lid / screen glow */}
        <circle cx="56" cy="115" r="2.5" fill="#FEF08A" opacity="0.9" />

        {/* Laptop Keyboard Base */}
        <path
          d="M38 125L74 125L84 133L46 133Z"
          fill="#374151"
        />
        <path
          d="M44 126L72 126L78 131L48 131Z"
          fill="#4B5563"
        />

        {/* Coffee Cup / Pen Stand on side */}
        <rect x="112" y="118" width="10" height="15" rx="2" fill="#FFFFFF" stroke="#C5DBC8" strokeWidth="1.5" />
        <path d="M122 122C124 122 125 124 125 126C125 128 124 130 122 130" stroke="#C5DBC8" strokeWidth="1.2" />
        <rect x="114" y="112" width="2" height="7" rx="1" fill="#145B49" transform="rotate(-12 114 112)" />
        <rect x="117" y="112" width="2" height="7" rx="1" fill="#F59E0B" transform="rotate(10 117 112)" />
      </svg>
    </div>
  );
};
