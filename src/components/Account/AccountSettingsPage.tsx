import React, { useState } from 'react';
import {
  Bell,
  Bookmark,
  Check,
  ChevronDown,
  ChevronRight,
  Database,
  FileText,
  HeartPulse,
  Languages,
  LogOut,
  Pencil,
  ShieldCheck,
  Sprout,
  Trash2,
  Type,
  User,
  Users,
  X,
  AlertTriangle,
  Download,
  Info,
} from 'lucide-react';
import { translations } from '../../data/translations';
import { HouseholdMember, HouseholdProfile, Language } from '../../types';
import { DashboardHeader } from '../Dashboard/DashboardHeader';
import { CitizenNotification, NotificationDrawer } from '../Dashboard/modals/NotificationDrawer';

export interface AccountSettingsPageProps {
  currentLang: Language;
  householdProfile?: HouseholdProfile;
  householdMembers?: HouseholdMember[];
  savedSchemeCount?: number;
  onOpenLanguage: () => void;
  onNavigateHome: () => void;
  onNavigateToHousehold: () => void;
  onNavigateToApplications: () => void;
  onNavigateToSavedSchemes: () => void;
  onNavigateToScheme: (schemeId: string) => void;
  onNavigateToOperator?: () => void;
  onLogout: () => void;
}

