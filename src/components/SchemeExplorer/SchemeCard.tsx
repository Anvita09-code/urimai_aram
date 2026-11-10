import React from 'react';
import { Language, SchemeRecord } from '../../types';

interface SchemeCardProps {
  scheme: SchemeRecord;
  currentLang: Language;
  isSaved: boolean;
  onToggleSave: (schemeId: string, e: React.MouseEvent) => void;
  onClick: (schemeId: string) => void;
}

export const SchemeCard: React.FC<SchemeCardProps> = ({
  scheme,
  currentLang,
  isSaved,
  onToggleSave,
  onClick,
}) => {
  const isTamil = currentLang === 'ta';

  const schemeName = isTamil ? scheme.schemeNameTa : scheme.schemeName;
  const officialName = isTamil ? scheme.officialNameTa : scheme.officialName;
  const summary = isTamil ? scheme.summaryTa : scheme.summary;
  const categoryLabel = isTamil ? scheme.categoryLabelTa : scheme.categoryLabelEn;
  const authority = isTamil ? scheme.administeringAuthorityTa : scheme.administeringAuthority;

  // Category Icon & Styling
  const getCategoryStyles = (category: string) => {
    switch (category) {
      case 'health':
        return {
          iconBg: 'bg-[#E5F5EC] text-[#165446]',
          badgeBg: 'bg-[#EAF6ED] text-[#1E6B43] border-[#CDE8D6]',
        };
      case 'education':
        return {
          iconBg: 'bg-[#FEF3D8] text-[#946E18]',
          badgeBg: 'bg-[#FEF5E2] text-[#9A6E18] border-[#F5E2BE]',
        };
      case 'agriculture':
        return {
          iconBg: 'bg-[#EAF5EB] text-[#2E6B3E]',
          badgeBg: 'bg-[#EAF6ED] text-[#2D6B3C] border-[#CEE8D4]',
        };
      case 'housing':
        return {
          iconBg: 'bg-[#FFF2E8] text-[#A15822]',
          badgeBg: 'bg-[#FFF3EA] text-[#A65B24] border-[#FADCC7]',
        };
      case 'social':
      default:
        return {
          iconBg: 'bg-[#EFF4FB] text-[#2B527E]',
          badgeBg: 'bg-[#EFF5FC] text-[#2D5A8C] border-[#D4E3F5]',
        };
    }
  };

  const styles = getCategoryStyles(scheme.category);

  const renderIcon = (type: string) => {
    switch (type) {
      case 'medical-shield':
        return (
          <svg className="w-6 h-6 stroke-[2]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <path d="M12 8v8M8 12h8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      case 'graduation-cap':
        return (
          <svg className="w-6 h-6 stroke-[2]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
            <path d="M6 12v5c3 3 9 3 12 0v-5" />
          </svg>
        );
      case 'plant':
        return (
          <svg className="w-6 h-6 stroke-[2]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M12 22v-9" />
            <path d="M12 13a5 5 0 0 1 5-5c2.5 0 3 2.5 3 5 0 2.5-3 5-8 5" />
            <path d="M12 13a5 5 0 0 0-5-5c-2.5 0-3 2.5-3 5 0 2.5 3 5 8 5" />
          </svg>
        );
      case 'home':
        return (
          <svg className="w-6 h-6 stroke-[2]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        );
      case 'people':
      default:
        return (
          <svg className="w-6 h-6 stroke-[2]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        );
    }
  };

  const renderBadgeIcon = (category: string) => {
    switch (category) {
      case 'health':
        return (
          <svg className="w-3 h-3 stroke-[2.2]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
        );
      case 'education':
        return (
          <svg className="w-3 h-3 stroke-[2.2]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          </svg>
        );
      case 'agriculture':
        return (
          <svg className="w-3 h-3 stroke-[2.2]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M12 22v-7" />
            <path d="M12 15a4 4 0 0 1 4-4c2 0 2.5 2 2.5 4 0 2-2 4-6.5 4" />
          </svg>
        );
      case 'housing':
        return (
          <svg className="w-3 h-3 stroke-[2.2]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          </svg>
        );
      case 'social':
      default:
        return (
          <svg className="w-3 h-3 stroke-[2.2]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
          </svg>
        );
    }
  };

  return (
    <article
      onClick={() => onClick(scheme.schemeId)}
      className="w-full bg-white/95 hover:bg-white active:scale-[0.99] border border-[#ECE5D8] rounded-[22px] p-4 shadow-[0_2px_10px_rgba(0,0,0,0.025)] transition-all duration-150 cursor-pointer group focus-within:ring-2 focus-within:ring-[#165446]/25"
    >
      {/* 2-Column Responsive Grid: 48px icon column + 1fr content column */}
      <div className="grid grid-cols-[48px_minmax(0,1fr)] gap-3.5 items-start">
        {/* Column 1: Scheme Icon (48px square) */}
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${styles.iconBg}`}>
          {renderIcon(scheme.icon)}
        </div>

        {/* Column 2: Full Remaining Content Area */}
        <div className="min-w-0 flex flex-col justify-start">
          {/* Top Row: Scheme Title & Independent Bookmark Button */}
          <div className="flex items-start justify-between gap-2 w-full">
            <div className="min-w-0 flex-1">
              <h3
                className={`font-bold text-[#1C2220] group-hover:text-[#165446] transition-colors ${
                  isTamil
                    ? 'font-tamil text-[16px] sm:text-[17px] leading-[1.35] tracking-normal'
                    : 'text-[17px] sm:text-[18px] leading-snug'
                }`}
              >
                {schemeName}
              </h3>
              <h4
                className={`font-semibold mt-0.5 text-[#3D4440] ${
                  isTamil
                    ? 'font-tamil text-[12px] sm:text-[12.5px] leading-[1.4]'
                    : 'text-[13px] sm:text-[13.5px] leading-snug text-[#2C312E]'
                }`}
              >
                {officialName}
              </h4>
            </div>

            {/* Independent Bookmark Action (Positioned independently on the top right) */}
            <button
              type="button"
              onClick={(e) => onToggleSave(scheme.schemeId, e)}
              aria-label={isSaved ? 'Remove from saved' : 'Save scheme'}
              className="w-8 h-8 rounded-full flex items-center justify-center text-[#7A827E] hover:text-[#165446] hover:bg-black/5 active:scale-90 transition-all cursor-pointer shrink-0 -mr-1 -mt-0.5"
            >
              <svg
                className={`w-4 h-4 stroke-[2.2] ${isSaved ? 'fill-[#165446] text-[#165446]' : 'fill-none'}`}
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
              </svg>
            </button>
          </div>

          {/* Category Badge: Positioned beneath title on its own row (never squeezing the title) */}
          <div className="mt-2 flex items-center">
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${styles.badgeBg} ${
                isTamil ? 'font-tamil text-[10.5px]' : ''
              }`}
            >
              {renderBadgeIcon(scheme.category)}
              <span>{categoryLabel}</span>
            </span>
          </div>

          {/* Description: Occupies the full available content width with natural Tamil wrapping */}
          <p
            className={`text-[#555C58] mt-2 ${
              isTamil
                ? 'font-tamil text-[12px] sm:text-[12.5px] leading-[1.45]'
                : 'text-[12.5px] sm:text-[13px] leading-[1.4]'
            }`}
          >
            {summary}
          </p>
        </div>
      </div>

      {/* Bottom Row: Thin Divider + Government Authority + Right Arrow */}
      <div className="border-t border-[#ECE5D8] mt-3.5 pt-2.5 flex items-center justify-between text-[#4F5552] text-[12px] sm:text-[12.5px] font-semibold select-none">
        {/* Left: Building / Temple Pillar Icon + Authority */}
        <div className="flex items-center gap-2 text-[#2E3330] min-w-0 flex-1 pr-2">
          <svg className="w-4 h-4 text-[#20231F] stroke-[2] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <line x1="4" y1="21" x2="20" y2="21" />
            <line x1="2" y1="10" x2="22" y2="10" />
            <polygon points="12 2 2 7 22 7" />
            <line x1="6" y1="10" x2="6" y2="21" />
            <line x1="10" y1="10" x2="10" y2="21" />
            <line x1="14" y1="10" x2="14" y2="21" />
            <line x1="18" y1="10" x2="18" y2="21" />
          </svg>
          <span className={`truncate ${isTamil ? 'font-tamil text-[11.5px]' : ''}`}>
            {authority}
          </span>
        </div>

        {/* Right: Chevron */}
        <svg
          className="w-4 h-4 text-[#7E8581] group-hover:text-[#165446] group-hover:translate-x-0.5 transition-all stroke-[2.5] shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </div>
    </article>
  );
};
