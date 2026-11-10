import React, { useState } from 'react';
import { ChevronRight, Home, X } from 'lucide-react';
import { translations } from '../../data/translations';
import { HouseholdProfile, Language } from '../../types';

interface UpdateHouseholdModalProps {
  isOpen: boolean;
  currentLang: Language;
  profile: HouseholdProfile;
  onSave: (updated: HouseholdProfile) => void;
  onClose: () => void;
  onNavigateToProfile?: () => void;
}

export const UpdateHouseholdModal: React.FC<UpdateHouseholdModalProps> = ({
  isOpen,
  currentLang,
  profile,
  onSave,
  onClose,
  onNavigateToProfile,
}) => {
  const t = translations[currentLang];
  const isTamil = currentLang === 'ta';

  const [headName, setHeadName] = useState(profile.headName);
  const [headNameTa, setHeadNameTa] = useState(profile.headNameTa);
  const [rationCardNumber, setRationCardNumber] = useState(profile.rationCardNumber);
  const [annualIncome, setAnnualIncome] = useState(profile.annualIncome);
  const [district, setDistrict] = useState(profile.district);
  const [districtTa, setDistrictTa] = useState(profile.districtTa);
  const [taluk, setTaluk] = useState(profile.taluk);
  const [talukTa, setTalukTa] = useState(profile.talukTa);
  const [housingType, setHousingType] = useState(profile.housingType);
  const [areaType, setAreaType] = useState(profile.areaType);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      headName,
      headNameTa,
      rationCardNumber: rationCardNumber.trim(),
      annualIncome: Number(annualIncome) || 0,
      district,
      districtTa,
      taluk,
      talukTa,
      housingType,
      areaType,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs select-none animate-in fade-in duration-200">
      <div className="relative w-full max-w-[420px] bg-[#FAF7EF] rounded-[24px] shadow-2xl border border-[#ECE5D8] overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 border-b border-[#ECE5D8] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#E5F1E7] flex items-center justify-center text-[#155B4D]">
              <Home className="w-5 h-5 stroke-[2.2]" />
            </div>
            <h3
              className={`text-[#155B4D] font-bold text-[17px] leading-tight ${
                isTamil ? 'font-tamil' : ''
              }`}
            >
              {t.updateHouseholdModalTitle}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#626A62] hover:bg-black/5 active:scale-95 transition-all"
            aria-label={t.close}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 max-h-[75vh] overflow-y-auto">
          {onNavigateToProfile && (
            <button
              type="button"
              onClick={() => {
                onClose();
                onNavigateToProfile();
              }}
              className="w-full p-3 bg-[#E5F1E7] hover:bg-[#d8edd9] border border-[#CCE3D1] rounded-[14px] flex items-center justify-between text-left transition-all cursor-pointer group shadow-2xs"
            >
              <div className="flex flex-col pr-2">
                <span
                  className={`text-[#155B4D] font-bold text-[13px] sm:text-[13.5px] leading-tight ${
                    isTamil ? 'font-tamil' : ''
                  }`}
                >
                  {isTamil ? '5-படி குடிமகன் சுயவிவர படிவம்' : '5-Step Comprehensive Citizen Profile'}
                </span>
                <span
                  className={`text-[#59635F] text-[11px] sm:text-[11.5px] mt-0.5 ${
                    isTamil ? 'font-tamil' : ''
                  }`}
                >
                  {isTamil
                    ? 'முழுமையான தகுதி மதிப்பாய்வு செய்ய'
                    : 'For complete eligibility assessment'}
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-[#155B4D] group-hover:translate-x-0.5 transition-transform shrink-0" />
            </button>
          )}

          {/* Smart Family Card / Ration Card Number */}
          <div>
            <label
              className={`block text-[12px] font-bold text-[#155B4D] mb-1.5 ${
                isTamil ? 'font-tamil' : ''
              }`}
            >
              {t.rationCardNumber}
            </label>
            <input
              type="text"
              value={rationCardNumber}
              onChange={(e) => setRationCardNumber(e.target.value)}
              required
              className="w-full px-3.5 py-2.5 bg-white border border-[#D5DCD2] rounded-xl text-[14px] text-[#202820] font-medium focus:outline-hidden focus:border-[#155B4D] focus:ring-2 focus:ring-[#155B4D]/20 transition-all font-mono"
              placeholder="03/G/0892415"
            />
          </div>

          {/* Annual Household Income */}
          <div>
            <label
              className={`block text-[12px] font-bold text-[#155B4D] mb-1.5 ${
                isTamil ? 'font-tamil' : ''
              }`}
            >
              {t.annualIncome}
            </label>
            <input
              type="number"
              value={annualIncome}
              onChange={(e) => setAnnualIncome(Number(e.target.value) || 0)}
              required
              className="w-full px-3.5 py-2.5 bg-white border border-[#D5DCD2] rounded-xl text-[14px] text-[#202820] font-medium focus:outline-hidden focus:border-[#155B4D] focus:ring-2 focus:ring-[#155B4D]/20 transition-all tabular-nums"
              placeholder="96000"
            />
          </div>

          {/* District & Taluk in 2 columns */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label
                className={`block text-[12px] font-bold text-[#155B4D] mb-1.5 ${
                  isTamil ? 'font-tamil' : ''
                }`}
              >
                {t.districtLabel}
              </label>
              <select
                value={district}
                onChange={(e) => {
                  setDistrict(e.target.value);
                  setDistrictTa(e.target.value === 'Madurai' ? 'மதுரை' : 'சென்னை');
                }}
                className="w-full px-3.5 py-2.5 bg-white border border-[#D5DCD2] rounded-xl text-[14px] text-[#202820] font-medium focus:outline-hidden focus:border-[#155B4D] cursor-pointer"
              >
                <option value="Madurai">{isTamil ? 'மதுரை (Madurai)' : 'Madurai'}</option>
                <option value="Chennai">{isTamil ? 'சென்னை (Chennai)' : 'Chennai'}</option>
                <option value="Coimbatore">{isTamil ? 'கோயம்புத்தூர் (Coimbatore)' : 'Coimbatore'}</option>
                <option value="Tiruchirappalli">{isTamil ? 'திருச்சிராப்பள்ளி (Trichy)' : 'Tiruchirappalli'}</option>
              </select>
            </div>

            <div>
              <label
                className={`block text-[12px] font-bold text-[#155B4D] mb-1.5 ${
                  isTamil ? 'font-tamil' : ''
                }`}
              >
                {t.talukLabel}
              </label>
              <input
                type="text"
                value={isTamil ? talukTa : taluk}
                onChange={(e) => {
                  if (isTamil) {
                    setTalukTa(e.target.value);
                    if (!taluk) setTaluk(e.target.value);
                  } else {
                    setTaluk(e.target.value);
                    if (!talukTa) setTalukTa(e.target.value);
                  }
                }}
                className="w-full px-3.5 py-2.5 bg-white border border-[#D5DCD2] rounded-xl text-[14px] text-[#202820] font-medium focus:outline-hidden focus:border-[#155B4D]"
                placeholder={isTamil ? 'மேலூர்' : 'Melur'}
              />
            </div>
          </div>

          {/* Housing & Area Type in 2 columns */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label
                className={`block text-[12px] font-bold text-[#155B4D] mb-1.5 ${
                  isTamil ? 'font-tamil' : ''
                }`}
              >
                {t.housingTypeLabel}
              </label>
              <select
                value={housingType}
                onChange={(e) => setHousingType(e.target.value as 'own' | 'rented')}
                className="w-full px-3.5 py-2.5 bg-white border border-[#D5DCD2] rounded-xl text-[13px] text-[#202820] font-medium focus:outline-hidden focus:border-[#155B4D] cursor-pointer"
              >
                <option value="own">{t.housingOwn}</option>
                <option value="rented">{t.housingRented}</option>
              </select>
            </div>

            <div>
              <label
                className={`block text-[12px] font-bold text-[#155B4D] mb-1.5 ${
                  isTamil ? 'font-tamil' : ''
                }`}
              >
                {isTamil ? 'பகுதி வகை' : 'Area Type'}
              </label>
              <select
                value={areaType}
                onChange={(e) => setAreaType(e.target.value as 'rural' | 'urban')}
                className="w-full px-3.5 py-2.5 bg-white border border-[#D5DCD2] rounded-xl text-[13px] text-[#202820] font-medium focus:outline-hidden focus:border-[#155B4D] cursor-pointer"
              >
                <option value="rural">{t.areaRural}</option>
                <option value="urban">{t.areaUrban}</option>
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-[#ECE5D8]">
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2.5 rounded-xl border border-[#D5DCD2] text-[#626A62] text-[13px] font-semibold hover:bg-white active:scale-95 transition-all cursor-pointer ${
                isTamil ? 'font-tamil' : ''
              }`}
            >
              {t.cancelAction}
            </button>
            <button
              type="submit"
              className={`px-5 py-2.5 rounded-xl bg-[#155B4D] hover:bg-[#11493e] active:scale-95 text-white text-[13px] font-bold transition-all cursor-pointer shadow-xs ${
                isTamil ? 'font-tamil' : ''
              }`}
            >
              {t.saveChanges}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
