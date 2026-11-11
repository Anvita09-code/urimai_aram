import React, { useEffect, useState } from 'react';
import { AccountSettingsPage } from './components/Account/AccountSettingsPage';
import { AdminGovernanceDashboard } from './components/Admin/AdminGovernanceDashboard';
import { AdminSchemeWorkspace } from './components/Admin/AdminSchemeWorkspace';
import { SignInPage } from './components/Auth/SignInPage';
import { CitizenProfilePage } from './components/CitizenProfile/CitizenProfilePage';
import { NotFoundPage } from './components/Common/NotFoundPage';
import { CitizenDashboard } from './components/Dashboard/CitizenDashboard';
import { HouseholdManagementPage } from './components/Household/HouseholdManagementPage';
import { LandingPage } from './components/LandingPage';
import { LanguageModal } from './components/LanguageModal';
import { OperatorSessionsPage } from './components/Operator/OperatorSessionsPage';
import { OperatorSessionWorkspace } from './components/Operator/OperatorSessionWorkspace';
import { ChangeReviewPage } from './components/Reviewer/ChangeReviewPage';
import { ReviewConsolePage } from './components/Reviewer/ReviewConsolePage';
import { SchemeDetailPage } from './components/SchemeDetail/SchemeDetailPage';
import { EligibilityCheckWorkflow } from './components/SchemeEligibility/EligibilityCheckWorkflow';
import { ExplorerFilters, SchemeExplorerPage } from './components/SchemeExplorer/SchemeExplorerPage';
import { ResultDetailPage } from './components/SchemeResults/ResultDetailPage';
import { SchemeResultsPage } from './components/SchemeResults/SchemeResultsPage';
import { AdminShell } from './components/Shells/AdminShell';
import { CitizenShell } from './components/Shells/CitizenShell';
import { OperatorShell } from './components/Shells/OperatorShell';
import { PublicShell } from './components/Shells/PublicShell';
import { ReviewerShell } from './components/Shells/ReviewerShell';
import { schemesData } from './data/schemes';
import {
  getPreviousOrigin,
  navigateTo,
  parseCurrentRoute,
  ParsedRoute,
} from './router/routes';
import { authService, UserRole } from './services/authService';
import { householdService } from './services/householdService';
import { Language } from './types';

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
  return ['cmchis', 'pudhumai-penn', 'uzhavar-nanban'];
};

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<ParsedRoute>(parseCurrentRoute);
  const [currentLang, setCurrentLang] = useState<Language>(getSavedLanguage);
  const [currentUser, setCurrentUser] = useState(() => authService.getCurrentUser());
  const [savedSchemeIds, setSavedSchemeIds] = useState<string[]>(getSavedSchemeIds);
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);

  // Hoisted explorer search & filter state
  const [explorerFilters, setExplorerFilters] = useState<ExplorerFilters>({
    searchQuery: '',
    selectedCategory: 'all',
    selectedLevel: 'all',
    selectedSort: 'relevance',
    showSavedOnly: false,
  });

  // Listen for browser navigation (popstate & hashchange)
  useEffect(() => {
    const handleLocationChange = () => {
      const parsed = parseCurrentRoute();
      setCurrentRoute(parsed);
      setCurrentUser(authService.getCurrentUser());
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

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

  const handleAuthSuccess = (role: UserRole, targetUrl: string) => {
    setCurrentUser(authService.getCurrentUser());
    navigateTo(targetUrl);
  };

  const handleLogout = () => {
    authService.logout();
    setCurrentUser(null);
    navigateTo('/');
  };

  // Safe Origin-Aware Back Navigation (Fixes A12)
  const handleSmartBack = (defaultFallback: string) => {
    const origin = getPreviousOrigin();
    if (origin && origin !== window.location.pathname) {
      navigateTo(origin);
    } else {
      navigateTo(defaultFallback);
    }
  };

  // Route Guard check
  const currentRole = currentUser?.role || 'public';
  const accessCheck = authService.canAccess(currentRole, currentRoute.path);
  if (!accessCheck.allowed && accessCheck.redirect && currentRoute.routeId !== 'sign-in') {
    // If not allowed, redirect to sign-in with original destination preserved
    setTimeout(() => {
      navigateTo(accessCheck.redirect!);
    }, 0);
  }

  return (
    <div className="min-h-screen bg-[#FAF7EF] text-[#202820] flex flex-col items-center justify-start antialiased selection:bg-[#F5D66A] selection:text-[#155B4D]">
      {/* Top Floating Persona Switcher for Instant Demonstrations */}
      <div className="w-full bg-[#18231E] text-white py-1 px-3 text-[11px] flex items-center justify-between border-b border-white/10 shrink-0 select-none">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-[#A4B3AA] font-bold shrink-0">Demo Persona:</span>

          <button
            type="button"
            onClick={() => {
              authService.loginAs('citizen');
              setCurrentUser(authService.getCurrentUser());
              navigateTo('/app');
            }}
            className={`px-2.5 py-0.5 rounded-full font-bold cursor-pointer transition-all ${
              currentRole === 'citizen' ? 'bg-[#155B4D] text-white shadow-2xs' : 'text-gray-300 hover:text-white'
            }`}
          >
            Citizen
          </button>

          <button
            type="button"
            onClick={() => {
              authService.loginAs('operator');
              setCurrentUser(authService.getCurrentUser());
              navigateTo('/operator');
            }}
            className={`px-2.5 py-0.5 rounded-full font-bold cursor-pointer transition-all ${
              currentRole === 'operator' ? 'bg-[#155B4D] text-white shadow-2xs' : 'text-gray-300 hover:text-white'
            }`}
          >
            Operator
          </button>

          <button
            type="button"
            onClick={() => {
              authService.loginAs('admin');
              setCurrentUser(authService.getCurrentUser());
              navigateTo('/admin');
            }}
            className={`px-2.5 py-0.5 rounded-full font-bold cursor-pointer transition-all ${
              currentRole === 'admin' ? 'bg-[#155B4D] text-white shadow-2xs' : 'text-gray-300 hover:text-white'
            }`}
          >
            Admin
          </button>

          <button
            type="button"
            onClick={() => {
              authService.loginAs('reviewer');
              setCurrentUser(authService.getCurrentUser());
              navigateTo('/review');
            }}
            className={`px-2.5 py-0.5 rounded-full font-bold cursor-pointer transition-all ${
              currentRole === 'reviewer' ? 'bg-[#1E3A8A] text-white shadow-2xs' : 'text-gray-300 hover:text-white'
            }`}
          >
            Reviewer
          </button>
        </div>

        <button
          type="button"
          onClick={() => setIsLanguageModalOpen(true)}
          className="text-[11px] text-[#F4C746] hover:underline font-bold shrink-0 cursor-pointer ml-2"
        >
          {currentLang === 'ta' ? 'English' : 'தமிழ்'}
        </button>
      </div>

      {/* Main Routed App View Container */}
      <div className="w-full flex-1 flex flex-col justify-start">
        {/* =========================================================================
            1. PUBLIC EXPERIENCE ROUTES
           ========================================================================= */}
        {currentRoute.routeId === 'landing' && (
          <PublicShell
            currentLang={currentLang}
            activeRoute="landing"
            onNavigateHome={() => navigateTo('/')}
            onNavigateSchemes={() => navigateTo('/schemes')}
            onNavigateSignIn={() => navigateTo('/sign-in')}
            onOpenLanguage={() => setIsLanguageModalOpen(true)}
          >
            <LandingPage
              currentLang={currentLang}
              onOpenLanguage={() => setIsLanguageModalOpen(true)}
              onNavigateToExplorer={() => navigateTo('/schemes')}
              onNavigateToDashboard={() => navigateTo('/app')}
            />
          </PublicShell>
        )}

        {currentRoute.routeId === 'schemes' && (
          <PublicShell
            currentLang={currentLang}
            activeRoute="schemes"
            onNavigateHome={() => navigateTo('/')}
            onNavigateBack={() => navigateTo('/')}
            onNavigateSchemes={() => navigateTo('/schemes')}
            onNavigateSignIn={() => navigateTo('/sign-in')}
            onOpenLanguage={() => setIsLanguageModalOpen(true)}
          >
            <SchemeExplorerPage
              currentLang={currentLang}
              savedSchemeIds={savedSchemeIds}
              filters={explorerFilters}
              onUpdateFilters={setExplorerFilters}
              onToggleSaveScheme={handleToggleSaveScheme}
              onBackToLanding={() => navigateTo('/')}
              onSelectScheme={(id) => navigateTo(`/schemes/${id}`, '/schemes')}
              onOpenLanguage={() => setIsLanguageModalOpen(true)}
            />
          </PublicShell>
        )}

        {currentRoute.routeId === 'scheme-detail' && (
          <PublicShell
            currentLang={currentLang}
            activeRoute="scheme-detail"
            onNavigateHome={() => navigateTo('/')}
            onNavigateBack={() => handleSmartBack('/schemes')}
            onNavigateSchemes={() => navigateTo('/schemes')}
            onNavigateSignIn={() => navigateTo('/sign-in')}
            onOpenLanguage={() => setIsLanguageModalOpen(true)}
          >
            <SchemeDetailPage
              schemeId={currentRoute.params.schemeId || ''}
              currentLang={currentLang}
              isSaved={savedSchemeIds.includes(currentRoute.params.schemeId || '')}
              onToggleSave={handleToggleSaveScheme}
              onBack={() => handleSmartBack('/schemes')}
              onBackToExplorer={() => navigateTo('/schemes')}
              onHome={() => navigateTo('/')}
              onOpenLanguage={() => setIsLanguageModalOpen(true)}
              onCheckEligibility={(schemeId) => {
                // If citizen is logged in, navigate straight to check workflow
                if (currentRole === 'citizen') {
                  navigateTo('/app/check');
                } else {
                  navigateTo(`/sign-in?redirect=${encodeURIComponent('/app/check')}`);
                }
              }}
            />
          </PublicShell>
        )}

        {currentRoute.routeId === 'sign-in' && (
          <SignInPage
            currentLang={currentLang}
            redirectUrl={currentRoute.query.redirect || '/app'}
            onSuccess={handleAuthSuccess}
            onNavigateHome={() => navigateTo('/')}
            onOpenLanguage={() => setIsLanguageModalOpen(true)}
          >
          </SignInPage>
        )}

        {/* =========================================================================
            2. CITIZEN EXPERIENCE ROUTES (With Exactly 4 Bottom Nav Items)
           ========================================================================= */}
        {currentRoute.routeId === 'citizen-home' && (
          <CitizenShell
            currentLang={currentLang}
            activeNav="home"
            onNavigateHome={() => navigateTo('/app')}
            onNavigateSchemes={() => navigateTo('/schemes', '/app')}
            onNavigateResults={() => navigateTo('/app/results')}
            onNavigateAccount={() => navigateTo('/app/account')}
            onNavigateHousehold={() => navigateTo('/app/household')}
            onOpenLanguage={() => setIsLanguageModalOpen(true)}
          >
            <CitizenDashboard
              currentLang={currentLang}
              onOpenLanguage={() => setIsLanguageModalOpen(true)}
              onNavigateToExplorer={() => navigateTo('/schemes', '/app')}
              onNavigateToScheme={(id) => navigateTo(`/app/results/${id}`, '/app')}
              onNavigateToLanding={() => navigateTo('/')}
              onNavigateToHousehold={() => navigateTo('/app/household')}
              onNavigateToProfile={() => navigateTo('/app/household/members/m1')}
              onNavigateToAccount={() => navigateTo('/app/account')}
              onNavigateToResults={() => navigateTo('/app/results')}
              onNavigateToCheck={() => navigateTo('/app/check')}
            />
          </CitizenShell>
        )}

        {currentRoute.routeId === 'household-hub' && (
          <CitizenShell
            currentLang={currentLang}
            activeNav="home"
            onNavigateHome={() => navigateTo('/app')}
            onNavigateSchemes={() => navigateTo('/schemes', '/app/household')}
            onNavigateResults={() => navigateTo('/app/results')}
            onNavigateAccount={() => navigateTo('/app/account')}
            onNavigateHousehold={() => navigateTo('/app/household')}
            onOpenLanguage={() => setIsLanguageModalOpen(true)}
          >
            <HouseholdManagementPage
              currentLang={currentLang}
              householdMembers={householdService.getMembers()}
              householdProfile={householdService.getHouseholdProfile()}
              onUpdateMembers={() => setCurrentRoute({ ...currentRoute })}
              onUpdateProfile={() => setCurrentRoute({ ...currentRoute })}
              onNavigateBack={() => navigateTo('/app')}
              onOpenLanguage={() => setIsLanguageModalOpen(true)}
              onNavigateHome={() => navigateTo('/app')}
              onNavigateToMemberQuestionnaire={(memberId) =>
                navigateTo(`/app/household/members/${memberId}`, '/app/household')
              }
              onNavigateToCheck={() => navigateTo('/app/check')}
            />
          </CitizenShell>
        )}

        {currentRoute.routeId === 'member-questionnaire' && (
          <CitizenShell
            currentLang={currentLang}
            activeNav="home"
            onNavigateHome={() => navigateTo('/app')}
            onNavigateSchemes={() => navigateTo('/schemes', '/app/household')}
            onNavigateResults={() => navigateTo('/app/results')}
            onNavigateAccount={() => navigateTo('/app/account')}
            onNavigateHousehold={() => navigateTo('/app/household')}
            onOpenLanguage={() => setIsLanguageModalOpen(true)}
          >
            <CitizenProfilePage
              memberId={currentRoute.params.memberId || 'm1'}
              currentLang={currentLang}
              initialStep={1}
              onNavigateBack={() => navigateTo('/app/household')}
              onNavigateHome={() => navigateTo('/app')}
              onNavigateToHousehold={() => navigateTo('/app/household')}
              onOpenLanguage={() => setIsLanguageModalOpen(true)}
            />
          </CitizenShell>
        )}

        {currentRoute.routeId === 'eligibility-check' && (
          <CitizenShell
            currentLang={currentLang}
            activeNav="results"
            onNavigateHome={() => navigateTo('/app')}
            onNavigateSchemes={() => navigateTo('/schemes')}
            onNavigateResults={() => navigateTo('/app/results')}
            onNavigateAccount={() => navigateTo('/app/account')}
            onNavigateHousehold={() => navigateTo('/app/household')}
            onOpenLanguage={() => setIsLanguageModalOpen(true)}
          >
            <EligibilityCheckWorkflow
              currentLang={currentLang}
              initialStep={currentRoute.query.step === '2' ? 2 : currentRoute.query.step === '3' ? 3 : 1}
              onNavigateBack={() => navigateTo('/app')}
              onNavigateHome={() => navigateTo('/app')}
              onNavigateToHousehold={() => navigateTo('/app/household')}
              onNavigateToMemberQuestionnaire={(mId) => navigateTo(`/app/household/members/${mId}`)}
              onCompleteEvaluation={() => navigateTo('/app/results')}
              onOpenLanguage={() => setIsLanguageModalOpen(true)}
            />
          </CitizenShell>
        )}

        {currentRoute.routeId === 'my-results' && (
          <CitizenShell
            currentLang={currentLang}
            activeNav="results"
            onNavigateHome={() => navigateTo('/app')}
            onNavigateSchemes={() => navigateTo('/schemes')}
            onNavigateResults={() => navigateTo('/app/results')}
            onNavigateAccount={() => navigateTo('/app/account')}
            onNavigateHousehold={() => navigateTo('/app/household')}
            onOpenLanguage={() => setIsLanguageModalOpen(true)}
          >
            <SchemeResultsPage
              currentLang={currentLang}
              onNavigateBack={() => navigateTo('/app')}
              onNavigateHome={() => navigateTo('/app')}
              onNavigateToScheme={(id) => navigateTo(`/app/results/${id}`, '/app/results')}
              onStartNewCheck={() => navigateTo('/app/check')}
              onOpenLanguage={() => setIsLanguageModalOpen(true)}
            />
          </CitizenShell>
        )}

        {currentRoute.routeId === 'result-detail' && (
          <CitizenShell
            currentLang={currentLang}
            activeNav="results"
            onNavigateHome={() => navigateTo('/app')}
            onNavigateSchemes={() => navigateTo('/schemes')}
            onNavigateResults={() => navigateTo('/app/results')}
            onNavigateAccount={() => navigateTo('/app/account')}
            onNavigateHousehold={() => navigateTo('/app/household')}
            onOpenLanguage={() => setIsLanguageModalOpen(true)}
          >
            <ResultDetailPage
              schemeId={currentRoute.params.schemeId || ''}
              currentLang={currentLang}
              initialTab={currentRoute.query.tab === 'documents' ? 'documents' : 'why'}
              onNavigateBack={() => handleSmartBack('/app/results')}
              onNavigateHome={() => navigateTo('/app')}
              onNavigateToExplorer={() => navigateTo('/schemes')}
              onTabChange={(tab) => {
                const url = `/app/results/${currentRoute.params.schemeId}?tab=${tab}`;
                window.history.replaceState(null, '', url);
              }}
            />
          </CitizenShell>
        )}

        {currentRoute.routeId === 'citizen-account' && (
          <CitizenShell
            currentLang={currentLang}
            activeNav="account"
            onNavigateHome={() => navigateTo('/app')}
            onNavigateSchemes={() => navigateTo('/schemes')}
            onNavigateResults={() => navigateTo('/app/results')}
            onNavigateAccount={() => navigateTo('/app/account')}
            onNavigateHousehold={() => navigateTo('/app/household')}
            onOpenLanguage={() => setIsLanguageModalOpen(true)}
          >
            <AccountSettingsPage
              currentLang={currentLang}
              householdProfile={householdService.getHouseholdProfile()}
              householdMembers={householdService.getMembers()}
              savedSchemeCount={savedSchemeIds.length}
              onOpenLanguage={() => setIsLanguageModalOpen(true)}
              onNavigateHome={() => navigateTo('/app')}
              onNavigateToHousehold={() => navigateTo('/app/household')}
              onNavigateToApplications={() => navigateTo('/app/results')}
              onNavigateToSavedSchemes={() => navigateTo('/schemes')}
              onNavigateToScheme={(id) => navigateTo(`/app/results/${id}`)}
              onLogout={handleLogout}
            />
          </CitizenShell>
        )}

        {/* =========================================================================
            3. OPERATOR EXPERIENCE ROUTES
           ========================================================================= */}
        {currentRoute.routeId === 'operator-sessions' && (
          <OperatorShell
            currentLang={currentLang}
            activeNav="sessions"
            onNavigateSessions={() => navigateTo('/operator')}
            onNavigateSchemes={() => navigateTo('/schemes')}
            onLogout={handleLogout}
            onOpenLanguage={() => setIsLanguageModalOpen(true)}
          >
            <OperatorSessionsPage
              currentLang={currentLang}
              onSelectSession={(id) => navigateTo(`/operator/sessions/${id}`)}
              onNavigateSchemes={() => navigateTo('/schemes')}
            />
          </OperatorShell>
        )}

        {currentRoute.routeId === 'operator-session-workspace' && (
          <OperatorShell
            currentLang={currentLang}
            activeNav="sessions"
            onNavigateSessions={() => navigateTo('/operator')}
            onNavigateSchemes={() => navigateTo('/schemes')}
            onLogout={handleLogout}
            onOpenLanguage={() => setIsLanguageModalOpen(true)}
          >
            <OperatorSessionWorkspace
              sessionId={currentRoute.params.sessionId || ''}
              currentLang={currentLang}
              onNavigateBack={() => navigateTo('/operator')}
              onNavigateHome={() => navigateTo('/operator')}
              onNavigateSchemes={() => navigateTo('/schemes')}
            />
          </OperatorShell>
        )}

        {/* =========================================================================
            4. ADMINISTRATOR EXPERIENCE ROUTES
           ========================================================================= */}
        {currentRoute.routeId === 'admin-dashboard' && (
          <AdminShell
            currentLang={currentLang}
            activeNav={currentRoute.query.tab === 'sources' ? 'sources' : 'overview'}
            onNavigateOverview={() => navigateTo('/admin')}
            onNavigateSources={() => navigateTo('/admin?tab=sources')}
            onLogout={handleLogout}
            onOpenLanguage={() => setIsLanguageModalOpen(true)}
          >
            <AdminGovernanceDashboard
              currentLang={currentLang}
              initialTab={currentRoute.query.tab === 'sources' ? 'sources' : 'schemes'}
              onSelectScheme={(id) => navigateTo(`/admin/schemes/${id}`)}
            />
          </AdminShell>
        )}

        {currentRoute.routeId === 'admin-scheme-workspace' && (
          <AdminShell
            currentLang={currentLang}
            activeNav="overview"
            onNavigateOverview={() => navigateTo('/admin')}
            onNavigateSources={() => navigateTo('/admin?tab=sources')}
            onLogout={handleLogout}
            onOpenLanguage={() => setIsLanguageModalOpen(true)}
          >
            <AdminSchemeWorkspace
              schemeId={currentRoute.params.schemeId || ''}
              currentLang={currentLang}
              onNavigateBack={() => navigateTo('/admin')}
              onNavigateHome={() => navigateTo('/admin')}
            />
          </AdminShell>
        )}

        {/* =========================================================================
            5. INDEPENDENT REVIEWER EXPERIENCE ROUTES
           ========================================================================= */}
        {currentRoute.routeId === 'reviewer-console' && (
          <ReviewerShell
            currentLang={currentLang}
            activeNav={currentRoute.query.tab === 'live' ? 'live' : currentRoute.query.tab === 'audit' ? 'audit' : 'queue'}
            onNavigateQueue={() => navigateTo('/review')}
            onNavigateLive={() => navigateTo('/review?tab=live')}
            onNavigateAudit={() => navigateTo('/review?tab=audit')}
            onLogout={handleLogout}
            onOpenLanguage={() => setIsLanguageModalOpen(true)}
          >
            <ReviewConsolePage
              currentLang={currentLang}
              initialTab={currentRoute.query.tab === 'live' ? 'live' : currentRoute.query.tab === 'audit' ? 'audit' : 'queue'}
              onSelectRequest={(id) => navigateTo(`/review/${id}`)}
            />
          </ReviewerShell>
        )}

        {currentRoute.routeId === 'reviewer-change-review' && (
          <ReviewerShell
            currentLang={currentLang}
            activeNav="queue"
            onNavigateQueue={() => navigateTo('/review')}
            onNavigateLive={() => navigateTo('/review?tab=live')}
            onNavigateAudit={() => navigateTo('/review?tab=audit')}
            onLogout={handleLogout}
            onOpenLanguage={() => setIsLanguageModalOpen(true)}
          >
            <ChangeReviewPage
              requestId={currentRoute.params.requestId || ''}
              currentLang={currentLang}
              onNavigateBack={() => navigateTo('/review')}
              onNavigateHome={() => navigateTo('/review')}
            />
          </ReviewerShell>
        )}

        {/* =========================================================================
            6. UNRECOGNIZED / NOT FOUND (404) ROUTE
           ========================================================================= */}
        {currentRoute.routeId === 'not-found' && (
          <PublicShell
            currentLang={currentLang}
            activeRoute="landing"
            onNavigateHome={() => navigateTo('/')}
            onNavigateSchemes={() => navigateTo('/schemes')}
            onNavigateSignIn={() => navigateTo('/sign-in')}
            onOpenLanguage={() => setIsLanguageModalOpen(true)}
          >
            <NotFoundPage
              currentLang={currentLang}
              onNavigateHome={() => navigateTo('/')}
              onNavigateSchemes={() => navigateTo('/schemes')}
            />
          </PublicShell>
        )}
      </div>

      {/* Shared Global Language Switcher Modal */}
      <LanguageModal
        isOpen={isLanguageModalOpen}
        currentLang={currentLang}
        onSelectLang={handleSelectLang}
        onClose={() => setIsLanguageModalOpen(false)}
      />
    </div>
  );
}
