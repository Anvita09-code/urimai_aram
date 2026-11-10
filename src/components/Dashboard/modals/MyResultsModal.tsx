import React from 'react';
import { Award, ChevronRight, X } from 'lucide-react';
import { schemesData } from '../../../data/schemes';
import { Language } from '../../../types';

interface MyResultsModalProps {
  isOpen: boolean;
  currentLang: Language;
  onSelectScheme: (schemeId: string) => void;
  onClose: () => void;
}

export const MyResultsModal: React.FC<MyResultsModalProps> = ({
  isOpen,
  currentLang,
  onSelectScheme,
  onClose,
}) => {
  if (!isOpen) return null;
  const isTamil = currentLang === 'ta';

  // Matched schemes based on citizen profile (Income < 1.2L, 4 members, student daughter, small agri land)
  const matchedList = [
    {
      schemeId: 'cmchis',
      scheme: schemesData.find((s) => s.schemeId === 'cmchis')!,
      matchReasonEn: 'Qualifies under Annual Family Income < ₹1,20,000 ceiling',
      matchReasonTa: 'ஆண்டு குடும்ப வருமானம் ₹1,20,000-க்குள் இருப்பதால் நேரடி தகுதி',
      statusEn: 'Potentially Relevant',
      statusTa: 'பொருந்தக்கூடும்',
      statusColor: 'bg-[#E5F1E7] text-[#155B4D]',
    },
    {
      schemeId: 'pudhumai-penn',
      scheme: schemesData.find((s) => s.schemeId === 'pudhumai-penn')!,
      matchReasonEn: 'Matches college student profile for daughter Priya',
      matchReasonTa: 'கல்லூரி பயிலும் மகள் பிரியாவிற்கு ₹1,000 மாதாந்திர உதவித்தொகை',
      statusEn: 'Eligibility to Check',
      statusTa: 'நிபந்தனை பொருந்தும்',
      statusColor: 'bg-[#FFF3D1] text-[#9A6E18]',
    },
    {
      schemeId: 'uzhavar-nanban',
      scheme: schemesData.find((s) => s.schemeId === 'uzhavar-nanban')!,
      matchReasonEn: 'Matches small farmer landholding records in Madurai',
      matchReasonTa: 'விவசாய நிலம் வைத்துள்ளதால் மானிய விதைகள் மற்றும் இடுபொருட்கள்',
      statusEn: 'Eligible with Documents',
      statusTa: 'ஆவணங்களுடன் தகுதி',
      statusColor: 'bg-[#E5F1E7] text-[#155B4D]',
    },
    {
      schemeId: 'kmut',
      scheme: schemesData.find((s) => s.schemeId === 'kmut')!,
      matchReasonEn: 'Matches criteria for homemaker woman head Kavitha',
      matchReasonTa: 'குடும்பத் தலைவி கவிதாவிற்கு மாதம் ₹1,000 உரிமைத்தொகை',
      statusEn: 'Potentially Relevant',
      statusTa: 'பொருந்தக்கூடும்',
      statusColor: 'bg-[#E5F1E7] text-[#155B4D]',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/45 backdrop-blur-xs transition-opacity animate-in fade-in duration-150">
      <div className="w-full max-w-md bg-[#FAF7F0] rounded-t-[28px] sm:rounded-[28px] p-5 shadow-2xl border border-[#E8E1D2] animate-in slide-in-from-bottom duration-200 max-h-[90vh] flex flex-col">
        {/* Mobile handle */}
        <div className="w-10 h-1 bg-[#D3CABB] rounded-full mx-auto mb-3 sm:hidden shrink-0" />

        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#ECE5D8] shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-[#E5F1E7] border border-[#D5E6D8] flex items-center justify-center text-[#155B4D]">
              <Award className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <h2 className="text-[17px] font-bold text-[#155B4D] leading-tight">
                {isTamil ? 'என் தகுதி முடிவுகள்' : 'My Eligibility Results'}
              </h2>
              <span className="text-[12px] text-[#626A62]">
                {isTamil ? '4 பொருத்தமான அரசு நலத்திட்டங்கள்' : '4 matched welfare schemes'}
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

        {/* Schemes List */}
        <div className="space-y-3 overflow-y-auto pr-1 flex-1 py-3">
          {matchedList.map((item) => (
            <div
              key={item.schemeId}
              onClick={() => {
                onClose();
                onSelectScheme(item.schemeId);
              }}
              className="bg-white rounded-2xl p-3.5 border border-[#ECE5D8] hover:border-[#155B4D]/40 transition-all cursor-pointer shadow-2xs group"
            >
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <h4 className="text-[14px] font-bold text-[#155B4D] group-hover:text-[#11493e] leading-snug">
                  {isTamil ? item.scheme.officialNameTa : item.scheme.officialName}
                </h4>
                <span className={`text-[10.5px] font-bold px-2.5 py-0.5 rounded-full whitespace-nowrap shrink-0 ${item.statusColor}`}>
                  {isTamil ? item.statusTa : item.statusEn}
                </span>
              </div>
              <p className="text-[12px] text-[#555C58] leading-snug mb-2">
                {isTamil ? item.matchReasonTa : item.matchReasonEn}
              </p>
              <div className="flex items-center justify-between text-xs font-bold text-[#155B4D] pt-1.5 border-t border-[#F2ECE0]">
                <span>{isTamil ? 'திட்ட விவரங்களைக் காண்க' : 'View Scheme Information'}</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          ))}
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
