import React from 'react';
import { translations } from '../data/translations';
import { Language } from '../types';

interface PrimaryCTAProps {
  currentLang: Language;
  onGetStarted: () => void;
}

export const PrimaryCTA: React.FC<PrimaryCTAProps> = ({ currentLang, onGetStarted }) => {
  const t = translations[currentLang];

  return (
    <div className="w-full px-5 pt-2.5 sm:pt-3 pb-3 sm:pb-3.5 relative z-10">
      <button
        onClick={onGetStarted}
        type="button"
        className="relative w-full h-[50px] sm:h-[52px] bg-[#165446] hover:bg-[#12473b] active:scale-[0.985] text-white font-bold text-[16px] sm:text-[17px] rounded-2xl flex items-center justify-center gap-2 shadow-[0_4px_14px_rgba(22,84,70,0.2)] transition-all duration-150 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#165446] focus:ring-offset-2 px-4"
      >
        {/* Invisible spacer matching the arrow's width and gap to guarantee true optical centering of the text */}
        <span className="w-4.5 h-4.5 invisible shrink-0" aria-hidden="true" />

        <span className={`text-center ${currentLang === 'ta' ? 'font-tamil text-[15.5px]' : ''}`}>
          {t.ctaButton}
        </span>

        {/* Right Arrow */}
        <svg
          className="w-4.5 h-4.5 text-white stroke-[2.5] shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </button>
    </div>
  );
};
