import React from 'react';
import { translations } from '../../data/translations';
import { Language } from '../../types';
import { ClipboardIllustration } from './ClipboardIllustration';

interface DashboardHeroProps {
  currentLang: Language;
  citizenName?: string;
  citizenNameTa?: string;
}

export const DashboardHero: React.FC<DashboardHeroProps> = ({
  currentLang,
  citizenName = 'Murali',
  citizenNameTa = 'முரளி',
}) => {
  const t = translations[currentLang];
  const isTamil = currentLang === 'ta';

  return (
    <section className="relative w-full px-4 sm:px-5 pt-1.5 pb-1 overflow-hidden select-none">
      <div className="relative min-h-[145px] sm:min-h-[155px] flex items-center justify-between">
        {/* Left Text Content */}
        <div className="relative z-10 w-[62%] sm:w-[60%] flex flex-col justify-center pr-1.5">
          {/* Main Greeting - 2 lines in bold deep teal */}
          <h1
            className={`text-[#155B4D] font-bold tracking-tight ${
              isTamil
                ? 'font-tamil text-[26px] sm:text-[28px] leading-[1.2]'
                : 'text-[27px] sm:text-[29px] leading-[1.15]'
            }`}
          >
            <span className="block whitespace-nowrap">
              {t.dashboardGreetingLine1}
            </span>
            <span className="block whitespace-nowrap mt-0.5">
              {isTamil ? `${citizenNameTa}!` : `${citizenName}!`}
            </span>
          </h1>

          {/* Supporting Text */}
          <p
            className={`text-[#555C58] font-normal text-[12.5px] sm:text-[13px] leading-[1.42] mt-1.5 max-w-[250px] ${
              isTamil ? 'font-tamil text-[12px] sm:text-[12.5px]' : ''
            }`}
          >
            {t.dashboardSupporting}
          </p>
        </div>

        {/* Right Illustration: Checklist on Clipboard with Warm Sun Background */}
        <div className="relative z-0 w-[38%] sm:w-[40%] flex items-center justify-end pointer-events-none -mr-1">
          <ClipboardIllustration className="w-full max-w-[135px] sm:max-w-[145px]" />
        </div>
      </div>
    </section>
  );
};
