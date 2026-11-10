import React from 'react';
import { Globe, Shield, User, X } from 'lucide-react';
import { Language } from '../../../types';

interface AccountModalProps {
  isOpen: boolean;
  currentLang: Language;
  onOpenLanguage: () => void;
  onOpenTrustModal: () => void;
  onClose: () => void;
}

export const AccountModal: React.FC<AccountModalProps> = ({
  isOpen,
  currentLang,
  onOpenLanguage,
  onOpenTrustModal,
  onClose,
}) => {
  if (!isOpen) return null;
  const isTamil = currentLang === 'ta';

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/45 backdrop-blur-xs transition-opacity animate-in fade-in duration-150">
      <div className="w-full max-w-md bg-[#FAF7F0] rounded-t-[28px] sm:rounded-[28px] p-5 shadow-2xl border border-[#E8E1D2] animate-in slide-in-from-bottom duration-200 max-h-[90vh] flex flex-col">
        {/* Mobile handle */}
        <div className="w-10 h-1 bg-[#D3CABB] rounded-full mx-auto mb-3 sm:hidden shrink-0" />

        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#ECE5D8] shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-[#E5F1E7] border border-[#D5E6D8] flex items-center justify-center text-[#155B4D]">
              <User className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <h2 className="text-[17px] font-bold text-[#155B4D] leading-tight">
                {isTamil ? 'குடிமக்கள் கணக்கு' : 'Citizen Account & Profile'}
              </h2>
              <span className="text-[12px] text-[#626A62]">
                {isTamil ? 'உரிமையறம் தனிநபர் பக்கம்' : 'Urimai Aram Profile & Settings'}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="w-8 h-8 rounded-full bg-[#EFE9DC] text-[#4F5552] flex items-center justify-center hover:bg-[#E5DFCE] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Profile Card */}
        <div className="my-3 bg-white rounded-2xl p-4 border border-[#ECE5D8] shadow-2xs space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#155B4D] text-[#F5D879] font-bold text-lg flex items-center justify-center shadow-xs">
              M
            </div>
            <div>
              <h3 className="font-extrabold text-[16px] text-[#155B4D]">
                {isTamil ? 'முரளி' : 'Murali'}
              </h3>
              <p className="text-[12px] text-[#626A62]">
                {isTamil ? 'குடும்பத் தலைவர் • ரேஷன் எண்: 03/G/0892415' : 'Head of Household • Smart Card: 03/G/0892415'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#F2ECE0] text-xs">
            <div>
              <span className="text-[#7A827E] block">{isTamil ? 'மாவட்டம்' : 'District'}</span>
              <span className="font-bold text-[#202820]">{isTamil ? 'மதுரை' : 'Madurai'}</span>
            </div>
            <div>
              <span className="text-[#7A827E] block">{isTamil ? 'ஆதார் நிலை' : 'Aadhaar Status'}</span>
              <span className="font-bold text-[#155B4D]">{isTamil ? 'சரிபார்க்கப்பட்டது ✓' : 'Verified e-KYC ✓'}</span>
            </div>
          </div>
        </div>

        {/* Settings Buttons */}
        <div className="space-y-2 flex-1 overflow-y-auto py-1">
          {/* Language Switch */}
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenLanguage();
            }}
            className="w-full p-3 bg-white rounded-xl border border-[#ECE5D8] flex items-center justify-between text-left hover:bg-[#FAF7EF] transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <Globe className="w-4.5 h-4.5 text-[#155B4D]" />
              <span className="text-[13.5px] font-semibold text-[#202820]">
                {isTamil ? 'மொழி மாற்றம் (Language)' : 'Change Language'}
              </span>
            </div>
            <span className="text-xs font-bold text-[#155B4D] bg-[#E5F1E7] px-2.5 py-0.5 rounded-full">
              {isTamil ? 'தமிழ்' : 'English'}
            </span>
          </button>

          {/* Privacy Charter */}
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenTrustModal();
            }}
            className="w-full p-3 bg-white rounded-xl border border-[#ECE5D8] flex items-center justify-between text-left hover:bg-[#FAF7EF] transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <Shield className="w-4.5 h-4.5 text-[#155B4D]" />
              <span className="text-[13.5px] font-semibold text-[#202820]">
                {isTamil ? 'தரவு பாதுகாப்பு & பொதுநல உத்தரவாதம்' : 'Privacy & Public Benefit Charter'}
              </span>
            </div>
            <span className="text-xs text-[#7A827E]">→</span>
          </button>
        </div>

        {/* Close Button */}
        <div className="pt-3 border-t border-[#ECE5D8] shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 bg-[#155B4D] hover:bg-[#11493e] text-white font-bold text-[13.5px] rounded-xl active:scale-98 transition-all shadow-xs"
          >
            {isTamil ? 'மூடுக' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
