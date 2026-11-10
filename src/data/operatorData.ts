export interface OperatorProfile {
  id: string;
  name: string;
  nameTa: string;
  role: string;
  roleTa: string;
  centerName: string;
  centerNameTa: string;
  district: string;
  districtTa: string;
  taluk: string;
  talukTa: string;
  centerCode: string;
  phone: string;
  avatarType: string;
}

export interface OperatorDashboardStats {
  todayCitizens: number;
  assistedApplications: number;
  completedSessions: number;
  activeSessions: number;
}

export interface RecentServiceRecord {
  id: string;
  citizenName: string;
  citizenNameTa: string;
  householdId: string;
  schemeId: string;
  schemeName: string;
  schemeNameTa: string;
  status: 'completed' | 'pending' | 'processing' | 'rejected';
  statusLabel: string;
  statusLabelTa: string;
  timestamp: string;
  timestampTa: string;
  avatarBg: string;
}

export interface OperatorApplicationRecord {
  id: string;
  citizenName: string;
  citizenNameTa: string;
  householdId: string;
  schemeId: string;
  schemeName: string;
  schemeNameTa: string;
  category: string;
  submissionDate: string;
  submissionDateTa: string;
  status: 'completed' | 'processing' | 'pending' | 'rejected';
  statusBadgeText: string;
  statusBadgeTextTa: string;
  contactNumber: string;
  address: string;
  addressTa: string;
  documentsVerifiedCount: number;
  totalDocumentsCount: number;
  remarks: string;
  remarksTa: string;
}

export const defaultOperatorProfile: OperatorProfile = {
  id: 'OP-TN-042',
  name: 'Gayathri S.',
  nameTa: 'காயத்ரி ச.',
  role: 'Operator (Assistance Centre)',
  roleTa: 'ஆபரேட்டர் (உதவி மையம்)',
  centerName: 'e-Sevai Assistance Centre #14',
  centerNameTa: 'இ-சேவை உதவி மையம் #14',
  district: 'Chennai',
  districtTa: 'சென்னை',
  taluk: 'Egmore',
  talukTa: 'எழும்பூர்',
  centerCode: 'CEN-TN-CHE-042',
  phone: '+91 94441 23890',
  avatarType: 'female_operator',
};

export const defaultOperatorStats: OperatorDashboardStats = {
  todayCitizens: 28,
  assistedApplications: 17,
  completedSessions: 12,
  activeSessions: 5,
};

export const defaultRecentServiceRecords: RecentServiceRecord[] = [
  {
    id: 'SR-2401',
    citizenName: 'Ramesh Kumar',
    citizenNameTa: 'ரமேஷ் குமார்',
    householdId: 'HH24001567',
    schemeId: 'cmchis',
    schemeName: 'CMCHIS – Health Insurance',
    schemeNameTa: 'CMCHIS – சுகாதார காப்பீடு',
    status: 'completed',
    statusLabel: 'Completed',
    statusLabelTa: 'முடிக்கப்பட்டது',
    timestamp: 'Today, 04:32 PM',
    timestampTa: 'இன்று, 04:32 PM',
    avatarBg: 'bg-[#EAF3EA]',
  },
  {
    id: 'SR-2402',
    citizenName: 'Lalitha Devi',
    citizenNameTa: 'லலிதா தேவி',
    householdId: 'HH24001568',
    schemeId: 'farmer-welfare',
    schemeName: "Chief Minister's Farmer Welfare Scheme",
    schemeNameTa: 'முதலமைச்சர் உழவர் நலத் திட்டம்',
    status: 'pending',
    statusLabel: 'Pending',
    statusLabelTa: 'நிலுவையில்',
    timestamp: 'Today, 02:15 PM',
    timestampTa: 'இன்று, 02:15 PM',
    avatarBg: 'bg-[#EAF3EA]',
  },
  {
    id: 'SR-2403',
    citizenName: 'Murugesan',
    citizenNameTa: 'முருகேசன்',
    householdId: 'HH24001569',
    schemeId: 'pudhumai-penn',
    schemeName: 'Pudhumai Penn Scheme',
    schemeNameTa: 'புதுமைப்பெண் திட்டம்',
    status: 'completed',
    statusLabel: 'Completed',
    statusLabelTa: 'முடிக்கப்பட்டது',
    timestamp: 'Yesterday, 06:20 PM',
    timestampTa: 'நேற்று, 06:20 PM',
    avatarBg: 'bg-[#EAF3EA]',
  },
];

