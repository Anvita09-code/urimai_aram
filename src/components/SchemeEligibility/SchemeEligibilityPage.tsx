import React, { useRef, useState } from 'react';
import {
  ArrowLeft,
  Check,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  ExternalLink,
  FileCheck,
  FileText,
  HeartPulse,
  Info,
  Link2,
  User,
  Users,
  X,
} from 'lucide-react';
import { DashboardHeader } from '../Dashboard/DashboardHeader';
import { CitizenNotification, NotificationDrawer } from '../Dashboard/modals/NotificationDrawer';
import { getSchemeEligibilityData } from '../../data/eligibilityData';
import { translations } from '../../data/translations';
import {
  ConditionOutcomeStatus,
  HouseholdMember,
  HouseholdProfile,
  Language,
  SchemeConditionItem,
  SchemeOutcomeStatus,
} from '../../types';

interface SchemeEligibilityPageProps {
  currentLang: Language;
  schemeId?: string;
  householdProfile?: HouseholdProfile;
  householdMembers?: HouseholdMember[];
  onNavigateBack: () => void;
  onNavigateHome: () => void;
  onOpenLanguage: () => void;
  onContinueToDocuments?: (schemeId: string) => void;
  onViewAllDocuments?: (schemeId: string) => void;
}

export const SchemeEligibilityPage: React.FC<SchemeEligibilityPageProps> = ({
  currentLang,
  schemeId = 'cmchis',
  onNavigateBack,
  onNavigateHome,
  onOpenLanguage,
  onContinueToDocuments,
  onViewAllDocuments,
}) => {
  const isTamil = currentLang === 'ta';
  const t = translations[currentLang];

  // Load evaluated eligibility data for the scheme (defaults to CMCHIS reference)
  const eligibilityData = getSchemeEligibilityData(schemeId);

  // Active section tab state
  type SectionTabId = 'assessment' | 'explanation' | 'documents' | 'official';
  const [activeTab, setActiveTab] = useState<SectionTabId>('assessment');

  // Selected condition modal state for "View Explanation"
  const [selectedCondition, setSelectedCondition] = useState<SchemeConditionItem | null>(null);
  const [isOverviewExplanationOpen, setIsOverviewExplanationOpen] = useState(false);

  // Notifications drawer state
  const [isNotificationDrawerOpen, setIsNotificationDrawerOpen] = useState(false);
  const [notifications, setNotifications] = useState<CitizenNotification[]>([
    {
      id: 'notif-eligibility-1',
      titleEn: 'CMCHIS Eligibility Evaluated',
      titleTa: 'CMCHIS தகுதி மதிப்பீடு செய்யப்பட்டது',
      descEn: 'Your household is conditionally eligible for CMCHIS hospitalization coverage.',
      descTa: 'உங்கள் குடும்பத்திற்கு CMCHIS மருத்துவ காப்பீடு நிபந்தனையுடன் பொருந்துகிறது.',
      timeEn: '10m ago',
      timeTa: '10 நிமிடங்களுக்கு முன்',
      read: false,
      type: 'scheme',
    },
    {
      id: 'notif-eligibility-2',
      titleEn: 'Ration Card Verification Required',
      titleTa: 'ரேஷன் கார்டு சரிபார்ப்பு தேவை',
      descEn: 'Please verify family ration card at hospital counter.',
      descTa: 'மருத்துவமனை சேவை மையத்தில் ரேஷன் கார்டை சரிபார்க்கவும்.',
      timeEn: '1h ago',
      timeTa: '1 மணி நேரத்திற்கு முன்',
      read: false,
      type: 'document',
    },
  ]);

  // Section anchor refs for smooth tab scrolling
  const assessmentRef = useRef<HTMLDivElement>(null);
  const explanationRef = useRef<HTMLDivElement>(null);
  const documentsRef = useRef<HTMLDivElement>(null);
  const officialRef = useRef<HTMLDivElement>(null);

  const handleTabClick = (tab: SectionTabId) => {
    setActiveTab(tab);
    if (tab === 'assessment') {
      assessmentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (tab === 'explanation') {
      explanationRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (tab === 'documents') {
      documentsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (tab === 'official') {
      officialRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Helper: Render status badge on the Scheme Identity Card
  const renderCardStatusBadge = (status: SchemeOutcomeStatus) => {
    switch (status) {
      case 'matched':
        return (
          <div className="bg-[#1B7339] text-white px-2 min-[360px]:px-2.5 py-1 rounded-full text-[8px] min-[360px]:text-[9px] sm:text-[10px] font-semibold flex items-center gap-1 shadow-2xs shrink-0 select-none">
            <div className="w-2.5 h-2.5 min-[360px]:w-3 min-[360px]:h-3 rounded-full border-[1.2px] border-white flex items-center justify-center shrink-0">
              <Check className="w-1.5 min-[360px]:w-2 h-1.5 min-[360px]:h-2 stroke-[3]" />
            </div>
            <span className={`whitespace-nowrap ${isTamil ? 'font-tamil' : ''}`}>{t.outcomeMatched}</span>
          </div>
        );
      case 'conditional':
      default:
        return (
          <div className="bg-[#FEEFC3] text-[#9A6200] px-2 min-[360px]:px-2.5 py-1 rounded-full text-[7.5px] min-[360px]:text-[8.5px] sm:text-[9.5px] font-semibold flex items-center gap-1.5 border border-[#F3DE9C] shrink-0 select-none">
            <div className="w-3 h-3 min-[360px]:w-3.5 min-[360px]:h-3.5 rounded-full bg-[#F4C542] text-white flex items-center justify-center font-bold text-[9px] min-[360px]:text-[10px] leading-none shrink-0">
              ~
            </div>
            <div className={`flex flex-col text-left leading-[1.08] ${isTamil ? 'font-tamil' : ''}`}>
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
          <div className="bg-[#E8F0FE] text-[#1967D2] px-2 min-[360px]:px-2.5 py-1 rounded-full text-[7.5px] min-[360px]:text-[8.5px] sm:text-[9.5px] font-semibold flex items-center gap-1.5 border border-[#D2E3FC] shrink-0 select-none">
            <div className="w-3 h-3 min-[360px]:w-3.5 min-[360px]:h-3.5 rounded-full border-[1.2px] border-[#1967D2] text-[#1967D2] flex items-center justify-center font-serif text-[8px] min-[360px]:text-[9px] font-bold leading-none shrink-0">
              i
            </div>
            <div className={`flex flex-col text-left leading-[1.08] ${isTamil ? 'font-tamil' : ''}`}>
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
          <div className="bg-[#FCE8E6] text-[#C5221F] px-2 min-[360px]:px-2.5 py-1 rounded-full text-[8px] min-[360px]:text-[9px] sm:text-[10px] font-semibold flex items-center gap-1 border border-[#FAD2CF] shrink-0 select-none">
            <div className="w-2.5 h-2.5 min-[360px]:w-3 min-[360px]:h-3 rounded-full border-[1.2px] border-[#C5221F] text-[#C5221F] flex items-center justify-center font-bold text-[8.5px] leading-none shrink-0">
              !
            </div>
            <span className={`whitespace-nowrap ${isTamil ? 'font-tamil' : ''}`}>{t.outcomeConflict}</span>
          </div>
        );
      case 'not_matched':
        return (
          <div className="bg-[#F1F3F4] text-[#5F6368] px-2 min-[360px]:px-2.5 py-1 rounded-full text-[8px] min-[360px]:text-[9px] sm:text-[10px] font-semibold flex items-center gap-1 border border-[#DADCE0] shrink-0 select-none">
            <div className="w-2.5 h-2.5 min-[360px]:w-3 min-[360px]:h-3 rounded-full bg-[#5F6368] text-white flex items-center justify-center shrink-0">
              <X className="w-1.5 min-[360px]:w-2 h-1.5 min-[360px]:h-2 stroke-[3]" />
            </div>
            <span className={`whitespace-nowrap ${isTamil ? 'font-tamil' : ''}`}>{t.outcomeNotMatched}</span>
          </div>
        );
    }
  };

  // Helper: Render condition row status icon
  const renderConditionIcon = (status: ConditionOutcomeStatus) => {
    switch (status) {
      case 'matched':
        return (
          <div className="w-5.5 h-5.5 min-[360px]:w-6 min-[360px]:h-6 rounded-full bg-[#1B7339] text-white flex items-center justify-center shadow-2xs shrink-0">
            <Check className="w-3.5 h-3.5 stroke-[3]" />
          </div>
        );
      case 'conditional':
        return (
          <div className="w-5.5 h-5.5 min-[360px]:w-6 min-[360px]:h-6 rounded-full bg-[#F4C542] text-white flex items-center justify-center font-bold text-[14px] leading-none select-none shadow-2xs shrink-0">
            ~
          </div>
        );
      case 'insufficient':
        return (
          <div className="w-5.5 h-5.5 min-[360px]:w-6 min-[360px]:h-6 rounded-full border-[1.5px] border-[#1A73E8] bg-[#E8F0FE]/40 text-[#1A73E8] flex items-center justify-center font-serif text-[11px] font-bold select-none shrink-0">
            i
          </div>
        );
      case 'conflict':
        return (
          <div className="w-5.5 h-5.5 min-[360px]:w-6 min-[360px]:h-6 rounded-full border-[1.5px] border-[#D93025] bg-[#FCE8E6]/40 text-[#D93025] flex items-center justify-center font-bold text-[12px] select-none shrink-0">
            !
          </div>
        );
      case 'not_matched':
        return (
          <div className="w-5.5 h-5.5 min-[360px]:w-6 min-[360px]:h-6 rounded-full bg-[#6F7873] text-white flex items-center justify-center shadow-2xs shrink-0">
            <X className="w-3 h-3 stroke-[3]" />
          </div>
        );
    }
  };

  // Helper: Render condition row right status pill
  const renderConditionStatusPill = (condition: SchemeConditionItem) => {
    switch (condition.status) {
      case 'matched':
        return (
          <span
            className={`bg-[#E6F4EA] text-[#137333] px-2 min-[360px]:px-2.5 py-0.5 rounded-full text-[9.5px] min-[360px]:text-[10.5px] sm:text-[11.5px] font-semibold whitespace-nowrap ${
              isTamil ? 'font-tamil' : ''
            }`}
          >
            {isTamil ? condition.statusLabelTa : condition.statusLabelEn}
          </span>
        );
      case 'conditional':
        return (
          <span
            className={`bg-[#FEF7E0] text-[#B06000] px-2 min-[360px]:px-2.5 py-0.5 rounded-full text-[9.5px] min-[360px]:text-[10.5px] sm:text-[11.5px] font-semibold whitespace-nowrap ${
              isTamil ? 'font-tamil' : ''
            }`}
          >
            {isTamil ? condition.statusLabelTa : condition.statusLabelEn}
          </span>
        );
      case 'insufficient':
        return (
          <span
            className={`bg-[#E8F0FE] text-[#1967D2] px-2 min-[360px]:px-2.5 py-0.5 rounded-full text-[9.5px] min-[360px]:text-[10.5px] sm:text-[11.5px] font-semibold whitespace-nowrap ${
              isTamil ? 'font-tamil' : ''
            }`}
          >
            {isTamil ? condition.statusLabelTa : condition.statusLabelEn}
          </span>
        );
      case 'conflict':
        return (
          <span
            className={`bg-[#FCE8E6] text-[#C5221F] px-2 min-[360px]:px-2.5 py-0.5 rounded-full text-[9.5px] min-[360px]:text-[10.5px] sm:text-[11.5px] font-semibold whitespace-nowrap ${
              isTamil ? 'font-tamil' : ''
            }`}
          >
            {isTamil ? condition.statusLabelTa : condition.statusLabelEn}
          </span>
        );
      case 'not_matched':
        return (
          <span
            className={`bg-[#F1F3F4] text-[#5F6368] px-2 min-[360px]:px-2.5 py-0.5 rounded-full text-[9.5px] min-[360px]:text-[10.5px] sm:text-[11.5px] font-semibold whitespace-nowrap ${
              isTamil ? 'font-tamil' : ''
            }`}
          >
            {isTamil ? condition.statusLabelTa : condition.statusLabelEn}
          </span>
        );
    }
  };

  // Helper: Document card icon
  const renderDocumentIcon = (iconType: string) => {
    switch (iconType) {
      case 'ration':
        return <CreditCard className="w-4.5 h-4.5 sm:w-5 sm:h-5 stroke-[2.2]" />;
      case 'aadhaar':
        return <User className="w-4.5 h-4.5 sm:w-5 sm:h-5 stroke-[2.2]" />;
      case 'income':
      case 'certificate':
        return <FileCheck className="w-4.5 h-4.5 sm:w-5 sm:h-5 stroke-[2.2]" />;
      default:
        return <FileText className="w-4.5 h-4.5 sm:w-5 sm:h-5 stroke-[2.2]" />;
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
            3. PAGE HEADING WITH BACK NAVIGATION ARROW
           ========================================================================= */}
        <section className="w-full pt-1 pb-3 text-left">
          <div className="flex items-start gap-2.5 sm:gap-3">
            {/* Back Arrow Button */}
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
                {t.eligibilityPageTitle}
              </h1>

              <p
                className={`text-[#59635F] text-[12.5px] min-[360px]:text-[13px] sm:text-[14px] font-normal leading-snug mt-1.5 text-left ${
                  isTamil ? 'font-tamil' : ''
                }`}
              >
                {t.eligibilityPageDesc}
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            4. SCHEME IDENTITY CARD (Pale Green Background with Medical Pulse Icon)
           ========================================================================= */}
        <div className="w-full bg-[#EFF6ED] rounded-[18px] border border-[#D5E6D7] p-3 min-[360px]:p-3.5 sm:p-4 mb-3.5 shadow-2xs flex items-center justify-between gap-2.5 sm:gap-3 text-left">
          {/* Medical Pulse Outline Icon Badge */}
          <div className="w-11 h-11 min-[360px]:w-12 min-[360px]:h-12 rounded-[14px] bg-[#E1ECE3] text-[#155B4D] flex items-center justify-center shrink-0">
            <HeartPulse className="w-6 h-6 min-[360px]:w-6.5 min-[360px]:h-6.5 stroke-[2.3]" />
          </div>

          {/* Scheme Title & Department */}
          <div className="flex-1 min-w-0 pr-1 overflow-hidden">
            <h2
              className={`font-bold text-[#1E2522] text-[12px] min-[360px]:text-[13px] min-[390px]:text-[14px] sm:text-[15.5px] leading-snug break-words ${
                isTamil ? 'font-tamil' : ''
              }`}
            >
              {isTamil ? eligibilityData.schemeNameTa : eligibilityData.schemeNameEn}
            </h2>
            <p
              className={`text-[#48544F] font-medium text-[10px] min-[360px]:text-[10.5px] min-[390px]:text-[11.5px] sm:text-[12.5px] mt-0.5 leading-tight break-words ${
                isTamil ? 'font-tamil' : ''
              }`}
            >
              {isTamil ? eligibilityData.departmentTa : eligibilityData.departmentEn}
            </p>
          </div>

          {/* Right Status Badge */}
          <div className="shrink-0 ml-1">
            {renderCardStatusBadge(eligibilityData.overallStatus)}
          </div>
        </div>

        {/* =========================================================================
            5. HORIZONTAL SECTION TABS (4 Tabs: Assessment, Explanation, Documents, Official)
           ========================================================================= */}
        <div className="w-full mb-3.5 overflow-hidden">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {/* Tab 1: Eligibility Assessment */}
            <button
              type="button"
              onClick={() => handleTabClick('assessment')}
              className={`px-3.5 py-1.5 rounded-full text-[11.5px] min-[360px]:text-[12px] sm:text-[13px] font-semibold transition-all shrink-0 cursor-pointer ${
                activeTab === 'assessment'
                  ? 'bg-[#155B4D] text-white shadow-2xs'
                  : 'bg-white hover:bg-[#F2F6F3] border border-[#CBD8D0] text-[#155B4D]'
              } ${isTamil ? 'font-tamil' : ''}`}
            >
              {t.tabAssessment}
            </button>

            {/* Tab 2: Explanation */}
            <button
              type="button"
              onClick={() => handleTabClick('explanation')}
              className={`px-3.5 py-1.5 rounded-full text-[11.5px] min-[360px]:text-[12px] sm:text-[13px] font-semibold transition-all shrink-0 cursor-pointer ${
                activeTab === 'explanation'
                  ? 'bg-[#155B4D] text-white shadow-2xs'
                  : 'bg-white hover:bg-[#F2F6F3] border border-[#CBD8D0] text-[#155B4D]'
              } ${isTamil ? 'font-tamil' : ''}`}
            >
              {t.tabExplanation}
            </button>

            {/* Tab 3: Required Documents */}
            <button
              type="button"
              onClick={() => handleTabClick('documents')}
              className={`px-3.5 py-1.5 rounded-full text-[11.5px] min-[360px]:text-[12px] sm:text-[13px] font-semibold transition-all shrink-0 cursor-pointer ${
                activeTab === 'documents'
                  ? 'bg-[#155B4D] text-white shadow-2xs'
                  : 'bg-white hover:bg-[#F2F6F3] border border-[#CBD8D0] text-[#155B4D]'
              } ${isTamil ? 'font-tamil' : ''}`}
            >
              {t.tabDocuments}
            </button>

            {/* Tab 4: Official Information */}
            <button
              type="button"
              onClick={() => handleTabClick('official')}
              className={`px-3.5 py-1.5 rounded-full text-[11.5px] min-[360px]:text-[12px] sm:text-[13px] font-semibold transition-all shrink-0 cursor-pointer ${
                activeTab === 'official'
                  ? 'bg-[#155B4D] text-white shadow-2xs'
                  : 'bg-white hover:bg-[#F2F6F3] border border-[#CBD8D0] text-[#155B4D]'
              } ${isTamil ? 'font-tamil' : ''}`}
            >
              {t.tabOfficialInfo}
            </button>
          </div>
        </div>

        {/* =========================================================================
            6. OVERALL ELIGIBILITY ASSESSMENT BANNER (Pale Yellow with Wave Glyph)
           ========================================================================= */}
        <section
          ref={assessmentRef}
          className="w-full bg-[#FFF5D9] rounded-[16px] border border-[#FAD980]/80 p-3 min-[360px]:p-3.5 sm:p-4 mb-3.5 shadow-2xs flex items-center gap-3 text-left"
        >
          {/* Amber Circular Wave Icon */}
          <div className="w-10 h-10 min-[360px]:w-11 min-[360px]:h-11 sm:w-12 sm:h-12 rounded-full border-[2.2px] border-[#D98200] bg-[#FFF5D9] flex items-center justify-center text-[#D98200] font-bold text-[18px] min-[360px]:text-[20px] sm:text-[22px] leading-none select-none shadow-2xs shrink-0">
            ~
          </div>

          {/* Heading & Supporting Text */}
          <div className="flex-1 min-w-0 pr-0.5">
            <h3
              className={`text-[#202321] font-bold text-[13px] min-[360px]:text-[14px] min-[390px]:text-[15px] sm:text-[16.5px] leading-snug break-words ${
                isTamil ? 'font-tamil' : ''
              }`}
            >
              {isTamil ? eligibilityData.overallStatusTitleTa : eligibilityData.overallStatusTitleEn}
            </h3>
            <p
              className={`text-[#48544F] font-normal text-[10.5px] min-[360px]:text-[11.5px] min-[390px]:text-[12px] sm:text-[13px] leading-snug mt-1 break-words ${
                isTamil ? 'font-tamil' : ''
              }`}
            >
              {isTamil ? eligibilityData.overallStatusDescTa : eligibilityData.overallStatusDescEn}
            </p>
          </div>
        </section>

        {/* =========================================================================
            7. ELIGIBILITY CONDITIONS CARD (White Container with 4 Condition Rows)
           ========================================================================= */}
        <section className="w-full bg-white rounded-[18px] border border-[#DEE3DF] p-3 min-[360px]:p-3.5 sm:p-4 mb-3.5 text-left shadow-2xs">
          {/* Header Row: Title & View Explanation Action */}
          <div className="w-full flex items-center justify-between pb-2.5 border-b border-[#EAEFEA]">
            <h3
              className={`text-[#155B4D] font-bold text-[14px] min-[360px]:text-[15px] sm:text-[16.5px] leading-tight ${
                isTamil ? 'font-tamil' : ''
              }`}
            >
              {t.conditionsSectionTitle} ({eligibilityData.conditions.length})
            </h3>

            {/* View Explanation Trigger */}
            <button
              type="button"
              onClick={() => setIsOverviewExplanationOpen(true)}
              className="flex items-center gap-1 text-[#155B4D] hover:text-[#0F4238] transition-colors cursor-pointer group"
            >
              <span
                className={`text-[11px] min-[360px]:text-[11.5px] sm:text-[12.5px] font-semibold group-hover:underline ${
                  isTamil ? 'font-tamil' : ''
                }`}
              >
                {t.viewExplanationAction}
              </span>
              <div className="w-4 h-4 rounded-full border-[1.2px] border-[#155B4D] flex items-center justify-center font-serif text-[10px] font-bold leading-none shrink-0">
                i
              </div>
            </button>
          </div>

          {/* Four Individual Eligibility Condition Rows */}
          <div className="w-full flex flex-col divide-y divide-[#F0F4F1]">
            {eligibilityData.conditions.map((condition) => (
              <div
                key={condition.id}
                onClick={() => setSelectedCondition(condition)}
                className="w-full py-2.5 min-[360px]:py-3 flex items-center justify-between gap-2 min-[360px]:gap-2.5 transition-colors hover:bg-[#FAFBF9] rounded-[8px] px-1 cursor-pointer"
              >
                {/* Left Status Glyph */}
                <div className="shrink-0">{renderConditionIcon(condition.status)}</div>

                {/* Condition Description */}
                <div className="flex-1 min-w-0 pr-1">
                  <p
                    className={`text-[#202321] text-[11px] min-[360px]:text-[12px] min-[390px]:text-[12.5px] sm:text-[13.5px] font-medium leading-snug break-words ${
                      isTamil ? 'font-tamil' : ''
                    }`}
                  >
                    {isTamil ? condition.textTa : condition.textEn}
                  </p>
                </div>

                {/* Right Status Pill & Navigation Chevron */}
                <div className="flex items-center gap-1 min-[360px]:gap-1.5 shrink-0">
                  {renderConditionStatusPill(condition)}
                  <ChevronRight className="w-4 h-4 text-[#48544F] stroke-[2.2] shrink-0" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================================
            8. FINAL ELIGIBILITY EXPLANATION CARD (Soft Green with Document Icon)
           ========================================================================= */}
        <section
          ref={explanationRef}
          className="w-full bg-[#EFF6ED] rounded-[18px] border border-[#D5E6D7] p-3 min-[360px]:p-3.5 sm:p-4 mb-3.5 shadow-2xs flex items-start gap-3 text-left"
        >
          {/* Pale Green Square Document Glyph */}
          <div className="w-10 h-10 min-[360px]:w-11 min-[360px]:h-11 rounded-[12px] bg-[#E1ECE3] text-[#155B4D] flex items-center justify-center shrink-0 mt-0.5">
            <FileText className="w-5.5 h-5.5 stroke-[2.2]" />
          </div>

          {/* Heading & Paragraph Text */}
          <div className="flex-1 min-w-0">
            <h3
              className={`text-[#155B4D] font-bold text-[14px] min-[360px]:text-[15px] sm:text-[16.5px] leading-tight ${
                isTamil ? 'font-tamil' : ''
              }`}
            >
              {isTamil ? eligibilityData.explanationHeadingTa : eligibilityData.explanationHeadingEn}
            </h3>

            <p
              className={`text-[#3E4B45] font-normal text-[11px] min-[360px]:text-[12px] min-[390px]:text-[12.5px] sm:text-[13.5px] leading-relaxed mt-1.5 break-words ${
                isTamil ? 'font-tamil' : ''
              }`}
            >
              {isTamil ? eligibilityData.explanationTextTa : eligibilityData.explanationTextEn}
            </p>
          </div>
        </section>

        {/* =========================================================================
            9. REQUIRED DOCUMENTS SECTION (White Card with 3 Document Subcards)
           ========================================================================= */}
        <section
          ref={documentsRef}
          className="w-full bg-white rounded-[18px] border border-[#DEE3DF] p-3 min-[360px]:p-3.5 sm:p-4 mb-3.5 text-left shadow-2xs"
        >
          {/* Header Row: Document Icon, Title & View All */}
          <div className="w-full flex items-center justify-between pb-2 border-b border-[#EAEFEA]">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#155B4D] stroke-[2.3]" />
              <h3
                className={`text-[#1E2522] font-bold text-[13.5px] min-[360px]:text-[14.5px] sm:text-[16px] leading-tight ${
                  isTamil ? 'font-tamil' : ''
                }`}
              >
                {t.requiredDocsSectionTitle} ({eligibilityData.requiredDocuments.length})
              </h3>
            </div>

            {/* View All Trigger */}
            <button
              type="button"
              onClick={() => onViewAllDocuments?.(schemeId)}
              className="flex items-center gap-0.5 text-[#155B4D] hover:text-[#0F4238] transition-colors cursor-pointer group"
            >
              <span
                className={`text-[11px] min-[360px]:text-[11.5px] sm:text-[12.5px] font-semibold group-hover:underline ${
                  isTamil ? 'font-tamil' : ''
                }`}
              >
                {t.viewAllDocsAction}
              </span>
              <ChevronRight className="w-4 h-4 text-[#155B4D] stroke-[2.3] shrink-0" />
            </button>
          </div>

          {/* Three Document Cards Grid */}
          <div className="w-full grid grid-cols-3 gap-2 min-[360px]:gap-2.5 mt-3">
            {eligibilityData.requiredDocuments.map((doc) => (
              <div
                key={doc.id}
                className="bg-[#FAFBF9] rounded-[14px] border border-[#DEE3DF] p-2 min-[360px]:p-2.5 flex flex-col items-center text-center shadow-2xs hover:border-[#CBD3CE] transition-all"
              >
                {/* Pale Green Circular Icon Badge */}
                <div className="w-8 h-8 min-[360px]:w-9 min-[360px]:h-9 rounded-full bg-[#E5F1E7] text-[#155B4D] flex items-center justify-center mb-1.5 shrink-0">
                  {renderDocumentIcon(doc.iconType)}
                </div>

                {/* Document Name */}
                <h4
                  className={`text-[#1E2522] font-bold text-[10px] min-[360px]:text-[11px] sm:text-[12px] leading-tight line-clamp-1 ${
                    isTamil ? 'font-tamil' : ''
                  }`}
                >
                  {isTamil ? doc.titleTa : doc.titleEn}
                </h4>

                {/* Document Description/Purpose */}
                <p
                  className={`text-[#606B66] text-[8.5px] min-[360px]:text-[9px] sm:text-[10px] leading-tight mt-1 line-clamp-2 ${
                    isTamil ? 'font-tamil' : ''
                  }`}
                >
                  {isTamil ? doc.descTa : doc.descEn}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================================
            10. OFFICIAL SOURCE CARD (Soft Green Container with Link & URL)
           ========================================================================= */}
        <section
          ref={officialRef}
          className="w-full bg-[#EFF6ED] rounded-[14px] border border-[#D5E6D7] p-2.5 min-[360px]:p-3 sm:p-3.5 mb-4 flex items-center justify-between text-left gap-2 shadow-2xs"
        >
          {/* Left: Link Icon Badge */}
          <div className="w-8 h-8 rounded-[10px] bg-[#E1ECE3] text-[#155B4D] flex items-center justify-center shrink-0">
            <Link2 className="w-4.5 h-4.5 stroke-[2.3]" />
          </div>

          {/* Middle: Title & Organization Label */}
          <div className="flex-1 min-w-0 pr-1">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span
                className={`text-[#155B4D] font-bold text-[11px] min-[360px]:text-[12px] sm:text-[13px] leading-tight ${
                  isTamil ? 'font-tamil' : ''
                }`}
              >
                {t.officialSourceHeading}
              </span>
              <span className="text-[#CBD8D0] text-[12px] hidden min-[360px]:inline">|</span>
              <span
                className={`text-[#333E39] font-medium text-[10.5px] min-[360px]:text-[11px] sm:text-[12px] truncate ${
                  isTamil ? 'font-tamil' : ''
                }`}
              >
                {isTamil ? eligibilityData.officialSourceOrgTa : eligibilityData.officialSourceOrgEn}
              </span>
            </div>
          </div>

          {/* Right: Clickable Verified URL Link */}
          <a
            href={eligibilityData.officialSourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[#155B4D] hover:text-[#0F4238] font-semibold text-[10.5px] min-[360px]:text-[11.5px] sm:text-[12.5px] hover:underline shrink-0"
          >
            <span className="truncate max-w-[130px] min-[360px]:max-w-[170px] sm:max-w-none">
              {eligibilityData.officialSourceUrl}
            </span>
            <ExternalLink className="w-3.5 h-3.5 stroke-[2.4] shrink-0" />
          </a>
        </section>

        {/* =========================================================================
            11. TWO BOTTOM ACTION BUTTONS: Back to Results & Prepare Documents
           ========================================================================= */}
        <div className="w-full flex items-center gap-2 min-[360px]:gap-2.5 sm:gap-3 mt-1 mb-2">
          {/* Left Secondary Action: Back to Results (முடிவுகளுக்குத் திரும்ப) */}
          <button
            type="button"
            onClick={onNavigateBack}
            className="h-[50px] sm:h-[54px] px-3 min-[360px]:px-4 bg-transparent hover:bg-[#E5F1E7]/40 active:scale-[0.99] border-[1.5px] border-[#155B4D] text-[#155B4D] font-bold text-[11.5px] min-[360px]:text-[12.5px] sm:text-[13.5px] rounded-[15px] sm:rounded-[16px] flex items-center justify-center gap-1 transition-all cursor-pointer shrink-0"
          >
            <ChevronLeft className="w-4.5 h-4.5 stroke-[2.6]" />
            <span className={`whitespace-nowrap ${isTamil ? 'font-tamil' : ''}`}>
              {t.actionBackToResults}
            </span>
          </button>

          {/* Right Primary Action: Continue to Prepare Documents (ஆவணங்களைத் தயாரிக்கத் தொடங்கு) */}
          <button
            type="button"
            onClick={() => onContinueToDocuments?.(schemeId)}
            className="flex-1 h-[50px] sm:h-[54px] px-3 min-[360px]:px-4 bg-[#155B4D] hover:bg-[#10483D] active:scale-[0.99] text-white font-bold text-[11px] min-[360px]:text-[12px] sm:text-[13.5px] rounded-[15px] sm:rounded-[16px] flex items-center justify-between shadow-xs transition-all cursor-pointer min-w-0"
          >
            <FileText className="w-4 h-4 min-[360px]:w-4.5 min-[360px]:h-4.5 stroke-[2.3] shrink-0" />
            <span className={`truncate px-1 text-center ${isTamil ? 'font-tamil' : ''}`}>
              {t.actionContinuePrepareDocs}
            </span>
            <ChevronRight className="w-4 h-4 min-[360px]:w-4.5 min-[360px]:h-4.5 stroke-[2.5] shrink-0" />
          </button>
        </div>
      </main>

      {/* =========================================================================
          CONDITION EXPLANATION MODAL (Detailed condition breakdown on click)
         ========================================================================= */}
      {selectedCondition && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end sm:items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-white rounded-t-[24px] sm:rounded-[20px] p-5 shadow-2xl border border-[#DEE3DF] text-left">
            <div className="flex items-center justify-between pb-3 border-b border-[#EAEFEA]">
              <div className="flex items-center gap-2">
                {renderConditionIcon(selectedCondition.status)}
                <h3 className={`font-bold text-[#155B4D] text-[15px] ${isTamil ? 'font-tamil' : ''}`}>
                  {isTamil ? 'தகுதி விவரம்' : 'Condition Details'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCondition(null)}
                className="p-1 rounded-full text-[#606B66] hover:bg-[#F0F4F1] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5 stroke-[2.2]" />
              </button>
            </div>

            <div className="py-4">
              <h4 className={`font-bold text-[#1E2522] text-[14px] leading-snug ${isTamil ? 'font-tamil' : ''}`}>
                {isTamil ? selectedCondition.textTa : selectedCondition.textEn}
              </h4>

              <div className="mt-2.5 flex items-center gap-2">
                <span className="text-[12px] text-[#606B66] font-medium">
                  {isTamil ? 'நிலை:' : 'Status:'}
                </span>
                {renderConditionStatusPill(selectedCondition)}
              </div>

              <div className="mt-4 p-3 bg-[#EFF6ED] rounded-[12px] border border-[#D5E6D7]">
                <p className={`text-[12.5px] text-[#3E4B45] leading-relaxed ${isTamil ? 'font-tamil' : ''}`}>
                  {isTamil ? selectedCondition.explanationTa : selectedCondition.explanationEn}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setSelectedCondition(null)}
              className="w-full h-11 bg-[#155B4D] hover:bg-[#10483D] text-white font-bold text-[13px] rounded-[12px] transition-all cursor-pointer"
            >
              {isTamil ? 'சரி' : 'Close'}
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
          OVERVIEW EXPLANATION MODAL (Triggered by "விளக்கம் பார்க்க")
         ========================================================================= */}
      {isOverviewExplanationOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end sm:items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-white rounded-t-[24px] sm:rounded-[20px] p-5 shadow-2xl border border-[#DEE3DF] text-left">
            <div className="flex items-center justify-between pb-3 border-b border-[#EAEFEA]">
              <div className="flex items-center gap-2">
                <Info className="w-5 h-5 text-[#155B4D]" />
                <h3 className={`font-bold text-[#155B4D] text-[15px] ${isTamil ? 'font-tamil' : ''}`}>
                  {isTamil ? 'தகுதி மதிப்பீடு விளக்கம்' : 'Eligibility Evaluation Overview'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsOverviewExplanationOpen(false)}
                className="p-1 rounded-full text-[#606B66] hover:bg-[#F0F4F1] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5 stroke-[2.2]" />
              </button>
            </div>

            <div className="py-4 space-y-3">
              <p className={`text-[13px] text-[#3E4B45] leading-relaxed ${isTamil ? 'font-tamil' : ''}`}>
                {isTamil
                  ? 'உரிமையறம் மதிப்பீட்டு முறைமை உங்கள் குடும்ப சுயவிவரத் தகவல்களை அரசு வழிகாட்டுதல்கள் மற்றும் தகுதி விதிகளுடன் ஒப்பிட்டு இந்த மதிப்பீட்டை வழங்குகிறது.'
                  : 'The URIMAI ARAM evaluation engine compares your registered household profile against official scheme guidelines and published criteria to evaluate eligibility.'}
              </p>
              <div className="p-3 bg-[#FFF5D9] rounded-[12px] border border-[#FAD980]/80">
                <p className={`text-[12px] text-[#614A00] leading-snug ${isTamil ? 'font-tamil' : ''}`}>
                  {isTamil
                    ? 'நிபந்தனையுடன் பொருந்தும் திட்டங்களுக்கு தேவையான ஆவணங்கள் மற்றும் சான்றிதழ்களை அரசு சேவை மையங்களில் சமர்ப்பித்தால் இறுதி அனுமதி பெறலாம்.'
                    : 'For conditional matches, submitting the required certificates and supporting documents at government e-Sevai or VAO counters will complete formal enrollment.'}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOverviewExplanationOpen(false)}
              className="w-full h-11 bg-[#155B4D] hover:bg-[#10483D] text-white font-bold text-[13px] rounded-[12px] transition-all cursor-pointer"
            >
              {isTamil ? 'புரிந்தது' : 'Understood'}
            </button>
          </div>
        </div>
      )}

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
