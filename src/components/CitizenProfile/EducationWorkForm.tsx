import React from 'react';
import { BookOpen, Briefcase, ChevronDown, Info } from 'lucide-react';
import { CitizenProfileData, Language } from '../../types';

interface EducationWorkFormProps {
  currentLang: Language;
  formData: CitizenProfileData;
  onChange: (updated: Partial<CitizenProfileData>) => void;
}

export const EducationWorkForm: React.FC<EducationWorkFormProps> = ({
  currentLang,
  formData,
  onChange,
}) => {
  const isTamil = currentLang === 'ta';

  const educationOptions = [
    { value: 'none', labelTa: 'முறையான கல்வி இல்லை (வகுப்பு எதுவும் இல்லை)', labelEn: 'No Formal Schooling' },
    { value: 'primary', labelTa: 'தொடக்கக் கல்வி (1–5 ஆம் வகுப்பு)', labelEn: 'Primary Education (Class 1–5)' },
    { value: 'secondary', labelTa: 'உயர்நிலைக் கல்வி (10 ஆம் வகுப்பு / SSLC)', labelEn: 'Secondary School (SSLC / 10th)' },
    { value: 'higher_secondary', labelTa: 'மேல்நிலைக் கல்வி (12 ஆம் வகுப்பு / HSC)', labelEn: 'Higher Secondary (HSC / 12th)' },
    { value: 'diploma', labelTa: 'பட்டயப் படிப்பு (Diploma / ITI)', labelEn: 'Diploma / ITI Polytechnic' },
    { value: 'graduate', labelTa: 'இளங்கலை பட்டதாரி (UG Degree)', labelEn: 'Undergraduate Degree (UG)' },
    { value: 'postgraduate', labelTa: 'முதுகலை / தொழில்முறை படிப்பு (PG)', labelEn: 'Postgraduate / Professional' },
  ];

  const occupationOptions = [
    { value: 'farmer', labelTa: 'விவசாயி / நில உரிமையாளர்', labelEn: 'Farmer / Cultivator' },
    { value: 'agricultural_labour', labelTa: 'விவசாயக் கூலித் தொழிலாளி', labelEn: 'Agricultural Labourer' },
    { value: 'self_employed', labelTa: 'சிறு தொழில் / சுயதொழில் செய்பவர்', labelEn: 'Self-Employed / Small Business' },
    { value: 'salaried_private', labelTa: 'தனியார் துறை பணியாளர்', labelEn: 'Private Sector Employee' },
    { value: 'government', labelTa: 'அரசுப் பணியாளர் / பொதுத்துறை', labelEn: 'Government / Public Sector' },
    { value: 'homemaker', labelTa: 'குடும்பப் பொறுப்பாளர் / இல்லத்தரசி', labelEn: 'Homemaker' },
    { value: 'student', labelTa: 'மாணவர் / பயில்பவர்', labelEn: 'Full-time Student' },
    { value: 'unemployed', labelTa: 'வேலை தேடுபவர் / வேலையின்மை', labelEn: 'Currently Seeking Employment' },
  ];

  return (
    <article className="w-full bg-white rounded-[22px] border border-[#E5ECE5] shadow-[0_2px_12px_rgba(21,91,77,0.04)] overflow-hidden box-border">
      {/* 1. Header Strip */}
      <div className="w-full bg-[#EAF3E8] px-4 py-3 sm:px-5 sm:py-3.5 flex items-center gap-3 border-b border-[#DFEBE1]">
        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#DCEEE0] border border-[#CCE3D1] flex items-center justify-center text-[#155B4D] shrink-0 shadow-2xs">
          <BookOpen className="w-5 h-5 sm:w-5.5 sm:h-5.5 stroke-[2.2]" />
        </div>

        <h3
          className={`text-[#155B4D] font-bold text-[18px] sm:text-[19.5px] leading-tight ${
            isTamil ? 'font-tamil' : ''
          }`}
        >
          {isTamil ? 'கல்வி & தொழில்' : 'Education & Work'}
        </h3>
      </div>

      {/* 2. Form Body */}
      <div className="p-4 sm:p-5 flex flex-col gap-4 sm:gap-4.5">
        {/* Highest Education Level */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="citizen-education-level"
            className={`text-[#152B28] text-[14px] sm:text-[14.5px] font-semibold flex items-center gap-1 ${
              isTamil ? 'font-tamil' : ''
            }`}
          >
            <span>{isTamil ? 'உயர்கல்வித் தகுதி' : 'Highest Educational Qualification'}</span>
            <span className="text-[#DC2626] font-bold" aria-hidden="true">*</span>
          </label>
          <div className="relative w-full">
            <select
              id="citizen-education-level"
              value={formData.educationLevel}
              onChange={(e) =>
                onChange({
                  educationLevel: e.target.value as CitizenProfileData['educationLevel'],
                })
              }
              className={`w-full h-[46px] sm:h-[48px] pl-3.5 pr-10 bg-white border border-[#D1D4D0] focus:border-[#155B4D] focus:ring-1 focus:ring-[#155B4D] rounded-[12px] text-[#152B28] text-[14.5px] sm:text-[15px] font-medium outline-none transition-all appearance-none cursor-pointer ${
                isTamil ? 'font-tamil' : ''
              }`}
            >
              {educationOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {isTamil ? opt.labelTa : opt.labelEn}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#155B4D] pointer-events-none stroke-[2.2]" />
          </div>
        </div>

        {/* Primary Occupation */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="citizen-occupation"
            className={`text-[#152B28] text-[14px] sm:text-[14.5px] font-semibold flex items-center gap-1 ${
              isTamil ? 'font-tamil' : ''
            }`}
          >
            <span>{isTamil ? 'முதன்மை தொழில் அல்லது வேலை' : 'Primary Occupation / Livelihood'}</span>
            <span className="text-[#DC2626] font-bold" aria-hidden="true">*</span>
          </label>
          <div className="relative w-full">
            <select
              id="citizen-occupation"
              value={formData.occupationType}
              onChange={(e) =>
                onChange({
                  occupationType: e.target.value as CitizenProfileData['occupationType'],
                })
              }
              className={`w-full h-[46px] sm:h-[48px] pl-3.5 pr-10 bg-white border border-[#D1D4D0] focus:border-[#155B4D] focus:ring-1 focus:ring-[#155B4D] rounded-[12px] text-[#152B28] text-[14.5px] sm:text-[15px] font-medium outline-none transition-all appearance-none cursor-pointer ${
                isTamil ? 'font-tamil' : ''
              }`}
            >
              {occupationOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {isTamil ? opt.labelTa : opt.labelEn}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#155B4D] pointer-events-none stroke-[2.2]" />
          </div>
        </div>

        {/* Enrolled as Student Toggle */}
        <div className="w-full flex items-center justify-between p-3.5 bg-[#FAF8F2] border border-[#E5E2D6] rounded-[12px]">
          <div className="flex flex-col pr-2">
            <span
              className={`text-[#152B28] text-[14px] font-semibold ${
                isTamil ? 'font-tamil' : ''
              }`}
            >
              {isTamil
                ? 'தற்போது அரசு/அங்கீகரிக்கப்பட்ட கல்வி நிறுவனத்தில் படிக்கிறீர்களா?'
                : 'Currently enrolled in an educational institution?'}
            </span>
            <span
              className={`text-[#626A62] text-[12px] mt-0.5 ${
                isTamil ? 'font-tamil' : ''
              }`}
            >
              {isTamil
                ? 'கல்வி உதவித்தொகை திட்டங்களை அறிய உதவும்'
                : 'Helps identify scholarship and student support schemes'}
            </span>
          </div>

          <label className="relative inline-flex items-center cursor-pointer shrink-0">
            <input
              type="checkbox"
              checked={formData.isStudentEnrolled}
              onChange={(e) => onChange({ isStudentEnrolled: e.target.checked })}
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
            htmlFor="step2-unknown-checkbox"
            className="flex items-center gap-1.5 cursor-pointer shrink-0 select-none"
          >
            <input
              id="step2-unknown-checkbox"
              type="checkbox"
              checked={formData.isStep2Unknown}
              onChange={(e) => onChange({ isStep2Unknown: e.target.checked })}
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