export const defaultApplicationRecords: OperatorApplicationRecord[] = [
  {
    id: 'APP-TN-2026-001',
    citizenName: 'Ramesh Kumar',
    citizenNameTa: 'ரமேஷ் குமார்',
    householdId: 'HH24001567',
    schemeId: 'cmchis',
    schemeName: 'CMCHIS – Health Insurance',
    schemeNameTa: 'CMCHIS – சுகாதார காப்பீடு',
    category: 'health',
    submissionDate: '28 Oct 2026',
    submissionDateTa: '28 அக் 2026',
    status: 'completed',
    statusBadgeText: 'Completed',
    statusBadgeTextTa: 'முடிந்தது',
    contactNumber: '+91 98401 23456',
    address: 'No. 14, Kamarajar Salai, Egmore, Chennai - 600008',
    addressTa: 'எண் 14, காமராஜர் சாலை, எழும்பூர், சென்னை - 600008',
    documentsVerifiedCount: 4,
    totalDocumentsCount: 4,
    remarks: 'Approved by District Health Officer. Digital health e-card generated and dispatched.',
    remarksTa: 'மாவட்ட சுகாதார அலுவலரால் ஒப்புதல் வழங்கப்பட்டது. மின்-காப்பீட்டு அட்டை உருவாக்கப்பட்டது.',
  },
  {
    id: 'APP-TN-2026-002',
    citizenName: 'Lalitha Devi',
    citizenNameTa: 'லலிதா தேவி',
    householdId: 'HH24001568',
    schemeId: 'farmer-welfare',
    schemeName: "Chief Minister's Farmer Welfare Scheme",
    schemeNameTa: 'முதலமைச்சர் உழவர் நலத் திட்டம்',
    category: 'agriculture',
    submissionDate: '25 Oct 2026',
    submissionDateTa: '25 அக் 2026',
    status: 'processing',
    statusBadgeText: 'In Progress',
    statusBadgeTextTa: 'நடவடிக்கை நிலையில்',
    contactNumber: '+91 97890 54321',
    address: 'Plot 3B, Farmers Colony, Villivakkam, Chennai - 600049',
    addressTa: 'மனை 3B, உழவர் குடியிருப்பு, வில்லிவாக்கம், சென்னை - 600049',
    documentsVerifiedCount: 3,
    totalDocumentsCount: 4,
    remarks: 'Patta/Chitta verified. Awaiting final field report from Village Administrative Officer (VAO).',
    remarksTa: 'பட்டா/சிட்டா சரிபார்க்கப்பட்டது. கிராம நிர்வாக அலுவலரின் (VAO) கள ஆய்வறிக்கை எதிர்பார்க்கப்படுகிறது.',
  },
  {
    id: 'APP-TN-2026-003',
    citizenName: 'Murugesan',
    citizenNameTa: 'முருகேசன்',
    householdId: 'HH24001569',
    schemeId: 'pudhumai-penn',
    schemeName: 'Pudhumai Penn Scheme',
    schemeNameTa: 'புதுமைப்பெண் திட்டம்',
    category: 'education',
    submissionDate: '24 Oct 2026',
    submissionDateTa: '24 அக் 2026',
    status: 'pending',
    statusBadgeText: 'Pending',
    statusBadgeTextTa: 'நிலுவை',
    contactNumber: '+91 94440 98765',
    address: 'Block 2, TNHB Colony, Anna Nagar West, Chennai - 600040',
    addressTa: 'பிளாக் 2, தமிழ்நாடு வீட்டு வசதி வாரிய குடியிருப்பு, அண்ணா நகர் மேற்கு, சென்னை - 600040',
    documentsVerifiedCount: 2,
    totalDocumentsCount: 3,
    remarks: 'Awaiting college bonafide certificate verification from Department of Higher Education.',
    remarksTa: 'உயர்கல்வித் துறையிடமிருந்து கல்லூரி பயில்வுச் சான்றிதழ் சரிபார்ப்பு நிலுவையில் உள்ளது.',
  },
  {
    id: 'APP-TN-2026-004',
    citizenName: 'Kavitha',
    citizenNameTa: 'கவிதா',
    householdId: 'HH24001570',
    schemeId: 'housing-scheme',
    schemeName: 'Housing Scheme',
    schemeNameTa: 'வீட்டு வசதி திட்டம்',
    category: 'housing',
    submissionDate: '22 Oct 2026',
    submissionDateTa: '22 அக் 2026',
    status: 'rejected',
    statusBadgeText: 'Rejected',
    statusBadgeTextTa: 'நிராகரிப்பு',
    contactNumber: '+91 91234 56780',
    address: 'Old Washermanpet, Chennai - 600021',
    addressTa: 'பழைய வண்ணாரப்பேட்டை, சென்னை - 600021',
    documentsVerifiedCount: 1,
    totalDocumentsCount: 3,
    remarks: 'Ineligible due to existing pucca residential property already registered in applicant spouse name.',
    remarksTa: 'விண்ணப்பதாரரின் கணவர் பெயரில் ஏற்கனவே கான்கிரீட் வீடு பதிவு செய்யப்பட்டுள்ளதால் தகுதி பெறவில்லை.',
  },
];
