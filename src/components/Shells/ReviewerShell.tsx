import React, { useState } from 'react';
import { CheckSquare, FileCheck2, History, LogOut, Radio, User, X } from 'lucide-react';
import { DEMO_USERS } from '../../services/authService';
import { Language } from '../../types';

interface ReviewerShellProps {
  currentLang: Language;
  activeNav: 'queue' | 'live' | 'audit' | 'account';
  children: React.ReactNode;
  onNavigateQueue: () => void;
  onNavigateLive: () => void;
  onNavigateAudit: () => void;
  onLogout: () => void;
  onOpenLanguage: () => void;
}

export const ReviewerShell: React.FC<ReviewerShellProps> = ({
  currentLang,
  activeNav,
  children,
  onNavigateQueue,
  onNavigateLive,
  onNavigateAudit,
  onLogout,
  onOpenLanguage,
}) => {
  const isTamil = currentLang === 'ta';
  const reviewer = DEMO_USERS.reviewer;
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#202820] flex flex-col justify-between selection:bg-[#F5D66A] selection:text-[#155B4D] antialiased select-none">
      {/* Reviewer Header */}
      <header className="w-full px-4 sm:px-6 pt-3 pb-2.5 flex items-center justify-between border-b border-[#D8DFD9] bg-white sticky top-0 z-30 shadow-2xs">
        <div className="flex items-center gap-3">
          <img
            src="/assets/aistudio/emblem.png"
            alt="Emblem"
            className="w-[26px] h-[30px] object-contain shrink-0"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-[14.5px] text-[#1E3A8A] leading-tight">
                {isTamil ? 'உரிமையறம் • சுயாதீன மதிப்பாய்வு' : 'URIMAI ARAM • Independent Review'}
              </span>
              <span className="text-[10px] bg-[#EEF2FF] text-[#1E3A8A] font-bold px-2 py-0.5 rounded-full border border-[#C7D2FE]">
                Reviewer
              </span>
            </div>
            <p className="text-[11px] text-[#55645E]">
              {isTamil ? reviewer.departmentTa : reviewer.department}
            </p>
          </div>
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-2">
          {/* Language Selector */}
          <button
            onClick={onOpenLanguage}
            type="button"
            className="flex items-center gap-1 px-2.5 py-1.5 bg-[#FAF7EF] hover:bg-[#F3EFE3] active:scale-95 border border-[#D5DFD8] rounded-full text-[11.5px] font-bold text-[#202820] cursor-pointer"
          >
            <span className="text-[10px] font-medium">文A</span>
            <span className={isTamil ? 'font-tamil' : ''}>{isTamil ? 'தமிழ்' : 'Eng'}</span>
          </button>

          {/* Reviewer Identity Pill */}
          <button
            onClick={() => setIsAccountModalOpen(true)}
            type="button"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#EEF2FF] hover:bg-[#E0E7FF] text-[#1E3A8A] border border-[#C7D2FE] rounded-full text-[12px] font-bold cursor-pointer"
          >
            <FileCheck2 className="w-3.5 h-3.5 stroke-[2.2]" />
            <span className="hidden sm:inline">{isTamil ? reviewer.nameTa : reviewer.name}</span>
          </button>
        </div>
      </header>

      {/* Main Reviewer Content */}
      <main className="w-full flex-1 flex flex-col justify-start">
        {children}
      </main>

      {/* Reviewer Bottom Navigation */}
      <nav
        className="sticky bottom-0 left-0 right-0 w-full bg-white/95 backdrop-blur-md pt-2 pb-[max(env(safe-area-inset-bottom),10px)] z-30 select-none border-t border-[#D8DFD9]"
        role="navigation"
        aria-label="Reviewer Navigation"
      >
        <div className="grid grid-cols-4 items-center max-w-[420px] mx-auto px-2">
          {/* 1. Queue */}
          <button
            type="button"
            onClick={onNavigateQueue}
            className={`py-1.5 rounded-[16px] flex flex-col items-center justify-center transition-all cursor-pointer ${
              activeNav === 'queue'
                ? 'bg-[#1E3A8A] text-white shadow-xs'
                : 'text-[#202820] hover:text-[#1E3A8A]'
            }`}
          >
            <CheckSquare className="w-4.5 h-4.5 mb-0.5 stroke-[2]" />
            <span className={`font-bold text-[11px] leading-tight ${isTamil ? 'font-tamil' : ''}`}>
              {isTamil ? 'மதிப்பாய்வு வரிசை' : 'Queue'}
            </span>
          </button>

          {/* 2. Live Schemes */}
          <button
            type="button"
            onClick={onNavigateLive}
            className={`py-1.5 rounded-[16px] flex flex-col items-center justify-center transition-all cursor-pointer ${
              activeNav === 'live'
                ? 'bg-[#1E3A8A] text-white shadow-xs'
                : 'text-[#202820] hover:text-[#1E3A8A]'
            }`}
          >
            <Radio className="w-4.5 h-4.5 mb-0.5 stroke-[2]" />
            <span className={`font-bold text-[11px] leading-tight ${isTamil ? 'font-tamil' : ''}`}>
              {isTamil ? 'நேரலை திட்டங்கள்' : 'Live Schemes'}
            </span>
          </button>

          {/* 3. Audit History */}
          <button
            type="button"
            onClick={onNavigateAudit}
            className={`py-1.5 rounded-[16px] flex flex-col items-center justify-center transition-all cursor-pointer ${
              activeNav === 'audit'
                ? 'bg-[#1E3A8A] text-white shadow-xs'
                : 'text-[#202820] hover:text-[#1E3A8A]'
            }`}
          >
            <History className="w-4.5 h-4.5 mb-0.5 stroke-[2]" />
            <span className={`font-bold text-[11px] leading-tight ${isTamil ? 'font-tamil' : ''}`}>
              {isTamil ? 'வரலாறு' : 'Audit History'}
            </span>
          </button>

          {/* 4. Account */}
          <button
            type="button"
            onClick={() => setIsAccountModalOpen(true)}
            className={`py-1.5 rounded-[16px] flex flex-col items-center justify-center transition-all cursor-pointer ${
              activeNav === 'account'
                ? 'bg-[#1E3A8A] text-white shadow-xs'
                : 'text-[#202820] hover:text-[#1E3A8A]'
            }`}
          >
            <User className="w-4.5 h-4.5 mb-0.5 stroke-[2]" />
            <span className={`font-bold text-[11px] leading-tight ${isTamil ? 'font-tamil' : ''}`}>
              {isTamil ? 'சுயவிவரம்' : 'Account'}
            </span>
          </button>
        </div>
      </nav>

      {/* Reviewer Profile Modal */}
      {isAccountModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-[380px] bg-white rounded-[22px] border border-[#CBD5D0] p-5 shadow-xl text-left animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8EDE8] mb-3">
              <div className="flex items-center gap-2">
                <FileCheck2 className="w-5 h-5 text-[#1E3A8A]" />
                <h3 className="font-bold text-[16px] text-[#1E3A8A]">
                  {isTamil ? 'மதிப்பீட்டாளர் விவரங்கள்' : 'Independent Reviewer Profile'}
                </h3>
              </div>
              <button
                onClick={() => setIsAccountModalOpen(false)}
                className="p-1 text-[#69756F] hover:text-black rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 mb-5 text-[12.5px]">
              <div>
                <span className="text-[#69756F] block text-[11px] font-semibold">
                  {isTamil ? 'மதிப்பீட்டாளர் பெயர்' : 'Reviewer Name'}
                </span>
                <p className="font-bold text-[#202820]">
                  {isTamil ? reviewer.nameTa : reviewer.name} — {isTamil ? reviewer.designationTa : reviewer.designation}
                </p>
              </div>
              <div>
                <span className="text-[#69756F] block text-[11px] font-semibold">
                  {isTamil ? 'ஆலோசனைக் குழு' : 'Advisory Board'}
                </span>
                <p className="font-medium text-[#202820]">
                  {isTamil ? reviewer.departmentTa : reviewer.department}
                </p>
              </div>
              <div>
                <span className="text-[#69756F] block text-[11px] font-semibold">
                  {isTamil ? 'மின்னஞ்சல்' : 'Official Email'}
                </span>
                <p className="font-medium text-[#202820]">{reviewer.email}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setIsAccountModalOpen(false);
                onLogout();
              }}
              className="w-full py-2.5 bg-red-50 hover:bg-red-100 text-red-700 font-bold rounded-[12px] flex items-center justify-center gap-2 cursor-pointer transition-all border border-red-200 text-[13px]"
            >
              <LogOut className="w-4 h-4" />
              <span>{isTamil ? 'வெளியேறு (Sign Out)' : 'Sign Out of Reviewer Session'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

