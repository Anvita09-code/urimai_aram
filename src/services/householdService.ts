import { CitizenProfileData, HouseholdMember, HouseholdProfile } from '../types';

export interface HouseholdState {
  id: string;
  name: string;
  nameTa: string;
  profile: HouseholdProfile;
  members: HouseholdMember[];
  memberProfiles: Record<string, CitizenProfileData>;
}

const defaultProfile: HouseholdProfile = {
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

const defaultMembers: HouseholdMember[] = [
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

export const defaultHeadMemberProfile: CitizenProfileData = {
  fullName: 'Rajesh Kumar',
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
};

const STORAGE_KEY = 'urimai_aram_household_unified';

export const householdService = {
  getState(): HouseholdState {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        return JSON.parse(raw);
      }
    } catch {
      // fallback
    }
    // Check legacy storage keys if present
    let legacyProfile = defaultProfile;
    let legacyMembers = defaultMembers;
    let legacyHeadProfile = defaultHeadMemberProfile;

    try {
      const rawProf = localStorage.getItem('urimai_aram_household_profile');
      if (rawProf) legacyProfile = JSON.parse(rawProf);
      const rawMemb = localStorage.getItem('urimai_aram_household_members');
      if (rawMemb) legacyMembers = JSON.parse(rawMemb);
      const rawCit = localStorage.getItem('urimai_aram_citizen_profile');
      if (rawCit) legacyHeadProfile = { ...defaultHeadMemberProfile, ...JSON.parse(rawCit) };
    } catch {
      // ignore
    }

    const initial: HouseholdState = {
      id: 'HH24001567',
      name: 'Rajesh Kumar Family',
      nameTa: 'ராஜேஷ் குமார் குடும்பம்',
      profile: legacyProfile,
      members: legacyMembers,
      memberProfiles: {
        m1: legacyHeadProfile,
      },
    };
    this.saveState(initial);
    return initial;
  },

  saveState(state: HouseholdState): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      // sync legacy keys for backward compatibility
      localStorage.setItem('urimai_aram_household_profile', JSON.stringify(state.profile));
      localStorage.setItem('urimai_aram_household_members', JSON.stringify(state.members));
      if (state.memberProfiles['m1']) {
        localStorage.setItem('urimai_aram_citizen_profile', JSON.stringify(state.memberProfiles['m1']));
      }
    } catch {
      // ignore
    }
  },

  getHouseholdProfile(): HouseholdProfile {
    return this.getState().profile;
  },

  updateHouseholdProfile(profile: HouseholdProfile): HouseholdProfile {
    const state = this.getState();
    state.profile = profile;
    this.saveState(state);
    return state.profile;
  },

  getMembers(): HouseholdMember[] {
    return this.getState().members;
  },

  getMember(id: string): HouseholdMember | undefined {
    return this.getState().members.find((m) => m.id === id);
  },

  addMember(member: Omit<HouseholdMember, 'id'>): HouseholdMember {
    const state = this.getState();
    const newId = `m${Date.now()}`;
    const newMember: HouseholdMember = { ...member, id: newId };
    state.members.push(newMember);
    this.saveState(state);
    return newMember;
  },

  updateMember(id: string, updates: Partial<HouseholdMember>): HouseholdMember | undefined {
    const state = this.getState();
    const index = state.members.findIndex((m) => m.id === id);
    if (index === -1) return undefined;
    state.members[index] = { ...state.members[index], ...updates };
    this.saveState(state);
    return state.members[index];
  },

  removeMember(id: string): boolean {
    const state = this.getState();
    const before = state.members.length;
    state.members = state.members.filter((m) => m.id !== id);
    if (state.memberProfiles[id]) {
      delete state.memberProfiles[id];
    }
    this.saveState(state);
    return state.members.length < before;
  },

  getMemberProfile(memberId: string): CitizenProfileData {
    const state = this.getState();
    if (state.memberProfiles[memberId]) {
      return state.memberProfiles[memberId];
    }
    const member = state.members.find((m) => m.id === memberId);
    // Create sensible template for this member
    const template: CitizenProfileData = {
      fullName: member ? member.name : '',
      gender: member ? member.gender : 'Male',
      age: member ? member.age : 30,
      dob: '',
      maritalStatus: member?.relation === 'Head of Household' ? 'married' : 'unmarried',
      idDocType: member?.aadhaarLinked ? 'aadhaar' : 'voter',
      idDocNumber: member?.aadhaarLinked ? 'XXXX XXXX 1234' : '',
      isStep1Unknown: false,
      educationLevel: 'secondary',
      occupationType: member?.relation === 'Head of Household' ? 'farmer' : 'homemaker',
      isStudentEnrolled: member ? member.age < 23 && member.age > 5 : false,
      isStep2Unknown: false,
      annualIncome: state.profile.annualIncome,
      incomeCertificateAvailable: true,
      bplStatus: state.profile.annualIncome <= 120000,
      landHoldingAcres: 1.5,
      isStep3Unknown: false,
      housingType: state.profile.housingType,
      roofType: 'semi_pucca',
      electricityConnection: true,
      cookingGasLPG: true,
      isStep4Unknown: false,
      socialCategory: 'bc',
      differentlyAbled: false,
      bankAccountLinked: true,
      isStep5Unknown: false,
    };
    state.memberProfiles[memberId] = template;
    this.saveState(state);
    return template;
  },

  saveMemberProfile(memberId: string, profile: CitizenProfileData): void {
    const state = this.getState();
    state.memberProfiles[memberId] = profile;
    // Also sync member's base name/age/gender if modified
    const memberIndex = state.members.findIndex((m) => m.id === memberId);
    if (memberIndex !== -1) {
      if (profile.fullName) state.members[memberIndex].name = profile.fullName;
      if (profile.age) state.members[memberIndex].age = Number(profile.age) || state.members[memberIndex].age;
      if (profile.gender) {
        state.members[memberIndex].gender = profile.gender;
        state.members[memberIndex].genderTa = profile.gender === 'Female' ? 'பெண்' : profile.gender === 'Other' ? 'மற்றவை' : 'ஆண்';
      }
    }
    this.saveState(state);
  },

  calculateCompleteness(): { percentage: number; missingFields: string[]; totalCheckpoints: number; completedCheckpoints: number } {
    const state = this.getState();
    const missing: string[] = [];
    let total = 0;
    let completed = 0;

    // Household level checkpoints (weight: 5)
    total += 5;
    if (state.profile.headName?.trim()) completed++; else missing.push('Head of household name');
    if (state.profile.rationCardNumber?.trim()) completed++; else missing.push('Smart ration card number');
    if (state.profile.annualIncome > 0) completed++; else missing.push('Annual household income');
    if (state.profile.district?.trim()) completed++; else missing.push('District');
    if (state.profile.taluk?.trim()) completed++; else missing.push('Taluk');

    // Members check (at least 1 member)
    total += 2;
    if (state.members.length > 0) completed += 2; else missing.push('At least one household member');

    // Primary applicant questionnaire checkpoints
    const headMember = state.members[0];
    if (headMember) {
      const q = state.memberProfiles[headMember.id] || defaultHeadMemberProfile;
      total += 8;
      if (q.fullName?.trim()) completed++; else missing.push('Full name');
      if (q.age) completed++; else missing.push('Age');
      if (q.educationLevel) completed++; else missing.push('Education level');
      if (q.occupationType) completed++; else missing.push('Occupation');
      if (q.annualIncome !== undefined) completed++; else missing.push('Income verification');
      if (q.housingType) completed++; else missing.push('Housing status');
      if (q.socialCategory) completed++; else missing.push('Social category');
      if (q.bankAccountLinked !== undefined) completed++; else missing.push('Bank account linkage');
    }

    const percentage = Math.min(100, Math.round((completed / total) * 100));
    return { percentage, missingFields: missing, totalCheckpoints: total, completedCheckpoints: completed };
  },

  resetAll(): void {
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem('urimai_aram_household_profile');
      localStorage.removeItem('urimai_aram_household_members');
      localStorage.removeItem('urimai_aram_citizen_profile');
      localStorage.removeItem('urimai_aram_saved_schemes');
      localStorage.removeItem('urimai_aram_evaluations');
      localStorage.removeItem('urimai_aram_auth');
    } catch {
      // ignore
    }
  },
};

