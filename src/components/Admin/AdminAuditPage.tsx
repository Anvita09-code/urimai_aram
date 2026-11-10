import React, { useState } from 'react';
import {
  ArrowLeft,
  User,
  Clock,
  CheckCircle2,
  AlertCircle,
  Info,
  FileText,
  Phone,
  Check,
  X,
  ShieldCheck,
  Calendar,
  Building2,
  FileCheck2,
} from 'lucide-react';
import {
  defaultReviewApplications,
  AdminReviewApplication,
} from '../../data/adminData';
import { translations } from '../../data/translations';
import { Language } from '../../types';

interface AdminAuditPageProps {
  currentLang: Language;
  applicationId?: string;
  onNavigateBack: () => void;
  onNavigateHome: () => void;
}

export const AdminAuditPage: React.FC<AdminAuditPageProps> = ({
  currentLang,
  applicationId = 'APP-2026-084721',
  onNavigateBack,
  onNavigateHome,
}) => {
  const t = translations[currentLang];
  const isTamil = currentLang === 'ta';

  // Find or fallback to first application (Ramesh Kumar)
  const [currentApp, setCurrentApp] = useState<AdminReviewApplication>(() => {
    return (
      defaultReviewApplications.find((a) => a.id === applicationId) ||
      defaultReviewApplications[0]
    );
  });

  const [activeTab, setActiveTab] = useState<'details' | 'eligibility' | 'documents' | 'records'>('details');
  const [confirmDialog, setConfirmDialog] = useState<'approve' | 'reject' | null>(null);
  const [decisionNotes, setDecisionNotes] = useState('');
  const [feedbackToast, setFeedbackToast] = useState<string | null>(null);

  const handleConfirmDecision = (decision: 'approved' | 'rejected') => {
    setCurrentApp((prev) => ({
      ...prev,
      status: decision,
      statusLabel: decision === 'approved' ? 'Approved' : 'Rejected',
      statusLabelTa: decision === 'approved' ? 'அங்கீகரிக்கப்பட்டது' : 'நிராகரிக்கப்பட்டது',
    }));
    setConfirmDialog(null);
    setFeedbackToast(
      decision === 'approved'
        ? (isTamil ? 'விண்ணப்பம் வெற்றிகரமாக அங்கீகரிக்கப்பட்டது!' : 'Application approved successfully!')
        : (isTamil ? 'விண்ணப்பம் நிராகரிக்கப்பட்டது.' : 'Application rejected.')
    );
    setTimeout(() => setFeedbackToast(null), 3000);
  };

  return (
    <div className="w-full min-h-screen bg-[#FAF7F3] flex flex-col font-sans select-none antialiased">

      {/* 2. Top Screen Header with Back Arrow and Title */}
      <header className="px-4 pt-4.5 sm:pt-5 pb-2 flex items-center gap-3">
        <button
          type="button"
          onClick={onNavigateBack}
          className="p-1 -ml-1 text-[#145B49] hover:opacity-80 transition-opacity cursor-pointer"
          aria-label="Back to Application Review List"
        >
          <ArrowLeft className="w-6 h-6 stroke-[2.2]" />
        </button>
        <h1
          className={`text-[23px] font-extrabold text-[#145B49] tracking-tight leading-tight ${
            isTamil ? 'font-tamil' : ''
          }`}
        >
          {t.adminDetailTitle}
        </h1>
      </header>

      {/* 3. Main Scrollable Content */}
      <main className="flex-1 px-4 pt-1 pb-8 space-y-3.5 max-w-[440px] mx-auto w-full">
        {/* Toast Feedback */}
        {feedbackToast && (
          <div className="p-3 bg-[#EAF3EA] text-[#145B49] border border-[#D2E4D4] rounded-[14px] text-[12.5px] font-bold text-center flex items-center justify-center gap-2 shadow-sm animate-in fade-in">
            <CheckCircle2 className="w-4 h-4" />
            <span>{feedbackToast}</span>
          </div>
        )}

        {/* Applicant Information Card */}
        <section className="bg-white border border-[#E8EDE8] rounded-[18px] p-3.5 shadow-2xs flex items-center justify-between">
          {/* Left: Avatar & Applicant Details */}
          <div className="flex items-center gap-3 min-w-0 pr-2">
            <div className="w-11 h-11 rounded-[12px] bg-[#EAF3EA] text-[#145B49] flex items-center justify-center shrink-0 border border-[#D5E6D8]">
              <User className="w-5 h-5 stroke-[2]" />
            </div>
            <div className="min-w-0">
              <h2
                className={`text-[15px] font-bold text-[#1F2923] leading-tight truncate ${
                  isTamil ? 'font-tamil' : ''
                }`}
              >
                {isTamil ? currentApp.applicantNameTa : currentApp.applicantName}
              </h2>
              <p className="text-[11px] text-[#6B7280] mt-0.5 truncate font-mono">
                {currentApp.householdId} | {isTamil ? currentApp.relationCategoryTa : currentApp.relationCategory}
              </p>
              <div className="flex items-center gap-1 mt-1 text-[11px] text-[#374151]">
                <Phone className="w-3 h-3 text-[#145B49] shrink-0" />
                <span className="font-mono text-[11px]">{currentApp.phone}</span>
                {currentApp.isVerified && (
                  <CheckCircle2 className="w-3 h-3 text-[#145B49] shrink-0 fill-[#EAF3EA]" />
                )}
              </div>
            </div>
          </div>

          {/* Right: Status Badge */}
          <div className="shrink-0">
            {currentApp.status === 'under_review' ? (
              <span
                className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#FEF3C7] text-[#B45309] whitespace-nowrap ${
                  isTamil ? 'font-tamil' : ''
                }`}
              >
                <Clock className="w-3 h-3 stroke-[2.5]" />
                {isTamil ? currentApp.statusLabelTa : currentApp.statusLabel}
              </span>
            ) : currentApp.status === 'approved' ? (
              <span
                className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#EAF3EA] text-[#145B49] whitespace-nowrap ${
                  isTamil ? 'font-tamil' : ''
                }`}
              >
                <Check className="w-3 h-3 stroke-[2.5]" />
                {isTamil ? currentApp.statusLabelTa : currentApp.statusLabel}
              </span>
            ) : (
              <span
                className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#FEF2F2] text-[#DC2626] whitespace-nowrap ${
                  isTamil ? 'font-tamil' : ''
                }`}
              >
                <X className="w-3 h-3 stroke-[2.5]" />
                {isTamil ? currentApp.statusLabelTa : currentApp.statusLabel}
              </span>
            )}
          </div>
        </section>

        {/* Horizontal Review Tabs (Details, Eligibility, Documents, Records) */}
        <section className="overflow-x-auto no-scrollbar -mx-4 px-4 py-0.5">
          <div className="flex items-center gap-1.5 min-w-max">
            <button
              type="button"
              onClick={() => setActiveTab('details')}
              className={`px-3.5 py-1.5 rounded-full text-[11.5px] font-bold transition-all cursor-pointer ${
                activeTab === 'details'
                  ? 'bg-[#145B49] text-white shadow-2xs'
                  : 'bg-white border border-[#D1DDD3] text-[#374151] hover:bg-gray-50'
              } ${isTamil ? 'font-tamil' : ''}`}
            >
              {t.adminTabDetails}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('eligibility')}
              className={`px-3.5 py-1.5 rounded-full text-[11.5px] font-semibold transition-all cursor-pointer ${
                activeTab === 'eligibility'
                  ? 'bg-[#145B49] text-white shadow-2xs font-bold'
                  : 'bg-white border border-[#D1DDD3] text-[#374151] hover:bg-gray-50'
              } ${isTamil ? 'font-tamil' : ''}`}
            >
              {t.adminTabEligibility}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('documents')}
              className={`px-3.5 py-1.5 rounded-full text-[11.5px] font-semibold transition-all cursor-pointer ${
                activeTab === 'documents'
                  ? 'bg-[#145B49] text-white shadow-2xs font-bold'
                  : 'bg-white border border-[#D1DDD3] text-[#374151] hover:bg-gray-50'
              } ${isTamil ? 'font-tamil' : ''}`}
            >
              {t.adminTabDocuments}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('records')}
              className={`px-3.5 py-1.5 rounded-full text-[11.5px] font-semibold transition-all cursor-pointer ${
                activeTab === 'records'
                  ? 'bg-[#145B49] text-white shadow-2xs font-bold'
                  : 'bg-white border border-[#D1DDD3] text-[#374151] hover:bg-gray-50'
              } ${isTamil ? 'font-tamil' : ''}`}
            >
              {t.adminTabRecords}
            </button>
          </div>
        </section>

        {/* Application Information Card (விண்ணப்ப விவரங்கள்) */}
        {activeTab === 'details' && (
          <section className="bg-white border border-[#E8EDE8] rounded-[18px] p-3.5 shadow-2xs space-y-2.5">
            <div className="flex items-center gap-2 mb-1">
              <FileText className="w-4.5 h-4.5 text-[#145B49]" />
              <h3
                className={`text-[14px] font-bold text-[#145B49] ${
                  isTamil ? 'font-tamil' : ''
                }`}
              >
                {t.adminAppInfoHeading}
              </h3>
            </div>

            <div className="divide-y divide-[#F0F4F0] text-[12px]">
              {/* Scheme */}
              <div className="py-2 flex items-center justify-between gap-2">
                <span className="text-[#6B7280] font-medium shrink-0">
                  {t.adminLabelScheme}
                </span>
                <span
                  className={`font-semibold text-[#1F2923] text-right truncate ${
                    isTamil ? 'font-tamil' : ''
                  }`}
                >
                  {isTamil ? currentApp.schemeNameTa : currentApp.schemeName}
                </span>
              </div>

              {/* Application ID */}
              <div className="py-2 flex items-center justify-between gap-2">
                <span className="text-[#6B7280] font-medium shrink-0">
                  {t.adminLabelAppId}
                </span>
                <span className="font-mono font-semibold text-[#1F2923] text-right">
                  {currentApp.id}
                </span>
              </div>

              {/* Submission Date */}
              <div className="py-2 flex items-center justify-between gap-2">
                <span className="text-[#6B7280] font-medium shrink-0">
                  {t.adminLabelSubmitDate}
                </span>
                <span className="font-medium text-[#1F2923] text-right">
                  {isTamil ? currentApp.submissionDateTa : currentApp.submissionDate}
                </span>
              </div>

              {/* Source */}
              <div className="py-2 flex items-center justify-between gap-2">
                <span className="text-[#6B7280] font-medium shrink-0">
                  {t.adminLabelSource}
                </span>
                <span
                  className={`font-medium text-[#1F2923] text-right ${
                    isTamil ? 'font-tamil' : ''
                  }`}
                >
                  {isTamil ? currentApp.submittedThroughTa : currentApp.submittedThrough}
                </span>
              </div>

              {/* Status */}
              <div className="py-2 flex items-center justify-between gap-2">
                <span className="text-[#6B7280] font-medium shrink-0">
                  {t.adminLabelStatus}
                </span>
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                    currentApp.status === 'under_review'
                      ? 'bg-[#FEF3C7] text-[#B45309]'
                      : currentApp.status === 'approved'
                      ? 'bg-[#EAF3EA] text-[#145B49]'
                      : 'bg-[#FEF2F2] text-[#DC2626]'
                  } ${isTamil ? 'font-tamil' : ''}`}
                >
                  <Clock className="w-3 h-3 stroke-[2.5]" />
                  {isTamil ? currentApp.statusLabelTa : currentApp.statusLabel}
                </span>
              </div>
            </div>
          </section>
        )}

        {/* Tab 2: Eligibility Tab Content */}
        {activeTab === 'eligibility' && (
          <section className="bg-white border border-[#E8EDE8] rounded-[18px] p-3.5 shadow-2xs space-y-2.5">
            <div className="flex items-center justify-between mb-1">
              <h3 className={`text-[14px] font-bold text-[#145B49] ${isTamil ? 'font-tamil' : ''}`}>
                {isTamil ? 'தகுதி அளவுகோல் சரிபார்ப்பு' : 'Eligibility Criteria Assessment'}
              </h3>
              <span className="text-[12px] font-black text-[#145B49] bg-[#EAF3EA] px-2 py-0.5 rounded-full">
                {currentApp.eligibilityScore}% {isTamil ? 'பொருத்தம்' : 'Match'}
              </span>
            </div>
            <div className="space-y-2 text-[12px] text-[#374151]">
              <div className="flex items-start gap-2 p-2 rounded-[10px] bg-[#FAF7F3] border border-[#E8EDE8]">
                <CheckCircle2 className="w-4 h-4 text-[#145B49] shrink-0 mt-0.5" />
                <span>{isTamil ? 'குடும்ப ஆண்டு வருமானம் ₹1,20,000-க்குள் உள்ளது.' : 'Annual income is within ₹1,20,000 ceiling.'}</span>
              </div>
              <div className="flex items-start gap-2 p-2 rounded-[10px] bg-[#FAF7F3] border border-[#E8EDE8]">
                <CheckCircle2 className="w-4 h-4 text-[#145B49] shrink-0 mt-0.5" />
                <span>{isTamil ? 'தமிழ்நாடு குடும்ப அட்டை சரிபார்க்கப்பட்டு குடும்ப உறுப்பினர்கள் இணைக்கப்பட்டுள்ளனர்.' : 'TN Smart Ration Card verified with 4 linked household members.'}</span>
              </div>
              <div className="flex items-start gap-2 p-2 rounded-[10px] bg-[#FAF7F3] border border-[#E8EDE8]">
                <CheckCircle2 className="w-4 h-4 text-[#145B49] shrink-0 mt-0.5" />
                <span>{isTamil ? 'அரசு விதிகளின்படி மருத்துவ காப்பீட்டு வரம்பு ₹5,00,000 வரை அனுமதிக்கப்படுகிறது.' : 'Health coverage entitlement up to ₹5,00,000 per family per annum.'}</span>
              </div>
            </div>
          </section>
        )}

        {/* Tab 3: Documents Tab Content */}
        {activeTab === 'documents' && (
          <section className="bg-white border border-[#E8EDE8] rounded-[18px] p-3.5 shadow-2xs space-y-2.5">
            <h3 className={`text-[14px] font-bold text-[#145B49] ${isTamil ? 'font-tamil' : ''}`}>
              {isTamil ? 'சமர்ப்பிக்கப்பட்ட ஆவணங்கள்' : 'Submitted Verification Documents'}
            </h3>
            <div className="space-y-2">
              {currentApp.documents.map((doc, idx) => (
                <div key={idx} className="p-2.5 rounded-[12px] bg-[#FAF7F3] border border-[#E8EDE8] flex items-center justify-between text-[12px]">
                  <div className="flex items-center gap-2">
                    <FileCheck2 className="w-4 h-4 text-[#145B49]" />
                    <span className="font-semibold text-[#1F2923]">{isTamil ? doc.nameTa : doc.name}</span>
                  </div>
                  <span className={`text-[10.5px] font-bold px-2 py-0.5 rounded-full ${
                    doc.status === 'verified' ? 'bg-[#EAF3EA] text-[#145B49]' : 'bg-[#FEF3C7] text-[#B45309]'
                  }`}>
                    {doc.status === 'verified' ? (isTamil ? 'சரிபார்க்கப்பட்டது' : 'Verified') : (isTamil ? 'நிலுவை' : 'Pending')}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Tab 4: Records / Audit History Content */}
        {activeTab === 'records' && (
          <section className="bg-white border border-[#E8EDE8] rounded-[18px] p-3.5 shadow-2xs space-y-2.5">
            <h3 className={`text-[14px] font-bold text-[#145B49] ${isTamil ? 'font-tamil' : ''}`}>
              {isTamil ? 'தணிக்கை & செயல்முறை வரலாறு' : 'Audit Trail & Action Log'}
            </h3>
            <div className="space-y-2 text-[11.5px] text-[#374151]">
              <div className="border-l-2 border-[#145B49] pl-2.5 py-1">
                <p className="font-bold text-[#1F2923]">{isTamil ? 'விண்ணப்பம் சமர்ப்பிக்கப்பட்டது' : 'Application Submitted'}</p>
                <p className="text-[#6B7280] text-[10.5px]">28 Oct 2026, 11:30 AM • e-Sevai Centre #14</p>
              </div>
              <div className="border-l-2 border-[#D97706] pl-2.5 py-1">
                <p className="font-bold text-[#1F2923]">{isTamil ? 'ஆவண சரிபார்ப்பு தொடங்கியது' : 'Document Verification Initiated'}</p>
                <p className="text-[#6B7280] text-[10.5px]">28 Oct 2026, 02:15 PM • Sub-Collector Office</p>
              </div>
              <div className="border-l-2 border-[#145B49] pl-2.5 py-1">
                <p className="font-bold text-[#1F2923]">{isTamil ? 'கள ஆய்வு அறிக்கை பெறப்பட்டது' : 'VAO Inspection Verified'}</p>
                <p className="text-[#6B7280] text-[10.5px]">28 Oct 2026, 04:30 PM • Egmore Taluk</p>
              </div>
            </div>
          </section>
        )}

        {/* Reviewer Observations Section (மதிப்பாய்வுக்கான குறிப்புகள்) */}
        <section className="bg-white border border-[#E8EDE8] rounded-[18px] p-3.5 shadow-2xs space-y-2.5">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-5 h-5 rounded-full bg-[#EAF3EA] text-[#145B49] flex items-center justify-center">
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
            <h3
              className={`text-[14px] font-bold text-[#145B49] ${
                isTamil ? 'font-tamil' : ''
              }`}
            >
              {t.adminNotesHeading}
            </h3>
          </div>

          <div className="space-y-2">
            {/* Observation 1: Check */}
            <div className="flex items-start gap-2.5 p-2 rounded-[12px] bg-[#FAFBF9]">
              <div className="w-5 h-5 rounded-full bg-[#EAF3EA] text-[#145B49] flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
              </div>
              <p
                className={`text-[12px] text-[#374151] leading-relaxed ${
                  isTamil ? 'font-tamil' : ''
                }`}
              >
                {t.adminNote1}
              </p>
            </div>

            {/* Observation 2: Warning */}
            <div className="flex items-start gap-2.5 p-2 rounded-[12px] bg-[#FEFDF9]">
              <div className="w-5 h-5 rounded-full bg-[#FEF3C7] text-[#D97706] flex items-center justify-center shrink-0 mt-0.5">
                <AlertCircle className="w-3.5 h-3.5 stroke-[2.5]" />
              </div>
              <p
                className={`text-[12px] text-[#374151] leading-relaxed ${
                  isTamil ? 'font-tamil' : ''
                }`}
              >
                {t.adminNote2}
              </p>
            </div>

            {/* Observation 3: Info */}
            <div className="flex items-start gap-2.5 p-2 rounded-[12px] bg-[#F9FBFE]">
              <div className="w-5 h-5 rounded-full bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center shrink-0 mt-0.5">
                <Info className="w-3.5 h-3.5 stroke-[2.5]" />
              </div>
              <p
                className={`text-[12px] text-[#374151] leading-relaxed ${
                  isTamil ? 'font-tamil' : ''
                }`}
              >
                {t.adminNote3}
              </p>
            </div>
          </div>
        </section>

        {/* Bottom Review Actions (Two large buttons: நிராகரி & அங்கீகரி) */}
        <section className="pt-2">
          <div className="grid grid-cols-2 gap-3">
            {/* Left Button: Reject (Red Outlined) */}
            <button
              type="button"
              onClick={() => setConfirmDialog('reject')}
              className="py-2.5 px-3 rounded-[14px] border-[1.5px] border-[#DC2626] bg-white text-[#DC2626] font-bold text-[13.5px] flex items-center justify-center gap-1.5 hover:bg-[#FEF2F2] active:scale-98 transition-all cursor-pointer shadow-2xs"
            >
              <X className="w-4.5 h-4.5 stroke-[2.5]" />
              <span className={isTamil ? 'font-tamil' : ''}>{t.adminBtnReject}</span>
            </button>

            {/* Right Button: Approve (Solid Dark Green) */}
            <button
              type="button"
              onClick={() => setConfirmDialog('approve')}
              className="py-2.5 px-3 rounded-[14px] bg-[#145B49] hover:bg-[#0E4839] text-white font-bold text-[13.5px] flex items-center justify-center gap-1.5 active:scale-98 transition-all cursor-pointer shadow-xs"
            >
              <Check className="w-4.5 h-4.5 stroke-[2.5]" />
              <span className={isTamil ? 'font-tamil' : ''}>{t.adminBtnApprove}</span>
            </button>
          </div>
        </section>
      </main>

      {/* Confirmation Modal for Approve / Reject */}
      {confirmDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-xs">
          <div className="bg-white rounded-[24px] max-w-sm w-full p-5 border border-[#D2E4D4] shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">
            <button
              type="button"
              onClick={() => setConfirmDialog(null)}
              className="absolute top-4 right-4 p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-3">
              <div
                className={`w-11 h-11 rounded-[14px] flex items-center justify-center ${
                  confirmDialog === 'approve'
                    ? 'bg-[#EAF3EA] text-[#145B49]'
                    : 'bg-[#FEF2F2] text-[#DC2626]'
                }`}
              >
                {confirmDialog === 'approve' ? (
                  <CheckCircle2 className="w-6 h-6 stroke-[2]" />
                ) : (
                  <AlertCircle className="w-6 h-6 stroke-[2]" />
                )}
              </div>
              <div>
                <h3 className={`text-[16px] font-bold text-[#1F2923] ${isTamil ? 'font-tamil' : ''}`}>
                  {confirmDialog === 'approve' ? t.adminConfirmApproveTitle : t.adminConfirmRejectTitle}
                </h3>
                <p className="text-[11px] text-[#6B7280] font-mono">
                  {currentApp.id}
                </p>
              </div>
            </div>

            <p className={`text-[12px] text-[#55645E] mb-3 leading-relaxed ${isTamil ? 'font-tamil' : ''}`}>
              {confirmDialog === 'approve' ? t.adminConfirmApproveDesc : t.adminConfirmRejectDesc}
            </p>

            <div className="mb-4">
              <label className="block text-[11px] font-semibold text-[#374151] mb-1">
                {isTamil ? 'அதிகாரப்பூர்வ குறிப்புகள் (விரும்பினால்)' : 'Official Audit Notes (Optional)'}
              </label>
              <textarea
                rows={2}
                value={decisionNotes}
                onChange={(e) => setDecisionNotes(e.target.value)}
                placeholder={isTamil ? 'குறிப்புகளை இங்கே பதிவு செய்யவும்...' : 'Enter audit remarks here...'}
                className="w-full p-2 border border-[#D1DDD3] rounded-[10px] text-[12px] focus:outline-none focus:border-[#145B49]"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setConfirmDialog(null)}
                className="py-2.5 border border-[#D1DDD3] text-[#374151] rounded-[12px] font-bold text-[12.5px] hover:bg-gray-50 cursor-pointer"
              >
                {isTamil ? 'ரத்து' : 'Cancel'}
              </button>
              <button
                type="button"
                onClick={() => handleConfirmDecision(confirmDialog === 'approve' ? 'approved' : 'rejected')}
                className={`py-2.5 rounded-[12px] text-white font-bold text-[12.5px] cursor-pointer shadow-xs ${
                  confirmDialog === 'approve'
                    ? 'bg-[#145B49] hover:bg-[#0E4839]'
                    : 'bg-[#DC2626] hover:bg-[#B91C1C]'
                }`}
              >
                {confirmDialog === 'approve' ? t.adminBtnApprove : t.adminBtnReject}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
