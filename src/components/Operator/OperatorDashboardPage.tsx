import React, { useState } from 'react';
import {
  Users,
  FileText,
  CheckCircle2,
  Clock,
  UserPlus,
  ClipboardList,
  Upload,
  Search,
  ChevronDown,
  ChevronRight,
  User,
  X,
  Phone,
  Building2,
  MapPin,
  Calendar,
  Check,
  AlertCircle
} from 'lucide-react';
import { DashboardHeader } from '../Dashboard/DashboardHeader';
import { OperatorBottomNav } from './OperatorBottomNav';
import { OperatorHeroIllustration } from './OperatorHeroIllustration';
import {
  defaultOperatorProfile,
  defaultOperatorStats,
  defaultRecentServiceRecords,
  RecentServiceRecord,
} from '../../data/operatorData';
import { translations } from '../../data/translations';
import { Language } from '../../types';

interface OperatorDashboardPageProps {
  currentLang: Language;
  onOpenLanguage: () => void;
  onNavigateHome: () => void;
  onNavigateApplications: () => void;
  onNavigateSearchSchemes?: () => void;
}

export const OperatorDashboardPage: React.FC<OperatorDashboardPageProps> = ({
  currentLang,
  onOpenLanguage,
  onNavigateHome,
  onNavigateApplications,
  onNavigateSearchSchemes,
}) => {
  const t = translations[currentLang];
  const isTamil = currentLang === 'ta';

  // State
  const [operatorProfile] = useState(defaultOperatorProfile);
  const [stats] = useState(defaultOperatorStats);
  const [recentRecords] = useState<RecentServiceRecord[]>(defaultRecentServiceRecords);
  const [isCentreModalOpen, setIsCentreModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<RecentServiceRecord | null>(null);
  const [quickActionModal, setQuickActionModal] = useState<string | null>(null);

  // New Citizen Register Form state
  const [newCitizenName, setNewCitizenName] = useState('');
  const [newCitizenAadhaar, setNewCitizenAadhaar] = useState('');
  const [newCitizenPhone, setNewCitizenPhone] = useState('');
  const [registerSuccess, setRegisterSuccess] = useState(false);

  const handleRegisterCitizenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCitizenName || !newCitizenPhone) return;
    setRegisterSuccess(true);
    setTimeout(() => {
      setRegisterSuccess(false);
      setQuickActionModal(null);
      setNewCitizenName('');
      setNewCitizenAadhaar('');
      setNewCitizenPhone('');
    }, 1800);
  };

  return (
    <div className="w-full min-h-screen bg-[#FAF7F3] flex flex-col font-sans select-none antialiased pt-1">
      {/* 2. Global Header with Urimai Aram Branding & Language Selector */}
      <DashboardHeader
        currentLang={currentLang}
        unreadCount={1}
        onOpenLanguage={onOpenLanguage}
        onOpenNotifications={() => setIsCentreModalOpen(true)}
        onNavigateHome={onNavigateHome}
      />

      {/* 3. Main Scrollable Content */}
      <main className="flex-1 px-4 pt-3 pb-6 space-y-3.5 max-w-[440px] mx-auto w-full">
        {/* Operator Identity Card */}
        <section
          onClick={() => setIsCentreModalOpen(true)}
          className="bg-[#EAF3EA] border border-[#D2E4D4] rounded-[16px] px-3.5 py-2.5 flex items-center justify-between cursor-pointer hover:bg-[#E2EDE3] transition-colors shadow-2xs"
          role="button"
          tabIndex={0}
          aria-label="Operator assistance centre information"
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
                {isTamil ? operatorProfile.roleTa : operatorProfile.role}
              </h2>
              <p
                className={`text-[11.5px] text-[#55645E] mt-0.5 font-medium ${
                  isTamil ? 'font-tamil' : ''
                }`}
              >
                {isTamil ? operatorProfile.districtTa : `District: ${operatorProfile.district}`}
              </p>
            </div>
          </div>
          <ChevronDown className="w-4 h-4 text-[#145B49] shrink-0" />
        </section>

        {/* Welcome Hero Section with Operator Illustration */}
        <section className="bg-transparent pt-1 pb-1">
          <div className="flex items-center justify-between gap-2">
            <div className="flex-1 pr-1">
              <h1
                className={`text-[21px] font-extrabold text-[#145B49] tracking-tight leading-tight ${
                  isTamil ? 'font-tamil' : ''
                }`}
              >
                {t.operatorWelcome}
              </h1>
              <p
                className={`text-[11.5px] text-[#55645E] leading-snug mt-1.5 font-normal max-w-[230px] ${
                  isTamil ? 'font-tamil' : ''
                }`}
              >
                {t.operatorHeroDesc}
              </p>
            </div>
            {/* Female Operator Illustration */}
            <div className="w-24 h-24 shrink-0">
              <OperatorHeroIllustration className="w-24 h-24" />
            </div>
          </div>
        </section>

        {/* Four Statistics Cards (2x2 Grid) */}
        <section className="grid grid-cols-2 gap-2.5">
          {/* Card 1: Today's Citizens */}
          <div className="bg-white rounded-[16px] p-3.5 border border-[#E8EDE8] shadow-2xs flex flex-col justify-between">
            <div className="w-8 h-8 rounded-[10px] bg-[#EAF3EA] text-[#145B49] flex items-center justify-center mb-2">
              <Users className="w-4 h-4 stroke-[2.2]" />
            </div>
            <div className="flex flex-col">
              <span
                className={`text-[11.5px] text-[#55645E] font-medium leading-tight ${
                  isTamil ? 'font-tamil' : ''
                }`}
              >
                {t.opStatTodayCitizens}
              </span>
              <span className="text-[24px] font-black text-[#145B49] mt-0.5 leading-none">
                {stats.todayCitizens}
              </span>
            </div>
          </div>

          {/* Card 2: Assisted Applications */}
          <div className="bg-white rounded-[16px] p-3.5 border border-[#E8EDE8] shadow-2xs flex flex-col justify-between">
            <div className="w-8 h-8 rounded-[10px] bg-[#EAF3EA] text-[#145B49] flex items-center justify-center mb-2">
              <FileText className="w-4 h-4 stroke-[2.2]" />
            </div>
            <div className="flex flex-col">
              <span
                className={`text-[11.5px] text-[#55645E] font-medium leading-tight ${
                  isTamil ? 'font-tamil' : ''
                }`}
              >
                {t.opStatAssistedApps}
              </span>
              <span className="text-[24px] font-black text-[#145B49] mt-0.5 leading-none">
                {stats.assistedApplications}
              </span>
            </div>
          </div>

          {/* Card 3: Completed Sessions */}
          <div className="bg-white rounded-[16px] p-3.5 border border-[#E8EDE8] shadow-2xs flex flex-col justify-between">
            <div className="w-8 h-8 rounded-[10px] bg-[#EAF3EA] text-[#145B49] flex items-center justify-center mb-2">
              <CheckCircle2 className="w-4 h-4 stroke-[2.2]" />
            </div>
            <div className="flex flex-col">
              <span
                className={`text-[11.5px] text-[#55645E] font-medium leading-tight ${
                  isTamil ? 'font-tamil' : ''
                }`}
              >
                {t.opStatCompletedSessions}
              </span>
              <span className="text-[24px] font-black text-[#145B49] mt-0.5 leading-none">
                {stats.completedSessions}
              </span>
            </div>
          </div>

          {/* Card 4: Active Sessions / Pending */}
          <div className="bg-white rounded-[16px] p-3.5 border border-[#E8EDE8] shadow-2xs flex flex-col justify-between">
            <div className="w-8 h-8 rounded-[10px] bg-[#FEF3C7] text-[#D97706] flex items-center justify-center mb-2">
              <Clock className="w-4 h-4 stroke-[2.2]" />
            </div>
            <div className="flex flex-col">
              <span
                className={`text-[11.5px] text-[#55645E] font-medium leading-tight ${
                  isTamil ? 'font-tamil' : ''
                }`}
              >
                {t.opStatActiveSessions}
              </span>
              <span className="text-[24px] font-black text-[#145B49] mt-0.5 leading-none">
                {stats.activeSessions}
              </span>
            </div>
          </div>
        </section>

        {/* Quick Actions Section (விரைவான செயல்பாடுகள்) */}
        <section className="pt-1">
          <h2
            className={`text-[15px] font-bold text-[#145B49] mb-2.5 ${
              isTamil ? 'font-tamil' : ''
            }`}
          >
            {t.opQuickActions}
          </h2>
          <div className="grid grid-cols-4 gap-2">
            {/* Action 1: Register Citizen */}
            <button
              type="button"
              onClick={() => setQuickActionModal('register')}
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
                {t.opQaRegister}
              </span>
            </button>

            {/* Action 2: Household Assistance */}
            <button
              type="button"
              onClick={() => setQuickActionModal('household')}
              className="bg-white rounded-[14px] p-1.5 min-[360px]:p-2 flex flex-col items-center justify-center text-center border border-[#E8EDE8] shadow-2xs hover:border-[#145B49]/40 active:scale-98 transition-all cursor-pointer min-h-[84px] min-[360px]:min-h-[88px]"
            >
              <div className="w-8 h-8 rounded-full bg-[#EAF3EA] text-[#145B49] flex items-center justify-center mb-1 shrink-0">
                <ClipboardList className="w-4 h-4 stroke-[2]" />
              </div>
              <span
                className={`text-[9px] min-[360px]:text-[9.5px] min-[390px]:text-[10px] font-semibold text-[#1F2923] leading-tight line-clamp-2 px-0.5 w-full ${
                  isTamil ? 'font-tamil' : ''
                }`}
              >
                {t.opQaHousehold}
              </span>
            </button>

            {/* Action 3: Upload Document */}
            <button
              type="button"
              onClick={() => setQuickActionModal('upload')}
              className="bg-white rounded-[14px] p-1.5 min-[360px]:p-2 flex flex-col items-center justify-center text-center border border-[#E8EDE8] shadow-2xs hover:border-[#145B49]/40 active:scale-98 transition-all cursor-pointer min-h-[84px] min-[360px]:min-h-[88px]"
            >
              <div className="w-8 h-8 rounded-full bg-[#EAF3EA] text-[#145B49] flex items-center justify-center mb-1 shrink-0">
                <Upload className="w-4 h-4 stroke-[2]" />
              </div>
              <span
                className={`text-[9px] min-[360px]:text-[9.5px] min-[390px]:text-[10px] font-semibold text-[#1F2923] leading-tight line-clamp-2 px-0.5 w-full ${
                  isTamil ? 'font-tamil' : ''
                }`}
              >
                {t.opQaUpload}
              </span>
            </button>

            {/* Action 4: Search Schemes */}
            <button
              type="button"
              onClick={() => {
                if (onNavigateSearchSchemes) {
                  onNavigateSearchSchemes();
                } else {
                  onNavigateApplications();
                }
              }}
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
                {t.opQaSearch}
              </span>
            </button>
          </div>
        </section>

        {/* Recent Service Records (சமீபத்திய சேவை பதிவுகள்) */}
        <section className="pt-1">
          <div className="flex items-center justify-between mb-2">
            <h2
              className={`text-[15px] font-bold text-[#145B49] ${
                isTamil ? 'font-tamil' : ''
              }`}
            >
              {t.opRecentRecords}
            </h2>
            <button
              type="button"
              onClick={onNavigateApplications}
              className={`text-[11.5px] font-semibold text-[#145B49] hover:underline flex items-center cursor-pointer ${
                isTamil ? 'font-tamil' : ''
              }`}
            >
              {t.opViewAll}
            </button>
          </div>

          {/* Unified White Card for the 3 Service Records */}
          <div className="bg-white rounded-[16px] border border-[#E8EDE8] shadow-2xs divide-y divide-[#F0F4F0] overflow-hidden">
            {recentRecords.map((record) => {
              const isCompleted = record.status === 'completed';
              return (
                <div
                  key={record.id}
                  onClick={() => setSelectedRecord(record)}
                  className="p-3 flex items-center justify-between hover:bg-[#F9FCFA] transition-colors cursor-pointer group"
                >
                  {/* Left: Avatar & Citizen Details */}
                  <div className="flex items-center gap-2.5 min-w-0 pr-2">
                    <div className="w-9 h-9 rounded-[10px] bg-[#EAF3EA] text-[#145B49] flex items-center justify-center shrink-0 border border-[#D5E6D8]">
                      <User className="w-4 h-4 stroke-[2]" />
                    </div>
                    <div className="min-w-0">
                      <p
                        className={`text-[13px] font-bold text-[#1F2923] truncate leading-tight ${
                          isTamil ? 'font-tamil' : ''
                        }`}
                      >
                        {isTamil ? record.citizenNameTa : record.citizenName}
                      </p>
                      <p className="text-[11px] text-[#6B7280] font-mono mt-0.5">
                        {record.householdId}
                      </p>
                    </div>
                  </div>

                  {/* Right: Status Badge, Timestamp and Chevron */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    <div className="flex flex-col items-end">
                      {isCompleted ? (
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10.5px] font-semibold bg-[#EAF3EA] text-[#145B49] ${
                            isTamil ? 'font-tamil' : ''
                          }`}
                        >
                          <Check className="w-3 h-3 stroke-[2.5]" />
                          {isTamil ? 'முடிக்கப்பட்டது' : 'Completed'}
                        </span>
                      ) : (
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10.5px] font-semibold bg-[#FEF3C7] text-[#B45309] ${
                            isTamil ? 'font-tamil' : ''
                          }`}
                        >
                          <Clock className="w-3 h-3 stroke-[2.5]" />
                          {isTamil ? 'நிலுவையில்' : 'Pending'}
                        </span>
                      )}
                      <span className="text-[10px] text-[#6B7280] mt-0.5">
                        {isTamil ? record.timestampTa : record.timestamp}
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#9CA3AF] group-hover:text-[#145B49] transition-colors" />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {/* 4. Operator Bottom Navigation (Home Active) */}
      <OperatorBottomNav
        currentLang={currentLang}
        activeItem="home"
        tabLayout="dashboard"
        onNavigateHome={onNavigateHome}
        onNavigateApplications={onNavigateApplications}
        onNavigateCitizens={() => setQuickActionModal('register')}
        onNavigateProfile={() => setIsCentreModalOpen(true)}
      />

      {/* Modal: Operator Centre Details Modal */}
      {isCentreModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-[24px] max-w-sm w-full p-5 border border-[#D2E4D4] shadow-xl relative animate-in fade-in zoom-in-95 duration-150">
            <button
              type="button"
              onClick={() => setIsCentreModalOpen(false)}
              className="absolute top-4 right-4 p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-[14px] bg-[#EAF3EA] text-[#145B49] flex items-center justify-center border border-[#CDE1D0]">
                <Building2 className="w-6 h-6 stroke-[2]" />
              </div>
              <div>
                <h3
                  className={`text-[16px] font-bold text-[#145B49] ${
                    isTamil ? 'font-tamil' : ''
                  }`}
                >
                  {isTamil ? operatorProfile.centerNameTa : operatorProfile.centerName}
                </h3>
                <p className="text-[11px] text-[#6B7280] font-mono">
                  Code: {operatorProfile.centerCode}
                </p>
              </div>
            </div>

            <div className="space-y-2.5 text-[12.5px] text-[#374151] border-t border-[#F0F4F0] pt-3">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-[#145B49] shrink-0" />
                <span className="font-semibold">{isTamil ? operatorProfile.nameTa : operatorProfile.name}</span>
                <span className="text-[#6B7280]">({isTamil ? operatorProfile.roleTa : operatorProfile.role})</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#145B49] shrink-0" />
                <span>
                  {isTamil ? `${operatorProfile.talukTa}, ${operatorProfile.districtTa}` : `${operatorProfile.taluk}, ${operatorProfile.district}`}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#145B49] shrink-0" />
                <span className="font-mono">{operatorProfile.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#145B49] shrink-0" />
                <span>{isTamil ? 'வேலை நேரம்: காலை 09:00 – மாலை 06:00' : 'Hours: 09:00 AM – 06:00 PM'}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsCentreModalOpen(false)}
              className="mt-5 w-full py-2.5 bg-[#145B49] hover:bg-[#0E4839] text-white font-bold rounded-[14px] text-[13px] transition-colors cursor-pointer"
            >
              {isTamil ? 'சரி' : 'Close'}
            </button>
          </div>
        </div>
      )}

      {/* Modal: Service Record Details */}
      {selectedRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-[24px] max-w-sm w-full p-5 border border-[#D2E4D4] shadow-xl relative animate-in fade-in zoom-in-95 duration-150">
            <button
              type="button"
              onClick={() => setSelectedRecord(null)}
              className="absolute top-4 right-4 p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-[12px] bg-[#EAF3EA] text-[#145B49] flex items-center justify-center">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h3 className={`text-[15px] font-bold text-[#1F2923] ${isTamil ? 'font-tamil' : ''}`}>
                  {isTamil ? selectedRecord.citizenNameTa : selectedRecord.citizenName}
                </h3>
                <p className="text-[11px] text-[#6B7280] font-mono">{selectedRecord.householdId}</p>
              </div>
            </div>

            <div className="bg-[#FAF7F3] rounded-[14px] p-3 text-[12px] space-y-2 border border-[#E8EDE8] mb-4">
              <div className="flex justify-between items-center">
                <span className="text-[#6B7280]">{isTamil ? 'திட்டம்:' : 'Scheme:'}</span>
                <span className="font-semibold text-[#145B49] text-right">
                  {isTamil ? selectedRecord.schemeNameTa : selectedRecord.schemeName}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#6B7280]">{isTamil ? 'நிலை:' : 'Status:'}</span>
                <span
                  className={`font-bold px-2 py-0.5 rounded-full text-[11px] ${
                    selectedRecord.status === 'completed'
                      ? 'bg-[#EAF3EA] text-[#145B49]'
                      : 'bg-[#FEF3C7] text-[#B45309]'
                  }`}
                >
                  {isTamil ? selectedRecord.statusLabelTa : selectedRecord.statusLabel}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#6B7280]">{isTamil ? 'நேரம்:' : 'Time:'}</span>
                <span className="font-mono text-[#374151]">
                  {isTamil ? selectedRecord.timestampTa : selectedRecord.timestamp}
                </span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setSelectedRecord(null);
                  onNavigateApplications();
                }}
                className="flex-1 py-2 bg-[#145B49] text-white rounded-[12px] font-bold text-[12px] hover:bg-[#0E4839] cursor-pointer"
              >
                {isTamil ? 'விண்ணப்பங்களை பார்க்க' : 'View in Applications'}
              </button>
              <button
                type="button"
                onClick={() => setSelectedRecord(null)}
                className="px-3 py-2 border border-[#D1DDD3] text-[#374151] rounded-[12px] font-semibold text-[12px] hover:bg-gray-50 cursor-pointer"
              >
                {isTamil ? 'மூடு' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Quick Actions (Register Citizen, Household, Upload) */}
      {quickActionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-[24px] max-w-sm w-full p-5 border border-[#D2E4D4] shadow-xl relative animate-in fade-in zoom-in-95 duration-150">
            <button
              type="button"
              onClick={() => {
                setQuickActionModal(null);
                setRegisterSuccess(false);
              }}
              className="absolute top-4 right-4 p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {quickActionModal === 'register' && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <UserPlus className="w-5 h-5 text-[#145B49]" />
                  <h3 className={`text-[16px] font-bold text-[#145B49] ${isTamil ? 'font-tamil' : ''}`}>
                    {t.opQaRegister}
                  </h3>
                </div>

                {registerSuccess ? (
                  <div className="p-4 bg-[#EAF3EA] text-[#145B49] rounded-[14px] text-center font-bold text-[13px] flex flex-col items-center gap-2">
                    <CheckCircle2 className="w-8 h-8 text-[#145B49]" />
                    <span>{isTamil ? 'பயனர் பதிவு வெற்றிகரமாக முடிந்தது!' : 'Citizen registered successfully!'}</span>
                  </div>
                ) : (
                  <form onSubmit={handleRegisterCitizenSubmit} className="space-y-3">
                    <div>
                      <label className="block text-[11.5px] font-semibold text-[#374151] mb-1">
                        {isTamil ? 'குடிமகன் முழுப் பெயர்' : 'Citizen Full Name'}
                      </label>
                      <input
                        type="text"
                        required
                        value={newCitizenName}
                        onChange={(e) => setNewCitizenName(e.target.value)}
                        placeholder={isTamil ? 'எ.கா: சுப்பிரமணியன் க.' : 'e.g., Subramanian K.'}
                        className="w-full px-3 py-2 border border-[#D1DDD3] rounded-[10px] text-[12.5px] focus:outline-none focus:border-[#145B49]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11.5px] font-semibold text-[#374151] mb-1">
                        {isTamil ? 'ஆதார் எண்' : 'Aadhaar Number'}
                      </label>
                      <input
                        type="text"
                        maxLength={14}
                        value={newCitizenAadhaar}
                        onChange={(e) => setNewCitizenAadhaar(e.target.value)}
                        placeholder="XXXX XXXX XXXX"
                        className="w-full px-3 py-2 border border-[#D1DDD3] rounded-[10px] text-[12.5px] font-mono focus:outline-none focus:border-[#145B49]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11.5px] font-semibold text-[#374151] mb-1">
                        {isTamil ? 'மொபைல் எண்' : 'Mobile Number'}
                      </label>
                      <input
                        type="tel"
                        required
                        value={newCitizenPhone}
                        onChange={(e) => setNewCitizenPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full px-3 py-2 border border-[#D1DDD3] rounded-[10px] text-[12.5px] font-mono focus:outline-none focus:border-[#145B49]"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full mt-2 py-2.5 bg-[#145B49] text-white font-bold rounded-[12px] text-[13px] hover:bg-[#0E4839] cursor-pointer"
                    >
                      {isTamil ? 'பதிவை தொடங்கு' : 'Start Registration'}
                    </button>
                  </form>
                )}
              </div>
            )}

            {quickActionModal === 'household' && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <ClipboardList className="w-5 h-5 text-[#145B49]" />
                  <h3 className={`text-[16px] font-bold text-[#145B49] ${isTamil ? 'font-tamil' : ''}`}>
                    {t.opQaHousehold}
                  </h3>
                </div>
                <p className="text-[12px] text-[#55645E] mb-3">
                  {isTamil
                    ? 'ரேஷன் அட்டை அல்லது குடும்ப ஐடி மூலம் குடும்ப உறுப்பினர்களின் விவரங்களை சரிபார்க்கவும்.'
                    : 'Verify household members and income details using ration card or smart card ID.'}
                </p>
                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder={isTamil ? 'ரேஷன் அட்டை எண் (03/G/...)' : 'Ration Card Number (03/G/...)'}
                    className="w-full px-3 py-2 border border-[#D1DDD3] rounded-[10px] text-[12.5px] focus:outline-none focus:border-[#145B49]"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setQuickActionModal(null);
                      onNavigateApplications();
                    }}
                    className="w-full py-2.5 bg-[#145B49] text-white font-bold rounded-[12px] text-[13px] hover:bg-[#0E4839] cursor-pointer"
                  >
                    {isTamil ? 'குடும்ப விவரங்களை மீட்டெடுக்கவும்' : 'Fetch Household Records'}
                  </button>
                </div>
              </div>
            )}

            {quickActionModal === 'upload' && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Upload className="w-5 h-5 text-[#145B49]" />
                  <h3 className={`text-[16px] font-bold text-[#145B49] ${isTamil ? 'font-tamil' : ''}`}>
                    {t.opQaUpload}
                  </h3>
                </div>
                <p className="text-[12px] text-[#55645E] mb-3">
                  {isTamil
                    ? 'சாதிச் சான்றிதழ், வருமானச் சான்று அல்லது மருத்துவ ஆவணங்களை ஸ்கேன் செய்து பதிவேற்றவும்.'
                    : 'Scan and upload income certificates, community certificates or medical records for citizen application.'}
                </p>
                <div className="border-2 border-dashed border-[#CDE1D0] rounded-[14px] p-4 text-center bg-[#FAF7F3] mb-3">
                  <Upload className="w-8 h-8 text-[#145B49] mx-auto mb-1.5" />
                  <span className="text-[11.5px] text-[#145B49] font-semibold block">
                    {isTamil ? 'ஆவணத்தை தேர்வு செய்யவும் அல்லது இழுத்து விடவும்' : 'Select or drag document here'}
                  </span>
                  <span className="text-[10px] text-[#6B7280]">PDF, JPEG, PNG (Max 5MB)</span>
                </div>
                <button
                  type="button"
                  onClick={() => setQuickActionModal(null)}
                  className="w-full py-2 bg-[#145B49] text-white font-bold rounded-[12px] text-[12.5px] hover:bg-[#0E4839] cursor-pointer"
                >
                  {isTamil ? 'சரி' : 'Done'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
