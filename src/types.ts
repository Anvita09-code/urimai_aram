export type Language = 'ta' | 'en';

export type SchemeCategory = 'all' | 'health' | 'education' | 'agriculture' | 'social' | 'housing';
export type AdminLevel = 'all' | 'state' | 'central';
export type SortOption = 'relevance' | 'alphabetical' | 'recently_updated';

export interface SchemeDetailItem {
  title: string;
  desc: string;
}

export interface SchemeRecord {
  schemeId: string;
  schemeName: string;
  schemeNameTa: string;
  officialName: string;
  officialNameTa: string;
  summary: string;
  summaryTa: string;
  category: SchemeCategory;
  categoryLabelEn: string;
  categoryLabelTa: string;
  governmentLevel: 'state' | 'central';
  administeringAuthority: string;
  administeringAuthorityTa: string;
  departmentEn?: string;
  departmentTa?: string;
  icon: 'medical-shield' | 'graduation-cap' | 'plant' | 'people' | 'home';
  officialSource: string;
  sourceUrl: string;
  sourceLastVerified: string;
  lastUpdated: string;
  activeStatus: boolean;
  benefitEn: string;
  benefitTa: string;
  purposeEn?: string;
  purposeTa?: string;
  keyBenefitsEn?: string[];
  keyBenefitsTa?: string[];
  lastUpdatedDateEn?: string;
  lastUpdatedDateTa?: string;
  eligibilityEn: string[];
  eligibilityTa: string[];
  eligibilityCardsEn?: SchemeDetailItem[];
  eligibilityCardsTa?: SchemeDetailItem[];
  documentsEn: string[];
  documentsTa: string[];
  documentCardsEn?: SchemeDetailItem[];
  documentCardsTa?: SchemeDetailItem[];
  portalDescEn?: string;
  portalDescTa?: string;
  helplineNumber?: string;
  helplineTitleEn?: string;
  helplineTitleTa?: string;
  helplineDescEn?: string;
  helplineDescTa?: string;
  networkTitleEn?: string;
  networkTitleTa?: string;
  networkDescEn?: string;
  networkDescTa?: string;
}

export interface FeatureCardData {
  id: string;
  titleKey: string;
  descKey: string;
  icon: 'search' | 'checklist' | 'document' | 'shield';
}

export interface HouseholdMember {
  id: string;
  name: string;
  nameTa: string;
  relation: string;
  relationTa: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  genderTa: 'ஆண்' | 'பெண்' | 'மற்றவை';
  aadhaarLinked: boolean;
  avatarType?: 'male_head' | 'female_spouse' | 'boy_son' | 'girl_daughter' | 'generic';
}

export interface HouseholdProfile {
  headName: string;
  headNameTa: string;
  rationCardNumber: string;
  annualIncome: number;
  district: string;
  districtTa: string;
  taluk: string;
  talukTa: string;
  housingType: 'own' | 'rented';
  areaType: 'rural' | 'urban';
}

export interface CitizenProfileData {
  // Step 1: Personal Information (Reference Screen)
  fullName: string;
  gender: 'Male' | 'Female' | 'Other';
  age: number | string;
  dob: string;
  maritalStatus: 'married' | 'unmarried' | 'widowed' | 'divorced';
  idDocType: 'aadhaar' | 'voter' | 'ration' | 'pan' | 'driving';
  idDocNumber: string;
  isStep1Unknown: boolean;

  // Step 2: Education & Work
  educationLevel: 'none' | 'primary' | 'secondary' | 'higher_secondary' | 'diploma' | 'graduate' | 'postgraduate';
  occupationType: 'farmer' | 'agricultural_labour' | 'self_employed' | 'salaried_private' | 'government' | 'homemaker' | 'student' | 'unemployed';
  isStudentEnrolled: boolean;
  isStep2Unknown: boolean;

