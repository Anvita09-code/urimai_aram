import React, { useState } from 'react';
import {
  ArrowLeft,
  Check,
  ChevronRight,
  GraduationCap,
  HeartPulse,
  Home,
  Search,
  Sprout,
  Users,
} from 'lucide-react';
import { translations } from '../../data/translations';
import { HouseholdMember, HouseholdProfile, Language } from '../../types';
import { DashboardHeader } from '../Dashboard/DashboardHeader';
import { CitizenNotification, NotificationDrawer } from '../Dashboard/modals/NotificationDrawer';

export interface SchemeDiscoveryPageProps {
  currentLang: Language;
  householdProfile?: HouseholdProfile;
  householdMembers?: HouseholdMember[];
  onNavigateBack: () => void;
  onNavigateHome: () => void;
  onNavigateToHousehold: () => void;
  onOpenLanguage: () => void;
  onStartEvaluation: (selectedCategories: string[]) => void;
}

export type CategoryId =
  | 'income'
  | 'education'
  | 'health'
  | 'housing'
  | 'agriculture'
  | 'social'
  | 'women'
  | 'senior'
  | 'disability';

/* Custom High-Fidelity SVGs matching reference image 00190097 exactly */

// 1. Hand holding / receiving Rupee coin
const HandRupeeIcon: React.FC<{ className?: string }> = ({ className = 'w-8 h-8' }) => (
  <svg
    viewBox="0 0 40 40"
    fill="none"
    stroke="currentColor"
    className={className}
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Rupee Coin floating above hand */}
    <circle cx="20" cy="11" r="6.5" />
    <text
      x="20"
      y="14.5"
      textAnchor="middle"
      fill="currentColor"
      stroke="none"
      fontSize="8.5"
      fontWeight="700"
      fontFamily="system-ui, sans-serif"
    >
      ₹
    </text>
    {/* Hand silhouette underneath */}
    <path d="M7 26.5c2.5-1 6-2 10-2 4 0 6.5 1.5 9 2.5l5.5 1.5c1.8.5 3 2 3 3.8 0 2.2-1.8 4-4 4H18c-3.5 0-7-1.5-9.5-3.5L5 30" />
    <path d="M14 24.5v-2c0-1.2.9-2.2 2-2.3 1.2 0 2.2.9 2.3 2.1l.1 2.2" />
  </svg>
);

// 2. Women's Welfare icon
const WomanIcon: React.FC<{ className?: string }> = ({ className = 'w-8 h-8' }) => (
  <svg
    viewBox="0 0 40 40"
    fill="none"
    stroke="currentColor"
    className={className}
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Head & face */}
    <circle cx="20" cy="13" r="5.5" />
    {/* Hair parting / styled contour */}
    <path d="M14 13.5c0-4 2.5-7 6-7s6 3 6 7c0 3-1.5 5.5-2.5 6.5" />
    <path d="M14 13.5c1 3.5 1.5 5.5 2.5 6.5" />
    {/* Shoulders & upper torso */}
    <path d="M9 32c0-5 5-9 11-9s11 4 11 9" />
  </svg>
);

// 3. Senior Citizen with Cane icon
const SeniorWithCaneIcon: React.FC<{ className?: string }> = ({ className = 'w-8 h-8' }) => (
  <svg
    viewBox="0 0 40 40"
    fill="none"
    stroke="currentColor"
    className={className}
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Head */}
    <circle cx="22" cy="10" r="3.5" />
    {/* Curved back and torso walking */}
    <path d="M22 13.5c-3 1.5-5 4.5-5 8.5 0 2.5 1.5 5 3 7.5l-2 5.5" />
    <path d="M20 22l3 5 3 8" />
    {/* Arm holding cane */}
    <path d="M18 19l4.5 3.5 2.5 5.5" />
    {/* Walking Cane / Stick */}
    <path d="M27 24v11" />
    <path d="M25 24c0-1 1-2 2-2s2 1 2 2" />
  </svg>
);

// 4. Disability / Wheelchair Accessibility icon
const DisabilityIcon: React.FC<{ className?: string }> = ({ className = 'w-8 h-8' }) => (
  <svg
    viewBox="0 0 40 40"
    fill="none"
    stroke="currentColor"
    className={className}
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Head */}
    <circle cx="21" cy="10" r="3" />
    {/* Torso & spine */}
    <path d="M21 14v8l5 2" />
    {/* Arm reaching forward */}
    <path d="M21 17h5l3 5" />
    {/* Wheelchair Wheel */}
    <circle cx="17" cy="26" r="6" />
    {/* Footrest / leg */}
    <path d="M26 24l2 7h3" />
  </svg>
);

