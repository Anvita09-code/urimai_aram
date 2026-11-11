import React, { useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  Clock,
  ExternalLink,
  FileCheck2,
  History,
  Power,
  Radio,
  RotateCcw,
  Search,
  ShieldAlert,
  XCircle,
} from 'lucide-react';
import {
  AuditLogEntry,
  ChangeRequest,
  GovernanceSchemeItem,
  schemeGovernanceService,
} from '../../services/schemeGovernanceService';
import { Language } from '../../types';

interface ReviewConsolePageProps {
  currentLang: Language;
  initialTab?: 'queue' | 'live' | 'audit';
  onSelectRequest: (requestId: string) => void;
}

export const ReviewConsolePage: React.FC<ReviewConsolePageProps> = ({
  currentLang,
  initialTab = 'queue',
  onSelectRequest,
}) => {
  const isTamil = currentLang === 'ta';
  const [activeTab, setActiveTab] = useState<'queue' | 'live' | 'audit'>(initialTab);
  const [requests, setRequests] = useState(() => schemeGovernanceService.getRequests());
  const [schemes, setSchemes] = useState(() => schemeGovernanceService.getSchemes());
  const [auditLogs, setAuditLogs] = useState(() => schemeGovernanceService.getAuditLogs());
  const [actionToast, setActionToast] = useState<string | null>(null);

  // Modal for Suspend confirmation
  const [suspendingSchemeId, setSuspendingSchemeId] = useState<string | null>(null);
  const [suspendReason, setSuspendReason] = useState('');

  const pendingRequests = requests.filter((r) => r.status === 'pending');
  const liveSchemes = schemes.filter((s) => s.status === 'active' || s.status === 'approved' || s.status === 'suspended');

  const handleActivateApproved = (schemeId: string) => {
    schemeGovernanceService.activateScheme(schemeId);
    setSchemes(schemeGovernanceService.getSchemes());
    setAuditLogs(schemeGovernanceService.getAuditLogs());
    setActionToast(isTamil ? 'திட்டம் நேரலை நிலைக்கு மாற்றப்பட்டது!' : 'Scheme activated to Live status!');
    setTimeout(() => setActionToast(null), 3000);
  };

  const handleConfirmSuspend = () => {
    if (!suspendingSchemeId || !suspendReason.trim()) return;
    schemeGovernanceService.suspendScheme(suspendingSchemeId, suspendReason);
    setSchemes(schemeGovernanceService.getSchemes());
    setAuditLogs(schemeGovernanceService.getAuditLogs());
    setSuspendingSchemeId(null);
    setSuspendReason('');
    setActionToast(isTamil ? 'திட்டம் நிறுத்தி வைக்கப்பட்டது.' : 'Scheme suspended.');
    setTimeout(() => setActionToast(null), 3000);
  };

  const handleReinstate = (schemeId: string) => {
    schemeGovernanceService.reinstateScheme(schemeId);
    setSchemes(schemeGovernanceService.getSchemes());
    setAuditLogs(schemeGovernanceService.getAuditLogs());
    setActionToast(isTamil ? 'திட்டம் மீண்டும் நேரலைக்குக் கொண்டுவரப்பட்டது!' : 'Scheme reinstated to Live status!');
    setTimeout(() => setActionToast(null), 3000);
  };

  return (
    <div className="w-full max-w-[500px] mx-auto px-4 py-3 pb-12 text-left select-none">
      {/* Action Toast */}
      {actionToast && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-[#1E3A8A] text-white px-4 py-2 rounded-full text-[12px] font-bold shadow-lg animate-in fade-in duration-150">
          {actionToast}
        </div>
      )}

      {/* Top Banner */}
      <section className="mb-4">
        <h1
          className={`text-[#1E3A8A] font-bold text-[22px] sm:text-[24px] leading-tight ${
            isTamil ? 'font-tamil' : ''
          }`}
        >
          {isTamil ? 'சுயாதீன மதிப்பீட்டாளர் முனையம்' : 'Independent Review Console'}
        </h1>
        <p className="text-[#59635F] text-[12.5px] mt-0.5">
          {isTamil
            ? 'அரசு நிர்வாகி சமர்ப்பித்த விதிமுறை மாற்றங்களை ஆய்வு செய்து ஒப்புதல் அளித்தல்.'
            : 'Evaluate proposed rule packs, manage scheme lifecycle, and maintain audit transparency.'}
        </p>
      </section>

      {/* Three Primary Views Switcher */}
      <div className="w-full grid grid-cols-3 p-1 bg-[#EEF2FF] rounded-[16px] mb-4">
        <button
          type="button"
          onClick={() => setActiveTab('queue')}
          className={`py-2 rounded-[13px] text-[12px] font-bold transition-all cursor-pointer text-center ${
            activeTab === 'queue' ? 'bg-white text-[#1E3A8A] shadow-xs' : 'text-[#4B5563] hover:text-[#1E3A8A]'
          }`}
        >
          {isTamil ? 'வரிசை' : 'Queue'} ({pendingRequests.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('live')}
          className={`py-2 rounded-[13px] text-[12px] font-bold transition-all cursor-pointer text-center ${
            activeTab === 'live' ? 'bg-white text-[#1E3A8A] shadow-xs' : 'text-[#4B5563] hover:text-[#1E3A8A]'
          }`}
        >
          {isTamil ? 'நேரலை' : 'Live Schemes'} ({liveSchemes.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('audit')}
          className={`py-2 rounded-[13px] text-[12px] font-bold transition-all cursor-pointer text-center ${
            activeTab === 'audit' ? 'bg-white text-[#1E3A8A] shadow-xs' : 'text-[#4B5563] hover:text-[#1E3A8A]'
          }`}
        >
          {isTamil ? 'வரலாறு' : 'Audit Logs'}
        </button>
      </div>

      {/* =========================================================================
          VIEW 1: REVIEW QUEUE
         ========================================================================= */}
      {activeTab === 'queue' && (
        <section className="space-y-3">
          {requests.map((req) => {
            const isPending = req.status === 'pending';
            return (
              <article
                key={req.id}
                onClick={() => onSelectRequest(req.id)}
                className="w-full bg-white hover:bg-[#F8FAFC] rounded-[18px] p-4 border border-[#E2E8F0] shadow-2xs transition-all cursor-pointer group text-left"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-mono font-bold text-[#1E3A8A] bg-[#EEF2FF] px-2 py-0.5 rounded-full">
                    {req.id}
                  </span>

                  <span
                    className={`text-[10.5px] font-bold px-2 py-0.5 rounded-full ${
                      isPending
                        ? 'bg-amber-50 text-amber-800 border border-amber-200'
                        : req.status === 'approved'
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : 'bg-rose-50 text-rose-800 border border-rose-200'
                    }`}
                  >
                    {req.status.toUpperCase()}
                  </span>
                </div>

                <h3 className="font-bold text-[15px] text-[#1E293B] group-hover:text-[#1E3A8A] transition-colors leading-snug">
                  {isTamil ? req.schemeNameTa : req.schemeNameEn}
                </h3>
                <p className="text-[11px] text-[#64748B] mt-0.5">
                  Proposed: <strong>{req.previousVersion} → {req.proposedVersion}</strong> • By {req.submittedBy}
                </p>

                <p className="text-[12px] text-[#334155] bg-[#F8FAFC] p-2.5 rounded-[12px] mt-2 border border-[#E2E8F0] line-clamp-2">
                  {isTamil ? req.summaryTa : req.summaryEn}
                </p>

                <div className="mt-3 pt-2 border-t border-[#F1F5F9] flex items-center justify-between text-[11.5px]">
                  <span className="text-[#94A3B8]">{req.submittedAt}</span>
                  <div className="flex items-center gap-1 font-bold text-[#1E3A8A] group-hover:translate-x-0.5 transition-transform">
                    <span>{isTamil ? 'ஆய்வு செய்' : 'Evaluate Change'}</span>
                    <ChevronRight className="w-4 h-4 stroke-[2.4]" />
                  </div>
                </div>
              </article>
            );
          })}
        </section>
      )}

      {/* =========================================================================
          VIEW 2: LIVE SCHEMES & ACTIVATION/SUSPENSION
         ========================================================================= */}
      {activeTab === 'live' && (
        <section className="space-y-3">
          <div className="bg-[#EEF2FF] rounded-[16px] p-3.5 border border-[#C7D2FE] text-[12px] text-[#1E3A8A]">
            <p className="font-bold text-[13px] mb-0.5">
              {isTamil ? 'நேரலை திட்டங்கள் மற்றும் தனித்த செயல்படுத்தல்' : 'Independent Activation & Suspension Authority'}
            </p>
            <p className="text-[#374151]">
              Reviewers have exclusive statutory authority to activate approved rule packs or suspend live schemes during policy revisions.
            </p>
          </div>

          <div className="space-y-2.5">
            {liveSchemes.map((s) => {
              const isApprovedPendingActivation = s.status === 'approved';
              const isActive = s.status === 'active';
              const isSuspended = s.status === 'suspended';

              return (
                <div
                  key={s.schemeId}
                  className="bg-white rounded-[18px] border border-[#E2E8F0] p-4 shadow-2xs space-y-2 text-left"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[14.5px] text-[#1E293B]">
                      {isTamil ? s.nameTa : s.nameEn}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isActive
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : isApprovedPendingActivation
                          ? 'bg-indigo-50 text-indigo-800 border border-indigo-200'
                          : 'bg-rose-50 text-rose-800 border border-rose-200'
                      }`}
                    >
                      {s.status.toUpperCase()}
                    </span>
                  </div>

                  <p className="text-[11.5px] text-[#64748B]">
                    Version: <strong>{s.version}</strong> • {s.departmentEn}
                  </p>

                  <div className="pt-2 border-t border-[#F1F5F9] flex items-center justify-end gap-2">
                    {/* Explicit Activation Action for Approved Schemes */}
                    {isApprovedPendingActivation && (
                      <button
                        type="button"
                        onClick={() => handleActivateApproved(s.schemeId)}
                        className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full text-[11.5px] font-bold shadow-2xs cursor-pointer flex items-center gap-1"
                      >
                        <Power className="w-3.5 h-3.5" />
                        <span>{isTamil ? 'நேரலை செய் (Activate)' : 'Activate Scheme'}</span>
                      </button>
                    )}

                    {/* Suspension Action for Active Live Schemes */}
                    {isActive && (
                      <button
                        type="button"
                        onClick={() => setSuspendingSchemeId(s.schemeId)}
                        className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-full text-[11.5px] font-bold cursor-pointer flex items-center gap-1"
                      >
                        <ShieldAlert className="w-3.5 h-3.5" />
                        <span>{isTamil ? 'நிறுத்திவை (Suspend)' : 'Suspend Scheme'}</span>
                      </button>
                    )}

                    {/* Reinstatement Action for Suspended Schemes */}
                    {isSuspended && (
                      <button
                        type="button"
                        onClick={() => handleReinstate(s.schemeId)}
                        className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200 rounded-full text-[11.5px] font-bold cursor-pointer flex items-center gap-1"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>{isTamil ? 'மீட்டெடு (Reinstate)' : 'Reinstate Scheme'}</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* =========================================================================
          VIEW 3: AUDIT HISTORY
         ========================================================================= */}
      {activeTab === 'audit' && (
        <section className="space-y-2.5">
          {auditLogs.map((log) => (
            <div
              key={log.id}
              className="bg-white rounded-[16px] border border-[#E2E8F0] p-3.5 shadow-2xs text-[12px] text-left"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-[#1E3A8A] capitalize">
                  [{log.action.toUpperCase()}] {log.schemeName}
                </span>
                <span className="text-[10.5px] text-[#94A3B8]">{log.timestamp}</span>
              </div>
              <p className="text-[#334155] leading-relaxed">{log.details}</p>
              <p className="text-[11px] text-[#64748B] mt-1">Actor: {log.actorName}</p>
            </div>
          ))}
        </section>
      )}

      {/* Suspend Confirmation Modal */}
      {suspendingSchemeId && (
        <div className="fixed inset-0 z-50 bg-black/45 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-[400px] bg-white rounded-[22px] border border-rose-200 p-5 shadow-2xl animate-in zoom-in-95 text-left">
            <div className="flex items-center gap-2 text-rose-700 font-bold text-[16px] mb-2">
              <ShieldAlert className="w-5 h-5" />
              <span>{isTamil ? 'திட்டத்தை நிறுத்திவைக்க உறுதிசெய்க' : 'Confirm Scheme Suspension'}</span>
            </div>

            <p className="text-[12px] text-[#4B5563] mb-3">
              Suspended schemes will immediately cease to be matched in citizen eligibility results until reinstated.
            </p>

            <label className="block text-[11.5px] font-bold text-[#374151] mb-1">
              {isTamil ? 'நிறுத்திவைப்புக்கான காரணம் *' : 'Reason for Suspension *'}
            </label>
            <textarea
              required
              rows={2}
              value={suspendReason}
              onChange={(e) => setSuspendReason(e.target.value)}
              placeholder="e.g. Statutory criteria review pending revised district revenue circular."
              className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-[12px] text-[12.5px] mb-4"
            />

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setSuspendingSchemeId(null)}
                className="flex-1 py-2 rounded-[12px] border border-gray-300 text-gray-700 font-bold text-[12px]"
              >
                {isTamil ? 'ரத்து' : 'Cancel'}
              </button>
              <button
                type="button"
                disabled={!suspendReason.trim()}
                onClick={handleConfirmSuspend}
                className="flex-1 py-2 rounded-[12px] bg-rose-600 hover:bg-rose-700 text-white font-bold text-[12px]"
              >
                {isTamil ? 'நிறுத்திவை' : 'Suspend Scheme'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

