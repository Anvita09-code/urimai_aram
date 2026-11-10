import React from 'react';
import { Language } from '../types';

interface LanguageModalProps {
  isOpen: boolean;
  currentLang: Language;
  onSelectLang: (lang: Language) => void;
  onClose: () => void;
}

export const LanguageModal: React.FC<LanguageModalProps> = ({
  isOpen,
  currentLang,
  onSelectLang,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-150">
      <div
        className="w-full max-w-sm bg-[#FAF7F0] rounded-t-[28px] sm:rounded-[28px] p-5 shadow-2xl border border-[#E8E1D2] animate-in slide-in-from-bottom duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Drag handle on mobile */}
        <div className="w-10 h-1 bg-[#D3CABB] rounded-full mx-auto mb-4 sm:hidden" />

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[17px] font-bold text-[#165446]">
            மொழி தேர்வு / Select Language
          </h2>
          <button
            onClick={onClose}
            type="button"
            className="w-8 h-8 rounded-full bg-[#EFE9DC] text-[#4F5552] flex items-center justify-center hover:bg-[#E5DFCE] transition-colors"
          >
            ✕
          </button>
        </div>

        <p className="text-[13px] text-[#555C58] mb-4">
          Choose your preferred language for discovery and scheme requirements.
        </p>

        <div className="space-y-2.5">
          {/* Tamil Option */}
          <button
            type="button"
            onClick={() => {
              onSelectLang('ta');
              onClose();
            }}
            className={`w-full p-3.5 rounded-2xl flex items-center justify-between text-left transition-all ${
              currentLang === 'ta'
                ? 'bg-[#165446] text-white shadow-sm'
                : 'bg-white text-[#20231F] border border-[#ECE5D8] hover:bg-[#FFFDF7]'
            }`}
          >
            <div>
              <div className="font-bold text-[16px] font-tamil">தமிழ் (Tamil)</div>
              <div className={`text-[12px] ${currentLang === 'ta' ? 'text-white/80' : 'text-[#60646A]'}`}>
                தமிழ்நாட்டின் முதன்மை மொழி
              </div>
            </div>
            {currentLang === 'ta' && (
              <span className="w-6 h-6 rounded-full bg-white text-[#165446] flex items-center justify-center font-bold text-sm">
                ✓
              </span>
            )}
          </button>

          {/* English Option */}
          <button
            type="button"
            onClick={() => {
              onSelectLang('en');
              onClose();
            }}
            className={`w-full p-3.5 rounded-2xl flex items-center justify-between text-left transition-all ${
              currentLang === 'en'
                ? 'bg-[#165446] text-white shadow-sm'
                : 'bg-white text-[#20231F] border border-[#ECE5D8] hover:bg-[#FFFDF7]'
            }`}
          >
            <div>
              <div className="font-bold text-[16px]">English</div>
              <div className={`text-[12px] ${currentLang === 'en' ? 'text-white/80' : 'text-[#60646A]'}`}>
                Bilingual assistance
              </div>
            </div>
            {currentLang === 'en' && (
              <span className="w-6 h-6 rounded-full bg-white text-[#165446] flex items-center justify-center font-bold text-sm">
                ✓
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
