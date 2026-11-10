import React from 'react';
import { IndianRupee, Info } from 'lucide-react';
import { CitizenProfileData, Language } from '../../types';

interface IncomeLivelihoodFormProps {
  currentLang: Language;
  formData: CitizenProfileData;
  onChange: (updated: Partial<CitizenProfileData>) => void;
}

export const IncomeLivelihoodForm: React.FC<IncomeLivelihoodFormProps> = ({
  currentLang,
  formData,
  onChange,
}) => {
  const isTamil = currentLang === 'ta';

  return (
    <article className="w-full bg-white rounded-[22px] border border-[#E5ECE5] shadow-[0_2px_12px_rgba(21,91,77,0.04)] overflow-hidden box-border">
      {/* 1. Header Strip */}
      <div className="w-full bg-[#EAF3E8] px-4 py-3 sm:px-5 sm:py-3.5 flex items-center gap-3 border-b border-[#DFEBE1]">
        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#DCEEE0] border border-[#CCE3D1] flex items-center justify-center text-[#155B4D] shrink-0 shadow-2xs">
          <IndianRupee className="w-5 h-5 sm:w-5.5 sm:h-5.5 stroke-[2.2]" />
        </div>

        <h3
          className={`text-[#155B4D] font-bold text-[18px] sm:text-[19.5px] leading-tight ${
            isTamil ? 'font-tamil' : ''
          }`}
        >
          {isTamil ? 'வருமானம் & வாழ்வாதாரம்' : 'Income & Livelihood'}
        </h3>
      </div>

      {/* 2. Form Body */}
      <div className="p-4 sm:p-5 flex flex-col gap-4 sm:gap-4.5">
        {/* Annual Household Income */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="citizen-income"
            className={`text-[#152B28] text-[14px] sm:text-[14.5px] font-semibold flex items-center gap-1 ${
              isTamil ? 'font-tamil' : ''
            }`}
          >
            <span>{isTamil ? 'ஆண்டு குடும்ப மொத்த வருமானம் (₹)' : 'Total Annual Family Income (₹)'}</span>
            <span className="text-[#DC2626] font-bold" aria-hidden="true">*</span>
          </label>
          <div className="relative w-full">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#155B4D] font-bold text-[16px]">
              ₹
            </span>
            <input
              id="citizen-income"
              type="number"
              min={0}
              step={1000}
              value={formData.annualIncome}
              onChange={(e) => onChange({ annualIncome: e.target.value })}
              placeholder="96000"
              className="w-full h-[46px] sm:h-[48px] pl-9 pr-3.5 bg-white border border-[#D1D4D0] focus:border-[#155B4D] focus:ring-1 focus:ring-[#155B4D] rounded-[12px] text-[#152B28] text-[15px] font-medium outline-none transition-all placeholder:text-[#8D9690]"
              required
            />
          </div>
          <span className={`text-[12px] text-[#626A62] mt-0.5 ${isTamil ? 'font-tamil' : ''}`}>
            {isTamil
              ? 'வருமானச் சான்றிதழில் உள்ள தொகையை உள்ளிடவும் (எ.கா: ₹96,000)'
              : 'Enter as recorded in your Revenue Department Income Certificate (e.g. ₹96,000)'}
          </span>
        </div>

        {/* Agricultural Land Holding */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="citizen-land"
            className={`text-[#152B28] text-[14px] sm:text-[14.5px] font-semibold flex items-center gap-1 ${
              isTamil ? 'font-tamil' : ''
            }`}
          >
            <span>{isTamil ? 'விவசாய நில பரப்பளவு (ஏக்கர்)' : 'Agricultural Land Holding (in Acres)'}</span>
          </label>
          <input
            id="citizen-land"
            type="number"
            min={0}
            step={0.1}
            value={formData.landHoldingAcres}
            onChange={(e) => onChange({ landHoldingAcres: e.target.value })}
            placeholder={isTamil ? 'நிலம் இல்லையெனில் 0 என விடவும்' : '0 if no land owned'}
            className="w-full h-[46px] sm:h-[48px] px-3.5 bg-white border border-[#D1D4D0] focus:border-[#155B4D] focus:ring-1 focus:ring-[#155B4D] rounded-[12px] text-[#152B28] text-[15px] font-medium outline-none transition-all placeholder:text-[#8D9690]"
          />
        </div>

        {/* Toggles: Income Certificate & BPL / Antyodaya */}
        <div className="flex flex-col gap-2.5">
          {/* Income Certificate available */}
          <div className="w-full flex items-center justify-between p-3.5 bg-[#FAF8F2] border border-[#E5E2D6] rounded-[12px]">
            <div className="flex flex-col pr-2">
              <span className={`text-[#152B28] text-[14px] font-semibold ${isTamil ? 'font-tamil' : ''}`}>
                {isTamil ? 'வருவாய்த்துறை வருமானச் சான்றிதழ் உள்ளதா?' : 'Do you possess a valid Tahsildar Income Certificate?'}
              </span>
              <span className={`text-[#626A62] text-[12px] mt-0.5 ${isTamil ? 'font-tamil' : ''}`}>
                {isTamil ? 'இ-சேவை மையத்தில் வழங்கப்பட்ட சான்றிதழ்' : 'Issued via e-Sevai / Revenue Department'}
              </span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer shrink-0">
              <input
                type="checkbox"
                checked={formData.incomeCertificateAvailable}
                onChange={(e) => onChange({ incomeCertificateAvailable: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-[#D1D4D0] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#155B4D]"></div>
            </label>
          </div>

          {/* BPL / PHH Ration Card Status */}
          <div className="w-full flex items-center justify-between p-3.5 bg-[#FAF8F2] border border-[#E5E2D6] rounded-[12px]">
            <div className="flex flex-col pr-2">
              <span className={`text-[#152B28] text-[14px] font-semibold ${isTamil ? 'font-tamil' : ''}`}>
                {isTamil ? 'வறுமைக் கோட்டிற்கு கீழ் (BPL / PHH குடும்ப அட்டை)' : 'Below Poverty Line (BPL / PHH Priority Ration Card)'}
              </span>
              <span className={`text-[#626A62] text-[12px] mt-0.5 ${isTamil ? 'font-tamil' : ''}`}>
                {isTamil ? 'அரிசி குடும்ப அட்டை வகை PHH / AAY' : 'Priority Household status for welfare subsidies'}
              </span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer shrink-0">
              <input
                type="checkbox"
                checked={formData.bplStatus}
                onChange={(e) => onChange({ bplStatus: e.target.checked })}
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
            htmlFor="step3-unknown-checkbox"
            className="flex items-center gap-1.5 cursor-pointer shrink-0 select-none"
          >
            <input
              id="step3-unknown-checkbox"
              type="checkbox"
              checked={formData.isStep3Unknown}
              onChange={(e) => onChange({ isStep3Unknown: e.target.checked })}
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
