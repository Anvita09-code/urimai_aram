import React, { useState } from 'react';
import {
  AlertCircle,
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  Clock,
  ExternalLink,
  FileCheck2,
  FileText,
  HeartPulse,
  Home,
  GraduationCap,
  Info,
  Pause,
  Phone,
  Printer,
  RotateCcw,
  Search,
  ShieldCheck,
  Sprout,
  User,
  Users,
  XCircle,
} from 'lucide-react';
import { schemesData } from '../../data/schemes';
import { translations } from '../../data/translations';
import { evaluationService } from '../../services/evaluationService';
import { OperatorSession, operatorService } from '../../services/operatorService';
import { Language, SchemeOutcomeStatus } from '../../types';
import { NotFoundPage } from '../Common/NotFoundPage';

interface OperatorSessionWorkspaceProps {
  sessionId: string;
  currentLang: Language;
  onNavigateBack: () => void;
  onNavigateHome: () => void;
  onNavigateSchemes: () => void;
}

export const OperatorSessionWorkspace: React.FC<OperatorSessionWorkspaceProps> = ({
  sessionId,
  currentLang,
  onNavigateBack,
  onNavigateHome,
  onNavigateSchemes,
}) => {
  const isTamil = currentLang === 'ta';
  const t = translations[currentLang];

  const sessionRecord = operatorService.getSessionById(sessionId);
  if (!sessionRecord) {
    return (
      <NotFoundPage
        currentLang={currentLang}
        title={isTamil ? `அமர்வு '${sessionId}' காணப்படவில்லை` : `Session '${sessionId}' Not Found`}
        message={
          isTamil
            ? 'கோரப்பட்ட உதவி அமர்வு எண் பதிவேட்டில் இல்லை. அமர்வுகள் பட்டியலுக்குத் திரும்பவும்.'
            : `The operator session ID '${sessionId}' does not exist. Please return to operator sessions list.`
        }
        onNavigateHome={onNavigateBack}
      />
    );
  }

  const [session, setSession] = useState<OperatorSession>(sessionRecord);
  const [currentStep, setCurrentStep] = useState<number>(session.currentStep || 1);
  const [consentGiven, setConsentGiven] = useState(session.consentGiven);
  const [readbackConfirmed, setReadbackConfirmed] = useState(session.readbackConfirmed);
  const [sessionNotes, setSessionNotes] = useState(session.notes || '');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    session.selectedCategories.length > 0 ? session.selectedCategories : ['health', 'education', 'agriculture', 'social']
  );
  const [evalResults, setEvalResults] = useState(session.evaluationResults);
  const [parkedActionToast, setParkedActionToast] = useState<string | null>(null);

  const stepTitles = [
    { num: 1, titleEn: 'Citizen Consent', titleTa: 'குடிமக்கள் சம்மதம்' },
    { num: 2, titleEn: 'Information Entry', titleTa: 'தகவல் பதிவு' },
    { num: 3, titleEn: 'Citizen Read-back', titleTa: 'விவர வாசிப்பு சரிபார்ப்பு' },
    { num: 4, titleEn: 'Areas & Evaluation', titleTa: 'வகை & தகுதி ஆய்வு' },
    { num: 5, titleEn: 'Results & Explanation', titleTa: 'முடிவுகள் & விளக்கம்' },
    { num: 6, titleEn: 'Documents & Next Steps', titleTa: 'ஆவணங்கள் & வழிகாட்டல்' },
    { num: 7, titleEn: 'Close Session', titleTa: 'அமர்வு நிறைவு' },
  ];

  const handlePauseSession = () => {
    operatorService.updateSession(session.id, {
      currentStep,
      consentGiven,
      readbackConfirmed,
      notes: sessionNotes,
      status: 'paused',
    });
    onNavigateBack();
  };

  const handleCloseSession = () => {
    operatorService.closeSession(session.id, sessionNotes || 'Assisted session completed.');
    onNavigateBack();
  };

  const handleRunEvaluation = () => {
    const record = evaluationService.runEvaluation(selectedCategories);
    setEvalResults(record.results);
    operatorService.updateSession(session.id, {
      evaluationResults: record.results,
      selectedCategories,
      currentStep: 5,
    });
    setCurrentStep(5);
  };

  const handleParkedAction = (actionName: string) => {
    setParkedActionToast(
      isTamil
        ? `'${actionName}' அம்சம் மாதிரி நிலையிலுள்ளது (Demonstration Only)`
        : `'${actionName}' action is in demonstration state`
    );
    setTimeout(() => setParkedActionToast(null), 3000);
  };

  const categories = [
    { id: 'health', labelEn: 'Health & Medical', labelTa: 'மருத்துவம் & காப்பீடு' },
    { id: 'education', labelEn: 'Education & Scholarships', labelTa: 'கல்வி & உதவித்தொகை' },
    { id: 'agriculture', labelEn: 'Agriculture & Farming', labelTa: 'வேளாண்மை & உழவர் நலன்' },
    { id: 'social', labelEn: 'Social Security & Pension', labelTa: 'சமூக பாதுகாப்பு & ஓய்வூதியம்' },
    { id: 'housing', labelEn: 'Housing & Shelter', labelTa: 'வீட்டு வசதி & இருப்பிடம்' },
  ];

  return (
    <div className="w-full max-w-[500px] mx-auto px-4 py-3 pb-12 text-left select-none">
      {/* Toast Notification */}
      {parkedActionToast && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-[#145B49] text-white px-4 py-2 rounded-full text-[12px] font-bold shadow-lg animate-in fade-in duration-150">
          {parkedActionToast}
        </div>
      )}

      {/* Top Workspace Bar */}
      <section className="flex items-center justify-between mb-3">
        <button
          type="button"
          onClick={onNavigateBack}
          className="flex items-center gap-1.5 text-[#145B49] hover:opacity-85 font-semibold text-[13px] cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 stroke-[2.4]" />
          <span>{isTamil ? 'அமர்வுகள் பட்டியல்' : 'Sessions'}</span>
        </button>

        <div className="flex items-center gap-2">
          {session.status !== 'closed' && (
            <button
              type="button"
              onClick={handlePauseSession}
              className="flex items-center gap-1 px-3 py-1 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 rounded-full text-[11.5px] font-bold cursor-pointer transition-all"
            >
              <Pause className="w-3.5 h-3.5" />
              <span>{isTamil ? 'இடைநிறுத்து' : 'Pause'}</span>
            </button>
          )}

          {/* Parked Call & Print Actions */}
          <button
            type="button"
            onClick={() => handleParkedAction('Citizen Call / SMS')}
            className="p-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full border border-gray-300 cursor-pointer"
            title="Call / SMS Citizen (Demo)"
          >
            <Phone className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => handleParkedAction('Print Session Summary')}
            className="p-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full border border-gray-300 cursor-pointer"
            title="Print Summary Checklist (Demo)"
          >
            <Printer className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* Session Citizen Metadata Banner */}
      <div className="bg-[#E8F3EB] border border-[#CDE1D0] rounded-[18px] p-3.5 mb-3.5 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[14.5px] font-bold text-[#145B49]">
              {isTamil ? session.citizenNameTa : session.citizenName}
            </span>
            <span className="text-[10.5px] font-mono bg-white text-[#145B49] px-2 py-0.5 rounded-full border border-[#CBD5D0]">
              {session.id}
            </span>
          </div>
          <p className="text-[11.5px] text-[#55645E] mt-0.5">
            Ration: <strong>{session.rationCardNumber}</strong> • Phone: {session.phone}
          </p>
        </div>

        <div className="text-right">
          <span className="text-[10px] uppercase font-bold text-[#55645E] block">
            {isTamil ? 'படிநிலை' : 'Step'}
          </span>
          <span className="text-[16px] font-bold text-[#145B49]">{currentStep}/7</span>
        </div>
      </div>

      {/* 7-Step Navigation Chips Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-3.5 no-scrollbar">
        {stepTitles.map((st) => {
          const isActive = currentStep === st.num;
          const isPassed = currentStep > st.num;
          return (
            <button
              key={st.num}
              onClick={() => {
                if (st.num === 1 || consentGiven) {
                  setCurrentStep(st.num);
                }
              }}
              className={`px-2.5 py-1 rounded-full text-[11px] font-bold shrink-0 transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#145B49] text-white shadow-2xs ring-1 ring-[#145B49]'
                  : isPassed
                  ? 'bg-[#E8F3EB] text-[#145B49] border border-[#CDE1D0]'
                  : 'bg-white text-gray-500 border border-gray-200'
              }`}
            >
              {st.num}. {isTamil ? st.titleTa : st.titleEn}
            </button>
          );
        })}
      </div>

      {/* =========================================================================
          STEP 1: IDENTIFY CITIZEN AND CONSENT
         ========================================================================= */}
      {currentStep === 1 && (
        <section className="bg-white rounded-[20px] border border-[#E0E6E0] p-4.5 shadow-2xs space-y-4">
          <div>
            <h2 className="font-bold text-[18px] text-[#145B49]">
              {isTamil ? 'படி 1 — குடிமக்கள் அடையாளம் மற்றும் சம்மதம்' : 'Step 1 — Citizen Identification & Consent'}
            </h2>
            <p className="text-[12px] text-[#59635F] mt-1">
              {isTamil
                ? 'அரசு நலத்திட்ட தகுதி ஆய்வுக்கு குடிமகனின் வெளிப்படையான சம்மதம் அவசியமாகும்.'
                : 'Prior informed consent is mandatory before recording facts and processing eligibility rules.'}
            </p>
          </div>

          <div className="bg-[#FAF7EF] rounded-[14px] p-3.5 border border-[#ECE5D8] space-y-2 text-[12.5px]">
            <div className="flex justify-between">
              <span className="text-[#6D7772]">{isTamil ? 'குடிமகன் பெயர்' : 'Citizen Name'}:</span>
              <span className="font-bold text-[#202820]">{session.citizenName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#6D7772]">{isTamil ? 'ஸ்மார்ட் குடும்ப அட்டை' : 'Smart Ration Card'}:</span>
              <span className="font-bold text-[#202820]">{session.rationCardNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#6D7772]">{isTamil ? 'தொடர்பு எண்' : 'Phone Number'}:</span>
              <span className="font-bold text-[#202820]">{session.phone}</span>
            </div>
          </div>

          {/* Consent Mandate Checkbox */}
          <label className="flex items-start gap-3 p-3 rounded-[14px] bg-[#E8F3EB] border border-[#CDE1D0] cursor-pointer">
            <input
              type="checkbox"
              checked={consentGiven}
              onChange={(e) => {
                setConsentGiven(e.target.checked);
                operatorService.updateSession(session.id, { consentGiven: e.target.checked });
              }}
              className="mt-1 w-4.5 h-4.5 text-[#145B49] rounded accent-[#145B49]"
            />
            <span className="text-[12px] text-[#145B49] leading-snug font-medium">
              {isTamil
                ? 'நான் எனது குடும்பத் தகவல்களை நலத்திட்ட தகுதி ஆய்விற்காக இ-சேவை ஆபரேட்டரிடம் வழங்க முழு சம்மதம் அளிக்கிறேன்.'
                : 'I confirm the citizen has given explicit verbal and informed consent to evaluate government scheme eligibility on their behalf.'}
            </span>
          </label>

          <button
            type="button"
            disabled={!consentGiven}
            onClick={() => {
              operatorService.updateSession(session.id, { consentGiven: true, currentStep: 2 });
              setCurrentStep(2);
            }}
            className={`w-full py-3 rounded-[14px] font-bold text-[13.5px] transition-all cursor-pointer ${
              consentGiven
                ? 'bg-[#145B49] hover:bg-[#10483D] text-white shadow-xs'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isTamil ? 'சம்மதம் உறுதி செய்து தொடரவும் →' : 'Confirm Consent & Proceed to Step 2 →'}
          </button>
        </section>
      )}

      {/* =========================================================================
          STEP 2: HOUSEHOLD AND INFORMATION ENTRY
         ========================================================================= */}
      {currentStep === 2 && (
        <section className="bg-white rounded-[20px] border border-[#E0E6E0] p-4.5 shadow-2xs space-y-4">
          <div>
            <h2 className="font-bold text-[18px] text-[#145B49]">
              {isTamil ? 'படி 2 — குடும்ப மற்றும் உறுப்பினர் தகவல் பதிவு' : 'Step 2 — Household & Member Information Entry'}
            </h2>
            <p className="text-[12px] text-[#59635F] mt-1">
              {isTamil
                ? 'குடிமகனின் குடும்ப விவரங்களை சரிபார்த்து உள்ளிடவும்.'
                : 'Assist the citizen in recording household composition and financial facts.'}
            </p>
          </div>

          <div className="space-y-3 text-[12.5px]">
            <div>
              <label className="block font-semibold text-[#303833] mb-1">
                {isTamil ? 'குடும்ப ஆண்டு வருமானம் (₹)' : 'Annual Household Income (₹)'}
              </label>
              <input
                type="number"
                value={session.householdProfile.annualIncome}
                onChange={(e) => {
                  const updated = { ...session.householdProfile, annualIncome: Number(e.target.value) || 0 };
                  setSession((prev) => ({ ...prev, householdProfile: updated }));
                }}
                className="w-full px-3 py-2 bg-[#FAF7EF] border border-[#CBD5CF] rounded-[12px] font-semibold text-[#145B49]"
              />
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block font-semibold text-[#303833] mb-1">
                  {isTamil ? 'மாவட்டம்' : 'District'}
                </label>
                <input
                  type="text"
                  value={session.householdProfile.district}
                  onChange={(e) => {
                    const updated = { ...session.householdProfile, district: e.target.value };
                    setSession((prev) => ({ ...prev, householdProfile: updated }));
                  }}
                  className="w-full px-3 py-2 bg-[#FAF7EF] border border-[#CBD5CF] rounded-[12px]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#303833] mb-1">
                  {isTamil ? 'வட்டம்' : 'Taluk'}
                </label>
                <input
                  type="text"
                  value={session.householdProfile.taluk}
                  onChange={(e) => {
                    const updated = { ...session.householdProfile, taluk: e.target.value };
                    setSession((prev) => ({ ...prev, householdProfile: updated }));
                  }}
                  className="w-full px-3 py-2 bg-[#FAF7EF] border border-[#CBD5CF] rounded-[12px]"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-[#303833] mb-1">
                {isTamil ? 'குடும்ப உறுப்பினர்கள்' : 'Household Members'} ({session.householdMembers.length})
              </label>
              <div className="space-y-2">
                {session.householdMembers.map((m) => (
                  <div key={m.id} className="p-2.5 rounded-[12px] bg-[#FAF7EF] border border-[#ECE5D8] flex items-center justify-between">
                    <div>
                      <p className="font-bold text-[#202820]">{m.name}</p>
                      <p className="text-[11px] text-[#6D7772]">{m.relation} • {m.age} yrs • {m.gender}</p>
                    </div>
                    <span className="text-[10px] bg-[#E8F3EB] text-[#145B49] font-bold px-2 py-0.5 rounded-full">
                      Aadhaar Linked
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className="py-2.5 px-4 rounded-[12px] border border-gray-300 text-gray-700 font-semibold text-[13px]"
            >
              ← {isTamil ? 'முந்தையது' : 'Previous'}
            </button>
            <button
              type="button"
              onClick={() => {
                operatorService.updateSession(session.id, {
                  householdProfile: session.householdProfile,
                  householdMembers: session.householdMembers,
                  currentStep: 3,
                });
                setCurrentStep(3);
              }}
              className="flex-1 py-2.5 rounded-[12px] bg-[#145B49] hover:bg-[#10483D] text-white font-bold text-[13px] shadow-xs"
            >
              {isTamil ? 'தகவல் வாசிப்பு சரிபார்ப்புக்குச் செல் →' : 'Proceed to Citizen Read-back →'}
            </button>
          </div>
        </section>
      )}

      {/* =========================================================================
          STEP 3: CITIZEN READ-BACK
         ========================================================================= */}
      {currentStep === 3 && (
        <section className="bg-white rounded-[20px] border border-[#E0E6E0] p-4.5 shadow-2xs space-y-4">
          <div>
            <h2 className="font-bold text-[18px] text-[#145B49]">
              {isTamil ? 'படி 3 — குடிமக்களிடம் விவர வாசிப்பு சரிபார்ப்பு' : 'Step 3 — Citizen Verbal Read-back'}
            </h2>
            <p className="text-[12px] text-[#59635F] mt-1">
              {isTamil
                ? 'உள்ளீடு செய்யப்பட்ட விவரங்களை குடிமகனுக்கு படித்துக் காட்டி ஒப்புதல் பெறவும்.'
                : 'Verbally read back the recorded information to the citizen and confirm correctness.'}
            </p>
          </div>

          <div className="bg-[#FAF7EF] rounded-[16px] p-3.5 border border-[#ECE5D8] space-y-2.5 text-[12.5px]">
            <div className="flex items-center justify-between border-b border-[#EAE5D9] pb-2">
              <span className="text-[#6D7772]">{isTamil ? 'குடும்பத் தலைவர்' : 'Head of Family'}:</span>
              <span className="font-bold text-[#202820]">{session.householdProfile.headName}</span>
            </div>
            <div className="flex items-center justify-between border-b border-[#EAE5D9] pb-2">
              <span className="text-[#6D7772]">{isTamil ? 'வருமானம்' : 'Reported Income'}:</span>
              <span className="font-bold text-[#145B49]">₹{session.householdProfile.annualIncome.toLocaleString('en-IN')}/yr</span>
            </div>
            <div className="flex items-center justify-between border-b border-[#EAE5D9] pb-2">
              <span className="text-[#6D7772]">{isTamil ? 'உறுப்பினர்கள் எண்ணிக்கை' : 'Total Members'}:</span>
              <span className="font-bold text-[#202820]">{session.householdMembers.length} Members</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#6D7772]">{isTamil ? 'இருப்பிடம்' : 'Location'}:</span>
              <span className="font-bold text-[#202820]">{session.householdProfile.district}, {session.householdProfile.taluk}</span>
            </div>
          </div>

          <label className="flex items-start gap-3 p-3 rounded-[14px] bg-[#E8F3EB] border border-[#CDE1D0] cursor-pointer">
            <input
              type="checkbox"
              checked={readbackConfirmed}
              onChange={(e) => {
                setReadbackConfirmed(e.target.checked);
                operatorService.updateSession(session.id, { readbackConfirmed: e.target.checked });
              }}
              className="mt-1 w-4.5 h-4.5 text-[#145B49] rounded accent-[#145B49]"
            />
            <span className="text-[12px] text-[#145B49] leading-snug font-medium">
              {isTamil
                ? 'குடிமகன் அனைத்து விவரங்களையும் கேட்டு உறுதி செய்துள்ளார் என்பதை ஆபரேட்டர் உறுதிப்படுத்துகிறார்.'
                : 'Operator confirms that all facts have been read back and accepted by the citizen.'}
            </span>
          </label>

          <div className="flex items-center gap-2 pt-2">
            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              className="py-2.5 px-4 rounded-[12px] border border-gray-300 text-gray-700 font-semibold text-[13px]"
            >
              ← {isTamil ? 'திருத்து' : 'Edit'}
            </button>
            <button
              type="button"
              disabled={!readbackConfirmed}
              onClick={() => {
                operatorService.updateSession(session.id, { readbackConfirmed: true, currentStep: 4 });
                setCurrentStep(4);
              }}
              className={`flex-1 py-2.5 rounded-[12px] font-bold text-[13px] ${
                readbackConfirmed
                  ? 'bg-[#145B49] hover:bg-[#10483D] text-white shadow-xs'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isTamil ? 'தகுதி ஆய்வைத் தேர்வு செய்க →' : 'Proceed to Choose Areas →'}
            </button>
          </div>
        </section>
      )}

      {/* =========================================================================
          STEP 4: CHOOSE AREAS AND EVALUATE
         ========================================================================= */}
      {currentStep === 4 && (
        <section className="bg-white rounded-[20px] border border-[#E0E6E0] p-4.5 shadow-2xs space-y-4">
          <div>
            <h2 className="font-bold text-[18px] text-[#145B49]">
              {isTamil ? 'படி 4 — நலத்திட்ட பகுதிகளைத் தேர்வு செய்து ஆய்வு செய்க' : 'Step 4 — Choose Areas & Evaluate'}
            </h2>
            <p className="text-[12px] text-[#59635F] mt-1">
              {isTamil
                ? 'குடிமகனின் தேவைக்கேற்ப ஆய்வு செய்ய வேண்டிய வகைகளைத் தேர்ந்தெடுக்கவும்.'
                : 'Select the citizen welfare interests to run the automated mock eligibility assessment.'}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {categories.map((c) => {
              const isSel = selectedCategories.includes(c.id);
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => {
                    setSelectedCategories((prev) =>
                      isSel ? prev.filter((id) => id !== c.id) : [...prev, c.id]
                    );
                  }}
                  className={`p-3 rounded-[14px] border text-left text-[12px] font-bold transition-all cursor-pointer ${
                    isSel
                      ? 'border-[#145B49] bg-[#E8F3EB] text-[#145B49] ring-1 ring-[#145B49]'
                      : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {isTamil ? c.labelTa : c.labelEn}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={handleRunEvaluation}
            className="w-full py-3 bg-[#145B49] hover:bg-[#10483D] text-white font-bold rounded-[14px] text-[13.5px] flex items-center justify-center gap-2 shadow-xs cursor-pointer"
          >
            <Search className="w-4 h-4" />
            <span>{isTamil ? 'தகுதி மதிப்பீட்டை இயக்குக' : 'Run Assisted Evaluation'}</span>
          </button>
        </section>
      )}

      {/* =========================================================================
          STEP 5: RESULTS AND EXPLANATIONS
         ========================================================================= */}
      {currentStep === 5 && (
        <section className="space-y-3">
          <div className="bg-white rounded-[20px] border border-[#E0E6E0] p-4 shadow-2xs">
            <h2 className="font-bold text-[18px] text-[#145B49]">
              {isTamil ? 'படி 5 — தகுதி முடிவுகள் & விளக்கங்கள்' : 'Step 5 — Results & Explanations'}
            </h2>
            <p className="text-[12px] text-[#59635F] mt-0.5">
              {isTamil ? 'கணக்கிடப்பட்ட முடிவுகளை குடிமகனுக்கு விளக்குக.' : 'Explain the eligibility outcomes and criteria breakdown to the citizen.'}
            </p>
          </div>

          <div className="space-y-2.5">
            {evalResults.map((res) => (
              <div key={res.id} className="bg-white rounded-[16px] border border-[#E0E6E0] p-3.5 shadow-2xs text-left">
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="font-bold text-[14px] text-[#145B49]">
                    {isTamil ? res.titleTa : res.titleEn}
                  </span>
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {res.status.toUpperCase()}
                  </span>
                </div>
                <p className="text-[12px] text-[#55645E] leading-relaxed">
                  {isTamil ? res.descTa : res.descEn}
                </p>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 pt-2">
            <button
              type="button"
              onClick={() => setCurrentStep(4)}
              className="py-2.5 px-4 rounded-[12px] border border-gray-300 text-gray-700 font-semibold text-[13px]"
            >
              ← {isTamil ? 'முந்தையது' : 'Previous'}
            </button>
            <button
              type="button"
              onClick={() => setCurrentStep(6)}
              className="flex-1 py-2.5 rounded-[12px] bg-[#145B49] hover:bg-[#10483D] text-white font-bold text-[13px] shadow-xs"
            >
              {isTamil ? 'ஆவணங்கள் & அடுத்த படிக்குச் செல் →' : 'Documents & Next Steps →'}
            </button>
          </div>
        </section>
      )}

      {/* =========================================================================
          STEP 6: DOCUMENTS AND NEXT STEPS
         ========================================================================= */}
      {currentStep === 6 && (
        <section className="bg-white rounded-[20px] border border-[#E0E6E0] p-4.5 shadow-2xs space-y-4">
          <div>
            <h2 className="font-bold text-[18px] text-[#145B49]">
              {isTamil ? 'படி 6 — ஆவணங்கள் மற்றும் அடுத்த வழிகாட்டல்' : 'Step 6 — Documents & Official Next Steps'}
            </h2>
            <p className="text-[12px] text-[#59635F] mt-1">
              {isTamil ? 'குடிமகனுக்கு தேவையான ஆவணங்களின் பட்டியலை வழங்கி வழிகாட்டவும்.' : 'Provide the document checklist and official procedures to the citizen.'}
            </p>
          </div>

          <div className="space-y-2 text-[12.5px]">
            <div className="p-3 bg-[#FAF7EF] rounded-[14px] border border-[#ECE5D8] flex items-center justify-between">
              <div>
                <p className="font-bold text-[#202820]">Smart Ration Card (TNPDS)</p>
                <p className="text-[11px] text-[#69756F]">Civil Supplies Dept</p>
              </div>
              <span className="text-[11px] font-bold text-[#145B49] bg-[#E8F3EB] px-2 py-0.5 rounded-full">
                Available
              </span>
            </div>

            <div className="p-3 bg-[#FAF7EF] rounded-[14px] border border-[#ECE5D8] flex items-center justify-between">
              <div>
                <p className="font-bold text-[#202820]">VAO / Tahsildar Income Certificate</p>
                <p className="text-[11px] text-[#69756F]">Revenue Dept</p>
              </div>
              <span className="text-[11px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full">
                Renewal Needed
              </span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 pt-2">
            <button
              type="button"
              onClick={() => handleParkedAction('Print Document Checklist')}
              className="flex-1 py-2.5 rounded-[12px] bg-[#E8F3EB] text-[#145B49] font-bold text-[12.5px] border border-[#CDE1D0] flex items-center justify-center gap-1.5"
            >
              <Printer className="w-4 h-4" />
              <span>{isTamil ? 'பட்டியல் அச்சிடு (Demo)' : 'Print Checklist'}</span>
            </button>

            <button
              type="button"
              onClick={() => setCurrentStep(7)}
              className="flex-1 py-2.5 rounded-[12px] bg-[#145B49] hover:bg-[#10483D] text-white font-bold text-[12.5px] shadow-xs"
            >
              {isTamil ? 'அமர்வு நிறைவு →' : 'Close Session →'}
            </button>
          </div>
        </section>
      )}

      {/* =========================================================================
          STEP 7: CLOSE SESSION
         ========================================================================= */}
      {currentStep === 7 && (
        <section className="bg-white rounded-[20px] border border-[#E0E6E0] p-4.5 shadow-2xs space-y-4">
          <div>
            <h2 className="font-bold text-[18px] text-[#145B49]">
              {isTamil ? 'படி 7 — உதவி அமர்வை நிறைவு செய்க' : 'Step 7 — Session Summary & Closure'}
            </h2>
            <p className="text-[12px] text-[#59635F] mt-1">
              {isTamil
                ? 'அமர்வு குறிப்புகளைப் பதிவு செய்து அமர்வை நிறைவு செய்யவும்.'
                : 'Review session summary, add operator remarks, and finalize the assisted session.'}
            </p>
          </div>

          <div className="bg-[#FAF7EF] rounded-[16px] p-3.5 border border-[#ECE5D8] space-y-2 text-[12.5px]">
            <div className="flex justify-between">
              <span className="text-[#6D7772]">{isTamil ? 'குடிமகன்' : 'Citizen'}:</span>
              <span className="font-bold text-[#202820]">{session.citizenName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#6D7772]">{isTamil ? 'மதிப்பிடப்பட்ட திட்டங்கள்' : 'Evaluated Schemes'}:</span>
              <span className="font-bold text-[#145B49]">{evalResults.length || 7} Schemes</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#6D7772]">{isTamil ? 'சம்மதம் & சரிபார்ப்பு' : 'Consent & Read-back'}:</span>
              <span className="font-bold text-emerald-800">Verified & Confirmed</span>
            </div>
          </div>

          <div>
            <label className="block text-[12px] font-semibold text-[#303833] mb-1">
              {isTamil ? 'ஆபரேட்டர் குறிப்புகள்' : 'Operator Remarks / Closing Notes'}
            </label>
            <textarea
              rows={3}
              value={sessionNotes}
              onChange={(e) => setSessionNotes(e.target.value)}
              placeholder="e.g. Citizen assisted with CMCHIS eligibility and documents checklist handed over."
              className="w-full p-2.5 bg-[#FAF7EF] border border-[#CBD5CF] rounded-[12px] text-[13px] text-[#202820] focus:outline-none focus:border-[#145B49]"
            />
          </div>

          <button
            type="button"
            onClick={handleCloseSession}
            className="w-full py-3.5 bg-[#145B49] hover:bg-[#10483D] active:scale-[0.99] text-white font-bold rounded-[14px] text-[14px] shadow-sm flex items-center justify-center gap-2 cursor-pointer"
          >
            <CheckCircle2 className="w-4.5 h-4.5" />
            <span>{isTamil ? 'அமர்வை வெற்றிகரமாக முடிக்கவும்' : 'Finalize & Close Session'}</span>
          </button>
        </section>
      )}
    </div>
  );
};