  // Step 3: Income & Livelihood
  annualIncome: number | string;
  incomeCertificateAvailable: boolean;
  bplStatus: boolean;
  landHoldingAcres: number | string;
  isStep3Unknown: boolean;

  // Step 4: Housing & Assets
  housingType: 'own' | 'rented' | 'hut' | 'homeless';
  roofType: 'pucca' | 'semi_pucca' | 'kutcha';
  electricityConnection: boolean;
  cookingGasLPG: boolean;
  isStep4Unknown: boolean;

  // Step 5: Other Details
  socialCategory: 'oc' | 'bc' | 'mbc_dnc' | 'sc' | 'st';
  differentlyAbled: boolean;
  disabilityPercentage?: number | string;
  bankAccountLinked: boolean;
  isStep5Unknown: boolean;
}

export type SchemeOutcomeStatus = 'matched' | 'conditional' | 'insufficient' | 'conflict' | 'not_matched';

export interface EvaluatedSchemeResult {
  id: string;
  schemeId: string;
  titleEn: string;
  titleTa: string;
  deptEn: string;
  deptTa: string;
  descEn: string;
  descTa: string;
  category: SchemeCategory;
  iconType: 'plant' | 'health' | 'education' | 'housing' | 'social';
  status: SchemeOutcomeStatus;
}

export type ConditionOutcomeStatus = 'matched' | 'conditional' | 'insufficient' | 'conflict' | 'not_matched';

export interface SchemeConditionItem {
  id: string;
  textEn: string;
  textTa: string;
  status: ConditionOutcomeStatus;
  statusLabelEn: string;
  statusLabelTa: string;
  explanationEn?: string;
  explanationTa?: string;
}

export interface SchemeDocumentRequirement {
  id: string;
  titleEn: string;
  titleTa: string;
  descEn: string;
  descTa: string;
  iconType: 'ration' | 'aadhaar' | 'income' | 'certificate' | 'general';
}

export interface SchemeEligibilityExplanationData {
  schemeId: string;
  schemeNameEn: string;
  schemeNameTa: string;
  departmentEn: string;
  departmentTa: string;
  overallStatus: SchemeOutcomeStatus;
  overallStatusTitleEn: string;
  overallStatusTitleTa: string;
  overallStatusDescEn: string;
  overallStatusDescTa: string;
  conditions: SchemeConditionItem[];
  explanationHeadingEn: string;
  explanationHeadingTa: string;
  explanationTextEn: string;
  explanationTextTa: string;
  requiredDocuments: SchemeDocumentRequirement[];
  officialSourceLabelEn: string;
  officialSourceLabelTa: string;
  officialSourceOrgEn: string;
  officialSourceOrgTa: string;
  officialSourceUrl: string;
}

export type EvidenceDocumentStatus = 'available' | 'verification_required' | 'missing' | 'uploaded' | 'verified';

export interface EvidenceDocumentItem {
  id: string;
  docKey: 'ration' | 'aadhaar' | 'income' | 'land' | 'caste' | 'bank';
  titleEn: string;
  titleTa: string;
  descEn: string;
  descTa: string;
  status: EvidenceDocumentStatus;
  statusLabelEn: string;
  statusLabelTa: string;
  iconType: 'ration' | 'aadhaar' | 'income' | 'certificate' | 'general';
  issuingAuthorityEn?: string;
  issuingAuthorityTa?: string;
  validityNoticeEn?: string;
  validityNoticeTa?: string;
  howToApplyEn?: string;
  howToApplyTa?: string;
  uploadedFileName?: string;
  uploadedAt?: string;
}

export interface SchemeEvidenceData {
  schemeId: string;
  schemeNameEn: string;
  schemeNameTa: string;
  departmentEn: string;
  departmentTa: string;
  eligibilityStatus: SchemeOutcomeStatus;
  documents: EvidenceDocumentItem[];
  assistanceNoticeEn: string;
  assistanceNoticeTa: string;
}
