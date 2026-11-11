import React, { useState } from 'react';
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  FileText,
  HeartPulse,
  Home,
  Info,
  LayoutGrid,
  Search,
  Sparkles,
  Users,
} from 'lucide-react';
import { translations } from '../../data/translations';
import { evaluationService } from '../../services/evaluationService';
import { householdService } from '../../services/householdService';
import { HouseholdMember, Language } from '../../types';
import { DashboardHero } from './DashboardHero';
import { HouseholdCard } from './HouseholdCard';
import { ProfileCompletionCard } from './ProfileCompletionCard';
import { QuickActionsGrid } from './QuickActionsGrid';
import { RecommendedSchemesSection } from './RecommendedSchemesSection';

interface CitizenDashboardProps {
  currentLang: Language;
  onOpenLanguage: () => void;
  onNavigateToExplorer: () => void;
  onNavigateToScheme: (schemeId: string) => void;
  onNavigateToLanding: () => void;
  onNavigateToHousehold?: () => void;
  onNavigateToProfile?: () => void;
  onNavigateToAccount?: () => void;
  onNavigateToResults?: () => void;
  onNavigateToCheck?: () => void;
  householdMembers?: HouseholdMember[];
  onUpdateMembers?: (members: HouseholdMember[]) => void;
}

export const CitizenDashboard: React.FC<CitizenDashboardProps> = ({
  currentLang,
  onNavigateToExplorer,
  onNavigateToScheme,
  onNavigateToHousehold,
  onNavigateToProfile,
  onNavigateToAccount,
  onNavigateToResults,
  onNavigateToCheck,
}) => {
  const isTamil = currentLang === 'ta';
  const t = translations[currentLang];

  const householdState = householdService.getState();
  const completeness = householdService.calculateCompleteness();
  const latestEvaluation = evaluationService.getLatestEvaluation();

  const handleHouseholdAction = onNavigateToHousehold || (() => {});
  const handleProfileAction = onNavigateToProfile || (() => {});
  const handleResultsAction = onNavigateToResults || (() => {});
  const handleCheckAction = onNavigateToCheck || onNavigateToExplorer;

  return (
    <div className="w-full max-w-[460px] mx-auto px-4 py-2 pb-6 text-left select-none flex flex-col justify-start">
      {/* 1. HERO GREETING WITH SECRETARIAT ILLUSTRATION */}
      <DashboardHero
        currentLang={currentLang}
        citizenName={householdState.profile.headName.split(' ')[0] || 'Citizen'}
        citizenNameTa={householdState.profile.headNameTa?.split(' ')[0] || 'குடிமகன்'}
      />

      {/* 2. REAL HOUSEHOLD SUMMARY CARD */}
      <HouseholdCard
        currentLang={currentLang}
        memberCount={householdState.members.length}
        onOpenHousehold={handleHouseholdAction}
      />

      {/* 3. REAL PROGRESS / COMPLETION CARD */}
      <ProfileCompletionCard
        currentLang={currentLang}
        completionPercentage={completeness.percentage}
        onOpenProfile={handleProfileAction}
      />

      {/* 4. REAL CONTINUE / RESUME CARD */}
      <section className="w-full my-3">
        <div className="w-full bg-gradient-to-r from-[#155B4D] to-[#1D7463] text-white rounded-[22px] p-4 shadow-sm flex items-center justify-between gap-3">
          <div className="min-w-0 flex-1">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-full inline-block mb-1">
              {completeness.percentage < 100
                ? (isTamil ? 'அடுத்த படி' : 'Next Step')
                : (isTamil ? 'தயாராக உள்ளது' : 'Ready to Evaluate')}
            </span>
            <h3 className="font-bold text-[15px] sm:text-[16px] leading-tight">
              {completeness.percentage < 100
                ? (isTamil ? 'குடும்ப விவரங்களை பூர்த்தி செய்க' : 'Complete Questionnaire')
                : (isTamil ? 'தகுதி ஆய்வை இயக்குக' : 'Run Eligibility Check')}
            </h3>
            <p className="text-[11.5px] text-white/80 mt-0.5 leading-snug">
              {completeness.percentage < 100
                ? (isTamil
                    ? 'விடுபட்ட விவரங்களை உள்ளிட்டு கூடுதல் திட்டங்களைக் கண்டறியவும்.'
                    : 'Fill pending answers to evaluate matching state schemes.')
                : (isTamil
                    ? 'உங்கள் குடும்ப சுயவிவரத்திற்கு தகுதியான திட்டங்களை ஆய்வு செய்யவும்.'
                    : 'Discover personalized scheme benefits tailored to your household.')}
            </p>
          </div>

          <button
            type="button"
            onClick={completeness.percentage < 100 ? handleProfileAction : handleCheckAction}
            className="w-10 h-10 rounded-full bg-[#FCE8A2] text-[#155B4D] flex items-center justify-center shrink-0 shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
            aria-label="Continue workflow"
          >
            <ArrowRight className="w-5 h-5 stroke-[2.6]" />
          </button>
        </div>
      </section>

      {/* 5. LATEST EVALUATION SUMMARY CARD (If an evaluation exists) */}
      {latestEvaluation && latestEvaluation.results?.length > 0 && (
        <section className="w-full my-1">
          <div
            onClick={handleResultsAction}
            className="w-full bg-white rounded-[20px] p-3.5 border border-[#DFEBE1] shadow-2xs hover:bg-[#FAFDF9] transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <ClipboardCheck className="w-4 h-4 text-[#155B4D]" />
                <span className="font-bold text-[13px] text-[#155B4D]">
                  {isTamil ? 'சமீபத்திய தகுதி ஆய்வு முடிவுகள்' : 'Latest Evaluation Summary'}
                </span>
              </div>
              <span className="text-[10.5px] text-[#88948D]">{latestEvaluation.evaluatedAt}</span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-[11px] font-bold">
              <div className="p-2 rounded-[10px] bg-[#EAF5EA] text-[#136149]">
                <span className="text-[15px] block leading-none">
                  {latestEvaluation.results.filter((r) => r.status === 'matched').length}
                </span>
                <span className="text-[9.5px] mt-0.5 block">{isTamil ? 'முழு தகுதி' : 'MATCH'}</span>
              </div>
              <div className="p-2 rounded-[10px] bg-[#FFF8E6] text-[#A66F00]">
                <span className="text-[15px] block leading-none">
                  {latestEvaluation.results.filter((r) => r.status === 'conditional').length}
                </span>
                <span className="text-[9.5px] mt-0.5 block">{isTamil ? 'நிபந்தனை' : 'CONDITIONAL'}</span>
              </div>
              <div className="p-2 rounded-[10px] bg-[#EEF4FF] text-[#2563EB]">
                <span className="text-[15px] block leading-none">
                  {latestEvaluation.results.filter((r) => r.status === 'insufficient' || r.status === 'conflict').length}
                </span>
                <span className="text-[9.5px] mt-0.5 block">{isTamil ? 'ஆய்வு தேவை' : 'PENDING'}</span>
              </div>
            </div>

            <div className="mt-2.5 pt-2 border-t border-[#F0EBE0] flex items-center justify-between text-[11.5px] text-[#155B4D] font-bold">
              <span>{isTamil ? 'முழு முடிவுகளைக் காண்க' : 'View Full Evaluation Breakdown'}</span>
              <ChevronRight className="w-4 h-4 stroke-[2.4] group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        </section>
      )}

      {/* 6. QUICK ACTIONS GRID */}
      <QuickActionsGrid
        currentLang={currentLang}
        onManageHousehold={handleHouseholdAction}
        onUpdateProfile={handleProfileAction}
        onExploreSchemes={onNavigateToExplorer}
        onMyResults={handleResultsAction}
      />

      {/* 7. RECOMMENDED SCHEMES SECTION */}
      <RecommendedSchemesSection
        currentLang={currentLang}
        onViewAll={onNavigateToExplorer}
        onSelectScheme={onNavigateToScheme}
      />
    </div>
  );
};