export const SchemeDiscoveryPage: React.FC<SchemeDiscoveryPageProps> = ({
  currentLang,
  householdProfile,
  householdMembers = [],
  onNavigateBack,
  onNavigateHome,
  onNavigateToHousehold,
  onOpenLanguage,
  onStartEvaluation,
}) => {
  const t = translations[currentLang];
  const isTamil = currentLang === 'ta';

  // Exact reference initial state:
  // Selected: Income (1), Healthcare (3), Agriculture (5)
  // Unselected: Education (2), Housing (4), Social Security (6), Women (7), Senior (8), Disability (9)
  const [selectedCategories, setSelectedCategories] = useState<CategoryId[]>([
    'income',
    'health',
    'agriculture',
  ]);

  const [isNotificationDrawerOpen, setIsNotificationDrawerOpen] = useState(false);
  const [notifications, setNotifications] = useState<CitizenNotification[]>([
    {
      id: 'notif-1',
      titleEn: 'CMCHIS Health Card Active',
      titleTa: 'CMCHIS மருத்துவ காப்பீடு புதுப்பிக்கப்பட்டது',
      descEn: 'Your family cashless limit of ₹5 Lakhs is active across empanelled hospitals.',
      descTa: 'உங்கள் குடும்பத்திற்கான ₹5 லட்சம் மருத்துவ சிகிச்சை அட்டை பயன்பாட்டில் உள்ளது.',
      timeEn: '2 hours ago',
      timeTa: '2 மணி நேரத்திற்கு முன்',
      read: false,
      type: 'scheme',
    },
    {
      id: 'notif-2',
      titleEn: 'Pudhumai Penn Verification Window Open',
      titleTa: 'புதுமைப் பெண் கல்வி உதவித்தொகை சரிபார்ப்பு',
      descEn: 'Priya’s 2nd year undergraduate attendance verification submitted by college.',
      descTa: 'மகள் பிரியாவின் கல்லூரி வருகைப் பதிவு வெற்றிகரமாக சரிபார்க்கப்பட்டது.',
      timeEn: 'Yesterday',
      timeTa: 'நேற்று',
      read: false,
      type: 'document',
    },
  ]);

  const toggleCategory = (id: CategoryId) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const handleStartEvaluationClick = () => {
    onStartEvaluation(selectedCategories);
  };

  // 9 Categories arranged in 3x3 grid matching reference image 00190097
  const categories: {
    id: CategoryId;
    labelTa: React.ReactNode;
    labelEn: string;
    renderIcon: () => React.ReactNode;
  }[] = [
    {
      id: 'income',
      labelTa: (
        <>
          <span className="block">வருமானம் &</span>
          <span className="block">வாழ்வாதாரம்</span>
        </>
      ),
      labelEn: t.discCatIncomeLivelihood,
      renderIcon: () => <HandRupeeIcon className="w-6 h-6 sm:w-7 sm:h-7" />,
    },
    {
      id: 'education',
      labelTa: <span className="block">கல்வி</span>,
      labelEn: t.discCatEducation,
      renderIcon: () => <GraduationCap className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.2]" />,
    },
    {
      id: 'health',
      labelTa: <span className="block">சுகாதாரம்</span>,
      labelEn: t.discCatHealthcare,
      renderIcon: () => <HeartPulse className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.2]" />,
    },
    {
      id: 'housing',
      labelTa: <span className="block">வீடு & குடியிருப்பு</span>,
      labelEn: t.discCatHousingAccommodation,
      renderIcon: () => <Home className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.2]" />,
    },
    {
      id: 'agriculture',
      labelTa: <span className="block">விவசாயம்</span>,
      labelEn: t.discCatAgriculture,
      renderIcon: () => <Sprout className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.2]" />,
    },
    {
      id: 'social',
      labelTa: <span className="block">சமூக பாதுகாப்பு</span>,
      labelEn: t.discCatSocialSecurity,
      renderIcon: () => <Users className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.2]" />,
    },
    {
      id: 'women',
      labelTa: (
        <>
          <span className="block">பெண்கள்</span>
          <span className="block">நலன்</span>
        </>
      ),
      labelEn: t.discCatWomensWelfare,
      renderIcon: () => <WomanIcon className="w-6 h-6 sm:w-7 sm:h-7" />,
    },
    {
      id: 'senior',
      labelTa: <span className="block">மூத்தோர் நலன்</span>,
      labelEn: t.discCatSeniorWelfare,
      renderIcon: () => <SeniorWithCaneIcon className="w-6 h-6 sm:w-7 sm:h-7" />,
    },
    {
      id: 'disability',
      labelTa: (
        <>
          <span className="block">மாற்றுத் திறனாளிகள்</span>
          <span className="block">நலன்</span>
        </>
      ),
      labelEn: t.discCatDisabilityWelfare,
      renderIcon: () => <DisabilityIcon className="w-6 h-6 sm:w-7 sm:h-7" />,
    },
  ];

  // Dynamic household values with fallback to reference screen defaults
  const householdId = householdProfile?.rationCardNumber
    ? householdProfile.rationCardNumber.replace(/[^a-zA-Z0-9]/g, '').slice(0, 10).toUpperCase()
    : 'HH24001567';
  const memberCount = householdMembers.length > 0 ? householdMembers.length : 4;

  return (
    <div className="relative w-full mx-auto min-h-screen bg-[#FAF8F2] text-[#202321] flex flex-col justify-between overflow-x-hidden pt-1 pb-6 antialiased select-none">
      {/* Main Content Area */}
      <main className="w-full flex-1 flex flex-col justify-start px-3 min-[360px]:px-4 sm:px-5 pb-4">
        {/* =========================================================================
            2. APPLICATION HEADER with Logo, Language Selector & Notification Bell
           ========================================================================= */}
        <div className="-mx-3 min-[360px]:-mx-4 sm:-mx-5">
          <DashboardHeader
            currentLang={currentLang}
            unreadCount={notifications.filter((n) => !n.read).length}
            onOpenLanguage={onOpenLanguage}
            onOpenNotifications={() => setIsNotificationDrawerOpen(true)}
            onNavigateHome={onNavigateHome}
          />
        </div>

        {/* =========================================================================
            3. SCHEME DISCOVERY HERO SECTION: Back Navigation, Heading & Description
           ========================================================================= */}
        <section className="w-full mt-3 sm:mt-4 mb-3.5">
          <div className="flex items-start gap-2.5 sm:gap-3">
            <button
              type="button"
              onClick={onNavigateBack}
              className="mt-0.5 p-1 -ml-1 text-[#155B4D] hover:bg-[#E5F1E7]/60 active:scale-95 rounded-full transition-all cursor-pointer shrink-0"
              aria-label={t.back}
            >
              <ArrowLeft className="w-5.5 h-5.5 sm:w-6 sm:h-6 stroke-[2.4]" />
            </button>

            <div className="flex-1 flex flex-col">
              <h1
                className={`text-[#155B4D] font-bold text-[22px] sm:text-[25px] leading-[1.25] tracking-tight text-left ${
                  isTamil ? 'font-tamil' : ''
                }`}
              >
                {t.schemeDiscoveryTitle}
              </h1>

              <p
                className={`text-[#59635F] text-[13px] sm:text-[14px] font-normal leading-snug mt-1.5 text-left ${
                  isTamil ? 'font-tamil' : ''
                }`}
              >
                {t.schemeDiscoveryDesc}
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            4. SELECTED HOUSEHOLD SUMMARY CARD
           ========================================================================= */}
        <button
          type="button"
          onClick={onNavigateToHousehold}
          className="w-full bg-[#EFF6ED] rounded-[18px] sm:rounded-[20px] p-3.5 sm:p-4 border border-[#D5E6D7] shadow-2xs flex items-center gap-3 sm:gap-3.5 cursor-pointer hover:bg-[#E7F0E5] active:scale-[0.99] transition-all text-left mb-5"
        >
          {/* Household People Icon Container */}
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-[14px] bg-[#E5F1E7] text-[#155B4D] flex items-center justify-center shrink-0">
            <Users className="w-6 h-6 stroke-[2.2]" />
          </div>

          {/* Household Title & Identifiers */}
          <div className="flex-1 flex flex-col min-w-0 pr-1">
            <h2
              className={`text-[#1E2522] font-bold text-[15px] sm:text-[16px] leading-tight truncate ${
                isTamil ? 'font-tamil' : ''
              }`}
            >
              {t.selectedHouseholdTitle}
            </h2>

            <p
              className={`text-[#5A6660] text-[12.5px] sm:text-[13px] leading-snug mt-1 truncate ${
                isTamil ? 'font-tamil' : ''
              }`}
            >
              {t.selectedHouseholdIdPrefix}: {householdId} | {t.selectedHouseholdMembersPrefix}:{' '}
              {memberCount}
            </p>
          </div>

          {/* Navigation Chevron */}
          <ChevronRight className="w-5 h-5 text-[#2A332E] stroke-[2.2] shrink-0" />
        </button>

        {/* =========================================================================
            5. CATEGORY SELECTION HEADING & DESCRIPTION
           ========================================================================= */}
        <section className="w-full mb-3 text-left">
          <h2
            className={`text-[#155B4D] font-bold text-[18px] sm:text-[20px] leading-[1.25] tracking-tight ${
              isTamil ? 'font-tamil' : ''
            }`}
          >
            {t.interestSectionTitle}
          </h2>

          <p
            className={`text-[#59635F] text-[12.5px] sm:text-[13.5px] font-normal leading-snug mt-1 ${
              isTamil ? 'font-tamil' : ''
            }`}
          >
            {t.interestSectionDesc}
          </p>
        </section>

        {/* =========================================================================
            6. NINE-CATEGORY SELECTION GRID (3 Columns × 3 Rows)
           ========================================================================= */}
        <div className="w-full grid grid-cols-3 gap-2 sm:gap-2.5 mb-4">
          {categories.map((cat) => {
            const isSelected = selectedCategories.includes(cat.id);

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => toggleCategory(cat.id)}
                className={`relative w-full rounded-[14px] sm:rounded-[16px] py-2 px-1 min-[360px]:px-1.5 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-150 h-[96px] min-[360px]:h-[102px] sm:h-[108px] box-border min-w-0 ${
                  isSelected
                    ? 'bg-[#EFF6ED] border-[1.8px] border-[#155B4D] shadow-2xs'
                    : 'bg-white border-[1.5px] border-[#DEE3DF] hover:border-[#CBD3CE] shadow-2xs'
                }`}
                aria-pressed={isSelected}
              >
                {/* Upper-Right Corner Selection Checkbox Indicator */}
                <div className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2">
                  {isSelected ? (
                    <div className="w-[14px] h-[14px] sm:w-[16px] sm:h-[16px] rounded-[3.5px] bg-[#155B4D] text-white flex items-center justify-center shadow-xs">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                  ) : (
                    <div className="w-[14px] h-[14px] sm:w-[16px] sm:h-[16px] rounded-[3.5px] border-[1.4px] border-[#9AA6A0] bg-white" />
                  )}
                </div>

                {/* Category Icon */}
                <div className="text-[#155B4D] flex items-center justify-center mt-0.5 mb-1 shrink-0">
                  {cat.renderIcon()}
                </div>

                {/* Category Label */}
                <div className="w-full text-center px-0.5 min-w-0">
                  <span
                    className={`block w-full text-[8px] min-[360px]:text-[8.5px] min-[390px]:text-[9px] sm:text-[10px] leading-[1.22] font-bold text-[#1E2522] tracking-tight text-center ${
                      isTamil ? 'font-tamil' : ''
                    }`}
                  >
                    {isTamil ? cat.labelTa : cat.labelEn}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* =========================================================================
            7. INFORMATION NOTICE (Pale Yellow Container with Amber Info Glyph)
           ========================================================================= */}
        <div className="w-full bg-[#FFF5D9] rounded-[14px] p-3.5 sm:p-4 flex items-start gap-3 mb-4 border border-[#FBEAC0]/60 text-left">
          {/* Amber Circular Info Glyph */}
          <div className="w-5.5 h-5.5 rounded-full border-[1.8px] border-[#D98200] text-[#D98200] flex items-center justify-center shrink-0 mt-0.5 text-[12px] font-bold font-serif select-none">
            i
          </div>

          <p
            className={`text-[#3B3224] text-[12.5px] sm:text-[13.5px] leading-relaxed font-normal ${
              isTamil ? 'font-tamil' : ''
            }`}
          >
            {t.discoveryNoticeText}
          </p>
        </div>

        {/* =========================================================================
            8. PRIMARY EVALUATION ACTION BUTTON
           ========================================================================= */}
        <button
          type="button"
          onClick={handleStartEvaluationClick}
          className="w-full h-[52px] sm:h-[56px] bg-[#155B4D] hover:bg-[#10483D] active:scale-[0.99] rounded-[16px] px-3.5 sm:px-4.5 flex items-center justify-between text-white font-bold transition-all cursor-pointer shadow-sm mt-1 mb-2"
        >
          {/* Search Glyph on Left */}
          <Search className="w-4.5 h-4.5 sm:w-5 sm:h-5 stroke-[2.4] shrink-0" />

          {/* Action Label */}
          <span
            className={`flex-1 text-center font-bold text-[13px] min-[360px]:text-[14px] sm:text-[15.5px] tracking-tight px-1.5 ${
              isTamil ? 'font-tamil' : ''
            }`}
          >
            {t.startEvaluationAction}
          </span>

          {/* Forward Chevron on Right */}
          <ChevronRight className="w-4.5 h-4.5 sm:w-5 sm:h-5 stroke-[2.5] shrink-0" />
        </button>
      </main>

      {/* Shared Notifications Drawer */}
      <NotificationDrawer
        isOpen={isNotificationDrawerOpen}
        currentLang={currentLang}
        notifications={notifications}
        onMarkAllRead={() =>
          setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
        }
        onSelectNotification={(id) =>
          setNotifications((prev) =>
            prev.map((n) => (n.id === id ? { ...n, read: true } : n))
          )
        }
        onClose={() => setIsNotificationDrawerOpen(false)}
      />
    </div>
  );
};
