import React, { useState } from 'react';
import { Bell, ChevronDown, Check, Home, LayoutGrid, ClipboardCheck, User, Users } from 'lucide-react';
import { translations } from '../../data/translations';
import { Language } from '../../types';
import { householdService } from '../../services/householdService';
import { CitizenNotification, NotificationDrawer } from '../Dashboard/modals/NotificationDrawer';

interface CitizenShellProps {
  currentLang: Language;
  activeNav: 'home' | 'schemes' | 'results' | 'account';
  children: React.ReactNode;
  onNavigateHome: () => void;
  onNavigateSchemes: () => void;
  onNavigateResults: () => void;
  onNavigateAccount: () => void;
  onNavigateHousehold: () => void;
  onOpenLanguage: () => void;
}

export const CitizenShell: React.FC<CitizenShellProps> = ({
  currentLang,
  activeNav,
  children,
  onNavigateHome,
  onNavigateSchemes,
  onNavigateResults,
  onNavigateAccount,
  onNavigateHousehold,
  onOpenLanguage,
}) => {
  const isTamil = currentLang === 'ta';
  const t = translations[currentLang];
  const household = householdService.getState();
  const [isHouseholdSwitcherOpen, setIsHouseholdSwitcherOpen] = useState(false);
  const [isNotificationDrawerOpen, setIsNotificationDrawerOpen] = useState(false);

  const [notifications, setNotifications] = useState<CitizenNotification[]>([
    {
      id: 'notif-1',
      titleEn: 'CMCHIS Hospitalization Coverage Active',
      titleTa: 'CMCHIS மருத்துவ காப்பீடு புதுப்பிக்கப்பட்டது',
      descEn: 'Family cashless assistance up to ₹5 Lakhs is active across empanelled hospitals.',
      descTa: 'உங்கள் குடும்பத்திற்கான ₹5 லட்சம் மருத்துவ சிகிச்சை அட்டை பயன்பாட்டில் உள்ளது.',
      timeEn: '2 hours ago',
      timeTa: '2 மணி நேரத்திற்கு முன்',
      read: false,
      type: 'scheme',
    },
    {
      id: 'notif-2',
      titleEn: 'Annual Household Profile Ready for Review',
      titleTa: 'குடும்ப விவரங்கள் சரிபார்ப்புக்கு தயார்',
      descEn: 'Priya’s higher secondary attendance bonafide verified.',
      descTa: 'மகள் பிரியாவின் பள்ளி வருகைப் பதிவு வெற்றிகரமாக சரிபார்க்கப்பட்டது.',
      timeEn: 'Yesterday',
      timeTa: 'நேற்று',
      read: true,
      type: 'document',
    },
  ]);

  return (
    <div className="relative w-full min-h-screen bg-[#FAF7EF] text-[#202820] flex flex-col justify-between overflow-x-hidden pt-1 pb-0 antialiased select-none">
      {/* 1. CITIZEN SHELL HEADER */}
      <header className="w-full px-4 sm:px-5 pt-3 pb-2 flex items-center justify-between border-b border-[#E8E2D5]/70 bg-[#FAF7EF]/90 backdrop-blur-md sticky top-0 z-30">
        {/* Left: Brand Lockup */}
        <button
          type="button"
          onClick={onNavigateHome}
          className="flex items-center gap-1.5 sm:gap-2 cursor-pointer hover:opacity-90 active:scale-98 transition-all text-left shrink-0"
          aria-label="Urimai Aram Home"
        >
          <img
            src="/assets/aistudio/emblem.png"
            alt="Emblem"
            className="w-[24px] h-[28px] sm:w-[26px] sm:h-[30px] object-contain shrink-0"
          />
          <div className="flex flex-col justify-center">
            <span className="font-tamil text-[13.5px] sm:text-[14.5px] font-bold text-[#202820] leading-tight">
              உரிமையறம்
            </span>
            <span className="text-[8px] sm:text-[8.5px] font-bold text-[#202820] tracking-wider uppercase leading-none mt-0.5">
              URIMAI ARAM
            </span>
          </div>
        </button>

        {/* Center/Right: Household Switcher Pill */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={() => setIsHouseholdSwitcherOpen((prev) => !prev)}
            className="flex items-center gap-1 px-2.5 py-1 bg-white hover:bg-[#F4EFE2] active:scale-95 border border-[#DCD5C6] rounded-full shadow-2xs text-[11px] sm:text-[11.5px] font-semibold text-[#155B4D] transition-all cursor-pointer min-h-[30px]"
            title="Switch or view household profile"
          >
            <Users className="w-3.5 h-3.5 stroke-[2.2] shrink-0" />
            <span className="max-w-[110px] sm:max-w-[140px] truncate">
              {isTamil ? household.nameTa || household.name : household.name}
            </span>
            <span className="text-[10px] bg-[#E8F3EB] text-[#155B4D] px-1.5 py-0.2 rounded-full font-bold">
              {household.members.length}
            </span>
            <ChevronDown className="w-3 h-3 stroke-[2.5] text-[#55645E]" />
          </button>

          {/* Language Switcher Pill */}
          <button
            onClick={onOpenLanguage}
            type="button"
            aria-label="Change language"
            className="flex items-center gap-1 px-2.5 py-1 bg-white hover:bg-[#F4EFE2] active:scale-95 border border-[#DCD5C6] rounded-full shadow-2xs text-[11.5px] font-bold text-[#202820] cursor-pointer min-h-[30px]"
          >
            <span className="text-[10.5px] font-medium">文A</span>
            <span className={isTamil ? 'font-tamil' : ''}>{isTamil ? 'தமிழ்' : 'Eng'}</span>
          </button>

          {/* Notification Bell */}
          <button
            onClick={() => setIsNotificationDrawerOpen(true)}
            type="button"
            aria-label="Notifications"
            className="relative w-8 h-8 rounded-full flex items-center justify-center text-[#155B4D] hover:bg-black/5 active:scale-90 transition-all cursor-pointer"
          >
            <Bell className="w-4.5 h-4.5 stroke-[2.2]" />
            {notifications.filter((n) => !n.read).length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#F4C746] rounded-full ring-2 ring-[#FAF7EF]" />
            )}
          </button>
        </div>
      </header>

      {/* Household Switcher Dropdown Modal */}
      {isHouseholdSwitcherOpen && (
        <div className="absolute top-14 right-4 z-40 bg-white border border-[#D5DDD7] rounded-[16px] shadow-lg p-3 w-[260px] text-left animate-in fade-in duration-150">
          <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-[#EAE5D9]">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#69756F]">
              {isTamil ? 'செயலில் உள்ள குடும்பம்' : 'Active Household'}
            </span>
            <button
              onClick={() => setIsHouseholdSwitcherOpen(false)}
              className="text-[11px] text-[#55645E] hover:text-black font-semibold"
            >
              ✕
            </button>
          </div>

          <div className="p-2 rounded-[12px] bg-[#E8F3EB] border border-[#CDE1D0] flex items-center justify-between mb-2.5">
            <div>
              <p className="text-[12.5px] font-bold text-[#155B4D] leading-tight">
                {isTamil ? household.nameTa : household.name}
              </p>
              <p className="text-[10.5px] text-[#55645E] mt-0.5">
                {household.members.length} {isTamil ? 'உறுப்பினர்கள்' : 'Members'} • {household.profile.district}
              </p>
            </div>
            <Check className="w-4 h-4 text-[#155B4D] stroke-[3]" />
          </div>

          <button
            type="button"
            onClick={() => {
              setIsHouseholdSwitcherOpen(false);
              onNavigateHousehold();
            }}
            className="w-full py-2 bg-[#FAF7EF] hover:bg-[#EAE5D9] text-[#155B4D] font-bold text-[12px] rounded-[10px] text-center transition-all cursor-pointer border border-[#DDD6C7]"
          >
            {isTamil ? 'குடும்ப விவரங்களை நிர்வகி →' : 'Manage Household Hub →'}
          </button>
        </div>
      )}

      {/* 2. MAIN CONTENT SLOT */}
      <main className="w-full flex-1 flex flex-col justify-start">
        {children}
      </main>

      {/* 3. EXACTLY FOUR BOTTOM NAVIGATION ITEMS */}
      <nav
        className="sticky bottom-0 left-0 right-0 w-full bg-[#FAF7EF]/95 backdrop-blur-md pt-1.5 pb-[max(env(safe-area-inset-bottom),10px)] z-30 select-none border-t border-[#EDE6D8]"
        role="navigation"
        aria-label="Citizen Primary Navigation"
      >
        <div className="grid grid-cols-4 items-center max-w-[420px] mx-auto px-2">
          {/* 1. Home */}
          <div className="flex items-center justify-center">
            <button
              type="button"
              onClick={onNavigateHome}
              className={`w-[78px] py-1.5 rounded-[20px] flex flex-col items-center justify-center transition-all cursor-pointer ${
                activeNav === 'home'
                  ? 'bg-[#FCE8A2] text-[#155B4D] shadow-2xs'
                  : 'text-[#202820] hover:text-[#155B4D]'
              }`}
              aria-current={activeNav === 'home' ? 'page' : undefined}
            >
              <Home className={`w-5 h-5 mb-0.5 ${activeNav === 'home' ? 'fill-[#155B4D] text-[#155B4D]' : 'text-[#202820]'}`} />
              <span className={`font-bold text-[10.5px] leading-tight ${isTamil ? 'font-tamil' : ''}`}>
                {t.navHome}
              </span>
            </button>
          </div>

          {/* 2. Schemes */}
          <div className="flex items-center justify-center">
            <button
              type="button"
              onClick={onNavigateSchemes}
              className={`w-[78px] py-1.5 rounded-[20px] flex flex-col items-center justify-center transition-all cursor-pointer ${
                activeNav === 'schemes'
                  ? 'bg-[#FCE8A2] text-[#155B4D] shadow-2xs'
                  : 'text-[#202820] hover:text-[#155B4D]'
              }`}
              aria-current={activeNav === 'schemes' ? 'page' : undefined}
            >
              <LayoutGrid className="w-5 h-5 mb-0.5 stroke-[2]" />
              <span className={`font-bold text-[10.5px] leading-tight ${isTamil ? 'font-tamil' : ''}`}>
                {t.navSchemes}
              </span>
            </button>
          </div>

          {/* 3. My Results */}
          <div className="flex items-center justify-center">
            <button
              type="button"
              onClick={onNavigateResults}
              className={`w-[78px] py-1.5 rounded-[20px] flex flex-col items-center justify-center transition-all cursor-pointer ${
                activeNav === 'results'
                  ? 'bg-[#FCE8A2] text-[#155B4D] shadow-2xs'
                  : 'text-[#202820] hover:text-[#155B4D]'
              }`}
              aria-current={activeNav === 'results' ? 'page' : undefined}
            >
              <ClipboardCheck className="w-5 h-5 mb-0.5 stroke-[2]" />
              <span className={`font-bold text-[10.5px] leading-tight ${isTamil ? 'font-tamil' : ''}`}>
                {t.navMyResults}
              </span>
            </button>
          </div>

          {/* 4. Account */}
          <div className="flex items-center justify-center">
            <button
              type="button"
              onClick={onNavigateAccount}
              className={`w-[78px] py-1.5 rounded-[20px] flex flex-col items-center justify-center transition-all cursor-pointer ${
                activeNav === 'account'
                  ? 'bg-[#FCE8A2] text-[#155B4D] shadow-2xs'
                  : 'text-[#202820] hover:text-[#155B4D]'
              }`}
              aria-current={activeNav === 'account' ? 'page' : undefined}
            >
              <User className="w-5 h-5 mb-0.5 stroke-[2]" />
              <span className={`font-bold text-[10.5px] leading-tight ${isTamil ? 'font-tamil' : ''}`}>
                {t.navAccount}
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Shared Notification Drawer */}
      <NotificationDrawer
        isOpen={isNotificationDrawerOpen}
        currentLang={currentLang}
        notifications={notifications}
        onMarkAllRead={() => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))}
        onSelectNotification={(id) => setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))}
        onClose={() => setIsNotificationDrawerOpen(false)}
      />
    </div>
  );
};

