import React from 'react';
import { translations } from '../../data/translations';
import { Language } from '../../types';

interface ExplorerHeroProps {
  currentLang: Language;
}

export const ExplorerHero: React.FC<ExplorerHeroProps> = ({ currentLang }) => {
  const t = translations[currentLang];
  const isTamil = currentLang === 'ta';

  return (
    <div className="relative w-full pl-5 pr-0 pt-3.5 pb-0">
      <div className="relative flex items-end justify-between overflow-hidden">
        {/* Left Side: Heading and Subtitle */}
        <div className="relative z-10 flex-1 min-w-0 pr-2 pb-0.5 flex flex-col justify-end">
          <h1
            className="text-[#134E43]"
            style={{
              fontFamily: isTamil
                ? "'Noto Sans Tamil', 'Noto Sans', system-ui, -apple-system, sans-serif"
                : "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
              fontSize: isTamil ? '23px' : '25px',
              fontWeight: 700,
              lineHeight: isTamil ? 1.22 : 1.2,
              letterSpacing: isTamil ? 'normal' : '-0.4px',
              color: '#134E43',
              textAlign: 'left',
              wordBreak: 'keep-all',
              overflowWrap: 'normal',
              margin: 0,
              padding: 0,
            }}
          >
            {isTamil ? (
              <span>
                <span className="block">திட்டங்கள்</span>
                <span className="block mt-0.5">கண்டறிதல்</span>
              </span>
            ) : (
              t.explorerTitle
            )}
          </h1>

          <p
            className="text-[#555C58]"
            style={{
              fontFamily: isTamil
                ? "'Noto Sans Tamil', 'Noto Sans', system-ui, -apple-system, sans-serif"
                : "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
              fontSize: '13px',
              fontWeight: 400,
              lineHeight: 1.45,
              letterSpacing: 'normal',
              color: '#555C58',
              textAlign: 'left',
              wordBreak: 'keep-all',
              overflowWrap: 'normal',
              marginTop: '6px',
              marginBottom: 0,
              maxWidth: '205px',
            }}
          >
            {t.explorerSub}
          </p>
        </div>

        {/* Right Side: Temple Illustration Flush to Right Edge and Bottom Content Line */}
        <div className="relative z-0 shrink-0 w-[155px] sm:w-[175px] flex items-end justify-end select-none pointer-events-none">
          <img
            src="/assets/aistudio/original_temple_restored.png"
            alt="Tamil Nadu temple gopuram"
            className="w-full h-auto max-h-[140px] sm:max-h-[155px] object-contain object-right object-bottom block"
            loading="eager"
          />
        </div>
      </div>
    </div>
  );
};

