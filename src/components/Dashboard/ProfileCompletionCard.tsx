import React from 'react';
import { ChevronRight } from 'lucide-react';
import { translations } from '../../data/translations';
import { Language } from '../../types';

interface ProfileCompletionCardProps {
  currentLang: Language;
  completionPercentage?: number;
  onOpenProfile: () => void;
}

export const ProfileCompletionCard: React.FC<ProfileCompletionCardProps> = ({
  currentLang,
  completionPercentage = 75,
  onOpenProfile,
}) => {
  const t = translations[currentLang];
  const isTamil = currentLang === 'ta';

  // SVG Circular Ring Math
  const radius = 26;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (completionPercentage / 100) * circumference;

  const headingText = isTamil
    ? t.profileCompleteHeading.replace('{percent}', completionPercentage.toString())
    : t.profileCompleteHeading.replace('{percent}', completionPercentage.toString());

  return (
    <section className="w-full px-4 sm:px-5 py-1">
      <button
        type="button"
        onClick={onOpenProfile}
        className="w-full bg-[#FFF5DC] rounded-[20px] p-2.5 sm:p-3 border border-[#F4E2B5] shadow-2xs grid grid-cols-[54px_1px_minmax(0,1fr)_auto] items-center gap-2.5 sm:gap-3 text-left transition-all hover:border-[#E8D29F] active:scale-[0.99] cursor-pointer group"
      >
        {/* 1. Left: White Circular Progress Ring Disc */}
        <div className="w-[52px] h-[52px] rounded-full bg-white border border-[#F1E0B4] shrink-0 flex items-center justify-center shadow-2xs">
          <div className="relative w-[42px] h-[42px] flex items-center justify-center">
            <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 64 64">
              {/* Background Track */}
              <circle
                cx="32"
                cy="32"
                r={radius}
                stroke="#FCEABF"
                strokeWidth="5.5"
                fill="none"
              />
              {/* Active Progress Arc */}
              <circle
                cx="32"
                cy="32"
                r={radius}
                stroke="#EAA924"
                strokeWidth="5.5"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="none"
                className="transition-all duration-500 ease-out"
              />
            </svg>
            {/* Center Percentage Text */}
            <span className="absolute inset-0 flex items-center justify-center font-bold text-[13px] text-[#155B4D] tabular-nums">
              {completionPercentage}%
            </span>
          </div>
        </div>

        {/* 2. Thin Vertical Muted Divider */}
        <div className="w-[1px] h-9 bg-[#EADCB8] shrink-0" />

        {/* 3. Text Content */}
        <div className="min-w-0 flex flex-col justify-center pr-1">
          <h3
            className={`text-[#155B4D] font-bold text-[13.5px] sm:text-[14px] leading-[1.25] ${
              isTamil ? 'font-tamil' : ''
            }`}
          >
            {headingText}
          </h3>
          <p
            className={`text-[#555C58] text-[11px] sm:text-[11.5px] leading-[1.35] mt-0.5 ${
              isTamil ? 'font-tamil' : ''
            }`}
          >
            {t.profileCompleteDesc}
          </p>
        </div>

        {/* 4. Right Chevron */}
        <ChevronRight className="w-4 h-4 text-[#155B4D] stroke-[2.5] shrink-0 group-hover:translate-x-0.5 transition-transform" />
      </button>
    </section>
  );
};
