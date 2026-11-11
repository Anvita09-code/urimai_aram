import React, { useState } from 'react';
import { ArrowLeft, LogIn, Search } from 'lucide-react';
import { Language } from '../../types';
import { TrustFooter } from '../TrustFooter';
import { TrustModal } from '../TrustModal';

interface PublicShellProps {
  currentLang: Language;
  activeRoute: 'landing' | 'schemes' | 'scheme-detail';
  children: React.ReactNode;
  onNavigateHome: () => void;
  onNavigateSchemes: () => void;
  onNavigateBack?: () => void;
  onNavigateSignIn: () => void;
  onOpenLanguage: () => void;
}

export const PublicShell: React.FC<PublicShellProps> = ({
  currentLang,
  activeRoute,
  children,
  onNavigateHome,
  onNavigateSchemes,
  onNavigateBack,
  onNavigateSignIn,
  onOpenLanguage,
}) => {
  const [isTrustModalOpen, setIsTrustModalOpen] = useState(false);
  const isTamil = currentLang === 'ta';

  return (
    <div className="min-h-screen bg-[#FBF7EF] text-[#20231F] flex flex-col justify-between selection:bg-[#F5D66A] selection:text-[#155B4D] antialiased select-none">
      {/* Unified Public Header */}
      <header className="w-full border-b border-[#EAE3D5]/80 bg-[#FBF7EF]/95 backdrop-blur-md sticky top-0 z-30">
        <div className="w-full max-w-[460px] mx-auto px-3.5 sm:px-4 py-2 flex items-center justify-between gap-1.5">
          {/* Left: Back button (if available) + Brand Lockup */}
          <div className="flex items-center gap-1.5 shrink-0">
            {onNavigateBack && (
              <button
                type="button"
                onClick={onNavigateBack}
                aria-label={isTamil ? 'பின்செல்' : 'Go back'}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-[#155B4D] hover:bg-black/5 active:scale-90 transition-all -ml-1 cursor-pointer shrink-0"
              >
                <ArrowLeft className="w-4.5 h-4.5 sm:w-5 sm:h-5 stroke-[2.4]" />
              </button>
            )}

            <button
              type="button"
              onClick={onNavigateHome}
              className="flex items-center gap-1.5 sm:gap-2 cursor-pointer hover:opacity-90 active:scale-98 transition-all text-left"
              aria-label="Urimai Aram Home"
            >
              <img
                src="/assets/aistudio/emblem.png"
                alt="Urimai Aram Emblem"
                className="w-[24px] h-[28px] sm:w-[26px] sm:h-[30px] object-contain shrink-0"
                loading="eager"
              />
              <div className="flex flex-col justify-center">
                <span className="font-tamil text-[13px] sm:text-[14px] font-bold text-[#202820] leading-tight">
                  உரிமையறம்
                </span>
                <span className="text-[8px] sm:text-[8.5px] font-bold text-[#202820] tracking-wider uppercase leading-none mt-0.5">
                  URIMAI ARAM
                </span>
                <span aria-hidden="true" className="w-6 h-[1.5px] bg-[#E5A824] rounded-full mt-[1.5px]" />
              </div>
            </button>
          </div>

          {/* Right Controls: Schemes Link (Tablet/Desktop), Language Toggle, Sign In */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Desktop/Tablet Schemes Explore Button */}
            {activeRoute !== 'schemes' && (
              <button
                type="button"
                onClick={onNavigateSchemes}
                className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-full text-[11.5px] font-bold transition-all cursor-pointer bg-white hover:bg-[#F3EFE3] text-[#155B4D] border border-[#CBD5D0] shrink-0"
              >
                <Search className="w-3 h-3 stroke-[2.2]" />
                <span>{isTamil ? 'திட்டங்கள்' : 'Schemes'}</span>
              </button>
            )}

            {/* Language Selector */}
            <button
              onClick={onOpenLanguage}
              type="button"
              className="flex items-center gap-1 px-2 py-1 bg-white hover:bg-[#F3EFE3] active:scale-95 border border-[#E5DFD4] rounded-full shadow-2xs text-[11px] font-bold text-[#202820] cursor-pointer shrink-0"
            >
              <span className="text-[9.5px] font-medium">文A</span>
              <span className={isTamil ? 'font-tamil' : ''}>{isTamil ? 'தமிழ்' : 'Eng'}</span>
            </button>

            {/* Sign In Button */}
            <button
              onClick={onNavigateSignIn}
              type="button"
              className="flex items-center gap-1 px-2.5 py-1 bg-[#FCE8A2] hover:bg-[#F5D66A] text-[#155B4D] active:scale-95 border border-[#E5C966] rounded-full shadow-2xs text-[11.5px] font-bold transition-all cursor-pointer shrink-0"
            >
              <LogIn className="w-3 h-3 stroke-[2.4]" />
              <span>{isTamil ? 'உள்நுழைக' : 'Sign In'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Page Slot */}
      <main className="w-full flex-1 flex flex-col justify-start">
        {children}
      </main>

      {/* Trust Footer */}
      <div className="w-full border-t border-[#EAE3D5]/80 bg-[#FAF7EF]">
        <TrustFooter
          currentLang={currentLang}
          onOpenTrustModal={() => setIsTrustModalOpen(true)}
        />
      </div>

      {/* Trust & Privacy Modal */}
      <TrustModal
        isOpen={isTrustModalOpen}
        currentLang={currentLang}
        onClose={() => setIsTrustModalOpen(false)}
      />
    </div>
  );
};
