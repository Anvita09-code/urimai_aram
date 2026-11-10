import React from 'react';

interface FeatureCardProps {
  title: string;
  desc: string;
  iconType: 'search' | 'checklist' | 'document' | 'shield';
  isTamil?: boolean;
  onClick: () => void;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  desc,
  iconType,
  isTamil,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full text-left bg-white/95 hover:bg-white active:scale-[0.98] border border-[#ECE5D8] rounded-[18px] sm:rounded-[20px] p-3 sm:p-3.5 shadow-[0_2px_8px_rgba(0,0,0,0.025)] flex flex-col justify-start transition-all duration-150 cursor-pointer h-full min-h-[126px] sm:min-h-[134px] group focus:outline-none focus:ring-2 focus:ring-[#165446]/30 overflow-hidden"
    >
      {/* Pale Yellow Icon Container */}
      <div className="w-[36px] h-[36px] sm:w-[38px] sm:h-[38px] rounded-xl bg-[#FFF3CF] flex items-center justify-center mb-2 sm:mb-2.5 text-[#946E18] shrink-0 group-hover:bg-[#FEEBB4] transition-colors">
        {iconType === 'search' && (
          <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.2]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="11" cy="11" r="7" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" strokeLinecap="round" />
          </svg>
        )}

        {iconType === 'checklist' && (
          <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
            <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
            <path d="m9 12 2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="9" y1="17" x2="15" y2="17" strokeLinecap="round" />
          </svg>
        )}

        {iconType === 'document' && (
          <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="8" y1="13" x2="16" y2="13" strokeLinecap="round" />
            <line x1="8" y1="17" x2="12" y2="17" strokeLinecap="round" />
          </svg>
        )}

        {iconType === 'shield' && (
          <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <path d="m9 12 2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>

      {/* Title */}
      <h3
        className={`text-[#1C2220] font-bold mb-1 ${
          isTamil
            ? 'font-tamil text-[13px] sm:text-[14px] leading-snug tracking-normal'
            : 'text-[14.5px] sm:text-[15px] leading-snug tracking-tight'
        }`}
      >
        {title}
      </h3>

      {/* Description */}
      <p
        className={`text-[#5A605D] font-normal whitespace-pre-line ${
          isTamil
            ? 'font-tamil text-[11px] sm:text-[11.5px] leading-[1.32] tracking-normal'
            : 'text-[12px] sm:text-[12.5px] leading-[1.3] tracking-tight'
        }`}
      >
        {desc}
      </p>
    </button>
  );
};
