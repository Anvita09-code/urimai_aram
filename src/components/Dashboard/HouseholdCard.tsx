import React from 'react';
import { translations } from '../../data/translations';
import { Language } from '../../types';

interface HouseholdCardProps {
  currentLang: Language;
  memberCount?: number;
  onOpenHousehold: () => void;
}

export const HouseholdCard: React.FC<HouseholdCardProps> = ({
  currentLang,
  memberCount = 4,
  onOpenHousehold,
}) => {
  const t = translations[currentLang];
  const isTamil = currentLang === 'ta';

  return (
    <section className="w-full px-4 sm:px-5 py-1">
      <div className="w-full bg-white rounded-[20px] p-3 sm:p-3.5 border border-[#ECE5D8] shadow-2xs grid grid-cols-[44px_minmax(0,1fr)_auto] items-center gap-3 transition-all hover:border-[#155B4D]/30">
        {/* 1. Left: Pale Green Square Icon Container */}
        <div className="w-11 h-11 rounded-xl bg-[#E5F1E7] border border-[#D5E6D8] flex items-center justify-center shrink-0">
          {/* Household / 2-user outline icon matching reference */}
          <svg
            className="w-5.5 h-5.5 text-[#155B4D]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        </div>

        {/* 2. Centre: Heading & Member Count */}
        <div className="min-w-0 flex flex-col justify-center">
          <h2
            className={`text-[#155B4D] font-bold text-[15.5px] sm:text-[16px] leading-tight ${
              isTamil ? 'font-tamil' : ''
            }`}
          >
            {t.myHousehold}
          </h2>
          <span
            className={`text-[#626A62] text-[12.5px] sm:text-[13px] font-medium leading-tight mt-0.5 ${
              isTamil ? 'font-tamil' : ''
            }`}
          >
            {isTamil ? `${memberCount} உறுப்பினர்கள்` : `${memberCount} Members`}
          </span>
        </div>

        {/* 3. Right: Outlined Pill Button */}
        <button
          type="button"
          onClick={onOpenHousehold}
          className="shrink-0 px-3.5 py-1.5 sm:px-4 sm:py-1.5 bg-white hover:bg-[#FAF7EF] active:scale-95 border-[1.5px] border-[#155B4D] rounded-full text-[#155B4D] text-[12.5px] sm:text-[13px] font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
          aria-label={`${t.viewAction} ${t.myHousehold}`}
        >
          <span className={isTamil ? 'font-tamil text-[12.5px]' : ''}>
            {t.viewAction}
          </span>
          <svg
            className="w-3.5 h-3.5 text-[#155B4D] stroke-[2.5]"
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
    </section>
  );
};
