import React from 'react';
import { Calendar, ChevronDown, Info, User } from 'lucide-react';
import { CitizenProfileData, Language } from '../../types';

interface PersonalInformationFormProps {
  currentLang: Language;
  formData: CitizenProfileData;
  onChange: (updated: Partial<CitizenProfileData>) => void;
}

export const PersonalInformationForm: React.FC<PersonalInformationFormProps> = ({
  currentLang,
  formData,
  onChange,
}) => {
  const isTamil = currentLang === 'ta';

  const genderOptions: Array<{ value: 'Male' | 'Female' | 'Other'; labelTa: string; labelEn: string }> = [
    { value: 'Male', labelTa: 'ஆண்', labelEn: 'Male' },
    { value: 'Female', labelTa: 'பெண்', labelEn: 'Female' },
    { value: 'Other', labelTa: 'மற்றவை', labelEn: 'Other' },
  ];

  const maritalOptions = [
    { value: 'married', labelTa: 'திருமணமானவர்', labelEn: 'Married' },
    { value: 'unmarried', labelTa: 'திருமணமாகாதவர்', labelEn: 'Unmarried / Single' },
    { value: 'widowed', labelTa: 'விதவை', labelEn: 'Widowed' },
    { value: 'divorced', labelTa: 'விவாகரத்தானவர்', labelEn: 'Divorced' },
  ];

  const docTypeOptions = [
    { value: 'aadhaar', labelTa: 'ஆதார் அட்டை', labelEn: 'Aadhaar Card' },
    { value: 'voter', labelTa: 'வாக்காளர் அடையாள அட்டை', labelEn: 'Voter ID Card' },
    { value: 'ration', labelTa: 'குடும்ப அட்டை (Smart Card)', labelEn: 'Smart Family Card' },
    { value: 'pan', labelTa: 'பான் அட்டை', labelEn: 'PAN Card' },
    { value: 'driving', labelTa: 'ஓட்டுநர் உரிமம்', labelEn: 'Driving Licence' },
  ];

  return (
    <article className="w-full bg-white rounded-[22px] border border-[#E5ECE5] shadow-[0_2px_12px_rgba(21,91,77,0.04)] overflow-hidden box-border">
      {/* 1. Header Strip: Pale-green background with User icon & Section Title */}
      <div className="w-full bg-[#EAF3E8] px-4 py-3 sm:px-5 sm:py-3.5 flex items-center gap-3 border-b border-[#DFEBE1]">
        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#DCEEE0] border border-[#CCE3D1] flex items-center justify-center text-[#155B4D] shrink-0 shadow-2xs">
          <User className="w-5 h-5 sm:w-5.5 sm:h-5.5 stroke-[2.2]" />
        </div>

        <h3
          className={`text-[#155B4D] font-bold text-[18px] sm:text-[19.5px] leading-tight ${
            isTamil ? 'font-tamil' : ''
          }`}
        >
          {isTamil ? 'தனிப்பட்ட தகவல்' : 'Personal Information'}
        </h3>
      </div>

      {/* 2. Form Body */}
      <div className="p-4 sm:p-5 flex flex-col gap-4 sm:gap-4.5">
        {/* Field 1: Full Name (முழுப் பெயர் *) - Full Width */}
        <div className="w-full flex flex-col gap-1.5">
          <label
            htmlFor="citizen-full-name"
            className={`text-[#152B28] text-[14px] sm:text-[14.5px] font-semibold flex items-center gap-1 ${
              isTamil ? 'font-tamil' : ''
            }`}
          >
            <span>{isTamil ? 'முழுப் பெயர்' : 'Full Name'}</span>
            <span className="text-[#DC2626] font-bold" aria-hidden="true">*</span>
          </label>
          <input
            id="citizen-full-name"
            type="text"
            value={formData.fullName}
            onChange={(e) => onChange({ fullName: e.target.value })}
            placeholder={isTamil ? 'ராஜேஷ் குமார்' : 'Rajesh Kumar'}
            className="w-full h-[46px] sm:h-[48px] px-3.5 bg-white border border-[#D1D4D0] focus:border-[#155B4D] focus:ring-1 focus:ring-[#155B4D] rounded-[12px] text-[#152B28] text-[15px] font-medium outline-none transition-all placeholder:text-[#8D9690]"
            required
          />
        </div>

        {/* Row 2: Gender (பாலினம் *) & Age (வயது *) - Part 2 Layout */}
        <div className="gender-age-row">
          {/* LEFT COLUMN: Gender label + Three compact radio selection options */}
          <div className="gender-field flex flex-col gap-1.5">
            <span
              className={`h-[20px] text-[#152B28] text-[13.5px] sm:text-[14px] font-semibold flex items-center gap-1 leading-tight ${
                isTamil ? 'font-tamil' : ''
              }`}
            >
              <span>{isTamil ? 'பாலினம்' : 'Gender'}</span>
              <span className="text-[#DC2626] font-bold" aria-hidden="true">*</span>
            </span>

            {/* 3 Radio selection controls in flex row */}
            <div className="gender-options">
              {genderOptions.map((opt) => {
                const isSelected = formData.gender === opt.value;
                return (
                  <label
                    key={opt.value}
                    htmlFor={`gender-option-${opt.value}`}
                    className={`gender-option border text-[10px] min-[360px]:text-[10.5px] min-[400px]:text-[11.5px] font-semibold ${
                      isSelected
                        ? 'bg-[#E5F1E7] border-[#155B4D] text-[#155B4D] shadow-2xs'
                        : 'bg-white border-[#D1D4D0] hover:border-[#B5BDB7] text-[#152B28]'
                    }`}
                  >
                    <input
                      id={`gender-option-${opt.value}`}
                      type="radio"
                      name="citizen-gender"
                      value={opt.value}
                      checked={isSelected}
                      onChange={() => onChange({ gender: opt.value })}
                      style={{ position: 'absolute', opacity: 0, width: 0, height: 0, margin: 0, padding: 0, pointerEvents: 'none' }}
                    />

                    {/* Radio indicator circle (fixed 14px, vertically centered) */}
                    <span
                      className={`gender-radio-circle border transition-colors ${
                        isSelected
                          ? 'border-[#155B4D] bg-[#E5F1E7]'
                          : 'border-[#949E97] bg-white'
                      }`}
                      aria-hidden="true"
                    >
                      {isSelected && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#155B4D]" />
                      )}
                    </span>

                    {/* Label text (flexible, vertically centered, no clipping) */}
                    <span className={`gender-label-text ${isTamil ? 'font-tamil' : ''}`}>
                      {isTamil ? opt.labelTa : opt.labelEn}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* RIGHT COLUMN: Age label + Numeric age input matching exact 46px height */}
          <div className="age-field flex flex-col gap-1.5">
            <label
              htmlFor="citizen-age"
              className={`h-[20px] text-[#152B28] text-[13.5px] sm:text-[14px] font-semibold flex items-center gap-1 leading-tight ${
                isTamil ? 'font-tamil' : ''
              }`}
            >
              <span>{isTamil ? 'வயது' : 'Age'}</span>
              <span className="text-[#DC2626] font-bold" aria-hidden="true">*</span>
            </label>
            <input
              id="citizen-age"
              type="number"
              inputMode="numeric"
              pattern="[0-9]*"
              min={1}
              max={120}
              value={formData.age}
              onChange={(e) => onChange({ age: e.target.value })}
              placeholder="42"
              className="age-input-field px-2 bg-white border border-[#D1D4D0] focus:border-[#155B4D] focus:ring-1 focus:ring-[#155B4D] rounded-[12px] text-[#152B28] text-[15px] font-medium outline-none transition-all placeholder:text-[#8D9690] text-center"
              required
            />
          </div>
        </div>

        {/* Row 3: Date of Birth (பிறந்த தேதி *) & Marital Status (திருமண நிலை *) */}
        <div className="two-column-form-row">
          {/* DOB Input with right-aligned calendar icon */}
          <div className="flex flex-col gap-1.5 min-w-0">
            <label
              htmlFor="citizen-dob"
              className={`text-[#152B28] text-[13.5px] sm:text-[14px] font-semibold flex items-center gap-1 ${
                isTamil ? 'font-tamil' : ''
              }`}
            >
              <span>{isTamil ? 'பிறந்த தேதி' : 'Date of Birth'}</span>
              <span className="text-[#DC2626] font-bold" aria-hidden="true">*</span>
            </label>
            <div className="relative w-full">
              <input
                id="citizen-dob"
                type="text"
                value={formData.dob}
                onChange={(e) => onChange({ dob: e.target.value })}
                placeholder="15-06-1982"
                className="w-full h-[44px] sm:h-[46px] pl-3 pr-9 bg-white border border-[#D1D4D0] focus:border-[#155B4D] focus:ring-1 focus:ring-[#155B4D] rounded-[12px] text-[#152B28] text-[14px] sm:text-[14.5px] font-medium outline-none transition-all placeholder:text-[#8D9690]"
              />
              <Calendar className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-[#155B4D] pointer-events-none stroke-[2]" />
            </div>
          </div>

          {/* Marital Status Dropdown */}
          <div className="flex flex-col gap-1.5 min-w-0">
            <label
              htmlFor="citizen-marital-status"
              className={`text-[#152B28] text-[13.5px] sm:text-[14px] font-semibold flex items-center gap-1 ${
                isTamil ? 'font-tamil' : ''
              }`}
            >
              <span>{isTamil ? 'திருமண நிலை' : 'Marital Status'}</span>
              <span className="text-[#DC2626] font-bold" aria-hidden="true">*</span>
            </label>
            <div className="relative w-full">
              <select
                id="citizen-marital-status"
                value={formData.maritalStatus}
                onChange={(e) =>
                  onChange({
                    maritalStatus: e.target.value as CitizenProfileData['maritalStatus'],
                  })
                }
                className={`w-full h-[44px] sm:h-[46px] pl-3 pr-8 bg-white border border-[#D1D4D0] focus:border-[#155B4D] focus:ring-1 focus:ring-[#155B4D] rounded-[12px] text-[#152B28] text-[13.5px] sm:text-[14px] font-medium outline-none transition-all appearance-none cursor-pointer truncate ${
                  isTamil ? 'font-tamil' : ''
                }`}
              >
                {maritalOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {isTamil ? opt.labelTa : opt.labelEn}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-[#155B4D] pointer-events-none stroke-[2.2]" />
            </div>
          </div>
        </div>

        {/* Row 4: ID Document Type (அடையாள ஆவண வகை *) & ID Number (அடையாள எண் *) */}
        <div className="two-column-form-row">
          {/* Document Type Dropdown */}
          <div className="flex flex-col gap-1.5 min-w-0">
            <label
              htmlFor="citizen-id-type"
              className={`text-[#152B28] text-[13.5px] sm:text-[14px] font-semibold flex items-center gap-1 ${
                isTamil ? 'font-tamil' : ''
              }`}
            >
              <span>{isTamil ? 'அடையாள ஆவண வகை' : 'Identity Document Type'}</span>
              <span className="text-[#DC2626] font-bold" aria-hidden="true">*</span>
            </label>
            <div className="relative w-full">
              <select
                id="citizen-id-type"
                value={formData.idDocType}
                onChange={(e) =>
                  onChange({
                    idDocType: e.target.value as CitizenProfileData['idDocType'],
                  })
                }
                className={`w-full h-[44px] sm:h-[46px] pl-3 pr-8 bg-white border border-[#D1D4D0] focus:border-[#155B4D] focus:ring-1 focus:ring-[#155B4D] rounded-[12px] text-[#152B28] text-[13.5px] sm:text-[14px] font-medium outline-none transition-all appearance-none cursor-pointer truncate ${
                  isTamil ? 'font-tamil' : ''
                }`}
              >
                {docTypeOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {isTamil ? opt.labelTa : opt.labelEn}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-[#155B4D] pointer-events-none stroke-[2.2]" />
            </div>
          </div>

          {/* Document Number Input */}
          <div className="flex flex-col gap-1.5 min-w-0">
            <label
              htmlFor="citizen-id-number"
              className={`text-[#152B28] text-[13.5px] sm:text-[14px] font-semibold flex items-center gap-1 ${
                isTamil ? 'font-tamil' : ''
              }`}
            >
              <span>{isTamil ? 'அடையாள எண்' : 'Identity Number'}</span>
              <span className="text-[#DC2626] font-bold" aria-hidden="true">*</span>
            </label>
            <input
              id="citizen-id-number"
              type="text"
              value={formData.idDocNumber}
              onChange={(e) => onChange({ idDocNumber: e.target.value })}
              placeholder="1234 5678 9012"
              className="w-full h-[44px] sm:h-[46px] px-3 bg-white border border-[#D1D4D0] focus:border-[#155B4D] focus:ring-1 focus:ring-[#155B4D] rounded-[12px] text-[#152B28] text-[14px] sm:text-[14.5px] font-medium outline-none transition-all placeholder:text-[#8D9690]"
            />
          </div>
        </div>

        {/* 3. Unknown Information Guidance Notice */}
        <div className="w-full bg-[#FFF3D1] border border-[#F6E2A3] rounded-[13px] p-3 sm:p-3.5 flex items-center justify-between gap-2.5 sm:gap-3 box-border">
          {/* Left: Info icon */}
          <div className="w-6 h-6 rounded-full bg-[#F6C445]/25 flex items-center justify-center shrink-0 text-[#B37800]">
            <Info className="w-4 h-4 stroke-[2.5]" />
          </div>

          {/* Middle: Explanatory text */}
          <p
            className={`text-[12px] sm:text-[12.5px] text-[#3D3A2C] leading-snug flex-1 ${
              isTamil ? 'font-tamil' : ''
            }`}
          >
            {isTamil
              ? 'உங்களுக்கு இந்தத் தகவல் தெரியாவிட்டால், “தெரியாது” என்ற விருப்பத்தைத் தேர்வு செய்யலாம்.'
              : 'If you do not know this information, you may select “Don’t Know”.'}
          </p>

          {/* Right: Checkbox + Label */}
          <label
            htmlFor="step1-unknown-checkbox"
            className="flex items-center gap-1.5 cursor-pointer shrink-0 select-none"
          >
            <input
              id="step1-unknown-checkbox"
              type="checkbox"
              checked={formData.isStep1Unknown}
              onChange={(e) => onChange({ isStep1Unknown: e.target.checked })}
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
