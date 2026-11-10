import React from 'react';
import { translations } from '../data/translations';
import { Language } from '../types';

interface TrustModalProps {
  isOpen: boolean;
  currentLang: Language;
  onClose: () => void;
}

export const TrustModal: React.FC<TrustModalProps> = ({ isOpen, currentLang, onClose }) => {
  if (!isOpen) return null;

  const t = translations[currentLang];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/45 backdrop-blur-xs transition-opacity animate-in fade-in duration-150">
      <div className="w-full max-w-md bg-[#FAF7F0] rounded-t-[28px] sm:rounded-[28px] p-5 shadow-2xl border border-[#E8E1D2] animate-in slide-in-from-bottom duration-200">
        <div className="w-10 h-1 bg-[#D3CABB] rounded-full mx-auto mb-3 sm:hidden" />

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl text-[#98741D]">🛡️</span>
            <h2 className="text-[18px] font-bold text-[#165446]">
              {t.privacyModalTitle}
            </h2>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="w-8 h-8 rounded-full bg-[#EFE9DC] text-[#4F5552] flex items-center justify-center hover:bg-[#E5DFCE] transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="space-y-3 mb-5">
          <div className="p-3.5 bg-white rounded-2xl border border-[#ECE5D8] flex items-start gap-3">
            <span className="text-xl">🔒</span>
            <div>
              <h4 className="text-[13.5px] font-bold text-[#1F2320]">
                {currentLang === 'ta' ? 'முழுமையான தரவு பாதுகாப்பு' : 'Strict Data Privacy'}
              </h4>
              <p className="text-[12.5px] text-[#555C58] mt-0.5 leading-snug">
                {t.privacyPoint1}
              </p>
            </div>
          </div>

          <div className="p-3.5 bg-white rounded-2xl border border-[#ECE5D8] flex items-start gap-3">
            <span className="text-xl">🏛️</span>
            <div>
              <h4 className="text-[13.5px] font-bold text-[#1F2320]">
                {currentLang === 'ta' ? 'அரசு சார்பற்ற பொது நன்மை' : 'Independent Public Benefit'}
              </h4>
              <p className="text-[12.5px] text-[#555C58] mt-0.5 leading-snug">
                {t.privacyPoint2}
              </p>
            </div>
          </div>

          <div className="p-3.5 bg-white rounded-2xl border border-[#ECE5D8] flex items-start gap-3">
            <span className="text-xl">📜</span>
            <div>
              <h4 className="text-[13.5px] font-bold text-[#1F2320]">
                {currentLang === 'ta' ? 'சரிபார்க்கப்பட்ட அதிகாரப்பூர்வ தகவல்கள்' : 'Cited Official Sources'}
              </h4>
              <p className="text-[12.5px] text-[#555C58] mt-0.5 leading-snug">
                {t.privacyPoint3}
              </p>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="w-full py-3 bg-[#165446] hover:bg-[#12473b] active:scale-[0.98] text-white text-[14px] font-bold rounded-xl transition-all shadow-sm"
        >
          {t.close}
        </button>
      </div>
    </div>
  );
};
