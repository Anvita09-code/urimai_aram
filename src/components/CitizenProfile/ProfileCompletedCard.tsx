import React from 'react';
import { ArrowRight, CheckCircle2, RotateCcw, Sparkles } from 'lucide-react';
import { CitizenProfileData, Language } from '../../types';

interface ProfileCompletedCardProps {
  currentLang: Language;
  formData: CitizenProfileData;
  onNavigateToExplorer: () => void;
  onNavigateToDashboard: () => void;
  onRestart: () => void;
}

export const ProfileCompletedCard: React.FC<ProfileCompletedCardProps> = ({
  currentLang,
  formData,
  onNavigateToExplorer,
  onNavigateToDashboard,
  onRestart,
}) => {
  const isTamil = currentLang === 'ta';

  return (
    <article className="w-full bg-white rounded-[24px] border border-[#E5ECE5] shadow-[0_4px_20px_rgba(21,91,77,0.06)] p-5 sm:p-6 flex flex-col items-center text-center box-border animate-fade-in">
      {/* Success Badge */}
      <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-[#E5F1E7] border border-[#CCE3D1] flex items-center justify-center text-[#155B4D] mb-4 shadow-sm">
        <CheckCircle2 className="w-9 h-9 sm:w-10 sm:h-10 stroke-[2.2]" />
      </div>

      <h3
        className={`text-[#155B4D] font-bold text-[20px] sm:text-[22px] leading-tight mb-2 ${
          isTamil ? 'font-tamil' : ''
        }`}
      >
        {isTamil
          ? 'சுயவிவர தகவல்கள் வெற்றிகரமாக பதிவு செய்யப்பட்டன!'
          : 'Citizen Profile Completed Successfully!'}
      </h3>

      <p
        className={`text-[#59635F] text-[13.5px] sm:text-[14.5px] leading-relaxed max-w-[340px] mb-5 ${
          isTamil ? 'font-tamil' : ''
        }`}
      >
        {isTamil
          ? 'உங்கள் தனிப்பட்ட, கல்வி, வருமானம் மற்றும் குடும்பத் தகவல்கள் புதுப்பிக்கப்பட்டுள்ளன. இதன்மூலம் உங்களுக்குரிய அரசு நலத்திட்டங்களை துல்லியமாக அறியலாம்.'
          : 'Your personal, educational, income and household details have been updated. You can now discover accurately matched government schemes.'}
      </p>

      {/* Summary Chips */}
      <div className="w-full bg-[#FAF8F2] border border-[#EBE6D9] rounded-[16px] p-3.5 mb-5 flex flex-col gap-2 text-left">
        <div className="flex items-center justify-between text-[13px]">
          <span className="text-[#626A62]">{isTamil ? 'குடிமகன் பெயர்' : 'Citizen Name'}</span>
          <span className="font-bold text-[#155B4D]">{formData.fullName || (isTamil ? 'ராஜேஷ் குமார்' : 'Rajesh Kumar')}</span>
        </div>
        <div className="flex items-center justify-between text-[13px]">
          <span className="text-[#626A62]">{isTamil ? 'வயது / பாலினம்' : 'Age / Gender'}</span>
          <span className="font-semibold text-[#202820]">
            {formData.age || '42'} {isTamil ? 'ஆண்டுகள்' : 'Yrs'} | {formData.gender === 'Female' ? (isTamil ? 'பெண்' : 'Female') : (isTamil ? 'ஆண்' : 'Male')}
          </span>
        </div>
        <div className="flex items-center justify-between text-[13px]">
          <span className="text-[#626A62]">{isTamil ? 'சுயவிவர நிலை' : 'Profile Status'}</span>
          <span className="inline-flex items-center gap-1 text-[#155B4D] font-bold bg-[#E5F1E7] px-2 py-0.5 rounded-full text-[11.5px]">
            <Sparkles className="w-3 h-3" />
            100% {isTamil ? 'நிறைவு' : 'Verified'}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="w-full flex flex-col gap-2.5">
        <button
          type="button"
          onClick={onNavigateToExplorer}
          className="w-full h-[50px] bg-[#155B4D] hover:bg-[#10483D] active:scale-[0.98] rounded-[14px] text-white font-bold text-[15.5px] flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
        >
          <span className={isTamil ? 'font-tamil' : ''}>
            {isTamil ? 'பொருத்தமான திட்டங்களைக் காண்க' : 'Explore Matching Schemes'}
          </span>
          <ArrowRight className="w-4.5 h-4.5 stroke-[2.5]" />
        </button>

        <button
          type="button"
          onClick={onNavigateToDashboard}
          className="w-full h-[48px] bg-white hover:bg-[#FAF7EF] active:scale-[0.98] border-[1.5px] border-[#155B4D] rounded-[14px] text-[#155B4D] font-bold text-[15px] flex items-center justify-center transition-all cursor-pointer shadow-2xs"
        >
          <span className={isTamil ? 'font-tamil' : ''}>
            {isTamil ? 'டாஷ்போர்டிற்குச் செல்க' : 'Back to Citizen Dashboard'}
          </span>
        </button>

        <button
          type="button"
          onClick={onRestart}
          className="flex items-center justify-center gap-1.5 text-[12.5px] text-[#59635F] hover:text-[#155B4D] mt-1 font-medium transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className={isTamil ? 'font-tamil' : ''}>
            {isTamil ? 'சுயவிவரத்தை மீண்டும் திருத்த' : 'Edit profile answers'}
          </span>
        </button>
      </div>
    </article>
  );
};
