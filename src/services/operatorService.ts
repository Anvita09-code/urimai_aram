import { EvaluatedSchemeResult, HouseholdMember, HouseholdProfile } from '../types';
import { evaluationService } from './evaluationService';
import { householdService } from './householdService';

export type OperatorSessionStatus = 'active' | 'paused' | 'closed';

export interface OperatorSession {
  id: string;
  citizenName: string;
  citizenNameTa: string;
  phone: string;
  rationCardNumber: string;
  status: OperatorSessionStatus;
  currentStep: number; // 1 to 7
  consentGiven: boolean;
  readbackConfirmed: boolean;
  householdProfile: HouseholdProfile;
  householdMembers: HouseholdMember[];
  selectedCategories: string[];
  evaluationResults: EvaluatedSchemeResult[];
  notes: string;
  createdAt: string;
  createdAtTa: string;
  updatedAt: string;
  closedAt?: string;
}

const STORAGE_KEY = 'urimai_aram_operator_sessions';

const defaultSessions: OperatorSession[] = [
  {
    id: 'SES-2026-0841',
    citizenName: 'Muthuvel K.',
    citizenNameTa: 'முத்துவேல் க.',
    phone: '+91 98412 87654',
    rationCardNumber: '04/G/0921471',
    status: 'active',
    currentStep: 3,
    consentGiven: true,
    readbackConfirmed: false,
    householdProfile: {
      headName: 'Muthuvel K.',
      headNameTa: 'முத்துவேல் க.',
      rationCardNumber: '04/G/0921471',
      annualIncome: 84000,
      district: 'Chennai',
      districtTa: 'சென்னை',
      taluk: 'Tondiarpet',
      talukTa: 'தண்டையார்பேட்டை',
      housingType: 'rented',
      areaType: 'urban',
    },
    householdMembers: [
      {
        id: 'mem-101',
        name: 'Muthuvel K.',
        nameTa: 'முத்துவேல் க.',
        relation: 'Head of Household',
        relationTa: 'குடும்பத் தலைவர்',
        age: 46,
        gender: 'Male',
        genderTa: 'ஆண்',
        aadhaarLinked: true,
        avatarType: 'male_head',
      },
      {
        id: 'mem-102',
        name: 'Revathi M.',
        nameTa: 'ரேவதி மு.',
        relation: 'Wife',
        relationTa: 'மனைவி',
        age: 41,
        gender: 'Female',
        genderTa: 'பெண்',
        aadhaarLinked: true,
        avatarType: 'female_spouse',
      },
    ],
    selectedCategories: ['health', 'social'],
    evaluationResults: [],
    notes: 'Citizen requested assistance for CMCHIS renewal and senior disability welfare check.',
    createdAt: 'Today, 10:30 AM',
    createdAtTa: 'இன்று, 10:30 மு.ப.',
    updatedAt: '12 mins ago',
  },
  {
    id: 'SES-2026-0839',
    citizenName: 'Kavitha S.',
    citizenNameTa: 'கவிதா ச.',
    phone: '+91 97890 12345',
    rationCardNumber: '02/A/0567123',
    status: 'paused',
    currentStep: 2,
    consentGiven: true,
    readbackConfirmed: false,
    householdProfile: {
      headName: 'Kavitha S.',
      headNameTa: 'கவிதா ச.',
      rationCardNumber: '02/A/0567123',
      annualIncome: 110000,
      district: 'Madurai',
      districtTa: 'மதுரை',
      taluk: 'Madurai North',
      talukTa: 'மதுரை வடக்கு',
      housingType: 'own',
      areaType: 'rural',
    },
    householdMembers: [
      {
        id: 'mem-201',
        name: 'Kavitha S.',
        nameTa: 'கவிதா ச.',
        relation: 'Head of Household',
        relationTa: 'குடும்பத் தலைவர்',
        age: 39,
        gender: 'Female',
        genderTa: 'பெண்',
        aadhaarLinked: true,
        avatarType: 'female_spouse',
      },
      {
        id: 'mem-202',
        name: 'Meena S.',
        nameTa: 'மீனா ச.',
        relation: 'Daughter',
        relationTa: 'மகள்',
        age: 18,
        gender: 'Female',
        genderTa: 'பெண்',
        aadhaarLinked: true,
        avatarType: 'girl_daughter',
      },
    ],
    selectedCategories: ['education'],
    evaluationResults: [],
    notes: 'Paused: Citizen went to fetch college Bonafide letter for Pudhumai Penn verification.',
    createdAt: 'Today, 09:15 AM',
    createdAtTa: 'இன்று, 09:15 மு.ப.',
    updatedAt: '1 hour ago',
  },
  {
    id: 'SES-2026-0820',
    citizenName: 'Subramanian V.',
    citizenNameTa: 'சுப்பிரமணியன் வி.',
    phone: '+91 94431 55678',
    rationCardNumber: '01/B/0349812',
    status: 'closed',
    currentStep: 7,
    consentGiven: true,
    readbackConfirmed: true,
    householdProfile: {
      headName: 'Subramanian V.',
      headNameTa: 'சுப்பிரமணியன் வி.',
      rationCardNumber: '01/B/0349812',
      annualIncome: 72000,
      district: 'Coimbatore',
      districtTa: 'கோயம்புத்தூர்',
      taluk: 'Pollachi',
      talukTa: 'பொள்ளாச்சி',
      housingType: 'own',
      areaType: 'rural',
    },
    householdMembers: [
      {
        id: 'mem-301',
        name: 'Subramanian V.',
        nameTa: 'சுப்பிரமணியன் வி.',
        relation: 'Head of Household',
        relationTa: 'குடும்பத் தலைவர்',
        age: 63,
        gender: 'Male',
        genderTa: 'ஆண்',
        aadhaarLinked: true,
        avatarType: 'male_head',
      },
    ],
    selectedCategories: ['agriculture', 'social'],
    evaluationResults: [],
    notes: 'Completed evaluation. Printed document readiness checklist for Uzhavar Nanban scheme.',
    createdAt: 'Yesterday, 03:45 PM',
    createdAtTa: 'நேற்று, 03:45 பி.ப.',
    updatedAt: 'Yesterday, 04:20 PM',
    closedAt: 'Yesterday, 04:20 PM',
  },
];

