import React, { useState } from 'react';
import { ArrowLeft, ChevronRight, Edit3, Plus, UserPlus } from 'lucide-react';
import { translations } from '../../data/translations';
import { HouseholdMember, HouseholdProfile, Language } from '../../types';
import { DashboardHeader } from '../Dashboard/DashboardHeader';
import { NotificationDrawer } from '../Dashboard/modals/NotificationDrawer';
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
  onNavigateToProfile?: () => void;
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
  onNavigateToProfile,
}) => {
  const t = translations[currentLang];
  const isTamil = currentLang === 'ta';

  // Modal display states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<HouseholdMember | null>(null);
  const [isHouseholdModalOpen, setIsHouseholdModalOpen] = useState(false);
  const [isNotificationDrawerOpen, setIsNotificationDrawerOpen] = useState(false);

  // Handle member actions
  const handleSaveEditedMember = (updated: HouseholdMember) => {
    const next = householdMembers.map((m) => (m.id === updated.id ? updated : m));
    onUpdateMembers(next);
  };

  const handleDeleteMember = (memberId: string) => {
    const next = householdMembers.filter((m) => m.id !== memberId);
    onUpdateMembers(next);
  };

  const handleAddNewMember = (newMember: HouseholdMember) => {
    const next = [...householdMembers, newMember];
    onUpdateMembers(next);
  };

  return (
    <div className="relative w-full mx-auto min-h-screen bg-[#FAF7EF] text-[#202820] flex flex-col justify-between overflow-x-hidden pt-1 pb-6 antialiased select-none">
      {/* Main Content Area */}
      <main className="w-full flex-1 flex flex-col justify-start px-4 sm:px-5 pb-4">
        {/* =========================================================================
            2. BRAND HEADER with Logo, Language Selector & Notification Bell
           ========================================================================= */}
        <div className="-mx-4 sm:-mx-5">
          <DashboardHeader
            currentLang={currentLang}
            unreadCount={2}
            onOpenLanguage={onOpenLanguage}
            onOpenNotifications={() => setIsNotificationDrawerOpen(true)}
            onNavigateHome={onNavigateHome}
          />
        </div>

        {/* =========================================================================
            3. BACK NAVIGATION & PAGE HEADING AREA
           ========================================================================= */}
        <section className="pt-3 pb-4">
          <div className="flex items-center gap-2.5">
            {/* Back Button Arrow */}
            <button
              type="button"
              onClick={onNavigateBack}
              className="p-1 -ml-1 text-[#155B4D] hover:text-[#11493e] active:scale-90 transition-all cursor-pointer rounded-full"
              aria-label="Back to Dashboard"
            >
              <ArrowLeft className="w-6 h-6 stroke-[2.6]" />
            </button>

            {/* Main Page Heading */}
            <h1
              className={`text-[#155B4D] font-bold text-[22px] sm:text-[24px] leading-tight tracking-tight ${
                isTamil ? 'font-tamil' : ''
              }`}
            >
              {t.manageHouseholdTitle}
            </h1>
          </div>

          {/* Supporting Description */}
          <p
            className={`text-[#626A62] text-[13px] sm:text-[13.5px] leading-[1.45] mt-2 max-w-[360px] ${
              isTamil ? 'font-tamil' : ''
            }`}
          >
            {t.manageHouseholdDesc}
          </p>
        </section>

        {/* =========================================================================
            4. SECTION D — HOUSEHOLD SUMMARY CARD (PROFESSIONAL 2-TIER STACKED LAYOUT)
            - Top Tier: [ Household Icon (52px) ] [ Heading ("My Household" / "என் குடும்பம்") + Member Count ]
            - Bottom Tier: [ ✏️ Update Household Details Button (Placed beneath with full width & professional spacing) ]
            - Zero collision, balanced breathing room, clean alignment on all viewports
           ========================================================================= */}
        <section className="w-full mb-5">
          <div className="w-full bg-[#EFF5EC] rounded-[24px] sm:rounded-[28px] p-4 sm:p-5 border border-[#DFEBE1] shadow-[0_2px_10px_rgba(21,91,77,0.04)] flex flex-col gap-3.5 sm:gap-4 box-border">
            {/* Top Tier: Household Icon + Information */}
            <div className="w-full flex items-center gap-3.5 sm:gap-4">
              {/* Left: Household Icon Container */}
              <div className="w-[52px] h-[52px] sm:w-[58px] sm:h-[58px] rounded-2xl bg-[#E5F1E7] border border-[#D5E6D8] flex items-center justify-center shrink-0 shadow-2xs">
                <svg
                  className="w-6.5 h-6.5 sm:w-7 sm:h-7 text-[#155B4D]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>

              {/* Centre: Household Heading & Member Count */}
              <div className="min-w-0 flex-1 flex flex-col justify-center text-left">
                <h2
                  className={`text-[#155B4D] font-bold text-[18px] sm:text-[20px] leading-tight tracking-tight ${
                    isTamil ? 'font-tamil' : ''
                  }`}
                >
                  {t.myHousehold}
                </h2>
                <div className="flex items-baseline gap-1.5 mt-1 text-[#626A62] text-[13.5px] sm:text-[14.5px] font-normal leading-tight">
                  <span className="text-[#155B4D] font-bold text-[15px] sm:text-[16px]">
                    {householdMembers.length}
                  </span>
                  <span className={isTamil ? 'font-tamil' : ''}>
                    {isTamil ? 'உறுப்பினர்கள்' : 'Members'}
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Tier: Update Household Details Action Button Beneath */}
            <button
              type="button"
              onClick={() => setIsHouseholdModalOpen(true)}
              className="w-full px-4 py-2.5 sm:py-3 bg-white hover:bg-[#FAF7EF] active:scale-[0.99] border-[1.5px] border-[#155B4D] rounded-full text-[#155B4D] flex items-center justify-between gap-2 transition-all cursor-pointer shadow-2xs box-border"
              aria-label={t.updateHouseholdDetails}
            >
              {/* Left: Pencil icon + Full label */}
              <div className="flex items-center gap-2 min-w-0">
                <Edit3 className="w-4 h-4 text-[#155B4D] stroke-[2.2] shrink-0" />
                <span
                  className={`font-bold text-[#155B4D] text-[13px] sm:text-[14px] leading-tight ${
                    isTamil ? 'font-tamil' : ''
                  }`}
                >
                  {t.updateHouseholdDetails}
                </span>
              </div>

              {/* Right: Chevron */}
              <ChevronRight className="w-4 h-4 text-[#155B4D] stroke-[2.5] shrink-0" />
            </button>
          </div>
        </section>

        {/* =========================================================================
            5. SECTION E — HOUSEHOLD MEMBERS SECTION HEADING
           ========================================================================= */}
        <section className="w-full mb-3">
          <h2
            className={`text-[#155B4D] font-bold text-[18px] sm:text-[19px] leading-tight text-left ${
              isTamil ? 'font-tamil' : ''
            }`}
          >
            {t.householdMembersSection}
          </h2>
        </section>

        {/* =========================================================================
            6. SECTION F — HOUSEHOLD MEMBER CARDS LIST (4 Individual Cards)
           ========================================================================= */}
        <section className="w-full space-y-2.5 sm:space-y-3 mb-3">
          {householdMembers.map((member) => {
            const displayName = isTamil ? member.nameTa || member.name : member.name;
            const displayRelation = isTamil
              ? member.relationTa || member.relation
              : member.relation;
            const displayGender = isTamil
              ? member.genderTa || (member.gender === 'Female' ? 'பெண்' : 'ஆண்')
              : member.gender || 'Male';

            return (
              <article
                key={member.id}
                onClick={() => setEditingMember(member)}
                className="w-full bg-white hover:bg-[#FFFDF9] active:scale-[0.99] rounded-[22px] p-3 sm:p-3.5 border border-[#ECE5D8] shadow-2xs flex items-center justify-between gap-3 transition-all cursor-pointer group"
              >
                {/* 1. Left: Circular Illustrated Avatar */}
                <MemberAvatar
                  avatarType={member.avatarType}
                  gender={member.gender}
                  age={member.age}
                  name={displayName}
                  className="w-13 h-13 sm:w-14 sm:h-14 border border-[#ECE2D2] shadow-2xs group-hover:scale-102 transition-transform"
                />

                {/* 2. Centre: Name, Relationship Badge & Personal Details */}
                <div className="min-w-0 flex-1 flex flex-col justify-center">
                  {/* Top Row: Name and Relationship Badge */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span
                      className={`text-[#202820] font-bold text-[15px] sm:text-[16px] leading-tight truncate ${
                        isTamil ? 'font-tamil' : ''
                      }`}
                    >
                      {displayName}
                    </span>

                    {/* Relationship Badge */}
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] sm:text-[11.5px] font-semibold bg-[#FEEBB6] text-[#8A6214] whitespace-nowrap shadow-2xs ${
                        isTamil ? 'font-tamil' : ''
                      }`}
                    >
                      {displayRelation}
                    </span>
                  </div>

                  {/* Bottom Row: Age and Gender Details */}
                  <div
                    className={`text-[#626A62] text-[12.5px] sm:text-[13px] font-normal leading-tight mt-1 ${
                      isTamil ? 'font-tamil' : ''
                    }`}
                  >
                    {isTamil ? (
                      <span>
                        வயது: {member.age} &nbsp;|&nbsp; {displayGender}
                      </span>
                    ) : (
                      <span>
                        Age: {member.age} &nbsp;|&nbsp; {displayGender}
                      </span>
                    )}
                  </div>
                </div>

                {/* 3. Right: Circular Edit Icon Button & Chevron */}
                <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
                  {/* Edit Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingMember(member);
                    }}
                    className="w-8.5 h-8.5 sm:w-9 sm:h-9 rounded-full bg-[#E5F1E7] border border-[#D5E6D8] flex items-center justify-center text-[#155B4D] hover:bg-[#d5ebd9] active:scale-90 transition-all cursor-pointer shadow-2xs"
                    aria-label={`Edit ${displayName}`}
                  >
                    <Edit3 className="w-4 h-4 stroke-[2]" />
                  </button>

                  {/* Chevron Right */}
                  <ChevronRight className="w-5 h-5 text-[#155B4D] stroke-[2.4] group-hover:translate-x-0.5 transition-transform" />
                </div>
              </article>
            );
          })}

          {/* =========================================================================
              7. SECTION H — ADD NEW MEMBER CARD (Dashed-Outline Card)
             ========================================================================= */}
          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="w-full bg-white/70 hover:bg-white active:scale-[0.99] rounded-[20px] p-3 sm:p-3.5 border-2 border-dashed border-[#CFDDC7] flex items-center justify-between gap-3 transition-all cursor-pointer group"
          >
            {/* Left: Pale Green Plus Icon Container */}
            <div className="w-10 h-10 rounded-full bg-[#E5F1E7] flex items-center justify-center text-[#155B4D] group-hover:scale-105 transition-transform shrink-0">
              <Plus className="w-5 h-5 stroke-[2.4]" />
            </div>

            {/* Centre: Add New Member Label */}
            <span
              className={`text-[14.5px] sm:text-[15.5px] font-bold text-[#155B4D] flex-1 text-left ${
                isTamil ? 'font-tamil' : ''
              }`}
            >
              {t.addNewMember}
            </span>

            {/* Right: Chevron */}
            <ChevronRight className="w-5 h-5 text-[#155B4D] stroke-[2.4] group-hover:translate-x-0.5 transition-transform shrink-0" />
          </button>
        </section>

        {/* =========================================================================
            8. SECTION I — PRIMARY HOUSEHOLD ACTION CTA
           ========================================================================= */}
        <section className="w-full pt-2 pb-2 mt-auto">
          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="w-full bg-[#155B4D] hover:bg-[#11493e] active:scale-[0.99] text-white rounded-[16px] py-3.5 sm:py-4 px-6 flex items-center justify-center gap-2.5 font-bold text-[15px] sm:text-[16px] shadow-sm transition-all cursor-pointer group"
          >
            <UserPlus className="w-5 h-5 stroke-[2.2] text-white group-hover:scale-105 transition-transform" />
            <span className={isTamil ? 'font-tamil' : ''}>
              {t.addHouseholdMemberCTA}
            </span>
          </button>
        </section>
      </main>

      {/* =========================================================================
          INTERACTIVE MODALS
         ========================================================================= */}
      {/* 1. Edit Member Modal */}
      <EditMemberModal
        isOpen={editingMember !== null}
        member={editingMember}
        currentLang={currentLang}
        onSave={handleSaveEditedMember}
        onDelete={handleDeleteMember}
        onClose={() => setEditingMember(null)}
      />

      {/* 2. Add Member Modal */}
      <AddMemberModal
        isOpen={isAddModalOpen}
        currentLang={currentLang}
        onAdd={handleAddNewMember}
        onClose={() => setIsAddModalOpen(false)}
      />

      {/* 3. Update Household Profile Modal */}
      <UpdateHouseholdModal
        isOpen={isHouseholdModalOpen}
        currentLang={currentLang}
        profile={householdProfile}
        onSave={onUpdateProfile}
        onClose={() => setIsHouseholdModalOpen(false)}
        onNavigateToProfile={onNavigateToProfile}
      />

      {/* 4. Notification Drawer */}
      <NotificationDrawer
        isOpen={isNotificationDrawerOpen}
        currentLang={currentLang}
        notifications={[
          {
            id: 'notif-1',
            titleEn: 'Household Record Verified',
            titleTa: 'குடும்ப விவரங்கள் சரிபார்க்கப்பட்டது',
            descEn: 'Civil supplies database synchronized for 4 members.',
            descTa: '4 உறுப்பினர்களுக்கான ஸ்மார்ட் குடும்ப அட்டை தகவல் புதுப்பிக்கப்பட்டது.',
            timeEn: '10m ago',
            timeTa: '10 நிமிடங்களுக்கு முன்',
            read: false,
            type: 'scheme',
          },
        ]}
        onMarkAllRead={() => {}}
        onSelectNotification={() => {}}
        onClose={() => setIsNotificationDrawerOpen(false)}
      />
    </div>
  );
};
