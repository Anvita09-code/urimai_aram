import React from 'react';
import { translations } from '../../data/translations';
import { Language } from '../../types';

interface ResultsSummaryProps {
  currentLang: Language;
  count: number;
  savedCount: number;
  showSavedOnly: boolean;
  onToggleSavedOnly: () => void;
}

export const ResultsSummary: React.FC<ResultsSummaryProps> = ({
  currentLang,
  count,
  savedCount,
  showSavedOnly,
  onToggleSavedOnly,
}) => {
  const t = translations[currentLang];
  const isTamil = currentLang === 'ta';

  return (
    <div className="w-full px-5 pt-2 pb-1.5 flex items-center justify-between select-none">
      {/* Left: Scheme Count */}
      <div className="flex items-center gap-1.5">
        <span className="text-[#1C2220] font-bold text-[14px] sm:text-[14.5px]">
          {count}
        </span>
        <span
          className={`text-[#20231F] font-semibold text-[13.5px] sm:text-[14px] ${
            isTamil ? 'font-tamil text-[12.5px]' : ''
          }`}
        >
          {t.schemesFound}
        </span>
      </div>

      {/* Right: Saved Schemes Counter / Toggle */}
      <button
        type="button"
        onClick={onToggleSavedOnly}
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[13px] sm:text-[13.5px] font-bold transition-all cursor-pointer ${
          showSavedOnly
            ? 'bg-[#165446] text-white shadow-xs'
            : 'text-[#165446] hover:bg-[#165446]/10 active:scale-95'
        }`}
      >
        {/* Bookmark Icon */}
        <svg
          className={`w-4 h-4 stroke-[2.2] ${showSavedOnly ? 'fill-white' : 'fill-none'}`}
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
        </svg>

        <span className={isTamil ? 'font-tamil text-[12.5px]' : ''}>
          {t.saved} ({savedCount})
        </span>
      </button>
    </div>
  );
};
