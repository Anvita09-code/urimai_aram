import React, { useEffect, useState } from 'react';
import { Trash2, X } from 'lucide-react';
import { translations } from '../../data/translations';
import { HouseholdMember, Language } from '../../types';
import { MemberAvatar } from './MemberAvatar';

interface EditMemberModalProps {
  isOpen: boolean;
  member: HouseholdMember | null;
  currentLang: Language;
  onSave: (updated: HouseholdMember) => void;
  onDelete: (memberId: string) => void;
  onClose: () => void;
}

export const EditMemberModal: React.FC<EditMemberModalProps> = ({
  isOpen,
  member,
  currentLang,
  onSave,
  onDelete,
  onClose,
}) => {
  const t = translations[currentLang];
  const isTamil = currentLang === 'ta';

  const [name, setName] = useState('');
  const [nameTa, setNameTa] = useState('');
  const [relation, setRelation] = useState('');
  const [relationTa, setRelationTa] = useState('');
  const [age, setAge] = useState<number>(30);
  const [gender, setGender] = useState<'Male' | 'Female' | 'Other'>('Male');
  const [genderTa, setGenderTa] = useState<'ஆண்' | 'பெண்' | 'மற்றவை'>('ஆண்');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    if (member) {
      setName(member.name);
      setNameTa(member.nameTa || member.name);
      setRelation(member.relation);
      setRelationTa(member.relationTa || member.relation);
      setAge(member.age);
      setGender(member.gender || 'Male');
      setGenderTa(member.genderTa || (member.gender === 'Female' ? 'பெண்' : 'ஆண்'));
      setShowDeleteConfirm(false);
    }
  }, [member, isOpen]);

  if (!isOpen || !member) return null;

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
    if (!name.trim()) return;

    onSave({
      ...member,
      name: name.trim(),
      nameTa: nameTa.trim() || name.trim(),
      relation,
      relationTa,
      age: Number(age) || 1,
      gender,
      genderTa,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs select-none animate-in fade-in duration-200">
      <div className="relative w-full max-w-[420px] bg-[#FAF7EF] rounded-[24px] shadow-2xl border border-[#ECE5D8] overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 border-b border-[#ECE5D8] flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <MemberAvatar
              avatarType={member.avatarType}
              gender={gender}
              age={age}
              className="w-10 h-10 border border-[#E5DFD4]"
            />
            <h3
              className={`text-[#155B4D] font-bold text-[17px] leading-tight ${
                isTamil ? 'font-tamil' : ''
              }`}
            >
              {t.editMemberModalTitle}
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
              placeholder={t.memberNamePlaceholder}
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
              <option value="Head of Household">
                {isTamil ? 'குடும்பத் தலைவர் (Head of Household)' : 'Head of Household'}
              </option>
              <option value="Wife">
                {isTamil ? 'மனைவி (Wife)' : 'Wife / Spouse'}
              </option>
              <option value="Son">
                {isTamil ? 'மகன் (Son)' : 'Son'}
              </option>
              <option value="Daughter">
                {isTamil ? 'மகள் (Daughter)' : 'Daughter'}
              </option>
              <option value="Father">
                {isTamil ? 'தந்தை (Father)' : 'Father'}
              </option>
              <option value="Mother">
                {isTamil ? 'தாய் (Mother)' : 'Mother'}
              </option>
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

          {/* Delete confirmation or trigger */}
          <div className="pt-2 border-t border-[#ECE5D8]">
            {!showDeleteConfirm ? (
              <button
                type="button"
                onClick={() => setShowDeleteConfirm(true)}
                className="flex items-center gap-1.5 text-red-600 hover:text-red-700 text-[12.5px] font-semibold transition-colors cursor-pointer py-1"
              >
                <Trash2 className="w-4 h-4 stroke-[2]" />
                <span className={isTamil ? 'font-tamil' : ''}>{t.deleteMember}</span>
              </button>
            ) : (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl space-y-2">
                <p className={`text-[12px] text-red-800 leading-tight ${isTamil ? 'font-tamil' : ''}`}>
                  {t.deleteMemberConfirm}
                </p>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      onDelete(member.id);
                      onClose();
                    }}
                    className="px-3 py-1 bg-red-600 hover:bg-red-700 active:scale-95 text-white rounded-lg text-[12px] font-bold cursor-pointer"
                  >
                    {isTamil ? 'ஆம், நீக்குக' : 'Yes, Remove'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowDeleteConfirm(false)}
                    className="px-3 py-1 bg-white border border-slate-200 text-slate-700 rounded-lg text-[12px] font-medium hover:bg-slate-50 cursor-pointer"
                  >
                    {t.cancelAction}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-2.5 pt-3">
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
