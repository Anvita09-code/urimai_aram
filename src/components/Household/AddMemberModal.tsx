import React, { useState } from 'react';
import { UserPlus, X } from 'lucide-react';
import { translations } from '../../data/translations';
import { HouseholdMember, Language } from '../../types';

interface AddMemberModalProps {
  isOpen: boolean;
  currentLang: Language;
  onAdd: (newMember: HouseholdMember) => void;
  onClose: () => void;
}

export const AddMemberModal: React.FC<AddMemberModalProps> = ({
  isOpen,
  currentLang,
  onAdd,
  onClose,
}) => {
  const t = translations[currentLang];
  const isTamil = currentLang === 'ta';

  const [name, setName] = useState('');
  const [nameTa, setNameTa] = useState('');
  const [relation, setRelation] = useState('Son');
  const [relationTa, setRelationTa] = useState('மகன்');
  const [age, setAge] = useState<number>(18);
  const [gender, setGender] = useState<'Male' | 'Female' | 'Other'>('Male');
  const [genderTa, setGenderTa] = useState<'ஆண்' | 'பெண்' | 'மற்றவை'>('ஆண்');

  if (!isOpen) return null;

  const handleGenderChange = (val: 'Male' | 'Female' | 'Other') => {
    setGender(val);
    setGenderTa(val === 'Female' ? 'பெண்' : val === 'Male' ? 'ஆண்' : 'மற்றவை');
  };

  const handleRelationChange = (val: string) => {
    setRelation(val);
    switch (val) {
      case 'Head of Household':
        setRelationTa('குடும்பத் தலைவர்');
        break;
      case 'Wife':
      case 'Spouse':
        setRelationTa('மனைவி');
        break;
      case 'Son':
        setRelationTa('மகன்');
        break;
      case 'Daughter':
        setRelationTa('மகள்');
        break;
      case 'Father':
        setRelationTa('தந்தை');
        break;
      case 'Mother':
        setRelationTa('தாய்');
        break;
      default:
        setRelationTa('குடும்ப உறுப்பினர்');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() && !nameTa.trim()) return;

    // Determine avatarType
    let avatarType: 'male_head' | 'female_spouse' | 'boy_son' | 'girl_daughter' | 'generic' = 'generic';
    if (gender === 'Female') {
      avatarType = age < 18 ? 'girl_daughter' : 'female_spouse';
    } else {
      avatarType = age < 18 ? 'boy_son' : 'male_head';
    }

    const newMember: HouseholdMember = {
      id: `member-${Date.now()}`,
      name: name.trim() || nameTa.trim(),
      nameTa: nameTa.trim() || name.trim(),
      relation,
      relationTa,
      age: Number(age) || 1,
      gender,
      genderTa,
      aadhaarLinked: true,
      avatarType,
    };

    onAdd(newMember);
    // Reset fields
    setName('');
    setNameTa('');
    setAge(18);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs select-none animate-in fade-in duration-200">
      <div className="relative w-full max-w-[420px] bg-[#FAF7EF] rounded-[24px] shadow-2xl border border-[#ECE5D8] overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 border-b border-[#ECE5D8] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#E5F1E7] flex items-center justify-center text-[#155B4D]">
              <UserPlus className="w-5 h-5 stroke-[2.2]" />
            </div>
            <h3
              className={`text-[#155B4D] font-bold text-[17px] leading-tight ${
                isTamil ? 'font-tamil' : ''
              }`}
            >
              {t.addMemberModalTitle}
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
          {/* Member Name */}
          <div>
            <label
              className={`block text-[12px] font-bold text-[#155B4D] mb-1.5 ${
                isTamil ? 'font-tamil' : ''
              }`}
            >
              {t.memberNameLabel}
            </label>
            <input
              type="text"
              value={isTamil ? nameTa : name}
              onChange={(e) => {
                if (isTamil) {
                  setNameTa(e.target.value);
                  if (!name) setName(e.target.value);
                } else {
                  setName(e.target.value);
                  if (!nameTa) setNameTa(e.target.value);
                }
              }}
              required
              className="w-full px-3.5 py-2.5 bg-white border border-[#D5DCD2] rounded-xl text-[14px] text-[#202820] font-medium focus:outline-hidden focus:border-[#155B4D] focus:ring-2 focus:ring-[#155B4D]/20 transition-all"
              placeholder={isTamil ? 'எ.கா. காவியா' : 'e.g., Kavya'}
            />
          </div>

          {/* Relationship */}
          <div>
            <label
              className={`block text-[12px] font-bold text-[#155B4D] mb-1.5 ${
                isTamil ? 'font-tamil' : ''
              }`}
            >
              {t.relationLabel}
            </label>
            <select
              value={relation}
              onChange={(e) => handleRelationChange(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white border border-[#D5DCD2] rounded-xl text-[14px] text-[#202820] font-medium focus:outline-hidden focus:border-[#155B4D] focus:ring-2 focus:ring-[#155B4D]/20 transition-all cursor-pointer"
            >
              <option value="Daughter">{isTamil ? 'மகள் (Daughter)' : 'Daughter'}</option>
              <option value="Son">{isTamil ? 'மகன் (Son)' : 'Son'}</option>
              <option value="Wife">{isTamil ? 'மனைவி (Wife)' : 'Wife / Spouse'}</option>
              <option value="Mother">{isTamil ? 'தாய் (Mother)' : 'Mother'}</option>
              <option value="Father">{isTamil ? 'தந்தை (Father)' : 'Father'}</option>
              <option value="Head of Household">{isTamil ? 'குடும்பத் தலைவர் (Head of Household)' : 'Head of Household'}</option>
            </select>
          </div>

          {/* Age & Gender in 2 columns */}
          <div className="grid grid-cols-2 gap-3">
            {/* Age */}
            <div>
              <label
                className={`block text-[12px] font-bold text-[#155B4D] mb-1.5 ${
                  isTamil ? 'font-tamil' : ''
                }`}
              >
                {t.ageInputLabel}
              </label>
              <input
                type="number"
                min="0"
                max="120"
                value={age}
                onChange={(e) => setAge(parseInt(e.target.value, 10) || 0)}
                required
                className="w-full px-3.5 py-2.5 bg-white border border-[#D5DCD2] rounded-xl text-[14px] text-[#202820] font-medium focus:outline-hidden focus:border-[#155B4D] focus:ring-2 focus:ring-[#155B4D]/20 transition-all tabular-nums"
              />
            </div>

            {/* Gender */}
            <div>
              <label
                className={`block text-[12px] font-bold text-[#155B4D] mb-1.5 ${
                  isTamil ? 'font-tamil' : ''
                }`}
              >
                {t.genderInputLabel}
              </label>
              <select
                value={gender}
                onChange={(e) => handleGenderChange(e.target.value as 'Male' | 'Female' | 'Other')}
                className="w-full px-3.5 py-2.5 bg-white border border-[#D5DCD2] rounded-xl text-[14px] text-[#202820] font-medium focus:outline-hidden focus:border-[#155B4D] focus:ring-2 focus:ring-[#155B4D]/20 transition-all cursor-pointer"
              >
                <option value="Male">{isTamil ? 'ஆண் (Male)' : 'Male'}</option>
                <option value="Female">{isTamil ? 'பெண் (Female)' : 'Female'}</option>
                <option value="Other">{isTamil ? 'மற்றவை (Other)' : 'Other'}</option>
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
              {t.addNewMember}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
