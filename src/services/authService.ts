export type UserRole = 'public' | 'citizen' | 'operator' | 'admin' | 'reviewer';

export interface AuthUser {
  id: string;
  name: string;
  nameTa: string;
  role: UserRole;
  phone?: string;
  designation?: string;
  designationTa?: string;
  department?: string;
  departmentTa?: string;
  centerName?: string;
  centerNameTa?: string;
  email?: string;
}

export const DEMO_USERS: Record<Exclude<UserRole, 'public'>, AuthUser> = {
  citizen: {
    id: 'cit-001',
    name: 'Rajesh Kumar',
    nameTa: 'ராஜேஷ் குமார்',
    role: 'citizen',
    phone: '+91 98765 43210',
    email: 'rajesh.kumar@example.com',
  },
  operator: {
    id: 'OP-TN-042',
    name: 'Gayathri S.',
    nameTa: 'காயத்ரி ச.',
    role: 'operator',
    designation: 'Assistance Centre Operator',
    designationTa: 'உதவி மைய ஆபரேட்டர்',
    centerName: 'e-Sevai Assistance Centre #14, Chennai',
    centerNameTa: 'இ-சேவை உதவி மையம் #14, சென்னை',
    phone: '+91 94441 23890',
  },
  admin: {
    id: 'ADM-TN-001',
    name: 'Kannan M.',
    nameTa: 'கண்ணன் மு.',
    role: 'admin',
    designation: 'State Scheme Administrator',
    designationTa: 'மாநில திட்ட நிர்வாகி',
    department: 'Special Programme Implementation Department',
    departmentTa: 'சிறப்பு திட்ட செயலாக்கத் துறை',
    email: 'admin.urimaiaram@tn.gov.in',
  },
  reviewer: {
    id: 'REV-TN-108',
    name: 'Dr. V. Sundaram',
    nameTa: 'முனைவர் வெ. சுந்தரம்',
    role: 'reviewer',
    designation: 'Independent Welfare Reviewer',
    designationTa: 'சுயாதீன நல மதிப்பீட்டாளர்',
    department: 'State Welfare Policy Advisory Council',
    departmentTa: 'மாநில நலக் கொள்கை ஆலோசனைக் குழு',
    email: 'reviewer.urimaiaram@tn.gov.in',
  },
};

const AUTH_STORAGE_KEY = 'urimai_aram_auth';

export const authService = {
  getCurrentUser(): AuthUser | null {
    try {
      const raw = localStorage.getItem(AUTH_STORAGE_KEY);
      if (raw) {
        return JSON.parse(raw);
      }
    } catch {
      // fallback
    }
    // Default demonstration state: signed in as Citizen so citizen flow is immediately demonstrable
    return DEMO_USERS.citizen;
  },

  getCurrentRole(): UserRole {
    const user = this.getCurrentUser();
    return user ? user.role : 'public';
  },

  loginAs(role: Exclude<UserRole, 'public'>): AuthUser {
    const user = DEMO_USERS[role];
    try {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    } catch {
      // ignore
    }
    return user;
  },

  loginCustom(user: AuthUser): void {
    try {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    } catch {
      // ignore
    }
  },

  logout(): void {
    try {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    } catch {
      // ignore
    }
  },

  canAccess(role: UserRole, path: string): { allowed: boolean; redirect?: string } {
    const normalized = path.toLowerCase();
    
    // Public routes: landing, schemes catalogue, sign-in
    if (normalized === '/' || normalized === '/schemes' || normalized.startsWith('/schemes/') || normalized === '/sign-in') {
      return { allowed: true };
    }

    // Citizen routes
    if (normalized.startsWith('/app')) {
      if (role === 'citizen') return { allowed: true };
      return { allowed: false, redirect: `/sign-in?redirect=${encodeURIComponent(path)}` };
    }

    // Operator routes
    if (normalized.startsWith('/operator')) {
      if (role === 'operator') return { allowed: true };
      return { allowed: false, redirect: `/sign-in?redirect=${encodeURIComponent(path)}` };
    }

    // Administrator routes
    if (normalized.startsWith('/admin')) {
      if (role === 'admin') return { allowed: true };
      return { allowed: false, redirect: `/sign-in?redirect=${encodeURIComponent(path)}` };
    }

    // Independent Reviewer routes
    if (normalized.startsWith('/review')) {
      if (role === 'reviewer') return { allowed: true };
      return { allowed: false, redirect: `/sign-in?redirect=${encodeURIComponent(path)}` };
    }

    return { allowed: true };
  },
};

