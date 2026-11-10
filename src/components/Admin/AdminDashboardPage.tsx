import React, { useState } from 'react';
import {
  Users,
  FileText,
  Clock,
  CheckCircle2,
  UserPlus,
  ClipboardCheck,
  User,
  Search,
  ChevronDown,
  ChevronRight,
  Info,
  Building2,
  MapPin,
  X,
  Mail,
  ShieldCheck,
} from 'lucide-react';
import { DashboardHeader } from '../Dashboard/DashboardHeader';
import { AdminBottomNav } from './AdminBottomNav';
import { GovernmentBuildingIllustration } from './GovernmentBuildingIllustration';
import {
  defaultAdminProfile,
  defaultAdminStats,
} from '../../data/adminData';
import { translations } from '../../data/translations';
import { Language } from '../../types';

interface AdminDashboardPageProps {
  currentLang: Language;
  onOpenLanguage: () => void;
  onNavigateHome: () => void;
  onNavigateReview: () => void;
  onNavigateSchemeMgmt?: () => void;
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({
  currentLang,
  onOpenLanguage,
  onNavigateHome,
  onNavigateReview,
  onNavigateSchemeMgmt,
}) => {
  const t = translations[currentLang];
  const isTamil = currentLang === 'ta';

  const [adminProfile] = useState(defaultAdminProfile);
  const [stats] = useState(defaultAdminStats);
  const [isAdminDetailOpen, setIsAdminDetailOpen] = useState(false);
  const [activeActionModal, setActiveActionModal] = useState<string | null>(null);

  return (
    <div className="w-full min-h-screen bg-[#FAF7F3] flex flex-col font-sans select-none antialiased pt-1">

      {/* 2. Global Header with Urimai Aram Branding & Language Selector */}
      <DashboardHeader
        currentLang={currentLang}
        unreadCount={3}
        onOpenLanguage={onOpenLanguage}
        onOpenNotifications={() => setIsAdminDetailOpen(true)}
        onNavigateHome={onNavigateHome}
      />

      {/* 3. Main Scrollable Content */}
      <main className="flex-1 px-4 pt-3 pb-6 space-y-3.5 max-w-[440px] mx-auto w-full">
        {/* Administrator Identity Card */}
        <section
          onClick={() => setIsAdminDetailOpen(true)}
          className="bg-[#EAF3EA] border border-[#D2E4D4] rounded-[16px] px-3.5 py-2.5 flex items-center justify-between cursor-pointer hover:bg-[#E2EDE3] transition-colors shadow-2xs"
          role="button"
          tabIndex={0}
          aria-label="Administrator profile information"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-[10px] bg-[#DDECE0] text-[#145B49] flex items-center justify-center shrink-0 border border-[#CDE1D0]">
              <User className="w-5 h-5 stroke-[2]" />
            </div>
            <div>
              <h2
                className={`text-[13.5px] font-bold text-[#145B49] leading-tight ${
                  isTamil ? 'font-tamil' : ''
                }`}
              >
                {t.adminRole}
              </h2>
              <p
                className={`text-[11.5px] text-[#55645E] mt-0.5 font-medium ${
                  isTamil ? 'font-tamil' : ''
                }`}
              >
                {t.adminSub}
              </p>
            </div>
          </div>
          <ChevronDown className="w-4 h-4 text-[#145B49] shrink-0" />
        </section>

        {/* Dashboard Introduction / Hero with Secretariat Building Illustration */}
        <section className="bg-transparent pt-1 pb-1">
          <div className="flex items-center justify-between gap-2">
            <div className="flex-1 pr-1">
              <h1
                className={`text-[21px] font-extrabold text-[#145B49] tracking-tight leading-tight ${
                  isTamil ? 'font-tamil' : ''
                }`}
              >
                {t.adminHeroTitle}
              </h1>
              <p
                className={`text-[11.5px] text-[#55645E] leading-snug mt-1.5 font-normal max-w-[220px] ${
                  isTamil ? 'font-tamil' : ''
                }`}
              >
                {t.adminHeroDesc}
              </p>
            </div>
            {/* Government Secretariat Building Illustration */}
            <div className="w-22 h-20 shrink-0">
              <GovernmentBuildingIllustration className="w-22 h-20" />
            </div>
          </div>
        </section>

        {/* Four Statistics Cards (2x2 Grid) */}
        <section className="grid grid-cols-2 gap-2.5">
          {/* Card 1: Total Users (12,684) */}
          <div className="bg-white rounded-[16px] p-3.5 border border-[#E8EDE8] shadow-2xs flex flex-col justify-between">
            <div className="w-8 h-8 rounded-[10px] bg-[#EAF3EA] text-[#145B49] flex items-center justify-center mb-2">
              <Users className="w-4 h-4 stroke-[2.2]" />
            </div>
            <div className="flex flex-col">
              <span
                className={`text-[11px] text-[#55645E] font-medium leading-tight ${
                  isTamil ? 'font-tamil' : ''
                }`}
              >
                {t.adminTotalUsers}
              </span>
              <span className="text-[22px] font-black text-[#145B49] mt-0.5 leading-none">
                {stats.totalUsers.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Card 2: Total Applications (8,342) */}
          <div className="bg-white rounded-[16px] p-3.5 border border-[#E8EDE8] shadow-2xs flex flex-col justify-between">
            <div className="w-8 h-8 rounded-[10px] bg-[#EAF3EA] text-[#145B49] flex items-center justify-center mb-2">
              <FileText className="w-4 h-4 stroke-[2.2]" />
            </div>
            <div className="flex flex-col">
              <span
                className={`text-[11px] text-[#55645E] font-medium leading-tight ${
                  isTamil ? 'font-tamil' : ''
                }`}
              >
                {t.adminTotalApps}
              </span>
              <span className="text-[22px] font-black text-[#145B49] mt-0.5 leading-none">
                {stats.totalApplications.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Card 3: Under Review (428) */}
          <div className="bg-white rounded-[16px] p-3.5 border border-[#E8EDE8] shadow-2xs flex flex-col justify-between">
            <div className="w-8 h-8 rounded-[10px] bg-[#FEF3C7] text-[#D97706] flex items-center justify-center mb-2">
              <Clock className="w-4 h-4 stroke-[2.2]" />
            </div>
            <div className="flex flex-col">
              <span
                className={`text-[11px] text-[#55645E] font-medium leading-tight ${
                  isTamil ? 'font-tamil' : ''
                }`}
              >
                {t.adminUnderReview}
              </span>
              <span className="text-[22px] font-black text-[#145B49] mt-0.5 leading-none">
                {stats.underReview}
              </span>
            </div>
          </div>

          {/* Card 4: Approved (7,326) */}
          <div className="bg-white rounded-[16px] p-3.5 border border-[#E8EDE8] shadow-2xs flex flex-col justify-between">
            <div className="w-8 h-8 rounded-[10px] bg-[#EAF3EA] text-[#145B49] flex items-center justify-center mb-2">
              <CheckCircle2 className="w-4 h-4 stroke-[2.2]" />
            </div>
            <div className="flex flex-col">
              <span
                className={`text-[11px] text-[#55645E] font-medium leading-tight ${
                  isTamil ? 'font-tamil' : ''
                }`}
              >
                {t.adminApproved}
              </span>
              <span className="text-[22px] font-black text-[#145B49] mt-0.5 leading-none">
                {stats.approved.toLocaleString()}
              </span>
            </div>
          </div>
        </section>

        {/* Administrative Quick Actions (விரைவான நிர்வாக செயல்கள்) */}
        <section className="pt-1">
          <h2
            className={`text-[15px] font-bold text-[#145B49] mb-2.5 ${
              isTamil ? 'font-tamil' : ''
            }`}
          >
            {t.adminQuickActions}
          </h2>
          <div className="grid grid-cols-4 gap-2">
            {/* Action 1: Application Review (Navigates to Screen 2) */}
            <button
              type="button"
              onClick={onNavigateReview}
              className="bg-white rounded-[14px] p-1.5 min-[360px]:p-2 flex flex-col items-center justify-center text-center border border-[#E8EDE8] shadow-2xs hover:border-[#145B49]/40 active:scale-98 transition-all cursor-pointer min-h-[84px] min-[360px]:min-h-[88px]"
            >
              <div className="w-8 h-8 rounded-full bg-[#EAF3EA] text-[#145B49] flex items-center justify-center mb-1 shrink-0">
                <UserPlus className="w-4 h-4 stroke-[2]" />
              </div>
              <span
                className={`text-[9px] min-[360px]:text-[9.5px] min-[390px]:text-[10px] font-semibold text-[#1F2923] leading-tight line-clamp-2 px-0.5 w-full ${
                  isTamil ? 'font-tamil' : ''
                }`}
              >
                {t.adminQaReview}
              </span>
            </button>

            {/* Action 2: Scheme Management */}
            <button
              type="button"
              onClick={() => {
                if (onNavigateSchemeMgmt) {
                  onNavigateSchemeMgmt();
                } else {
                  setActiveActionModal('scheme');
                }
              }}
              className="bg-white rounded-[14px] p-1.5 min-[360px]:p-2 flex flex-col items-center justify-center text-center border border-[#E8EDE8] shadow-2xs hover:border-[#145B49]/40 active:scale-98 transition-all cursor-pointer min-h-[84px] min-[360px]:min-h-[88px]"
            >
              <div className="w-8 h-8 rounded-full bg-[#EAF3EA] text-[#145B49] flex items-center justify-center mb-1 shrink-0">
                <ClipboardCheck className="w-4 h-4 stroke-[2]" />
              </div>
              <span
                className={`text-[9px] min-[360px]:text-[9.5px] min-[390px]:text-[10px] font-semibold text-[#1F2923] leading-tight line-clamp-2 px-0.5 w-full ${
                  isTamil ? 'font-tamil' : ''
                }`}
              >
                {t.adminQaSchemeMgmt}
              </span>
            </button>

            {/* Action 3: User Management */}
            <button
              type="button"
              onClick={() => setActiveActionModal('users')}
              className="bg-white rounded-[14px] p-1.5 min-[360px]:p-2 flex flex-col items-center justify-center text-center border border-[#E8EDE8] shadow-2xs hover:border-[#145B49]/40 active:scale-98 transition-all cursor-pointer min-h-[84px] min-[360px]:min-h-[88px]"
            >
              <div className="w-8 h-8 rounded-full bg-[#EAF3EA] text-[#145B49] flex items-center justify-center mb-1 shrink-0">
                <User className="w-4 h-4 stroke-[2]" />
              </div>
              <span
                className={`text-[9px] min-[360px]:text-[9.5px] min-[390px]:text-[10px] font-semibold text-[#1F2923] leading-tight line-clamp-2 px-0.5 w-full ${
                  isTamil ? 'font-tamil' : ''
                }`}
              >
                {t.adminQaUserMgmt}
              </span>
            </button>

            {/* Action 4: Service Centres */}
            <button
              type="button"
              onClick={() => setActiveActionModal('centres')}
              className="bg-white rounded-[14px] p-1.5 min-[360px]:p-2 flex flex-col items-center justify-center text-center border border-[#E8EDE8] shadow-2xs hover:border-[#145B49]/40 active:scale-98 transition-all cursor-pointer min-h-[84px] min-[360px]:min-h-[88px]"
            >
              <div className="w-8 h-8 rounded-full bg-[#EAF3EA] text-[#145B49] flex items-center justify-center mb-1 shrink-0">
                <Search className="w-4 h-4 stroke-[2]" />
              </div>
              <span
                className={`text-[9px] min-[360px]:text-[9.5px] min-[390px]:text-[10px] font-semibold text-[#1F2923] leading-tight line-clamp-2 px-0.5 w-full ${
                  isTamil ? 'font-tamil' : ''
                }`}
              >
                {t.adminQaCentres}
              </span>
            </button>
          </div>
        </section>

        {/* Pending Notification Panel (இன்றைய கவனம்) */}
        <section>
          <div
            onClick={onNavigateReview}
            className="bg-[#FEF9E7] border border-[#FDE68A] rounded-[16px] p-3 flex items-center justify-between cursor-pointer hover:bg-[#FEF3C7]/90 active:scale-99 transition-all shadow-2xs group"
            role="button"
            tabIndex={0}
            aria-label="Pending applications notification"
          >
            <div className="flex items-center gap-2.5 min-w-0 pr-2">
              <div className="w-8 h-8 rounded-full bg-[#FEF3C7] text-[#D97706] flex items-center justify-center shrink-0 border border-[#FDE68A]">
                <Info className="w-4 h-4 stroke-[2.2]" />
              </div>
              <div className="min-w-0">
                <h3
                  className={`text-[12.5px] font-bold text-[#92400E] leading-tight ${
                    isTamil ? 'font-tamil' : ''
                  }`}
                >
                  {t.adminPendingAlertTitle}
                </h3>
                <p
                  className={`text-[11px] text-[#A16207] leading-snug mt-0.5 font-medium truncate ${
                    isTamil ? 'font-tamil' : ''
                  }`}
                >
                  {t.adminPendingAlertDesc}
                </p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-[#92400E] group-hover:translate-x-0.5 transition-transform shrink-0" />
          </div>
        </section>
      </main>

      {/* 4. Bottom Navigation (Home Active) */}
      <AdminBottomNav
        currentLang={currentLang}
        activeItem="home"
        onNavigateHome={onNavigateHome}
        onNavigateReview={onNavigateReview}
        onNavigateRecords={onNavigateReview}
        onNavigateSettings={() => setIsAdminDetailOpen(true)}
      />

      {/* Modal: Administrator Profile / Department Details */}
      {isAdminDetailOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-[24px] max-w-sm w-full p-5 border border-[#D2E4D4] shadow-xl relative animate-in fade-in zoom-in-95 duration-150">
            <button
              type="button"
              onClick={() => setIsAdminDetailOpen(false)}
              className="absolute top-4 right-4 p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-[14px] bg-[#EAF3EA] text-[#145B49] flex items-center justify-center border border-[#CDE1D0]">
                <Building2 className="w-6 h-6 stroke-[2]" />
              </div>
              <div>
                <h3 className={`text-[16px] font-bold text-[#145B49] ${isTamil ? 'font-tamil' : ''}`}>
                  {isTamil ? adminProfile.departmentTa : adminProfile.department}
                </h3>
                <p className="text-[11px] text-[#6B7280] font-mono">
                  {adminProfile.id} • {t.adminSub}
                </p>
              </div>
            </div>

            <div className="space-y-2.5 text-[12.5px] text-[#374151] border-t border-[#F0F4F0] pt-3">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-[#145B49] shrink-0" />
                <span className="font-semibold">{isTamil ? adminProfile.nameTa : adminProfile.name}</span>
                <span className="text-[#6B7280]">({isTamil ? adminProfile.roleTa : adminProfile.role})</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#145B49] shrink-0" />
                <span className="font-mono text-[11.5px]">{adminProfile.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#145B49] shrink-0" />
                <span>{isTamil ? 'அங்கீகரிக்கப்பட்ட மாநில ஒருங்கிணைப்பாளர்' : 'Authorized State Coordinator'}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsAdminDetailOpen(false)}
              className="mt-5 w-full py-2.5 bg-[#145B49] hover:bg-[#0E4839] text-white font-bold rounded-[14px] text-[13px] transition-colors cursor-pointer"
            >
              {isTamil ? 'சரி' : 'Close'}
            </button>
          </div>
        </div>
      )}

      {/* Modal: Quick Actions Helper */}
      {activeActionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-[24px] max-w-sm w-full p-5 border border-[#D2E4D4] shadow-xl relative animate-in fade-in zoom-in-95 duration-150">
            <button
              type="button"
              onClick={() => setActiveActionModal(null)}
              className="absolute top-4 right-4 p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 mb-3">
              <Building2 className="w-5 h-5 text-[#145B49]" />
              <h3 className={`text-[16px] font-bold text-[#145B49] ${isTamil ? 'font-tamil' : ''}`}>
                {activeActionModal === 'scheme' && t.adminQaSchemeMgmt}
                {activeActionModal === 'users' && t.adminQaUserMgmt}
                {activeActionModal === 'centres' && t.adminQaCentres}
              </h3>
            </div>
            <p className="text-[12px] text-[#55645E] mb-4">
              {activeActionModal === 'scheme' && (isTamil ? '24 அரசு திட்டங்களின் விதிகள் மற்றும் தகுதி வரம்புகளை நிர்வகிக்கவும்.' : 'Manage rules and eligibility criteria for 24 state schemes.')}
              {activeActionModal === 'users' && (isTamil ? '12,684 பதிவு செய்யப்பட்ட குடிமக்களின் சுயவிவர மேற்பார்வை.' : 'Supervise 12,684 registered citizen and household profiles.')}
              {activeActionModal === 'centres' && (isTamil ? '38 மாவட்டங்களில் உள்ள 1,240 இ-சேவை உதவி மையங்களின் செயல்பாட்டு நிலை.' : 'Operational status of 1,240 e-Sevai centres across 38 districts.')}
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setActiveActionModal(null);
                  onNavigateReview();
                }}
                className="flex-1 py-2 bg-[#145B49] text-white rounded-[12px] font-bold text-[12px] hover:bg-[#0E4839] cursor-pointer"
              >
                {t.adminQaReview}
              </button>
              <button
                type="button"
                onClick={() => setActiveActionModal(null)}
                className="px-4 py-2 border border-[#D1DDD3] text-[#374151] rounded-[12px] font-semibold text-[12px] hover:bg-gray-50 cursor-pointer"
              >
                {isTamil ? 'மூடு' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
