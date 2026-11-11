export type RouteId =
  | 'landing'
  | 'schemes'
  | 'scheme-detail'
  | 'sign-in'
  | 'citizen-home'
  | 'household-hub'
  | 'member-questionnaire'
  | 'eligibility-check'
  | 'my-results'
  | 'result-detail'
  | 'citizen-account'
  | 'operator-sessions'
  | 'operator-session-workspace'
  | 'admin-dashboard'
  | 'admin-scheme-workspace'
  | 'reviewer-console'
  | 'reviewer-change-review'
  | 'not-found';

export interface ParsedRoute {
  routeId: RouteId;
  path: string;
  rawPath: string;
  params: {
    schemeId?: string;
    memberId?: string;
    sessionId?: string;
    requestId?: string;
  };
  query: Record<string, string>;
  origin?: string;
}

export function parseCurrentRoute(): ParsedRoute {
  // Support both hash and pathname
  const hash = window.location.hash;
  const pathname = window.location.pathname;
  const search = window.location.search;

  let effectivePath = pathname;
  let effectiveSearch = search;

  if (hash && hash.length > 1) {
    // If hash starts with #/ or #
    const cleanHash = hash.startsWith('#/') ? hash.slice(1) : hash.startsWith('#') ? hash.slice(1) : hash;
    const [hPath, hQuery] = cleanHash.split('?');
    if (hPath && hPath !== '' && hPath !== 'landing') {
      effectivePath = hPath.startsWith('/') ? hPath : `/${hPath}`;
    }
    if (hQuery) {
      effectiveSearch = `?${hQuery}`;
    }
  }

  // Parse query parameters
  const query: Record<string, string> = {};
  if (effectiveSearch) {
    const usp = new URLSearchParams(effectiveSearch);
    usp.forEach((val, key) => {
      query[key] = val;
    });
  }

  // Normalize path
  const normalized = effectivePath.replace(/\/+$/, '') || '/';

  // 1. Public Experience
  if (normalized === '/' || normalized === '/home') {
    return { routeId: 'landing', path: '/', rawPath: normalized, params: {}, query };
  }
  if (normalized === '/schemes' || normalized === '/explore') {
    return { routeId: 'schemes', path: '/schemes', rawPath: normalized, params: {}, query };
  }
  const schemeDetailMatch = normalized.match(/^\/schemes\/([^/]+)$/);
  if (schemeDetailMatch) {
    return {
      routeId: 'scheme-detail',
      path: normalized,
      rawPath: normalized,
      params: { schemeId: decodeURIComponent(schemeDetailMatch[1]) },
      query,
    };
  }
  if (normalized === '/sign-in' || normalized === '/login') {
    return { routeId: 'sign-in', path: '/sign-in', rawPath: normalized, params: {}, query };
  }

  // 2. Citizen Experience
  if (normalized === '/app' || normalized === '/app/home' || normalized === '/dashboard') {
    return { routeId: 'citizen-home', path: '/app', rawPath: normalized, params: {}, query };
  }
  if (normalized === '/app/household' || normalized === '/household') {
    return { routeId: 'household-hub', path: '/app/household', rawPath: normalized, params: {}, query };
  }
  const memberQMatch = normalized.match(/^\/app\/household\/members\/([^/]+)$/);
  if (memberQMatch) {
    return {
      routeId: 'member-questionnaire',
      path: normalized,
      rawPath: normalized,
      params: { memberId: decodeURIComponent(memberQMatch[1]) },
      query,
    };
  }
  // Also support legacy /profile route
  if (normalized === '/profile' || normalized === '/app/profile') {
    return {
      routeId: 'member-questionnaire',
      path: '/app/household/members/m1',
      rawPath: normalized,
      params: { memberId: 'm1' },
      query,
    };
  }
  if (normalized === '/app/check' || normalized === '/discovery' || normalized === '/review') {
    return { routeId: 'eligibility-check', path: '/app/check', rawPath: normalized, params: {}, query };
  }
  if (normalized === '/app/results' || normalized === '/results') {
    return { routeId: 'my-results', path: '/app/results', rawPath: normalized, params: {}, query };
  }
  const resultDetailMatch = normalized.match(/^\/app\/results\/([^/]+)$/);
  if (resultDetailMatch) {
    return {
      routeId: 'result-detail',
      path: normalized,
      rawPath: normalized,
      params: { schemeId: decodeURIComponent(resultDetailMatch[1]) },
      query,
    };
  }
  // Support legacy /eligibility/:id or /evidence/:id -> redirects to /app/results/:schemeId
  const legacyEligMatch = normalized.match(/^\/(?:eligibility|evidence|scheme-eligibility)\/([^/]+)$/);
  if (legacyEligMatch) {
    return {
      routeId: 'result-detail',
      path: `/app/results/${legacyEligMatch[1]}`,
      rawPath: normalized,
      params: { schemeId: decodeURIComponent(legacyEligMatch[1]) },
      query,
    };
  }
  if (normalized === '/app/account' || normalized === '/account' || normalized === '/settings') {
    return { routeId: 'citizen-account', path: '/app/account', rawPath: normalized, params: {}, query };
  }

  // 3. Operator Experience
  if (normalized === '/operator' || normalized === '/operator/dashboard' || normalized === '/operator/applications') {
    return { routeId: 'operator-sessions', path: '/operator', rawPath: normalized, params: {}, query };
  }
  const opSessionMatch = normalized.match(/^\/operator\/sessions\/([^/]+)$/);
  if (opSessionMatch) {
    return {
      routeId: 'operator-session-workspace',
      path: normalized,
      rawPath: normalized,
      params: { sessionId: decodeURIComponent(opSessionMatch[1]) },
      query,
    };
  }

  // 4. Administrator Experience
  if (normalized === '/admin' || normalized === '/admin/dashboard' || normalized === '/admin/rules') {
    return { routeId: 'admin-dashboard', path: '/admin', rawPath: normalized, params: {}, query };
  }
  const adminSchemeMatch = normalized.match(/^\/admin\/schemes\/([^/]+)$/);
  if (adminSchemeMatch) {
    return {
      routeId: 'admin-scheme-workspace',
      path: normalized,
      rawPath: normalized,
      params: { schemeId: decodeURIComponent(adminSchemeMatch[1]) },
      query,
    };
  }

  // 5. Independent Reviewer Experience
  if (normalized === '/review' || normalized === '/review/console' || normalized === '/admin/review') {
    return { routeId: 'reviewer-console', path: '/review', rawPath: normalized, params: {}, query };
  }
  const reviewerReqMatch = normalized.match(/^\/review\/([^/]+)$/);
  if (reviewerReqMatch && reviewerReqMatch[1] !== 'console') {
    return {
      routeId: 'reviewer-change-review',
      path: normalized,
      rawPath: normalized,
      params: { requestId: decodeURIComponent(reviewerReqMatch[1]) },
      query,
    };
  }
  // Support legacy admin audit deep links
  const legacyAuditMatch = normalized.match(/^\/admin\/audit\/([^/]+)$/);
  if (legacyAuditMatch) {
    return {
      routeId: 'reviewer-change-review',
      path: `/review/REQ-2026-0042`,
      rawPath: normalized,
      params: { requestId: 'REQ-2026-0042' },
      query,
    };
  }

  // Unknown route
  return { routeId: 'not-found', path: normalized, rawPath: normalized, params: {}, query };
}

export function navigateTo(url: string, origin?: string): void {
  // Save origin in sessionStorage for back navigation tracking
  if (origin) {
    try {
      sessionStorage.setItem('urimai_aram_prev_origin', origin);
    } catch {
      // ignore
    }
  }

  // Update history and hash
  if (window.history && window.history.pushState) {
    window.history.pushState({ origin }, '', url);
  }
  // Also keep hash updated for environments where path routing is static
  const targetHash = `#${url.startsWith('/') ? url : `/${url}`}`;
  if (window.location.hash !== targetHash) {
    window.location.hash = targetHash;
  }
  // Dispatch custom popstate event so App reacts immediately
  window.dispatchEvent(new PopStateEvent('popstate'));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

export function getPreviousOrigin(): string | null {
  try {
    return sessionStorage.getItem('urimai_aram_prev_origin');
  } catch {
    return null;
  }
}

