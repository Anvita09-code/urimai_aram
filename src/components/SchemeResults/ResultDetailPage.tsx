import React, { useState } from 'react';
import {
  AlertCircle,
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  ExternalLink,
  FileCheck2,
  FileText,
  HelpCircle,
  Info,
  ShieldCheck,
  UploadCloud,
  XCircle,
} from 'lucide-react';
import { schemesData } from '../../data/schemes';
import { translations } from '../../data/translations';
import { evaluationService } from '../../services/evaluationService';
import { mockSchemeEvidenceMap } from '../../data/evidenceData';
import { Language, SchemeOutcomeStatus } from '../../types';
import { NotFoundPage } from '../Common/NotFoundPage';

interface ResultDetailPageProps {
  schemeId: string;
  currentLang: Language;
  initialTab?: 'why' | 'documents';
  onNavigateBack: () => void;
  onNavigateHome: () => void;
  onNavigateToExplorer: () => void;
  onTabChange?: (tab: 'why' | 'documents') => void;
}

export const ResultDetailPage: React.FC<ResultDetailPageProps> = ({
  schemeId,
  currentLang,
  initialTab = 'why',
  onNavigateBack,
  onNavigateHome,
  onNavigateToExplorer,
  onTabChange,
}) => {
  const isTamil = currentLang === 'ta';
  const t = translations[currentLang];

  // 1. Strict Scheme Lookup - NO silent fallback to CMCHIS!
  const schemeRecord = schemesData.find((s) => s.schemeId === schemeId);
  if (!schemeRecord) {
    return (
      <NotFoundPage
        currentLang={currentLang}
        title={isTamil ? `திட்டம் '${schemeId}' காணப்படவில்லை` : `Scheme '${schemeId}' Not Found`}
        message={
          isTamil
            ? 'கோரப்பட்ட திட்ட அடையாள எண் நமது அதிகாரப்பூர்வ அட்டவணையில் இல்லை. தயவுசெய்து திட்டங்கள் பட்டியலை அணுகவும்.'
            : `The scheme ID '${schemeId}' is not registered in our scheme catalogue. Please browse available schemes.`
        }
        onNavigateHome={onNavigateHome}
        onNavigateSchemes={onNavigateToExplorer}
      />
    );
  }

  const [activeTab, setActiveTab] = useState<'why' | 'documents'>(initialTab);
  const [simulatedUploadedDocs, setSimulatedUploadedDocs] = useState<Record<string, string>>({});
  const [uploadToast, setUploadToast] = useState<string | null>(null);

  // Load evaluated result from latest evaluation
  const latestEval = evaluationService.getLatestEvaluation();
  const evalResult = latestEval.results?.find((r) => r.schemeId === schemeId);
  const detailedExplanation = latestEval.explanations?.[schemeId];
  const evidenceData = mockSchemeEvidenceMap[schemeId];

  const overallStatus: SchemeOutcomeStatus = evalResult?.status || 'conditional';

  const handleTabSwitch = (tab: 'why' | 'documents') => {
    setActiveTab(tab);
    if (onTabChange) onTabChange(tab);
  };

  const handleSimulateUpload = (docId: string, docName: string) => {
    setSimulatedUploadedDocs((prev) => ({
      ...prev,
      [docId]: `${docName.replace(/\s+/g, '_')}_scanned_copy.pdf`,
    }));
    setUploadToast(
      isTamil
        ? `'${docName}' மாதிரி ஆவணம் பதிவேற்றப்பட்டது (Demonstration)`
        : `'${docName}' document uploaded (Demonstration)`
    );
    setTimeout(() => setUploadToast(null), 3000);
  };

  const getStatusBadge = (status: SchemeOutcomeStatus) => {
    switch (status) {
      case 'matched':
        return {
          bg: 'bg-[#EAF5EA] text-[#136149] border-[#C8E5CB]',
          icon: CheckCircle2,
          labelEn: 'MATCH',
          labelTa: 'முழு தகுதி',
        };
      case 'conditional':
        return {
          bg: 'bg-[#FFF8E6] text-[#A66F00] border-[#F7E1A0]',
          icon: AlertCircle,
          labelEn: 'CONDITIONAL MATCH',
          labelTa: 'நிபந்தனையுடன் பொருந்துகிறது',
        };
      case 'insufficient':
        return {
          bg: 'bg-[#EEF4FF] text-[#2563EB] border-[#BFDBFE]',
          icon: HelpCircle,
          labelEn: 'INSUFFICIENT INFORMATION',
          labelTa: 'தகவல் தேவை',
        };
      case 'conflict':
        return {
          bg: 'bg-[#FFF1F2] text-[#E11D48] border-[#FECDD3]',
          icon: AlertTriangle,
          labelEn: 'CONFLICT',
          labelTa: 'முரண்பாடு உள்ளது',
        };
      case 'not_matched':
      default:
        return {
          bg: 'bg-[#F3F4F6] text-[#4B5563] border-[#E5E7EB]',
          icon: XCircle,
          labelEn: 'NOT MATCH',
          labelTa: 'பொருந்தவில்லை',
        };
    }
  };

  const statusBadge = getStatusBadge(overallStatus);
  const StatusIcon = statusBadge.icon;

  return (
    <div className="w-full max-w-[460px] mx-auto px-4 py-3 pb-8 text-left select-none">
      {/* Toast message */}
      {uploadToast && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-[#155B4D] text-white px-4 py-2 rounded-full text-[12px] font-bold shadow-lg animate-in fade-in duration-200">
          {uploadToast}
        </div>
      )}

      {/* Top Header */}
      <section className="flex items-center gap-2.5 mb-3">
        <button
          type="button"
          onClick={onNavigateBack}
          className="p-1 -ml-1 text-[#155B4D] hover:bg-[#E5F1E7] rounded-full transition-all cursor-pointer"
          aria-label="Back"
        >
          <ArrowLeft className="w-6 h-6 stroke-[2.4]" />
        </button>
        <div className="min-w-0">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#69756F]">
            {isTamil ? 'மதிப்பீட்டு விவரம்' : 'Result Detail'}
          </span>
          <h1
            className={`text-[#155B4D] font-bold text-[18px] sm:text-[20px] leading-tight truncate ${
              isTamil ? 'font-tamil' : ''
            }`}
          >
            {isTamil ? schemeRecord.schemeNameTa : schemeRecord.schemeName}
          </h1>
        </div>
      </section>

      {/* Scheme Outcome Hero Card */}
      <div className="bg-white rounded-[20px] border border-[#E0E6E0] p-4 shadow-2xs mb-4">
        <div className="flex items-center justify-between gap-2 mb-2">
          <span
            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold border ${statusBadge.bg}`}
          >
            <StatusIcon className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>{isTamil ? statusBadge.labelTa : statusBadge.labelEn}</span>
          </span>

          <span className="text-[11px] text-[#69756F]">
            {isTamil ? schemeRecord.administeringAuthorityTa : schemeRecord.administeringAuthority}
          </span>
        </div>

        <h2 className="text-[16px] font-bold text-[#202820] leading-snug">
          {isTamil ? schemeRecord.officialNameTa : schemeRecord.officialName}
        </h2>
        <p className="text-[12.5px] text-[#55645E] mt-1 leading-relaxed">
          {evalResult ? (isTamil ? evalResult.descTa : evalResult.descEn) : (isTamil ? schemeRecord.summaryTa : schemeRecord.summary)}
        </p>
      </div>

      {/* TWO PRIMARY TABS */}
      <div className="w-full grid grid-cols-2 p-1 bg-[#EAE5D9]/70 rounded-[16px] mb-4">
        <button
          type="button"
          onClick={() => handleTabSwitch('why')}
          className={`py-2 rounded-[13px] text-[13px] font-bold transition-all cursor-pointer text-center ${
            activeTab === 'why'
              ? 'bg-white text-[#155B4D] shadow-xs'
              : 'text-[#59635F] hover:text-[#155B4D]'
          }`}
        >
          {isTamil ? '1. முடிவு ஏன்? (விளக்கம்)' : '1. Why This Result'}
        </button>

        <button
          type="button"
          onClick={() => handleTabSwitch('documents')}
          className={`py-2 rounded-[13px] text-[13px] font-bold transition-all cursor-pointer text-center ${
            activeTab === 'documents'
              ? 'bg-white text-[#155B4D] shadow-xs'
              : 'text-[#59635F] hover:text-[#155B4D]'
          }`}
        >
          {isTamil ? '2. ஆவணங்கள் & அடுத்த படி' : '2. Documents & Next Steps'}
        </button>
      </div>

      {/* =========================================================================
          TAB 1: WHY THIS RESULT
         ========================================================================= */}
      {activeTab === 'why' && (
        <section className="space-y-4">
          {/* Conditions Evaluation List */}
          <div className="space-y-2.5">
            <h3 className="font-bold text-[14px] text-[#155B4D]">
              {isTamil ? 'தகுதி நிபந்தனைகள் ஆய்வு நிலை' : 'Conditions Evaluation Breakdown'}
            </h3>

            {detailedExplanation?.conditions && detailedExplanation.conditions.length > 0 ? (
              detailedExplanation.conditions.map((cond) => {
                const isMatched = cond.status === 'matched';
                const isCond = cond.status === 'conditional';
                const isInsuff = cond.status === 'insufficient';
                const isConf = cond.status === 'conflict';

                return (
                  <div
                    key={cond.id}
                    className="bg-white rounded-[16px] border border-[#E0E6E0] p-3.5 shadow-2xs"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-start gap-2 min-w-0">
                        {isMatched && <CheckCircle2 className="w-4.5 h-4.5 text-[#136149] shrink-0 mt-0.5" />}
                        {isCond && <AlertCircle className="w-4.5 h-4.5 text-[#A66F00] shrink-0 mt-0.5" />}
                        {isInsuff && <HelpCircle className="w-4.5 h-4.5 text-[#2563EB] shrink-0 mt-0.5" />}
                        {isConf && <AlertTriangle className="w-4.5 h-4.5 text-[#E11D48] shrink-0 mt-0.5" />}
                        {!isMatched && !isCond && !isInsuff && !isConf && (
                          <XCircle className="w-4.5 h-4.5 text-[#4B5563] shrink-0 mt-0.5" />
                        )}

                        <div>
                          <p className="font-bold text-[13px] text-[#202820] leading-snug">
                            {isTamil ? cond.textTa : cond.textEn}
                          </p>
                          <p className="text-[11.5px] text-[#69756F] mt-1 leading-relaxed">
                            {isTamil ? cond.explanationTa : cond.explanationEn}
                          </p>
                        </div>
                      </div>

                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                          isMatched
                            ? 'bg-[#EAF5EA] text-[#136149]'
                            : isCond
                            ? 'bg-[#FFF8E6] text-[#A66F00]'
                            : isInsuff
                            ? 'bg-[#EEF4FF] text-[#2563EB]'
                            : isConf
                            ? 'bg-[#FFF1F2] text-[#E11D48]'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {isTamil ? cond.statusLabelTa : cond.statusLabelEn}
                      </span>
                    </div>
                  </div>
                );
              })
            ) : (
              // Fallback conditions from schemeRecord
              schemeRecord.eligibilityEn.map((el, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-[14px] border border-[#E0E6E0] p-3 flex items-start gap-2.5 text-[12.5px]"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#155B4D] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium text-[#202820]">
                      {isTamil ? schemeRecord.eligibilityTa[idx] || el : el}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Official Source Reference & Version Card */}
          <div className="bg-[#FAF7EF] rounded-[16px] border border-[#DDD6C7] p-4 text-[12px]">
            <div className="flex items-center gap-2 text-[#155B4D] font-bold mb-1.5">
              <ShieldCheck className="w-4 h-4" />
              <span>{isTamil ? 'அதிகாரப்பூர்வ மேற்கோள் & விதிமுறை பதிப்பு' : 'Official Citation & Rule Version'}</span>
            </div>
            <p className="text-[#3A453F] leading-relaxed">
              <strong>Source:</strong> {schemeRecord.officialSource}
            </p>
            <p className="text-[#69756F] mt-0.5">
              <strong>Last Verified:</strong> {schemeRecord.sourceLastVerified} • <strong>Gazette:</strong> {schemeRecord.lastUpdated}
            </p>
            {schemeRecord.sourceUrl && (
              <a
                href={schemeRecord.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-flex items-center gap-1 font-bold text-[#155B4D] hover:underline"
              >
                <span>{isTamil ? 'அரசு இணையதளத்தைப் பார்வையிடுக' : 'Visit Official Government Portal'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </section>
      )}

      {/* =========================================================================
          TAB 2: DOCUMENTS & NEXT STEPS
         ========================================================================= */}
      {activeTab === 'documents' && (
        <section className="space-y-4">
          {/* Demonstration Notice for Upload */}
          <div className="bg-[#FFF8E6] border border-[#FBEAC0] rounded-[14px] p-3 flex items-start gap-2.5 text-[11.5px] text-[#7A5200]">
            <Info className="w-4 h-4 text-[#B87A00] shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">
                {isTamil ? 'ஆவணத் தயார்நிலை & மாதிரி பதிவேற்றம்' : 'Document Readiness & Demonstration Upload'}
              </p>
              <p className="text-[#694A06] mt-0.5">
                {isTamil
                  ? 'இது முன்மாதிரி காட்சிப்படுத்தல் ஆகும். உண்மையான விண்ணப்பத்திற்கு அரசு இ-சேவை மையம் அல்லது குறிப்பிட்ட துறை இணையதளத்தில் மூல ஆவணங்களைச் சமர்ப்பிக்க வேண்டும்.'
                  : 'Document upload in this platform is for readiness testing only. Official scheme processing takes place directly through respective department counters or e-Sevai centres.'}
              </p>
            </div>
          </div>

          {/* Required Documents List */}
          <div className="space-y-2.5">
            <h3 className="font-bold text-[14px] text-[#155B4D]">
              {isTamil ? 'தேவைப்படும் ஆவணங்கள்' : 'Required Supporting Documents'}
            </h3>

            {schemeRecord.documentsEn.map((doc, idx) => {
              const docId = `doc-${schemeId}-${idx}`;
              const docName = isTamil ? schemeRecord.documentsTa[idx] || doc : doc;
              const isUploaded = !!simulatedUploadedDocs[docId];

              return (
                <div
                  key={idx}
                  className="bg-white rounded-[16px] border border-[#E0E6E0] p-3.5 shadow-2xs"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2.5 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-[#E8F3EB] text-[#155B4D] flex items-center justify-center shrink-0 mt-0.5">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-bold text-[13.5px] text-[#202820]">{docName}</p>
                        <p className="text-[11.5px] text-[#69756F] mt-0.5">
                          {isTamil
                            ? 'அரசு தகுதி சரிபார்ப்பிற்கு அசல் அல்லது சான்றொப்பமிட்ட நகல் தேவை.'
                            : 'Required for official eligibility validation by issuing authority.'}
                        </p>
                        {isUploaded && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#155B4D] mt-1 bg-[#E8F3EB] px-2 py-0.5 rounded-full">
                            <CheckCircle2 className="w-3 h-3" />
                            {simulatedUploadedDocs[docId]}
                          </span>
                        )}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleSimulateUpload(docId, docName)}
                      className={`px-3 py-1.5 rounded-full text-[11.5px] font-bold transition-all cursor-pointer flex items-center gap-1 shrink-0 ${
                        isUploaded
                          ? 'bg-[#E8F3EB] text-[#155B4D] border border-[#CDE1D0]'
                          : 'bg-white hover:bg-[#FAF7EF] text-[#155B4D] border border-[#CBD5D0]'
                      }`}
                    >
                      <UploadCloud className="w-3.5 h-3.5" />
                      <span>{isUploaded ? (isTamil ? 'மாற்று' : 'Replace') : (isTamil ? 'பதிவேற்று' : 'Upload')}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Official Next Steps Card */}
          <div className="bg-white rounded-[18px] border border-[#E0E6E0] p-4 shadow-2xs">
            <h3 className="font-bold text-[14px] text-[#155B4D] mb-2.5">
              {isTamil ? 'அதிகாரப்பூர்வ அடுத்த கட்ட நடவடிக்கைகள்' : 'Official Application Next Steps'}
            </h3>
            <ol className="space-y-2 text-[12.5px] text-[#303833]">
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-[#155B4D] text-white flex items-center justify-center text-[10.5px] font-bold shrink-0 mt-0.5">
                  1
                </span>
                <span>
                  {isTamil
                    ? 'ஸ்மார்ட் குடும்ப அட்டை மற்றும் ஆதார் அட்டையுடன் அருகிலுள்ள இ-சேவை மையம் அல்லது வட்டாட்சியர் அலுவலகத்தை அணுகவும்.'
                    : 'Visit your nearest e-Sevai Centre, Village Administrative Office (VAO), or empanelled hospital kiosk.'}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-[#155B4D] text-white flex items-center justify-center text-[10.5px] font-bold shrink-0 mt-0.5">
                  2
                </span>
                <span>
                  {isTamil
                    ? 'ஆவணச் சரிபார்ப்பு மற்றும் கைரேகை e-KYC அங்கீகாரத்தைப் பூர்த்தி செய்யவும்.'
                    : 'Complete biometric e-KYC authentication and submit required supporting documents.'}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-[#155B4D] text-white flex items-center justify-center text-[10.5px] font-bold shrink-0 mt-0.5">
                  3
                </span>
                <span>
                  {isTamil
                    ? 'விண்ணப்ப ஒப்புகைச் சீட்டைப் பெற்று அதிகாரப்பூர்வ இணையதளத்தில் நிலையை கண்காணிக்கவும்.'
                    : 'Collect the official acknowledgement receipt and track processing status online.'}
                </span>
              </li>
            </ol>
          </div>
        </section>
      )}
    </div>
  );
};

