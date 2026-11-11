import React, { useState } from 'react';
import {
  AlertCircle,
  Building2,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  FileCheck2,
  FileText,
  Filter,
  Layers,
  Plus,
  Radio,
  Search,
  Shield,
  ShieldCheck,
} from 'lucide-react';
import { GovernanceSchemeItem, schemeGovernanceService } from '../../services/schemeGovernanceService';
import { Language } from '../../types';

interface AdminGovernanceDashboardProps {
  currentLang: Language;
  initialTab?: 'schemes' | 'sources';
  onSelectScheme: (schemeId: string) => void;
}

export const AdminGovernanceDashboard: React.FC<AdminGovernanceDashboardProps> = ({
  currentLang,
  initialTab = 'schemes',
  onSelectScheme,
}) => {
  const isTamil = currentLang === 'ta';
  const [activeTab, setActiveTab] = useState<'schemes' | 'sources'>(initialTab);
  const [schemes, setSchemes] = useState(() => schemeGovernanceService.getSchemes());
  const [statusFilter, setStatusFilter] = useState<'all' | 'draft' | 'in_review' | 'approved' | 'active' | 'suspended'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Counts
  const draftCount = schemes.filter((s) => s.status === 'draft').length;
  const inReviewCount = schemes.filter((s) => s.status === 'in_review').length;
  const approvedCount = schemes.filter((s) => s.status === 'approved').length;
  const activeCount = schemes.filter((s) => s.status === 'active').length;
  const suspendedCount = schemes.filter((s) => s.status === 'suspended').length;

  const filteredSchemes = schemes.filter((s) => {
    if (statusFilter !== 'all' && s.status !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = s.nameEn.toLowerCase().includes(q) || s.nameTa.includes(q);
      const matchCat = s.category.toLowerCase().includes(q);
      const matchDept = s.departmentEn.toLowerCase().includes(q);
      if (!matchName && !matchCat && !matchDept) return false;
    }
    return true;
  });

  const getStatusBadge = (status: GovernanceSchemeItem['status']) => {
    switch (status) {
      case 'active':
        return { bg: 'bg-emerald-50 text-emerald-800 border-emerald-200', labelEn: 'Active (Live)', labelTa: 'நேரலை' };
      case 'approved':
        return { bg: 'bg-indigo-50 text-indigo-800 border-indigo-200', labelEn: 'Approved', labelTa: 'ஒப்புதல் பெறப்பட்டது' };
      case 'in_review':
        return { bg: 'bg-amber-50 text-amber-800 border-amber-200', labelEn: 'In Review', labelTa: 'மதிப்பாய்வில்' };
      case 'suspended':
        return { bg: 'bg-rose-50 text-rose-800 border-rose-200', labelEn: 'Suspended', labelTa: 'நிறுத்திவைப்பு' };
      case 'draft':
      default:
        return { bg: 'bg-gray-100 text-gray-700 border-gray-200', labelEn: 'Draft', labelTa: 'வரைவு' };
    }
  };

  return (
    <div className="w-full max-w-[500px] mx-auto px-4 py-3 pb-12 text-left select-none">
      {/* Top Header */}
      <section className="mb-4">
        <div className="flex items-center justify-between">
          <div>
            <h1
              className={`text-[#145B49] font-bold text-[22px] sm:text-[24px] leading-tight ${
                isTamil ? 'font-tamil' : ''
              }`}
            >
              {isTamil ? 'அரசு நலத்திட்டங்கள் மேலாண்மை' : 'Scheme Governance Catalogue'}
            </h1>
            <p className="text-[#59635F] text-[12.5px] mt-0.5">
              {isTamil
                ? 'திட்ட விதிமுறை தொகுப்புகள், ஆதார மேற்கோள்கள் மற்றும் தணிக்கை நிலைகள்.'
                : 'Author rule packs, maintain citations, and submit changes for independent review.'}
            </p>
          </div>
        </div>
      </section>

      {/* Lifecycle Status Metrics Grid */}
      <section className="grid grid-cols-4 gap-1.5 mb-4">
        <button
          type="button"
          onClick={() => setStatusFilter('draft')}
          className={`p-2 rounded-[14px] border text-center transition-all cursor-pointer ${
            statusFilter === 'draft' ? 'bg-gray-200 border-gray-600 ring-1 ring-gray-600' : 'bg-white border-[#E0E6E0]'
          }`}
        >
          <span className="text-[18px] font-bold text-gray-800 block leading-none">{draftCount}</span>
          <span className="text-[10px] font-semibold text-[#59635F] mt-1 block">{isTamil ? 'வரைவு' : 'Draft'}</span>
        </button>

        <button
          type="button"
          onClick={() => setStatusFilter('in_review')}
          className={`p-2 rounded-[14px] border text-center transition-all cursor-pointer ${
            statusFilter === 'in_review' ? 'bg-[#FFF8E6] border-[#A66F00] ring-1 ring-[#A66F00]' : 'bg-white border-[#E0E6E0]'
          }`}
        >
          <span className="text-[18px] font-bold text-[#A66F00] block leading-none">{inReviewCount}</span>
          <span className="text-[10px] font-semibold text-[#59635F] mt-1 block">{isTamil ? 'மதிப்பாய்வு' : 'In Review'}</span>
        </button>

        <button
          type="button"
          onClick={() => setStatusFilter('approved')}
          className={`p-2 rounded-[14px] border text-center transition-all cursor-pointer ${
            statusFilter === 'approved' ? 'bg-indigo-50 border-indigo-700 ring-1 ring-indigo-700' : 'bg-white border-[#E0E6E0]'
          }`}
        >
          <span className="text-[18px] font-bold text-indigo-800 block leading-none">{approvedCount}</span>
          <span className="text-[10px] font-semibold text-[#59635F] mt-1 block">{isTamil ? 'ஒப்புதல்' : 'Approved'}</span>
        </button>

        <button
          type="button"
          onClick={() => setStatusFilter('active')}
          className={`p-2 rounded-[14px] border text-center transition-all cursor-pointer ${
            statusFilter === 'active' ? 'bg-[#E8F3EB] border-[#145B49] ring-1 ring-[#145B49]' : 'bg-white border-[#E0E6E0]'
          }`}
        >
          <span className="text-[18px] font-bold text-[#145B49] block leading-none">{activeCount}</span>
          <span className="text-[10px] font-semibold text-[#59635F] mt-1 block">{isTamil ? 'நேரலை' : 'Active'}</span>
        </button>
      </section>

      {/* Tabs Switcher: Catalogue vs Sources */}
      <div className="w-full grid grid-cols-2 p-1 bg-[#EAE5D9]/70 rounded-[16px] mb-4">
        <button
          type="button"
          onClick={() => setActiveTab('schemes')}
          className={`py-2 rounded-[13px] text-[13px] font-bold transition-all cursor-pointer text-center ${
            activeTab === 'schemes' ? 'bg-white text-[#145B49] shadow-xs' : 'text-[#59635F] hover:text-[#145B49]'
          }`}
        >
          {isTamil ? 'திட்டங்கள் அட்டவணை' : 'Scheme Catalogue'}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('sources')}
          className={`py-2 rounded-[13px] text-[13px] font-bold transition-all cursor-pointer text-center ${
            activeTab === 'sources' ? 'bg-white text-[#145B49] shadow-xs' : 'text-[#59635F] hover:text-[#145B49]'
          }`}
        >
          {isTamil ? 'அரசாணை & ஆதாரங்கள்' : 'Sources Registry'}
        </button>
      </div>

      {/* =========================================================================
          TAB 1: SCHEMES CATALOGUE
         ========================================================================= */}
      {activeTab === 'schemes' && (
        <section className="space-y-3">
          {/* Search bar */}
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-[#69756F] absolute left-3 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isTamil ? 'திட்டம் அல்லது துறை தேடுக...' : 'Search scheme or department...'}
              className="w-full pl-9 pr-3 py-2 bg-white border border-[#CBD5D0] rounded-[14px] text-[13px] text-[#202820] placeholder:text-[#88948D] focus:outline-none focus:border-[#145B49]"
            />
          </div>

          <div className="space-y-2.5">
            {filteredSchemes.map((s) => {
              const badge = getStatusBadge(s.status);
              return (
                <article
                  key={s.schemeId}
                  onClick={() => onSelectScheme(s.schemeId)}
                  className="w-full bg-white hover:bg-[#FDFCF8] rounded-[18px] p-4 border border-[#E0E6E0] shadow-2xs transition-all cursor-pointer group text-left"
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-[11px] font-mono font-bold text-[#145B49] bg-[#E8F3EB] px-2 py-0.5 rounded-full">
                      {s.version}
                    </span>

                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${badge.bg}`}>
                      {isTamil ? badge.labelTa : badge.labelEn}
                    </span>
                  </div>

                  <h3 className="font-bold text-[15px] text-[#202820] group-hover:text-[#145B49] transition-colors leading-snug">
                    {isTamil ? s.nameTa : s.nameEn}
                  </h3>
                  <p className="text-[11.5px] text-[#69756F] mt-0.5 line-clamp-1">
                    {isTamil ? s.departmentTa : s.departmentEn}
                  </p>

                  <div className="mt-3 pt-2.5 border-t border-[#F0EBE0] flex items-center justify-between text-[11.5px]">
                    <span className="text-[#88948D]">
                      {s.rulePack.rules.length} {isTamil ? 'விதிமுறைகள்' : 'Rules'} • {s.validationReport.valid ? '✓ Validated' : '⚠ Issue'}
                    </span>
                    <div className="flex items-center gap-1 font-bold text-[#145B49] group-hover:translate-x-0.5 transition-transform">
                      <span>{isTamil ? 'மேலாண்மை செய்' : 'Manage Workspace'}</span>
                      <ChevronRight className="w-4 h-4 stroke-[2.4]" />
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      )}

      {/* =========================================================================
          TAB 2: SOURCES REGISTRY
         ========================================================================= */}
      {activeTab === 'sources' && (
        <section className="space-y-3">
          <div className="bg-[#FAF7EF] rounded-[16px] p-3.5 border border-[#ECE5D8] text-[12px] text-[#55645E]">
            <p className="font-bold text-[#145B49] text-[13px] mb-1">
              {isTamil ? 'அரசாணை மற்றும் அதிகாரப்பூர்வ தரவுப் பதிவேடு' : 'Official Gazette & Citation Registry'}
            </p>
            <p>
              {isTamil
                ? 'அனைத்து திட்ட விதிமுறைகளும் தமிழக அரசு அரசிதழ் மற்றும் கொள்கை குறிப்புகளுடன் இணைக்கப்பட்டுள்ளன.'
                : 'All platform eligibility criteria are synthesized from verifiable official Government Orders (G.O.) and Department Charters.'}
            </p>
          </div>

          <div className="space-y-2.5">
            {schemes.map((s) => (
              <div
                key={s.schemeId}
                className="bg-white rounded-[16px] border border-[#E0E6E0] p-3.5 shadow-2xs space-y-1.5 text-left"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[13.5px] text-[#145B49]">
                    {isTamil ? s.nameTa : s.nameEn}
                  </span>
                  <span className="text-[10.5px] text-[#88948D]">Verified {s.sourceLastVerified}</span>
                </div>

                <p className="text-[12px] font-semibold text-[#202820]">
                  {s.officialSource}
                </p>

                {s.sourceUrl && (
                  <a
                    href={s.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-[#145B49] hover:underline"
                  >
                    <span>{s.sourceUrl}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

