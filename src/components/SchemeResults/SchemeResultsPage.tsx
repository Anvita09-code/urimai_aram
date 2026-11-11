import React, { useState } from 'react';
import {
  AlertCircle,
  AlertTriangle,
  ArrowLeft,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock,
  Filter,
  GraduationCap,
  HeartPulse,
  HelpCircle,
  Home,
  ListFilter,
  RotateCcw,
  Sparkles,
  Sprout,
  Users,
  XCircle,
} from 'lucide-react';
import { translations } from '../../data/translations';
import { evaluationService } from '../../services/evaluationService';
import { EvaluatedSchemeResult, Language, SchemeOutcomeStatus } from '../../types';

interface SchemeResultsPageProps {
  currentLang: Language;
  onNavigateBack: () => void;
  onNavigateHome: () => void;
  onNavigateToScheme: (schemeId: string) => void;
  onStartNewCheck: () => void;
  onOpenLanguage: () => void;
}

type FilterOption = 'all' | SchemeOutcomeStatus;

export const SchemeResultsPage: React.FC<SchemeResultsPageProps> = ({
  currentLang,
  onNavigateBack,
  onNavigateHome,
  onNavigateToScheme,
  onStartNewCheck,
}) => {
  const isTamil = currentLang === 'ta';
  const t = translations[currentLang];

  const evaluations = evaluationService.getEvaluations();
  const [selectedEvalId, setSelectedEvalId] = useState<string>(evaluations[0]?.id || 'eval-default');
  const [activeFilter, setActiveFilter] = useState<FilterOption>('all');

  const currentEval = evaluations.find((e) => e.id === selectedEvalId) || evaluations[0] || evaluationService.generateDefaultEvaluation();
  const results = currentEval.results || [];

  // Filter counts
  const countMatched = results.filter((r) => r.status === 'matched').length;
  const countConditional = results.filter((r) => r.status === 'conditional').length;
  const countInsufficient = results.filter((r) => r.status === 'insufficient').length;
  const countConflict = results.filter((r) => r.status === 'conflict').length;
  const countNotMatched = results.filter((r) => r.status === 'not_matched').length;

  const filteredResults = results.filter((r) => {
    if (activeFilter === 'all') return true;
    return r.status === activeFilter;
  });

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

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'health':
        return HeartPulse;
      case 'education':
        return GraduationCap;
      case 'agriculture':
        return Sprout;
      case 'housing':
        return Home;
      default:
        return Users;
    }
  };

  return (
    <div className="w-full max-w-[460px] mx-auto px-4 py-3 pb-8 text-left select-none">
      {/* Top Header */}
      <section className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={onNavigateBack}
            className="p-1 -ml-1 text-[#155B4D] hover:bg-[#E5F1E7] rounded-full transition-all cursor-pointer"
            aria-label="Back"
          >
            <ArrowLeft className="w-6 h-6 stroke-[2.4]" />
          </button>
          <div>
            <h1
              className={`text-[#155B4D] font-bold text-[22px] sm:text-[24px] leading-tight ${
                isTamil ? 'font-tamil' : ''
              }`}
            >
              {isTamil ? 'என் தகுதி முடிவுகள்' : 'My Eligibility Results'}
            </h1>
            <p className="text-[#59635F] text-[12px] mt-0.5">
              {isTamil ? `மதிப்பீட்டு தேதி: ${currentEval.evaluatedAtTa}` : `Evaluation Date: ${currentEval.evaluatedAt}`}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onStartNewCheck}
          className="flex items-center gap-1 px-3 py-1.5 bg-[#E8F3EB] hover:bg-[#DDF0E1] text-[#155B4D] text-[11.5px] font-bold rounded-full transition-all border border-[#CDE1D0] cursor-pointer shrink-0"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>{isTamil ? 'மீண்டும் ஆய்வு' : 'Re-check'}</span>
        </button>
      </section>

      {/* Evaluations Selector (if multiple evaluations exist) */}
      {evaluations.length > 1 && (
        <div className="mb-3 flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          <span className="text-[11px] font-bold text-[#69756F] uppercase shrink-0">
            {isTamil ? 'முந்தைய ஆய்வுகள்:' : 'History:'}
          </span>
          {evaluations.map((ev, idx) => (
            <button
              key={ev.id}
              onClick={() => setSelectedEvalId(ev.id)}
              className={`px-2.5 py-1 rounded-full text-[11px] font-semibold shrink-0 cursor-pointer transition-all ${
                selectedEvalId === ev.id
                  ? 'bg-[#155B4D] text-white shadow-2xs'
                  : 'bg-white border border-[#D5DDD7] text-[#55645E]'
              }`}
            >
              {idx === 0 ? (isTamil ? 'சமீபத்தியது' : 'Latest') : ev.evaluatedAt}
            </button>
          ))}
        </div>
      )}

      {/* Outcome Category Filters Carousel / Grid */}
      <section className="mb-4">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 no-scrollbar">
          <button
            type="button"
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1.5 rounded-full text-[11.5px] font-bold shrink-0 transition-all cursor-pointer ${
              activeFilter === 'all'
                ? 'bg-[#155B4D] text-white shadow-xs'
                : 'bg-white text-[#202820] border border-[#D5DDD7] hover:bg-[#FAF7EF]'
            }`}
          >
            {isTamil ? 'அனைத்தும்' : 'All'} ({results.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveFilter('matched')}
            className={`px-2.5 py-1.5 rounded-full text-[11px] font-bold shrink-0 transition-all cursor-pointer ${
              activeFilter === 'matched'
                ? 'bg-[#136149] text-white shadow-xs'
                : 'bg-[#EAF5EA] text-[#136149] border border-[#C8E5CB]'
            }`}
          >
            {isTamil ? 'முழு தகுதி' : 'MATCH'} ({countMatched})
          </button>

          <button
            type="button"
            onClick={() => setActiveFilter('conditional')}
            className={`px-2.5 py-1.5 rounded-full text-[11px] font-bold shrink-0 transition-all cursor-pointer ${
              activeFilter === 'conditional'
                ? 'bg-[#A66F00] text-white shadow-xs'
                : 'bg-[#FFF8E6] text-[#A66F00] border border-[#F7E1A0]'
            }`}
          >
            {isTamil ? 'நிபந்தனை' : 'CONDITIONAL'} ({countConditional})
          </button>

          <button
            type="button"
            onClick={() => setActiveFilter('insufficient')}
            className={`px-2.5 py-1.5 rounded-full text-[11px] font-bold shrink-0 transition-all cursor-pointer ${
              activeFilter === 'insufficient'
                ? 'bg-[#2563EB] text-white shadow-xs'
                : 'bg-[#EEF4FF] text-[#2563EB] border border-[#BFDBFE]'
            }`}
          >
            {isTamil ? 'தகவல் தேவை' : 'INSUFFICIENT'} ({countInsufficient})
          </button>

          <button
            type="button"
            onClick={() => setActiveFilter('conflict')}
            className={`px-2.5 py-1.5 rounded-full text-[11px] font-bold shrink-0 transition-all cursor-pointer ${
              activeFilter === 'conflict'
                ? 'bg-[#E11D48] text-white shadow-xs'
                : 'bg-[#FFF1F2] text-[#E11D48] border border-[#FECDD3]'
            }`}
          >
            {isTamil ? 'முரண்பாடு' : 'CONFLICT'} ({countConflict})
          </button>

          <button
            type="button"
            onClick={() => setActiveFilter('not_matched')}
            className={`px-2.5 py-1.5 rounded-full text-[11px] font-bold shrink-0 transition-all cursor-pointer ${
              activeFilter === 'not_matched'
                ? 'bg-[#4B5563] text-white shadow-xs'
                : 'bg-[#F3F4F6] text-[#4B5563] border border-[#E5E7EB]'
            }`}
          >
            {isTamil ? 'பொருந்தவில்லை' : 'NOT MATCH'} ({countNotMatched})
          </button>
        </div>
      </section>

      {/* Results List */}
      <section className="space-y-3">
        {filteredResults.length === 0 ? (
          <div className="bg-white rounded-[18px] border border-[#E0E6E0] p-6 text-center">
            <AlertCircle className="w-8 h-8 text-[#9AA6A0] mx-auto mb-2" />
            <p className="font-bold text-[14px] text-[#202820]">
              {isTamil ? 'இந்த வகையில் திட்டங்கள் இல்லை' : 'No schemes match this outcome filter'}
            </p>
            <p className="text-[12px] text-[#69756F] mt-1">
              {isTamil ? 'அனைத்து திட்டங்களையும் காண "அனைத்தும்" என்பதைத் தேர்வு செய்யவும்.' : 'Select "All" to view all evaluated schemes.'}
            </p>
          </div>
        ) : (
          filteredResults.map((scheme) => {
            const badge = getStatusBadge(scheme.status);
            const BadgeIcon = badge.icon;
            const CategoryIcon = getCategoryIcon(scheme.category);

            return (
              <article
                key={scheme.id}
                onClick={() => onNavigateToScheme(scheme.schemeId)}
                className="w-full bg-white hover:bg-[#FFFDF9] active:scale-[0.99] rounded-[20px] p-4 border border-[#E5ECE5] shadow-2xs transition-all cursor-pointer text-left group"
              >
                {/* Top Row: Category Icon & Status Badge */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-1.5 text-[11.5px] font-semibold text-[#155B4D]">
                    <div className="w-6 h-6 rounded-md bg-[#E8F3EB] flex items-center justify-center">
                      <CategoryIcon className="w-3.5 h-3.5" />
                    </div>
                    <span className="capitalize">{scheme.category}</span>
                  </div>

                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10.5px] font-bold border ${badge.bg}`}
                  >
                    <BadgeIcon className="w-3 h-3 stroke-[2.5]" />
                    <span>{isTamil ? badge.labelTa : badge.labelEn}</span>
                  </span>
                </div>

                {/* Scheme Title & Dept */}
                <h3
                  className={`font-bold text-[15.5px] sm:text-[16.5px] text-[#155B4D] group-hover:text-[#10483D] transition-colors leading-snug ${
                    isTamil ? 'font-tamil' : ''
                  }`}
                >
                  {isTamil ? scheme.titleTa : scheme.titleEn}
                </h3>
                <p className="text-[11.5px] text-[#69756F] mt-0.5 line-clamp-1">
                  {isTamil ? scheme.deptTa : scheme.deptEn}
                </p>

                {/* Short Understandable Explanation */}
                <div className="mt-2.5 p-2.5 bg-[#FAF7EF] rounded-[12px] border border-[#ECE5D8] text-[12px] text-[#2F3E37] leading-relaxed">
                  {isTamil ? scheme.descTa : scheme.descEn}
                </div>

                {/* Action Link Footer */}
                <div className="mt-3 pt-2.5 border-t border-[#F0EBE0] flex items-center justify-between text-[12px]">
                  <span className="text-[#69756F]">
                    {isTamil ? 'முழு விவரம் & ஆவணங்கள்' : 'Why This Result & Documents'}
                  </span>
                  <div className="flex items-center gap-1 font-bold text-[#155B4D] group-hover:translate-x-0.5 transition-transform">
                    <span>{isTamil ? 'காண்க' : 'View Details'}</span>
                    <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                  </div>
                </div>
              </article>
            );
          })
        )}
      </section>
    </div>
  );
};
