import React, { useState } from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { translations } from '../../data/translations';
import { CitizenProfileData, Language } from '../../types';
import { DashboardHeader } from '../Dashboard/DashboardHeader';
import { CitizenNotification, NotificationDrawer } from '../Dashboard/modals/NotificationDrawer';
import { EducationWorkForm } from './EducationWorkForm';
import { HousingAssetsForm } from './HousingAssetsForm';
import { IncomeLivelihoodForm } from './IncomeLivelihoodForm';
import { OtherDetailsForm } from './OtherDetailsForm';
import { PersonalInformationForm } from './PersonalInformationForm';
import { ProfileCompletedCard } from './ProfileCompletedCard';
import { ProfileReviewPage } from './ProfileReviewPage';
import { QuestionnaireProgress } from './QuestionnaireProgress';

interface CitizenProfilePageProps {
  currentLang: Language;
  initialStep?: number | 'review';
  onNavigateBack: () => void;
  onNavigateHome: () => void;
  onNavigateToExplorer: () => void;
  onNavigateToDashboard: () => void;
  onOpenLanguage: () => void;
}

const defaultCitizenProfile: CitizenProfileData = {
  // Step 1: Personal Information (Matches reference screen exactly)
  fullName: 'ராஜேஷ் குமார்',
  gender: 'Male',
  age: 42,
  dob: '15-06-1982',
  maritalStatus: 'married',
  idDocType: 'aadhaar',
  idDocNumber: '1234 5678 9012',
  isStep1Unknown: false,

  // Step 2: Education & Work
  educationLevel: 'secondary',
  occupationType: 'farmer',
  isStudentEnrolled: false,
  isStep2Unknown: false,

  // Step 3: Income & Livelihood
  annualIncome: 96000,
  incomeCertificateAvailable: true,
  bplStatus: true,
  landHoldingAcres: 1.5,
  isStep3Unknown: false,

  // Step 4: Housing & Assets
  housingType: 'own',
  roofType: 'semi_pucca',
  electricityConnection: true,
  cookingGasLPG: true,
  isStep4Unknown: false,

  // Step 5: Other Details
  socialCategory: 'bc',
  differentlyAbled: false,
  bankAccountLinked: true,
  isStep5Unknown: false,
};

const getSavedProfileData = (): CitizenProfileData => {
  try {
    const saved = localStorage.getItem('urimai_aram_citizen_profile');
    if (saved) {
      return { ...defaultCitizenProfile, ...JSON.parse(saved) };
    }
  } catch {
    // ignore
  }
  return defaultCitizenProfile;
};

