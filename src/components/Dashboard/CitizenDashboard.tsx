import React, { useState } from 'react';
import { Language } from '../../types';
import { TrustModal } from '../TrustModal';
import { BottomNav } from './BottomNav';
import { DashboardHeader } from './DashboardHeader';
import { DashboardHero } from './DashboardHero';
import { HouseholdCard } from './HouseholdCard';
import { AccountModal } from './modals/AccountModal';
import { HouseholdMember, HouseholdModal } from './modals/HouseholdModal';
import { MyResultsModal } from './modals/MyResultsModal';
import { CitizenNotification, NotificationDrawer } from './modals/NotificationDrawer';
import { ProfileCompletionModal, ProfileStep } from './modals/ProfileCompletionModal';
import { ProfileCompletionCard } from './ProfileCompletionCard';
import { QuickActionsGrid } from './QuickActionsGrid';
import { RecommendedSchemesSection } from './RecommendedSchemesSection';

interface CitizenDashboardProps {
  currentLang: Language;
  onOpenLanguage: () => void;
  onNavigateToExplorer: () => void;
  onNavigateToScheme: (schemeId: string) => void;
  onNavigateToLanding: () => void;
  onNavigateToHousehold?: () => void;
  onNavigateToProfile?: () => void;
  onNavigateToAccount?: () => void;
  householdMembers?: HouseholdMember[];
  onUpdateMembers?: (members: HouseholdMember[]) => void;
}