export const AccountSettingsPage: React.FC<AccountSettingsPageProps> = ({
  currentLang,
  householdProfile,
  householdMembers = [],
  savedSchemeCount = 3,
  onOpenLanguage,
  onNavigateHome,
  onNavigateToHousehold,
  onNavigateToApplications,
  onNavigateToSavedSchemes,
  onNavigateToScheme,
  onNavigateToOperator,
  onLogout,
}) => {
  const t = translations[currentLang];
  const isTamil = currentLang === 'ta';

  // Citizen Profile State (Initialized to reference values, dynamically editable)
  const [citizenName, setCitizenName] = useState(() => {
    return localStorage.getItem('urimai_aram_citizen_name') || (isTamil ? 'அகிலன் ம.' : 'Aghilan M.');
  });
  const [citizenRole, setCitizenRole] = useState(() => {
    return localStorage.getItem('urimai_aram_citizen_role') || (isTamil ? 'குடும்ப பிரதிநிதி' : 'Household Representative');
  });
  const [citizenPhone, setCitizenPhone] = useState(() => {
    return localStorage.getItem('urimai_aram_citizen_phone') || '+91 98765 43210';
  });

  // Text size state: 'small' | 'normal' | 'large' | 'xlarge'
  const [textSize, setTextSize] = useState<'small' | 'normal' | 'large' | 'xlarge'>('normal');

  // Modals & Drawers state
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isTextSizeMenuOpen, setIsTextSizeMenuOpen] = useState(false);
  const [isNotificationsDrawerOpen, setIsNotificationsDrawerOpen] = useState(false);
  const [isNotificationSettingsOpen, setIsNotificationSettingsOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [isDataManagementOpen, setIsDataManagementOpen] = useState(false);
  const [isDeleteDataDialogOpen, setIsDeleteDataDialogOpen] = useState(false);
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);

  // Notification Preferences State
  const [notifPreferences, setNotifPreferences] = useState({
    schemeUpdates: true,
    eligibilityAlerts: true,
    documentReminders: true,
    announcements: false,
  });

  // Mock Notifications for the Bell Drawer
  const [notifications, setNotifications] = useState<CitizenNotification[]>([
    {
      id: 'notif-1',
      titleEn: 'CMCHIS Smart Card Verification Pending',
      titleTa: 'CMCHIS ஸ்மார்ட் கார்டு சரிபார்ப்பு நிலுவையில் உள்ளது',
      descEn: 'Your ration card copy is uploaded and awaiting VAO verification.',
      descTa: 'உங்கள் குடும்ப அட்டை நகல் பதிவேற்றப்பட்டு கிராம நிர்வாக அலுவலர் சரிபார்ப்புக்கு காத்திருக்கிறது.',
      timeEn: 'Today, 10:15 AM',
      timeTa: 'இன்று, மு.ப 10:15',
      read: false,
      type: 'document',
    },
    {
      id: 'notif-2',
      titleEn: 'Uzhavar Nanban Scheme Matched',
      titleTa: 'முதலமைச்சர் உழவர் நலத் திட்டம் பொருந்துகிறது',
      descEn: 'Based on your recent profile, your household matches agricultural benefits.',
      descTa: 'உங்கள் விவரங்களின்படி உங்கள் குடும்பம் விவசாய நல உதவிகளுக்குப் பொருந்துகிறது.',
      timeEn: 'Yesterday',
      timeTa: 'நேற்று',
      read: false,
      type: 'scheme',
    },
    {
      id: 'notif-3',
      titleEn: 'Annual Income Certificate Reminder',
      titleTa: 'ஆண்டு வருமானச் சான்று நினைவூட்டல்',
      descEn: 'Obtain an updated income certificate from your nearest e-Sevai centre.',
      descTa: 'உங்கள் அருகிலுள்ள இ-சேவை மையத்தில் புதுப்பிக்கப்பட்ட வருமானச் சான்றைப் பெறுங்கள்.',
      timeEn: '3 days ago',
      timeTa: '3 நாட்களுக்கு முன்',
      read: false,
      type: 'reminder',
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getTextSizeLabel = (size: string) => {
    switch (size) {
      case 'small':
        return t.settingTextSizeSmall;
      case 'large':
        return t.settingTextSizeLarge;
      case 'xlarge':
        return t.settingTextSizeXLarge;
      case 'normal':
      default:
        return t.settingTextSizeNormal;
    }
  };

  const handleSaveProfile = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newName = (formData.get('name') as string)?.trim() || citizenName;
    const newRole = (formData.get('role') as string)?.trim() || citizenRole;
    const newPhone = (formData.get('phone') as string)?.trim() || citizenPhone;

    setCitizenName(newName);
    setCitizenRole(newRole);
    setCitizenPhone(newPhone);
    localStorage.setItem('urimai_aram_citizen_name', newName);
    localStorage.setItem('urimai_aram_citizen_role', newRole);
    localStorage.setItem('urimai_aram_citizen_phone', newPhone);
    setIsEditProfileOpen(false);
  };

  const handleConfirmDeleteData = () => {
    localStorage.removeItem('urimai_aram_citizen_name');
    localStorage.removeItem('urimai_aram_citizen_role');
    localStorage.removeItem('urimai_aram_citizen_phone');
    localStorage.removeItem('urimai_aram_household_profile');
    localStorage.removeItem('urimai_aram_household_members');
    localStorage.removeItem('urimai_aram_saved_schemes');
    localStorage.removeItem('urimai_aram_recent_activity');
    setIsDeleteDataDialogOpen(false);
    onNavigateHome();
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
            unreadCount={unreadCount}
            onOpenLanguage={onOpenLanguage}
            onOpenNotifications={() => setIsNotificationsDrawerOpen(true)}
            onNavigateHome={onNavigateHome}
          />
        </div>

        {/* =========================================================================
            3. CITIZEN PROFILE CARD (Avatar, Name, Role, Phone, Verified, Edit Button)
           ========================================================================= */}
        {/* =========================================================================
            3. CITIZEN PROFILE CARD (Avatar, Name, Role, Phone, Verified, Edit Button)
           ========================================================================= */}
        <section className="w-full bg-[#EAF3EA] rounded-[18px] min-[360px]:rounded-[22px] border border-[#D2E4D4] p-2.5 min-[360px]:p-3 sm:p-4 mb-3.5 shadow-2xs flex items-center justify-between gap-2 min-[360px]:gap-2.5 text-left">
          {/* Left Avatar + Divider + Info */}
          <div className="flex items-center gap-2 min-[360px]:gap-2.5 sm:gap-3 min-w-0 flex-1">
            {/* Circular Profile Avatar */}
            <div className="w-11 h-11 min-[360px]:w-12 min-[360px]:h-12 sm:w-14 sm:h-14 rounded-full bg-[#155B4D] border-2 border-white text-white flex items-center justify-center shrink-0 shadow-xs">
              <User className="w-6 h-6 min-[360px]:w-6.5 min-[360px]:h-6.5 sm:w-7.5 sm:h-7.5 stroke-[2.2]" />
            </div>

            {/* Vertical Divider */}
            <div className="w-[1px] bg-[#C1DBC5] h-9 min-[360px]:h-10 sm:h-12 shrink-0 mx-0.5" />

            {/* Profile Details */}
            <div className="min-w-0 flex-1 overflow-hidden">
              <h2
                className={`text-[#124F43] font-bold text-[13.5px] min-[360px]:text-[14.5px] sm:text-[16px] leading-tight truncate ${
                  isTamil ? 'font-tamil' : ''
                }`}
              >
                {citizenName}
              </h2>

              <p
                className={`text-[#3C4440] text-[10px] min-[360px]:text-[10.5px] sm:text-[11.5px] mt-0.5 leading-tight truncate ${
                  isTamil ? 'font-tamil' : ''
                }`}
              >
                {citizenRole}
              </p>

              {/* Mobile Number + Verification Indicator */}
              <div className="flex items-center gap-1.5 mt-0.5 text-[9.5px] min-[360px]:text-[10px] sm:text-[11px] text-[#3C4440]">
                <span className="truncate">
                  {t.citizenMobileLabel}: {citizenPhone}
                </span>
                <div
                  className="w-3.5 h-3.5 rounded-full bg-[#137333] text-white flex items-center justify-center shrink-0 shadow-2xs"
                  title={t.citizenVerifiedBadge}
                  aria-label={t.citizenVerifiedBadge}
                >
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </div>
              </div>
            </div>
          </div>

          {/* Right: Outlined Edit Profile Button */}
          <button
            type="button"
            onClick={() => setIsEditProfileOpen(true)}
            className="px-1.5 min-[360px]:px-2 py-1 min-[360px]:py-1.5 border-[1.5px] border-[#155B4D] bg-white/70 hover:bg-white active:scale-95 text-[#155B4D] font-bold text-[8.5px] min-[360px]:text-[9px] sm:text-[10px] rounded-[11px] sm:rounded-[13px] flex items-center gap-1 shrink-0 transition-all shadow-2xs cursor-pointer ml-1"
          >
            <Pencil className="w-3 h-3 min-[360px]:w-3.5 min-[360px]:h-3.5 stroke-[2.4] shrink-0" />
            <div className={`flex flex-col text-left leading-[1.08] ${isTamil ? 'font-tamil' : ''}`}>
              <span>{t.editProfileLine1}</span>
              <span>{t.editProfileLine2}</span>
            </div>
          </button>
        </section>

        {/* =========================================================================
            4. ACCOUNT SHORTCUT CARDS (4 equal-width cards)
           ========================================================================= */}
        <div className="w-full grid grid-cols-4 gap-1 min-[360px]:gap-1.5 sm:gap-2 mb-3.5">
          {/* 1. Household Members */}
          <button
            type="button"
            onClick={onNavigateToHousehold}
            className="w-full bg-white rounded-[14px] min-[360px]:rounded-[16px] border border-[#DEE3DF] px-0.5 py-2.5 min-[360px]:py-3 flex flex-col items-center justify-center text-center shadow-2xs hover:border-[#155B4D]/50 hover:bg-[#FAFBF9] active:scale-97 transition-all cursor-pointer h-[76px] min-[360px]:h-[82px] sm:h-[88px]"
          >
            <Users className="w-4.5 h-4.5 min-[360px]:w-5 min-[360px]:h-5 text-[#155B4D] stroke-[2] mb-1.5 shrink-0" />
            <div className={`text-[7.5px] min-[360px]:text-[8px] min-[390px]:text-[8.5px] sm:text-[9.5px] font-bold text-[#202321] leading-[1.2] text-center tracking-tight ${isTamil ? 'font-tamil' : ''}`}>
              <span className="block truncate px-0.5">{t.shortcutHouseholds}</span>
              <span className="block text-[7px] min-[360px]:text-[7.5px] min-[390px]:text-[8px] sm:text-[9px] font-bold text-[#606B66] mt-0.5">
                ({householdMembers.length || 2})
              </span>
            </div>
          </button>

          {/* 2. My Applications / Previous Assessments */}
          <button
            type="button"
            onClick={onNavigateToApplications}
            className="w-full bg-white rounded-[14px] min-[360px]:rounded-[16px] border border-[#DEE3DF] px-0.5 py-2.5 min-[360px]:py-3 flex flex-col items-center justify-center text-center shadow-2xs hover:border-[#155B4D]/50 hover:bg-[#FAFBF9] active:scale-97 transition-all cursor-pointer h-[76px] min-[360px]:h-[82px] sm:h-[88px]"
          >
            <FileText className="w-4.5 h-4.5 min-[360px]:w-5 min-[360px]:h-5 text-[#155B4D] stroke-[2] mb-1.5 shrink-0" />
            <div className={`text-[7.5px] min-[360px]:text-[8px] min-[390px]:text-[8.5px] sm:text-[9.5px] font-bold text-[#202321] leading-[1.2] text-center tracking-tight ${isTamil ? 'font-tamil' : ''}`}>
              {isTamil ? (
                <>
                  <span className="block truncate px-0.5">முந்தைய</span>
                  <span className="block truncate px-0.5 mt-0.5">மதிப்பீடுகள்</span>
                </>
              ) : (
                <>
                  <span className="block truncate px-0.5">My</span>
                  <span className="block truncate px-0.5 mt-0.5">Applications</span>
                </>
              )}
            </div>
          </button>

          {/* 3. Saved Schemes */}
          <button
            type="button"
            onClick={onNavigateToSavedSchemes}
            className="w-full bg-white rounded-[14px] min-[360px]:rounded-[16px] border border-[#DEE3DF] px-0.5 py-2.5 min-[360px]:py-3 flex flex-col items-center justify-center text-center shadow-2xs hover:border-[#155B4D]/50 hover:bg-[#FAFBF9] active:scale-97 transition-all cursor-pointer h-[76px] min-[360px]:h-[82px] sm:h-[88px]"
          >
            <Bookmark className="w-4.5 h-4.5 min-[360px]:w-5 min-[360px]:h-5 text-[#155B4D] stroke-[2] mb-1.5 shrink-0" />
            <div className={`text-[7.5px] min-[360px]:text-[8px] min-[390px]:text-[8.5px] sm:text-[9.5px] font-bold text-[#202321] leading-[1.2] text-center tracking-tight ${isTamil ? 'font-tamil' : ''}`}>
              {isTamil ? (
                <>
                  <span className="block truncate px-0.5">சேமித்த</span>
                  <span className="block truncate px-0.5 mt-0.5">திட்டங்கள்</span>
                </>
              ) : (
                <>
                  <span className="block truncate px-0.5">Saved</span>
                  <span className="block truncate px-0.5 mt-0.5">Schemes</span>
                </>
              )}
            </div>
          </button>

          {/* 4. Notifications */}
          <button
            type="button"
            onClick={() => setIsNotificationsDrawerOpen(true)}
            className="w-full bg-white rounded-[14px] min-[360px]:rounded-[16px] border border-[#DEE3DF] px-0.5 py-2.5 min-[360px]:py-3 flex flex-col items-center justify-center text-center shadow-2xs hover:border-[#155B4D]/50 hover:bg-[#FAFBF9] active:scale-97 transition-all cursor-pointer h-[76px] min-[360px]:h-[82px] sm:h-[88px]"
          >
            <div className="relative mb-1.5 shrink-0">
              <Bell className="w-4.5 h-4.5 min-[360px]:w-5 min-[360px]:h-5 text-[#155B4D] stroke-[2]" />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#F4C542] border border-white" />
            </div>
            <div className={`text-[7.5px] min-[360px]:text-[8px] min-[390px]:text-[8.5px] sm:text-[9.5px] font-bold text-[#202321] leading-[1.2] text-center tracking-tight ${isTamil ? 'font-tamil' : ''}`}>
              <span className="block truncate px-0.5">{t.shortcutNotifications}</span>
              <span className="block text-[7px] min-[360px]:text-[7.5px] min-[390px]:text-[8px] sm:text-[9px] font-bold text-[#606B66] mt-0.5">
                ({unreadCount || 3})
              </span>
            </div>
          </button>
        </div>

        {/* =========================================================================
            5. RECENT ACTIVITY SECTION (Header, View All, 2 Assessment Rows)
           ========================================================================= */}
        <div className="w-full flex items-center justify-between pt-1 pb-2">
          <h3
            className={`text-[#155B4D] font-bold text-[15px] min-[360px]:text-[16px] sm:text-[17px] leading-tight ${
              isTamil ? 'font-tamil' : ''
            }`}
          >
            {t.recentActivityHeading}
          </h3>

          <button
            type="button"
            onClick={onNavigateToApplications}
            className={`text-[#155B4D] hover:underline font-semibold text-[10px] min-[360px]:text-[11px] sm:text-[12px] flex items-center gap-0.5 cursor-pointer ${
              isTamil ? 'font-tamil' : ''
            }`}
          >
            <span>{t.recentActivityViewAll}</span>
            <ChevronRight className="w-3.5 h-3.5 stroke-[2.4]" />
          </button>
        </div>

        {/* Recent Activity Card Container */}
        <section className="w-full bg-white rounded-[16px] min-[360px]:rounded-[18px] border border-[#DEE3DF] shadow-2xs divide-y divide-[#F0F4F1] p-1 mb-3.5 text-left">
          {/* Row 1: CMCHIS */}
          <div
            onClick={() => onNavigateToScheme('cmchis')}
            className="w-full p-2 min-[360px]:p-2.5 flex items-center justify-between gap-2 min-[360px]:gap-2.5 cursor-pointer hover:bg-[#FAFBF9] rounded-[12px] transition-colors group"
          >
            <div className="flex items-center gap-2 min-[360px]:gap-2.5 min-w-0 flex-1">
              {/* Medical HeartPulse Icon */}
              <div className="w-8.5 h-8.5 min-[360px]:w-9 min-[360px]:h-9 sm:w-10 sm:h-10 rounded-[10px] sm:rounded-[12px] bg-[#EAF3EA] text-[#155B4D] flex items-center justify-center shrink-0">
                <HeartPulse className="w-4 h-4 min-[360px]:w-4.5 min-[360px]:h-4.5 stroke-[2.2]" />
              </div>

              {/* Title & Status */}
              <div className="min-w-0 flex-1 overflow-hidden">
                <h4
                  className={`font-bold text-[#202321] text-[11px] min-[360px]:text-[11.5px] min-[390px]:text-[12px] sm:text-[13px] leading-tight truncate ${
                    isTamil ? 'font-tamil' : ''
                  }`}
                >
                  {t.activityCmchisTitle}
                </h4>

                <div className="flex items-center gap-1 mt-0.5 text-[8.5px] min-[360px]:text-[9px] min-[390px]:text-[9.5px] sm:text-[10.5px] text-[#137333]">
                  <div className="w-3 h-3 min-[360px]:w-3.5 min-[360px]:h-3.5 rounded-full border-[1.2px] border-[#137333] flex items-center justify-center shrink-0">
                    <Check className="w-1.5 h-1.5 min-[360px]:w-2 min-[360px]:h-2 stroke-[3]" />
                  </div>
                  <span className={`font-medium truncate ${isTamil ? 'font-tamil' : ''}`}>
                    {t.activityCmchisStatus}
                  </span>
                </div>
              </div>
            </div>

            {/* Date + Chevron */}
            <div className="flex items-center gap-1 shrink-0 ml-1">
              <span className={`text-[8.5px] min-[360px]:text-[9px] min-[390px]:text-[9.5px] sm:text-[10.5px] text-[#606B66] whitespace-nowrap ${isTamil ? 'font-tamil' : ''}`}>
                {t.activityCmchisDate}
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-[#48544F] group-hover:text-[#155B4D] stroke-[2.2] shrink-0 transition-colors" />
            </div>
          </div>

          {/* Row 2: Agricultural Scheme */}
          <div
            onClick={() => onNavigateToScheme('uzhavar-nanban')}
            className="w-full p-2 min-[360px]:p-2.5 flex items-center justify-between gap-2 min-[360px]:gap-2.5 cursor-pointer hover:bg-[#FAFBF9] rounded-[12px] transition-colors group"
          >
            <div className="flex items-center gap-2 min-[360px]:gap-2.5 min-w-0 flex-1">
              {/* Plant / Sprout Icon */}
              <div className="w-8.5 h-8.5 min-[360px]:w-9 min-[360px]:h-9 sm:w-10 sm:h-10 rounded-[10px] sm:rounded-[12px] bg-[#EAF3EA] text-[#155B4D] flex items-center justify-center shrink-0">
                <Sprout className="w-4 h-4 min-[360px]:w-4.5 min-[360px]:h-4.5 stroke-[2.2]" />
              </div>

              {/* Title & Status */}
              <div className="min-w-0 flex-1 overflow-hidden">
                <h4
                  className={`font-bold text-[#202321] text-[11px] min-[360px]:text-[11.5px] min-[390px]:text-[12px] sm:text-[13px] leading-tight truncate ${
                    isTamil ? 'font-tamil' : ''
                  }`}
                >
                  {t.activityFarmerTitle}
                </h4>

                <div className="flex items-center gap-1 mt-0.5 text-[8.5px] min-[360px]:text-[9px] min-[390px]:text-[9.5px] sm:text-[10.5px] text-[#137333]">
                  <div className="w-3 h-3 min-[360px]:w-3.5 min-[360px]:h-3.5 rounded-full border-[1.2px] border-[#137333] flex items-center justify-center shrink-0">
                    <Check className="w-1.5 h-1.5 min-[360px]:w-2 min-[360px]:h-2 stroke-[3]" />
                  </div>
                  <span className={`font-medium truncate ${isTamil ? 'font-tamil' : ''}`}>
                    {t.activityFarmerStatus}
                  </span>
                </div>
              </div>
            </div>

            {/* Date + Chevron */}
            <div className="flex items-center gap-1 shrink-0 ml-1">
              <span className={`text-[8.5px] min-[360px]:text-[9px] min-[390px]:text-[9.5px] sm:text-[10.5px] text-[#606B66] whitespace-nowrap ${isTamil ? 'font-tamil' : ''}`}>
                {t.activityFarmerDate}
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-[#48544F] group-hover:text-[#155B4D] stroke-[2.2] shrink-0 transition-colors" />
            </div>
          </div>
        </section>

        {/* =========================================================================
            6. SETTINGS SECTION (Header, 6 Unified Stacked Rows)
           ========================================================================= */}
        <div className="w-full text-left pt-1 pb-2">
          <h3
            className={`text-[#155B4D] font-bold text-[13.5px] min-[360px]:text-[14.5px] sm:text-[16px] leading-tight ${
              isTamil ? 'font-tamil' : ''
            }`}
          >
            {t.settingsHeading}
          </h3>
        </div>

        {/* Unified Settings Container */}
        <section className="w-full bg-white rounded-[16px] min-[360px]:rounded-[18px] border border-[#DEE3DF] shadow-2xs divide-y divide-[#F0F4F1] p-1 mb-4 text-left">
          {/* Row 1: Language */}
          <div
            onClick={onOpenLanguage}
            className="w-full p-2 min-[360px]:p-2.5 flex items-center justify-between gap-2 min-[360px]:gap-2.5 cursor-pointer hover:bg-[#FAFBF9] rounded-[12px] transition-colors group"
          >
            <div className="flex items-center gap-2 min-[360px]:gap-2.5 min-w-0 flex-1">
              <div className="w-8 h-8 min-[360px]:w-8.5 min-[360px]:h-8.5 rounded-[10px] bg-[#EAF3EA] text-[#155B4D] flex items-center justify-center shrink-0">
                <Languages className="w-4 h-4 stroke-[2.2]" />
              </div>
              <span
                className={`font-semibold text-[#202321] text-[11px] min-[360px]:text-[11.5px] min-[390px]:text-[12px] sm:text-[13px] truncate ${
                  isTamil ? 'font-tamil' : ''
                }`}
              >
                {t.settingLanguage}
              </span>
            </div>

            <div className="flex items-center gap-1 shrink-0 text-[#202321] text-[10px] min-[360px]:text-[11px]">
              <span className={`font-medium ${isTamil ? 'font-tamil' : ''}`}>
                {isTamil ? 'தமிழ்' : 'English'}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-[#48544F] stroke-[2.2]" />
            </div>
          </div>

          {/* Row 2: Text Size */}
          <div
            onClick={() => setIsTextSizeMenuOpen(!isTextSizeMenuOpen)}
            className="w-full p-2 min-[360px]:p-2.5 flex items-center justify-between gap-2 min-[360px]:gap-2.5 cursor-pointer hover:bg-[#FAFBF9] rounded-[12px] transition-colors group relative"
          >
            <div className="flex items-center gap-2 min-[360px]:gap-2.5 min-w-0 flex-1">
              <div className="w-8 h-8 min-[360px]:w-8.5 min-[360px]:h-8.5 rounded-[10px] bg-[#EAF3EA] text-[#155B4D] flex items-center justify-center shrink-0">
                <span className="font-bold text-[12px] tracking-tighter leading-none select-none">AA</span>
              </div>
              <span
                className={`font-semibold text-[#202321] text-[11px] min-[360px]:text-[11.5px] min-[390px]:text-[12px] sm:text-[13px] truncate ${
                  isTamil ? 'font-tamil' : ''
                }`}
              >
                {t.settingTextSize}
              </span>
            </div>

            <div className="flex items-center gap-1 shrink-0 text-[#202321] text-[10px] min-[360px]:text-[11px]">
              <span className={`font-medium ${isTamil ? 'font-tamil' : ''}`}>
                {getTextSizeLabel(textSize)}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-[#48544F] stroke-[2.2]" />
            </div>
          </div>

          {/* Inline Text Size Dropdown (Toggled by Row 2) */}
          {isTextSizeMenuOpen && (
            <div className="p-2 bg-[#FAFBF9] rounded-[10px] mx-1 my-1 border border-[#DEE3DF] flex items-center justify-around gap-1">
              {(['small', 'normal', 'large', 'xlarge'] as const).map((sz) => (
                <button
                  key={sz}
                  type="button"
                  onClick={() => {
                    setTextSize(sz);
                    setIsTextSizeMenuOpen(false);
                  }}
                  className={`px-2 py-0.5 rounded-full text-[9.5px] font-bold transition-all cursor-pointer ${
                    textSize === sz
                      ? 'bg-[#155B4D] text-white shadow-2xs'
                      : 'bg-white hover:bg-[#EAF3EA] text-[#202321] border border-[#DEE3DF]'
                  } ${isTamil ? 'font-tamil' : ''}`}
                >
                  {getTextSizeLabel(sz)}
                </button>
              ))}
            </div>
          )}

          {/* Row 3: Notification Settings */}
          <div
            onClick={() => setIsNotificationSettingsOpen(true)}
            className="w-full p-2 min-[360px]:p-2.5 flex items-center justify-between gap-2 min-[360px]:gap-2.5 cursor-pointer hover:bg-[#FAFBF9] rounded-[12px] transition-colors group"
          >
            <div className="flex items-center gap-2 min-[360px]:gap-2.5 min-w-0 flex-1">
              <div className="w-8 h-8 min-[360px]:w-8.5 min-[360px]:h-8.5 rounded-[10px] bg-[#EAF3EA] text-[#155B4D] flex items-center justify-center shrink-0">
                <Bell className="w-4 h-4 stroke-[2.2]" />
              </div>
              <span
                className={`font-semibold text-[#202321] text-[11px] min-[360px]:text-[11.5px] min-[390px]:text-[12px] sm:text-[13px] truncate ${
                  isTamil ? 'font-tamil' : ''
                }`}
              >
                {t.settingNotifications}
              </span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-[#48544F] group-hover:text-[#155B4D] stroke-[2.2] shrink-0 transition-colors" />
          </div>

          {/* Row 4: Privacy & Consent */}
          <div
            onClick={() => setIsPrivacyModalOpen(true)}
            className="w-full p-2 min-[360px]:p-2.5 flex items-center justify-between gap-2 min-[360px]:gap-2.5 cursor-pointer hover:bg-[#FAFBF9] rounded-[12px] transition-colors group"
          >
            <div className="flex items-center gap-2 min-[360px]:gap-2.5 min-w-0 flex-1">
              <div className="w-8 h-8 min-[360px]:w-8.5 min-[360px]:h-8.5 rounded-[10px] bg-[#EAF3EA] text-[#155B4D] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4 stroke-[2.2]" />
              </div>
              <span
                className={`font-semibold text-[#202321] text-[11px] min-[360px]:text-[11.5px] min-[390px]:text-[12px] sm:text-[13px] truncate ${
                  isTamil ? 'font-tamil' : ''
                }`}
              >
                {t.settingPrivacy}
              </span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-[#48544F] group-hover:text-[#155B4D] stroke-[2.2] shrink-0 transition-colors" />
          </div>

          {/* Row 5: My Data Management */}
          <div
            onClick={() => setIsDataManagementOpen(true)}
            className="w-full p-2 min-[360px]:p-2.5 flex items-center justify-between gap-2 min-[360px]:gap-2.5 cursor-pointer hover:bg-[#FAFBF9] rounded-[12px] transition-colors group"
          >
            <div className="flex items-center gap-2 min-[360px]:gap-2.5 min-w-0 flex-1">
              <div className="w-8 h-8 min-[360px]:w-8.5 min-[360px]:h-8.5 rounded-[10px] bg-[#EAF3EA] text-[#155B4D] flex items-center justify-center shrink-0">
                <Database className="w-4 h-4 stroke-[2.2]" />
              </div>
              <span
                className={`font-semibold text-[#202321] text-[11px] min-[360px]:text-[11.5px] min-[390px]:text-[12px] sm:text-[13px] truncate ${
                  isTamil ? 'font-tamil' : ''
                }`}
              >
                {t.settingDataManagement}
              </span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-[#48544F] group-hover:text-[#155B4D] stroke-[2.2] shrink-0 transition-colors" />
          </div>

          {/* Row 6: Delete My Data (Destructive action) */}
          <div
            onClick={() => setIsDeleteDataDialogOpen(true)}
            className="w-full p-2 min-[360px]:p-2.5 flex items-center justify-between gap-2 min-[360px]:gap-2.5 cursor-pointer hover:bg-[#FDF2F2] rounded-[12px] transition-colors group"
          >
            <div className="flex items-center gap-2 min-[360px]:gap-2.5 min-w-0 flex-1">
              <div className="w-8 h-8 min-[360px]:w-8.5 min-[360px]:h-8.5 rounded-[10px] bg-[#FCEBE9] text-[#C62828] flex items-center justify-center shrink-0">
                <Trash2 className="w-4 h-4 stroke-[2.2]" />
              </div>
              <span
                className={`font-semibold text-[#202321] group-hover:text-[#C62828] text-[11px] min-[360px]:text-[11.5px] min-[390px]:text-[12px] sm:text-[13px] truncate transition-colors ${
                  isTamil ? 'font-tamil' : ''
                }`}
              >
                {t.settingDeleteData}
              </span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-[#48544F] group-hover:text-[#C62828] stroke-[2.2] shrink-0 transition-colors" />
          </div>

          {/* Row 7: Operator Assistance Portal */}
          {onNavigateToOperator && (
            <div
              onClick={onNavigateToOperator}
              className="w-full p-2 min-[360px]:p-2.5 flex items-center justify-between gap-2 min-[360px]:gap-2.5 cursor-pointer hover:bg-[#F2F8F4] rounded-[12px] transition-colors group"
            >
              <div className="flex items-center gap-2 min-[360px]:gap-2.5 min-w-0 flex-1">
                <div className="w-8 h-8 min-[360px]:w-8.5 min-[360px]:h-8.5 rounded-[10px] bg-[#EAF3EA] text-[#145B49] flex items-center justify-center shrink-0">
                  <User className="w-4 h-4 stroke-[2.2]" />
                </div>
                <div className="min-w-0">
                  <span
                    className={`font-semibold text-[#145B49] text-[11px] min-[360px]:text-[11.5px] min-[390px]:text-[12px] sm:text-[13px] truncate block ${
                      isTamil ? 'font-tamil' : ''
                    }`}
                  >
                    {isTamil ? 'ஆபரேட்டர் உதவி மையம்' : 'Operator Assistance Centre'}
                  </span>
                  <span className="text-[9.5px] text-[#606B66] block">
                    {isTamil ? 'இ-சேவை & விண்ணப்ப மேலாண்மை' : 'e-Sevai & Application Management'}
                  </span>
                </div>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-[#145B49] stroke-[2.2] shrink-0 transition-colors" />
            </div>
          )}
        </section>

        {/* =========================================================================
            7. LOGOUT BUTTON (Red Outlined, Below Settings Card)
           ========================================================================= */}
        <button
          type="button"
          onClick={() => setIsLogoutDialogOpen(true)}
          className="w-full h-[44px] min-[360px]:h-[46px] sm:h-[50px] rounded-[14px] sm:rounded-[16px] border-[1.5px] border-[#C62828] bg-transparent hover:bg-[#FCEBE9]/40 active:scale-[0.99] text-[#C62828] font-bold text-[12.5px] min-[360px]:text-[13.5px] sm:text-[14.5px] flex items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs mb-2"
        >
          <LogOut className="w-4 h-4 min-[360px]:w-4.5 min-[360px]:h-4.5 stroke-[2.4]" />
          <span className={isTamil ? 'font-tamil' : ''}>{t.logoutBtn}</span>
        </button>
      </main>

      {/* =========================================================================
          MODALS & DIALOGS
         ========================================================================= */}

      {/* 1. Edit Profile Modal */}
      {isEditProfileOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-sm bg-white rounded-[22px] p-5 shadow-2xl border border-[#D2E4D4] animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-[#F0F4F1]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#EAF3EA] text-[#155B4D] flex items-center justify-center">
                  <Pencil className="w-4 h-4" />
                </div>
                <h3 className={`font-bold text-[#155B4D] text-[15px] ${isTamil ? 'font-tamil' : ''}`}>
                  {t.editProfileModalTitle}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsEditProfileOpen(false)}
                className="w-7 h-7 rounded-full bg-[#F0F4F1] hover:bg-[#E2EAE3] text-[#48544F] flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="mt-4 space-y-3.5 text-left">
              <div>
                <label className={`block text-[11px] font-bold text-[#3C4440] mb-1 ${isTamil ? 'font-tamil' : ''}`}>
                  {t.editProfileFullName}
                </label>
                <input
                  name="name"
                  type="text"
                  defaultValue={citizenName}
                  required
                  className="w-full px-3 py-2 rounded-[12px] border border-[#DEE3DF] bg-[#FAFBF9] text-[#202321] text-[13px] font-semibold focus:outline-none focus:border-[#155B4D]"
                />
              </div>

              <div>
                <label className={`block text-[11px] font-bold text-[#3C4440] mb-1 ${isTamil ? 'font-tamil' : ''}`}>
                  {t.editProfileRole}
                </label>
                <input
                  name="role"
                  type="text"
                  defaultValue={citizenRole}
                  required
                  className="w-full px-3 py-2 rounded-[12px] border border-[#DEE3DF] bg-[#FAFBF9] text-[#202321] text-[13px] font-medium focus:outline-none focus:border-[#155B4D]"
                />
              </div>

              <div>
                <label className={`block text-[11px] font-bold text-[#3C4440] mb-1 ${isTamil ? 'font-tamil' : ''}`}>
                  {t.editProfilePhone}
                </label>
                <input
                  name="phone"
                  type="text"
                  defaultValue={citizenPhone}
                  required
                  className="w-full px-3 py-2 rounded-[12px] border border-[#DEE3DF] bg-[#FAFBF9] text-[#202321] text-[13px] font-medium focus:outline-none focus:border-[#155B4D]"
                />
              </div>

              <div className="pt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditProfileOpen(false)}
                  className="flex-1 py-2.5 rounded-[12px] border border-[#DEE3DF] text-[#48544F] font-semibold text-[12px] hover:bg-[#F2F4F2]"
                >
                  {t.logoutCancelBtn}
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-[12px] bg-[#155B4D] hover:bg-[#124F43] text-white font-bold text-[12px] shadow-2xs"
                >
                  {t.editProfileSave}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. Notification Settings Modal */}
      {isNotificationSettingsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-sm bg-white rounded-[22px] p-5 shadow-2xl border border-[#D2E4D4] animate-in zoom-in-95 text-left">
            <div className="flex items-center justify-between pb-3 border-b border-[#F0F4F1]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#EAF3EA] text-[#155B4D] flex items-center justify-center">
                  <Bell className="w-4 h-4" />
                </div>
                <h3 className={`font-bold text-[#155B4D] text-[15px] ${isTamil ? 'font-tamil' : ''}`}>
                  {t.settingNotifications}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsNotificationSettingsOpen(false)}
                className="w-7 h-7 rounded-full bg-[#F0F4F1] hover:bg-[#E2EAE3] text-[#48544F] flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-4 space-y-3">
              {[
                { key: 'schemeUpdates', labelTa: 'திட்டப் புதுப்பிப்புகள்', labelEn: 'Scheme Updates' },
                { key: 'eligibilityAlerts', labelTa: 'தகுதி எச்சரிக்கைகள்', labelEn: 'Eligibility Alerts' },
                { key: 'documentReminders', labelTa: 'ஆவண நினைவூட்டல்கள்', labelEn: 'Document Reminders' },
                { key: 'announcements', labelTa: 'பொது அறிவிப்புகள்', labelEn: 'General Announcements' },
              ].map((item) => (
                <div
                  key={item.key}
                  className="flex items-center justify-between py-2 border-b border-[#F0F4F1] last:border-0"
                >
                  <span className={`text-[12.5px] font-semibold text-[#202321] ${isTamil ? 'font-tamil' : ''}`}>
                    {isTamil ? item.labelTa : item.labelEn}
                  </span>
                  <input
                    type="checkbox"
                    checked={notifPreferences[item.key as keyof typeof notifPreferences]}
                    onChange={(e) =>
                      setNotifPreferences((prev) => ({
                        ...prev,
                        [item.key]: e.target.checked,
                      }))
                    }
                    className="w-4.5 h-4.5 accent-[#155B4D] cursor-pointer"
                  />
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setIsNotificationSettingsOpen(false)}
              className="w-full mt-4 py-2.5 rounded-[12px] bg-[#155B4D] text-white font-bold text-[12px]"
            >
              {isTamil ? 'சரி' : 'Done'}
            </button>
          </div>
        </div>
      )}

      {/* 3. Privacy & Consent Modal */}
      {isPrivacyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-sm bg-white rounded-[22px] p-5 shadow-2xl border border-[#D2E4D4] animate-in zoom-in-95 text-left">
            <div className="flex items-center justify-between pb-3 border-b border-[#F0F4F1]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#EAF3EA] text-[#155B4D] flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h3 className={`font-bold text-[#155B4D] text-[15px] ${isTamil ? 'font-tamil' : ''}`}>
                  {t.settingPrivacy}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsPrivacyModalOpen(false)}
                className="w-7 h-7 rounded-full bg-[#F0F4F1] hover:bg-[#E2EAE3] text-[#48544F] flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-3.5 space-y-2.5 text-[11.5px] text-[#53616B] leading-relaxed">
              <p>
                {isTamil
                  ? 'உரிமையறம் தளம் உங்கள் தகவல்களை முழு தனியுரிமையுடன் பாதுகாக்கிறது. உங்கள் சுயவிவரத் தகவல்கள் உங்கள் சாதனத்தில் மட்டுமே சேமிக்கப்பட்டு, நலத்திட்ட தகுதி கணக்கீடுகளுக்கு மட்டுமே பயன்படுத்தப்படுகிறது.'
                  : 'URIMAI ARAM ensures strict citizen data privacy. Your profile details remain stored locally on your device and are used solely to assess welfare scheme eligibility.'}
              </p>
              <div className="p-2.5 bg-[#FAFBF9] rounded-[10px] border border-[#DEE3DF] text-[#155B4D] font-medium flex items-center gap-2">
                <Info className="w-4 h-4 shrink-0" />
                <span>
                  {isTamil
                    ? 'தரவு பரிமாற்றம் தமிழ்நாடு மின்னாளுமை வழிகாட்டுதல்களுக்கு உட்பட்டது.'
                    : 'Encrypted in accordance with Tamil Nadu e-Governance guidelines.'}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsPrivacyModalOpen(false)}
              className="w-full mt-4 py-2.5 rounded-[12px] bg-[#155B4D] text-white font-bold text-[12px]"
            >
              {isTamil ? 'மூடு' : 'Close'}
            </button>
          </div>
        </div>
      )}

      {/* 4. My Data Management Modal */}
      {isDataManagementOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-sm bg-white rounded-[22px] p-5 shadow-2xl border border-[#D2E4D4] animate-in zoom-in-95 text-left">
            <div className="flex items-center justify-between pb-3 border-b border-[#F0F4F1]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#EAF3EA] text-[#155B4D] flex items-center justify-center">
                  <Database className="w-4 h-4" />
                </div>
                <h3 className={`font-bold text-[#155B4D] text-[15px] ${isTamil ? 'font-tamil' : ''}`}>
                  {t.settingDataManagement}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsDataManagementOpen(false)}
                className="w-7 h-7 rounded-full bg-[#F0F4F1] hover:bg-[#E2EAE3] text-[#48544F] flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-3.5 space-y-2 text-[12px] text-[#202321]">
              <div className="p-2.5 bg-[#FAFBF9] rounded-[10px] border border-[#DEE3DF] space-y-1">
                <div className="flex justify-between">
                  <span className="text-[#606B66]">{isTamil ? 'குடும்ப உறுப்பினர்கள்' : 'Household Members'}:</span>
                  <span className="font-bold">{householdMembers.length || 2}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#606B66]">{isTamil ? 'சேமிக்கப்பட்ட திட்டங்கள்' : 'Saved Schemes'}:</span>
                  <span className="font-bold">{savedSchemeCount || 3}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#606B66]">{isTamil ? 'கடைசி மதிப்பீடு' : 'Last Assessment'}:</span>
                  <span className="font-bold">28 Oct 2026</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  const dataToExport = {
                    citizenName,
                    citizenRole,
                    citizenPhone,
                    householdMembers,
                    exportedAt: new Date().toISOString(),
                  };
                  const blob = new Blob([JSON.stringify(dataToExport, null, 2)], { type: 'application/json' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `urimai_aram_data_${Date.now()}.json`;
                  a.click();
                  URL.revokeObjectURL(url);
                }}
                className="w-full py-2.5 rounded-[12px] border border-[#155B4D] text-[#155B4D] font-bold text-[12px] flex items-center justify-center gap-1.5 hover:bg-[#EAF3EA]"
              >
                <Download className="w-4 h-4" />
                <span>{isTamil ? 'என் தரவை பதிவிறக்கம் செய்' : 'Download My Data (JSON)'}</span>
              </button>
            </div>

            <button
              type="button"
              onClick={() => setIsDataManagementOpen(false)}
              className="w-full mt-3 py-2 rounded-[12px] bg-[#F2F4F2] text-[#48544F] font-semibold text-[12px]"
            >
              {isTamil ? 'மூடு' : 'Close'}
            </button>
          </div>
        </div>
      )}

      {/* 5. Delete My Data Confirmation Dialog */}
      {isDeleteDataDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/55 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-sm bg-white rounded-[22px] p-5 shadow-2xl border border-[#FAD2CF] animate-in zoom-in-95 text-center">
            <div className="w-12 h-12 rounded-full bg-[#FCEBE9] text-[#C62828] flex items-center justify-center mx-auto mb-3 shadow-xs">
              <AlertTriangle className="w-6 h-6 stroke-[2.4]" />
            </div>

            <h3 className={`font-bold text-[#C62828] text-[16px] leading-tight ${isTamil ? 'font-tamil' : ''}`}>
              {t.deleteDataDialogTitle}
            </h3>

            <p className={`text-[#53616B] text-[12px] leading-snug mt-2 ${isTamil ? 'font-tamil' : ''}`}>
              {t.deleteDataDialogDesc}
            </p>

            <div className="mt-5 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsDeleteDataDialogOpen(false)}
                className="flex-1 py-2.5 rounded-[12px] border border-[#DEE3DF] text-[#48544F] font-semibold text-[12.5px] hover:bg-[#F2F4F2]"
              >
                {t.deleteDataCancelBtn}
              </button>
              <button
                type="button"
                onClick={handleConfirmDeleteData}
                className="flex-1 py-2.5 rounded-[12px] bg-[#C62828] hover:bg-[#A81F1F] text-white font-bold text-[12.5px] shadow-xs"
              >
                {t.deleteDataConfirmBtn}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. Logout Confirmation Dialog */}
      {isLogoutDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-sm bg-white rounded-[22px] p-5 shadow-2xl border border-[#DEE3DF] animate-in zoom-in-95 text-center">
            <div className="w-12 h-12 rounded-full bg-[#FCEBE9] text-[#C62828] flex items-center justify-center mx-auto mb-3 shadow-xs">
              <LogOut className="w-6 h-6 stroke-[2.4]" />
            </div>

            <h3 className={`font-bold text-[#202321] text-[16px] leading-tight ${isTamil ? 'font-tamil' : ''}`}>
              {t.logoutDialogTitle}
            </h3>

            <p className={`text-[#53616B] text-[12px] leading-snug mt-2 ${isTamil ? 'font-tamil' : ''}`}>
              {t.logoutDialogDesc}
            </p>

            <div className="mt-5 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsLogoutDialogOpen(false)}
                className="flex-1 py-2.5 rounded-[12px] border border-[#DEE3DF] text-[#48544F] font-semibold text-[12.5px] hover:bg-[#F2F4F2]"
              >
                {t.logoutCancelBtn}
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsLogoutDialogOpen(false);
                  onLogout();
                }}
                className="flex-1 py-2.5 rounded-[12px] bg-[#C62828] hover:bg-[#A81F1F] text-white font-bold text-[12.5px] shadow-xs"
              >
                {t.logoutConfirmBtn}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 7. Shared Notifications Drawer */}
      <NotificationDrawer
        isOpen={isNotificationsDrawerOpen}
        currentLang={currentLang}
        notifications={notifications}
        onMarkAllRead={() => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))}
        onSelectNotification={(id) => {
          setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
        }}
        onClose={() => setIsNotificationsDrawerOpen(false)}
      />
    </div>
  );
};