export const CitizenProfilePage: React.FC<CitizenProfilePageProps> = ({
  currentLang,
  initialStep = 1,
  onNavigateBack,
  onNavigateHome,
  onNavigateToExplorer,
  onNavigateToDashboard,
  onOpenLanguage,
}) => {
  const t = translations[currentLang];
  const isTamil = currentLang === 'ta';

  const [currentStep, setCurrentStep] = useState<number>(
    typeof initialStep === 'number' && initialStep >= 1 && initialStep <= 5 ? initialStep : 1
  );
  const [isReviewing, setIsReviewing] = useState<boolean>(initialStep === 'review');
  const [formData, setFormData] = useState<CitizenProfileData>(getSavedProfileData);
  const [isCompleted, setIsCompleted] = useState<boolean>(initialStep === 6);
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

  const handleUpdateFormData = (updated: Partial<CitizenProfileData>) => {
    setFormData((prev) => {
      const next = { ...prev, ...updated };
      try {
        localStorage.setItem('urimai_aram_citizen_profile', JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Step 5 leads to Profile Review screen
      setIsReviewing(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onNavigateBack();
    }
  };

  const handleRestart = () => {
    setIsCompleted(false);
    setIsReviewing(false);
    setCurrentStep(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isReviewing) {
    return (
      <ProfileReviewPage
        currentLang={currentLang}
        formData={formData}
        onNavigateBack={() => {
          setIsReviewing(false);
          setCurrentStep(5);
        }}
        onNavigateHome={onNavigateHome}
        onOpenLanguage={onOpenLanguage}
        onSelectSection={(step) => {
          setIsReviewing(false);
          setCurrentStep(step);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onMakeCorrections={() => {
          setIsReviewing(false);
          setCurrentStep(4);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onConfirm={() => {
          setIsReviewing(false);
          setIsCompleted(true);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    );
  }

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
            unreadCount={notifications.filter((n) => !n.read).length}
            onOpenLanguage={onOpenLanguage}
            onOpenNotifications={() => setIsNotificationDrawerOpen(true)}
            onNavigateHome={onNavigateHome}
          />
        </div>

        {/* =========================================================================
            3. PAGE INTRODUCTION: Back Arrow, Title & Explanatory Description
           ========================================================================= */}
        <section className="w-full mt-3 sm:mt-4 mb-4">
          {/* Back Arrow & Heading Row */}
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
                {t.citizenProfileTitle}
              </h1>

              <p
                className={`text-[#59635F] text-[13px] sm:text-[14px] font-normal leading-snug mt-1.5 text-left ${
                  isTamil ? 'font-tamil' : ''
                }`}
              >
                {t.citizenProfileDesc}
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            4. FIVE-STEP QUESTIONNAIRE PROGRESS PANEL
           ========================================================================= */}
        {!isCompleted && (
          <div className="w-full mb-4">
            <QuestionnaireProgress
              currentLang={currentLang}
              currentStep={currentStep}
              totalSteps={5}
              onSelectStep={(step) => setCurrentStep(step)}
            />
          </div>
        )}

        {/* =========================================================================
            5. ACTIVE FORM PANEL OR COMPLETION CARD
           ========================================================================= */}
        <div className="w-full">
          {isCompleted ? (
            <ProfileCompletedCard
              currentLang={currentLang}
              formData={formData}
              onNavigateToExplorer={onNavigateToExplorer}
              onNavigateToDashboard={onNavigateToDashboard}
              onRestart={handleRestart}
            />
          ) : (
            <>
              {currentStep === 1 && (
                <PersonalInformationForm
                  currentLang={currentLang}
                  formData={formData}
                  onChange={handleUpdateFormData}
                />
              )}

              {currentStep === 2 && (
                <EducationWorkForm
                  currentLang={currentLang}
                  formData={formData}
                  onChange={handleUpdateFormData}
                />
              )}

              {currentStep === 3 && (
                <IncomeLivelihoodForm
                  currentLang={currentLang}
                  formData={formData}
                  onChange={handleUpdateFormData}
                />
              )}

              {currentStep === 4 && (
                <HousingAssetsForm
                  currentLang={currentLang}
                  formData={formData}
                  onChange={handleUpdateFormData}
                />
              )}

              {currentStep === 5 && (
                <OtherDetailsForm
                  currentLang={currentLang}
                  formData={formData}
                  onChange={handleUpdateFormData}
                />
              )}

              {/* =========================================================================
                  6. BOTTOM NAVIGATION ACTIONS (Previous / Next)
                 ========================================================================= */}
              <div className="w-full grid grid-cols-2 gap-3 sm:gap-4 mt-4.5 mb-2">
                {/* Previous Button (Outlined) */}
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="w-full h-[48px] sm:h-[52px] bg-white hover:bg-[#FAF7EF] active:scale-[0.98] border-[1.5px] border-[#155B4D] rounded-[14px] text-[#155B4D] font-bold text-[15px] sm:text-[16px] flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-2xs"
                >
                  <ChevronLeft className="w-4.5 h-4.5 stroke-[2.4]" />
                  <span className={isTamil ? 'font-tamil' : ''}>
                    {t.navPrevious}
                  </span>
                </button>

                {/* Next Button (Deep Teal Solid) */}
                <button
                  type="button"
                  onClick={handleNext}
                  className="w-full h-[48px] sm:h-[52px] bg-[#155B4D] hover:bg-[#10483D] active:scale-[0.98] rounded-[14px] text-white font-bold text-[15px] sm:text-[16px] flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm"
                >
                  <span className={isTamil ? 'font-tamil' : ''}>
                    {currentStep === 5 ? t.navFinish : t.navNext}
                  </span>
                  <ChevronRight className="w-4.5 h-4.5 stroke-[2.4]" />
                </button>
              </div>
            </>
          )}
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
