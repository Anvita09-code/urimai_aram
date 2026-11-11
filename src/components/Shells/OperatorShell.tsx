import React, { useState } from 'react';
import { Briefcase, FileText, Home, LogOut, Search, User, X } from 'lucide-react';
import { DEMO_USERS } from '../../services/authService';
import { Language } from '../../types';

interface OperatorShellProps {
  currentLang: Language;
  activeNav: 'sessions' | 'schemes' | 'account';
  children: React.ReactNode;
  onNavigateSessions: () => void;
  onNavigateSchemes: () => void;
  onLogout: () => void;
  onOpenLanguage: () => void;
}

export const OperatorShell: React.FC<OperatorShellProps> = ({
  currentLang,
  activeNav,
  children,
  onNavigateSessions,
  onNavigateSchemes,
  onLogout,
  onOpenLanguage,
}) => {
  const isTamil = currentLang === 'ta';
  const op = DEMO_USERS.operator;
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F6F8F6] text-[#202820] flex flex-col justify-between selection:bg-[#F5D66A] selection:text-[#155B4D] antialiased select-none">
      {/* Operator Header */}
      <header className="w-full px-4 sm:px-6 pt-3 pb-2.5 flex items-center justify-between border-b border-[#D5E2D8] bg-white sticky top-0 z-30 shadow-2xs">
        <div className="flex items-center gap-3">
          <img
            src="/assets/aistudio/emblem.png"
            alt="Emblem"
            className="w-[26px] h-[30px] object-contain shrink-0"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-[14.5px] text-[#145B49] leading-tight">
                {isTamil ? 'உரிமையறம் • உதவி மையம்' : 'URIMAI ARAM • Operator'}
              </span>
              <span className="text-[10px] bg-[#E8F3EB] text-[#145B49] font-bold px-2 py-0.5 rounded-full border border-[#CDE1D0]">
                e-Sevai #14
              </span>
            </div>
            <p className="text-[11px] text-[#55645E]">
              {isTamil ? op.centerNameTa : op.centerName}
            </p>
          </div>
        </div>

        {/* Top Right Controls */}
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

          {/* Account Profile Pill */}
          <button
            onClick={() => setIsAccountModalOpen(true)}
            type="button"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#E8F3EB] hover:bg-[#DDF0E1] text-[#145B49] border border-[#CFE4D4] rounded-full text-[12px] font-bold cursor-pointer"
          >
            <User className="w-3.5 h-3.5 stroke-[2.2]" />
            <span className="hidden sm:inline">{isTamil ? op.nameTa : op.name}</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full flex-1 flex flex-col justify-start">
        {children}
      </main>

      {/* Operator Navigation Bar */}
      <nav
        className="sticky bottom-0 left-0 right-0 w-full bg-white/95 backdrop-blur-md pt-2 pb-[max(env(safe-area-inset-bottom),10px)] z-30 select-none border-t border-[#D5E2D8]"
        role="navigation"
        aria-label="Operator Navigation"
      >
        <div className="grid grid-cols-3 items-center max-w-[380px] mx-auto px-2">
          {/* 1. Sessions */}
          <button
            type="button"
            onClick={onNavigateSessions}
            className={`py-1.5 rounded-[16px] flex flex-col items-center justify-center transition-all cursor-pointer ${
              activeNav === 'sessions'
                ? 'bg-[#145B49] text-white shadow-xs'
                : 'text-[#202820] hover:text-[#145B49]'
            }`}
          >
            <Briefcase className="w-4.5 h-4.5 mb-0.5 stroke-[2]" />
            <span className={`font-bold text-[11px] leading-tight ${isTamil ? 'font-tamil' : ''}`}>
              {isTamil ? 'அமர்வுகள்' : 'Sessions'}
            </span>
          </button>

          {/* 2. Schemes */}
          <button
            type="button"
            onClick={onNavigateSchemes}
            className={`py-1.5 rounded-[16px] flex flex-col items-center justify-center transition-all cursor-pointer ${
              activeNav === 'schemes'
                ? 'bg-[#145B49] text-white shadow-xs'
                : 'text-[#202820] hover:text-[#145B49]'
            }`}
          >
            <Search className="w-4.5 h-4.5 mb-0.5 stroke-[2]" />
            <span className={`font-bold text-[11px] leading-tight ${isTamil ? 'font-tamil' : ''}`}>
              {isTamil ? 'திட்டங்கள்' : 'Schemes'}
            </span>
          </button>

          {/* 3. Account */}
          <button
            type="button"
            onClick={() => setIsAccountModalOpen(true)}
            className={`py-1.5 rounded-[16px] flex flex-col items-center justify-center transition-all cursor-pointer ${
              activeNav === 'account'
                ? 'bg-[#145B49] text-white shadow-xs'
                : 'text-[#202820] hover:text-[#145B49]'
            }`}
          >
            <User className="w-4.5 h-4.5 mb-0.5 stroke-[2]" />
            <span className={`font-bold text-[11px] leading-tight ${isTamil ? 'font-tamil' : ''}`}>
              {isTamil ? 'சுயவிவரம்' : 'Account'}
            </span>
          </button>
        </div>
      </nav>

      {/* Operator Account Sheet Modal */}
      {isAccountModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-[380px] bg-white rounded-[22px] border border-[#CBD5D0] p-5 shadow-xl text-left animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8EDE8] mb-3">
              <div className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-[#145B49]" />
                <h3 className="font-bold text-[16px] text-[#145B49]">
                  {isTamil ? 'ஆபரேட்டர் சுயவிவரம்' : 'Operator Profile'}
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
                  {isTamil ? 'ஆபரேட்டர் பெயர்' : 'Operator Name'}
                </span>
                <p className="font-bold text-[#202820]">{isTamil ? op.nameTa : op.name}</p>
              </div>
              <div>
                <span className="text-[#69756F] block text-[11px] font-semibold">
                  {isTamil ? 'மையம் & இடம்' : 'Centre & Location'}
                </span>
                <p className="font-medium text-[#202820]">{isTamil ? op.centerNameTa : op.centerName}</p>
              </div>
              <div>
                <span className="text-[#69756F] block text-[11px] font-semibold">
                  {isTamil ? 'தொலைபேசி' : 'Contact Phone'}
                </span>
                <p className="font-medium text-[#202820]">{op.phone}</p>
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
              <span>{isTamil ? 'வெளியேறு (Sign Out)' : 'Sign Out of Operator Session'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

