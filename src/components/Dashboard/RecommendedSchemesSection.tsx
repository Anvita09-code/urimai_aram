import React from 'react';
import { ChevronRight, GraduationCap, Heart } from 'lucide-react';
import { translations } from '../../data/translations';
import { Language } from '../../types';

interface RecommendedSchemesSectionProps {
  currentLang: Language;
  onViewAll: () => void;
  onSelectScheme: (schemeId: string) => void;
}

export const RecommendedSchemesSection: React.FC<RecommendedSchemesSectionProps> = ({
  currentLang,
  onViewAll,
  onSelectScheme,
}) => {
  const t = translations[currentLang];
  const isTamil = currentLang === 'ta';

  return (
    <section className="w-full px-4 sm:px-5 pt-2 pb-6 select-none">
      {/* 1. Section Header Row: Heading on left, View All on right, perfectly aligned */}
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2 mb-3">
        <h2
          className={`text-[#155B4D] font-bold text-[15px] sm:text-[16px] leading-tight text-left ${
            isTamil ? 'font-tamil' : ''
          }`}
        >
          {t.recommendedHeading}
        </h2>

        {/* View All Action */}
        <button
          type="button"
          onClick={onViewAll}
          className={`text-[#155B4D] hover:text-[#11493e] active:scale-95 text-[12.5px] sm:text-[13px] font-semibold transition-all cursor-pointer shrink-0 whitespace-nowrap ${
            isTamil ? 'font-tamil' : ''
          }`}
        >
          {t.viewAllAction}
        </button>
      </div>

      {/* Recommended Scheme Cards List */}
      <div className="space-y-3">
        {/* CARD 1 — CMCHIS */}
        <article
          onClick={() => onSelectScheme('cmchis')}
          className="w-full bg-white hover:bg-[#FFFDF9] active:scale-[0.99] rounded-[20px] p-3 sm:p-3.5 border border-[#ECE5D8] shadow-2xs grid grid-cols-[44px_minmax(0,1fr)_auto] items-center gap-2.5 sm:gap-3 cursor-pointer transition-all group"
        >
          {/* 1. Left: Pale Green Shield Icon Container */}
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[#E5F1E7] border border-[#D5E6D8] flex items-center justify-center shrink-0">
            <svg
              className="w-5.5 h-5.5 sm:w-6 sm:h-6 text-[#155B4D]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <line x1="12" y1="8" x2="12" y2="14" />
              <line x1="9" y1="11" x2="15" y2="11" />
            </svg>
          </div>

          {/* 2. Centre: Scheme Title and Category Pill */}
          <div className="min-w-0 flex flex-col justify-center">
            <h3
              className={`text-[#155B4D] font-bold text-[13px] sm:text-[13.5px] leading-[1.28] group-hover:text-[#11493e] transition-colors ${
                isTamil ? 'font-tamil' : ''
              }`}
            >
              {isTamil ? (
                <>
                  <span className="block">முதலமைச்சரின் விரிவான</span>
                  <span className="block">மருத்துவக் காப்பீட்டுத் திட்டம்</span>
                  <span className="block">(CMCHIS)</span>
                </>
              ) : (
                <>
                  <span className="block">Chief Minister's Comprehensive</span>
                  <span className="block">Health Insurance Scheme (CMCHIS)</span>
                </>
              )}
            </h3>

            {/* Category Pill underneath title */}
            <div className="mt-1.5 inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#FFF4D2] border border-[#F5D879]/70 rounded-full w-fit shadow-2xs">
              <Heart className="w-3 h-3 text-[#155B4D] fill-none stroke-[2.4]" />
              <span className={`text-[10.5px] sm:text-[11px] font-bold text-[#155B4D] leading-none ${isTamil ? 'font-tamil' : ''}`}>
                {isTamil ? 'மருத்துவம்' : 'Health'}
              </span>
            </div>
          </div>

          {/* 3. Right: Status Badge & Chevron Icon */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 justify-end">
            <span
              className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10.5px] sm:text-[11px] font-bold bg-[#DDF1E3] text-[#155B4D] whitespace-nowrap shadow-2xs ${
                isTamil ? 'font-tamil' : ''
              }`}
            >
              {t.statusPotentiallyRelevant}
            </span>
            <ChevronRight className="w-4 h-4 text-[#155B4D] stroke-[2.4] group-hover:translate-x-0.5 transition-transform shrink-0" />
          </div>
        </article>

        {/* CARD 2 — Higher Education Scholarship */}
        <article
          onClick={() => onSelectScheme('pudhumai-penn')}
          className="w-full bg-white hover:bg-[#FFFDF9] active:scale-[0.99] rounded-[20px] p-3.5 sm:p-4 border border-[#ECE5D8] shadow-2xs grid grid-cols-[48px_minmax(0,1fr)_20px] sm:grid-cols-[52px_minmax(0,1fr)_24px] items-center gap-3 sm:gap-3.5 cursor-pointer transition-all group"
        >
          {/* 1. Left: Pale Green Graduation-Cap Icon Container */}
          <div className="w-12 h-12 rounded-2xl bg-[#E5F1E7] border border-[#D5E6D8] flex items-center justify-center shrink-0">
            <svg
              className="w-6 h-6 text-[#155B4D]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
              <path d="M6 12v5c3 3 9 3 12 0v-5" />
            </svg>
          </div>

          {/* 2. Centre: Scheme Title, Category Pill, and Eligibility Status Badge underneath */}
          <div className="min-w-0 flex flex-col justify-center">
            {/* Title */}
            <h3
              className={`text-[#155B4D] font-bold text-[17px] sm:text-[18px] leading-[1.35] group-hover:text-[#11493e] transition-colors ${
                isTamil ? 'font-tamil' : 'text-[16px] sm:text-[17px] font-semibold'
              }`}
            >
              {isTamil ? (
                <span>உயர்கல்வி உதவித்தொகை திட்டம்</span>
              ) : (
                <span>Higher Education Scholarship Scheme</span>
              )}
            </h3>

            {/* Category Pill underneath title */}
            <div className="mt-1.5 inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#FFF4D2] border border-[#F5D879]/70 rounded-full w-fit shadow-2xs">
              <GraduationCap className="w-3.5 h-3.5 text-[#155B4D] fill-none stroke-[2.4]" />
              <span className={`text-[12px] sm:text-[13px] font-semibold text-[#155B4D] leading-none ${isTamil ? 'font-tamil' : ''}`}>
                {isTamil ? 'கல்வி' : 'Education'}
              </span>
            </div>

            {/* Eligibility Badge in a separate row below category */}
            <div className="mt-1.5 flex items-center">
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[12px] sm:text-[12.5px] font-medium bg-[#FEEBB6] text-[#8A6214] whitespace-nowrap shadow-2xs ${
                  isTamil ? 'font-tamil' : ''
                }`}
              >
                {t.statusEligibilityToCheck}
              </span>
            </div>
          </div>

          {/* 3. Right: Existing Chevron */}
          <div className="flex items-center justify-end shrink-0">
            <ChevronRight className="w-5 h-5 text-[#155B4D] stroke-[2.4] group-hover:translate-x-0.5 transition-transform" />
          </div>
        </article>
      </div>
    </section>
  );
};
