import React, { useState } from 'react';
import {
  AlertCircle,
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  Edit3,
  FileText,
  Plus,
  Search,
  Sparkles,
  Trash2,
  UserPlus,
  Users,
} from 'lucide-react';
import { translations } from '../../data/translations';
import { householdService } from '../../services/householdService';
import { HouseholdMember, HouseholdProfile, Language } from '../../types';
import { AddMemberModal } from './AddMemberModal';
import { EditMemberModal } from './EditMemberModal';
import { MemberAvatar } from './MemberAvatar';
import { UpdateHouseholdModal } from './UpdateHouseholdModal';

interface HouseholdManagementPageProps {
  currentLang: Language;
  householdMembers: HouseholdMember[];
  householdProfile: HouseholdProfile;
  onUpdateMembers: (members: HouseholdMember[]) => void;
  onUpdateProfile: (profile: HouseholdProfile) => void;
  onNavigateBack: () => void;
  onOpenLanguage: () => void;
  onNavigateHome: () => void;
  onNavigateToMemberQuestionnaire: (memberId: string) => void;
  onNavigateToCheck: () => void;
}

export const HouseholdManagementPage: React.FC<HouseholdManagementPageProps> = ({
  currentLang,
  householdMembers,
  householdProfile,
  onUpdateMembers,
  onUpdateProfile,
  onNavigateBack,
  onOpenLanguage,
  onNavigateHome,
  onNavigateToMemberQuestionnaire,
  onNavigateToCheck,
}) => {
  const t = translations[currentLang];
  const isTamil = currentLang === 'ta';

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<HouseholdMember | null>(null);
  const [isHouseholdModalOpen, setIsHouseholdModalOpen] = useState(false);
  const [deletingMemberId, setDeletingMemberId] = useState<string | null>(null);

  const completeness = householdService.calculateCompleteness();
  const householdState = householdService.getState();

  const handleSaveEditedMember = (updated: HouseholdMember) => {
    householdService.updateMember(updated.id, updated);
    onUpdateMembers(householdService.getMembers());
    setEditingMember(null);
  };

  const handleConfirmDeleteMember = () => {
    if (!deletingMemberId) return;
    householdService.removeMember(deletingMemberId);
    onUpdateMembers(householdService.getMembers());
    setDeletingMemberId(null);
  };

  const handleAddNewMember = (newMember: HouseholdMember) => {
    householdService.addMember(newMember);
    onUpdateMembers(householdService.getMembers());
    setIsAddModalOpen(false);
  };

  const memberToDelete = householdMembers.find((m) => m.id === deletingMemberId);

  return (
    <div className="w-full max-w-[460px] mx-auto px-4 py-3 pb-8 text-left select-none">
      {/* Top Header Bar */}
      <section className="flex items-center justify-between mb-3">
        <button
          type="button"
          onClick={onNavigateBack}
          className="p-1 -ml-1 text-[#155B4D] hover:bg-[#E5F1E7] rounded-full transition-all cursor-pointer"
          aria-label={t.back}
        >
          <ArrowLeft className="w-6 h-6 stroke-[2.4]" />
        </button>

        <button
          type="button"
          onClick={onNavigateToCheck}
          className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#155B4D] text-white font-bold text-[12px] rounded-full shadow-xs hover:bg-[#10483D] active:scale-95 transition-all cursor-pointer"
        >
          <Search className="w-3.5 h-3.5" />
          <span>{isTamil ? 'தகுதி ஆய்வு' : 'Check Eligibility'}</span>
        </button>
      </section>

      {/* Heading */}
      <section className="mb-4">
        <h1
          className={`text-[#155B4D] font-bold text-[22px] sm:text-[24px] leading-tight tracking-tight ${
            isTamil ? 'font-tamil' : ''
          }`}
        >
          {t.manageHouseholdTitle}
        </h1>
        <p className={`text-[#626A62] text-[13px] leading-snug mt-1 ${isTamil ? 'font-tamil' : ''}`}>
          {t.manageHouseholdDesc}
        </p>
      </section>

      {/* Real Completeness Gauge Card */}
      <section className="bg-white rounded-[20px] border border-[#E0E6E0] p-4 shadow-2xs mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[12.5px] font-bold text-[#155B4D]">
            {isTamil ? 'தகவல் முழுமை நிலை' : 'Profile Completeness'}
          </span>
          <span className="text-[14px] font-extrabold text-[#155B4D]">{completeness.percentage}%</span>
        </div>

        <div className="w-full bg-[#E0E6E0] h-2 rounded-full overflow-hidden mb-2">
          <div
            className="bg-[#155B4D] h-full rounded-full transition-all duration-300"
            style={{ width: `${completeness.percentage}%` }}
          />
        </div>

        <p className="text-[11.5px] text-[#69756F]">
          {completeness.completedCheckpoints} of {completeness.totalCheckpoints} checkpoints verified.
        </p>
      </section>

      {/* Household Level Information Card */}
      <section className="w-full mb-4">
        <div className="w-full bg-[#EFF5EC] rounded-[22px] p-4 border border-[#DFEBE1] shadow-2xs flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-[#E5F1E7] border border-[#D5E6D8] flex items-center justify-center shrink-0">
                <Users className="w-5 h-5 text-[#155B4D]" />
              </div>
              <div>
                <h2 className="text-[#155B4D] font-bold text-[16px] leading-tight">
                  {isTamil ? householdProfile.headNameTa || householdProfile.headName : householdProfile.headName}
                </h2>
                <p className="text-[12px] text-[#55645E] mt-0.5">
                  Ration: {householdProfile.rationCardNumber} • ₹{householdProfile.annualIncome.toLocaleString('en-IN')}/yr
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsHouseholdModalOpen(true)}
              className="p-1.5 bg-white text-[#155B4D] hover:bg-[#FAF7EF] border border-[#D0DED4] rounded-full cursor-pointer shadow-2xs"
              title="Edit Household Details"
            >
              <Edit3 className="w-4 h-4" />
            </button>
          </div>

          <div className="pt-2 border-t border-[#DFEBE1] grid grid-cols-2 gap-2 text-[11.5px] text-[#55645E]">
            <div>Location: {householdProfile.district}, {householdProfile.taluk}</div>
            <div>Housing: {householdProfile.housingType} ({householdProfile.areaType})</div>
          </div>
        </div>
      </section>

      {/* Household Members List */}
      <section className="space-y-3 mb-5">
        <div className="flex items-center justify-between">
          <h2 className="text-[#155B4D] font-bold text-[17px]">
            {t.householdMembersSection} ({householdMembers.length})
          </h2>
          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-1 text-[12px] font-bold text-[#155B4D] hover:underline cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{t.addNewMember}</span>
          </button>
        </div>

        {householdMembers.map((member) => {
          const q = householdState.memberProfiles[member.id];
          const hasCompletedQ = q && q.fullName && q.occupationType;

          return (
            <article
              key={member.id}
              className="w-full bg-white rounded-[20px] p-3.5 border border-[#ECE5D8] shadow-2xs space-y-2.5 transition-all text-left"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <MemberAvatar
                    avatarType={member.avatarType}
                    gender={member.gender}
                    age={member.age}
                    name={member.name}
                    className="w-12 h-12 border border-[#ECE2D2] shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[#202820] font-bold text-[15px] truncate">
                        {isTamil ? member.nameTa || member.name : member.name}
                      </span>
                      <span className="text-[10px] font-semibold bg-[#FEEBB6] text-[#8A6214] px-2 py-0.5 rounded-full">
                        {isTamil ? member.relationTa || member.relation : member.relation}
                      </span>
                    </div>
                    <p className="text-[12px] text-[#626A62] mt-0.5">
                      {isTamil ? `வயது: ${member.age} • ${member.genderTa || member.gender}` : `Age: ${member.age} • ${member.gender}`}
                    </p>
                  </div>
                </div>

                {/* Edit & Remove Controls */}
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={() => setEditingMember(member)}
                    className="p-1.5 text-[#155B4D] hover:bg-[#E5F1E7] rounded-full cursor-pointer"
                    title="Edit Member Basic Info"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  {householdMembers.length > 1 && member.relation !== 'Head of Household' && (
                    <button
                      type="button"
                      onClick={() => setDeletingMemberId(member.id)}
                      className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-full cursor-pointer"
                      title="Remove Member"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Direct Access to Member Questionnaire */}
              <div className="pt-2 border-t border-[#F2ECE0] flex items-center justify-between">
                <span
                  className={`text-[10.5px] font-semibold px-2 py-0.5 rounded-full ${
                    hasCompletedQ
                      ? 'bg-[#E8F3EB] text-[#155B4D]'
                      : 'bg-[#FFF8E6] text-[#A66F00]'
                  }`}
                >
                  {hasCompletedQ
                    ? (isTamil ? '✓ கேள்வித்தாள் பூர்த்தி செய்யப்பட்டது' : '✓ Questionnaire Complete')
                    : (isTamil ? '⚠ கேள்வித்தாள் நிலுவை' : '⚠ Questionnaire Incomplete')}
                </span>

                <button
                  type="button"
                  onClick={() => onNavigateToMemberQuestionnaire(member.id)}
                  className="flex items-center gap-1 text-[12px] font-bold text-[#155B4D] hover:underline cursor-pointer"
                >
                  <span>{hasCompletedQ ? (isTamil ? 'திருத்து' : 'Update Answers') : (isTamil ? 'பூர்த்தி செய்க' : 'Fill Answers')}</span>
                  <ChevronRight className="w-3.5 h-3.5 stroke-[2.4]" />
                </button>
              </div>
            </article>
          );
        })}
      </section>

      {/* Primary Proceed Action */}
      <button
        type="button"
        onClick={onNavigateToCheck}
        className="w-full py-3.5 bg-[#155B4D] hover:bg-[#10483D] active:scale-[0.99] text-white font-bold rounded-[16px] text-[14.5px] flex items-center justify-center gap-2 shadow-sm cursor-pointer transition-all"
      >
        <Sparkles className="w-4.5 h-4.5" />
        <span>{isTamil ? 'தகுதி ஆய்வை தொடங்கு →' : 'Proceed to Eligibility Check →'}</span>
      </button>

      {/* Modals */}
      <AddMemberModal
        isOpen={isAddModalOpen}
        currentLang={currentLang}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddNewMember}
      />

      {editingMember && (
        <EditMemberModal
          isOpen={true}
          currentLang={currentLang}
          member={editingMember}
          onClose={() => setEditingMember(null)}
          onSave={handleSaveEditedMember}
          onDelete={(id: string) => {
            setEditingMember(null);
            setDeletingMemberId(id);
          }}
        />
      )}

      <UpdateHouseholdModal
        isOpen={isHouseholdModalOpen}
        currentLang={currentLang}
        profile={householdProfile}
        onClose={() => setIsHouseholdModalOpen(false)}
        onSave={(prof: HouseholdProfile) => {
          householdService.updateHouseholdProfile(prof);
          onUpdateProfile(prof);
          setIsHouseholdModalOpen(false);
        }}
      />

      {/* Remove Member Confirmation Dialog */}
      {deletingMemberId && (
        <div className="fixed inset-0 z-50 bg-black/45 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-[380px] bg-white rounded-[22px] border border-rose-200 p-5 shadow-2xl text-center animate-in zoom-in-95">
            <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-3">
              <AlertTriangle className="w-6 h-6 stroke-[2.4]" />
            </div>

            <h3 className="font-bold text-[16px] text-[#202820]">
              {isTamil ? 'உறுப்பினரை நீக்க உறுதிப்படுத்துக' : 'Confirm Member Removal'}
            </h3>

            <p className="text-[12px] text-[#69756F] mt-1.5 mb-4 leading-relaxed">
              {isTamil
                ? `'${memberToDelete?.name}' என்ற உறுப்பினரின் விவரங்களை குடும்ப பட்டியலிலிருந்து நீக்க விரும்புகிறீர்களா?`
                : `Are you sure you want to remove '${memberToDelete?.name}' and their questionnaire records?`}
            </p>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setDeletingMemberId(null)}
                className="flex-1 py-2 rounded-[12px] border border-gray-300 text-gray-700 font-bold text-[12.5px] cursor-pointer"
              >
                {isTamil ? 'ரத்து' : 'Cancel'}
              </button>
              <button
                type="button"
                onClick={handleConfirmDeleteMember}
                className="flex-1 py-2 rounded-[12px] bg-rose-600 hover:bg-rose-700 text-white font-bold text-[12.5px] cursor-pointer shadow-xs"
              >
                {isTamil ? 'நீக்கு' : 'Remove'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
