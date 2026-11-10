import React, { useState, useMemo } from 'react';
import {
  ArrowLeft,
  Search,
  ChevronDown,
  ChevronRight,
  Filter,
  Clock,
  CheckCircle2,
  XCircle,
  User,
  Calendar,
  X,
} from 'lucide-react';
import { DashboardHeader } from '../Dashboard/DashboardHeader';
import { AdminBottomNav } from './AdminBottomNav';
import {
  defaultReviewApplications,
  AdminReviewApplication,
} from '../../data/adminData';
import { translations } from '../../data/translations';
import { Language } from '../../types';

interface AdminReviewPageProps {
  currentLang: Language;
  onOpenLanguage: () => void;
  onNavigateBack: () => void;
  onNavigateHome: () => void;
  onSelectApplication: (id: string) => void;
}

export const AdminReviewPage: React.FC<AdminReviewPageProps> = ({
  currentLang,
  onOpenLanguage,
  onNavigateBack,
  onNavigateHome,
  onSelectApplication,
}) => {
  const t = translations[currentLang];
  const isTamil = currentLang === 'ta';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSchemeFilter, setSelectedSchemeFilter] = useState<'all' | 'cmchis' | 'farmer' | 'pudhumai'>('all');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<'all' | 'under_review' | 'approved' | 'rejected'>('all');
  const [activeChip, setActiveChip] = useState<'review' | 'approved' | 'rejected' | 'all'>('review');

  const [applications] = useState<AdminReviewApplication[]>(defaultReviewApplications);

  const schemeOptions = [
    { id: 'all', labelEn: 'All Schemes', labelTa: 'அனைத்து திட்டங்கள்' },
    { id: 'cmchis', labelEn: 'CMCHIS Health Insurance', labelTa: 'CMCHIS – சுகாதார காப்பீடு' },
    { id: 'farmer', labelEn: "Farmer Welfare Scheme", labelTa: 'உழவர் நலத் திட்டம்' },
    { id: 'pudhumai', labelEn: 'Pudhumai Penn Scheme', labelTa: 'புதுமைப் பெண் திட்டம்' },
  ];

  const statusOptions = [
    { id: 'all', labelEn: 'Under Review', labelTa: 'மதிப்பாய்வு' },
    { id: 'under_review', labelEn: 'Pending (428)', labelTa: 'நிலுவை (428)' },
    { id: 'approved', labelEn: 'Approved (7,326)', labelTa: 'அங்கீகாரம் (7,326)' },
    { id: 'rejected', labelEn: 'Rejected (588)', labelTa: 'நிராகரிப்பு (588)' },
  ];

  const filteredApplications = useMemo(() => {
    return applications.filter((app) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = app.applicantName.toLowerCase().includes(q) || app.applicantNameTa.includes(q);
        const matchesHH = app.householdId.toLowerCase().includes(q);
        const matchesAppId = app.id.toLowerCase().includes(q);
        if (!matchesName && !matchesHH && !matchesAppId) return false;
      }

      if (selectedSchemeFilter !== 'all') {
        if (selectedSchemeFilter === 'cmchis' && app.schemeId !== 'cmchis') return false;
        if (selectedSchemeFilter === 'farmer' && app.schemeId !== 'farmer-welfare') return false;
        if (selectedSchemeFilter === 'pudhumai' && app.schemeId !== 'pudhumai-penn') return false;
      }

      if (activeChip === 'review' && app.status !== 'under_review') return false;
      if (activeChip === 'approved' && app.status !== 'approved') return false;
      if (activeChip === 'rejected' && app.status !== 'rejected') return false;

      return true;
    });
  }, [applications, searchQuery, selectedSchemeFilter, activeChip]);

  return (
    <div className="w-full min-h-screen bg-[#FAF7F3] flex flex-col font-sans select-none antialiased pt-1">

      {/* 2. Global Header with Urimai Aram Branding & Language Selector */}
      <DashboardHeader
        currentLang={currentLang}
        unreadCount={3}
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
            aria-label="Back to Admin Dashboard"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
          </button>
          <h1
            className={`text-[23px] font-extrabold text-[#145B49] tracking-tight leading-tight ${
              isTamil ? 'font-tamil' : ''
            }`}
          >
            {t.adminReviewTitle}
          </h1>
          <p
            className={`text-[11.5px] text-[#55645E] leading-relaxed ${
              isTamil ? 'font-tamil' : ''
            }`}
          >
            {t.adminReviewDesc}
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
              placeholder={t.adminSearchPlaceholder}
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

        {/* Filter Controls (Row with Scheme, Status & Filter Icon) */}
        <section className="flex items-center gap-2">
          {/* Scheme Dropdown */}
          <div className="relative flex-1">
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
          <div className="relative flex-1">
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

          {/* Filter Action Button */}
          <button
            type="button"
            className="w-9 h-9 rounded-[12px] bg-white border border-[#E0E7E1] text-[#145B49] flex items-center justify-center shrink-0 shadow-2xs hover:bg-[#EAF3EA] transition-colors cursor-pointer"
            aria-label="Filter options"
          >
            <Filter className="w-4 h-4 stroke-[2]" />
          </button>
        </section>

        {/* Review Statistics Panel (மதிப்பாய்வுக்காக (428)) */}
        <section className="bg-[#EAF3EA] border border-[#D2E4D4] rounded-[18px] p-3.5 shadow-2xs">
          <h2
            className={`text-[13px] font-bold text-[#145B49] mb-2.5 pb-2 border-b border-[#D8E8DA] ${
              isTamil ? 'font-tamil' : ''
            }`}
          >
            {t.adminReviewForCount}
          </h2>

          {/* 3 Status Columns */}
          <div className="grid grid-cols-3 divide-x divide-[#D2E4D4]/80 text-center">
            {/* Col 1: Pending (428) */}
            <div className="flex flex-col items-center px-1">
              <Clock className="w-4 h-4 text-[#D97706] stroke-[2.2] mb-1" />
              <span
                className={`text-[9.5px] font-medium text-[#4B5563] leading-tight min-h-[20px] flex items-center justify-center ${
                  isTamil ? 'font-tamil' : ''
                }`}
              >
                {t.adminStatPending}
              </span>
              <span className="text-[17px] font-black text-[#145B49] mt-0.5">
                428
              </span>
            </div>

            {/* Col 2: Approved (7,326) */}
            <div className="flex flex-col items-center px-1">
              <CheckCircle2 className="w-4 h-4 text-[#145B49] stroke-[2.2] mb-1" />
              <span
                className={`text-[9.5px] font-medium text-[#4B5563] leading-tight min-h-[20px] flex items-center justify-center ${
                  isTamil ? 'font-tamil' : ''
                }`}
              >
                {t.adminStatApproved}
              </span>
              <span className="text-[17px] font-black text-[#145B49] mt-0.5">
                7,326
              </span>
            </div>

            {/* Col 3: Rejected (588) */}
            <div className="flex flex-col items-center px-1">
              <XCircle className="w-4 h-4 text-[#DC2626] stroke-[2.2] mb-1" />
              <span
                className={`text-[9.5px] font-medium text-[#4B5563] leading-tight min-h-[20px] flex items-center justify-center ${
                  isTamil ? 'font-tamil' : ''
                }`}
              >
                {t.adminStatRejected}
              </span>
              <span className="text-[17px] font-black text-[#145B49] mt-0.5">
                588
              </span>
            </div>
          </div>
        </section>

        {/* Horizontal Status Filter Chips */}
        <section className="overflow-x-auto no-scrollbar -mx-4 px-4 py-0.5">
          <div className="flex items-center gap-1.5 min-w-max">
            <button
              type="button"
              onClick={() => setActiveChip('review')}
              className={`px-3 py-1.5 rounded-full text-[11.5px] font-bold transition-all cursor-pointer ${
                activeChip === 'review'
                  ? 'bg-[#145B49] text-white shadow-2xs'
                  : 'bg-white border border-[#D1DDD3] text-[#374151] hover:bg-gray-50'
              } ${isTamil ? 'font-tamil' : ''}`}
            >
              {t.adminChipReview}
            </button>

            <button
              type="button"
              onClick={() => setActiveChip('approved')}
              className={`px-3 py-1.5 rounded-full text-[11.5px] font-semibold transition-all cursor-pointer ${
                activeChip === 'approved'
                  ? 'bg-[#145B49] text-white shadow-2xs font-bold'
                  : 'bg-white border border-[#D1DDD3] text-[#374151] hover:bg-gray-50'
              } ${isTamil ? 'font-tamil' : ''}`}
            >
              {t.adminChipApproved}
            </button>

            <button
              type="button"
              onClick={() => setActiveChip('rejected')}
              className={`px-3 py-1.5 rounded-full text-[11.5px] font-semibold transition-all cursor-pointer ${
                activeChip === 'rejected'
                  ? 'bg-[#145B49] text-white shadow-2xs font-bold'
                  : 'bg-white border border-[#D1DDD3] text-[#374151] hover:bg-gray-50'
              } ${isTamil ? 'font-tamil' : ''}`}
            >
              {t.adminChipCompleted}
            </button>
          </div>
        </section>

        {/* Application Review List (Ramesh Kumar, Lalitha Devi, Murugesan) */}
        <section className="space-y-2">
          {filteredApplications.length === 0 ? (
            <div className="bg-white rounded-[16px] p-6 text-center border border-[#E8EDE8]">
              <p className="text-[13px] text-[#6B7280]">
                {isTamil ? 'பொருத்தமான விண்ணப்பங்கள் இல்லை.' : 'No applications match your filter criteria.'}
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-[16px] border border-[#E8EDE8] shadow-2xs divide-y divide-[#F0F4F0] overflow-hidden">
              {filteredApplications.map((app) => (
                <div
                  key={app.id}
                  onClick={() => onSelectApplication(app.id)}
                  className="p-3.5 flex items-start justify-between hover:bg-[#F9FCFA] transition-colors cursor-pointer group"
                >
                  {/* Left: Avatar & Info */}
                  <div className="flex items-start gap-2.5 min-w-0 pr-2">
                    <div className="w-10 h-10 rounded-[12px] bg-[#EAF3EA] text-[#145B49] flex items-center justify-center shrink-0 border border-[#D5E6D8] mt-0.5">
                      <User className="w-5 h-5 stroke-[2]" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-baseline gap-2">
                        <h3
                          className={`text-[14px] font-bold text-[#1F2923] leading-tight truncate ${
                            isTamil ? 'font-tamil' : ''
                          }`}
                        >
                          {isTamil ? app.applicantNameTa : app.applicantName}
                        </h3>
                      </div>
                      <p className="text-[11px] text-[#6B7280] font-mono leading-none mt-0.5">
                        {app.householdId}
                      </p>

                      <p
                        className={`text-[12px] text-[#374151] font-medium leading-snug mt-1 truncate ${
                          isTamil ? 'font-tamil' : ''
                        }`}
                      >
                        {isTamil ? app.schemeNameTa : app.schemeName}
                      </p>

                      <p className="text-[10.5px] text-[#6B7280] flex items-center gap-1 mt-1 font-sans">
                        <Calendar className="w-3 h-3 text-[#9CA3AF]" />
                        <span>{isTamil ? app.submissionDateTa : app.submissionDate}</span>
                      </p>
                    </div>
                  </div>

                  {/* Right: Badge and Chevron */}
                  <div className="flex items-center gap-1 shrink-0 pt-0.5">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#FEF3C7] text-[#B45309] shrink-0 whitespace-nowrap ${
                        isTamil ? 'font-tamil' : ''
                      }`}
                    >
                      <Clock className="w-3 h-3 stroke-[2.5]" />
                      {isTamil ? app.statusLabelTa : app.statusLabel}
                    </span>
                    <ChevronRight className="w-4 h-4 text-[#9CA3AF] group-hover:text-[#145B49] transition-colors" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* 4. Bottom Navigation (Review Active) */}
      <AdminBottomNav
        currentLang={currentLang}
        activeItem="review"
        onNavigateHome={onNavigateHome}
        onNavigateReview={() => {}}
        onNavigateRecords={onNavigateBack}
        onNavigateSettings={onNavigateHome}
      />
    </div>
  );
};
