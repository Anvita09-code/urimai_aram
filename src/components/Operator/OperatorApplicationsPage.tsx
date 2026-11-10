import React, { useState, useMemo } from 'react';
import {
  ArrowLeft,
  Search,
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  Clock,
  XCircle,
  Hourglass,
  User,
  X,
  Phone,
  FileText,
  Calendar,
  Check,
  Printer,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';
import { DashboardHeader } from '../Dashboard/DashboardHeader';
import { OperatorBottomNav } from './OperatorBottomNav';
import {
  defaultApplicationRecords,
  OperatorApplicationRecord,
} from '../../data/operatorData';
import { translations } from '../../data/translations';
import { Language } from '../../types';

interface OperatorApplicationsPageProps {
  currentLang: Language;
  onOpenLanguage: () => void;
  onNavigateBack: () => void;
  onNavigateHome: () => void;
}

export const OperatorApplicationsPage: React.FC<OperatorApplicationsPageProps> = ({
  currentLang,
  onOpenLanguage,
  onNavigateBack,
  onNavigateHome,
}) => {
  const t = translations[currentLang];
  const isTamil = currentLang === 'ta';

  // State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSchemeFilter, setSelectedSchemeFilter] = useState<'all' | 'cmchis' | 'farmer' | 'pudhumai' | 'housing'>('all');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<'all' | 'completed' | 'processing' | 'pending' | 'rejected'>('all');
  const [activeTab, setActiveTab] = useState<'all' | 'action' | 'pending' | 'rejected' | 'completed'>('all');

  const [applications, setApplications] = useState<OperatorApplicationRecord[]>(defaultApplicationRecords);
  const [selectedApplication, setSelectedApplication] = useState<OperatorApplicationRecord | null>(null);
  const [statusChangeSuccess, setStatusChangeSuccess] = useState<string | null>(null);

  // Scheme dropdown options
  const schemeOptions = [
    { id: 'all', labelEn: 'All Schemes', labelTa: 'அனைத்து திட்டங்கள்' },
    { id: 'cmchis', labelEn: 'CMCHIS Health Insurance', labelTa: 'CMCHIS – சுகாதார காப்பீடு' },
    { id: 'farmer', labelEn: "Farmer Welfare Scheme", labelTa: 'உழவர் நலத் திட்டம்' },
    { id: 'pudhumai', labelEn: 'Pudhumai Penn Scheme', labelTa: 'புதுமைப்பெண் திட்டம்' },
    { id: 'housing', labelEn: 'Housing Scheme', labelTa: 'வீட்டு வசதி திட்டம்' },
  ];

  // Status dropdown options
  const statusOptions = [
    { id: 'all', labelEn: 'All Statuses', labelTa: 'எல்லா நிலைகளும்' },
    { id: 'completed', labelEn: 'Completed (62)', labelTa: 'முடிக்கப்பட்டது (62)' },
    { id: 'processing', labelEn: 'In Progress (41)', labelTa: 'நடவடிக்கை நிலையில் (41)' },
    { id: 'pending', labelEn: 'Pending (24)', labelTa: 'நிலுவை (24)' },
    { id: 'rejected', labelEn: 'Rejected (15)', labelTa: 'நிராகரிப்பு (15)' },
  ];

  // Filtered applications
  const filteredRecords = useMemo(() => {
    return applications.filter((app) => {
      // 1. Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = app.citizenName.toLowerCase().includes(query) || app.citizenNameTa.includes(query);
        const matchesHH = app.householdId.toLowerCase().includes(query);
        const matchesScheme = app.schemeName.toLowerCase().includes(query) || app.schemeNameTa.includes(query);
        if (!matchesName && !matchesHH && !matchesScheme) return false;
      }

      // 2. Scheme dropdown filter
      if (selectedSchemeFilter !== 'all') {
        if (selectedSchemeFilter === 'cmchis' && app.schemeId !== 'cmchis') return false;
        if (selectedSchemeFilter === 'farmer' && app.schemeId !== 'farmer-welfare') return false;
        if (selectedSchemeFilter === 'pudhumai' && app.schemeId !== 'pudhumai-penn') return false;
        if (selectedSchemeFilter === 'housing' && app.schemeId !== 'housing-scheme') return false;
      }

      // 3. Status dropdown filter
      if (selectedStatusFilter !== 'all') {
        if (app.status !== selectedStatusFilter) return false;
      }

      // 4. Horizontal Tab filter
      if (activeTab === 'action' && app.status !== 'processing') return false;
      if (activeTab === 'pending' && app.status !== 'pending') return false;
      if (activeTab === 'rejected' && app.status !== 'rejected') return false;
      if (activeTab === 'completed' && app.status !== 'completed') return false;

      return true;
    });
  }, [applications, searchQuery, selectedSchemeFilter, selectedStatusFilter, activeTab]);

  const handleUpdateStatus = (appId: string, newStatus: 'completed' | 'processing' | 'pending' | 'rejected') => {
    setApplications((prev) =>
      prev.map((app) => {
        if (app.id !== appId) return app;
        const isTamil = currentLang === 'ta';
        let badgeEn = 'Completed';
        let badgeTa = 'முடிந்தது';
        if (newStatus === 'processing') {
          badgeEn = 'In Progress';
          badgeTa = 'நடவடிக்கை நிலையில்';
        } else if (newStatus === 'pending') {
          badgeEn = 'Pending';
          badgeTa = 'நிலுவை';
        } else if (newStatus === 'rejected') {
          badgeEn = 'Rejected';
          badgeTa = 'நிராகரிப்பு';
        }
        return {
          ...app,
          status: newStatus,
          statusBadgeText: badgeEn,
          statusBadgeTextTa: badgeTa,
        };
      })
    );
    setStatusChangeSuccess(isTamil ? 'நிலை வெற்றிகரமாக மாற்றப்பட்டது!' : 'Status updated successfully!');
    setTimeout(() => setStatusChangeSuccess(null), 2000);
  };

  return (
    <div className="w-full min-h-screen bg-[#FAF7F3] flex flex-col font-sans select-none antialiased pt-1">

      {/* 2. Global Header with Urimai Aram Branding & Language Selector */}
      <DashboardHeader
        currentLang={currentLang}
        unreadCount={1}
        onOpenLanguage={onOpenLanguage}
        onOpenNotifications={onNavigateBack}
        onNavigateHome={onNavigateHome}
      />

      {/* 3. Main Content Container */}
      <main className="flex-1 px-4 pt-2.5 pb-6 space-y-3 max-w-[440px] mx-auto w-full">
        {/* Back Navigation Button + Title & Description */}
        <section className="space-y-1">
          <button
            type="button"
            onClick={onNavigateBack}
            className="inline-flex items-center gap-1.5 text-[#145B49] hover:opacity-80 transition-opacity p-0.5 -ml-1 cursor-pointer"
            aria-label="Back to Operator Dashboard"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
          </button>
          <h1
            className={`text-[23px] font-extrabold text-[#145B49] tracking-tight leading-tight ${
              isTamil ? 'font-tamil' : ''
            }`}
          >
            {t.opAppMgmtTitle}
          </h1>
          <p
            className={`text-[11.5px] text-[#55645E] leading-relaxed ${
              isTamil ? 'font-tamil' : ''
            }`}
          >
            {t.opAppMgmtDesc}
          </p>
        </section>

        {/* Search Bar */}
        <section>
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-[#6B7280] absolute left-3.5 pointer-events-none stroke-[2]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.opSearchPlaceholder}
              className={`w-full bg-white border border-[#E0E7E1] rounded-[14px] pl-10 pr-9 py-2.5 text-[12px] text-[#1F2923] placeholder:text-[#9CA3AF] shadow-2xs focus:outline-none focus:border-[#145B49] focus:ring-1 focus:ring-[#145B49]/30 transition-all ${
                isTamil ? 'font-tamil' : ''
              }`}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 p-0.5 text-[#9CA3AF] hover:text-[#4B5563] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </section>

        {/* Filter Dropdowns (2 side-by-side) */}
        <section className="grid grid-cols-2 gap-2">
          {/* Scheme Dropdown */}
          <div className="relative">
            <select
              value={selectedSchemeFilter}
              onChange={(e) => setSelectedSchemeFilter(e.target.value as any)}
              className={`w-full bg-white border border-[#E0E7E1] rounded-[12px] pl-3 pr-7 py-2 text-[11px] font-medium text-[#374151] appearance-none shadow-2xs focus:outline-none focus:border-[#145B49] cursor-pointer ${
                isTamil ? 'font-tamil' : ''
              }`}
            >
              {schemeOptions.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {isTamil ? opt.labelTa : opt.labelEn}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[#6B7280] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Status Dropdown */}
          <div className="relative">
            <select
              value={selectedStatusFilter}
              onChange={(e) => setSelectedStatusFilter(e.target.value as any)}
              className={`w-full bg-white border border-[#E0E7E1] rounded-[12px] pl-3 pr-7 py-2 text-[11px] font-medium text-[#374151] appearance-none shadow-2xs focus:outline-none focus:border-[#145B49] cursor-pointer ${
                isTamil ? 'font-tamil' : ''
              }`}
            >
              {statusOptions.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {isTamil ? opt.labelTa : opt.labelEn}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[#6B7280] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </section>

        {/* Application Statistics Card (Pale Green Card with 4-status columns) */}
        <section className="bg-[#EAF3EA] border border-[#D2E4D4] rounded-[18px] p-3.5 shadow-2xs">
          {/* Header Row: Total Applications & Number 142 */}
          <div className="flex items-baseline justify-between mb-3 border-b border-[#D8E8DA] pb-2.5">
            <span
              className={`text-[13px] font-bold text-[#145B49] ${
                isTamil ? 'font-tamil' : ''
              }`}
            >
              {t.opTotalApplications}
            </span>
            <span className="text-[26px] font-black text-[#145B49] tracking-tight leading-none">
              142
            </span>
          </div>

          {/* 4 Status Columns */}
          <div className="grid grid-cols-4 divide-x divide-[#D2E4D4]/80 text-center">
            {/* Col 1: Completed (62) */}
            <div className="flex flex-col items-center px-1">
              <CheckCircle2 className="w-4 h-4 text-[#145B49] stroke-[2.2] mb-1" />
              <span
                className={`text-[9.5px] font-medium text-[#4B5563] leading-tight min-h-[24px] flex items-center justify-center ${
                  isTamil ? 'font-tamil' : ''
                }`}
              >
                {t.opTabCompleted}
              </span>
              <span className="text-[16px] font-black text-[#145B49] mt-0.5">
                62
              </span>
            </div>

            {/* Col 2: Action / In Progress (41) */}
            <div className="flex flex-col items-center px-1">
              <Hourglass className="w-4 h-4 text-[#D97706] stroke-[2.2] mb-1" />
              <span
                className={`text-[9.5px] font-medium text-[#4B5563] leading-tight min-h-[24px] flex items-center justify-center ${
                  isTamil ? 'font-tamil' : ''
                }`}
              >
                {isTamil ? 'நடவடிக்கை நிலையில்' : 'In Progress'}
              </span>
              <span className="text-[16px] font-black text-[#145B49] mt-0.5">
                41
              </span>
            </div>

            {/* Col 3: Pending (24) */}
            <div className="flex flex-col items-center px-1">
              <Clock className="w-4 h-4 text-[#2563EB] stroke-[2.2] mb-1" />
              <span
                className={`text-[9.5px] font-medium text-[#4B5563] leading-tight min-h-[24px] flex items-center justify-center ${
                  isTamil ? 'font-tamil' : ''
                }`}
              >
                {t.opTabPending}
              </span>
              <span className="text-[16px] font-black text-[#145B49] mt-0.5">
                24
              </span>
            </div>

            {/* Col 4: Rejected (15) */}
            <div className="flex flex-col items-center px-1">
              <XCircle className="w-4 h-4 text-[#DC2626] stroke-[2.2] mb-1" />
              <span
                className={`text-[9.5px] font-medium text-[#4B5563] leading-tight min-h-[24px] flex items-center justify-center ${
                  isTamil ? 'font-tamil' : ''
                }`}
              >
                {t.opTabRejected}
              </span>
              <span className="text-[16px] font-black text-[#145B49] mt-0.5">
                15
              </span>
            </div>
          </div>
        </section>

        {/* Horizontal Status Filter Tabs */}
        <section className="overflow-x-auto no-scrollbar -mx-4 px-4 py-0.5">
          <div className="flex items-center gap-1.5 min-w-max">
            {/* Tab 1: All */}
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-full text-[11.5px] font-bold transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-[#145B49] text-white shadow-2xs'
                  : 'bg-white border border-[#D1DDD3] text-[#374151] hover:bg-gray-50'
              } ${isTamil ? 'font-tamil' : ''}`}
            >
              {isTamil ? 'அனைத்தும் (142)' : 'All (142)'}
            </button>

            {/* Tab 2: Action / Processing */}
            <button
              type="button"
              onClick={() => setActiveTab('action')}
              className={`px-3 py-1.5 rounded-full text-[11.5px] font-semibold transition-all cursor-pointer ${
                activeTab === 'action'
                  ? 'bg-[#145B49] text-white shadow-2xs font-bold'
                  : 'bg-white border border-[#D1DDD3] text-[#374151] hover:bg-gray-50'
              } ${isTamil ? 'font-tamil' : ''}`}
            >
              {isTamil ? 'நடவடிக்கை (41)' : 'Processing (41)'}
            </button>

            {/* Tab 3: Pending */}
            <button
              type="button"
              onClick={() => setActiveTab('pending')}
              className={`px-3 py-1.5 rounded-full text-[11.5px] font-semibold transition-all cursor-pointer ${
                activeTab === 'pending'
                  ? 'bg-[#145B49] text-white shadow-2xs font-bold'
                  : 'bg-white border border-[#D1DDD3] text-[#374151] hover:bg-gray-50'
              } ${isTamil ? 'font-tamil' : ''}`}
            >
              {isTamil ? 'நிலுவை (24)' : 'Pending (24)'}
            </button>

            {/* Tab 4: Rejected */}
            <button
              type="button"
              onClick={() => setActiveTab('rejected')}
              className={`px-3 py-1.5 rounded-full text-[11.5px] font-semibold transition-all cursor-pointer ${
                activeTab === 'rejected'
                  ? 'bg-[#145B49] text-white shadow-2xs font-bold'
                  : 'bg-white border border-[#D1DDD3] text-[#374151] hover:bg-gray-50'
              } ${isTamil ? 'font-tamil' : ''}`}
            >
              {isTamil ? 'நிராகரிப்பு (15)' : 'Rejected (15)'}
            </button>

            {/* Tab 5: Completed */}
            <button
              type="button"
              onClick={() => setActiveTab('completed')}
              className={`px-3 py-1.5 rounded-full text-[11.5px] font-semibold transition-all cursor-pointer ${
                activeTab === 'completed'
                  ? 'bg-[#145B49] text-white shadow-2xs font-bold'
                  : 'bg-white border border-[#D1DDD3] text-[#374151] hover:bg-gray-50'
              } ${isTamil ? 'font-tamil' : ''}`}
            >
              {isTamil ? 'முடிந்தது (62)' : 'Completed (62)'}
            </button>
          </div>
        </section>

        {/* Application Records List (4 records displayed matching reference) */}
        <section className="space-y-2">
          {filteredRecords.length === 0 ? (
            <div className="bg-white rounded-[16px] p-6 text-center border border-[#E8EDE8]">
              <p className="text-[13px] text-[#6B7280]">
                {isTamil ? 'பொருத்தமான விண்ணப்பங்கள் இல்லை.' : 'No applications match your filter criteria.'}
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-[16px] border border-[#E8EDE8] shadow-2xs divide-y divide-[#F0F4F0] overflow-hidden">
              {filteredRecords.map((record) => {
                // Status badge styling
                const isCompleted = record.status === 'completed';
                const isProcessing = record.status === 'processing';
                const isPending = record.status === 'pending';
                const isRejected = record.status === 'rejected';

                return (
                  <div
                    key={record.id}
                    onClick={() => setSelectedApplication(record)}
                    className="p-3.5 flex items-start justify-between hover:bg-[#F9FCFA] transition-colors cursor-pointer group"
                  >
                    {/* Left: Avatar & Info */}
                    <div className="flex items-start gap-2.5 min-w-0 pr-2">
                      <div className="w-10 h-10 rounded-[12px] bg-[#EAF3EA] text-[#145B49] flex items-center justify-center shrink-0 border border-[#D5E6D8] mt-0.5">
                        <User className="w-5 h-5 stroke-[2]" />
                      </div>
                      <div className="min-w-0">
                        {/* Name and HH Number */}
                        <div className="flex items-baseline gap-2">
                          <h3
                            className={`text-[14px] font-bold text-[#1F2923] leading-tight truncate ${
                              isTamil ? 'font-tamil' : ''
                            }`}
                          >
                            {isTamil ? record.citizenNameTa : record.citizenName}
                          </h3>
                        </div>
                        <p className="text-[11px] text-[#6B7280] font-mono leading-none mt-0.5">
                          {record.householdId}
                        </p>

                        {/* Scheme Name */}
                        <p
                          className={`text-[12px] text-[#374151] font-medium leading-snug mt-1 truncate ${
                            isTamil ? 'font-tamil' : ''
                          }`}
                        >
                          {isTamil ? record.schemeNameTa : record.schemeName}
                        </p>

                        {/* Submission Date */}
                        <p className="text-[10.5px] text-[#6B7280] flex items-center gap-1 mt-1 font-sans">
                          <Calendar className="w-3 h-3 text-[#9CA3AF]" />
                          <span>{isTamil ? record.submissionDateTa : record.submissionDate}</span>
                        </p>
                      </div>
                    </div>

                    {/* Right: Badge and Chevron */}
                    <div className="flex items-center gap-1 shrink-0 pt-0.5">
                      {isCompleted && (
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10.5px] font-semibold bg-[#EAF3EA] text-[#145B49] shrink-0 ${
                            isTamil ? 'font-tamil' : ''
                          }`}
                        >
                          <Check className="w-3 h-3 stroke-[2.5]" />
                          {isTamil ? record.statusBadgeTextTa : record.statusBadgeText}
                        </span>
                      )}

                      {isProcessing && (
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10.5px] font-semibold bg-[#FEF3C7] text-[#B45309] shrink-0 ${
                            isTamil ? 'font-tamil' : ''
                          }`}
                        >
                          <Clock className="w-3 h-3 stroke-[2.5]" />
                          {isTamil ? record.statusBadgeTextTa : record.statusBadgeText}
                        </span>
                      )}

                      {isPending && (
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10.5px] font-semibold bg-[#EFF6FF] text-[#1D4ED8] shrink-0 ${
                            isTamil ? 'font-tamil' : ''
                          }`}
                        >
                          <Clock className="w-3 h-3 stroke-[2.5]" />
                          {isTamil ? record.statusBadgeTextTa : record.statusBadgeText}
                        </span>
                      )}

                      {isRejected && (
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10.5px] font-semibold bg-[#FEF2F2] text-[#DC2626] shrink-0 ${
                            isTamil ? 'font-tamil' : ''
                          }`}
                        >
                          <X className="w-3 h-3 stroke-[2.5]" />
                          {isTamil ? record.statusBadgeTextTa : record.statusBadgeText}
                        </span>
                      )}

                      <ChevronRight className="w-4 h-4 text-[#9CA3AF] group-hover:text-[#145B49] transition-colors" />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </main>

      {/* 4. Operator Bottom Navigation (Applications Active) */}
      <OperatorBottomNav
        currentLang={currentLang}
        activeItem="applications"
        tabLayout="applications"
        onNavigateHome={onNavigateHome}
        onNavigateApplications={() => {}}
      />

      {/* Application Detail & Workflow Modal */}
      {selectedApplication && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-xs">
          <div className="bg-white rounded-[24px] max-w-sm w-full p-5 border border-[#D2E4D4] shadow-2xl relative max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-150">
            <button
              type="button"
              onClick={() => setSelectedApplication(null)}
              className="absolute top-4 right-4 p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Applicant Profile Header */}
            <div className="flex items-center gap-3 mb-3">
              <div className="w-11 h-11 rounded-[14px] bg-[#EAF3EA] text-[#145B49] flex items-center justify-center border border-[#D5E6D8] shrink-0">
                <User className="w-6 h-6 stroke-[2]" />
              </div>
              <div className="min-w-0 pr-6">
                <h3 className={`text-[16px] font-bold text-[#1F2923] leading-tight ${isTamil ? 'font-tamil' : ''}`}>
                  {isTamil ? selectedApplication.citizenNameTa : selectedApplication.citizenName}
                </h3>
                <p className="text-[11px] text-[#6B7280] font-mono mt-0.5">
                  ID: {selectedApplication.id} • {selectedApplication.householdId}
                </p>
              </div>
            </div>

            {statusChangeSuccess && (
              <div className="p-2 mb-3 bg-[#EAF3EA] text-[#145B49] rounded-[10px] text-[12px] font-bold text-center flex items-center justify-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>{statusChangeSuccess}</span>
              </div>
            )}

            {/* Scheme & Status Details Box */}
            <div className="bg-[#FAF7F3] rounded-[16px] p-3.5 border border-[#E8EDE8] space-y-2.5 text-[12px] mb-3">
              <div>
                <span className="text-[#6B7280] block text-[10.5px] uppercase tracking-wider font-semibold">
                  {isTamil ? 'விண்ணப்பிக்கப்பட்ட திட்டம்' : 'Applied Scheme'}
                </span>
                <span className="font-bold text-[#145B49] text-[13px] block mt-0.5">
                  {isTamil ? selectedApplication.schemeNameTa : selectedApplication.schemeName}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1 border-t border-[#E8EDE8]">
                <div>
                  <span className="text-[#6B7280] text-[10.5px] block">{isTamil ? 'தேதி' : 'Date'}</span>
                  <span className="font-medium text-[#1F2923]">
                    {isTamil ? selectedApplication.submissionDateTa : selectedApplication.submissionDate}
                  </span>
                </div>
                <div>
                  <span className="text-[#6B7280] text-[10.5px] block">{isTamil ? 'ஆவணங்கள்' : 'Documents'}</span>
                  <span className="font-bold text-[#145B49]">
                    {selectedApplication.documentsVerifiedCount} / {selectedApplication.totalDocumentsCount} {isTamil ? 'சரிபார்க்கப்பட்டது' : 'Verified'}
                  </span>
                </div>
              </div>

              <div className="pt-1 border-t border-[#E8EDE8]">
                <span className="text-[#6B7280] text-[10.5px] block">{isTamil ? 'தொடர்பு & முகவரி' : 'Contact & Address'}</span>
                <p className="font-mono text-[#1F2923] text-[11.5px]">{selectedApplication.contactNumber}</p>
                <p className="text-[#55645E] text-[11px] mt-0.5 leading-snug">
                  {isTamil ? selectedApplication.addressTa : selectedApplication.address}
                </p>
              </div>

              <div className="pt-1 border-t border-[#E8EDE8]">
                <span className="text-[#6B7280] text-[10.5px] block">{isTamil ? 'அதிகாரி குறிப்புகள்' : 'Official Remarks'}</span>
                <p className="text-[#374151] text-[11px] mt-0.5 leading-relaxed bg-white p-2 rounded-[8px] border border-[#E8EDE8]">
                  {isTamil ? selectedApplication.remarksTa : selectedApplication.remarks}
                </p>
              </div>
            </div>

            {/* Operator Actions & Status Switcher */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-[#145B49] block">
                {isTamil ? 'விண்ணப்ப நிலையை மாற்றவும்' : 'Update Application Status'}
              </span>
              <div className="grid grid-cols-2 gap-1.5 text-[11px]">
                <button
                  type="button"
                  onClick={() => handleUpdateStatus(selectedApplication.id, 'completed')}
                  className={`py-1.5 px-2 rounded-[10px] font-semibold border flex items-center justify-center gap-1 cursor-pointer ${
                    selectedApplication.status === 'completed'
                      ? 'bg-[#145B49] text-white border-[#145B49]'
                      : 'border-[#D1DDD3] text-[#145B49] hover:bg-[#EAF3EA]'
                  }`}
                >
                  <Check className="w-3.5 h-3.5" />
                  {isTamil ? 'முடிந்தது' : 'Complete'}
                </button>
                <button
                  type="button"
                  onClick={() => handleUpdateStatus(selectedApplication.id, 'processing')}
                  className={`py-1.5 px-2 rounded-[10px] font-semibold border flex items-center justify-center gap-1 cursor-pointer ${
                    selectedApplication.status === 'processing'
                      ? 'bg-[#D97706] text-white border-[#D97706]'
                      : 'border-[#D1DDD3] text-[#D97706] hover:bg-[#FEF3C7]'
                  }`}
                >
                  <Clock className="w-3.5 h-3.5" />
                  {isTamil ? 'நடவடிக்கை' : 'In Progress'}
                </button>
                <button
                  type="button"
                  onClick={() => handleUpdateStatus(selectedApplication.id, 'pending')}
                  className={`py-1.5 px-2 rounded-[10px] font-semibold border flex items-center justify-center gap-1 cursor-pointer ${
                    selectedApplication.status === 'pending'
                      ? 'bg-[#2563EB] text-white border-[#2563EB]'
                      : 'border-[#D1DDD3] text-[#2563EB] hover:bg-[#EFF6FF]'
                  }`}
                >
                  <Hourglass className="w-3.5 h-3.5" />
                  {isTamil ? 'நிலுவை' : 'Pending'}
                </button>
                <button
                  type="button"
                  onClick={() => handleUpdateStatus(selectedApplication.id, 'rejected')}
                  className={`py-1.5 px-2 rounded-[10px] font-semibold border flex items-center justify-center gap-1 cursor-pointer ${
                    selectedApplication.status === 'rejected'
                      ? 'bg-[#DC2626] text-white border-[#DC2626]'
                      : 'border-[#D1DDD3] text-[#DC2626] hover:bg-[#FEF2F2]'
                  }`}
                >
                  <X className="w-3.5 h-3.5" />
                  {isTamil ? 'நிராகரிப்பு' : 'Reject'}
                </button>
              </div>

              {/* Print Receipt / Contact Citizen */}
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    alert(isTamil ? 'மின்-ரசீது அச்சிட தயார் செய்யப்படுகிறது...' : 'Preparing e-receipt for printing...');
                  }}
                  className="flex-1 py-2 bg-[#FAF7F3] border border-[#D1DDD3] text-[#145B49] rounded-[12px] font-bold text-[11.5px] flex items-center justify-center gap-1.5 hover:bg-[#EAF3EA] cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  {isTamil ? 'ரசீது அச்சிடு' : 'Print Receipt'}
                </button>
                <a
                  href={`tel:${selectedApplication.contactNumber}`}
                  className="flex-1 py-2 bg-[#145B49] text-white rounded-[12px] font-bold text-[11.5px] flex items-center justify-center gap-1.5 hover:bg-[#0E4839] cursor-pointer text-center"
                >
                  <Phone className="w-4 h-4" />
                  {isTamil ? 'அழைக்கவும்' : 'Call'}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