export const operatorService = {
  getSessions(): OperatorSession[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch {
      // fallback
    }
    this.saveSessions(defaultSessions);
    return defaultSessions;
  },

  saveSessions(sessions: OperatorSession[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
    } catch {
      // ignore
    }
  },

  getSessionById(sessionId: string): OperatorSession | undefined {
    return this.getSessions().find((s) => s.id === sessionId);
  },

  createSession(citizenName: string, phone: string, rationCardNumber: string): OperatorSession {
    const sessions = this.getSessions();
    const id = `SES-2026-${String(Math.floor(1000 + Math.random() * 9000))}`;
    const newSession: OperatorSession = {
      id,
      citizenName,
      citizenNameTa: citizenName,
      phone,
      rationCardNumber,
      status: 'active',
      currentStep: 1,
      consentGiven: false,
      readbackConfirmed: false,
      householdProfile: {
        headName: citizenName,
        headNameTa: citizenName,
        rationCardNumber,
        annualIncome: 96000,
        district: 'Chennai',
        districtTa: 'சென்னை',
        taluk: 'Egmore',
        talukTa: 'எழும்பூர்',
        housingType: 'own',
        areaType: 'urban',
      },
      householdMembers: [
        {
          id: `mem-${Date.now()}`,
          name: citizenName,
          nameTa: citizenName,
          relation: 'Head of Household',
          relationTa: 'குடும்பத் தலைவர்',
          age: 40,
          gender: 'Male',
          genderTa: 'ஆண்',
          aadhaarLinked: true,
          avatarType: 'male_head',
        },
      ],
      selectedCategories: ['health', 'education', 'social'],
      evaluationResults: [],
      notes: '',
      createdAt: 'Just now',
      createdAtTa: 'சற்று முன்',
      updatedAt: 'Just now',
    };

    sessions.unshift(newSession);
    this.saveSessions(sessions);
    return newSession;
  },

  updateSession(id: string, updates: Partial<OperatorSession>): OperatorSession | undefined {
    const sessions = this.getSessions();
    const index = sessions.findIndex((s) => s.id === id);
    if (index === -1) return undefined;
    sessions[index] = { ...sessions[index], ...updates, updatedAt: 'Just now' };
    this.saveSessions(sessions);
    return sessions[index];
  },

  pauseSession(id: string, note?: string): void {
    this.updateSession(id, {
      status: 'paused',
      notes: note ? `${note}` : undefined,
    });
  },

  resumeSession(id: string): void {
    this.updateSession(id, { status: 'active' });
  },

  closeSession(id: string, closingNotes: string): void {
    const now = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
    this.updateSession(id, {
      status: 'closed',
      currentStep: 7,
      notes: closingNotes,
      closedAt: `Today, ${now}`,
    });
  },
};

