import React from 'react';

export const GovernmentBuildingIllustration: React.FC<{ className?: string }> = ({
  className = 'w-22 h-20',
}) => {
  return (
    <div className={`relative shrink-0 flex items-center justify-center select-none ${className}`}>
      <svg
        viewBox="0 0 120 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-2xs"
        aria-label="Government Administrative Secretariat Building"
      >
        {/* Soft Mint Arch / Oval Backdrop */}
        <circle cx="60" cy="54" r="42" fill="#E2EDE3" />
        <ellipse cx="60" cy="88" rx="46" ry="6" fill="#D2E4D4" />

        {/* Flagpole & Indian Tricolor on Central Dome */}
        <line x1="60" y1="12" x2="60" y2="28" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M60 13H71L69 16.5L71 20H60V13Z" fill="#F97316" />
        <path d="M60 15.5H70L69 17.5L70 19.5H60V15.5Z" fill="#FFFFFF" />
        <path d="M60 17.5H69.5L69 19.5L69.5 21H60V17.5Z" fill="#15803D" />
        <circle cx="64.5" cy="17.5" r="0.8" fill="#1E3A8A" />

        {/* Central Dome */}
        <path
          d="M48 38C48 29 53 26 60 26C67 26 72 29 72 38H48Z"
          fill="#145B49"
        />
        <rect x="46" y="38" width="28" height="3" rx="1" fill="#0E4839" />

        {/* Pediment (Triangle Top) */}
        <polygon points="60,42 32,52 88,52" fill="#145B49" />
        {/* Inner pediment relief */}
        <polygon points="60,45 38,51 82,51" fill="#0E4839" />

        {/* Entablature beam */}
        <rect x="30" y="52" width="60" height="4" fill="#145B49" />

        {/* Main Colonaded Pillars (6 classical pillars) */}
        <rect x="34" y="56" width="4.5" height="22" rx="1" fill="#FFFFFF" stroke="#145B49" strokeWidth="1.2" />
        <rect x="44" y="56" width="4.5" height="22" rx="1" fill="#FFFFFF" stroke="#145B49" strokeWidth="1.2" />
        <rect x="54" y="56" width="4.5" height="22" rx="1" fill="#FFFFFF" stroke="#145B49" strokeWidth="1.2" />
        <rect x="61" y="56" width="4.5" height="22" rx="1" fill="#FFFFFF" stroke="#145B49" strokeWidth="1.2" />
        <rect x="71" y="56" width="4.5" height="22" rx="1" fill="#FFFFFF" stroke="#145B49" strokeWidth="1.2" />
        <rect x="81" y="56" width="4.5" height="22" rx="1" fill="#FFFFFF" stroke="#145B49" strokeWidth="1.2" />

        {/* Arched Central Entrance Behind Columns */}
        <path d="M56 66C56 63 58 61 60 61C62 61 64 63 64 66V78H56V66Z" fill="#0E4839" />

        {/* Side Wings / Windows */}
        <rect x="22" y="54" width="9" height="24" rx="1" fill="#145B49" />
        <rect x="24" y="58" width="5" height="7" rx="1" fill="#E2EDE3" />
        <rect x="24" y="68" width="5" height="7" rx="1" fill="#E2EDE3" />

        <rect x="89" y="54" width="9" height="24" rx="1" fill="#145B49" />
        <rect x="91" y="58" width="5" height="7" rx="1" fill="#E2EDE3" />
        <rect x="91" y="68" width="5" height="7" rx="1" fill="#E2EDE3" />

        {/* Podium Steps Base */}
        <rect x="18" y="78" width="84" height="4" rx="1" fill="#145B49" />
        <rect x="14" y="82" width="92" height="4" rx="1" fill="#0E4839" />
      </svg>
    </div>
  );
};
