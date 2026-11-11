import React, { useEffect, useState } from 'react';
import {
  AlertCircle,
  AlertTriangle,
  ArrowLeft,
  Check,
  CheckCircle2,
  ChevronRight,
  Edit2,
  HeartPulse,
  Home,
  GraduationCap,
  Info,
  Loader2,
  Search,
  ShieldCheck,
  Sparkles,
  Sprout,
  User,
  Users,
} from 'lucide-react';
import { translations } from '../../data/translations';
import { evaluationService } from '../../services/evaluationService';
import { householdService } from '../../services/householdService';
import { Language } from '../../types';

interface EligibilityCheckWorkflowProps {
  currentLang: Language;
  initialStep?: 1 | 2 | 3;
  onNavigateBack: () => void;
  onNavigateHome: () => void;
  onNavigateToHousehold: () => void;
  onNavigateToMemberQuestionnaire: (memberId: string) => void;
  onCompleteEvaluation: () => void;
  onOpenLanguage: () => void;
}

export const EligibilityCheckWorkflow: React.FC<EligibilityCheckWorkflowProps> = ({
  currentLang,
  initialStep = 1,
  onNavigateBack,
  onNavigateHome,
  onNavigateToHousehold,
  onNavigateToMemberQuestionnaire,
  onCompleteEvaluation,
}) => {
  const isTamil = currentLang === 'ta';
  const t = translations[currentLang];

  const [step, setStep] = useState<1 | 2 | 3>(initialStep);
  const [householdState, setHouseholdState] = useState(() => householdService.getState());
  const [hasAcknowledged, setHasAcknowledged] = useState(true);

  // Selected categories state
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    'health',
    'education',
    'agriculture',
    'social',
  ]);

  // Evaluation animation step state
  const [evalProgress, setEvalProgress] = useState(0);
  const [evalStageText, setEvalStageText] = useState('');

  const completeness = householdService.calculateCompleteness();

  const categoriesList = [
    {
      id: 'health',
      labelEn: 'Health & Medical',
      labelTa: 'மருத்துவம் & காப்பீடு',
      icon: HeartPulse,
    },
    {
      id: 'education',
      labelEn: 'Education & Scholarships',
      labelTa: 'கல்வி & உதவித்தொகை',
      icon: GraduationCap,
    },
    {
      id: 'agriculture',
      labelEn: 'Agriculture & Farming',
      labelTa: 'வேளாண்மை & உழவர் நலன்',
      icon: Sprout,
    },
    {
      id: 'social',
      labelEn: 'Social Security & Pension',
      labelTa: 'சமூக பாதுகாப்பு & ஓய்வூதியம்',
      icon: Users,
    },
    {
      id: 'housing',
      labelEn: 'Housing & Shelter',
      labelTa: 'வீட்டு வசதி & இருப்பிடம்',
      icon: Home,
    },
    {
      id: 'income',
      labelEn: 'Income & Livelihood Grants',
      labelTa: 'வருமானம் & வாழ்வாதாரம்',
      icon: Sparkles,
    },
  ];

  const toggleCategory = (catId: string) => {
    setSelectedCategories((prev) => {
      if (prev.includes(catId)) {
        if (prev.length === 1) return prev; // keep at least one
        return prev.filter((id) => id !== catId);
      }
      return [...prev, catId];
    });
  };

  // Step 3 evaluation animation runner
  useEffect(() => {
    if (step === 3) {
      setEvalProgress(10);
      setEvalStageText(
        isTamil
          ? 'குடும்ப ஆண்டு வருமானம் மற்றும் குடியிருப்பு விவரங்கள் சரிபார்க்கப்படுகின்றன...'
          : 'Verifying household income and residency rules...'
      );

      const t1 = setTimeout(() => {
        setEvalProgress(45);
        setEvalStageText(
          isTamil
            ? 'தேர்ந்தெடுக்கப்பட்ட நல வகைகளுடன் குடும்ப உறுப்பினர்கள் பொருத்தப்படுகிறார்கள்...'
            : 'Matching household members with selected welfare categories...'
        );
      }, 700);

      const t2 = setTimeout(() => {
        setEvalProgress(80);
        setEvalStageText(
          isTamil
            ? 'அரசு ஆவணங்கள் மற்றும் சான்றிதழ் தகுதிகள் தொகுக்கப்படுகின்றன...'
            : 'Synthesizing evidence readiness and official citations...'
        );
      }, 1400);

      const t3 = setTimeout(() => {
        setEvalProgress(100);
        evaluationService.runEvaluation(selectedCategories);
        onCompleteEvaluation();
      }, 2100);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
      };
    }
  }, [step, selectedCategories, isTamil, onCompleteEvaluation]);

  return (
    <div className="w-full max-w-[460px] mx-auto px-4 py-3 pb-8 text-left select-none">
      {/* Top Workflow Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={() => {
            if (step === 2) setStep(1);
            else onNavigateBack();
          }}
          className="p-1 -ml-1 text-[#155B4D] hover:bg-[#E5F1E7] rounded-full transition-all cursor-pointer"
          aria-label="Back"
        >
          <ArrowLeft className="w-5.5 h-5.5 stroke-[2.4]" />
        </button>

        {/* Step Progress Pill */}
        <div className="flex items-center gap-1.5 bg-[#FAF7EF] border border-[#DDD6C7] px-3 py-1 rounded-full text-[11.5px] font-bold text-[#155B4D]">
          <span>{isTamil ? 'படிநிலை' : 'Step'}</span>
          <span className="w-4.5 h-4.5 rounded-full bg-[#155B4D] text-white flex items-center justify-center text-[10px]">
            {step}
          </span>
          <span className="text-[#88948D]">/ 3</span>
        </div>
      </div>

      {/* Workflow Step Tracker */}
      <div className="w-full grid grid-cols-3 gap-1.5 mb-5">
        <div className={`h-1.5 rounded-full ${step >= 1 ? 'bg-[#155B4D]' : 'bg-[#D2DDD6]'}`} />
        <div className={`h-1.5 rounded-full ${step >= 2 ? 'bg-[#155B4D]' : 'bg-[#D2DDD6]'}`} />
        <div className={`h-1.5 rounded-full ${step >= 3 ? 'bg-[#155B4D]' : 'bg-[#D2DDD6]'}`} />
      </div>

      {/* =========================================================================
          STEP 1: REVIEW AND CONFIRM
         ========================================================================= */}
      {step === 1 && (
        <section className="space-y-4">
          <div>
            <h1
              className={`text-[#155B4D] font-bold text-[22px] sm:text-[24px] leading-tight ${
                isTamil ? 'font-tamil' : ''
              }`}
            >
              {isTamil ? 'விவரங்களை மதிப்பாய்வு செய்க' : 'Review & Confirm Information'}
            </h1>
            <p className="text-[#59635F] text-[13px] mt-1 leading-snug">
              {isTamil
                ? 'தகுதி மதிப்பீடு செய்வதற்கு முன் உங்கள் குடும்ப விவரங்களை உறுதிப்படுத்தவும்.'
                : 'Confirm your saved household and individual member facts before evaluating scheme eligibility.'}
            </p>
          </div>

          {/* Household Summary Card */}
          <div className="bg-white rounded-[18px] border border-[#E0E6E0] p-4 shadow-2xs">
            <div className="flex items-center justify-between pb-2.5 border-b border-[#EAEFEA] mb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-[8px] bg-[#E8F3EB] text-[#155B4D] flex items-center justify-center">
                  <Home className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-[14px] text-[#155B4D]">
                  {isTamil ? 'குடும்ப விவரங்கள்' : 'Household Overview'}
                </h3>
              </div>
              <button
                type="button"
                onClick={onNavigateToHousehold}
                className="text-[12px] font-bold text-[#155B4D] flex items-center gap-1 hover:underline cursor-pointer"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>{isTamil ? 'திருத்து' : 'Edit'}</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2.5 text-[12px]">
              <div>
                <span className="text-[#6D7772] block">{isTamil ? 'குடும்பத் தலைவர்' : 'Head of Family'}</span>
                <span className="font-bold text-[#202820]">{householdState.profile.headName}</span>
              </div>
              <div>
                <span className="text-[#6D7772] block">{isTamil ? 'குடும்ப அட்டை' : 'Smart Ration Card'}</span>
                <span className="font-bold text-[#202820]">{householdState.profile.rationCardNumber}</span>
              </div>
              <div>
                <span className="text-[#6D7772] block">{isTamil ? 'ஆண்டு வருமானம்' : 'Annual Income'}</span>
                <span className="font-bold text-[#155B4D]">
                  ₹{householdState.profile.annualIncome.toLocaleString('en-IN')}
                </span>
              </div>
              <div>
                <span className="text-[#6D7772] block">{isTamil ? 'மாவட்டம் & வட்டம்' : 'District & Taluk'}</span>
                <span className="font-bold text-[#202820]">
                  {householdState.profile.district}, {householdState.profile.taluk}
                </span>
              </div>
            </div>
          </div>

          {/* Members List Section */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-[14px] text-[#155B4D]">
                {isTamil ? 'குடும்ப உறுப்பினர்கள்' : 'Household Members'} ({householdState.members.length})
              </h3>
              <button
                type="button"
                onClick={onNavigateToHousehold}
                className="text-[12px] font-bold text-[#155B4D] hover:underline cursor-pointer"
              >
                {isTamil ? 'அனைவரையும் காண்க' : 'Manage All'}
              </button>
            </div>

            {householdState.members.map((m) => {
              const q = householdState.memberProfiles[m.id];
              const isQComplete = q && q.fullName && q.occupationType;
              return (
                <div
                  key={m.id}
                  className="bg-white rounded-[14px] border border-[#E0E6E0] p-3 flex items-center justify-between gap-3 shadow-2xs"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-full bg-[#FAF7EF] border border-[#D5DDD7] flex items-center justify-center font-bold text-[12px] text-[#155B4D] shrink-0">
                      {m.name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-[13.5px] text-[#202820] truncate">
                        {isTamil ? m.nameTa || m.name : m.name}
                      </p>
                      <p className="text-[11.5px] text-[#6D7772]">
                        {isTamil ? m.relationTa : m.relation} • {m.age} {isTamil ? 'வயது' : 'yrs'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className={`text-[10.5px] font-semibold px-2 py-0.5 rounded-full ${
                        isQComplete
                          ? 'bg-[#E8F3EB] text-[#155B4D]'
                          : 'bg-[#FFF8E6] text-[#A66F00]'
                      }`}
                    >
                      {isQComplete
                        ? (isTamil ? 'பூர்த்தி செய்யப்பட்டது' : 'Profile Ready')
                        : (isTamil ? 'தகவல் தேவை' : 'Details Pending')}
                    </span>

                    <button
                      type="button"
                      onClick={() => onNavigateToMemberQuestionnaire(m.id)}
                      className="p-1 text-[#155B4D] hover:bg-[#E8F3EB] rounded-full cursor-pointer"
                      title="Edit member questionnaire"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Missing or Incomplete Facts Notice */}
          {completeness.missingFields.length > 0 && (
            <div className="bg-[#FFF8E6] border border-[#F5E2B3] rounded-[16px] p-3.5 flex items-start gap-2.5">
              <AlertCircle className="w-4.5 h-4.5 text-[#B87A00] shrink-0 mt-0.5" />
              <div>
                <p className="text-[12.5px] font-bold text-[#7A5200]">
                  {isTamil ? 'விடுபட்ட விவரங்கள் (விருப்பத் தேர்வு)' : 'Incomplete Information (Optional)'}
                </p>
                <p className="text-[11.5px] text-[#694A06] mt-0.5 leading-snug">
                  {isTamil
                    ? `சில விவரங்கள் பூர்த்தி செய்யப்படவில்லை: ${completeness.missingFields.slice(0, 2).join(', ')}. விடுபட்ட விவரங்களுடன் நீங்கள் மதிப்பீட்டைத் தொடரலாம்.`
                    : `Some details are still unrecorded: ${completeness.missingFields.slice(0, 2).join(', ')}. You can still evaluate schemes with provisional status.`}
                </p>
              </div>
            </div>
          )}

          {/* Acknowledgment Checkbox */}
          <label className="flex items-start gap-2.5 p-3 rounded-[14px] bg-[#FAF7EF] border border-[#DDD6C7] cursor-pointer">
            <input
              type="checkbox"
              checked={hasAcknowledged}
              onChange={(e) => setHasAcknowledged(e.target.checked)}
              className="mt-0.5 w-4 h-4 text-[#155B4D] rounded accent-[#155B4D]"
            />
            <span className="text-[12px] text-[#3A453F] leading-snug">
              {isTamil
                ? 'இங்கு குறிப்பிடப்பட்டுள்ள விவரங்கள் எனது குடும்பத் தகவல்களை துல்லியமாக பிரதிபலிக்கின்றன என்பதை உறுதிப்படுத்துகிறேன்.'
                : 'I confirm that the household details shown here are accurate for evaluation purposes.'}
            </span>
          </label>

          {/* Proceed Button */}
          <button
            type="button"
            disabled={!hasAcknowledged}
            onClick={() => setStep(2)}
            className={`w-full py-3.5 rounded-[14px] font-bold text-[14px] flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs ${
              hasAcknowledged
                ? 'bg-[#155B4D] hover:bg-[#10483D] text-white active:scale-[0.99]'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            <span>{isTamil ? 'நலத்திட்ட வகைகளைத் தேர்வு செய்க →' : 'Choose Welfare Areas →'}</span>
          </button>
        </section>
      )}

      {/* =========================================================================
          STEP 2: CHOOSE WELFARE AREAS
         ========================================================================= */}
      {step === 2 && (
        <section className="space-y-4">
          <div>
            <h1
              className={`text-[#155B4D] font-bold text-[22px] sm:text-[24px] leading-tight ${
                isTamil ? 'font-tamil' : ''
              }`}
            >
              {isTamil ? 'நலத்திட்ட வகைகளைத் தேர்வு செய்க' : 'Choose Welfare Areas'}
            </h1>
            <p className="text-[#59635F] text-[13px] mt-1 leading-snug">
              {isTamil
                ? 'உங்கள் குடும்பத்திற்கு முன்னுரிமை அளிக்கப்பட வேண்டிய பகுதிகளைத் தேர்ந்தெடுக்கவும்.'
                : 'Select the welfare categories you want the platform to prioritize in your personalized results.'}
            </p>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-2 gap-2.5">
            {categoriesList.map((cat) => {
              const Icon = cat.icon;
              const isSelected = selectedCategories.includes(cat.id);
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => toggleCategory(cat.id)}
                  className={`p-3.5 rounded-[16px] border text-left flex flex-col justify-between h-[96px] transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#155B4D] bg-[#EFF6ED] ring-1 ring-[#155B4D] shadow-2xs'
                      : 'border-[#DEE3DF] bg-white hover:border-[#CBD3CE]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <Icon className={`w-5 h-5 ${isSelected ? 'text-[#155B4D]' : 'text-[#59635F]'}`} />
                    <div
                      className={`w-4 h-4 rounded-[4px] flex items-center justify-center text-white ${
                        isSelected ? 'bg-[#155B4D]' : 'border border-[#CBD5D0] bg-white'
                      }`}
                    >
                      {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                    </div>
                  </div>

                  <span
                    className={`text-[12.5px] font-bold ${
                      isSelected ? 'text-[#155B4D]' : 'text-[#202820]'
                    } ${isTamil ? 'font-tamil' : ''}`}
                  >
                    {isTamil ? cat.labelTa : cat.labelEn}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Information Notice */}
          <div className="bg-[#FFF5D9] rounded-[14px] p-3 border border-[#FBEAC0] flex items-start gap-2.5 text-[12px] text-[#3B3224]">
            <Info className="w-4 h-4 text-[#D98200] shrink-0 mt-0.5" />
            <p>
              {isTamil
                ? 'வகை தேர்வு உங்கள் குடும்பத் தகுதியை மாற்றாது; மதிப்பீட்டு முடிவுகளில் தொடர்புடைய திட்டங்களை வரிசைப்படுத்த உதவும்.'
                : 'Selecting categories influences scheme matching focus and prioritizes results based on available official rules.'}
            </p>
          </div>

          {/* Start Evaluation Button */}
          <button
            type="button"
            onClick={() => setStep(3)}
            className="w-full py-3.5 bg-[#155B4D] hover:bg-[#10483D] active:scale-[0.99] text-white font-bold rounded-[14px] text-[14.5px] flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
          >
            <Search className="w-4.5 h-4.5 stroke-[2.4]" />
            <span>{isTamil ? 'தகுதி மதிப்பீட்டைத் தொடங்குக' : 'Run Eligibility Assessment'}</span>
          </button>
        </section>
      )}

      {/* =========================================================================
          STEP 3: EVALUATING
         ========================================================================= */}
      {step === 3 && (
        <section className="py-8 flex flex-col items-center justify-center text-center space-y-5">
          <div className="relative w-20 h-20 rounded-full bg-[#E5F1E7] flex items-center justify-center text-[#155B4D]">
            <Loader2 className="w-10 h-10 animate-spin stroke-[2.2]" />
            <div className="absolute inset-0 rounded-full border-4 border-[#155B4D] border-t-transparent animate-spin" />
          </div>

          <div>
            <h2
              className={`text-[#155B4D] font-bold text-[20px] sm:text-[22px] ${
                isTamil ? 'font-tamil' : ''
              }`}
            >
              {isTamil ? 'தகுதி மதிப்பீடு செய்யப்படுகிறது...' : 'Evaluating Scheme Eligibility...'}
            </h2>
            <p className="text-[#59635F] text-[13px] mt-1.5 max-w-xs mx-auto leading-relaxed">
              {evalStageText}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="w-full max-w-[280px] bg-[#E0E6E0] h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-[#155B4D] h-full transition-all duration-500 rounded-full"
              style={{ width: `${evalProgress}%` }}
            />
          </div>

          <p className="text-[11px] text-[#7A8680] font-medium">
            {isTamil
              ? 'சுயாதீன விதிமுறைகளின் அடிப்படையில் ஆய்வு செய்யப்படுகிறது.'
              : 'Synthesizing verified criteria against official gazettes...'}
          </p>
        </section>
      )}
    </div>
  );
};

