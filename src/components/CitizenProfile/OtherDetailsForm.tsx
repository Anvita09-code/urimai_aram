import React from 'react';
import { CheckCircle2, ChevronDown, FileText, Info } from 'lucide-react';
import { CitizenProfileData, Language } from '../../types';

interface OtherDetailsFormProps {
  currentLang: Language;
  formData: CitizenProfileData;
  onChange: (updated: Partial<CitizenProfileData>) => void;
}

export const OtherDetailsForm: React.FC<OtherDetailsFormProps> = ({
  currentLang,
  formData,
  onChange,
}) => {
  const isTamil = currentLang === 'ta';

  const categoryOptions = [
    { value: 'bc', labelTa: 'பிற்படுத்தப்பட்டோர் (BC - Backward Class)', labelEn: 'BC (Backward Class)' },
    { value: 'mbc_dnc', labelTa: 'மிகவும் பிற்படுத்தப்பட்டோர் / சீர்மரபினர் (MBC / DNC)', labelEn: 'MBC / DNC (Most Backward Class)' },
    { value: 'sc', labelTa: 'பட்டியலினத்தவர் (SC - Scheduled Caste)', labelEn: 'SC (Scheduled Caste)' },
    { value: 'st', labelTa: 'பழங்குடியினர் (ST - Scheduled Tribe)', labelEn: 'ST (Scheduled Tribe)' },
    { value: 'oc', labelTa: 'பொதுப் பிரிவு (General / OC)', labelEn: 'General / OC (Open Category)' },
  ];

  return (
    <article className="w-full bg-white rounded-[22px] border border-[#E5ECE5] shadow-[0_2px_12px_rgba(21,91,77,0.04)] overflow-hidden box-border">
      {/* 1. Header Strip */}
      <div className="w-full bg-[#EAF3E8] px-4 py-3 sm:px-5 sm:py-3.5 flex items-center gap-3 border-b border-[#DFEBE1]">
        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#DCEEE0] border border-[#CCE3D1] flex items-center justify-center text-[#155B4D] shrink-0 shadow-2xs">
          <FileText className="w-5 h-5 sm:w-5.5 sm:h-5.5 stroke-[2.2]" />
        </div>

        <h3
          className={`text-[#155B4D] font-bold text-[18px] sm:text-[19.5px] leading-tight ${
            isTamil ? 'font-tamil' : ''
          }`}
        >
          {isTamil ? 'மற்ற தகவல்கள்' : 'Other Details'}
        </h3>
      </div>

      {/* 2. Form Body */}
      <div className="p-4 sm:p-5 flex flex-col gap-4 sm:gap-4.5">
        {/* Social / Community Category */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="citizen-social-category"
            className={`text-[#152B28] text-[14px] sm:text-[14.5px] font-semibold flex items-center gap-1 ${
              isTamil ? 'font-tamil' : ''
            }`}
          >
            <span>{isTamil ? 'சமூகப் பிரிவு (Community Category)' : 'Social Community Category'}</span>
            <span className="text-[#DC2626] font-bold" aria-hidden="true">*</span>
          </label>
          <div className="relative w-full">
            <select
              id="citizen-social-category"
              value={formData.socialCategory}
              onChange={(e) =>
                onChange({
                  socialCategory: e.target.value as CitizenProfileData['socialCategory'],
                })
              }
              className={`w-full h-[46px] sm:h-[48px] pl-3.5 pr-10 bg-white border border-[#D1D4D0] focus:border-[#155B4D] focus:ring-1 focus:ring-[#155B4D] rounded-[12px] text-[#152B28] text-[14.5px] sm:text-[15px] font-medium outline-none transition-all appearance-none cursor-pointer ${
                isTamil ? 'font-tamil' : ''
              }`}
            >
              {categoryOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {isTamil ? opt.labelTa : opt.labelEn}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#155B4D] pointer-events-none stroke-[2.2]" />
          </div>
          <span className={`text-[12px] text-[#626A62] mt-0.5 ${isTamil ? 'font-tamil' : ''}`}>
            {isTamil
              ? 'சாதிச் சான்றிதழில் உள்ள அரசுப் பிரிவை தேர்ந்தெடுக்கவும்'
              : 'Select as indicated on your revenue community certificate'}
          </span>
        </div>

        {/* Differently Abled Person Toggle */}
        <div className="w-full flex items-center justify-between p-3.5 bg-[#FAF8F2] border border-[#E5E2D6] rounded-[12px]">
          <div className="flex flex-col pr-2">
            <span className={`text-[#152B28] text-[14px] font-semibold ${isTamil ? 'font-tamil' : ''}`}>
              {isTamil ? 'மாற்றுத்திறனாளியா? (Persons with Disabilities)' : 'Are you a Person with Disability (PwD)?'}
            </span>
            <span className={`text-[#626A62] text-[12px] mt-0.5 ${isTamil ? 'font-tamil' : ''}`}>
              {isTamil ? 'மாதாந்திர உதவித்தொகை மற்றும் உபகரண திட்டங்கள்' : 'Disability pension and assistive aid schemes'}
            </span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer shrink-0">
            <input
              type="checkbox"
              checked={formData.differentlyAbled}
              onChange={(e) => onChange({ differentlyAbled: e.target.checked })}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-[#D1D4D0] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#155B4D]"></div>
          </label>
        </div>

        {/* Bank Account Direct Benefit Transfer (DBT) */}
        <div className="w-full flex items-center justify-between p-3.5 bg-[#FAF8F2] border border-[#E5E2D6] rounded-[12px]">
          <div className="flex flex-col pr-2">
            <span className={`text-[#152B28] text-[14px] font-semibold ${isTamil ? 'font-tamil' : ''}`}>
              {isTamil ? 'ஆதாருடன் இணைக்கப்பட்ட வங்கிக் கணக்கு உள்ளதா?' : 'Bank account linked with Aadhaar (DBT enabled)?'}
            </span>
            <span className={`text-[#626A62] text-[12px] mt-0.5 ${isTamil ? 'font-tamil' : ''}`}>
              {isTamil ? 'நேரடி பணப்பரிவர்த்தனை திட்டங்களுக்கு கட்டாயம்' : 'Required for direct cash benefit transfers into bank'}
            </span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer shrink-0">
            <input
              type="checkbox"
              checked={formData.bankAccountLinked}
              onChange={(e) => onChange({ bankAccountLinked: e.target.checked })}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-[#D1D4D0] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#155B4D]"></div>
          </label>
        </div>

        {/* Guidance Notice */}
        <div className="w-full bg-[#FFF3D1] border border-[#F6E2A3] rounded-[13px] p-3 sm:p-3.5 flex items-center justify-between gap-2.5 sm:gap-3 box-border">
          <div className="w-6 h-6 rounded-full bg-[#F6C445]/25 flex items-center justify-center shrink-0 text-[#B37800]">
            <Info className="w-4 h-4 stroke-[2.5]" />
          </div>

          <p
            className={`text-[12px] sm:text-[12.5px] text-[#3D3A2C] leading-snug flex-1 ${
              isTamil ? 'font-tamil' : ''
            }`}
          >
            {isTamil
              ? 'உங்களுக்கு இந்தத் தகவல் தெரியாவிட்டால், “தெரியாது” என்ற விருப்பத்தைத் தேர்வு செய்யலாம்.'
              : 'If you do not know this information, you may select “Don’t Know”.'}
          </p>

          <label
            htmlFor="step5-unknown-checkbox"
            className="flex items-center gap-1.5 cursor-pointer shrink-0 select-none"
          >
            <input
              id="step5-unknown-checkbox"
              type="checkbox"
              checked={formData.isStep5Unknown}
              onChange={(e) => onChange({ isStep5Unknown: e.target.checked })}
              className="w-4 h-4 rounded-[4px] border-[1.5px] border-[#9E7C20] text-[#155B4D] focus:ring-0 focus:ring-offset-0 cursor-pointer accent-[#155B4D]"
            />
            <span
              className={`text-[12.5px] sm:text-[13px] font-semibold text-[#3D3A2C] whitespace-nowrap ${
                isTamil ? 'font-tamil' : ''
              }`}
            >
              {isTamil ? 'தெரியாது' : 'Don’t Know'}
            </span>
          </label>
        </div>
      </div>
    </article>
  );
};
