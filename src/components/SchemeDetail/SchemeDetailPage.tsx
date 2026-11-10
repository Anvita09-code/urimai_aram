import React, { useState } from 'react';
import {
  Bookmark,
  Building2,
  Calendar,
  CreditCard,
  FileCheck,
  FileText,
  Fingerprint,
  Globe,
  GraduationCap,
  Heart,
  HeartHandshake,
  Home,
  Info,
  Layers,
  PhoneCall,
  ShieldCheck,
  Sprout,
  Target,
  TrendingUp,
  Users,
} from 'lucide-react';
import { schemesData } from '../../data/schemes';
import { Language, SchemeCategory } from '../../types';

interface SchemeDetailPageProps {
  schemeId: string;
  currentLang: Language;
  isSaved: boolean;
  origin?: 'explorer' | 'dashboard';
  onToggleSave: (schemeId: string) => void;
  onBackToExplorer: () => void;
  onBack?: () => void;
  onHome?: () => void;
  onOpenLanguage: () => void;
}

type TabType = 'overview' | 'eligibility' | 'documents' | 'more';

export const SchemeDetailPage: React.FC<SchemeDetailPageProps> = ({
  schemeId,
  currentLang,
  isSaved,
  origin,
  onToggleSave,
  onBackToExplorer,
  onBack,
  onHome,
  onOpenLanguage,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  const scheme = schemesData.find((s) => s.schemeId === schemeId);
  const isTamil = currentLang === 'ta';
  const handleBack = onBack || onBackToExplorer;
  const handleHome = onHome || onBackToExplorer;

  // Render Category Icon for Header Pill
  const renderCategoryPillIcon = (category: SchemeCategory) => {
    switch (category) {
      case 'education':
        return <GraduationCap className="w-3.5 h-3.5 text-[#155B4D] fill-none stroke-[2.4]" />;
      case 'agriculture':
        return <Sprout className="w-3.5 h-3.5 text-[#155B4D] fill-none stroke-[2.4]" />;
      case 'housing':
        return <Home className="w-3.5 h-3.5 text-[#155B4D] fill-none stroke-[2.4]" />;
      case 'social':
        return <Users className="w-3.5 h-3.5 text-[#155B4D] fill-none stroke-[2.4]" />;
      case 'health':
      default:
        return <Heart className="w-3.5 h-3.5 text-[#155B4D] fill-none stroke-[2.4]" />;
    }
  };

  // Render Large Scheme Main Icon
  const renderMainSchemeIcon = (icon: string) => {
    switch (icon) {
      case 'graduation-cap':
        return (
          <svg
            className="w-9 h-9 sm:w-10 sm:h-10 text-[#155B4D]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
            <path d="M6 12v5c3 3 9 3 12 0v-5" />
          </svg>
        );
      case 'plant':
        return (
          <svg
            className="w-9 h-9 sm:w-10 sm:h-10 text-[#155B4D]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 22v-9" />
            <path d="M12 13a5 5 0 0 1 5-5c2.5 0 3 2.5 3 5 0 2.5-3 5-8 5" />
            <path d="M12 13a5 5 0 0 0-5-5c-2.5 0-3 2.5-3 5 0 2.5 3 5 8 5" />
          </svg>
        );
      case 'home':
        return (
          <svg
            className="w-9 h-9 sm:w-10 sm:h-10 text-[#155B4D]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        );
      case 'people':
        return (
          <svg
            className="w-9 h-9 sm:w-10 sm:h-10 text-[#155B4D]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        );
      case 'medical-shield':
      default:
        return (
          <svg
            className="w-9 h-9 sm:w-10 sm:h-10 text-[#155B4D]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <line x1="12" y1="8" x2="12" y2="14" />
            <line x1="9" y1="11" x2="15" y2="11" />
          </svg>
        );
    }
  };

  // Fallback for non-existent or invalid scheme ID
  if (!scheme) {
    return (
      <div className="relative w-full max-w-[430px] mx-auto min-h-screen bg-[#FAF7EF] text-[#202820] flex flex-col justify-start overflow-x-hidden pt-[max(env(safe-area-inset-top),12px)] pb-[max(env(safe-area-inset-bottom),28px)] antialiased px-4 sm:px-5">
        <header className="w-full pt-2 pb-3 flex items-center justify-between select-none">
          <div className="flex items-center gap-2">
            <button
              onClick={handleBack}
              type="button"
              aria-label="Back"
              className="w-8 h-8 rounded-full flex items-center justify-center text-[#155B4D] hover:bg-black/5 active:scale-90 transition-all -ml-1 cursor-pointer"
            >
              <svg className="w-5 h-5 stroke-[2.8]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              type="button"
              onClick={handleHome}
              className="flex items-center gap-1.5 sm:gap-2 text-left cursor-pointer hover:opacity-90 active:scale-98 transition-all"
            >
              <img
                src="/assets/aistudio/emblem.png"
                alt="Urimai Aram Emblem"
                className="w-[26px] h-[30px] sm:w-[28px] sm:h-[32px] object-contain select-none pointer-events-none shrink-0"
                loading="eager"
              />
              <div className="flex flex-col justify-center">
                <span className="font-tamil text-[14px] sm:text-[15px] font-bold text-[#202820] leading-tight select-none">
                  உரிமையறம்
                </span>
                <span className="text-[8.5px] sm:text-[9px] font-bold text-[#202820] tracking-[0.05em] leading-none uppercase mt-0.5 select-none">
                  URIMAI ARAM
                </span>
                <span
                  aria-hidden="true"
                  className="w-7 sm:w-8 h-[1.5px] bg-[#E5A824] rounded-full mt-[2px]"
                />
              </div>
            </button>
          </div>
          <button
            onClick={onOpenLanguage}
            type="button"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-[#FAF7EF] active:scale-95 border border-[#E5E9E2] rounded-full shadow-[0_1px_4px_rgba(0,0,0,0.04)] text-[12.5px] font-semibold text-[#202820] cursor-pointer"
          >
            <span className="text-[12px] text-[#202820] font-medium leading-none">文A</span>
            <span>{isTamil ? 'தமிழ்' : 'English'}</span>
          </button>
        </header>

        <main className="flex-1 flex flex-col items-center justify-center text-center py-16 px-4">
          <div className="w-16 h-16 rounded-2xl bg-[#E5F1E7] border border-[#D5E6D8] flex items-center justify-center text-[#155B4D] mb-4 shadow-sm">
            <Info className="w-8 h-8 stroke-[2.2]" />
          </div>
          <h2 className={`text-[19px] font-bold text-[#155B4D] mb-2 ${isTamil ? 'font-tamil' : ''}`}>
            {isTamil ? 'திட்டம் கிடைக்கவில்லை' : 'Scheme Not Found'}
          </h2>
          <p className={`text-[14px] text-[#626A62] max-w-[280px] mb-6 leading-relaxed ${isTamil ? 'font-tamil' : ''}`}>
            {isTamil
              ? `கோரப்பட்ட திட்ட விவரம் (${schemeId}) கிடைக்கவில்லை. திட்டங்கள் பட்டியலில் இருந்து தேர்வு செய்யவும்.`
              : `The requested scheme details (${schemeId}) could not be found. Please choose from the Scheme Explorer.`}
          </p>
          <button
            type="button"
            onClick={onBackToExplorer}
            className="px-5 py-2.5 bg-[#155B4D] hover:bg-[#114b3f] active:scale-95 text-white text-[14px] font-bold rounded-xl shadow-sm transition-all cursor-pointer"
          >
            {isTamil ? 'திட்டங்கள் பட்டியல் காண்க' : 'Explore All Schemes'}
          </button>
        </main>
      </div>
    );
  }

  // Resolve dynamic scheme data with robust fallbacks
  const departmentName = isTamil
    ? scheme.departmentTa || scheme.administeringAuthorityTa
    : scheme.departmentEn || scheme.administeringAuthority;

  const schemeSummary = isTamil ? scheme.summaryTa : scheme.summary;

  const schemePurpose = isTamil
    ? scheme.purposeTa || scheme.summaryTa
    : scheme.purposeEn || scheme.summary;

  const keyBenefitsList = isTamil
    ? scheme.keyBenefitsTa || [scheme.benefitTa]
    : scheme.keyBenefitsEn || [scheme.benefitEn];

  const lastUpdatedDate = isTamil
    ? scheme.lastUpdatedDateTa || 'அக்டோபர் 2026'
    : scheme.lastUpdatedDateEn || 'October 2026';

  const eligibilityCards = isTamil
    ? scheme.eligibilityCardsTa ||
      scheme.eligibilityTa.map((item, idx) => ({
        title: `தகுதி விதிமுறை ${idx + 1}`,
        desc: item,
      }))
    : scheme.eligibilityCardsEn ||
      scheme.eligibilityEn.map((item, idx) => ({
        title: `Eligibility Criterion ${idx + 1}`,
        desc: item,
      }));

  const documentCards = isTamil
    ? scheme.documentCardsTa ||
      scheme.documentsTa.map((doc, idx) => ({
        title: doc,
        desc: `${doc} அசல் மற்றும் நகல் சான்றிதழ்கள்.`,
      }))
    : scheme.documentCardsEn ||
      scheme.documentsEn.map((doc, idx) => ({
        title: doc,
        desc: `Verified copy and original of ${doc}.`,
      }));

  const helplineNumber = scheme.helplineNumber || '1100';
  const helplineTitle = isTamil
    ? scheme.helplineTitleTa || '24/7 கட்டணமில்லா உதவி எண்'
    : scheme.helplineTitleEn || '24/7 Toll-Free Citizen Helpline';
  const helplineDesc = isTamil
    ? scheme.helplineDescTa || 'திட்ட விவரங்கள், விண்ணப்ப நிலை மற்றும் வழிகாட்டலுக்கு தொடர்பு கொள்க.'
    : scheme.helplineDescEn || 'Available round-the-clock for eligibility inquiries and assistance.';

  const portalDesc = isTamil
    ? scheme.portalDescTa || `அரசாணை மற்றும் முழு விவரங்களுக்கு ${scheme.sourceUrl.replace('https://', '')} தளத்தை அணுகலாம்.`
    : scheme.portalDescEn || `Access official guidelines and procedure manual at ${scheme.sourceUrl.replace('https://', '')}.`;

  const networkTitle = isTamil
    ? scheme.networkTitleTa || 'அங்கீகரிக்கப்பட்ட சேவை மையங்கள்'
    : scheme.networkTitleEn || 'Empanelled Service Centers';
  const networkDesc = isTamil
    ? scheme.networkDescTa || 'தமிழகம் முழுவதும் உள்ள அரசு இ-சேவை மையங்கள் மூலம் விண்ணப்பிக்கலாம்.'
    : scheme.networkDescEn || 'Citizen assistance accessible across accredited government facilitation centers.';

  return (
    <div className="relative w-full max-w-[430px] mx-auto min-h-screen bg-[#FAF7EF] text-[#202820] flex flex-col justify-start overflow-x-hidden pt-[max(env(safe-area-inset-top),12px)] pb-[max(env(safe-area-inset-bottom),28px)] antialiased">
      {/* =========================================================================
          SECTION A: TOP BRAND HEADER
         ========================================================================= */}
      <header className="w-full px-4 sm:px-5 pt-2 pb-3 flex items-center justify-between select-none">
        {/* Left: Back Arrow + Logo Lockup */}
        <div className="flex items-center gap-2">
          {/* Back Arrow Button */}
          <button
            onClick={handleBack}
            type="button"
            aria-label="Back"
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#155B4D] hover:bg-black/5 active:scale-90 transition-all -ml-1 cursor-pointer"
          >
            <svg
              className="w-5 h-5 stroke-[2.8]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Logo Lockup */}
          <button
            type="button"
            onClick={handleHome}
            className="flex items-center gap-1.5 sm:gap-2 text-left cursor-pointer hover:opacity-90 active:scale-98 transition-all"
          >
            <img
              src="/assets/aistudio/emblem.png"
              alt="Urimai Aram Emblem"
              className="w-[26px] h-[30px] sm:w-[28px] sm:h-[32px] object-contain select-none pointer-events-none shrink-0"
              loading="eager"
            />
            <div className="flex flex-col justify-center">
              <span className="font-tamil text-[14px] sm:text-[15px] font-bold text-[#202820] leading-tight select-none">
                உரிமையறம்
              </span>
              <span className="text-[8.5px] sm:text-[9px] font-bold text-[#202820] tracking-[0.05em] leading-none uppercase mt-0.5 select-none">
                URIMAI ARAM
              </span>
              <span
                aria-hidden="true"
                className="w-7 sm:w-8 h-[1.5px] bg-[#E5A824] rounded-full mt-[2px]"
              />
            </div>
          </button>
        </div>

        {/* Right: Language Selector Pill */}
        <button
          onClick={onOpenLanguage}
          type="button"
          aria-label="Change Language"
          className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-[#FAF7EF] active:scale-95 border border-[#E5E9E2] rounded-full shadow-[0_1px_4px_rgba(0,0,0,0.04)] text-[12.5px] font-semibold text-[#202820] transition-all cursor-pointer"
        >
          {/* Translation icon 文A */}
          <span className="text-[12px] text-[#202820] font-medium leading-none">文A</span>
          <span>{isTamil ? 'தமிழ்' : 'English'}</span>
          <svg className="w-3.5 h-3.5 text-[#626A62] stroke-[2.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      </header>

      {/* Main Screen Content */}
      <main className="w-full px-4 sm:px-5 flex flex-col justify-start">
        {/* =========================================================================
            SECTION B: MAIN SCHEME IDENTITY CARD
            - Sized title at 17-18px font size, font-weight 700, line-height 1.3-1.35
            - Atomic non-breaking Tamil words preventing any mid-word character splits
            - Maximized title width with compact icon column and independent top-right bookmark
            - Abstract curved decorative shapes at bottom-right
           ========================================================================= */}
        <section className="relative w-full rounded-3xl bg-gradient-to-br from-[#FFFDF8] via-[#FAF6ED] to-[#F5EEDD] border border-[#EAE3D2] shadow-[0_4px_24px_rgba(21,91,77,0.06)] p-4 sm:p-5 overflow-hidden min-h-[185px] sm:min-h-[200px] flex items-center">
          {/* Top-Right Bookmark Button - Independently positioned at corner without stealing title text width */}
          <button
            type="button"
            onClick={() => onToggleSave(scheme.schemeId)}
            aria-label={isSaved ? 'Remove from saved' : 'Save scheme'}
            className="absolute top-3 right-3 sm:top-3.5 sm:right-3.5 w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[#155B4D]/5 active:scale-90 transition-all cursor-pointer z-20"
          >
            <Bookmark
              className={`w-5.5 h-5.5 text-[#155B4D] stroke-[2.2] transition-colors ${
                isSaved ? 'fill-[#155B4D]' : 'fill-none'
              }`}
            />
          </button>

          {/* Grid Layout: Compact Icon & Divider on Left | Maximized Title on Right */}
          <div className="relative z-10 grid grid-cols-[auto_1fr] items-center gap-2.5 sm:gap-3.5 w-full pr-4 sm:pr-5">
            {/* Left: Scheme Category Icon in Rounded Square + Thin Vertical Divider */}
            <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
              <div className="w-[70px] h-[70px] sm:w-[78px] sm:h-[78px] rounded-2xl bg-[#E5F1E7] border border-[#D3E6D6] flex items-center justify-center shrink-0 shadow-[0_2px_8px_rgba(21,91,77,0.06)]">
                {renderMainSchemeIcon(scheme.icon)}
              </div>

              {/* Vertical Divider */}
              <div className="w-[1px] h-16 sm:h-18 bg-[#E2DACB] opacity-80 shrink-0 ml-0.5" />
            </div>

            {/* Right: Scheme Title occupying full available width with complete Tamil words */}
            <div className="min-w-0 flex flex-col justify-center">
              <h1
                className={`text-[#155B4D] font-bold tracking-normal leading-[1.32] ${
                  isTamil
                    ? 'font-tamil text-[17px] sm:text-[18px]'
                    : 'text-[17px] sm:text-[18.5px]'
                }`}
              >
                {scheme.schemeId === 'cmchis' ? (
                  isTamil ? (
                    <span className="inline">
                      <span className="inline-block whitespace-nowrap">முதலமைச்சரின்</span>{' '}
                      <span className="inline-block whitespace-nowrap">விரிவான</span>{' '}
                      <span className="inline-block whitespace-nowrap">மருத்துவக்</span>{' '}
                      <span className="inline-block whitespace-nowrap">காப்பீட்டுத்</span>{' '}
                      <span className="inline-block whitespace-nowrap">திட்டம்</span>{' '}
                      <span className="inline-block whitespace-nowrap font-bold text-[#155B4D]/90">(CMCHIS)</span>
                    </span>
                  ) : (
                    <span className="inline">
                      <span className="inline-block whitespace-nowrap">Chief</span>{' '}
                      <span className="inline-block whitespace-nowrap">Minister's</span>{' '}
                      <span className="inline-block whitespace-nowrap">Comprehensive</span>{' '}
                      <span className="inline-block whitespace-nowrap">Health</span>{' '}
                      <span className="inline-block whitespace-nowrap">Insurance</span>{' '}
                      <span className="inline-block whitespace-nowrap">Scheme</span>{' '}
                      <span className="inline-block whitespace-nowrap font-bold text-[#155B4D]/90">(CMCHIS)</span>
                    </span>
                  )
                ) : (
                  <span className="inline">
                    {(isTamil ? scheme.officialNameTa : scheme.officialName)
                      .split(' ')
                      .map((word, wIdx) => (
                        <span key={wIdx} className="inline-block whitespace-nowrap mr-1">
                          {word}
                        </span>
                      ))}
                    {scheme.schemeName && !scheme.officialName.includes(scheme.schemeName) && (
                      <span className="inline-block whitespace-nowrap font-bold text-[#155B4D]/90">
                        ({isTamil ? scheme.schemeNameTa : scheme.schemeName})
                      </span>
                    )}
                  </span>
                )}
              </h1>

              {/* Category Pill Underneath Title */}
              <div className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 bg-[#FFF4D2] border border-[#F5D879]/70 rounded-full w-fit shadow-2xs">
                {renderCategoryPillIcon(scheme.category)}
                <span className={`text-[12px] font-bold text-[#155B4D] leading-none ${isTamil ? 'font-tamil' : ''}`}>
                  {isTamil ? scheme.categoryLabelTa : scheme.categoryLabelEn}
                </span>
              </div>
            </div>
          </div>

          {/* Abstract Decorative Curved Shapes at Bottom-Right */}
          <div className="absolute -right-3 -bottom-3 pointer-events-none select-none z-0">
            <svg
              className="w-44 h-36 sm:w-52 sm:h-40"
              viewBox="0 0 200 160"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="curveGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F5D879" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#B58A35" stopOpacity="0.25" />
                </linearGradient>
                <linearGradient id="curveGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#E5F1E7" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#D2E8D7" stopOpacity="0.45" />
                </linearGradient>
              </defs>
              <path
                d="M30 160 C70 95, 130 90, 200 55 L200 160 Z"
                fill="url(#curveGrad2)"
              />
              <path
                d="M85 160 C120 115, 155 105, 200 80 L200 160 Z"
                fill="url(#curveGrad1)"
              />
            </svg>
          </div>
        </section>

        {/* =========================================================================
            SECTION C: GOVERNMENT DEPARTMENT CARD
            - 15-16px font size, font weight 700, line-height 1.35-1.4
            - Natural wrapping between complete Tamil words
            - No ellipsis truncation
           ========================================================================= */}
        <section className="mt-3.5 w-full bg-white rounded-2xl p-3.5 sm:p-4 border border-[#E5E9E2] shadow-xs grid grid-cols-[44px_1fr] items-center gap-3">
          {/* Pale Green Icon Container with Landmark Building */}
          <div className="w-11 h-11 rounded-xl bg-[#E5F1E7] border border-[#D5E6D8] flex items-center justify-center shrink-0">
            <svg
              className="w-5.5 h-5.5 text-[#155B4D] stroke-[2.2]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="21" x2="21" y2="21" />
              <polygon points="12 2 2 7 22 7" />
              <line x1="6" y1="10" x2="6" y2="21" />
              <line x1="10" y1="10" x2="10" y2="21" />
              <line x1="14" y1="10" x2="14" y2="21" />
              <line x1="18" y1="10" x2="18" y2="21" />
            </svg>
          </div>

          {/* Right: Department Details */}
          <div className="min-w-0 flex flex-col justify-center">
            <span
              className={`text-[12.5px] sm:text-[13px] text-[#626A62] font-normal leading-[1.35] mb-0.5 ${
                isTamil ? 'font-tamil' : ''
              }`}
            >
              {isTamil ? 'திட்டம் வழங்கும் துறை' : 'Administering Department'}
            </span>
            <span
              className={`text-[#155B4D] font-bold text-[15px] sm:text-[16px] leading-[1.38] ${
                isTamil ? 'font-tamil' : ''
              }`}
            >
              {departmentName.split(' ').map((w, idx) => (
                <span key={idx} className="inline-block whitespace-nowrap mr-1">
                  {w}
                </span>
              ))}
            </span>
          </div>
        </section>

        {/* =========================================================================
            SECTION D: SCHEME DESCRIPTION (Readable Tamil Typography)
            - 13.5-14px font, weight 400, line-height 1.58, natural word-level wrapping
           ========================================================================= */}
        <section className="my-3.5 w-full px-0.5">
          <p
            className={`text-[#202820] text-[13.5px] sm:text-[14px] font-normal leading-[1.58] tracking-normal text-left ${
              isTamil ? 'font-tamil' : ''
            }`}
          >
            {schemeSummary}
          </p>
        </section>

        {/* =========================================================================
            SECTION E: FOUR INFORMATION NAVIGATION TABS (Strict Label Containment)
            - Content-aware minimum widths and horizontal scrolling:
              • Overview (கண்ணோட்டம்): 106px min-width
              • Eligibility (தகுதி): 92px min-width
              • Required Documents (தேவையான ஆவணங்கள்): 116px min-width
              • More Information (மேலும் விவரங்கள்): 116px min-width
            - All with shrink-0, overflow-x-auto, no-scrollbar
            - Zero label overflow outside card boundaries in any language
            - Consistent dimensions and vertical alignment across active and inactive states
           ========================================================================= */}
        <section className="w-full">
          <div className="flex items-stretch gap-2.5 overflow-x-auto no-scrollbar pb-1.5 -mx-4 px-4 sm:mx-0 sm:px-0">
            {/* Tab 1: Overview (கண்ணோட்டம்) - 106px content-aware width */}
            <button
              type="button"
              onClick={() => setActiveTab('overview')}
              className={`w-[106px] min-w-[106px] h-[84px] rounded-2xl px-2 py-2 flex flex-col items-center justify-center text-center transition-all cursor-pointer shrink-0 ${
                activeTab === 'overview'
                  ? 'bg-[#F5D879] text-[#155B4D] border border-[#E8C862] shadow-xs'
                  : 'bg-white text-[#202820] border border-[#E5E9E2] hover:bg-[#FAF7EF] active:scale-95'
              }`}
            >
              <FileText className="w-5 h-5 text-[#155B4D] mb-1.5 shrink-0 stroke-[2.2]" />
              <span
                className={`w-full text-center font-bold leading-[1.25] block whitespace-nowrap ${
                  isTamil ? 'font-tamil text-[10.5px] sm:text-[11px]' : 'text-[12px]'
                }`}
              >
                {isTamil ? 'கண்ணோட்டம்' : 'Overview'}
              </span>
              <div
                className={`w-5 h-[2.5px] rounded-full mt-1.5 shrink-0 mx-auto ${
                  activeTab === 'overview' ? 'bg-[#B58A35]' : 'invisible'
                }`}
              />
            </button>

            {/* Tab 2: Eligibility (தகுதி) - 92px content-aware width */}
            <button
              type="button"
              onClick={() => setActiveTab('eligibility')}
              className={`w-[92px] min-w-[92px] h-[84px] rounded-2xl px-2 py-2 flex flex-col items-center justify-center text-center transition-all cursor-pointer shrink-0 ${
                activeTab === 'eligibility'
                  ? 'bg-[#F5D879] text-[#155B4D] border border-[#E8C862] shadow-xs'
                  : 'bg-white text-[#202820] border border-[#E5E9E2] hover:bg-[#FAF7EF] active:scale-95'
              }`}
            >
              <Users className="w-5 h-5 text-[#155B4D] mb-1.5 shrink-0 stroke-[2.2]" />
              <span
                className={`w-full text-center font-bold leading-[1.25] block whitespace-nowrap ${
                  isTamil ? 'font-tamil text-[11px] sm:text-[11.5px]' : 'text-[12px]'
                }`}
              >
                {isTamil ? 'தகுதி' : 'Eligibility'}
              </span>
              <div
                className={`w-5 h-[2.5px] rounded-full mt-1.5 shrink-0 mx-auto ${
                  activeTab === 'eligibility' ? 'bg-[#B58A35]' : 'invisible'
                }`}
              />
            </button>

            {/* Tab 3: Required Documents (தேவையான ஆவணங்கள்) - 116px content-aware width */}
            <button
              type="button"
              onClick={() => setActiveTab('documents')}
              className={`w-[116px] min-w-[116px] h-[84px] rounded-2xl px-2 py-2 flex flex-col items-center justify-center text-center transition-all cursor-pointer shrink-0 ${
                activeTab === 'documents'
                  ? 'bg-[#F5D879] text-[#155B4D] border border-[#E8C862] shadow-xs'
                  : 'bg-white text-[#202820] border border-[#E5E9E2] hover:bg-[#FAF7EF] active:scale-95'
              }`}
            >
              <Layers className="w-5 h-5 text-[#155B4D] mb-1.5 shrink-0 stroke-[2.2]" />
              <span
                className={`w-full text-center font-bold leading-[1.25] block ${
                  isTamil ? 'font-tamil text-[10.5px] sm:text-[11px]' : 'text-[11px] sm:text-[11.5px]'
                }`}
              >
                {isTamil ? (
                  <>
                    <span className="block whitespace-nowrap">தேவையான</span>
                    <span className="block whitespace-nowrap">ஆவணங்கள்</span>
                  </>
                ) : (
                  <>
                    <span className="block whitespace-nowrap">Required</span>
                    <span className="block whitespace-nowrap">Documents</span>
                  </>
                )}
              </span>
              <div
                className={`w-5 h-[2.5px] rounded-full mt-1.5 shrink-0 mx-auto ${
                  activeTab === 'documents' ? 'bg-[#B58A35]' : 'invisible'
                }`}
              />
            </button>

            {/* Tab 4: More Information (மேலும் விவரங்கள்) - 116px content-aware width */}
            <button
              type="button"
              onClick={() => setActiveTab('more')}
              className={`w-[116px] min-w-[116px] h-[84px] rounded-2xl px-2 py-2 flex flex-col items-center justify-center text-center transition-all cursor-pointer shrink-0 ${
                activeTab === 'more'
                  ? 'bg-[#F5D879] text-[#155B4D] border border-[#E8C862] shadow-xs'
                  : 'bg-white text-[#202820] border border-[#E5E9E2] hover:bg-[#FAF7EF] active:scale-95'
              }`}
            >
              <Info className="w-5 h-5 text-[#155B4D] mb-1.5 shrink-0 stroke-[2.2]" />
              <span
                className={`w-full text-center font-bold leading-[1.25] block ${
                  isTamil ? 'font-tamil text-[10.5px] sm:text-[11px]' : 'text-[11px] sm:text-[11.5px]'
                }`}
              >
                {isTamil ? (
                  <>
                    <span className="block whitespace-nowrap">மேலும்</span>
                    <span className="block whitespace-nowrap">விவரங்கள்</span>
                  </>
                ) : (
                  <>
                    <span className="block whitespace-nowrap">More</span>
                    <span className="block whitespace-nowrap">Info</span>
                  </>
                )}
              </span>
              <div
                className={`w-5 h-[2.5px] rounded-full mt-1.5 shrink-0 mx-auto ${
                  activeTab === 'more' ? 'bg-[#B58A35]' : 'invisible'
                }`}
              />
            </button>
          </div>
        </section>

        {/* =========================================================================
            SECTION F & G: MAIN INFORMATION CONTAINER (Exactly Three Cards)
            - Responsive grid: grid-template-columns: 44px minmax(0, 1fr)
            - Card padding: 12-14px (p-3 sm:p-3.5)
            - Icon container: 44px x 44px (w-11 h-11)
            - Icon-to-text gap: 12-14px (gap-3 sm:gap-3.5)
            - Heading: 15-16px, 700 bold, line-height 1.35, #155B4D, left-aligned
            - Description: 13-14px, 400 normal, line-height 1.5, #4A524A, left-aligned
            - Consistent alignment across all overview cards
           ========================================================================= */}
        <section className="mt-3.5 mb-6 w-full bg-white rounded-3xl p-4 sm:p-5 border border-[#E5E9E2] shadow-sm">
          {/* TAB 1: OVERVIEW (திட்டத்தின் கண்ணோட்டம்) */}
          {activeTab === 'overview' && (
            <>
              {/* Heading with Turmeric Underline */}
              <div className="mb-4">
                <h2
                  className={`text-[#155B4D] font-extrabold text-[17px] sm:text-[19px] tracking-tight leading-tight text-left ${
                    isTamil ? 'font-tamil' : ''
                  }`}
                >
                  {isTamil ? 'திட்டத்தின் கண்ணோட்டம்' : 'Scheme Overview'}
                </h2>
                {/* Turmeric underline */}
                <div className="h-[3.5px] w-12 bg-[#F5D879] rounded-full mt-1.5" />
              </div>

              {/* Exactly THREE Overview Cards */}
              <div className="space-y-3">
                {/* CARD 1 — SCHEME PURPOSE */}
                <div className="w-full bg-[#FAF7EF] rounded-2xl p-3 sm:p-3.5 border border-[#EDE8DC] grid grid-cols-[44px_minmax(0,1fr)] items-start gap-3 sm:gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-[#E5F1E7] border border-[#D5E6D8] flex items-center justify-center shrink-0">
                    <Target className="w-5 h-5 text-[#155B4D] stroke-[2.2]" />
                  </div>
                  <div className="min-w-0 text-left">
                    <h3
                      className={`text-[#155B4D] font-bold text-[15px] sm:text-[16px] leading-[1.35] tracking-normal text-left ${
                        isTamil ? 'font-tamil' : ''
                      }`}
                    >
                      {isTamil ? 'திட்டத்தின் நோக்கம்' : 'Purpose of the Scheme'}
                    </h3>
                    <p
                      className={`text-[#4A524A] text-[13px] sm:text-[14px] font-normal leading-[1.5] tracking-normal text-left mt-1 ${
                        isTamil ? 'font-tamil' : ''
                      }`}
                    >
                      {schemePurpose}
                    </p>
                  </div>
                </div>

                {/* CARD 2 — KEY BENEFITS */}
                <div className="w-full bg-[#FAF7EF] rounded-2xl p-3 sm:p-3.5 border border-[#EDE8DC] grid grid-cols-[44px_minmax(0,1fr)] items-start gap-3 sm:gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-[#E5F1E7] border border-[#D5E6D8] flex items-center justify-center shrink-0">
                    <HeartHandshake className="w-5 h-5 text-[#155B4D] stroke-[2.2]" />
                  </div>
                  <div className="min-w-0 text-left">
                    <h3
                      className={`text-[#155B4D] font-bold text-[15px] sm:text-[16px] leading-[1.35] tracking-normal text-left ${
                        isTamil ? 'font-tamil' : ''
                      }`}
                    >
                      {isTamil ? 'முக்கிய நன்மைகள்' : 'Key Benefits'}
                    </h3>
                    <ul
                      className={`mt-1.5 space-y-1.5 text-[13px] sm:text-[13.5px] font-normal text-[#4A524A] leading-[1.5] tracking-normal text-left ${
                        isTamil ? 'font-tamil' : ''
                      }`}
                    >
                      {keyBenefitsList.map((benefit, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#155B4D] mt-2 shrink-0" />
                          <span className="min-w-0">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* CARD 3 — LAST UPDATED */}
                <div className="w-full bg-[#FAF7EF] rounded-2xl p-3 sm:p-3.5 border border-[#EDE8DC] grid grid-cols-[44px_minmax(0,1fr)] items-start gap-3 sm:gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-[#E5F1E7] border border-[#D5E6D8] flex items-center justify-center shrink-0">
                    <Calendar className="w-5 h-5 text-[#155B4D] stroke-[2.2]" />
                  </div>
                  <div className="min-w-0 text-left">
                    <h3
                      className={`text-[#155B4D] font-bold text-[15px] sm:text-[16px] leading-[1.35] tracking-normal text-left ${
                        isTamil ? 'font-tamil' : ''
                      }`}
                    >
                      {isTamil ? 'கடைசியாக புதுப்பிக்கப்பட்டது' : 'Last Updated'}
                    </h3>
                    <p
                      className={`text-[#4A524A] text-[13px] sm:text-[14px] font-medium leading-[1.5] tracking-normal text-left mt-1 ${
                        isTamil ? 'font-tamil' : ''
                      }`}
                    >
                      {lastUpdatedDate}
                    </p>
                    <p className="text-[#757E75] text-[11px] sm:text-[11.5px] mt-0.5">
                      {scheme.lastUpdated}
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* TAB 2: ELIGIBILITY (தகுதி வரம்புகள்) */}
          {activeTab === 'eligibility' && (
            <>
              <div className="mb-4">
                <h2
                  className={`text-[#155B4D] font-extrabold text-[17px] sm:text-[19px] tracking-tight leading-tight text-left ${
                    isTamil ? 'font-tamil' : ''
                  }`}
                >
                  {isTamil ? 'தகுதி வரம்புகள்' : 'Eligibility Criteria'}
                </h2>
                <div className="h-[3.5px] w-12 bg-[#F5D879] rounded-full mt-1.5" />
              </div>

              <div className="space-y-3">
                {eligibilityCards.map((card, idx) => {
                  const icons = [TrendingUp, Users, ShieldCheck];
                  const IconComponent = icons[idx % icons.length];

                  return (
                    <div
                      key={idx}
                      className="w-full bg-[#FAF7EF] rounded-2xl p-3 sm:p-3.5 border border-[#EDE8DC] grid grid-cols-[44px_minmax(0,1fr)] items-start gap-3 sm:gap-3.5"
                    >
                      <div className="w-11 h-11 rounded-xl bg-[#E5F1E7] border border-[#D5E6D8] flex items-center justify-center shrink-0">
                        <IconComponent className="w-5 h-5 text-[#155B4D] stroke-[2.2]" />
                      </div>
                      <div className="min-w-0 text-left">
                        <h3
                          className={`text-[#155B4D] font-bold text-[15px] sm:text-[16px] leading-[1.35] tracking-normal text-left ${
                            isTamil ? 'font-tamil' : ''
                          }`}
                        >
                          {card.title}
                        </h3>
                        <p
                          className={`text-[#4A524A] text-[13px] sm:text-[14px] font-normal leading-[1.5] tracking-normal text-left mt-1 ${
                            isTamil ? 'font-tamil' : ''
                          }`}
                        >
                          {card.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {/* TAB 3: DOCUMENTS (தேவையான ஆவணங்கள்) */}
          {activeTab === 'documents' && (
            <>
              <div className="mb-4">
                <h2
                  className={`text-[#155B4D] font-extrabold text-[17px] sm:text-[19px] tracking-tight leading-tight text-left ${
                    isTamil ? 'font-tamil' : ''
                  }`}
                >
                  {isTamil ? 'தேவையான ஆவணங்கள்' : 'Required Documents'}
                </h2>
                <div className="h-[3.5px] w-12 bg-[#F5D879] rounded-full mt-1.5" />
              </div>

              <div className="space-y-3">
                {documentCards.map((card, idx) => {
                  const icons = [CreditCard, Fingerprint, FileCheck];
                  const IconComponent = icons[idx % icons.length];

                  return (
                    <div
                      key={idx}
                      className="w-full bg-[#FAF7EF] rounded-2xl p-3 sm:p-3.5 border border-[#EDE8DC] grid grid-cols-[44px_minmax(0,1fr)] items-start gap-3 sm:gap-3.5"
                    >
                      <div className="w-11 h-11 rounded-xl bg-[#E5F1E7] border border-[#D5E6D8] flex items-center justify-center shrink-0">
                        <IconComponent className="w-5 h-5 text-[#155B4D] stroke-[2.2]" />
                      </div>
                      <div className="min-w-0 text-left">
                        <h3
                          className={`text-[#155B4D] font-bold text-[15px] sm:text-[16px] leading-[1.35] tracking-normal text-left ${
                            isTamil ? 'font-tamil' : ''
                          }`}
                        >
                          {card.title}
                        </h3>
                        <p
                          className={`text-[#4A524A] text-[13px] sm:text-[14px] font-normal leading-[1.5] tracking-normal text-left mt-1 ${
                            isTamil ? 'font-tamil' : ''
                          }`}
                        >
                          {card.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {/* TAB 4: MORE DETAILS (மேலும் விவரங்கள்) */}
          {activeTab === 'more' && (
            <>
              <div className="mb-4">
                <h2
                  className={`text-[#155B4D] font-extrabold text-[17px] sm:text-[19px] tracking-tight leading-tight text-left ${
                    isTamil ? 'font-tamil' : ''
                  }`}
                >
                  {isTamil ? 'மேலும் விவரங்கள்' : 'More Information & Links'}
                </h2>
                <div className="h-[3.5px] w-12 bg-[#F5D879] rounded-full mt-1.5" />
              </div>

              <div className="space-y-3">
                {/* Official Portal Link Card */}
                <div className="w-full bg-[#FAF7EF] rounded-2xl p-3 sm:p-3.5 border border-[#EDE8DC] grid grid-cols-[44px_minmax(0,1fr)] items-start gap-3 sm:gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-[#E5F1E7] border border-[#D5E6D8] flex items-center justify-center shrink-0">
                    <Globe className="w-5 h-5 text-[#155B4D] stroke-[2.2]" />
                  </div>
                  <div className="min-w-0 text-left">
                    <h3
                      className={`text-[#155B4D] font-bold text-[15px] sm:text-[16px] leading-[1.35] tracking-normal text-left ${
                        isTamil ? 'font-tamil' : ''
                      }`}
                    >
                      {isTamil ? 'அதிகாரப்பூர்வ இணையதளம்' : 'Official Portal'}
                    </h3>
                    <p
                      className={`text-[#4A524A] text-[13px] sm:text-[14px] font-normal leading-[1.5] tracking-normal text-left mt-1 ${
                        isTamil ? 'font-tamil' : ''
                      }`}
                    >
                      {portalDesc}
                    </p>
                    <a
                      href={scheme.sourceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 mt-2 px-3.5 py-1.5 bg-[#155B4D] text-white text-[12px] font-bold rounded-xl shadow-2xs hover:bg-[#114b3f] active:scale-95 transition-all"
                    >
                      <span>{isTamil ? 'இணையதளம் செல்க' : 'Visit Portal'}</span>
                      <span>↗</span>
                    </a>
                  </div>
                </div>

                {/* 24/7 Helpline Card */}
                <div className="w-full bg-[#FAF7EF] rounded-2xl p-3 sm:p-3.5 border border-[#EDE8DC] grid grid-cols-[44px_minmax(0,1fr)] items-start gap-3 sm:gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-[#E5F1E7] border border-[#D5E6D8] flex items-center justify-center shrink-0">
                    <PhoneCall className="w-5 h-5 text-[#155B4D] stroke-[2.2]" />
                  </div>
                  <div className="min-w-0 text-left">
                    <h3
                      className={`text-[#155B4D] font-bold text-[15px] sm:text-[16px] leading-[1.35] tracking-normal text-left ${
                        isTamil ? 'font-tamil' : ''
                      }`}
                    >
                      {helplineTitle}
                    </h3>
                    <p className="text-[#155B4D] font-extrabold text-[15px] sm:text-[16px] mt-1 tracking-wide">
                      {helplineNumber}
                    </p>
                    <p
                      className={`text-[#4A524A] text-[13px] sm:text-[13.5px] leading-[1.5] mt-0.5 ${
                        isTamil ? 'font-tamil' : ''
                      }`}
                    >
                      {helplineDesc}
                    </p>
                  </div>
                </div>

                {/* Facilitation Network Card */}
                <div className="w-full bg-[#FAF7EF] rounded-2xl p-3 sm:p-3.5 border border-[#EDE8DC] grid grid-cols-[44px_minmax(0,1fr)] items-start gap-3 sm:gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-[#E5F1E7] border border-[#D5E6D8] flex items-center justify-center shrink-0">
                    <Building2 className="w-5 h-5 text-[#155B4D] stroke-[2.2]" />
                  </div>
                  <div className="min-w-0 text-left">
                    <h3
                      className={`text-[#155B4D] font-bold text-[15px] sm:text-[16px] leading-[1.35] tracking-normal text-left ${
                        isTamil ? 'font-tamil' : ''
                      }`}
                    >
                      {networkTitle}
                    </h3>
                    <p
                      className={`text-[#4A524A] text-[13px] sm:text-[14px] font-normal leading-[1.5] tracking-normal text-left mt-1 ${
                        isTamil ? 'font-tamil' : ''
                      }`}
                    >
                      {networkDesc}
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </section>
      </main>
    </div>
  );
};
