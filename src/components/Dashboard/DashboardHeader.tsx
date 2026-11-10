import React from 'react';
import { Bell } from 'lucide-react';
import { Language } from '../../types';

interface DashboardHeaderProps {
  currentLang: Language;
  unreadCount?: number;
  onOpenLanguage: () => void;
  onOpenNotifications: () => void;
  onNavigateHome: () => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  currentLang,
  unreadCount = 2,
  onOpenLanguage,
  onOpenNotifications,
  onNavigateHome,
}) => {
  const isTamil = currentLang === 'ta';

  return (
    <header className="w-full px-4 sm:px-5 pt-3.5 sm:pt-4 pb-1.5 flex items-center justify-between select-none">
      {/* Left side: Brand Lockup */}
      <button
        type="button"
        onClick={onNavigateHome}
        className="flex items-center gap-1.5 sm:gap-2 cursor-pointer hover:opacity-90 active:scale-98 transition-all text-left"
        aria-label="Urimai Aram Home"
      >
        {/* Emblem */}
        <img
          src="/assets/aistudio/emblem.png"
          alt="Urimai Aram Emblem"
          className="w-[26px] h-[30px] sm:w-[28px] sm:h-[32px] object-contain select-none pointer-events-none shrink-0"
          loading="eager"
        />

        {/* Brand Wordmarks */}
        <div className="flex flex-col justify-center">
          {/* Tamil Wordmark */}
          <span className="font-tamil text-[14px] sm:text-[15px] font-bold text-[#202820] leading-tight select-none">
            உரிமையறம்
          </span>

          {/* English Wordmark */}
          <span className="text-[8.5px] sm:text-[9px] font-bold text-[#202820] tracking-[0.05em] leading-none uppercase mt-0.5 select-none">
            URIMAI ARAM
          </span>

          {/* Yellow underline */}
          <span
            aria-hidden="true"
            className="w-7 sm:w-8 h-[1.5px] bg-[#E5A824] rounded-full mt-[2px]"
          />
        </div>
      </button>

      {/* Right side: Language Selector Pill + Notification Bell */}
      <div className="flex items-center gap-2 sm:gap-2.5">
        {/* Language Selector Pill */}
        <button
          onClick={onOpenLanguage}
          type="button"
          aria-label="Change language / மொழி தேர்வு"
          className="flex items-center gap-1.5 px-3 py-1 bg-white hover:bg-[#FAF7EF] active:scale-95 border border-[#E5DFD4] rounded-full shadow-2xs transition-all duration-150 cursor-pointer min-h-[32px]"
        >
          {/* Translate / Multi-language glyph 文A */}
          <span className="text-[11.5px] text-[#202820] font-medium leading-none select-none">文A</span>

          {/* Language Label */}
          <span
            className={`text-[12px] font-bold text-[#202820] ${
              isTamil ? 'font-tamil' : ''
            }`}
          >
            {isTamil ? 'தமிழ்' : 'English'}
          </span>

          {/* Down Chevron */}
          <svg
            className="w-3 h-3 text-[#202820] stroke-[2.5]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>

        {/* Notification Bell with Turmeric Indicator Dot */}
        <button
          onClick={onOpenNotifications}
          type="button"
          aria-label="Notifications"
          className="relative w-8 h-8 rounded-full flex items-center justify-center text-[#155B4D] hover:bg-black/5 active:scale-90 transition-all cursor-pointer"
        >
          <Bell className="w-5 h-5 stroke-[2.2]" />
          {unreadCount > 0 && (
            <span
              className="absolute top-1 right-1 w-2.5 h-2.5 bg-[#F5D879] border-2 border-[#FAF7EF] rounded-full"
              aria-label={`${unreadCount} unread notifications`}
            />
          )}
        </button>
      </div>
    </header>
  );
};
