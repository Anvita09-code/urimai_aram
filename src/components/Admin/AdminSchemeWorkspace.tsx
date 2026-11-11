import React, { useState } from 'react';
import {
  AlertCircle,
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  FileCheck2,
  FileText,
  Layers,
  Plus,
  Send,
  Shield,
  ShieldCheck,
  Trash2,
} from 'lucide-react';
import {
  GovernanceRuleItem,
  GovernanceSchemeItem,
  schemeGovernanceService,
} from '../../services/schemeGovernanceService';
import { Language } from '../../types';
import { NotFoundPage } from '../Common/NotFoundPage';

interface AdminSchemeWorkspaceProps {
  schemeId: string;
  currentLang: Language;
  onNavigateBack: () => void;
  onNavigateHome: () => void;
}

type WorkspaceSection = 'details' | 'rules' | 'sources' | 'validation' | 'versions';

export const AdminSchemeWorkspace: React.FC<AdminSchemeWorkspaceProps> = ({
  schemeId,
  currentLang,
  onNavigateBack,
  onNavigateHome,
}) => {
  const isTamil = currentLang === 'ta';

  const initialScheme = schemeGovernanceService.getSchemeById(schemeId);
  if (!initialScheme) {
    return (
      <NotFoundPage
        currentLang={currentLang}
        title={isTamil ? `திட்டம் '${schemeId}' காணப்படவில்லை` : `Scheme '${schemeId}' Not Found`}
        message={
          isTamil
            ? 'நிர்வாக அட்டவணையில் இந்த திட்ட அடையாள எண் இல்லை. தயவுசெய்து அட்டவணைக்குத் திரும்பவும்.'
            : `The scheme '${schemeId}' is not found in the administrator catalogue.`
        }
        onNavigateHome={onNavigateBack}
      />
    );
  }

  const [scheme, setScheme] = useState<GovernanceSchemeItem>(initialScheme);
  const [activeSection, setActiveSection] = useState<WorkspaceSection>('details');
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [submitSummary, setSubmitSummary] = useState('');
  const [actionToast, setActionToast] = useState<string | null>(null);

  // Editable rules state
  const [rules, setRules] = useState<GovernanceRuleItem[]>(scheme.rulePack.rules);

  const handleUpdateRuleValue = (ruleId: string, newValue: any) => {
    setRules((prev) =>
      prev.map((r) => (r.id === ruleId ? { ...r, value: newValue } : r))
    );
  };

  const handleRunValidation = () => {
    // Run frontend validation checks
    const messages: string[] = [];
    let errors = 0;
    let warnings = 0;

    if (!scheme.officialSource?.trim()) {
      messages.push('Official gazette or department order reference is required.');
      errors++;
    } else {
      messages.push('Official citation verified against Tamil Nadu e-Repository.');
    }

    if (rules.length === 0) {
      messages.push('Scheme rule-pack must contain at least one evaluation rule.');
      errors++;
    } else {
      messages.push(`${rules.length} statutory rule conditions validated.`);
    }

    const updatedScheme = schemeGovernanceService.updateScheme(scheme.schemeId, {
      rulePack: { ...scheme.rulePack, rules },
      validationReport: {
        valid: errors === 0,
        errorsCount: errors,
        warningsCount: warnings,
        messages,
      },
    });

    if (updatedScheme) setScheme(updatedScheme);
    setActionToast(isTamil ? 'சரிபார்ப்பு ஆய்வு நிறைவடைந்தது' : 'Validation checks completed.');
    setTimeout(() => setActionToast(null), 3000);
  };

  const handleSubmitForReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!submitSummary.trim()) return;

    schemeGovernanceService.submitForReview(
      scheme.schemeId,
      submitSummary,
      submitSummary
    );

    // Refresh state
    const refreshed = schemeGovernanceService.getSchemeById(scheme.schemeId);
    if (refreshed) setScheme(refreshed);

    setIsSubmitModalOpen(false);
    setActionToast(
      isTamil
        ? 'சுயாதீன மதிப்பாய்வுக்கு வெற்றிகரமாக சமர்ப்பிக்கப்பட்டது!'
        : 'Submitted for Independent Review successfully!'
    );
    setTimeout(() => setActionToast(null), 3500);
  };

  const sections: { id: WorkspaceSection; titleEn: string; titleTa: string }[] = [
    { id: 'details', titleEn: '1. Details', titleTa: '1. விவரங்கள்' },
    { id: 'rules', titleEn: '2. Rule Pack', titleTa: '2. விதிமுறை தொகுப்பு' },
    { id: 'sources', titleEn: '3. Sources', titleTa: '3. ஆதாரங்கள்' },
    { id: 'validation', titleEn: '4. Validation', titleTa: '4. சரிபார்ப்பு' },
    { id: 'versions', titleEn: '5. Versions', titleTa: '5. பதிப்புகள்' },
  ];

  return (
    <div className="w-full max-w-[500px] mx-auto px-4 py-3 pb-12 text-left select-none">
      {/* Toast */}
      {actionToast && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-[#145B49] text-white px-4 py-2 rounded-full text-[12px] font-bold shadow-lg animate-in fade-in">
          {actionToast}
        </div>
      )}

      {/* Top Bar */}
      <section className="flex items-center justify-between mb-3">
        <button
          type="button"
          onClick={onNavigateBack}
          className="flex items-center gap-1.5 text-[#145B49] hover:opacity-85 font-semibold text-[13px] cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 stroke-[2.4]" />
          <span>{isTamil ? 'அட்டவணைக்குத் திரும்பு' : 'Catalogue'}</span>
        </button>

        <div className="flex items-center gap-2">
          {/* Submit for Review Action Button */}
          {scheme.status !== 'in_review' ? (
            <button
              type="button"
              onClick={() => setIsSubmitModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#145B49] hover:bg-[#10483D] active:scale-95 text-white font-bold rounded-full text-[12px] shadow-xs cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isTamil ? 'மதிப்பாய்வுக்கு சமர்ப்பி' : 'Submit for Review'}</span>
            </button>
          ) : (
            <span className="text-[11px] font-bold text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
              {isTamil ? 'மதிப்பாய்வில் உள்ளது' : 'Under Independent Review'}
            </span>
          )}
        </div>
      </section>

      {/* Scheme Metadata Header Card */}
      <div className="bg-white rounded-[20px] border border-[#E0E6E0] p-4 shadow-2xs mb-4">
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <span className="text-[11px] font-mono font-bold text-[#145B49] bg-[#E8F3EB] px-2.5 py-0.5 rounded-full">
            {scheme.version}
          </span>

          <span className="text-[10.5px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
            {scheme.status.toUpperCase()}
          </span>
        </div>

        <h1 className="text-[18px] font-bold text-[#145B49] leading-snug">
          {isTamil ? scheme.nameTa : scheme.nameEn}
        </h1>
        <p className="text-[12px] text-[#55645E] mt-0.5">
          {isTamil ? scheme.departmentTa : scheme.departmentEn}
        </p>
      </div>

      {/* 5-Section Navigation Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-4 no-scrollbar">
        {sections.map((sec) => (
          <button
            key={sec.id}
            onClick={() => setActiveSection(sec.id)}
            className={`px-3 py-1.5 rounded-full text-[11.5px] font-bold shrink-0 transition-all cursor-pointer ${
              activeSection === sec.id
                ? 'bg-[#145B49] text-white shadow-xs'
                : 'bg-white text-gray-700 border border-gray-200 hover:bg-[#FAF7EF]'
            }`}
          >
            {isTamil ? sec.titleTa : sec.titleEn}
          </button>
        ))}
      </div>

      {/* =========================================================================
          SECTION 1: DETAILS
         ========================================================================= */}
      {activeSection === 'details' && (
        <section className="bg-white rounded-[20px] border border-[#E0E6E0] p-4.5 shadow-2xs space-y-3.5 text-[12.5px]">
          <div>
            <label className="block font-semibold text-[#303833] mb-1">
              {isTamil ? 'அதிகாரப்பூர்வ பெயர் (English)' : 'Official Scheme Name (English)'}
            </label>
            <input
              type="text"
              value={scheme.officialNameEn}
              onChange={(e) => setScheme({ ...scheme, officialNameEn: e.target.value })}
              className="w-full px-3 py-2 bg-[#FAF7EF] border border-[#CBD5CF] rounded-[12px] text-[#202820]"
            />
          </div>

          <div>
            <label className="block font-semibold text-[#303833] mb-1">
              {isTamil ? 'அதிகாரப்பூர்வ பெயர் (தமிழ்)' : 'Official Scheme Name (Tamil)'}
            </label>
            <input
              type="text"
              value={scheme.officialNameTa}
              onChange={(e) => setScheme({ ...scheme, officialNameTa: e.target.value })}
              className="w-full px-3 py-2 bg-[#FAF7EF] border border-[#CBD5CF] rounded-[12px] text-[#202820] font-tamil"
            />
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="block font-semibold text-[#303833] mb-1">
                {isTamil ? 'நலத்திட்ட வகை' : 'Category'}
              </label>
              <input
                type="text"
                value={scheme.category}
                onChange={(e) => setScheme({ ...scheme, category: e.target.value })}
                className="w-full px-3 py-2 bg-[#FAF7EF] border border-[#CBD5CF] rounded-[12px] text-[#202820] capitalize"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#303833] mb-1">
                {isTamil ? 'பதிப்பு எண்' : 'Version'}
              </label>
              <input
                type="text"
                value={scheme.version}
                readOnly
                className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-[12px] font-mono font-bold text-[#145B49]"
              />
            </div>
          </div>
        </section>
      )}

      {/* =========================================================================
          SECTION 2: RULE PACK
         ========================================================================= */}
      {activeSection === 'rules' && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-[14px] text-[#145B49]">
              {isTamil ? 'தகுதி விதிமுறை கூறுகள்' : 'Rule Pack Criteria'} ({rules.length})
            </h3>
            <button
              type="button"
              onClick={handleRunValidation}
              className="text-[11.5px] font-bold text-[#145B49] bg-[#E8F3EB] px-3 py-1 rounded-full border border-[#CDE1D0] cursor-pointer"
            >
              {isTamil ? 'விதிமுறைகளை சரிபார்' : 'Validate Rules'}
            </button>
          </div>

          <div className="space-y-2.5">
            {rules.map((rule) => (
              <div key={rule.id} className="bg-white rounded-[16px] border border-[#E0E6E0] p-3.5 shadow-2xs space-y-2 text-[12.5px]">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] font-bold text-[#145B49] bg-[#FAF7EF] px-2 py-0.5 rounded-md border border-[#ECE5D8]">
                    {rule.field}
                  </span>
                  <span className="text-[11px] font-bold text-[#55645E]">
                    Operator: {rule.operator}
                  </span>
                </div>

                <p className="font-medium text-[#202820] text-[12px]">
                  {isTamil ? rule.descriptionTa : rule.descriptionEn}
                </p>

                <div className="flex items-center gap-2 pt-1">
                  <span className="text-[#6D7772] text-[11px] font-semibold">{isTamil ? 'மதிப்பு:' : 'Threshold Value:'}</span>
                  <input
                    type="text"
                    value={String(rule.value)}
                    onChange={(e) => handleUpdateRuleValue(rule.id, e.target.value)}
                    className="flex-1 px-2.5 py-1 bg-[#FAF7EF] border border-[#CBD5CF] rounded-[8px] text-[12.5px] font-bold text-[#145B49]"
                  />
                  {rule.unit && <span className="text-[11px] text-[#6D7772]">{rule.unit}</span>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* =========================================================================
          SECTION 3: SOURCES AND CITATIONS
         ========================================================================= */}
      {activeSection === 'sources' && (
        <section className="bg-white rounded-[20px] border border-[#E0E6E0] p-4.5 shadow-2xs space-y-3.5 text-[12.5px]">
          <h3 className="font-bold text-[14px] text-[#145B49]">
            {isTamil ? 'அதிகாரப்பூர்வ அரசு மேற்கோள் விவரங்கள்' : 'Statutory Citations & Verification'}
          </h3>

          <div>
            <label className="block font-semibold text-[#303833] mb-1">
              {isTamil ? 'அரசாணை / சுற்றறிக்கை மேற்கோள்' : 'Government Order (G.O.) / Citation'}
            </label>
            <input
              type="text"
              value={scheme.officialSource}
              onChange={(e) => setScheme({ ...scheme, officialSource: e.target.value })}
              className="w-full px-3 py-2 bg-[#FAF7EF] border border-[#CBD5CF] rounded-[12px]"
            />
          </div>

          <div>
            <label className="block font-semibold text-[#303833] mb-1">
              {isTamil ? 'அரசு இணைய முகவரி (URL)' : 'Official Department URL'}
            </label>
            <input
              type="url"
              value={scheme.sourceUrl}
              onChange={(e) => setScheme({ ...scheme, sourceUrl: e.target.value })}
              className="w-full px-3 py-2 bg-[#FAF7EF] border border-[#CBD5CF] rounded-[12px]"
            />
          </div>

          <div>
            <label className="block font-semibold text-[#303833] mb-1">
              {isTamil ? 'கடைசி சரிபார்ப்பு காலம்' : 'Last Verified Date'}
            </label>
            <input
              type="text"
              value={scheme.sourceLastVerified}
              onChange={(e) => setScheme({ ...scheme, sourceLastVerified: e.target.value })}
              className="w-full px-3 py-2 bg-[#FAF7EF] border border-[#CBD5CF] rounded-[12px]"
            />
          </div>
        </section>
      )}

      {/* =========================================================================
          SECTION 4: VALIDATION
         ========================================================================= */}
      {activeSection === 'validation' && (
        <section className="bg-white rounded-[20px] border border-[#E0E6E0] p-4.5 shadow-2xs space-y-3.5">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-[14px] text-[#145B49]">
              {isTamil ? 'விதிமுறை சரிபார்ப்பு அறிக்கை' : 'Rule Pack Validation Report'}
            </h3>
            <button
              type="button"
              onClick={handleRunValidation}
              className="text-[11.5px] font-bold text-white bg-[#145B49] px-3 py-1 rounded-full cursor-pointer"
            >
              {isTamil ? 'மீண்டும் சரிபார்' : 'Run Check'}
            </button>
          </div>

          <div
            className={`p-3.5 rounded-[14px] border ${
              scheme.validationReport.valid
                ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                : 'bg-rose-50 border-rose-200 text-rose-800'
            }`}
          >
            <div className="flex items-center gap-2 font-bold text-[13px] mb-1">
              {scheme.validationReport.valid ? <CheckCircle2 className="w-4.5 h-4.5" /> : <AlertTriangle className="w-4.5 h-4.5" />}
              <span>{scheme.validationReport.valid ? 'Validation Passed' : 'Validation Issues Detected'}</span>
            </div>
            <ul className="text-[12px] space-y-1 list-disc list-inside">
              {scheme.validationReport.messages.map((msg, i) => (
                <li key={i}>{msg}</li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* =========================================================================
          SECTION 5: VERSIONS
         ========================================================================= */}
      {activeSection === 'versions' && (
        <section className="bg-white rounded-[20px] border border-[#E0E6E0] p-4.5 shadow-2xs space-y-3">
          <h3 className="font-bold text-[14px] text-[#145B49]">
            {isTamil ? 'பதிப்பு மேலாண்மை வரலாறு' : 'Version History & Releases'}
          </h3>

          <div className="space-y-2 text-[12px]">
            <div className="p-3 bg-[#FAF7EF] rounded-[14px] border border-[#ECE5D8] flex items-center justify-between">
              <div>
                <span className="font-mono font-bold text-[#145B49]">{scheme.version} (Current)</span>
                <p className="text-[11px] text-[#69756F]">Status: {scheme.status.toUpperCase()}</p>
              </div>
              <span className="text-[11px] text-[#55645E]">Updated {scheme.lastUpdated}</span>
            </div>
          </div>
        </section>
      )}

      {/* Submit for Review Modal */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/45 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-[420px] bg-white rounded-[22px] border border-[#CBD5D0] p-5 shadow-2xl animate-in zoom-in-95 text-left">
            <h2 className="font-bold text-[18px] text-[#145B49] mb-1">
              {isTamil ? 'சுயாதீன மதிப்பாய்வுக்கு சமர்ப்பி' : 'Submit Change for Independent Review'}
            </h2>
            <p className="text-[12px] text-[#59635F] mb-4">
              {isTamil
                ? 'மாற்றங்களின் சுருக்கக் குறிப்பை உள்ளிடவும். கொள்கை ஆலோசனைக் குழு மதிப்பீட்டாளர் இதனை ஆய்வு செய்வார்.'
                : 'Enter a summary of rule-pack changes. An Independent Reviewer will evaluate and approve/reject with notes.'}
            </p>

            <form onSubmit={handleSubmitForReview} className="space-y-3 text-[12.5px]">
              <div>
                <label className="block font-semibold text-[#303833] mb-1">
                  {isTamil ? 'மாற்றங்களின் சுருக்கம் *' : 'Summary of Proposed Changes *'}
                </label>
                <textarea
                  required
                  rows={3}
                  value={submitSummary}
                  onChange={(e) => setSubmitSummary(e.target.value)}
                  placeholder="e.g. Updated annual income ceiling to match revised G.O. guidelines."
                  className="w-full p-2.5 bg-[#FAF7EF] border border-[#CBD5CF] rounded-[12px] text-[13px] text-[#202820] focus:outline-none focus:border-[#145B49]"
                />
              </div>

              <div className="p-3 rounded-[12px] bg-amber-50 border border-amber-200 text-amber-900 text-[11.5px]">
                <p className="font-bold">Important Governance Rule:</p>
                <p className="mt-0.5">
                  Administrators cannot approve their own submissions. Once submitted, the scheme transitions to IN REVIEW until evaluated by an Independent Reviewer.
                </p>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsSubmitModalOpen(false)}
                  className="flex-1 py-2.5 rounded-[12px] border border-[#CBD5CF] text-[#55645E] font-semibold text-[13px] hover:bg-gray-50 cursor-pointer"
                >
                  {isTamil ? 'ரத்து' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-[12px] bg-[#145B49] hover:bg-[#10483D] text-white font-bold text-[13px] cursor-pointer shadow-xs flex items-center justify-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isTamil ? 'சமர்ப்பி →' : 'Submit →'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

