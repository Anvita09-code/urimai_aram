import React from 'react';
import { translations } from '../data/translations';
import { Language } from '../types';

interface TrustFooterProps {
  currentLang: Language;
  onOpenTrustModal: () => void;
}

export const TrustFooter: React.FC<TrustFooterProps> = ({ currentLang, onOpenTrustModal }) => {
  const t = translations[currentLang];
  const isTamil = currentLang === 'ta';

  return (
    <footer className="w-full px-5 pt-1 pb-3">
      <button
        type="button"
        onClick={onOpenTrustModal}
        className="w-full bg-[#FAF7F0]/95 hover:bg-[#FFFDF7] active:scale-[0.99] border border-[#E8E1D2] rounded-[20px] py-3 px-3.5 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex items-center justify-between text-left transition-all duration-150 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#165446]/20"
      >
        {/* Left Information Group */}
        <div className="flex items-center gap-2 flex-1 pr-1.5 min-w-0">
          {/* Info Icon in gold/amber */}
          <div className="w-[26px] h-[26px] rounded-full flex items-center justify-center text-[#98741D] shrink-0">
            <svg className="w-5 h-5 stroke-[1.8]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" strokeWidth="2.5" />
            </svg>
          </div>
          <span
            className={`text-[#1F2320] font-semibold leading-[1.28] whitespace-pre-line ${
              isTamil
                ? 'font-tamil text-[11px] sm:text-[11.5px] tracking-normal'
                : 'text-[12px] sm:text-[12.5px] tracking-tight'
            }`}
          >
            {t.trustLeft}
          </span>
        </div>

        {/* Thin Vertical Divider */}
        <div className="w-[1px] h-6 bg-[#E2DAC8] mx-1 shrink-0" />

        {/* Right Shield Group */}
        <div className="flex items-center gap-2 flex-1 pl-1.5 min-w-0">
          {/* Shield/Check Icon in gold/amber */}
          <div className="w-[26px] h-[26px] rounded-full flex items-center justify-center text-[#98741D] shrink-0">
            <svg className="w-5 h-5 stroke-[1.8]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="m9 12 2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span
            className={`text-[#1F2320] font-semibold leading-[1.28] whitespace-pre-line ${
              isTamil
                ? 'font-tamil text-[11px] sm:text-[11.5px] tracking-normal'
                : 'text-[12px] sm:text-[12.5px] tracking-tight'
            }`}
          >
            {t.trustRight}
          </span>
        </div>
      </button>
    </footer>
  );
};
