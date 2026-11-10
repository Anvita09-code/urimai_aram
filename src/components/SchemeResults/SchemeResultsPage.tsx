import React, { useState } from 'react';
import {
  ArrowLeft,
  Check,
  ChevronRight,
  GraduationCap,
  HeartPulse,
  Home,
  ListFilter,
  RotateCcw,
  Sprout,
  Users,
  X,
} from 'lucide-react';
import { DashboardHeader } from '../Dashboard/DashboardHeader';
import { CitizenNotification, NotificationDrawer } from '../Dashboard/modals/NotificationDrawer';
import { translations } from '../../data/translations';
import {
  EvaluatedSchemeResult,
  HouseholdMember,
  HouseholdProfile,
  Language,
  SchemeOutcomeStatus,
} from '../../types';

export interface SchemeResultsPageProps {
  currentLang: Language;
  householdProfile?: HouseholdProfile;
  householdMembers?: HouseholdMember[];
  selectedInterests?: string[];
  onNavigateBack: () => void;
  onNavigateHome: () => void;
  onNavigateToHousehold: () => void;
  onNavigateToScheme: (schemeId: string) => void;
  onModifySearch: () => void;
  onViewDetailedResults: () => void;
  onOpenLanguage: () => void;
}

type FilterOption = 'all' | SchemeOutcomeStatus;