export const CitizenDashboard: React.FC<CitizenDashboardProps> = ({
  currentLang,
  onOpenLanguage,
  onNavigateToExplorer,
  onNavigateToScheme,
  onNavigateToLanding,
  onNavigateToHousehold,
  onNavigateToProfile,
  onNavigateToAccount,
  householdMembers: propHouseholdMembers,
  onUpdateMembers,
}) => {
  // Household members state (persisted or defaulted to family of 4)
  const [internalHouseholdMembers, setInternalHouseholdMembers] = useState<HouseholdMember[]>([
    {
      id: 'm1',
      name: 'Rajesh Kumar',
      nameTa: 'ராஜேஷ் குமார்',
      relation: 'Head of Household',
      relationTa: 'குடும்பத் தலைவர்',
      age: 42,
      gender: 'Male',
      genderTa: 'ஆண்',
      aadhaarLinked: true,
      avatarType: 'male_head',
    },
    {
      id: 'm2',
      name: 'Lakshmi Rajesh',
      nameTa: 'லட்சுமி ராஜேஷ்',
      relation: 'Wife',
      relationTa: 'மனைவி',
      age: 38,
      gender: 'Female',
      genderTa: 'பெண்',
      aadhaarLinked: true,
      avatarType: 'female_spouse',
    },
    {
      id: 'm3',
      name: 'Aadhavan',
      nameTa: 'ஆதவன்',
      relation: 'Son',
      relationTa: 'மகன்',
      age: 14,
      gender: 'Male',
      genderTa: 'ஆண்',
      aadhaarLinked: true,
      avatarType: 'boy_son',
    },
    {
      id: 'm4',
      name: 'Anitha',
      nameTa: 'அனிதா',
      relation: 'Daughter',
      relationTa: 'மகள்',
      age: 10,
      gender: 'Female',
      genderTa: 'பெண்',
      aadhaarLinked: true,
      avatarType: 'girl_daughter',
    },
  ]);

  const householdMembers = propHouseholdMembers || internalHouseholdMembers;
  const setHouseholdMembers = onUpdateMembers || setInternalHouseholdMembers;

  // Profile completion steps state (3 of 4 completed = 75%)
  const [profileSteps, setProfileSteps] = useState<ProfileStep[]>([
    {
      id: 'step-identity',
      titleEn: 'Identity & Biometric Aadhaar Verification',
      titleTa: 'அடையாளம் மற்றும் ஆதார் சரிபார்ப்பு',
      descEn: 'Verified through UIDAI e-KYC authentication.',
      descTa: 'ஆதார் கைரேகை சரிபார்ப்பு நிறைவடைந்தது.',
      completed: true,
      weight: 25,
    },
    {
      id: 'step-ration',
      titleEn: 'Tamil Nadu Smart Family Card (TNPDS)',
      titleTa: 'தமிழ்நாடு ஸ்மார்ட் குடும்ப அட்டை (TNPDS)',
      descEn: 'Linked with Civil Supplies database (03/G/0892415).',
      descTa: 'குடும்ப அட்டை எண் 03/G/0892415 இணைக்கப்பட்டுள்ளது.',
      completed: true,
      weight: 25,
    },
    {
      id: 'step-income',
      titleEn: 'Annual Household Income Certificate',
      titleTa: 'வருவாய்த்துறை ஆண்டு வருமானச் சான்றிதழ்',
      descEn: 'Tahsildar verified annual income ₹96,000.',
      descTa: 'வட்டாட்சியர் சான்றளித்த வருமானம் ₹96,000.',
      completed: true,
      weight: 25,
    },
    {
      id: 'step-land',
      titleEn: 'Land Revenue Record (Patta/Chitta) & Electricity',
      titleTa: 'பட்டா/சிட்டா நில ஆவணம் & மின் நுகர்வோர் எண்',
      descEn: 'Upload patta document to unlock agriculture subsidies.',
      descTa: 'விவசாய மானியங்களைப் பெற பட்டா நகலை இணைக்கவும்.',
      completed: false,
      weight: 25,
    },
  ]);

  // Notifications state
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
    {
      id: 'notif-3',
      titleEn: 'Uzhavan Subsidy Seed Distribution',
      titleTa: 'உழவன் செயலி மானிய விதை விநியோகம்',
      descEn: 'Subsidised certified paddy seeds available at Madurai Block Agriculture Office.',
      descTa: 'மதுரை வட்டார வேளாண் விரிவாக்க மையத்தில் மானிய விலையில் தரமான நெல் விதைகள்.',
      timeEn: '3 days ago',
      timeTa: '3 நாட்களுக்கு முன்',
      read: true,
      type: 'reminder',
    },
  ]);

  // Modal display states
  const [isHouseholdModalOpen, setIsHouseholdModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isNotificationDrawerOpen, setIsNotificationDrawerOpen] = useState(false);
  const [isMyResultsModalOpen, setIsMyResultsModalOpen] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [isTrustModalOpen, setIsTrustModalOpen] = useState(false);

  // Calculated profile percentage
  const completionPercentage = profileSteps.reduce(
    (acc, s) => acc + (s.completed ? s.weight : 0),
    0
  );

  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;

  const handleToggleStep = (stepId: string) => {
    setProfileSteps((prev) =>
      prev.map((s) => (s.id === stepId ? { ...s, completed: !s.completed } : s))
    );
  };

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <div className="relative w-full mx-auto min-h-screen bg-[#FAF7EF] text-[#202820] flex flex-col justify-between overflow-x-hidden pt-1 pb-0 antialiased">
      {/* Scrollable Content Container */}
      <main className="w-full flex-1 flex flex-col justify-start pb-4">
        {/* =========================================================================
            1. TOP BRAND HEADER with Language Selector & Notification Bell
           ========================================================================= */}
        <DashboardHeader
          currentLang={currentLang}
          unreadCount={unreadNotificationsCount}
          onOpenLanguage={onOpenLanguage}
          onOpenNotifications={() => setIsNotificationDrawerOpen(true)}
          onNavigateHome={onNavigateToLanding}
        />

        {/* =========================================================================
            2. PERSONALISED GREETING & CHECKLIST HERO ILLUSTRATION
           ========================================================================= */}
        <DashboardHero
          currentLang={currentLang}
          citizenName="Murali"
          citizenNameTa="முரளி"
        />

        {/* =========================================================================
            3. HOUSEHOLD SUMMARY CARD
           ========================================================================= */}
        <HouseholdCard
          currentLang={currentLang}
          memberCount={householdMembers.length}
          onOpenHousehold={onNavigateToHousehold || (() => setIsHouseholdModalOpen(true))}
        />

        {/* =========================================================================
            4. PROFILE COMPLETION PROGRESS CARD (75% Circular Ring)
           ========================================================================= */}
        <ProfileCompletionCard
          currentLang={currentLang}
          completionPercentage={completionPercentage}
          onOpenProfile={onNavigateToProfile || (() => setIsProfileModalOpen(true))}
        />

        {/* =========================================================================
            5. QUICK ACTIONS HEADING & FOUR TILES
           ========================================================================= */}
        <QuickActionsGrid
          currentLang={currentLang}
          onManageHousehold={onNavigateToHousehold || (() => setIsHouseholdModalOpen(true))}
          onUpdateProfile={onNavigateToProfile || (() => setIsProfileModalOpen(true))}
          onExploreSchemes={onNavigateToExplorer}
          onMyResults={() => setIsMyResultsModalOpen(true)}
        />

        {/* =========================================================================
            6. RECOMMENDED SCHEMES HEADING & 2 SCHEME CARDS (CMCHIS & SCHOLARSHIP)
           ========================================================================= */}
        <RecommendedSchemesSection
          currentLang={currentLang}
          onViewAll={onNavigateToExplorer}
          onSelectScheme={onNavigateToScheme}
        />
      </main>

      {/* =========================================================================
          7. FIXED BOTTOM NAVIGATION (Home, Schemes, My Results, Account)
         ========================================================================= */}
      <BottomNav
        currentLang={currentLang}
        activeItem="home"
        onNavigateHome={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        onNavigateSchemes={onNavigateToExplorer}
        onNavigateResults={() => setIsMyResultsModalOpen(true)}
        onNavigateAccount={onNavigateToAccount ? onNavigateToAccount : () => setIsAccountModalOpen(true)}
      />

      {/* =========================================================================
          INTERACTIVE MODALS & DRAWERS
         ========================================================================= */}
      {/* Household Modal */}
      <HouseholdModal
        isOpen={isHouseholdModalOpen}
        currentLang={currentLang}
        members={householdMembers}
        onSaveMembers={setHouseholdMembers}
        onClose={() => setIsHouseholdModalOpen(false)}
      />

      {/* Profile Completion Modal */}
      <ProfileCompletionModal
        isOpen={isProfileModalOpen}
        currentLang={currentLang}
        steps={profileSteps}
        onToggleStep={handleToggleStep}
        onClose={() => setIsProfileModalOpen(false)}
      />

      {/* Notification Drawer */}
      <NotificationDrawer
        isOpen={isNotificationDrawerOpen}
        currentLang={currentLang}
        notifications={notifications}
        onMarkAllRead={handleMarkAllRead}
        onSelectNotification={(id) => {
          setNotifications((prev) =>
            prev.map((n) => (n.id === id ? { ...n, read: true } : n))
          );
        }}
        onClose={() => setIsNotificationDrawerOpen(false)}
      />

      {/* My Results Modal */}
      <MyResultsModal
        isOpen={isMyResultsModalOpen}
        currentLang={currentLang}
        onSelectScheme={(id) => {
          setIsMyResultsModalOpen(false);
          onNavigateToScheme(id);
        }}
        onClose={() => setIsMyResultsModalOpen(false)}
      />

      {/* Account Modal */}
      <AccountModal
        isOpen={isAccountModalOpen}
        currentLang={currentLang}
        onOpenLanguage={onOpenLanguage}
        onOpenTrustModal={() => setIsTrustModalOpen(true)}
        onClose={() => setIsAccountModalOpen(false)}
      />

      {/* Privacy Charter Modal */}
      <TrustModal
        isOpen={isTrustModalOpen}
        currentLang={currentLang}
        onClose={() => setIsTrustModalOpen(false)}
      />
    </div>
  );
};
