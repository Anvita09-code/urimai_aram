import React, { useState } from 'react';
import {
  ArrowLeft,
  Check,
  ChevronLeft,
  ChevronRight,
  Coins,
  FileText,
  GraduationCap,
  Home,
  User,
} from 'lucide-react';
import { translations } from '../../data/translations';
import { CitizenProfileData, Language } from '../../types';
import { DashboardHeader } from '../Dashboard/DashboardHeader';
import { CitizenNotification, NotificationDrawer } from '../Dashboard/modals/NotificationDrawer';

export interface ProfileReviewPageProps {
  currentLang: Language;
  formData: CitizenProfileData;
  onNavigateBack: () => void;
  onNavigateHome: () => void;
  onOpenLanguage: () => void;
  onSelectSection: (step: number) => void;
  onMakeCorrections: () => void;
  onConfirm: () => void;
}

export const ProfileReviewPage: React.FC<ProfileReviewPageProps> = ({
  currentLang,
  onNavigateBack,
  onNavigateHome,
  onOpenLanguage,
  onSelectSection,
  onMakeCorrections,
  onConfirm,
}) => {
  const t = translations[currentLang];
  const isTamil = currentLang === 'ta';

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

  // Review section metadata matching reference image layout exactly
  const sections = [
    {
      step: 1,
      icon: User,
      title: t.secPersonalInfoTitle,
      subtitle: t.secPersonalInfoSub,
      status: 'completed' as const, // Green Checkmark
    },
    {
      step: 2,
      icon: GraduationCap,
      title: t.secEducationWorkTitle,
      subtitle: t.secEducationWorkSub,
      status: 'completed' as const, // Green Checkmark
    },
    {
      step: 3,
      icon: Coins,
      title: t.secIncomeLivelihoodTitle,
      subtitle: t.secIncomeLivelihoodSub,
      status: 'completed' as const, // Green Checkmark
    },
    {
      step: 4,
      icon: Home,
      title: t.secHousingAssetsTitle,
      subtitle: t.secHousingAssetsSub,
      status: 'warning' as const, // Amber Exclamation
    },
    {
      step: 5,
      icon: FileText,
      title: t.secOtherDetailsTitle,
      subtitle: t.secOtherDetailsSub,
      status: 'warning' as const, // Amber Exclamation
    },
  ];

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
                {t.profileReviewTitle}
              </h1>

              <p
                className={`text-[#59635F] text-[13px] sm:text-[14px] font-normal leading-snug mt-1.5 text-left ${
                  isTamil ? 'font-tamil' : ''
                }`}
              >
                {t.profileReviewDesc}
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            4. FIVE-STEP QUESTIONNAIRE PROGRESS PANEL (Matching Reference Step 4/5)
           ========================================================================= */}
        <div className="w-full bg-[#EFF6ED] rounded-[20px] px-2 py-3 sm:px-3.5 sm:py-3.5 border border-[#DEEADE]/70 shadow-2xs mb-3.5 box-border">
          {/* Header Row: Title on Left, Step Indicator on Right */}
          <div className="w-full flex items-center justify-between mb-3 px-1">
            <span
              className={`text-[#155B4D] font-bold text-[14px] sm:text-[15px] ${
                isTamil ? 'font-tamil' : ''
              }`}
            >
              {isTamil ? 'சுயவிவர முன்னேற்றம்' : 'Profile Progress'}
            </span>

            <span
              className={`text-[#155B4D] font-bold text-[13px] sm:text-[14px] tracking-tight ${
                isTamil ? 'font-tamil' : ''
              }`}
            >
              {isTamil ? 'படி 4 / 5' : 'Step 4 / 5'}
            </span>
          </div>

          {/* 5-Step Progress Track */}
          <div className="relative w-full">
            {/* Connecting line behind circles:
                Passing through exact vertical center (16px / 18px) of all 5 circles.
                Left starts at column 1 center (10%), ends at column 5 center (90%). */}
            <div className="absolute top-[16px] sm:top-[17.5px] -translate-y-1/2 left-[10%] right-[10%] h-[2.5px] z-0 flex pointer-events-none">
              {/* Progress from Step 1 through Step 4 is Deep Teal (75% of track) */}
              <div className="w-[75%] h-full bg-[#155B4D]" />
              {/* Remaining track from Step 4 to Step 5 is Pale Green (25% of track) */}
              <div className="w-[25%] h-full bg-[#CDE2D6]" />
            </div>

            {/* Five Equal Grid Columns with strict minmax(0, 1fr) and min-w-0 */}
            <div className="progress-steps relative z-10 w-full">
              {/* Step 1: Completed */}
              <button
                type="button"
                onClick={() => onSelectSection(1)}
                className="progress-step min-w-0 w-full flex flex-col items-center text-center cursor-pointer group px-0.5"
              >
                <div className="w-[32px] h-[32px] sm:w-[35px] sm:h-[35px] rounded-full bg-[#155B4D] text-white flex items-center justify-center shadow-xs transition-transform group-hover:scale-105 shrink-0 z-10">
                  <Check className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.8]" />
                </div>
                <div className="w-full min-w-0 text-center mt-1.5 box-border">
                  <span
                    className={`block w-full text-[7.5px] min-[360px]:text-[8px] min-[390px]:text-[8.5px] sm:text-[9.5px] leading-[1.18] font-semibold text-[#155B4D] tracking-tight select-none text-center ${
                      isTamil ? 'font-tamil' : ''
                    }`}
                  >
                    {isTamil ? (
                      <>
                        <span className="block whitespace-nowrap">தனிப்பட்ட</span>
                        <span className="block whitespace-nowrap">தகவல்</span>
                      </>
                    ) : (
                      <>
                        <span className="block whitespace-nowrap">Personal</span>
                        <span className="block whitespace-nowrap">Details</span>
                      </>
                    )}
                  </span>
                </div>
              </button>

              {/* Step 2: Completed */}
              <button
                type="button"
                onClick={() => onSelectSection(2)}
                className="progress-step min-w-0 w-full flex flex-col items-center text-center cursor-pointer group px-0.5"
              >
                <div className="w-[32px] h-[32px] sm:w-[35px] sm:h-[35px] rounded-full bg-[#155B4D] text-white flex items-center justify-center shadow-xs transition-transform group-hover:scale-105 shrink-0 z-10">
                  <Check className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.8]" />
                </div>
                <div className="w-full min-w-0 text-center mt-1.5 box-border">
                  <span
                    className={`block w-full text-[7.5px] min-[360px]:text-[8px] min-[390px]:text-[8.5px] sm:text-[9.5px] leading-[1.18] font-semibold text-[#155B4D] tracking-tight select-none text-center ${
                      isTamil ? 'font-tamil' : ''
                    }`}
                  >
                    {isTamil ? (
                      <>
                        <span className="block whitespace-nowrap">கல்வி &</span>
                        <span className="block whitespace-nowrap">தொழில்</span>
                      </>
                    ) : (
                      <>
                        <span className="block whitespace-nowrap">Education &</span>
                        <span className="block whitespace-nowrap">Work</span>
                      </>
                    )}
                  </span>
                </div>
              </button>

              {/* Step 3: Completed */}
              <button
                type="button"
                onClick={() => onSelectSection(3)}
                className="progress-step min-w-0 w-full flex flex-col items-center text-center cursor-pointer group px-0.5"
              >
                <div className="w-[32px] h-[32px] sm:w-[35px] sm:h-[35px] rounded-full bg-[#155B4D] text-white flex items-center justify-center shadow-xs transition-transform group-hover:scale-105 shrink-0 z-10">
                  <Check className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.8]" />
                </div>
                <div className="w-full min-w-0 text-center mt-1.5 box-border">
                  <span
                    className={`block w-full text-[7.5px] min-[360px]:text-[8px] min-[390px]:text-[8.5px] sm:text-[9.5px] leading-[1.18] font-semibold text-[#155B4D] tracking-tight select-none text-center ${
                      isTamil ? 'font-tamil' : ''
                    }`}
                  >
                    {isTamil ? (
                      <>
                        <span className="block whitespace-nowrap">வருமானம் &</span>
                        <span className="block whitespace-nowrap">வாழ்வாதாரம்</span>
                      </>
                    ) : (
                      <>
                        <span className="block whitespace-nowrap">Income &</span>
                        <span className="block whitespace-nowrap">Livelihood</span>
                      </>
                    )}
                  </span>
                </div>
              </button>

              {/* Step 4: Active (Filled Deep Teal with White 4) */}
              <button
                type="button"
                onClick={() => onSelectSection(4)}
                className="progress-step min-w-0 w-full flex flex-col items-center text-center cursor-pointer group px-0.5"
              >
                <div className="w-[32px] h-[32px] sm:w-[35px] sm:h-[35px] rounded-full bg-[#155B4D] text-white flex items-center justify-center shadow-xs font-bold text-[13px] sm:text-[14px] transition-transform group-hover:scale-105 shrink-0 z-10">
                  4
                </div>
                <div className="w-full min-w-0 text-center mt-1.5 box-border">
                  <span
                    className={`block w-full text-[7.5px] min-[360px]:text-[8px] min-[390px]:text-[8.5px] sm:text-[9.5px] leading-[1.18] font-semibold text-[#155B4D] tracking-tight select-none text-center ${
                      isTamil ? 'font-tamil' : ''
                    }`}
                  >
                    {isTamil ? (
                      <>
                        <span className="block whitespace-nowrap">வீடு &</span>
                        <span className="block whitespace-nowrap">சொத்துக்கள்</span>
                      </>
                    ) : (
                      <>
                        <span className="block whitespace-nowrap">Housing &</span>
                        <span className="block whitespace-nowrap">Assets</span>
                      </>
                    )}
                  </span>
                </div>
              </button>

              {/* Step 5: Pending (White Circle with Pale Green Border & Deep Teal 5) */}
              <button
                type="button"
                onClick={() => onSelectSection(5)}
                className="progress-step min-w-0 w-full flex flex-col items-center text-center cursor-pointer group px-0.5"
              >
                <div className="w-[32px] h-[32px] sm:w-[35px] sm:h-[35px] rounded-full bg-white border-[1.8px] border-[#A8C7B8] text-[#155B4D] flex items-center justify-center font-bold text-[13px] sm:text-[14px] shadow-2xs transition-transform group-hover:scale-105 shrink-0 z-10">
                  5
                </div>
                <div className="w-full min-w-0 text-center mt-1.5 box-border">
                  <span
                    className={`block w-full text-[7.5px] min-[360px]:text-[8px] min-[390px]:text-[8.5px] sm:text-[9.5px] leading-[1.18] font-semibold text-[#155B4D] tracking-tight select-none text-center ${
                      isTamil ? 'font-tamil' : ''
                    }`}
                  >
                    {isTamil ? (
                      <>
                        <span className="block whitespace-nowrap">மற்ற</span>
                        <span className="block whitespace-nowrap">தகவல்கள்</span>
                      </>
                    ) : (
                      <>
                        <span className="block whitespace-nowrap">Other</span>
                        <span className="block whitespace-nowrap">Details</span>
                      </>
                    )}
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* =========================================================================
            5. INFORMATION NOTICE BANNER (Pale Warm Yellow with Amber Info Icon)
           ========================================================================= */}
        <div className="w-full bg-[#FFF5D9] rounded-[14px] p-3.5 sm:p-4 flex items-start gap-3 my-3.5 border border-[#FBEAC0]/60">
          {/* Amber Circular Info Glyph */}
          <div className="w-5 h-5 sm:w-5.5 sm:h-5.5 rounded-full border-[1.8px] border-[#D98200] text-[#D98200] flex items-center justify-center shrink-0 mt-0.5 text-[12px] sm:text-[12.5px] font-bold select-none font-serif">
            i
          </div>

          <p
            className={`text-[#3B3224] text-[12.5px] sm:text-[13.5px] leading-relaxed font-normal text-left ${
              isTamil ? 'font-tamil' : ''
            }`}
          >
            {t.profileReviewNotice}
          </p>
        </div>

        {/* =========================================================================
            6. PROFILE SECTIONS REVIEW CARD (White Card with 5 Rows)
           ========================================================================= */}
        <div className="w-full bg-white rounded-[20px] sm:rounded-[22px] border border-[#E3ECE6] shadow-[0_4px_16px_rgba(21,91,77,0.05)] overflow-hidden divide-y divide-[#EFF3F0]">
          {sections.map((sec) => {
            const IconComponent = sec.icon;
            const isCompleted = sec.status === 'completed';

            return (
              <button
                key={sec.step}
                type="button"
                onClick={() => onSelectSection(sec.step)}
                className="w-full px-4 sm:px-5 py-4 flex items-center gap-3 sm:gap-3.5 text-left hover:bg-[#FAF9F5] active:bg-[#F4F8F4] transition-colors cursor-pointer"
              >
                {/* Section Icon Box */}
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-[14px] bg-[#E5F1E7] text-[#155B4D] flex items-center justify-center shrink-0">
                  <IconComponent className="w-5.5 h-5.5 sm:w-6 sm:h-6 stroke-[2.2]" />
                </div>

                {/* Section Title & Subtitle */}
                <div className="flex-1 flex flex-col min-w-0 pr-1">
                  <h3
                    className={`text-[#1B2420] font-bold text-[15px] sm:text-[16px] leading-tight truncate ${
                      isTamil ? 'font-tamil' : ''
                    }`}
                  >
                    {sec.title}
                  </h3>
                  <p
                    className={`text-[#6B7972] text-[12px] sm:text-[12.5px] leading-snug mt-1 truncate ${
                      isTamil ? 'font-tamil' : ''
                    }`}
                  >
                    {sec.subtitle}
                  </p>
                </div>

                {/* Status Indicator: Green Checkmark or Amber Exclamation */}
                <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
                  {isCompleted ? (
                    <div
                      className="w-6 h-6 rounded-full bg-[#22C55E] text-white flex items-center justify-center shadow-2xs"
                      aria-label="Section Completed"
                    >
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  ) : (
                    <div
                      className="w-6 h-6 rounded-full border-[2px] border-[#F59E0B] text-[#F59E0B] flex items-center justify-center font-bold text-[13px] leading-none select-none"
                      aria-label="Section Requires Attention"
                    >
                      !
                    </div>
                  )}

                  {/* Navigation Chevron */}
                  <ChevronRight className="w-5 h-5 text-[#2A332E] stroke-[2.2] shrink-0" />
                </div>
              </button>
            );
          })}
        </div>

        {/* =========================================================================
            7. BOTTOM ACTION BUTTONS: Edit Details & Confirm
           ========================================================================= */}
        <div className="w-full grid grid-cols-2 gap-3 sm:gap-4 mt-5 sm:mt-6 mb-2">
          {/* Edit Details Button (Outlined Deep Teal) */}
          <button
            type="button"
            onClick={onMakeCorrections}
            className="w-full h-[50px] sm:h-[52px] bg-[#FAF8F2] hover:bg-white active:scale-[0.98] border-[1.5px] border-[#155B4D] rounded-[14px] text-[#155B4D] font-bold text-[14.5px] sm:text-[15.5px] flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-2xs"
          >
            <ChevronLeft className="w-4.5 h-4.5 sm:w-5 sm:h-5 stroke-[2.5]" />
            <span className={isTamil ? 'font-tamil' : ''}>
              {t.actionMakeCorrections}
            </span>
          </button>

          {/* Confirm Button (Solid Deep Teal) */}
          <button
            type="button"
            onClick={onConfirm}
            className="w-full h-[50px] sm:h-[52px] bg-[#155B4D] hover:bg-[#10483D] active:scale-[0.98] rounded-[14px] text-white font-bold text-[14.5px] sm:text-[15.5px] flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm"
          >
            <span className={isTamil ? 'font-tamil' : ''}>
              {t.actionConfirm}
            </span>
            <ChevronRight className="w-4.5 h-4.5 sm:w-5 sm:h-5 stroke-[2.5]" />
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