export const SchemeResultsPage: React.FC<SchemeResultsPageProps> = ({
  currentLang,
  householdProfile,
  householdMembers = [],
  selectedInterests,
  onNavigateBack,
  onNavigateHome,
  onNavigateToHousehold,
  onNavigateToScheme,
  onModifySearch,
  onViewDetailedResults,
  onOpenLanguage,
}) => {
  const t = translations[currentLang];
  const isTamil = currentLang === 'ta';

  // Notification Drawer state
  const [isNotificationDrawerOpen, setIsNotificationDrawerOpen] = useState(false);
  const [notifications, setNotifications] = useState<CitizenNotification[]>([
    {
      id: 'n1',
      titleEn: 'New Scheme Evaluation Ready',
      titleTa: 'புதிய திட்ட மதிப்பீடு தயார்',
      descEn: '24 schemes evaluated for your household profile.',
      descTa: 'உங்கள் குடும்ப சுயவிவரத்திற்கு 24 திட்டங்கள் ஆய்வு செய்யப்பட்டுள்ளன.',
      timeEn: 'Just now',
      timeTa: 'இப்போது',
      read: false,
      type: 'scheme',
    },
    {
      id: 'n2',
      titleEn: 'Household Profile Confirmed',
      titleTa: 'குடும்ப விவரங்கள் உறுதிப்படுத்தப்பட்டன',
      descEn: 'Household profile saved successfully.',
      descTa: 'குடும்ப சுயவிவரம் வெற்றிகரமாக சேமிக்கப்பட்டது.',
      timeEn: '10m ago',
      timeTa: '10 நிமிடங்களுக்கு முன்',
      read: true,
      type: 'reminder',
    },
  ]);

  // Selected filter state (default to 'all' as shown in reference image)
  const [activeFilter, setActiveFilter] = useState<FilterOption>('all');

  // Dynamic household values with fallback to reference screen defaults
  const householdId = householdProfile?.rationCardNumber
    ? householdProfile.rationCardNumber.replace(/[^a-zA-Z0-9]/g, '').slice(0, 10).toUpperCase()
    : 'HH24001567';
  const memberCount = householdMembers.length > 0 ? householdMembers.length : 4;

  // Selected welfare interests formatted for display
  const interestsDisplay = selectedInterests && selectedInterests.length > 0
    ? selectedInterests.join(', ')
    : t.resultsInterestsDefault;

  // 24 evaluated schemes matching exact reference counts:
  // Matched: 12, Conditional: 4, Insufficient: 3, Conflict: 2, Not Matched: 3
  const evaluatedSchemes: EvaluatedSchemeResult[] = [
    // 1. MATCH - Chief Minister's Farmer Welfare Scheme (Card 1 in reference)
    {
      id: 'res-1',
      schemeId: 'uzhavar-nanban',
      titleTa: 'முதலமைச்சரின் உழவர் நலத் திட்டம்',
      titleEn: "Chief Minister's Farmer Welfare Scheme",
      deptTa: 'விவசாயிகள் நலத்துறை',
      deptEn: 'Agriculture Welfare Department',
      descTa: 'சிறு மற்றும் குறு விவசாயிகளுக்கு நிதி உதவி மற்றும் உபகரண ஆதரவு வழங்கும் திட்டம்.',
      descEn: 'A welfare programme providing financial and equipment assistance to eligible small and marginal farmers.',
      category: 'agriculture',
      iconType: 'plant',
      status: 'matched',
    },
    // 2. CONDITIONAL MATCH - CMCHIS (Card 2 in reference)
    {
      id: 'res-2',
      schemeId: 'cmchis',
      titleTa: 'முதலமைச்சர் விரிவான சுகாதாரக் காப்பீடு (CMCHIS)',
      titleEn: "Chief Minister's Comprehensive Health Insurance Scheme (CMCHIS)",
      deptTa: 'மருத்துவம் மற்றும் மக்கள் நல்வாழ்வுத்துறை',
      deptEn: 'Health and Family Welfare Department',
      descTa: 'குறைந்த வருமானக் குடும்பங்களுக்கு உயர்தர மருத்துவ சிகிச்சை உதவி.',
      descEn: 'Financial assistance for eligible low-income families to access high-quality medical treatment.',
      category: 'health',
      iconType: 'health',
      status: 'conditional',
    },
    // 3. INSUFFICIENT INFO - Pudhumai Penn (Card 3 in reference)
    {
      id: 'res-3',
      schemeId: 'pudhumai-penn',
      titleTa: 'புதுமைப்பெண் திட்டம்',
      titleEn: 'Pudhumai Penn Scheme',
      deptTa: 'உயர்கல்வித்துறை',
      deptEn: 'Higher Education Department',
      descTa: 'அரசு மற்றும் அரசு உதவி பெறும் கல்லூரிகளில் படிக்கும் மாணவிகளுக்கு மாதாந்திர நிதி உதவி.',
      descEn: 'Monthly financial assistance for eligible female students studying in government and aided colleges.',
      category: 'education',
      iconType: 'education',
      status: 'insufficient',
    },
    // 4. CONFLICT - Kalaignar Dream Home Scheme
    {
      id: 'res-4',
      schemeId: 'kanavu-illam',
      titleTa: 'கலைஞர் கனவு இல்லம் திட்டம்',
      titleEn: 'Kalaignar Dream Home Scheme',
      deptTa: 'ஊரக வளர்ச்சி மற்றும் ஊராட்சித்துறை',
      deptEn: 'Rural Development & Panchayat Raj Department',
      descTa: 'கிராமப்புற குடிசை இல்லங்களை கான்கிரீட் வீடுகளாக மாற்றும் திட்டம்.',
      descEn: 'Financial assistance to convert rural kutcha houses into permanent concrete homes.',
      category: 'housing',
      iconType: 'housing',
      status: 'conflict',
    },
    // 5. NOT MATCHED - Old Age Pension Scheme (OAP)
    {
      id: 'res-5',
      schemeId: 'oap',
      titleTa: 'முதியோர் உதவித்தொகை திட்டம் (OAP)',
      titleEn: 'Old Age Pension Scheme (OAP)',
      deptTa: 'சமூக நலம் மற்றும் மகளிர் உரிமைத்துறை',
      deptEn: 'Social Welfare & Women Empowerment Department',
      descTa: '60 வயதுக்கு மேற்பட்ட ஆதரவற்ற மூத்தோருக்கான மாதாந்திர ஓய்வூதிய உதவி.',
      descEn: 'Monthly pension assistance for destitute senior citizens aged 60 and above.',
      category: 'social',
      iconType: 'social',
      status: 'not_matched',
    },
  ];

  // Exact reference counts
  const counts = {
    matched: 12,
    conditional: 4,
    insufficient: 3,
    conflict: 2,
    not_matched: 3,
    total: 24,
  };

  // Filter schemes based on active filter
  const displayedSchemes = activeFilter === 'all'
    ? evaluatedSchemes.slice(0, 3) // Initial composition shows the 3 reference cards
    : evaluatedSchemes.filter((s) => s.status === activeFilter);

  // Render scheme category icon
  const renderSchemeIcon = (iconType: EvaluatedSchemeResult['iconType']) => {
    switch (iconType) {
      case 'plant':
        return <Sprout className="w-4 h-4 min-[360px]:w-4.5 min-[360px]:h-4.5 sm:w-5 sm:h-5 stroke-[2.2]" />;
      case 'health':
        return <HeartPulse className="w-4 h-4 min-[360px]:w-4.5 min-[360px]:h-4.5 sm:w-5 sm:h-5 stroke-[2.2]" />;
      case 'education':
        return <GraduationCap className="w-4 h-4 min-[360px]:w-4.5 min-[360px]:h-4.5 sm:w-5 sm:h-5 stroke-[2.2]" />;
      case 'housing':
        return <Home className="w-4 h-4 min-[360px]:w-4.5 min-[360px]:h-4.5 sm:w-5 sm:h-5 stroke-[2.2]" />;
      case 'social':
      default:
        return <Users className="w-4 h-4 min-[360px]:w-4.5 min-[360px]:h-4.5 sm:w-5 sm:h-5 stroke-[2.2]" />;
    }
  };

  // Render outcome status badge for scheme cards
  const renderStatusBadge = (status: SchemeOutcomeStatus) => {
    switch (status) {
      case 'matched':
        return (
          <div className="bg-[#1B7339] text-white px-1.5 py-0.5 min-[360px]:px-2 min-[360px]:py-0.5 rounded-full text-[7.5px] min-[360px]:text-[8px] sm:text-[9px] font-semibold flex items-center gap-1 shadow-2xs shrink-0 select-none">
            <div className="w-2.5 h-2.5 min-[360px]:w-3 min-[360px]:h-3 rounded-full border-[1.2px] border-white flex items-center justify-center shrink-0">
              <Check className="w-1.5 min-[360px]:w-2 h-1.5 min-[360px]:h-2 stroke-[3]" />
            </div>
            <span className={`whitespace-nowrap ${isTamil ? 'font-tamil' : ''}`}>{t.outcomeMatched}</span>
          </div>
        );
      case 'conditional':
        return (
          <div className="bg-[#FEEFC3] text-[#9A6200] px-1.5 py-0.5 min-[360px]:px-2 rounded-full text-[7px] min-[360px]:text-[7.5px] sm:text-[8.5px] font-semibold flex items-center gap-1 border border-[#F3DE9C] shrink-0 select-none">
            <div className="w-2.5 h-2.5 min-[360px]:w-3 min-[360px]:h-3 rounded-full bg-[#F4C542] text-white flex items-center justify-center font-bold text-[8.5px] leading-none shrink-0">
              ~
            </div>
            <div className={`flex flex-col text-left leading-[1.05] ${isTamil ? 'font-tamil' : ''}`}>
              {isTamil ? (
                <>
                  <span className="whitespace-nowrap">நிபந்தனையுடன்</span>
                  <span className="whitespace-nowrap">பொருந்துகிறது</span>
                </>
              ) : (
                <>
                  <span className="whitespace-nowrap">Conditional</span>
                  <span className="whitespace-nowrap">Match</span>
                </>
              )}
            </div>
          </div>
        );
      case 'insufficient':
        return (
          <div className="bg-[#E8F0FE] text-[#1967D2] px-1.5 py-0.5 min-[360px]:px-2 rounded-full text-[7px] min-[360px]:text-[7.5px] sm:text-[8.5px] font-semibold flex items-center gap-1 border border-[#D2E3FC] shrink-0 select-none">
            <div className="w-2.5 h-2.5 min-[360px]:w-3 min-[360px]:h-3 rounded-full border-[1.2px] border-[#1967D2] text-[#1967D2] flex items-center justify-center font-serif text-[7.5px] min-[360px]:text-[8.5px] font-bold leading-none shrink-0">
              i
            </div>
            <div className={`flex flex-col text-left leading-[1.05] ${isTamil ? 'font-tamil' : ''}`}>
              {isTamil ? (
                <>
                  <span className="whitespace-nowrap">போதிய</span>
                  <span className="whitespace-nowrap">தகவல் இல்லை</span>
                </>
              ) : (
                <>
                  <span className="whitespace-nowrap">Insufficient</span>
                  <span className="whitespace-nowrap">Info</span>
                </>
              )}
            </div>
          </div>
        );
      case 'conflict':
        return (
          <div className="bg-[#FCE8E6] text-[#C5221F] px-1.5 py-0.5 min-[360px]:px-2 rounded-full text-[7.5px] min-[360px]:text-[8px] sm:text-[9px] font-semibold flex items-center gap-1 border border-[#FAD2CF] shrink-0 select-none">
            <div className="w-2.5 h-2.5 min-[360px]:w-3 min-[360px]:h-3 rounded-full border-[1.2px] border-[#C5221F] text-[#C5221F] flex items-center justify-center font-bold text-[8px] leading-none shrink-0">
              !
            </div>
            <span className={`whitespace-nowrap ${isTamil ? 'font-tamil' : ''}`}>{t.outcomeConflict}</span>
          </div>
        );
      case 'not_matched':
        return (
          <div className="bg-[#F1F3F4] text-[#5F6368] px-1.5 py-0.5 min-[360px]:px-2 rounded-full text-[7.5px] min-[360px]:text-[8px] sm:text-[9px] font-semibold flex items-center gap-1 border border-[#DADCE0] shrink-0 select-none">
            <div className="w-2.5 h-2.5 min-[360px]:w-3 min-[360px]:h-3 rounded-full bg-[#5F6368] text-white flex items-center justify-center shrink-0">
              <X className="w-1.5 min-[360px]:w-2 h-1.5 min-[360px]:h-2 stroke-[3]" />
            </div>
            <span className={`whitespace-nowrap ${isTamil ? 'font-tamil' : ''}`}>{t.outcomeNotMatched}</span>
          </div>
        );
    }
  };

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
            3. SCHEME RESULTS HERO SECTION: Back Navigation, Heading & Description
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
                {t.schemeResultsTitle}
              </h1>

              <p
                className={`text-[#59635F] text-[13px] sm:text-[14px] font-normal leading-snug mt-1.5 text-left ${
                  isTamil ? 'font-tamil' : ''
                }`}
              >
                {t.schemeResultsDesc}
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            4. HOUSEHOLD SUMMARY CARD
           ========================================================================= */}
        <button
          type="button"
          onClick={onNavigateToHousehold}
          className="w-full bg-[#FFFFFF] rounded-[16px] p-3.5 sm:p-4 flex items-center justify-between border-[1.5px] border-[#DEE3DF] hover:border-[#CBD3CE] transition-all cursor-pointer shadow-2xs mb-4 text-left"
        >
          {/* Pale Green Circular Household Icon Badge */}
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-[12px] bg-[#EAF2ED] text-[#155B4D] flex items-center justify-center shrink-0 mr-3">
            <Users className="w-6 h-6 stroke-[2.2]" />
          </div>

          {/* Household ID, Member Count and Selected Interests */}
          <div className="flex-1 min-w-0 pr-2">
            <h2
              className={`text-[#1E2522] font-bold text-[14.5px] sm:text-[15.5px] leading-tight truncate ${
                isTamil ? 'font-tamil' : ''
              }`}
            >
              {t.resultsHouseholdPrefix}: {householdId} &nbsp;|&nbsp; {t.resultsMembersPrefix}:{' '}
              {memberCount}
            </h2>

            <p
              className={`text-[#5A6660] text-[12px] sm:text-[13px] leading-snug mt-1 truncate ${
                isTamil ? 'font-tamil' : ''
              }`}
            >
              {t.resultsInterestsPrefix}: {interestsDisplay}
            </p>
          </div>

          {/* Navigation Chevron */}
          <ChevronRight className="w-5 h-5 text-[#2A332E] stroke-[2.2] shrink-0" />
        </button>

        {/* =========================================================================
            5. RESULTS SUMMARY CONTAINER (முடிவு சுருக்கம் - 5 Outcome Statistics)
           ========================================================================= */}
        <section className="w-full bg-[#EFF6ED] rounded-[16px] border border-[#D5E6D7] p-2.5 min-[360px]:p-3 sm:p-4 mb-3.5 text-left shadow-2xs">
          {/* Header Row: Title & Total Scheme Count */}
          <div className="w-full flex items-center justify-between pb-2.5 border-b border-[#D5E6D7]/60 gap-1">
            <h2
              className={`text-[#155B4D] font-bold text-[14px] min-[360px]:text-[15.5px] sm:text-[17.5px] leading-tight shrink-0 ${
                isTamil ? 'font-tamil' : ''
              }`}
            >
              {t.resultsSummaryHeading}
            </h2>

            <span
              className={`text-[#202321] font-semibold text-[11px] min-[360px]:text-[12px] sm:text-[13px] shrink-0 whitespace-nowrap ${
                isTamil ? 'font-tamil' : ''
              }`}
            >
              {t.resultsTotalSchemesPrefix}: {counts.total}
            </span>
          </div>

          {/* Five Outcome Columns Grid */}
          <div className="w-full grid grid-cols-5 divide-x divide-[#D0DFD4] pt-2.5">
            {/* 1. MATCH */}
            <div className="flex flex-col items-center justify-start text-center px-0.5 min-w-0">
              <div className="w-6 h-6 min-[360px]:w-6.5 min-[360px]:h-6.5 sm:w-7 sm:h-7 rounded-full bg-[#1B7339] text-white flex items-center justify-center shadow-2xs shrink-0">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
              <span className="text-[13.5px] min-[360px]:text-[15px] sm:text-[17px] font-bold text-[#1E2522] leading-tight mt-0.5">
                {counts.matched}
              </span>
              <span
                className={`text-[6.5px] min-[360px]:text-[7.5px] min-[390px]:text-[8px] sm:text-[9px] font-medium text-[#2A332E] leading-[1.12] tracking-tighter mt-0.5 text-center truncate w-full ${
                  isTamil ? 'font-tamil' : ''
                }`}
              >
                {t.outcomeMatched}
              </span>
            </div>

            {/* 2. CONDITIONAL MATCH */}
            <div className="flex flex-col items-center justify-start text-center px-0.5 min-w-0">
              <div className="w-6 h-6 min-[360px]:w-6.5 min-[360px]:h-6.5 sm:w-7 sm:h-7 rounded-full bg-[#F4C542] text-white flex items-center justify-center font-bold text-[14px] min-[360px]:text-[15px] sm:text-[16px] leading-none select-none shadow-2xs shrink-0">
                ~
              </div>
              <span className="text-[13.5px] min-[360px]:text-[15px] sm:text-[17px] font-bold text-[#1E2522] leading-tight mt-0.5">
                {counts.conditional}
              </span>
              <span
                className={`text-[6.5px] min-[360px]:text-[7.5px] min-[390px]:text-[8px] sm:text-[9px] font-medium text-[#2A332E] leading-[1.12] tracking-tighter mt-0.5 text-center w-full ${
                  isTamil ? 'font-tamil' : ''
                }`}
              >
                {isTamil ? (
                  <>
                    <span className="block truncate">நிபந்தனையுடன்</span>
                    <span className="block truncate">பொருந்துகிறது</span>
                  </>
                ) : (
                  <span>{t.outcomeConditional}</span>
                )}
              </span>
            </div>

            {/* 3. INSUFFICIENT INFORMATION */}
            <div className="flex flex-col items-center justify-start text-center px-0.5 min-w-0">
              <div className="w-6 h-6 min-[360px]:w-6.5 min-[360px]:h-6.5 sm:w-7 sm:h-7 rounded-full border-[1.5px] border-[#1A73E8] bg-[#E8F0FE]/40 text-[#1A73E8] flex items-center justify-center font-serif text-[11px] min-[360px]:text-[12px] sm:text-[13px] font-bold select-none shrink-0">
                i
              </div>
              <span className="text-[13.5px] min-[360px]:text-[15px] sm:text-[17px] font-bold text-[#1E2522] leading-tight mt-0.5">
                {counts.insufficient}
              </span>
              <span
                className={`text-[6.5px] min-[360px]:text-[7.5px] min-[390px]:text-[8px] sm:text-[9px] font-medium text-[#2A332E] leading-[1.12] tracking-tighter mt-0.5 text-center w-full ${
                  isTamil ? 'font-tamil' : ''
                }`}
              >
                {isTamil ? (
                  <>
                    <span className="block truncate">போதிய</span>
                    <span className="block truncate">தகவல் இல்லை</span>
                  </>
                ) : (
                  <span>{t.outcomeInsufficient}</span>
                )}
              </span>
            </div>

            {/* 4. CONFLICT */}
            <div className="flex flex-col items-center justify-start text-center px-0.5 min-w-0">
              <div className="w-6 h-6 min-[360px]:w-6.5 min-[360px]:h-6.5 sm:w-7 sm:h-7 rounded-full border-[1.5px] border-[#D93025] bg-[#FCE8E6]/40 text-[#D93025] flex items-center justify-center font-bold text-[12px] min-[360px]:text-[13px] sm:text-[14px] select-none shrink-0">
                !
              </div>
              <span className="text-[13.5px] min-[360px]:text-[15px] sm:text-[17px] font-bold text-[#1E2522] leading-tight mt-0.5">
                {counts.conflict}
              </span>
              <span
                className={`text-[6.5px] min-[360px]:text-[7.5px] min-[390px]:text-[8px] sm:text-[9px] font-medium text-[#2A332E] leading-[1.12] tracking-tighter mt-0.5 text-center truncate w-full ${
                  isTamil ? 'font-tamil' : ''
                }`}
              >
                {t.outcomeConflict}
              </span>
            </div>

            {/* 5. NOT MATCH */}
            <div className="flex flex-col items-center justify-start text-center px-0.5 min-w-0">
              <div className="w-6 h-6 min-[360px]:w-6.5 min-[360px]:h-6.5 sm:w-7 sm:h-7 rounded-full bg-[#6F7873] text-white flex items-center justify-center shadow-2xs shrink-0">
                <X className="w-3 h-3 stroke-[3]" />
              </div>
              <span className="text-[13.5px] min-[360px]:text-[15px] sm:text-[17px] font-bold text-[#1E2522] leading-tight mt-0.5">
                {counts.not_matched}
              </span>
              <span
                className={`text-[6.5px] min-[360px]:text-[7.5px] min-[390px]:text-[8px] sm:text-[9px] font-medium text-[#2A332E] leading-[1.12] tracking-tighter mt-0.5 text-center truncate w-full ${
                  isTamil ? 'font-tamil' : ''
                }`}
              >
                {t.outcomeNotMatched}
              </span>
            </div>
          </div>
        </section>

        {/* =========================================================================
            6. HORIZONTAL RESULT FILTERS
           ========================================================================= */}
        <div className="w-full mb-3.5 overflow-hidden">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {/* Filter 1: All */}
            <button
              type="button"
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1 min-[360px]:px-3.5 min-[360px]:py-1.5 rounded-full text-[11px] min-[360px]:text-[11.5px] sm:text-[12.5px] font-semibold transition-all shrink-0 cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-[#155B4D] text-white shadow-2xs'
                  : 'bg-white hover:bg-[#F2F6F3] border border-[#CBD8D0] text-[#155B4D]'
              } ${isTamil ? 'font-tamil' : ''}`}
            >
              {t.filterAll} ({counts.total})
            </button>

            {/* Filter 2: Matched */}
            <button
              type="button"
              onClick={() => setActiveFilter('matched')}
              className={`px-3 py-1 min-[360px]:px-3.5 min-[360px]:py-1.5 rounded-full text-[11px] min-[360px]:text-[11.5px] sm:text-[12.5px] font-semibold transition-all shrink-0 cursor-pointer ${
                activeFilter === 'matched'
                  ? 'bg-[#155B4D] text-white shadow-2xs'
                  : 'bg-white hover:bg-[#F2F6F3] border border-[#CBD8D0] text-[#155B4D]'
              } ${isTamil ? 'font-tamil' : ''}`}
            >
              {t.filterMatched} ({counts.matched})
            </button>

            {/* Filter 3: Conditional */}
            <button
              type="button"
              onClick={() => setActiveFilter('conditional')}
              className={`px-3 py-1 min-[360px]:px-3.5 min-[360px]:py-1.5 rounded-full text-[11px] min-[360px]:text-[11.5px] sm:text-[12.5px] font-semibold transition-all shrink-0 cursor-pointer ${
                activeFilter === 'conditional'
                  ? 'bg-[#155B4D] text-white shadow-2xs'
                  : 'bg-white hover:bg-[#F2F6F3] border border-[#CBD8D0] text-[#155B4D]'
              } ${isTamil ? 'font-tamil' : ''}`}
            >
              {t.filterConditional} ({counts.conditional})
            </button>

            {/* Filter 4: Insufficient Info */}
            <button
              type="button"
              onClick={() => setActiveFilter('insufficient')}
              className={`px-3 py-1 min-[360px]:px-3.5 min-[360px]:py-1.5 rounded-full text-[11px] min-[360px]:text-[11.5px] sm:text-[12.5px] font-semibold transition-all shrink-0 cursor-pointer ${
                activeFilter === 'insufficient'
                  ? 'bg-[#155B4D] text-white shadow-2xs'
                  : 'bg-white hover:bg-[#F2F6F3] border border-[#CBD8D0] text-[#155B4D]'
              } ${isTamil ? 'font-tamil' : ''}`}
            >
              {t.filterInsufficient} ({counts.insufficient})
            </button>

            {/* Filter 5: Conflict */}
            <button
              type="button"
              onClick={() => setActiveFilter('conflict')}
              className={`px-3 py-1 min-[360px]:px-3.5 min-[360px]:py-1.5 rounded-full text-[11px] min-[360px]:text-[11.5px] sm:text-[12.5px] font-semibold transition-all shrink-0 cursor-pointer ${
                activeFilter === 'conflict'
                  ? 'bg-[#155B4D] text-white shadow-2xs'
                  : 'bg-white hover:bg-[#F2F6F3] border border-[#CBD8D0] text-[#155B4D]'
              } ${isTamil ? 'font-tamil' : ''}`}
            >
              {t.filterConflict} ({counts.conflict})
            </button>

            {/* Filter 6: Not Matched */}
            <button
              type="button"
              onClick={() => setActiveFilter('not_matched')}
              className={`px-3 py-1 min-[360px]:px-3.5 min-[360px]:py-1.5 rounded-full text-[11px] min-[360px]:text-[11.5px] sm:text-[12.5px] font-semibold transition-all shrink-0 cursor-pointer ${
                activeFilter === 'not_matched'
                  ? 'bg-[#155B4D] text-white shadow-2xs'
                  : 'bg-white hover:bg-[#F2F6F3] border border-[#CBD8D0] text-[#155B4D]'
              } ${isTamil ? 'font-tamil' : ''}`}
            >
              {t.filterNotMatched} ({counts.not_matched})
            </button>
          </div>
        </div>

        {/* =========================================================================
            7. SCHEME RESULT CARDS
           ========================================================================= */}
        <div className="w-full flex flex-col mb-2">
          {displayedSchemes.map((scheme) => (
            <div
              key={scheme.id}
              onClick={() => onNavigateToScheme(scheme.schemeId)}
              className="w-full bg-white rounded-[16px] border border-[#DEE3DF] p-2.5 min-[360px]:p-3 sm:p-4 mb-2.5 shadow-2xs flex items-center justify-between gap-2 min-[360px]:gap-2.5 sm:gap-3 text-left transition-all hover:border-[#CBD3CE] cursor-pointer"
            >
              {/* Scheme Category Icon Badge */}
              <div className="w-9 h-9 min-[360px]:w-10 min-[360px]:h-10 sm:w-11 sm:h-11 rounded-[10px] sm:rounded-[12px] bg-[#EAF2ED] text-[#155B4D] flex items-center justify-center shrink-0">
                {renderSchemeIcon(scheme.iconType)}
              </div>

              {/* Title, Department and Description */}
              <div className="flex-1 min-w-0 pr-1 overflow-hidden">
                <h3
                  className={`font-bold text-[#1E2522] text-[11px] min-[360px]:text-[12px] min-[390px]:text-[13px] sm:text-[14.5px] leading-snug break-words ${
                    isTamil ? 'font-tamil' : ''
                  }`}
                >
                  {isTamil ? scheme.titleTa : scheme.titleEn}
                </h3>
                <p
                  className={`text-[#26302B] font-semibold text-[9.5px] min-[360px]:text-[10px] min-[390px]:text-[10.5px] sm:text-[11.5px] mt-0.5 leading-tight break-words ${
                    isTamil ? 'font-tamil' : ''
                  }`}
                >
                  {isTamil ? scheme.deptTa : scheme.deptEn}
                </p>
                <p
                  className={`text-[#5A6660] text-[8.5px] min-[360px]:text-[9px] min-[390px]:text-[9.5px] sm:text-[10.5px] mt-1 leading-snug break-words line-clamp-3 ${
                    isTamil ? 'font-tamil' : ''
                  }`}
                >
                  {isTamil ? scheme.descTa : scheme.descEn}
                </p>
              </div>

              {/* Status Badge & Forward Navigation Chevron */}
              <div className="flex items-center gap-1 min-[360px]:gap-1.5 sm:gap-2 shrink-0 ml-1">
                {renderStatusBadge(scheme.status)}
                <ChevronRight className="w-4 h-4 min-[360px]:w-4.5 min-[360px]:h-4.5 text-[#2A332E] stroke-[2.2] shrink-0" />
              </div>
            </div>
          ))}
        </div>

        {/* =========================================================================
            8. INFORMATION NOTICE (Pale Yellow Container with Amber Info Glyph)
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
            {t.resultsNoticeText}
          </p>
        </div>

        {/* =========================================================================
            9. TWO BOTTOM ACTION BUTTONS: Modify Search & View Detailed Results
           ========================================================================= */}
        <div className="w-full flex items-center gap-2.5 sm:gap-3 mt-1 mb-2">
          {/* Left Action: Modify Search (தேடலை மாற்று) */}
          <button
            type="button"
            onClick={onModifySearch}
            className="h-[50px] sm:h-[54px] px-3.5 sm:px-4 bg-transparent hover:bg-[#E5F1E7]/40 active:scale-[0.99] border-[1.5px] border-[#155B4D] text-[#155B4D] font-bold text-[13px] sm:text-[14px] rounded-[15px] sm:rounded-[16px] flex items-center justify-center gap-1.5 transition-all cursor-pointer shrink-0"
          >
            <RotateCcw className="w-4.5 h-4.5 stroke-[2.4]" />
            <span className={isTamil ? 'font-tamil' : ''}>{t.actionModifySearch}</span>
          </button>

          {/* Right Action: View Detailed Results (விரிவான முடிவுகளைப் பார்க்க) */}
          <button
            type="button"
            onClick={onViewDetailedResults}
            className="flex-1 h-[50px] sm:h-[54px] px-3.5 sm:px-4 bg-[#155B4D] hover:bg-[#10483D] active:scale-[0.99] text-white font-bold text-[12.5px] min-[360px]:text-[13.5px] sm:text-[14.5px] rounded-[15px] sm:rounded-[16px] flex items-center justify-between shadow-xs transition-all cursor-pointer min-w-0"
          >
            <ListFilter className="w-4.5 h-4.5 stroke-[2.4] shrink-0" />
            <span className={`truncate px-1.5 text-center ${isTamil ? 'font-tamil' : ''}`}>
              {t.actionViewDetailedResults}
            </span>
            <ChevronRight className="w-4.5 h-4.5 stroke-[2.5] shrink-0" />
          </button>
        </div>
      </main>

      {/* Shared Notifications Drawer */}
      <NotificationDrawer
        isOpen={isNotificationDrawerOpen}
        currentLang={currentLang}
        notifications={notifications}
        onMarkAllRead={() =>
          setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
        }
        onSelectNotification={(id: string) =>
          setNotifications((prev) =>
            prev.map((n) => (n.id === id ? { ...n, read: true } : n))
          )
        }
        onClose={() => setIsNotificationDrawerOpen(false)}
      />
    </div>
  );
};
