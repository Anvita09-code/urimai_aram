import React from 'react';
import { translations } from '../data/translations';
import { Language } from '../types';

interface HeroSectionProps {
  currentLang: Language;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ currentLang }) => {
  const t = translations[currentLang];

  return (
    <section className="relative w-full pl-5 pr-0 pt-3 sm:pt-3.5 pb-0 overflow-hidden">
      <div className="relative min-h-[188px] sm:min-h-[198px] flex items-end">
        {/* Left Content: 3-line Headline and Supporting text with proper, uniform spacing */}
        <div className="relative z-10 w-[58%] sm:w-[56%] max-w-[250px] flex flex-col justify-start pb-1.5 sm:pb-2">
          {/* Main Headline - 3 lines in English: Your Rights, / Made / Accessible */}
          <h1
            className={`text-[#134E43] font-[800] ${
              currentLang === 'ta'
                ? 'font-tamil text-[22px] sm:text-[24px] leading-[1.22] tracking-normal'
                : 'text-[27px] sm:text-[30px] tracking-[-0.025em] leading-[1.08]'
            }`}
          >
            {currentLang === 'en' ? (
              <>
                <span className="block whitespace-nowrap">Your Rights,</span>
                <span className="block whitespace-nowrap mt-0.5">Made</span>
                <span className="relative inline-block mt-0.5 whitespace-nowrap">
                  <span>Accessible</span>
                  {/* Subtle turmeric brush highlight under Accessible */}
                  <span
                    aria-hidden="true"
                    className="absolute left-[-2px] -bottom-0.5 w-[104%] h-[5px] bg-[#F5D66A] rounded-full -z-10 transform -rotate-[0.8deg] opacity-90"
                  />
                </span>
              </>
            ) : (
              <>
                <span className="block whitespace-nowrap">{t.heroHeadlineLine1}</span>
                <span className="relative inline-block mt-1 whitespace-nowrap">
                  <span>{t.heroHeadlineLine2}</span>
                  <span
                    aria-hidden="true"
                    className="absolute left-0 -bottom-0.5 w-full h-[5px] bg-[#F5D66A] rounded-full -z-10 transform -rotate-[0.8deg] opacity-90"
                  />
                </span>
              </>
            )}
          </h1>

          {/* Supporting Text - Professional, comfortable spacing below the 3-line headline */}
          {currentLang === 'en' ? (
            <p className="text-[#555C58] font-normal text-[12.5px] sm:text-[13px] leading-[1.42] sm:leading-[1.46] tracking-tight mt-2.5 sm:mt-3">
              <span className="block">Discover, check and prepare for</span>
              <span className="block">government welfare schemes</span>
              <span className="block">that may fit your household.</span>
            </p>
          ) : (
            <p className="font-tamil text-[#555C58] font-normal text-[12px] sm:text-[12.5px] leading-[1.5] sm:leading-[1.55] tracking-normal mt-2.5 sm:mt-3">
              <span className="block">உங்கள் குடும்பத்திற்கு ஏற்ற</span>
              <span className="block">அரசு நலத்திட்டங்களை அறிந்து,</span>
              <span className="block">தகுதியைச் சரிபார்க்கவும்.</span>
            </p>
          )}
        </div>

        {/* Right Content: Temple Sun & Family Illustration sitting cleanly above button */}
        <div className="absolute right-0 bottom-0 w-[54%] sm:w-[50%] flex items-end justify-end pointer-events-none select-none z-0">
          <img
            src="/assets/aistudio/hero_clean.png"
            alt="Tamil family observing temple"
            className="w-full h-auto object-contain object-bottom object-right block"
            loading="eager"
          />
        </div>
      </div>
    </section>
  );
};
