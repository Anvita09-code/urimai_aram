import React from 'react';
import { Language } from '../../types';

interface ExplorerHeaderProps {
  currentLang: Language;
  onBack: () => void;
  onOpenLanguage: () => void;
}

export const ExplorerHeader: React.FC<ExplorerHeaderProps> = ({
  currentLang,
  onBack,
  onOpenLanguage,
}) => {
  const isTamil = currentLang === 'ta';

  return (
    <header className="w-full px-3.5 sm:px-5 pt-2 pb-0.5 flex items-center justify-between select-none">
      {/* Left side: Back Arrow + Brand Lockup */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Back Arrow button */}
        <button
          onClick={onBack}
          type="button"
          aria-label="Back to Landing Page"
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-[#20231F] hover:bg-black/5 active:scale-95 transition-all -ml-1 cursor-pointer"
        >
          <svg
            className="w-4.5 h-4.5 sm:w-5 sm:h-5 stroke-[2.5]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Brand Lockup */}
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1.5 sm:gap-2 cursor-pointer hover:opacity-90 active:scale-98 transition-all text-left"
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
            <span className="font-tamil text-[14px] sm:text-[15px] font-bold text-[#28251D] leading-tight select-none">
              உரிமையறம்
            </span>

            {/* English Wordmark */}
            <span className="text-[8.5px] sm:text-[9px] font-bold text-[#28251D] tracking-[0.05em] leading-none uppercase mt-0.5 select-none">
              URIMAI ARAM
            </span>

            {/* Yellow underline */}
            <span
              aria-hidden="true"
              className="w-7 sm:w-8 h-[1.5px] bg-[#E5A824] rounded-full mt-[2px]"
            />
          </div>
        </button>
      </div>

      {/* Right side: Language Selector Pill */}
      <button
        onClick={onOpenLanguage}
        type="button"
        aria-label="Change language / மொழி தேர்வு"
        className="flex items-center gap-1 px-2 sm:px-2.5 py-1 bg-white hover:bg-[#FAF7EF] active:scale-95 border border-[#E5DFD4] rounded-full shadow-2xs transition-all duration-150 cursor-pointer h-[29px] sm:h-[31px] shrink-0"
      >
        {/* Translate / Multi-language glyph 文A */}
        <span className="text-[10.5px] sm:text-[11px] text-[#20231F] font-medium leading-none select-none">文A</span>

        {/* Language Label */}
        <span
          className={`text-[11px] sm:text-[11.5px] font-semibold text-[#20231F] ${
            isTamil ? 'font-tamil' : ''
          }`}
        >
          {isTamil ? 'தமிழ்' : 'English'}
        </span>

        {/* Down Chevron */}
        <svg
          className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#20231F] stroke-[2.2] shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
    </header>
  );
};
