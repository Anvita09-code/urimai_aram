export interface AdminProfile {
  id: string;
  name: string;
  nameTa: string;
  role: string;
  roleTa: string;
  designation: string;
  designationTa: string;
  email: string;
  department: string;
  departmentTa: string;
}

export interface AdminDashboardStats {
  totalUsers: number;
  totalApplications: number;
  underReview: number;
  approved: number;
  rejected: number;
}

export interface AdminReviewApplication {
  id: string;
  applicantName: string;
  applicantNameTa: string;
  householdId: string;
  relationCategory: string;
  relationCategoryTa: string;
  phone: string;
  isVerified: boolean;
  schemeId: string;
  schemeName: string;
  schemeNameTa: string;
  submissionDate: string;
  submissionDateTa: string;
  submittedThrough: string;
  submittedThroughTa: string;
  status: 'under_review' | 'approved' | 'rejected';
  statusLabel: string;
  statusLabelTa: string;
  observations: {
    type: 'check' | 'warning' | 'info';
    text: string;
    textTa: string;
  }[];
  eligibilityScore: number;
  incomeCertified: boolean;
  documents: {
    name: string;
    nameTa: string;
    status: 'verified' | 'pending';
  }[];
}

export const defaultAdminProfile: AdminProfile = {
  id: 'ADM-TN-001',
  name: 'Kannan M.',
  nameTa: 'கண்ணன் மு.',
  role: 'Administration (Administrator)',
  roleTa: 'நிர்வாகம் (Administrator)',
  designation: 'State Coordination Division',
  designationTa: 'மாநில ஒருங்கிணைப்பு பிரிவு',
  email: 'admin.urimaiaram@tn.gov.in',
  department: 'Special Programme Implementation Department',
  departmentTa: 'சிறப்பு திட்ட செயலாக்கத் துறை',
};

export const defaultAdminStats: AdminDashboardStats = {
  totalUsers: 12684,
  totalApplications: 8342,
  underReview: 428,
  approved: 7326,
  rejected: 588,
};

export const defaultReviewApplications: AdminReviewApplication[] = [
  {
    id: 'APP-2026-084721',
    applicantName: 'Ramesh Kumar',
    applicantNameTa: 'ரமேஷ் குமார்',
    householdId: 'HH24001567',
    relationCategory: 'Head of Household',
    relationCategoryTa: 'குடும்பத் தலைவர்',
    phone: '+91 98765 43210',
    isVerified: true,
    schemeId: 'cmchis',
    schemeName: 'CMCHIS – Health Insurance',
    schemeNameTa: 'CMCHIS – சுகாதார காப்பீடு',
    submissionDate: '28 October 2026',
    submissionDateTa: '28 அக்டோபர் 2026',
    submittedThrough: 'Assistance Centre',
    submittedThroughTa: 'உதவி மையம்',
    status: 'under_review',
    statusLabel: 'Under Review',
    statusLabelTa: 'மதிப்பாய்வில்',
    observations: [
      {
        type: 'check',
        text: 'Eligibility conditions appear largely satisfied.',
        textTa: 'தகுதி நிபந்தனைகள் பெரும்பாலும் பொருந்துகின்றன.',
      },
      {
        type: 'warning',
        text: 'Income certificate requires confirmation.',
        textTa: 'வருமானச் சான்று உறுதிப்படுத்த வேண்டும்.',
      },
      {
        type: 'info',
        text: 'Verify previous registration status.',
        textTa: 'முன்னர் பதில் நிலையை சரிபார்க்கவும்.',
      },
    ],
    eligibilityScore: 92,
    incomeCertified: true,
    documents: [
      { name: 'Ration Card', nameTa: 'ரேஷன் கார்டு', status: 'verified' },
      { name: 'Aadhaar Card', nameTa: 'ஆதார் அட்டை', status: 'verified' },
      { name: 'Income Certificate', nameTa: 'வருமானச் சான்று', status: 'pending' },
    ],
  },
  {
    id: 'APP-2026-084722',
    applicantName: 'Lalitha Devi',
    applicantNameTa: 'லலிதா தேவி',
    householdId: 'HH24001568',
    relationCategory: 'Spouse',
    relationCategoryTa: 'மனைவி',
    phone: '+91 97890 54321',
    isVerified: true,
    schemeId: 'farmer-welfare',
    schemeName: "Chief Minister's Farmer Welfare Scheme",
    schemeNameTa: 'உழவர் நலத் திட்டம்',
    submissionDate: '27 October 2026',
    submissionDateTa: '27 அக்டோ 2026',
    submittedThrough: 'Assistance Centre',
    submittedThroughTa: 'உதவி மையம்',
    status: 'under_review',
    statusLabel: 'Under Review',
    statusLabelTa: 'மதிப்பாய்வில்',
    observations: [
      {
        type: 'check',
        text: 'Land holding criteria met (under 2.5 acres).',
        textTa: 'நில உரிமை அளவு நிபந்தனை பூர்த்தியடைந்துள்ளது.',
      },
      {
        type: 'warning',
        text: 'Patta/Chitta passbook verification pending from VAO.',
        textTa: 'கிராம நிர்வாக அலுவலர் பட்டா சான்று நிலுவையில் உள்ளது.',
      },
    ],
    eligibilityScore: 88,
    incomeCertified: true,
    documents: [
      { name: 'Patta/Chitta', nameTa: 'பட்டா / சிட்டா', status: 'pending' },
      { name: 'Aadhaar Card', nameTa: 'ஆதார் அட்டை', status: 'verified' },
    ],
  },
  {
    id: 'APP-2026-084723',
    applicantName: 'Murugesan',
    applicantNameTa: 'முருகேசன்',
    householdId: 'HH24001569',
    relationCategory: 'Parent / Head',
    relationCategoryTa: 'தந்தை / தலைவர்',
    phone: '+91 94440 98765',
    isVerified: true,
    schemeId: 'pudhumai-penn',
    schemeName: 'Pudhumai Penn Scheme',
    schemeNameTa: 'புதுமைப் பெண் திட்டம்',
    submissionDate: '26 October 2026',
    submissionDateTa: '26 அக்டோ 2026',
    submittedThrough: 'Assistance Centre',
    submittedThroughTa: 'உதவி மையம்',
    status: 'under_review',
    statusLabel: 'Under Review',
    statusLabelTa: 'மதிப்பாய்வில்',
    observations: [
      {
        type: 'check',
        text: 'Studied in Government school 6th to 12th confirmed.',
        textTa: '6 முதல் 12 வரை அரசுப் பள்ளியில் பயின்ற விவரம் உறுதியானது.',
      },
      {
        type: 'info',
        text: 'Higher education degree enrollment verified with college.',
        textTa: 'கல்லூரி இளங்கலை படிப்பு சேர்க்கை உறுதிப்படுத்தப்பட்டது.',
      },
    ],
    eligibilityScore: 95,
    incomeCertified: true,
    documents: [
      { name: 'School EMIS Certificate', nameTa: 'பள்ளி மாற்றுச் சான்றிதழ்', status: 'verified' },
      { name: 'College ID Bonafide', nameTa: 'கல்லூரி சேர்க்கை சான்று', status: 'verified' },
    ],
  },
];
