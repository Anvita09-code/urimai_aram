import React, { useEffect, useState } from 'react';
import { CitizenProfilePage } from './components/CitizenProfile/CitizenProfilePage';
import { ProfileReviewPage } from './components/CitizenProfile/ProfileReviewPage';
import { CitizenDashboard } from './components/Dashboard/CitizenDashboard';
import { HouseholdManagementPage } from './components/Household/HouseholdManagementPage';
import { LandingPage } from './components/LandingPage';
import { LanguageModal } from './components/LanguageModal';
import { SchemeDiscoveryPage } from './components/SchemeDiscovery/SchemeDiscoveryPage';
import { SchemeResultsPage } from './components/SchemeResults/SchemeResultsPage';
import { SchemeEligibilityPage } from './components/SchemeEligibility/SchemeEligibilityPage';
import { EvidenceAssistancePage } from './components/EvidenceAssistance/EvidenceAssistancePage';
import { AccountSettingsPage } from './components/Account/AccountSettingsPage';
import { OperatorDashboardPage } from './components/Operator/OperatorDashboardPage';
import { OperatorApplicationsPage } from './components/Operator/OperatorApplicationsPage';
import { AdminDashboardPage } from './components/Admin/AdminDashboardPage';
import { AdminReviewPage } from './components/Admin/AdminReviewPage';
import { AdminAuditPage } from './components/Admin/AdminAuditPage';
import { SchemeDetailPage } from './components/SchemeDetail/SchemeDetailPage';
import { ExplorerFilters, SchemeExplorerPage } from './components/SchemeExplorer/SchemeExplorerPage';
import { HouseholdMember, HouseholdProfile, Language } from './types';

type PageRoute = 'landing' | 'explorer' | 'detail' | 'dashboard' | 'household' | 'profile' | 'review' | 'discovery' | 'results' | 'eligibility' | 'evidence' | 'account' | 'operator-dashboard' | 'operator-applications' | 'admin-dashboard' | 'admin-review' | 'admin-audit';
type ViewportWidth = '320' | '360' | '375' | '390' | '414' | '430' | 'full';

const getSavedLanguage = (): Language => {
  try {
    const saved = localStorage.getItem('urimai_aram_lang');
    if (saved === 'ta' || saved === 'en') return saved;
  } catch {
    // ignore
  }
  return 'ta';
};

const getSavedSchemeIds = (): string[] => {
  try {
    const saved = localStorage.getItem('urimai_aram_saved_schemes');
    if (saved) return JSON.parse(saved);
  } catch {
    // ignore
  }
  // Default to 3 saved schemes matching the reference image's Saved (3)
  return ['cmchis', 'pudhumai-penn', 'uzhavar-nanban'];
};

const defaultHouseholdMembers: HouseholdMember[] = [
  {
    id: 'm1',
    name: 'Rajesh Kumar',
    nameTa: 'ராஜேஷ் குமார்',
    relation: 'Head of Household',
    relationTa: 'குடும்பத் தலைவர்',
    age: 42,
    gender: 'Male',
    genderTa: 'ஆண்',
    aadhaarLinked: true,
    avatarType: 'male_head',
  },
  {
    id: 'm2',
    name: 'Lakshmi Rajesh',
    nameTa: 'லட்சுமி ராஜேஷ்',
    relation: 'Wife',
    relationTa: 'மனைவி',
    age: 38,
    gender: 'Female',
    genderTa: 'பெண்',
    aadhaarLinked: true,
    avatarType: 'female_spouse',
  },
  {
    id: 'm3',
    name: 'Aadhavan',
    nameTa: 'ஆதவன்',
    relation: 'Son',
    relationTa: 'மகன்',
    age: 14,
    gender: 'Male',
    genderTa: 'ஆண்',
    aadhaarLinked: true,
    avatarType: 'boy_son',
  },
  {
    id: 'm4',
    name: 'Anitha',
    nameTa: 'அனிதா',
    relation: 'Daughter',
    relationTa: 'மகள்',
    age: 10,
    gender: 'Female',
    genderTa: 'பெண்',
    aadhaarLinked: true,
    avatarType: 'girl_daughter',
  },
];

const getSavedHouseholdMembers = (): HouseholdMember[] => {
  try {
    const saved = localStorage.getItem('urimai_aram_household_members');
    if (saved) return JSON.parse(saved);
  } catch {
    // ignore
  }
  return defaultHouseholdMembers;
};

