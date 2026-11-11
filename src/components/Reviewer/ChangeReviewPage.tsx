import React, { useState } from 'react';
import {
  AlertCircle,
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  Clock,
  ExternalLink,
  FileCheck2,
  FileText,
  Shield,
  ShieldCheck,
  XCircle,
} from 'lucide-react';
import { ChangeRequest, schemeGovernanceService } from '../../services/schemeGovernanceService';
import { Language } from '../../types';
import { NotFoundPage } from '../Common/NotFoundPage';

interface ChangeReviewPageProps {
  requestId: string;
  currentLang: Language;
  onNavigateBack: () => void;
  onNavigateHome: () => void;
}

export const ChangeReviewPage: React.FC<ChangeReviewPageProps> = ({
  requestId,
  currentLang,
  onNavigateBack,
  onNavigateHome,
}) => {
  const isTamil = currentLang === 'ta';

  const initialRequest = schemeGovernanceService.getRequestById(requestId);
  if (!initialRequest) {
    return (
      <NotFoundPage
        currentLang={currentLang}
        title={isTamil ? `கோரிக்கை '${requestId}' காணப்படவில்லை` : `Change Request '${requestId}' Not Found`}
        message={
          isTamil
            ? 'கோரப்பட்ட தணிக்கை அல்லது மதிப்பாய்வு கோரிக்கை எண் பதிவேட்டில் இல்லை. மதிப்பீட்டாளர் வரிசைக்குத் திரும்பவும்.'
            : `The change request ID '${requestId}' does not exist in the review queue.`
        }
        onNavigateHome={onNavigateBack}
      />
    );
  }

  const [request, setRequest] = useState<ChangeRequest>(initialRequest);
  const [reviewerNotes, setReviewerNotes] = useState(request.reviewerNotes || '');
  const [decisionDialog, setDecisionDialog] = useState<'approve' | 'reject' | null>(null);
  const [actionToast, setActionToast] = useState<string | null>(null);

  const handleApprove = () => {
    if (!reviewerNotes.trim()) {
      alert(isTamil ? 'தயவுசெய்து மதிப்பாய்வுக் குறிப்பை உள்ளிடவும்' : 'Please provide review notes before approving.');
      return;
    }
    const updated = schemeGovernanceService.approveRequest(request.id, reviewerNotes);
    setRequest(updated);
    setDecisionDialog(null);
    setActionToast(
      isTamil
        ? 'கோரிக்கை வெற்றிகரமாக அங்கீகரிக்கப்பட்டது! திட்டம் APPROVED நிலையை அடைந்துள்ளது.'
        : 'Request approved! Scheme status is now APPROVED (ready for explicit activation).'
    );
    setTimeout(() => setActionToast(null), 3500);
  };

  const handleReject = () => {
    if (!reviewerNotes.trim()) {
      alert(isTamil ? 'தயவுசெய்து நிராகரிப்புக்கான காரணத்தை உள்ளிடவும்' : 'Please provide the rejection rationale in review notes.');
      return;
    }
    const updated = schemeGovernanceService.rejectRequest(request.id, reviewerNotes);
    setRequest(updated);
    setDecisionDialog(null);
    setActionToast(
      isTamil ? 'கோரிக்கை நிராகரிக்கப்பட்டது; வரைவு நிலைக்கு மாற்றப்பட்டது.' : 'Request rejected; returned to draft status.'
    );
    setTimeout(() => setActionToast(null), 3500);
  };

  return (
    <div className="w-full max-w-[500px] mx-auto px-4 py-3 pb-12 text-left select-none">
      {/* Toast */}
      {actionToast && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-[#1E3A8A] text-white px-4 py-2 rounded-full text-[12px] font-bold shadow-lg animate-in fade-in duration-150">
          {actionToast}
        </div>
      )}

      {/* Top Bar */}
      <section className="flex items-center justify-between mb-3">
        <button
          type="button"
          onClick={onNavigateBack}
          className="flex items-center gap-1.5 text-[#1E3A8A] hover:opacity-85 font-semibold text-[13px] cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 stroke-[2.4]" />
          <span>{isTamil ? 'வரிசைக்குத் திரும்பு' : 'Review Queue'}</span>
        </button>

        <span
          className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
            request.status === 'pending'
              ? 'bg-amber-50 text-amber-800 border border-amber-200'
              : request.status === 'approved'
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              : 'bg-rose-50 text-rose-800 border border-rose-200'
          }`}
        >
          {request.status.toUpperCase()}
        </span>
      </section>

      {/* Request Header Card */}
      <div className="bg-white rounded-[20px] border border-[#E2E8F0] p-4 shadow-2xs mb-4">
        <div className="flex items-center justify-between gap-2 mb-1">
          <span className="text-[11px] font-mono font-bold text-[#1E3A8A] bg-[#EEF2FF] px-2 py-0.5 rounded-full">
            {request.id}
          </span>
          <span className="text-[11px] text-[#64748B] flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>{request.submittedAt}</span>
          </span>
        </div>

        <h1 className="text-[18px] font-bold text-[#1E293B] leading-snug">
          {isTamil ? request.schemeNameTa : request.schemeNameEn}
        </h1>
        <p className="text-[12px] text-[#475569] mt-0.5">
          Submitted by: <strong>{request.submittedBy}</strong>
        </p>

        {/* Version Transition Capsule */}
        <div className="mt-3 p-2.5 bg-[#F8FAFC] rounded-[12px] border border-[#E2E8F0] flex items-center justify-between text-[12px]">
          <div>
            <span className="text-[#64748B] block text-[10.5px]">Current Active Version</span>
            <span className="font-mono font-bold text-[#334155]">{request.previousVersion}</span>
          </div>
          <span className="text-[#94A3B8] font-bold">→</span>
          <div className="text-right">
            <span className="text-[#64748B] block text-[10.5px]">Proposed Version</span>
            <span className="font-mono font-bold text-[#1E3A8A]">{request.proposedVersion}</span>
          </div>
        </div>
      </div>

      {/* Changes Summary Card */}
      <div className="bg-white rounded-[18px] border border-[#E2E8F0] p-4 shadow-2xs mb-4">
        <h3 className="font-bold text-[13.5px] text-[#1E3A8A] mb-1.5">
          {isTamil ? 'மாற்றங்களின் சுருக்கம்' : 'Summary of Proposed Changes'}
        </h3>
        <p className="text-[12.5px] text-[#334155] leading-relaxed">
          {isTamil ? request.summaryTa : request.summaryEn}
        </p>
      </div>

      {/* Rule Diff Viewer */}
      <div className="bg-white rounded-[18px] border border-[#E2E8F0] p-4 shadow-2xs mb-4 space-y-2.5">
        <h3 className="font-bold text-[13.5px] text-[#1E3A8A]">
          {isTamil ? 'விதிமுறை மாற்ற ஒப்பீடு (Diff)' : 'Rule Specification Diff'}
        </h3>

        {request.ruleChanges.map((change, idx) => (
          <div key={idx} className="p-3 bg-[#F8FAFC] rounded-[14px] border border-[#E2E8F0] text-[12px] space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-mono font-bold text-[#1E3A8A]">{change.field}</span>
              <span className="text-[10.5px] text-[#64748B]">{change.ruleId}</span>
            </div>

            <p className="text-[11.5px] text-[#334155]">{change.changeDescriptionEn}</p>

            <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-[11px]">
              <div className="p-1.5 rounded bg-rose-50 border border-rose-200 text-rose-800">
                <span className="block text-[9px] font-bold uppercase text-rose-600">Old</span>
                <span>{String(change.oldValue)}</span>
              </div>
              <div className="p-1.5 rounded bg-emerald-50 border border-emerald-200 text-emerald-800">
                <span className="block text-[9px] font-bold uppercase text-emerald-600">Proposed</span>
                <span>{String(change.newValue)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Citations & Validation Report */}
      <div className="bg-white rounded-[18px] border border-[#E2E8F0] p-4 shadow-2xs mb-4 space-y-3">
        <div>
          <h3 className="font-bold text-[13.5px] text-[#1E3A8A] mb-1">
            {isTamil ? 'அரசாணை ஆதாரங்கள்' : 'Statutory Citations'}
          </h3>
          {request.sources.map((s, idx) => (
            <div key={idx} className="text-[12px] text-[#334155] flex items-center justify-between">
              <span>{s.title}</span>
              <span className="text-[10.5px] text-[#64748B]">Verified: {s.verifiedDate}</span>
            </div>
          ))}
        </div>

        <div className="pt-2 border-t border-[#F1F5F9]">
          <h3 className="font-bold text-[13.5px] text-[#1E3A8A] mb-1">
            {isTamil ? 'சரிபார்ப்பு அறிக்கை' : 'Validation Check'}
          </h3>
          <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-[10px] text-emerald-800 text-[11.5px] flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{request.validationReport.issues.join(' • ')}</span>
          </div>
        </div>
      </div>

      {/* Reviewer Notes & Decision Area */}
      <div className="bg-white rounded-[20px] border border-[#E2E8F0] p-4.5 shadow-2xs space-y-3.5">
        <div>
          <label className="block text-[12.5px] font-bold text-[#1E293B] mb-1">
            {isTamil ? 'மதிப்பீட்டாளர் ஆய்வுக் குறிப்பு *' : 'Independent Reviewer Notes & Rationale *'}
          </label>
          <textarea
            rows={3}
            value={reviewerNotes}
            onChange={(e) => setReviewerNotes(e.target.value)}
            disabled={request.status !== 'pending'}
            placeholder="e.g. Verified against Social Welfare Dept GO 89. Criteria comply with state guidelines."
            className="w-full p-2.5 bg-[#F8FAFC] border border-[#CBD5E1] rounded-[12px] text-[13px] text-[#1E293B] focus:outline-none focus:border-[#1E3A8A]"
          />
        </div>

        {request.status === 'pending' ? (
          <div className="flex items-center gap-2 pt-1">
            <button
              type="button"
              onClick={() => setDecisionDialog('reject')}
              className="flex-1 py-2.5 rounded-[12px] bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-[13px] border border-rose-200 cursor-pointer transition-all flex items-center justify-center gap-1.5"
            >
              <XCircle className="w-4 h-4" />
              <span>{isTamil ? 'நிராகரி' : 'Reject Change'}</span>
            </button>

            <button
              type="button"
              onClick={() => setDecisionDialog('approve')}
              className="flex-1 py-2.5 rounded-[12px] bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[13px] shadow-xs cursor-pointer transition-all flex items-center justify-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isTamil ? 'ஒப்புதல் அளி' : 'Approve Submission'}</span>
            </button>
          </div>
        ) : (
          <div className="p-3 bg-gray-50 border border-gray-200 rounded-[12px] text-[12px] text-gray-700">
            <strong>Decision Recorded:</strong> {request.status.toUpperCase()} by {request.reviewedBy} on {request.reviewedAt}.
          </div>
        )}
      </div>

      {/* Decision Confirmation Dialog */}
      {decisionDialog && (
        <div className="fixed inset-0 z-50 bg-black/45 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-[400px] bg-white rounded-[22px] border border-[#CBD5E1] p-5 shadow-2xl animate-in zoom-in-95 text-left">
            <h3 className="font-bold text-[16px] text-[#1E293B] mb-1">
              {decisionDialog === 'approve'
                ? (isTamil ? 'மாற்றத்தை அங்கீகரிக்க உறுதிசெய்க' : 'Confirm Change Approval')
                : (isTamil ? 'மாற்றத்தை நிராகரிக்க உறுதிசெய்க' : 'Confirm Change Rejection')}
            </h3>

            <p className="text-[12px] text-[#475569] mb-4">
              {decisionDialog === 'approve'
                ? 'Approving marks this scheme as APPROVED. Notice: It will not automatically activate until explicitly made live in the Live Schemes tab.'
                : 'Rejecting returns the rule pack to DRAFT state for the administrator to revise.'}
            </p>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setDecisionDialog(null)}
                className="flex-1 py-2 rounded-[12px] border border-gray-300 text-gray-700 font-bold text-[12px] cursor-pointer"
              >
                {isTamil ? 'ரத்து' : 'Cancel'}
              </button>
              <button
                type="button"
                onClick={decisionDialog === 'approve' ? handleApprove : handleReject}
                className={`flex-1 py-2 rounded-[12px] text-white font-bold text-[12px] cursor-pointer ${
                  decisionDialog === 'approve' ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-rose-600 hover:bg-rose-700'
                }`}
              >
                {decisionDialog === 'approve'
                  ? (isTamil ? 'உறுதி செய்க' : 'Confirm Approve')
                  : (isTamil ? 'நிராகரி' : 'Confirm Reject')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

