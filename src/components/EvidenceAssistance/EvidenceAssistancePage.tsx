import React, { useRef, useState } from 'react';
import {
  AlertCircle,
  ArrowLeft,
  Camera,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Clock,
  CreditCard,
  FileCheck,
  FileText,
  HeartPulse,
  Info,
  Lightbulb,
  Maximize,
  Network,
  RotateCcw,
  Upload,
  User,
  X,
} from 'lucide-react';
import { DashboardHeader } from '../Dashboard/DashboardHeader';
import { CitizenNotification, NotificationDrawer } from '../Dashboard/modals/NotificationDrawer';
import { getSchemeEvidenceData } from '../../data/evidenceData';
import { translations } from '../../data/translations';
import {
  EvidenceDocumentItem,
  EvidenceDocumentStatus,
  HouseholdMember,
  HouseholdProfile,
  Language,
  SchemeOutcomeStatus,
} from '../../types';

interface EvidenceAssistancePageProps {
  currentLang: Language;
  schemeId?: string;
  householdProfile?: HouseholdProfile;
  householdMembers?: HouseholdMember[];
  onNavigateBack: () => void;
  onNavigateHome: () => void;
  onOpenLanguage: () => void;
}

export const EvidenceAssistancePage: React.FC<EvidenceAssistancePageProps> = ({
  currentLang,
  schemeId = 'cmchis',
  onNavigateBack,
  onNavigateHome,
  onOpenLanguage,
}) => {
  const isTamil = currentLang === 'ta';
  const t = translations[currentLang];

  // Base scheme evidence data
  const initialData = getSchemeEvidenceData(schemeId);
  const [documents, setDocuments] = useState<EvidenceDocumentItem[]>(initialData.documents);

  // Active navigation tab state
  type NavTabId = 'required' | 'assistance' | 'status' | 'next';
  const [activeTab, setActiveTab] = useState<NavTabId>('required');

  // Interactive modal states
  const [selectedDoc, setSelectedDoc] = useState<EvidenceDocumentItem | null>(null);
  const [isGuidanceModalOpen, setIsGuidanceModalOpen] = useState(false);
  const [isUploadDrawerOpen, setIsUploadDrawerOpen] = useState(false);
  const [uploadingDocId, setUploadingDocId] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploadSuccessMessage, setUploadSuccessMessage] = useState<string | null>(null);

  // Notifications drawer state
  const [isNotificationDrawerOpen, setIsNotificationDrawerOpen] = useState(false);
  const [notifications, setNotifications] = useState<CitizenNotification[]>([
    {
      id: 'notif-doc-1',
      titleEn: 'Income Certificate Needed',
      titleTa: 'வருமானச் சான்று தேவைப்படுகிறது',
      descEn: 'Please upload income certificate issued within the last 6 months.',
      descTa: 'கடந்த 6 மாதங்களுக்குள் பெறப்பட்ட வருமானச் சான்றைப் பதிவேற்றவும்.',
      timeEn: '5m ago',
      timeTa: '5 நிமிடங்களுக்கு முன்',
      read: false,
      type: 'document',
    },
    {
      id: 'notif-doc-2',
      titleEn: 'Ration Card Available',
      titleTa: 'ரேஷன் கார்டு தயாராக உள்ளது',
      descEn: 'Your smart ration card details are linked to your profile.',
      descTa: 'உங்கள் ஸ்மார்ட் குடும்ப அட்டை விவரங்கள் சுயவிவரத்தில் உள்ளன.',
      timeEn: '2h ago',
      timeTa: '2 மணி நேரத்திற்கு முன்',
      read: true,
      type: 'document',
    },
  ]);

  // Section anchor ref for smooth scrolling
  const docListRef = useRef<HTMLDivElement>(null);

  const handleTabClick = (tab: NavTabId) => {
    setActiveTab(tab);
    if (tab === 'required') {
      docListRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (tab === 'assistance') {
      setIsGuidanceModalOpen(true);
    } else if (tab === 'status') {
      // Toggle to open upload drawer for missing/pending verification
      const pendingDoc = documents.find((d) => d.status !== 'available');
      if (pendingDoc) {
        setSelectedDoc(pendingDoc);
      } else if (documents[0]) {
        setSelectedDoc(documents[0]);
      }
    } else if (tab === 'next') {
      setIsGuidanceModalOpen(true);
    }
  };

  // Simulate file upload with progress bar
  const handleSimulatedUpload = (docId: string, fileName: string) => {
    setUploadingDocId(docId);
    setUploadProgress(15);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          setTimeout(() => {
            setDocuments((prevDocs) =>
              prevDocs.map((doc) =>
                doc.id === docId
                  ? {
                      ...doc,
                      status: 'available',
                      statusLabelEn: 'Uploaded (Pending VAO Verification)',
                      statusLabelTa: 'பதிவேற்றப்பட்டது',
                      uploadedFileName: fileName,
                      uploadedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    }
                  : doc
              )
            );
            setUploadingDocId(null);
            setUploadProgress(0);
            setUploadSuccessMessage(
              isTamil
                ? 'ஆவணம் வெற்றிகரமாக பதிவேற்றப்பட்டது!'
                : 'Document successfully uploaded and saved!'
            );
            setTimeout(() => setUploadSuccessMessage(null), 3500);
          }, 400);
          return 100;
        }
        return prev + 25;
      });
    }, 180);
  };

  // Helper: Scheme context card status badge
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
    }
  };

  // Helper: Document row icon
  const renderDocumentRowIcon = (iconType: string) => {
    switch (iconType) {
      case 'ration':
        return <CreditCard className="w-4 h-4 min-[360px]:w-4.5 min-[360px]:h-4.5 sm:w-5.5 sm:h-5.5 stroke-[2.2]" />;
      case 'aadhaar':
        return <User className="w-4 h-4 min-[360px]:w-4.5 min-[360px]:h-4.5 sm:w-5.5 sm:h-5.5 stroke-[2.2]" />;
      case 'income':
      case 'certificate':
        return <FileText className="w-4 h-4 min-[360px]:w-4.5 min-[360px]:h-4.5 sm:w-5.5 sm:h-5.5 stroke-[2.2]" />;
      default:
        return <FileCheck className="w-4 h-4 min-[360px]:w-4.5 min-[360px]:h-4.5 sm:w-5.5 sm:h-5.5 stroke-[2.2]" />;
    }
  };

  // Helper: Document row status badge
  const renderDocumentStatusBadge = (doc: EvidenceDocumentItem) => {
    switch (doc.status) {
      case 'available':
        return (
          <div className="bg-[#E6F4EA] text-[#137333] border border-[#CEEAD6] px-1.5 min-[360px]:px-2 py-0.5 min-[360px]:py-1 rounded-full text-[7.5px] min-[360px]:text-[8px] min-[390px]:text-[8.5px] sm:text-[9.5px] font-semibold flex items-center gap-1 shadow-2xs whitespace-nowrap select-none shrink-0">
            <div className="w-2.5 h-2.5 min-[360px]:w-3 min-[360px]:h-3 rounded-full bg-[#137333] text-white flex items-center justify-center shrink-0">
              <Check className="w-1.5 min-[360px]:w-2 h-1.5 min-[360px]:h-2 stroke-[3]" />
            </div>
            <span className={isTamil ? 'font-tamil' : ''}>
              {isTamil ? doc.statusLabelTa : doc.statusLabelEn}
            </span>
          </div>
        );
      case 'verification_required':
        return (
          <div className="bg-[#FEF7E0] text-[#B06000] border border-[#FEEFC3] px-1.5 min-[360px]:px-2 py-0.5 rounded-full text-[7px] min-[360px]:text-[7.5px] min-[390px]:text-[8px] sm:text-[9px] font-semibold flex items-center gap-1 shadow-2xs shrink-0 select-none">
            <div className="w-2.5 h-2.5 min-[360px]:w-3 min-[360px]:h-3 rounded-full border-[1.2px] border-[#B06000] text-[#B06000] flex items-center justify-center shrink-0">
              <Clock className="w-1.5 min-[360px]:w-2 h-1.5 min-[360px]:h-2 stroke-[2.5]" />
            </div>
            <div className={`flex flex-col text-left leading-[1.05] ${isTamil ? 'font-tamil' : ''}`}>
              {isTamil ? (
                <>
                  <span className="whitespace-nowrap">சரிபார்க்க</span>
                  <span className="whitespace-nowrap">வேண்டும்</span>
                </>
              ) : (
                <>
                  <span className="whitespace-nowrap">Verification</span>
                  <span className="whitespace-nowrap">Required</span>
                </>
              )}
            </div>
          </div>
        );
      case 'missing':
      default:
        return (
          <div className="bg-[#FCE8E6] text-[#C5221F] border border-[#FAD2CF] px-1.5 min-[360px]:px-2 py-0.5 rounded-full text-[7.5px] min-[360px]:text-[8px] min-[390px]:text-[8.5px] sm:text-[9.5px] font-semibold flex items-center gap-1 shadow-2xs whitespace-nowrap select-none shrink-0">
            <div className="w-2.5 h-2.5 min-[360px]:w-3 min-[360px]:h-3 rounded-full border-[1.2px] border-[#C5221F] text-[#C5221F] flex items-center justify-center shrink-0 font-bold text-[8px] min-[360px]:text-[9px] leading-none">
              !
            </div>
            <span className={isTamil ? 'font-tamil' : ''}>
              {isTamil ? doc.statusLabelTa : doc.statusLabelEn}
            </span>
          </div>
        );
    }
  };

  return (
    <div className="relative w-full mx-auto min-h-screen bg-[#FCF9F4] text-[#202321] flex flex-col justify-between overflow-x-hidden pt-1 pb-6 antialiased select-none">
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

        {/* Global Success Notification banner if document uploaded */}
        {uploadSuccessMessage && (
          <div className="w-full mb-3 bg-[#E6F4EA] border border-[#CEEAD6] text-[#137333] px-3.5 py-2.5 rounded-[12px] flex items-center gap-2 shadow-xs animate-in fade-in slide-in-from-top-2">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span className={`text-[12px] font-semibold ${isTamil ? 'font-tamil' : ''}`}>
              {uploadSuccessMessage}
            </span>
          </div>
        )}

        {/* =========================================================================
            3. PAGE INTRODUCTION WITH BACK ARROW
           ========================================================================= */}
        <section className="w-full pt-1 pb-3 text-left">
          <div className="flex items-start gap-2.5 sm:gap-3">
            {/* Back Arrow Button */}
            <button
              type="button"
              onClick={onNavigateBack}
              className="mt-0.5 p-1 -ml-1 text-[#065B38] hover:bg-[#E3F2DB]/60 active:scale-95 rounded-full transition-all cursor-pointer shrink-0"
              aria-label={t.back}
            >
              <ArrowLeft className="w-5.5 h-5.5 sm:w-6 sm:h-6 stroke-[2.4]" />
            </button>

            <div className="flex-1 flex flex-col">
              <h1
                className={`text-[#065B38] font-bold text-[22px] min-[360px]:text-[24px] sm:text-[26px] leading-[1.25] tracking-tight text-left ${
                  isTamil ? 'font-tamil' : ''
                }`}
              >
                {t.evidencePageTitle}
              </h1>

              <p
                className={`text-[#53616B] text-[12px] min-[360px]:text-[12.5px] sm:text-[13.5px] font-normal leading-snug mt-1.5 text-left ${
                  isTamil ? 'font-tamil' : ''
                }`}
              >
                {t.evidencePageDesc}
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            4. SCHEME CONTEXT CARD (Medical Pulse Icon, Title, Department & Badge)
           ========================================================================= */}
        <div className="w-full bg-[#F2F7EF] rounded-[18px] border border-[#DCE9D9] p-2.5 min-[360px]:p-3 sm:p-4 mb-3.5 shadow-2xs flex items-center justify-between gap-2 min-[360px]:gap-2.5 sm:gap-3 text-left">
          {/* Medical Pulse Outline Icon Badge */}
          <div className="w-9.5 h-9.5 min-[360px]:w-10 min-[360px]:h-10 sm:w-11 sm:h-11 rounded-[12px] bg-[#E3F2DB] text-[#065B38] flex items-center justify-center shrink-0">
            <HeartPulse className="w-5 h-5 min-[360px]:w-5.5 min-[360px]:h-5.5 stroke-[2.3]" />
          </div>

          {/* Scheme Title & Department */}
          <div className="flex-1 min-w-0 pr-1 overflow-hidden">
            <h2
              className={`font-bold text-[#202321] text-[11px] min-[360px]:text-[12px] min-[390px]:text-[13px] sm:text-[14.5px] leading-snug break-words ${
                isTamil ? 'font-tamil' : ''
              }`}
            >
              {isTamil ? initialData.schemeNameTa : initialData.schemeNameEn}
            </h2>
            <p
              className={`text-[#53616B] font-medium text-[8.5px] min-[360px]:text-[9px] min-[390px]:text-[9.5px] sm:text-[10.5px] mt-0.5 leading-tight break-words ${
                isTamil ? 'font-tamil' : ''
              }`}
            >
              {isTamil ? initialData.departmentTa : initialData.departmentEn}
            </p>
          </div>

          {/* Right Status Badge */}
          <div className="shrink-0 ml-1">
            {renderCardStatusBadge(initialData.eligibilityStatus)}
          </div>
        </div>

        {/* =========================================================================
            5. FOUR HORIZONTAL NAVIGATION TABS (Required Docs, Upload Assistance, Status, Next Steps)
           ========================================================================= */}
        <div className="w-full mb-3.5 overflow-hidden">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {/* Tab 1: Required Documents (Active by default) */}
            <button
              type="button"
              onClick={() => handleTabClick('required')}
              className={`px-3.5 py-2 rounded-[13px] sm:rounded-[14px] text-[11px] min-[360px]:text-[11.5px] sm:text-[12.5px] font-semibold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'required'
                  ? 'bg-[#065B38] text-white shadow-2xs'
                  : 'bg-white hover:bg-[#F2F7EF] border border-[#DCE9D9] text-[#065B38]'
              } ${isTamil ? 'font-tamil' : ''}`}
            >
              <FileText className="w-4 h-4 stroke-[2.3]" />
              <span>{t.evidenceTabRequired}</span>
            </button>

            {/* Tab 2: Upload Assistance */}
            <button
              type="button"
              onClick={() => handleTabClick('assistance')}
              className={`px-3.5 py-2 rounded-[13px] sm:rounded-[14px] text-[11px] min-[360px]:text-[11.5px] sm:text-[12.5px] font-semibold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'assistance'
                  ? 'bg-[#065B38] text-white shadow-2xs'
                  : 'bg-white hover:bg-[#F2F7EF] border border-[#DCE9D9] text-[#065B38]'
              } ${isTamil ? 'font-tamil' : ''}`}
            >
              <Maximize className="w-4 h-4 stroke-[2.3]" />
              <span>{t.evidenceTabUploadAssistance}</span>
            </button>

            {/* Tab 3: Verification Status */}
            <button
              type="button"
              onClick={() => handleTabClick('status')}
              className={`px-3.5 py-2 rounded-[13px] sm:rounded-[14px] text-[11px] min-[360px]:text-[11.5px] sm:text-[12.5px] font-semibold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'status'
                  ? 'bg-[#065B38] text-white shadow-2xs'
                  : 'bg-white hover:bg-[#F2F7EF] border border-[#DCE9D9] text-[#065B38]'
              } ${isTamil ? 'font-tamil' : ''}`}
            >
              <ClipboardCheck className="w-4 h-4 stroke-[2.3]" />
              <span>{t.evidenceTabVerificationStatus}</span>
            </button>

            {/* Tab 4: Next Steps / Additional Documents */}
            <button
              type="button"
              onClick={() => handleTabClick('next')}
              className={`px-3.5 py-2 rounded-[13px] sm:rounded-[14px] text-[11px] min-[360px]:text-[11.5px] sm:text-[12.5px] font-semibold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'next'
                  ? 'bg-[#065B38] text-white shadow-2xs'
                  : 'bg-white hover:bg-[#F2F7EF] border border-[#DCE9D9] text-[#065B38]'
              } ${isTamil ? 'font-tamil' : ''}`}
            >
              <Network className="w-4 h-4 stroke-[2.3]" />
              <span>{t.evidenceTabAdditionalDocs}</span>
            </button>
          </div>
        </div>

        {/* =========================================================================
            6. REQUIRED DOCUMENTS SECTION HEADING
           ========================================================================= */}
        <div ref={docListRef} className="w-full text-left pt-1 pb-2">
          <h2
            className={`text-[#065B38] font-bold text-[16px] min-[360px]:text-[17px] sm:text-[19px] leading-tight ${
              isTamil ? 'font-tamil' : ''
            }`}
          >
            {t.evidenceSectionTitle} ({documents.length})
          </h2>

          <p
            className={`text-[#53616B] text-[11px] min-[360px]:text-[11.5px] sm:text-[12.5px] font-normal leading-snug mt-1 ${
              isTamil ? 'font-tamil' : ''
            }`}
          >
            {t.evidenceSectionDesc}
          </p>
        </div>

        {/* =========================================================================
            7. UNIFIED DOCUMENT LIST CONTAINER (White card holding 3 document rows)
           ========================================================================= */}
        <section className="w-full bg-white rounded-[18px] border border-[#DEE3DF] p-2 min-[360px]:p-2.5 sm:p-4 mb-3.5 text-left shadow-2xs">
          <div className="w-full flex flex-col divide-y divide-[#F0F4F1]">
            {documents.map((doc) => (
              <div
                key={doc.id}
                onClick={() => setSelectedDoc(doc)}
                className="w-full py-2.5 min-[360px]:py-3 flex items-center justify-between gap-2 min-[360px]:gap-2.5 sm:gap-3 transition-colors hover:bg-[#FAFBF9] rounded-[10px] px-0.5 min-[360px]:px-1 cursor-pointer group"
              >
                {/* Left Document Icon Badge */}
                <div className="w-8.5 h-8.5 min-[360px]:w-9.5 min-[360px]:h-9.5 sm:w-11 sm:h-11 rounded-[10px] sm:rounded-[12px] bg-[#E3F2DB] text-[#065B38] flex items-center justify-center shrink-0">
                  {renderDocumentRowIcon(doc.iconType)}
                </div>

                {/* Document Title and Description */}
                <div className="flex-1 min-w-0 pr-1 overflow-hidden">
                  <h3
                    className={`font-bold text-[#202321] text-[11px] min-[360px]:text-[11.5px] min-[390px]:text-[12.5px] sm:text-[14px] leading-tight break-words ${
                      isTamil ? 'font-tamil' : ''
                    }`}
                  >
                    {isTamil ? doc.titleTa : doc.titleEn}
                  </h3>

                  <p
                    className={`text-[#53616B] text-[8.5px] min-[360px]:text-[9px] min-[390px]:text-[9.5px] sm:text-[10.5px] font-normal mt-0.5 leading-snug break-words ${
                      isTamil ? 'font-tamil' : ''
                    }`}
                  >
                    {isTamil ? doc.descTa : doc.descEn}
                  </p>

                  {/* If user uploaded a file */}
                  {doc.uploadedFileName && (
                    <span className="inline-flex items-center gap-1 mt-1 text-[8.5px] text-[#065B38] font-semibold bg-[#E3F2DB] px-1.5 py-0.5 rounded">
                      <FileCheck className="w-3 h-3" />
                      {doc.uploadedFileName}
                    </span>
                  )}
                </div>

                {/* Right Status Badge & Forward Navigation Chevron */}
                <div className="flex items-center gap-1 min-[360px]:gap-1.5 shrink-0 ml-1">
                  {renderDocumentStatusBadge(doc)}
                  <ChevronRight className="w-3.5 h-3.5 min-[360px]:w-4 min-[360px]:h-4 text-[#48544F] group-hover:text-[#065B38] stroke-[2.2] shrink-0 transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================================
            8. ASSISTANCE CARD (Lightbulb icon, Heading, Description & Action Button)
           ========================================================================= */}
        <section className="w-full bg-[#F2F7EF] rounded-[18px] border border-[#DCE9D9] p-2.5 min-[360px]:p-3 sm:p-4 mb-3.5 shadow-2xs flex items-center justify-between gap-2 min-[360px]:gap-2.5 sm:gap-3 text-left">
          {/* Lightbulb Glyph */}
          <div className="w-8.5 h-8.5 min-[360px]:w-9.5 min-[360px]:h-9.5 sm:w-10 sm:h-10 rounded-[12px] bg-[#E3F2DB] text-[#065B38] flex items-center justify-center shrink-0">
            <Lightbulb className="w-4.5 h-4.5 min-[360px]:w-5 min-[360px]:h-5 sm:w-5.5 sm:h-5.5 stroke-[2.2]" />
          </div>

          {/* Heading & Supporting Text */}
          <div className="flex-1 min-w-0 pr-1">
            <h3
              className={`text-[#065B38] font-bold text-[12px] min-[360px]:text-[13px] sm:text-[14.5px] leading-snug ${
                isTamil ? 'font-tamil' : ''
              }`}
            >
              {t.docAssistanceTitle}
            </h3>

            <p
              className={`text-[#53616B] font-normal text-[8.5px] min-[360px]:text-[9px] min-[390px]:text-[9.5px] sm:text-[10.5px] leading-snug mt-0.5 break-words ${
                isTamil ? 'font-tamil' : ''
              }`}
            >
              {t.docAssistanceDesc}
            </p>
          </div>

          {/* Right Action Button: உதவி பெறுக > */}
          <button
            type="button"
            onClick={() => setIsGuidanceModalOpen(true)}
            className={`bg-white hover:bg-[#E3F2DB]/50 active:scale-95 border-[1.5px] border-[#065B38] text-[#065B38] font-bold text-[9.5px] min-[360px]:text-[10.5px] sm:text-[11.5px] px-2 min-[360px]:px-2.5 py-1 sm:py-1.5 rounded-full flex items-center gap-1 transition-all cursor-pointer shrink-0 shadow-2xs ${
              isTamil ? 'font-tamil' : ''
            }`}
          >
            <span>{t.docAssistanceAction}</span>
            <ChevronRight className="w-3 h-3 min-[360px]:w-3.5 min-[360px]:h-3.5 stroke-[2.6]" />
          </button>
        </section>

        {/* =========================================================================
            9. IMPORTANT NOTICE BANNER (Pale Yellow with Amber Info Glyph)
           ========================================================================= */}
        <section className="w-full bg-[#FEF2D2] rounded-[14px] border border-[#FAD980]/80 p-2.5 min-[360px]:p-3 sm:p-3.5 mb-3.5 flex items-center gap-2 min-[360px]:gap-2.5 sm:gap-3 text-left shadow-2xs">
          {/* Amber Circular Info Glyph */}
          <div className="w-4.5 h-4.5 min-[360px]:w-5 min-[360px]:h-5 rounded-full border-[1.8px] border-[#D99508] text-[#D99508] flex items-center justify-center font-serif text-[10.5px] min-[360px]:text-[11.5px] font-bold select-none shrink-0">
            i
          </div>

          <p
            className={`text-[#202321] text-[9.5px] min-[360px]:text-[10px] min-[390px]:text-[10.5px] sm:text-[11.5px] leading-snug font-medium break-words ${
              isTamil ? 'font-tamil' : ''
            }`}
          >
            {t.docNoticeText}
          </p>
        </section>

        {/* =========================================================================
            10. TWO BOTTOM ACTION BUTTONS: Back to Scheme Details & Upload Documents
           ========================================================================= */}
        <div className="w-full flex items-center gap-2 min-[360px]:gap-2.5 sm:gap-3 mt-1 mb-2">
          {/* Left Secondary Action: Back to Scheme Details (திட்ட விவரங்களுக்கு திரும்ப) */}
          <button
            type="button"
            onClick={onNavigateBack}
            className="h-[46px] min-[360px]:h-[48px] sm:h-[52px] px-2.5 min-[360px]:px-3.5 bg-transparent hover:bg-[#E3F2DB]/40 active:scale-[0.99] border-[1.5px] border-[#065B38] text-[#065B38] font-bold text-[10.5px] min-[360px]:text-[11px] sm:text-[12.5px] rounded-[14px] sm:rounded-[16px] flex items-center justify-center gap-1 transition-all cursor-pointer shrink-0"
          >
            <ChevronLeft className="w-4 h-4 min-[360px]:w-4.5 min-[360px]:h-4.5 stroke-[2.6]" />
            <span className={`whitespace-nowrap ${isTamil ? 'font-tamil' : ''}`}>
              {t.actionBackToSchemeDetails}
            </span>
          </button>

          {/* Right Primary Action: Upload Documents (ஆவணங்களை பதிவேற்றம் செய்ய) */}
          <button
            type="button"
            onClick={() => {
              const target = documents.find((d) => d.status === 'missing') || documents[0];
              setSelectedDoc(target);
              setIsUploadDrawerOpen(true);
            }}
            className="flex-1 h-[46px] min-[360px]:h-[48px] sm:h-[52px] px-2.5 min-[360px]:px-3.5 bg-[#065B38] hover:bg-[#064F35] active:scale-[0.99] text-white font-bold text-[10.5px] min-[360px]:text-[11px] sm:text-[12.5px] rounded-[14px] sm:rounded-[16px] flex items-center justify-between shadow-xs transition-all cursor-pointer min-w-0"
          >
            <Upload className="w-3.5 h-3.5 min-[360px]:w-4 min-[360px]:h-4 stroke-[2.3] shrink-0" />
            <span className={`truncate px-1 text-center ${isTamil ? 'font-tamil' : ''}`}>
              {t.actionUploadDocuments}
            </span>
            <ChevronRight className="w-3.5 h-3.5 min-[360px]:w-4 min-[360px]:h-4 stroke-[2.5] shrink-0" />
          </button>
        </div>
      </main>

      {/* =========================================================================
          DOCUMENT DETAIL & UPLOAD DRAWER (Opened by clicking row or Upload button)
         ========================================================================= */}
      {selectedDoc && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end sm:items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-white rounded-t-[24px] sm:rounded-[20px] p-5 shadow-2xl border border-[#DEE3DF] text-left max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#EAEFEA]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-[10px] bg-[#E3F2DB] text-[#065B38] flex items-center justify-center shrink-0">
                  {renderDocumentRowIcon(selectedDoc.iconType)}
                </div>
                <h3 className={`font-bold text-[#065B38] text-[15px] ${isTamil ? 'font-tamil' : ''}`}>
                  {isTamil ? selectedDoc.titleTa : selectedDoc.titleEn}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedDoc(null)}
                className="p-1 rounded-full text-[#606B66] hover:bg-[#F0F4F1] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5 stroke-[2.2]" />
              </button>
            </div>

            {/* Document Info */}
            <div className="py-4 space-y-3.5">
              <div className="flex items-center justify-between">
                <span className="text-[12px] text-[#53616B] font-medium">
                  {isTamil ? 'தற்போதைய நிலை:' : 'Current Status:'}
                </span>
                {renderDocumentStatusBadge(selectedDoc)}
              </div>

              <div className="p-3 bg-[#F2F7EF] rounded-[12px] border border-[#DCE9D9]">
                <h4 className="text-[11px] font-bold text-[#065B38] uppercase tracking-wider">
                  {t.issuingAuthorityLabel}
                </h4>
                <p className={`text-[12px] text-[#202321] mt-0.5 font-medium ${isTamil ? 'font-tamil' : ''}`}>
                  {isTamil ? selectedDoc.issuingAuthorityTa : selectedDoc.issuingAuthorityEn}
                </p>
              </div>

              <div className="p-3 bg-[#FEF2D2] rounded-[12px] border border-[#FAD980]/80">
                <h4 className="text-[11px] font-bold text-[#9A6200] uppercase tracking-wider">
                  {t.validityLabel}
                </h4>
                <p className={`text-[12px] text-[#202321] mt-0.5 leading-snug ${isTamil ? 'font-tamil' : ''}`}>
                  {isTamil ? selectedDoc.validityNoticeTa : selectedDoc.validityNoticeEn}
                </p>
              </div>

              <div className="p-3 bg-white rounded-[12px] border border-[#DEE3DF]">
                <h4 className="text-[11px] font-bold text-[#53616B] uppercase tracking-wider">
                  {t.howToApplyLabel}
                </h4>
                <p className={`text-[12px] text-[#202321] mt-0.5 leading-snug ${isTamil ? 'font-tamil' : ''}`}>
                  {isTamil ? selectedDoc.howToApplyTa : selectedDoc.howToApplyEn}
                </p>
              </div>

              {/* Upload Dropzone / Action options */}
              <div className="border-2 border-dashed border-[#CBD8D0] rounded-[14px] p-4 text-center bg-[#FAFBF9]">
                {uploadingDocId === selectedDoc.id ? (
                  <div className="py-3">
                    <p className={`text-[12px] font-bold text-[#065B38] ${isTamil ? 'font-tamil' : ''}`}>
                      {isTamil ? 'பதிவேற்றப்படுகிறது...' : 'Uploading...'} {uploadProgress}%
                    </p>
                    <div className="w-full h-2 bg-[#E3F2DB] rounded-full mt-2 overflow-hidden">
                      <div
                        className="h-full bg-[#065B38] transition-all duration-200"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <Upload className="w-7 h-7 text-[#065B38] mx-auto mb-2 stroke-[2]" />
                    <p className={`text-[12px] font-semibold text-[#202321] ${isTamil ? 'font-tamil' : ''}`}>
                      {t.dropzoneText}
                    </p>
                    <div className="mt-3 flex items-center justify-center gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          handleSimulatedUpload(
                            selectedDoc.id,
                            `${selectedDoc.docKey}_document_${Date.now().toString().slice(-4)}.pdf`
                          )
                        }
                        className="px-3 py-1.5 bg-[#065B38] hover:bg-[#064F35] text-white rounded-full text-[11px] font-bold flex items-center gap-1.5 cursor-pointer shadow-2xs"
                      >
                        <Camera className="w-3.5 h-3.5" />
                        <span>{t.cameraOption}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          handleSimulatedUpload(
                            selectedDoc.id,
                            `${selectedDoc.docKey}_scanned_copy.pdf`
                          )
                        }
                        className="px-3 py-1.5 bg-white border border-[#065B38] text-[#065B38] hover:bg-[#E3F2DB]/40 rounded-full text-[11px] font-bold flex items-center gap-1.5 cursor-pointer"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>{t.galleryOption}</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Bottom Modal Close */}
            <button
              type="button"
              onClick={() => setSelectedDoc(null)}
              className="w-full h-11 bg-[#065B38] hover:bg-[#064F35] text-white font-bold text-[13px] rounded-[12px] transition-all cursor-pointer"
            >
              {isTamil ? 'முடிந்தது' : 'Done'}
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
          FULL GUIDANCE & ASSISTANCE MODAL (Triggered by "உதவி பெறுக >")
         ========================================================================= */}
      {isGuidanceModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end sm:items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-white rounded-t-[24px] sm:rounded-[20px] p-5 shadow-2xl border border-[#DEE3DF] text-left max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#EAEFEA]">
              <div className="flex items-center gap-2">
                <Lightbulb className="w-5.5 h-5.5 text-[#065B38]" />
                <h3 className={`font-bold text-[#065B38] text-[15px] ${isTamil ? 'font-tamil' : ''}`}>
                  {isTamil ? 'அரசு ஆவண உதவி வழிகாட்டுதல்' : 'Government Document Guidance'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsGuidanceModalOpen(false)}
                className="p-1 rounded-full text-[#606B66] hover:bg-[#F0F4F1] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5 stroke-[2.2]" />
              </button>
            </div>

            <div className="py-4 space-y-3.5">
              {/* Step 1: e-Sevai Center */}
              <div className="p-3 bg-[#F2F7EF] rounded-[12px] border border-[#DCE9D9]">
                <h4 className={`font-bold text-[#065B38] text-[13px] ${isTamil ? 'font-tamil' : ''}`}>
                  {isTamil ? '1. இ-சேவை மையம் (e-Sevai)' : '1. e-Sevai Centres'}
                </h4>
                <p className={`text-[12px] text-[#53616B] mt-1 leading-relaxed ${isTamil ? 'font-tamil' : ''}`}>
                  {isTamil
                    ? 'வருமானச் சான்று, இருப்பிடச் சான்று மற்றும் பிற சான்றிதழ்களைப் பெற உங்கள் கிராம அல்லது நகராட்சி இ-சேவை மையத்தை அணுகலாம்.'
                    : 'Visit your nearest e-Sevai centre with proof of identity and VAO recommendation to apply for income and community certificates.'}
                </p>
              </div>

              {/* Step 2: VAO Verification */}
              <div className="p-3 bg-white rounded-[12px] border border-[#DEE3DF]">
                <h4 className={`font-bold text-[#202321] text-[13px] ${isTamil ? 'font-tamil' : ''}`}>
                  {isTamil ? '2. கிராம நிர்வாக அலுவலர் (VAO) சரிபார்ப்பு' : '2. VAO Verification'}
                </h4>
                <p className={`text-[12px] text-[#53616B] mt-1 leading-relaxed ${isTamil ? 'font-tamil' : ''}`}>
                  {isTamil
                    ? 'வருமானம் மற்றும் குடும்ப தகவல்களுக்கு VAO கள ஆய்வு அறிக்கை வழங்கி வட்டாட்சியருக்கு பரிந்துரைப்பார்.'
                    : 'The Village Administrative Officer conducts household inquiry and sends verification report to the Tahsildar.'}
                </p>
              </div>

              {/* Step 3: Online Download */}
              <div className="p-3 bg-[#FEF2D2] rounded-[12px] border border-[#FAD980]/80">
                <h4 className={`font-bold text-[#9A6200] text-[13px] ${isTamil ? 'font-tamil' : ''}`}>
                  {isTamil ? '3. டிஜிட்டல் சான்றிதழ் பதிவிறக்கம்' : '3. Digital Certificate Download'}
                </h4>
                <p className={`text-[12px] text-[#202321] mt-1 leading-relaxed ${isTamil ? 'font-tamil' : ''}`}>
                  {isTamil
                    ? 'ஒப்புதல் பெற்ற சான்றிதழை edistricts.tn.gov.in தளத்திலிருந்து டிஜிட்டல் கையொப்பத்துடன் பதிவிறக்கலாம்.'
                    : 'Once approved, download the digitally signed certificate with QR verification code directly from edistricts.tn.gov.in.'}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsGuidanceModalOpen(false)}
              className="w-full h-11 bg-[#065B38] hover:bg-[#064F35] text-white font-bold text-[13px] rounded-[12px] transition-all cursor-pointer"
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