const defaultHouseholdProfile: HouseholdProfile = {
  headName: 'Rajesh Kumar',
  headNameTa: 'ராஜேஷ் குமார்',
  rationCardNumber: '03/G/0892415',
  annualIncome: 96000,
  district: 'Madurai',
  districtTa: 'மதுரை',
  taluk: 'Melur',
  talukTa: 'மேலூர்',
  housingType: 'own',
  areaType: 'rural',
};

const getSavedHouseholdProfile = (): HouseholdProfile => {
  try {
    const saved = localStorage.getItem('urimai_aram_household_profile');
    if (saved) return JSON.parse(saved);
  } catch {
    // ignore
  }
  return defaultHouseholdProfile;
};

const parseRouteFromLocation = (): { page: PageRoute; schemeId?: string } => {
  const hash = window.location.hash.toLowerCase();
  const path = window.location.pathname.toLowerCase();

  // 1. Check Hash first (supports direct link, bookmark, or in-app hash routing)
  if (hash.startsWith('#scheme/')) {
    const id = hash.replace('#scheme/', '').trim();
    return { page: 'detail', schemeId: id || 'cmchis' };
  }
  if (hash.startsWith('#/schemes/') || hash.startsWith('#schemes/')) {
    const id = hash.replace(/^#\/?schemes\//, '').trim();
    return { page: 'detail', schemeId: id || 'cmchis' };
  }
  if (hash === '#explore' || hash === '#schemes' || hash === '#/schemes') {
    return { page: 'explorer' };
  }
  if (hash === '#dashboard' || hash === '#/dashboard') {
    return { page: 'dashboard' };
  }
  if (hash === '#household' || hash === '#/household') {
    return { page: 'household' };
  }
  if (hash === '#profile' || hash === '#/profile') {
    return { page: 'profile' };
  }
  if (hash === '#review' || hash === '#/review') {
    return { page: 'review' };
  }
  if (hash === '#discovery' || hash === '#/discovery') {
    return { page: 'discovery' };
  }
  if (hash === '#results' || hash === '#/results') {
    return { page: 'results' };
  }
  if (hash.startsWith('#eligibility/') || hash.startsWith('#scheme-eligibility/')) {
    const id = hash.replace(/^#(eligibility|scheme-eligibility)\//, '').trim();
    return { page: 'eligibility', schemeId: id || 'cmchis' };
  }
  if (hash === '#eligibility' || hash === '#/eligibility' || hash === '#scheme-eligibility') {
    return { page: 'eligibility', schemeId: 'cmchis' };
  }
  if (hash.startsWith('#evidence/') || hash.startsWith('#documents/')) {
    const id = hash.replace(/^#(evidence|documents)\//, '').trim();
    return { page: 'evidence', schemeId: id || 'cmchis' };
  }
  if (hash === '#evidence' || hash === '#/evidence' || hash === '#documents' || hash === '#/documents') {
    return { page: 'evidence', schemeId: 'cmchis' };
  }
  if (hash === '#account' || hash === '#/account' || hash === '#settings' || hash === '#/settings') {
    return { page: 'account' };
  }
  if (hash === '#operator/applications' || hash === '#/operator/applications' || hash === '#op-apps') {
    return { page: 'operator-applications' };
  }
  if (hash === '#operator' || hash === '#/operator' || hash === '#operator/dashboard' || hash === '#/operator/dashboard' || hash === '#op-dash') {
    return { page: 'operator-dashboard' };
  }
  if (hash.startsWith('#admin/audit/')) {
    const id = hash.replace('#admin/audit/', '').trim();
    return { page: 'admin-audit', schemeId: id || 'APP-2026-084721' };
  }
  if (hash === '#admin/audit' || hash === '#/admin/audit') {
    return { page: 'admin-audit', schemeId: 'APP-2026-084721' };
  }
  if (hash === '#admin/review' || hash === '#/admin/review' || hash === '#admin/rules' || hash === '#/admin/rules') {
    return { page: 'admin-review' };
  }
  if (hash === '#admin' || hash === '#/admin' || hash === '#admin/dashboard' || hash === '#/admin/dashboard') {
    return { page: 'admin-dashboard' };
  }
  if (hash === '#landing' || hash === '#/' || hash === '#home') {
    return { page: 'landing' };
  }

  // 2. Check Pathname (for direct URL navigation)
  if (path.startsWith('/schemes/') && path.length > '/schemes/'.length) {
    const id = path.replace('/schemes/', '').replace(/\/$/, '').trim();
    return { page: 'detail', schemeId: id || 'cmchis' };
  }
  if (path.startsWith('/eligibility/') && path.length > '/eligibility/'.length) {
    const id = path.replace('/eligibility/', '').replace(/\/$/, '').trim();
    return { page: 'eligibility', schemeId: id || 'cmchis' };
  }
  if (path.startsWith('/evidence/') && path.length > '/evidence/'.length) {
    const id = path.replace('/evidence/', '').replace(/\/$/, '').trim();
    return { page: 'evidence', schemeId: id || 'cmchis' };
  }
  if (path === '/schemes' || path === '/schemes/') {
    return { page: 'explorer' };
  }
  if (path === '/dashboard' || path === '/dashboard/') {
    return { page: 'dashboard' };
  }
  if (path === '/household' || path === '/household/') {
    return { page: 'household' };
  }
  if (path === '/profile' || path === '/profile/') {
    return { page: 'profile' };
  }
  if (path === '/review' || path === '/review/') {
    return { page: 'review' };
  }
  if (path === '/discovery' || path === '/discovery/') {
    return { page: 'discovery' };
  }
  if (path === '/results' || path === '/results/') {
    return { page: 'results' };
  }
  if (path === '/eligibility' || path === '/eligibility/') {
    return { page: 'eligibility', schemeId: 'cmchis' };
  }
  if (path === '/evidence' || path === '/evidence/' || path === '/documents' || path === '/documents/') {
    return { page: 'evidence', schemeId: 'cmchis' };
  }
  if (path === '/account' || path === '/account/' || path === '/settings' || path === '/settings/') {
    return { page: 'account' };
  }
  if (path === '/operator/applications' || path === '/operator/applications/') {
    return { page: 'operator-applications' };
  }
  if (path === '/operator' || path === '/operator/' || path === '/operator/dashboard' || path === '/operator/dashboard/') {
    return { page: 'operator-dashboard' };
  }
  if (path.startsWith('/admin/audit/')) {
    const id = path.replace('/admin/audit/', '').replace(/\/$/, '').trim();
    return { page: 'admin-audit', schemeId: id || 'APP-2026-084721' };
  }
  if (path === '/admin/audit' || path === '/admin/audit/') {
    return { page: 'admin-audit', schemeId: 'APP-2026-084721' };
  }
  if (path === '/admin/review' || path === '/admin/review/' || path === '/admin/rules' || path === '/admin/rules/') {
    return { page: 'admin-review' };
  }
  if (path === '/admin' || path === '/admin/' || path === '/admin/dashboard' || path === '/admin/dashboard/') {
    return { page: 'admin-dashboard' };
  }

  // Default initial landing route
  return { page: 'landing' };
};

export default function App() {
  const initialRoute = parseRouteFromLocation();
  const [currentPage, setCurrentPage] = useState<PageRoute>(initialRoute.page);
  const [selectedSchemeId, setSelectedSchemeId] = useState<string>(initialRoute.schemeId || 'cmchis');
  const [selectedAdminAppId, setSelectedAdminAppId] = useState<string>(initialRoute.schemeId || 'APP-2026-084721');
  const [originPage, setOriginPage] = useState<'explorer' | 'dashboard'>('explorer');
  const [currentLang, setCurrentLang] = useState<Language>(getSavedLanguage);
  const [savedSchemeIds, setSavedSchemeIds] = useState<string[]>(getSavedSchemeIds);
  const [householdMembers, setHouseholdMembers] = useState<HouseholdMember[]>(getSavedHouseholdMembers);
  const [householdProfile, setHouseholdProfile] = useState<HouseholdProfile>(getSavedHouseholdProfile);
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const [viewport, setViewport] = useState<ViewportWidth>('390');
  const [selectedDiscoveryCategories, setSelectedDiscoveryCategories] = useState<string[]>(['income', 'health', 'agriculture']);

  // Hoisted explorer search & filter state to ensure filters persist when returning from Scheme Detail
  const [explorerFilters, setExplorerFilters] = useState<ExplorerFilters>({
    searchQuery: '',
    selectedCategory: 'all',
    selectedLevel: 'all',
    selectedSort: 'relevance',
    showSavedOnly: false,
  });

  // Handle URL hash changes and browser popstate for back/forward buttons
  useEffect(() => {
    const syncRouteFromUrl = () => {
      const route = parseRouteFromLocation();
      setCurrentPage(route.page);
      if (route.schemeId) {
        setSelectedSchemeId(route.schemeId);
      }
    };

    window.addEventListener('hashchange', syncRouteFromUrl);
    window.addEventListener('popstate', syncRouteFromUrl);
    return () => {
      window.removeEventListener('hashchange', syncRouteFromUrl);
      window.removeEventListener('popstate', syncRouteFromUrl);
    };
  }, []);

  const navigateToLanding = () => {
    if (window.location.hash !== '#landing') {
      window.location.hash = '#landing';
    }
    setCurrentPage('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToExplorer = () => {
    if (window.location.hash !== '#explore') {
      window.location.hash = '#explore';
    }
    setCurrentPage('explorer');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToScheme = (id: string, origin: 'explorer' | 'dashboard' = 'explorer') => {
    setOriginPage(origin);
    setSelectedSchemeId(id);
    const targetHash = `#scheme/${id}`;
    if (window.location.hash !== targetHash) {
      window.location.hash = targetHash;
    }
    setCurrentPage('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToDashboard = () => {
    if (window.location.hash !== '#dashboard') {
      window.location.hash = '#dashboard';
    }
    setCurrentPage('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToHousehold = () => {
    if (window.location.hash !== '#household') {
      window.location.hash = '#household';
    }
    setCurrentPage('household');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const [profileOrigin, setProfileOrigin] = useState<'household' | 'dashboard'>('household');
  const [profileInitialStep, setProfileInitialStep] = useState<number | 'review'>(1);

  const navigateToProfile = (origin: 'household' | 'dashboard' = 'household', step: number | 'review' = 1) => {
    setProfileOrigin(origin);
    setProfileInitialStep(step);
    if (window.location.hash !== '#profile') {
      window.location.hash = '#profile';
    }
    setCurrentPage('profile');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToReview = () => {
    if (window.location.hash !== '#review') {
      window.location.hash = '#review';
    }
    setCurrentPage('review');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToDiscovery = () => {
    if (window.location.hash !== '#discovery') {
      window.location.hash = '#discovery';
    }
    setCurrentPage('discovery');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToResults = () => {
    if (window.location.hash !== '#results') {
      window.location.hash = '#results';
    }
    setCurrentPage('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToEligibility = (schemeId: string = 'cmchis') => {
    setSelectedSchemeId(schemeId);
    if (window.location.hash !== `#eligibility/${schemeId}`) {
      window.location.hash = `#eligibility/${schemeId}`;
    }
    setCurrentPage('eligibility');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToEvidence = (schemeId: string = 'cmchis') => {
    setSelectedSchemeId(schemeId);
    if (window.location.hash !== `#evidence/${schemeId}`) {
      window.location.hash = `#evidence/${schemeId}`;
    }
    setCurrentPage('evidence');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToAccount = () => {
    if (window.location.hash !== '#account') {
      window.location.hash = '#account';
    }
    setCurrentPage('account');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToOperatorDashboard = () => {
    if (window.location.hash !== '#operator/dashboard') {
      window.location.hash = '#operator/dashboard';
    }
    setCurrentPage('operator-dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToOperatorApplications = () => {
    if (window.location.hash !== '#operator/applications') {
      window.location.hash = '#operator/applications';
    }
    setCurrentPage('operator-applications');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToAdminDashboard = () => {
    if (window.location.hash !== '#admin/dashboard') {
      window.location.hash = '#admin/dashboard';
    }
    setCurrentPage('admin-dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToAdminReview = () => {
    if (window.location.hash !== '#admin/review') {
      window.location.hash = '#admin/review';
    }
    setCurrentPage('admin-review');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToAdminAudit = (appId: string = 'APP-2026-084721') => {
    setSelectedAdminAppId(appId);
    if (window.location.hash !== `#admin/audit/${appId}`) {
      window.location.hash = `#admin/audit/${appId}`;
    }
    setCurrentPage('admin-audit');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateBackFromProfile = () => {
    if (profileOrigin === 'dashboard') {
      navigateToDashboard();
    } else {
      navigateToHousehold();
    }
  };

  // Predictable back navigation from Scheme Detail according to origin
  const navigateBackFromDetail = () => {
    if (originPage === 'dashboard') {
      navigateToDashboard();
    } else {
      navigateToExplorer();
    }
  };

  const handleSelectLang = (lang: Language) => {
    setCurrentLang(lang);
    try {
      localStorage.setItem('urimai_aram_lang', lang);
    } catch {
      // ignore
    }
  };

  const handleToggleSaveScheme = (schemeId: string) => {
    setSavedSchemeIds((prev) => {
      const exists = prev.includes(schemeId);
      const next = exists ? prev.filter((id) => id !== schemeId) : [...prev, schemeId];
      try {
        localStorage.setItem('urimai_aram_saved_schemes', JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const handleUpdateHouseholdMembers = (members: HouseholdMember[]) => {
    setHouseholdMembers(members);
    try {
      localStorage.setItem('urimai_aram_household_members', JSON.stringify(members));
    } catch {
      // ignore
    }
  };

  const handleUpdateHouseholdProfile = (profile: HouseholdProfile) => {
    setHouseholdProfile(profile);
    try {
      localStorage.setItem('urimai_aram_household_profile', JSON.stringify(profile));
    } catch {
      // ignore
    }
  };

  const getContainerWidth = () => {
    switch (viewport) {
      case '320':
        return 'max-w-[320px]';
      case '360':
        return 'max-w-[360px]';
      case '375':
        return 'max-w-[375px]';
      case '390':
        return 'max-w-[390px]';
      case '414':
        return 'max-w-[414px]';
      case '430':
        return 'max-w-[430px]';
      case 'full':
      default:
        return 'max-w-[480px] w-full';
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF7EF] text-[#20231F] flex flex-col items-center justify-start selection:bg-[#F5D66A] selection:text-[#155B4D]">
      {/* Top Floating Helper Controls for Reviewers on Large Screens */}
      <div className="hidden lg:flex fixed top-3 right-4 z-50 items-center gap-2 bg-[#1E2320]/90 backdrop-blur-md text-white text-[12px] px-3.5 py-1.5 rounded-full shadow-lg border border-white/10">
        {/* Navigation Quick Jump */}
        <span className="text-white/60 font-medium">Page:</span>
        <button
          type="button"
          onClick={navigateToLanding}
          className={`px-2 py-0.5 rounded-full font-semibold transition-all cursor-pointer ${
            currentPage === 'landing' ? 'bg-[#165446] text-white' : 'text-white/70 hover:text-white'
          }`}
        >
          01 Landing
        </button>
        <button
          type="button"
          onClick={navigateToExplorer}
          className={`px-2 py-0.5 rounded-full font-semibold transition-all cursor-pointer ${
            currentPage === 'explorer' ? 'bg-[#165446] text-white' : 'text-white/70 hover:text-white'
          }`}
        >
          02 Explorer
        </button>
        <button
          type="button"
          onClick={() => navigateToScheme('cmchis')}
          className={`px-2 py-0.5 rounded-full font-semibold transition-all cursor-pointer ${
            currentPage === 'detail' ? 'bg-[#165446] text-white' : 'text-white/70 hover:text-white'
          }`}
        >
          03 Scheme Info
        </button>
        <button
          type="button"
          onClick={navigateToDashboard}
          className={`px-2 py-0.5 rounded-full font-semibold transition-all cursor-pointer ${
            currentPage === 'dashboard' ? 'bg-[#165446] text-white shadow-xs' : 'text-white/70 hover:text-white'
          }`}
        >
          04 Dashboard
        </button>
        <button
          type="button"
          onClick={navigateToHousehold}
          className={`px-2 py-0.5 rounded-full font-semibold transition-all cursor-pointer ${
            currentPage === 'household' ? 'bg-[#165446] text-white shadow-xs' : 'text-white/70 hover:text-white'
          }`}
        >
          05 Household
        </button>
        <button
          type="button"
          onClick={() => navigateToProfile('household')}
          className={`px-2 py-0.5 rounded-full font-semibold transition-all cursor-pointer ${
            currentPage === 'profile' ? 'bg-[#165446] text-white shadow-xs' : 'text-white/70 hover:text-white'
          }`}
        >
          06 Profile
        </button>
        <button
          type="button"
          onClick={navigateToReview}
          className={`px-2 py-0.5 rounded-full font-semibold transition-all cursor-pointer ${
            currentPage === 'review' ? 'bg-[#165446] text-white shadow-xs' : 'text-white/70 hover:text-white'
          }`}
        >
          07 Review
        </button>
        <button
          type="button"
          onClick={navigateToDiscovery}
          className={`px-2 py-0.5 rounded-full font-semibold transition-all cursor-pointer ${
            currentPage === 'discovery' ? 'bg-[#165446] text-white shadow-xs' : 'text-white/70 hover:text-white'
          }`}
        >
          08 Discovery
        </button>
        <button
          type="button"
          onClick={navigateToResults}
          className={`px-2 py-0.5 rounded-full font-semibold transition-all cursor-pointer ${
            currentPage === 'results' ? 'bg-[#165446] text-white shadow-xs' : 'text-white/70 hover:text-white'
          }`}
        >
          09 Results
        </button>
        <button
          type="button"
          onClick={() => navigateToEligibility('cmchis')}
          className={`px-2 py-0.5 rounded-full font-semibold transition-all cursor-pointer ${
            currentPage === 'eligibility' ? 'bg-[#165446] text-white shadow-xs' : 'text-white/70 hover:text-white'
          }`}
        >
          10 Eligibility
        </button>
        <button
          type="button"
          onClick={() => navigateToEvidence('cmchis')}
          className={`px-2 py-0.5 rounded-full font-semibold transition-all cursor-pointer ${
            currentPage === 'evidence' ? 'bg-[#165446] text-white shadow-xs' : 'text-white/70 hover:text-white'
          }`}
        >
          11 Evidence
        </button>
        <button
          type="button"
          onClick={navigateToAccount}
          className={`px-2 py-0.5 rounded-full font-semibold transition-all cursor-pointer ${
            currentPage === 'account' ? 'bg-[#165446] text-white shadow-xs' : 'text-white/70 hover:text-white'
          }`}
        >
          12 Account
        </button>
        <button
          type="button"
          onClick={navigateToOperatorDashboard}
          className={`px-2 py-0.5 rounded-full font-semibold transition-all cursor-pointer ${
            currentPage === 'operator-dashboard' ? 'bg-[#165446] text-white shadow-xs' : 'text-white/70 hover:text-white'
          }`}
        >
          13 Op Dash
        </button>
        <button
          type="button"
          onClick={navigateToOperatorApplications}
          className={`px-2 py-0.5 rounded-full font-semibold transition-all cursor-pointer ${
            currentPage === 'operator-applications' ? 'bg-[#165446] text-white shadow-xs' : 'text-white/70 hover:text-white'
          }`}
        >
          14 Op Apps
        </button>
        <button
          type="button"
          onClick={navigateToAdminDashboard}
          className={`px-2 py-0.5 rounded-full font-semibold transition-all cursor-pointer ${
            currentPage === 'admin-dashboard' ? 'bg-[#165446] text-white shadow-xs' : 'text-white/70 hover:text-white'
          }`}
        >
          15 Admin Dash
        </button>
        <button
          type="button"
          onClick={navigateToAdminReview}
          className={`px-2 py-0.5 rounded-full font-semibold transition-all cursor-pointer ${
            currentPage === 'admin-review' ? 'bg-[#165446] text-white shadow-xs' : 'text-white/70 hover:text-white'
          }`}
        >
          16 Admin Review
        </button>
        <button
          type="button"
          onClick={() => navigateToAdminAudit('APP-2026-084721')}
          className={`px-2 py-0.5 rounded-full font-semibold transition-all cursor-pointer ${
            currentPage === 'admin-audit' ? 'bg-[#165446] text-white shadow-xs' : 'text-white/70 hover:text-white'
          }`}
        >
          17 Admin Audit
        </button>

        <span className="text-white/30">|</span>

        {/* Viewport Width Controls */}
        <span className="text-white/60 font-medium">Width:</span>
        {(['320', '360', '375', '390', '414', '430', 'full'] as ViewportWidth[]).map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => setViewport(v)}
            className={`px-2 py-0.5 rounded-full font-semibold transition-all cursor-pointer ${
              viewport === v ? 'bg-white/20 text-white' : 'text-white/70 hover:text-white'
            }`}
          >
            {v === 'full' ? 'Fluid' : `${v}px`}
          </button>
        ))}
      </div>

      {/* Screen Frame Container */}
      <div className={`w-full ${getContainerWidth()} transition-all duration-200 flex-1 flex flex-col justify-start`}>
        {currentPage === 'landing' && (
          <LandingPage
            currentLang={currentLang}
            onOpenLanguage={() => setIsLanguageModalOpen(true)}
            onNavigateToExplorer={navigateToExplorer}
            onNavigateToDashboard={navigateToDashboard}
          />
        )}

        {currentPage === 'explorer' && (
          <SchemeExplorerPage
            currentLang={currentLang}
            savedSchemeIds={savedSchemeIds}
            filters={explorerFilters}
            onUpdateFilters={setExplorerFilters}
            onToggleSaveScheme={handleToggleSaveScheme}
            onBackToLanding={navigateToLanding}
            onSelectScheme={(id) => navigateToScheme(id, 'explorer')}
            onOpenLanguage={() => setIsLanguageModalOpen(true)}
          />
        )}

        {currentPage === 'detail' && (
          <SchemeDetailPage
            schemeId={selectedSchemeId}
            currentLang={currentLang}
            isSaved={savedSchemeIds.includes(selectedSchemeId)}
            origin={originPage}
            onToggleSave={handleToggleSaveScheme}
            onBack={navigateBackFromDetail}
            onBackToExplorer={navigateToExplorer}
            onHome={navigateToLanding}
            onOpenLanguage={() => setIsLanguageModalOpen(true)}
          />
        )}

        {currentPage === 'dashboard' && (
          <CitizenDashboard
            currentLang={currentLang}
            onOpenLanguage={() => setIsLanguageModalOpen(true)}
            onNavigateToExplorer={navigateToExplorer}
            onNavigateToScheme={(id) => navigateToScheme(id, 'dashboard')}
            onNavigateToLanding={navigateToLanding}
            onNavigateToHousehold={navigateToHousehold}
            onNavigateToProfile={() => navigateToProfile('dashboard')}
            onNavigateToAccount={navigateToAccount}
            householdMembers={householdMembers}
            onUpdateMembers={handleUpdateHouseholdMembers}
          />
        )}

        {currentPage === 'household' && (
          <HouseholdManagementPage
            currentLang={currentLang}
            householdMembers={householdMembers}
            householdProfile={householdProfile}
            onUpdateMembers={handleUpdateHouseholdMembers}
            onUpdateProfile={handleUpdateHouseholdProfile}
            onNavigateBack={navigateToDashboard}
            onOpenLanguage={() => setIsLanguageModalOpen(true)}
            onNavigateHome={navigateToLanding}
            onNavigateToProfile={() => navigateToProfile('household')}
          />
        )}

        {currentPage === 'profile' && (
          <CitizenProfilePage
            currentLang={currentLang}
            initialStep={profileInitialStep}
            onNavigateBack={navigateBackFromProfile}
            onNavigateHome={navigateToLanding}
            onNavigateToExplorer={navigateToExplorer}
            onNavigateToDashboard={navigateToDashboard}
            onOpenLanguage={() => setIsLanguageModalOpen(true)}
          />
        )}

        {currentPage === 'review' && (
          <ProfileReviewPage
            currentLang={currentLang}
            formData={{
              fullName: 'ராஜேஷ் குமார்',
              gender: 'Male',
              age: 42,
              dob: '15-06-1982',
              maritalStatus: 'married',
              idDocType: 'aadhaar',
              idDocNumber: '1234 5678 9012',
              isStep1Unknown: false,
              educationLevel: 'secondary',
              occupationType: 'farmer',
              isStudentEnrolled: false,
              isStep2Unknown: false,
              annualIncome: 96000,
              incomeCertificateAvailable: true,
              bplStatus: true,
              landHoldingAcres: 1.5,
              isStep3Unknown: false,
              housingType: 'own',
              roofType: 'semi_pucca',
              electricityConnection: true,
              cookingGasLPG: true,
              isStep4Unknown: false,
              socialCategory: 'bc',
              differentlyAbled: false,
              bankAccountLinked: true,
              isStep5Unknown: false,
            }}
            onNavigateBack={() => navigateToProfile('household', 5)}
            onNavigateHome={navigateToLanding}
            onOpenLanguage={() => setIsLanguageModalOpen(true)}
            onSelectSection={(step) => navigateToProfile('household', step)}
            onMakeCorrections={() => navigateToProfile('household', 4)}
            onConfirm={() => navigateToDiscovery()}
          />
        )}

        {currentPage === 'discovery' && (
          <SchemeDiscoveryPage
            currentLang={currentLang}
            householdProfile={householdProfile}
            householdMembers={householdMembers}
            onNavigateBack={navigateToReview}
            onNavigateHome={navigateToLanding}
            onNavigateToHousehold={navigateToHousehold}
            onOpenLanguage={() => setIsLanguageModalOpen(true)}
            onStartEvaluation={(selectedCategories) => {
              setSelectedDiscoveryCategories(selectedCategories);
              navigateToResults();
            }}
          />
        )}

        {currentPage === 'results' && (
          <SchemeResultsPage
            currentLang={currentLang}
            householdProfile={householdProfile}
            householdMembers={householdMembers}
            onNavigateBack={navigateToDiscovery}
            onNavigateHome={navigateToLanding}
            onNavigateToHousehold={navigateToHousehold}
            onNavigateToScheme={(id) => navigateToEligibility(id)}
            onModifySearch={navigateToDiscovery}
            onViewDetailedResults={navigateToExplorer}
            onOpenLanguage={() => setIsLanguageModalOpen(true)}
          />
        )}

        {currentPage === 'eligibility' && (
          <SchemeEligibilityPage
            currentLang={currentLang}
            schemeId={selectedSchemeId}
            householdProfile={householdProfile}
            householdMembers={householdMembers}
            onNavigateBack={navigateToResults}
            onNavigateHome={navigateToLanding}
            onOpenLanguage={() => setIsLanguageModalOpen(true)}
            onContinueToDocuments={(id) => navigateToEvidence(id)}
            onViewAllDocuments={(id) => navigateToEvidence(id)}
          />
        )}

        {currentPage === 'evidence' && (
          <EvidenceAssistancePage
            currentLang={currentLang}
            schemeId={selectedSchemeId}
            householdProfile={householdProfile}
            householdMembers={householdMembers}
            onNavigateBack={() => navigateToEligibility(selectedSchemeId)}
            onNavigateHome={navigateToLanding}
            onOpenLanguage={() => setIsLanguageModalOpen(true)}
          />
        )}

        {currentPage === 'account' && (
          <AccountSettingsPage
            currentLang={currentLang}
            householdProfile={householdProfile}
            householdMembers={householdMembers}
            savedSchemeCount={savedSchemeIds.length}
            onOpenLanguage={() => setIsLanguageModalOpen(true)}
            onNavigateHome={navigateToLanding}
            onNavigateToHousehold={navigateToHousehold}
            onNavigateToApplications={navigateToExplorer}
            onNavigateToSavedSchemes={navigateToExplorer}
            onNavigateToScheme={(id) => navigateToEligibility(id)}
            onNavigateToOperator={navigateToOperatorDashboard}
            onLogout={navigateToLanding}
          />
        )}

        {currentPage === 'operator-dashboard' && (
          <OperatorDashboardPage
            currentLang={currentLang}
            onOpenLanguage={() => setIsLanguageModalOpen(true)}
            onNavigateHome={navigateToLanding}
            onNavigateApplications={navigateToOperatorApplications}
            onNavigateSearchSchemes={navigateToExplorer}
          />
        )}

        {currentPage === 'operator-applications' && (
          <OperatorApplicationsPage
            currentLang={currentLang}
            onOpenLanguage={() => setIsLanguageModalOpen(true)}
            onNavigateBack={navigateToOperatorDashboard}
            onNavigateHome={navigateToOperatorDashboard}
          />
        )}

        {currentPage === 'admin-dashboard' && (
          <AdminDashboardPage
            currentLang={currentLang}
            onOpenLanguage={() => setIsLanguageModalOpen(true)}
            onNavigateHome={navigateToLanding}
            onNavigateReview={navigateToAdminReview}
          />
        )}

        {currentPage === 'admin-review' && (
          <AdminReviewPage
            currentLang={currentLang}
            onOpenLanguage={() => setIsLanguageModalOpen(true)}
            onNavigateBack={navigateToAdminDashboard}
            onNavigateHome={navigateToLanding}
            onSelectApplication={(id) => navigateToAdminAudit(id)}
          />
        )}

        {currentPage === 'admin-audit' && (
          <AdminAuditPage
            currentLang={currentLang}
            applicationId={selectedAdminAppId}
            onNavigateBack={navigateToAdminReview}
            onNavigateHome={navigateToLanding}
          />
        )}
      </div>

      {/* Shared Persistent Language Modal */}
      <LanguageModal
        isOpen={isLanguageModalOpen}
        currentLang={currentLang}
        onSelectLang={handleSelectLang}
        onClose={() => setIsLanguageModalOpen(false)}
      />
    </div>
  );
}
