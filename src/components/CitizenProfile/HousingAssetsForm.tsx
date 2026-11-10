import React from 'react';
import { ChevronDown, Home, Info } from 'lucide-react';
import { CitizenProfileData, Language } from '../../types';

interface HousingAssetsFormProps {
  currentLang: Language;
  formData: CitizenProfileData;
  onChange: (updated: Partial<CitizenProfileData>) => void;
}

export const HousingAssetsForm: React.FC<HousingAssetsFormProps> = ({
  currentLang,
  formData,
  onChange,
}) => {
  const isTamil = currentLang === 'ta';

  const housingOptions = [
    { value: 'own', labelTa: 'சொந்த வீடு', labelEn: 'Own House' },
    { value: 'rented', labelTa: 'வாடகை வீடு', labelEn: 'Rented House' },
    { value: 'hut', labelTa: 'கூரை வீடு / குடிசை', labelEn: 'Thatched Hut' },
    { value: 'homeless', labelTa: 'வீடற்றவர் / சொந்த நிலம் இல்லை', labelEn: 'Homeless / No Land' },
  ];

  const roofOptions = [
    { value: 'pucca', labelTa: 'கான்கிரீட் தளம் (Pucca Concrete)', labelEn: 'Pucca (Concrete / RCC)' },
    { value: 'semi_pucca', labelTa: 'ஓடு / ஆஸ்பெஸ்டாஸ் கூரை (Semi-Pucca)', labelEn: 'Semi-Pucca (Tiled / Asbestos / Tin)' },
    { value: 'kutcha', labelTa: 'ஓலை / தட்டி கூரை (Kutcha Grass / Mud)', labelEn: 'Kutcha (Thatch / Mud / Bamboo)' },
  ];

  return (
    <article className="w-full bg-white rounded-[22px] border border-[#E5ECE5] shadow-[0_2px_12px_rgba(21,91,77,0.04)] overflow-hidden box-border">
      {/* 1. Header Strip */}
      <div className="w-full bg-[#EAF3E8] px-4 py-3 sm:px-5 sm:py-3.5 flex items-center gap-3 border-b border-[#DFEBE1]">
        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#DCEEE0] border border-[#CCE3D1] flex items-center justify-center text-[#155B4D] shrink-0 shadow-2xs">
          <Home className="w-5 h-5 sm:w-5.5 sm:h-5.5 stroke-[2.2]" />
        </div>

        <h3
          className={`text-[#155B4D] font-bold text-[18px] sm:text-[19.5px] leading-tight ${
            isTamil ? 'font-tamil' : ''
          }`}
        >
          {isTamil ? 'வீடு & சொத்துக்கள்' : 'Housing & Assets'}
        </h3>
      </div>

      {/* 2. Form Body */}
      <div className="p-4 sm:p-5 flex flex-col gap-4 sm:gap-4.5">
        {/* Housing Type */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="citizen-housing-type"
            className={`text-[#152B28] text-[14px] sm:text-[14.5px] font-semibold flex items-center gap-1 ${
              isTamil ? 'font-tamil' : ''
            }`}
          >
            <span>{isTamil ? 'குடியிருப்பு வகை' : 'Housing Ownership Type'}</span>
            <span className="text-[#DC2626] font-bold" aria-hidden="true">*</span>
          </label>
          <div className="relative w-full">
            <select
              id="citizen-housing-type"
              value={formData.housingType}
              onChange={(e) =>
                onChange({
                  housingType: e.target.value as CitizenProfileData['housingType'],
                })
              }
              className={`w-full h-[46px] sm:h-[48px] pl-3.5 pr-10 bg-white border border-[#D1D4D0] focus:border-[#155B4D] focus:ring-1 focus:ring-[#155B4D] rounded-[12px] text-[#152B28] text-[14.5px] sm:text-[15px] font-medium outline-none transition-all appearance-none cursor-pointer ${
                isTamil ? 'font-tamil' : ''
              }`}
            >
              {housingOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {isTamil ? opt.labelTa : opt.labelEn}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#155B4D] pointer-events-none stroke-[2.2]" />
          </div>
        </div>

        {/* Roof / Construction Type */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="citizen-roof-type"
            className={`text-[#152B28] text-[14px] sm:text-[14.5px] font-semibold flex items-center gap-1 ${
              isTamil ? 'font-tamil' : ''
            }`}
          >
            <span>{isTamil ? 'வீட்டின் கூரை அல்லது கட்டுமானத் தன்மை' : 'Roof & Construction Type'}</span>
            <span className="text-[#DC2626] font-bold" aria-hidden="true">*</span>
          </label>
          <div className="relative w-full">
            <select
              id="citizen-roof-type"
              value={formData.roofType}
              onChange={(e) =>
                onChange({
                  roofType: e.target.value as CitizenProfileData['roofType'],
                })
              }
              className={`w-full h-[46px] sm:h-[48px] pl-3.5 pr-10 bg-white border border-[#D1D4D0] focus:border-[#155B4D] focus:ring-1 focus:ring-[#155B4D] rounded-[12px] text-[#152B28] text-[14.5px] sm:text-[15px] font-medium outline-none transition-all appearance-none cursor-pointer ${
                isTamil ? 'font-tamil' : ''
              }`}
            >
              {roofOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {isTamil ? opt.labelTa : opt.labelEn}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#155B4D] pointer-events-none stroke-[2.2]" />
          </div>
          <span className={`text-[12px] text-[#626A62] mt-0.5 ${isTamil ? 'font-tamil' : ''}`}>
            {isTamil
              ? 'கலைஞர் கனவு இல்லம் / PMAY திட்ட தகுதிகளை அறிய பயன்படுகிறது'
              : 'Used to determine eligibility for Kalaignar Kanavu Illam & PMAY rural housing'}
          </span>
        </div>

        {/* Utilities Toggles */}
        <div className="flex flex-col gap-2.5">
          {/* Electricity Connection */}
          <div className="w-full flex items-center justify-between p-3.5 bg-[#FAF8F2] border border-[#E5E2D6] rounded-[12px]">
            <div className="flex flex-col pr-2">
              <span className={`text-[#152B28] text-[14px] font-semibold ${isTamil ? 'font-tamil' : ''}`}>
                {isTamil ? 'வீட்டில் மின்சார இணைப்பு (TANGEDCO) உள்ளதா?' : 'Does the household have an active electricity connection?'}
              </span>
              <span className={`text-[#626A62] text-[12px] mt-0.5 ${isTamil ? 'font-tamil' : ''}`}>
                {isTamil ? 'இலவச 100 யூனிட் மின்சார திட்டம்' : '100 Free Units Electricity Scheme eligibility'}
              </span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer shrink-0">
              <input
                type="checkbox"
                checked={formData.electricityConnection}
                onChange={(e) => onChange({ electricityConnection: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-[#D1D4D0] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#155B4D]"></div>
            </label>
          </div>

          {/* LPG Cooking Gas */}
          <div className="w-full flex items-center justify-between p-3.5 bg-[#FAF8F2] border border-[#E5E2D6] rounded-[12px]">
            <div className="flex flex-col pr-2">
              <span className={`text-[#152B28] text-[14px] font-semibold ${isTamil ? 'font-tamil' : ''}`}>
                {isTamil ? 'சமையல் எரிவாயு (LPG சிலிண்டர்) இணைப்பு உள்ளதா?' : 'Do you have an active LPG Cooking Gas connection?'}
              </span>
              <span className={`text-[#626A62] text-[12px] mt-0.5 ${isTamil ? 'font-tamil' : ''}`}>
                {isTamil ? 'PM உஜ்வாலா / மானிய சமையல் எரிவாயு' : 'PM Ujjwala Yojana subsidy verification'}
              </span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer shrink-0">
              <input
                type="checkbox"
                checked={formData.cookingGasLPG}
                onChange={(e) => onChange({ cookingGasLPG: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-[#D1D4D0] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#155B4D]"></div>
            </label>
          </div>
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
            htmlFor="step4-unknown-checkbox"
            className="flex items-center gap-1.5 cursor-pointer shrink-0 select-none"
          >
            <input
              id="step4-unknown-checkbox"
              type="checkbox"
              checked={formData.isStep4Unknown}
              onChange={(e) => onChange({ isStep4Unknown: e.target.checked })}
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
