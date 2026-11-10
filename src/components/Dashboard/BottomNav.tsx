import React from 'react';
import { ClipboardCheck, Home, LayoutGrid, User } from 'lucide-react';
import { translations } from '../../data/translations';
import { Language } from '../../types';

interface BottomNavProps {
  currentLang: Language;
  activeItem?: 'home' | 'schemes' | 'results' | 'account';
  onNavigateHome: () => void;
  onNavigateSchemes: () => void;
  onNavigateResults: () => void;
  onNavigateAccount: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentLang,
  activeItem = 'home',
  onNavigateHome,
  onNavigateSchemes,
  onNavigateResults,
  onNavigateAccount,
}) => {
  const t = translations[currentLang];
  const isTamil = currentLang === 'ta';

  return (
    <nav
      className="sticky bottom-0 left-0 right-0 w-full bg-[#FAF7EF]/95 backdrop-blur-md pt-1.5 pb-[max(env(safe-area-inset-bottom),10px)] z-40 select-none border-t border-[#EDE6D8]/60"
      role="navigation"
      aria-label="Citizen Dashboard Navigation"
    >
      <div className="grid grid-cols-4 items-center max-w-[400px] mx-auto px-2">
        {/* 1. Home (முகப்பு) - Selected with Warm Yellow Pill */}
        <div className="flex items-center justify-center">
          <button
            type="button"
            onClick={onNavigateHome}
            className={`w-[78px] py-1.5 rounded-[20px] flex flex-col items-center justify-center transition-all cursor-pointer ${
              activeItem === 'home'
                ? 'bg-[#FCE8A2] text-[#155B4D] shadow-2xs'
                : 'text-[#202820] hover:text-[#155B4D]'
            }`}
            aria-current={activeItem === 'home' ? 'page' : undefined}
          >
            <Home className={`w-5 h-5 mb-0.5 ${activeItem === 'home' ? 'fill-[#155B4D] text-[#155B4D]' : 'text-[#202820]'}`} />
            <span
              className={`font-bold leading-tight ${
                isTamil ? 'font-tamil text-[10.5px]' : 'text-[10.5px]'
              }`}
            >
              {t.navHome}
            </span>
          </button>
        </div>

        {/* 2. Schemes (திட்டங்கள்) */}
        <div className="flex items-center justify-center">
          <button
            type="button"
            onClick={onNavigateSchemes}
            className={`w-[78px] py-1.5 rounded-[20px] flex flex-col items-center justify-center transition-all cursor-pointer ${
              activeItem === 'schemes'
                ? 'bg-[#FCE8A2] text-[#155B4D] shadow-2xs'
                : 'text-[#202820] hover:text-[#155B4D]'
            }`}
            aria-current={activeItem === 'schemes' ? 'page' : undefined}
          >
            <LayoutGrid className="w-5 h-5 mb-0.5 stroke-[2]" />
            <span
              className={`font-bold leading-tight ${
                isTamil ? 'font-tamil text-[10.5px]' : 'text-[10.5px]'
              }`}
            >
              {t.navSchemes}
            </span>
          </button>
        </div>

        {/* 3. My Results (என் முடிவுகள்) */}
        <div className="flex items-center justify-center">
          <button
            type="button"
            onClick={onNavigateResults}
            className={`w-[78px] py-1.5 rounded-[20px] flex flex-col items-center justify-center transition-all cursor-pointer ${
              activeItem === 'results'
                ? 'bg-[#FCE8A2] text-[#155B4D] shadow-2xs'
                : 'text-[#202820] hover:text-[#155B4D]'
            }`}
            aria-current={activeItem === 'results' ? 'page' : undefined}
          >
            <ClipboardCheck className="w-5 h-5 mb-0.5 stroke-[2]" />
            <span
              className={`font-bold leading-tight ${
                isTamil ? 'font-tamil text-[10.5px]' : 'text-[10.5px]'
              }`}
            >
              {t.navMyResults}
            </span>
          </button>
        </div>

        {/* 4. Account (கணக்கு) */}
        <div className="flex items-center justify-center">
          <button
            type="button"
            onClick={onNavigateAccount}
            className={`w-[78px] py-1.5 rounded-[20px] flex flex-col items-center justify-center transition-all cursor-pointer ${
              activeItem === 'account'
                ? 'bg-[#FCE8A2] text-[#155B4D] shadow-2xs'
                : 'text-[#202820] hover:text-[#155B4D]'
            }`}
            aria-current={activeItem === 'account' ? 'page' : undefined}
          >
            <User className="w-5 h-5 mb-0.5 stroke-[2]" />
            <span
              className={`font-bold leading-tight ${
                isTamil ? 'font-tamil text-[10.5px]' : 'text-[10.5px]'
              }`}
            >
              {t.navAccount}
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
};
