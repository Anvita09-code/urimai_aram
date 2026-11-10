import React, { useState } from 'react';
import { Plus, Trash2, Users, X } from 'lucide-react';
import { HouseholdMember, Language } from '../../../types';
export type { HouseholdMember };

interface HouseholdModalProps {
  isOpen: boolean;
  currentLang: Language;
  members: HouseholdMember[];
  onSaveMembers: (members: HouseholdMember[]) => void;
  onClose: () => void;
}

export const HouseholdModal: React.FC<HouseholdModalProps> = ({
  isOpen,
  currentLang,
  members,
  onSaveMembers,
  onClose,
}) => {
  const [localMembers, setLocalMembers] = useState<HouseholdMember[]>(members);
  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState('');
  const [newNameTa, setNewNameTa] = useState('');
  const [newRelation, setNewRelation] = useState('Daughter');
  const [newRelationTa, setNewRelationTa] = useState('மகள்');
  const [newAge, setNewAge] = useState('16');

  if (!isOpen) return null;
  const isTamil = currentLang === 'ta';

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const newMember: HouseholdMember = {
      id: `member-${Date.now()}`,
      name: newName.trim(),
      nameTa: newNameTa.trim() || newName.trim(),
      relation: newRelation,
      relationTa: newRelationTa,
      age: parseInt(newAge, 10) || 18,
      gender: newRelation.toLowerCase().includes('daughter') || newRelation.toLowerCase().includes('wife') ? 'Female' : 'Male',
      genderTa: newRelation.toLowerCase().includes('daughter') || newRelation.toLowerCase().includes('wife') ? 'பெண்' : 'ஆண்',
      aadhaarLinked: true,
    };

    const updated = [...localMembers, newMember];
    setLocalMembers(updated);
    onSaveMembers(updated);
    setIsAdding(false);
    setNewName('');
    setNewNameTa('');
  };

  const handleRemoveMember = (id: string) => {
    const updated = localMembers.filter((m) => m.id !== id);
    setLocalMembers(updated);
    onSaveMembers(updated);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/45 backdrop-blur-xs transition-opacity animate-in fade-in duration-150">
      <div className="w-full max-w-md bg-[#FAF7F0] rounded-t-[28px] sm:rounded-[28px] p-5 shadow-2xl border border-[#E8E1D2] animate-in slide-in-from-bottom duration-200 max-h-[90vh] flex flex-col">
        {/* Handle bar on mobile */}
        <div className="w-10 h-1 bg-[#D3CABB] rounded-full mx-auto mb-3 sm:hidden shrink-0" />

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#ECE5D8] shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-[#E5F1E7] border border-[#D5E6D8] flex items-center justify-center text-[#155B4D]">
              <Users className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <h2 className="text-[17px] font-bold text-[#155B4D] leading-tight">
                {isTamil ? 'என் குடும்ப உறுப்பினர்கள்' : 'My Household Details'}
              </h2>
              <span className="text-[12px] text-[#626A62]">
                {isTamil ? 'ரேஷன் அட்டை எண்: 03/G/0892415' : 'Smart Ration Card: 03/G/0892415'}
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

        {/* Household Overview Pills */}
        <div className="grid grid-cols-2 gap-2 my-3 shrink-0">
          <div className="bg-white rounded-xl p-2.5 border border-[#ECE5D8]">
            <span className="text-[11px] text-[#7A827E] block">{isTamil ? 'ஆண்டு குடும்ப வருமானம்' : 'Annual Income'}</span>
            <span className="text-[14px] font-bold text-[#155B4D]">₹96,000 / yr</span>
          </div>
          <div className="bg-white rounded-xl p-2.5 border border-[#ECE5D8]">
            <span className="text-[11px] text-[#7A827E] block">{isTamil ? 'இருப்பிடம்' : 'District'}</span>
            <span className="text-[14px] font-bold text-[#155B4D]">{isTamil ? 'மதுரை, தமிழ்நாடு' : 'Madurai, TN'}</span>
          </div>
        </div>

        {/* Members List */}
        <div className="space-y-2.5 overflow-y-auto pr-1 flex-1 py-1">
          {localMembers.map((m) => (
            <div
              key={m.id}
              className="bg-white rounded-2xl p-3 border border-[#ECE5D8] flex items-center justify-between gap-3 shadow-2xs"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#FAF7EF] border border-[#E5DFD4] text-[#155B4D] flex items-center justify-center font-bold text-xs">
                  {isTamil ? m.nameTa.charAt(0) : m.name.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-[14px] text-[#202820]">
                    {isTamil ? m.nameTa : m.name}
                  </div>
                  <div className="text-[11.5px] text-[#626A62]">
                    {isTamil ? `${m.relationTa} • ${m.age} வயது` : `${m.relation} • Age ${m.age}`}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] font-semibold text-[#155B4D] bg-[#E5F1E7] px-2 py-0.5 rounded-full">
                  {isTamil ? 'ஆதார் இணைந்தது' : 'Aadhaar Seeded'}
                </span>
                {localMembers.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveMember(m.id)}
                    className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title={isTamil ? 'நீக்குக' : 'Remove'}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))}

          {/* Add Member Form */}
          {isAdding ? (
            <form onSubmit={handleAddMember} className="bg-white rounded-2xl p-3.5 border border-[#155B4D]/30 space-y-2.5">
              <h4 className="text-[13px] font-bold text-[#155B4D]">
                {isTamil ? 'புதிய உறுப்பினர் சேர்த்தல்' : 'Add New Member'}
              </h4>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Name (English)"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full text-xs p-2 bg-[#FAF7EF] border border-[#ECE5D8] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#155B4D]"
                  required
                />
                <input
                  type="text"
                  placeholder="பெயர் (தமிழ்)"
                  value={newNameTa}
                  onChange={(e) => setNewNameTa(e.target.value)}
                  className="w-full text-xs p-2 bg-[#FAF7EF] border border-[#ECE5D8] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#155B4D]"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <select
                  value={newRelation}
                  onChange={(e) => {
                    setNewRelation(e.target.value);
                    const map: Record<string, string> = {
                      Spouse: 'மனைவி/கணவர்',
                      Daughter: 'மகள்',
                      Son: 'மகன்',
                      Parent: 'தந்தை/தாய்',
                      Other: 'உறவினர்',
                    };
                    setNewRelationTa(map[e.target.value] || 'உறவினர்');
                  }}
                  className="w-full text-xs p-2 bg-[#FAF7EF] border border-[#ECE5D8] rounded-xl focus:outline-none"
                >
                  <option value="Daughter">Daughter / மகள்</option>
                  <option value="Son">Son / மகன்</option>
                  <option value="Spouse">Spouse / மனைவி</option>
                  <option value="Parent">Parent / பெற்றோர்</option>
                  <option value="Other">Other / உறவினர்</option>
                </select>
                <input
                  type="number"
                  placeholder="Age / வயது"
                  value={newAge}
                  onChange={(e) => setNewAge(e.target.value)}
                  className="w-full text-xs p-2 bg-[#FAF7EF] border border-[#ECE5D8] rounded-xl focus:outline-none"
                  min="1"
                  max="120"
                />
              </div>
              <div className="flex gap-2 pt-1">
                <button
                  type="submit"
                  className="flex-1 py-2 bg-[#155B4D] text-white text-xs font-bold rounded-xl active:scale-98"
                >
                  {isTamil ? 'சேமிக்க' : 'Save'}
                </button>
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="px-3 py-2 bg-gray-100 text-[#555C58] text-xs font-bold rounded-xl"
                >
                  {isTamil ? 'ரத்து' : 'Cancel'}
                </button>
              </div>
            </form>
          ) : (
            <button
              type="button"
              onClick={() => setIsAdding(true)}
              className="w-full py-2.5 bg-white border border-dashed border-[#155B4D]/40 text-[#155B4D] text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 hover:bg-[#FAF7EF] active:scale-98 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>{isTamil ? 'உறுப்பினரைச் சேர்க்க' : 'Add Household Member'}</span>
            </button>
          )}
        </div>

        {/* Close Button */}
        <div className="pt-3 border-t border-[#ECE5D8] shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 bg-[#155B4D] hover:bg-[#11493e] text-white font-bold text-[13.5px] rounded-xl active:scale-98 transition-all shadow-xs"
          >
            {isTamil ? 'முடிந்தது' : 'Done'}
          </button>
        </div>
      </div>
    </div>
  );
};
