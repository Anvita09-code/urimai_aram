import React from 'react';
import { User } from 'lucide-react';
import { Language } from '../types';

interface BrandHeaderProps {
  currentLang: Language;
  onOpenLanguage: () => void;
  onNavigateToDashboard?: () => void;
}

export const BrandHeader: React.FC<BrandHeaderProps> = ({ currentLang, onOpenLanguage, onNavigateToDashboard }) => {
  const isTamil = currentLang === 'ta';

  return (
    <header className="w-full pl-[18px] pr-[13px] sm:pl-5 sm:pr-3.5 pt-1.5 pb-1 flex items-center justify-between gap-1.5 select-none">
      {/* Brand Lockup: Crisp emblem and brand titles vertically centered */}
      <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
        {/* Emblem */}
        <img
          src="/assets/aistudio/emblem.png"
          alt="Urimai Aram Emblem"
          className="w-[26px] h-[30px] sm:w-[28px] sm:h-[32px] object-contain select-none pointer-events-none shrink-0"
          loading="eager"
        />

        {/* Wordmarks */}
        <div className="flex flex-col justify-center">
          {/* Tamil Wordmark */}
          <span className="font-tamil text-[14px] sm:text-[15px] font-bold text-[#202820] leading-tight select-none">
            உரிமையறம்
          </span>

          {/* English Wordmark */}
          <span className="text-[8.5px] sm:text-[9px] font-bold text-[#202820] tracking-[0.05em] leading-none uppercase mt-0.5 select-none">
            URIMAI ARAM
          </span>

          {/* Small yellow underline */}
          <span
            aria-hidden="true"
            className="w-7 sm:w-8 h-[1.5px] bg-[#E5A824] rounded-full mt-[2px]"
          />
        </div>
      </div>

      {/* Right controls: Dashboard Entry + Language Selector */}
      <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
        {onNavigateToDashboard && (
          <button
            onClick={onNavigateToDashboard}
            type="button"
            aria-label="Citizen Dashboard"
            className="flex items-center gap-1 px-2.5 py-1 bg-[#E8F3EB] hover:bg-[#DDF0E1] text-[#155B4D] active:scale-95 border border-[#CFE4D4] rounded-full shadow-2xs text-[11px] sm:text-[11.5px] font-semibold transition-all cursor-pointer h-[29px] sm:h-[31px] shrink-0"
          >
            <User className="w-3.5 h-3.5 stroke-[2.2] shrink-0" />
            <span className={isTamil ? 'font-tamil' : ''}>
              {isTamil ? 'முகப்பு' : 'Dashboard'}
            </span>
          </button>
        )}

        {/* Language Selector Pill */}
        <button
          onClick={onOpenLanguage}
          type="button"
          aria-label="Change language / மொழி தேர்வு"
          className="flex items-center gap-1 px-2 sm:px-2.5 py-1 bg-white hover:bg-[#FAF7EF] active:scale-95 border border-[#E5DFD4] rounded-full shadow-2xs transition-all duration-150 cursor-pointer h-[29px] sm:h-[31px] shrink-0"
        >
          {/* Translate / Multi-language glyph 文A */}
          <span className="text-[10.5px] sm:text-[11px] text-[#202820] font-medium leading-none select-none">文A</span>

          {/* Language Label */}
          <span
            className={`text-[11px] sm:text-[11.5px] font-semibold text-[#202820] ${
              isTamil ? 'font-tamil' : ''
            }`}
          >
            {isTamil ? 'தமிழ்' : 'English'}
          </span>

          {/* Down Chevron */}
          <svg
            className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#202820] stroke-[2.2] shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      </div>
    </header>
  );
};
