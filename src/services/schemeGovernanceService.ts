import { schemesData } from '../data/schemes';

export type SchemeLifecycleStatus = 'draft' | 'in_review' | 'approved' | 'active' | 'suspended';

export interface GovernanceRuleItem {
  id: string;
  field: string;
  operator: 'lte' | 'gte' | 'eq' | 'in' | 'boolean';
  value: string | number | boolean;
  unit?: string;
  descriptionEn: string;
  descriptionTa: string;
}

export interface GovernanceSchemeItem {
  schemeId: string;
  nameEn: string;
  nameTa: string;
  officialNameEn: string;
  officialNameTa: string;
  category: string;
  departmentEn: string;
  departmentTa: string;
  version: string;
  status: SchemeLifecycleStatus;
  lastUpdated: string;
  officialSource: string;
  sourceUrl: string;
  sourceLastVerified: string;
  rulePack: {
    version: string;
    rules: GovernanceRuleItem[];
  };
  validationReport: {
    valid: boolean;
    errorsCount: number;
    warningsCount: number;
    messages: string[];
  };
}

export interface ChangeRequest {
  id: string;
  schemeId: string;
  schemeNameEn: string;
  schemeNameTa: string;
  submittedBy: string; // Admin Name / ID
  submittedAt: string;
  status: 'pending' | 'approved' | 'rejected';
  previousVersion: string;
  proposedVersion: string;
  summaryEn: string;
  summaryTa: string;
  ruleChanges: {
    ruleId: string;
    field: string;
    oldValue: any;
    newValue: any;
    changeDescriptionEn: string;
  }[];
  sources: {
    title: string;
    url: string;
    verifiedDate: string;
  }[];
  validationReport: {
    valid: boolean;
    issues: string[];
  };
  reviewerNotes?: string;
  reviewedBy?: string;
  reviewedAt?: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  action: 'submitted' | 'approved' | 'rejected' | 'activated' | 'suspended' | 'reinstated' | 'draft_saved';
  actorName: string;
  actorRole: 'admin' | 'reviewer';
  schemeId: string;
  schemeName: string;
  details: string;
}

const STORAGE_SCHEMES_KEY = 'urimai_aram_gov_schemes';
const STORAGE_REQUESTS_KEY = 'urimai_aram_gov_requests';
const STORAGE_AUDIT_KEY = 'urimai_aram_gov_audit';

const initialGovSchemes: GovernanceSchemeItem[] = [
  {
    schemeId: 'cmchis',
    nameEn: 'CMCHIS Health Insurance',
    nameTa: 'முதலமைச்சரின் விரிவான மருத்துவக் காப்பீடு',
    officialNameEn: "Chief Minister's Comprehensive Health Insurance Scheme",
    officialNameTa: 'முதலமைச்சரின் விரிவான மருத்துவக் காப்பீட்டுத் திட்டம்',
    category: 'health',
    departmentEn: 'Health and Family Welfare Department',
    departmentTa: 'மக்கள் நல்வாழ்வு மற்றும் குடும்ப நலத்துறை',
    version: 'v4.2.0',
    status: 'active',
    lastUpdated: '16 October 2026',
    officialSource: 'Health & Family Welfare Dept — cmchistn.com',
    sourceUrl: 'https://cmchistn.com',
    sourceLastVerified: 'October 2026',
    rulePack: {
      version: 'v4.2.0',
      rules: [
        {
          id: 'rule-cmchis-inc',
          field: 'annualHouseholdIncome',
          operator: 'lte',
          value: 120000,
          unit: 'INR/yr',
          descriptionEn: 'Annual family income ceiling must not exceed ₹1,20,000.',
          descriptionTa: 'குடும்ப ஆண்டு வருமானம் ₹1,20,000-க்குள் இருக்க வேண்டும்.',
        },
        {
          id: 'rule-cmchis-res',
          field: 'stateResidency',
          operator: 'eq',
          value: 'Tamil Nadu',
          descriptionEn: 'Must be a bona fide resident of Tamil Nadu.',
          descriptionTa: 'தமிழ்நாட்டில் வசிப்பவராக இருக்க வேண்டும்.',
        },
        {
          id: 'rule-cmchis-ration',
          field: 'smartRationCard',
          operator: 'boolean',
          value: true,
          descriptionEn: 'Family must be listed in Tamil Nadu Smart Family Card.',
          descriptionTa: 'ஸ்மார்ட் குடும்ப அட்டையில் பெயர் இடம்பெற்றிருக்க வேண்டும்.',
        },
      ],
    },
    validationReport: {
      valid: true,
      errorsCount: 0,
      warningsCount: 0,
      messages: ['All statutory criteria validated against G.O. Ms No. 341.'],
    },
  },
  {
    schemeId: 'pudhumai-penn',
    nameEn: 'Pudhumai Penn Scheme',
    nameTa: 'புதுமைப் பெண் திட்டம்',
    officialNameEn: 'Moovalur Ramamirtham Ammaiyar Higher Education Support',
    officialNameTa: 'மூவலூர் ராமாமிர்தம் அம்மையார் உயர்கல்வி உதவித் திட்டம்',
    category: 'education',
    departmentEn: 'Social Welfare & Women Empowerment Department',
    departmentTa: 'சமூக நலன் மற்றும் மகளிர் உரிமைத் துறை',
    version: 'v2.1.0',
    status: 'in_review',
    lastUpdated: '18 October 2026',
    officialSource: 'Social Welfare Circular 2024-25',
    sourceUrl: 'https://pudhumaipenn.tn.gov.in',
    sourceLastVerified: 'October 2026',
    rulePack: {
      version: 'v2.1.0',
      rules: [
        {
          id: 'rule-pp-gender',
          field: 'beneficiaryGender',
          operator: 'eq',
          value: 'Female',
          descriptionEn: 'Beneficiary must be a female student.',
          descriptionTa: 'பயனாளி பெண் மாணவியாக இருத்தல் வேண்டும்.',
        },
        {
          id: 'rule-pp-school',
          field: 'schoolType',
          operator: 'eq',
          value: 'Government (Class 6-12)',
          descriptionEn: 'Studied in Tamil Nadu government schools from Class 6 to 12.',
          descriptionTa: '6 முதல் 12 ஆம் வகுப்பு வரை அரசுப் பள்ளியில் படித்திருக்க வேண்டும்.',
        },
        {
          id: 'rule-pp-enrolled',
          field: 'isEnrolledHigherEdu',
          operator: 'boolean',
          value: true,
          descriptionEn: 'Enrolled in accredited degree or diploma collegiate course.',
          descriptionTa: 'அங்கீகரிக்கப்பட்ட கல்லூரி அல்லது பட்டயப்படிப்பில் சேர்ந்திருக்க வேண்டும்.',
        },
      ],
    },
    validationReport: {
      valid: true,
      errorsCount: 0,
      warningsCount: 1,
      messages: ['College EMIS verification API dependency note pending.'],
    },
  },
  {
    schemeId: 'uzhavar-nanban',
    nameEn: 'Chief Minister’s Farmer Welfare',
    nameTa: 'முதலமைச்சரின் உழவர் நலத் திட்டம்',
    officialNameEn: 'Tamil Nadu Comprehensive Farmer Assistance & Welfare Scheme',
    officialNameTa: 'தமிழ்நாடு முதலமைச்சரின் விரிவான உழவர் பாதுகாப்புத் திட்டம்',
    category: 'agriculture',
    departmentEn: 'Department of Agriculture and Farmers Welfare',
    departmentTa: 'விவசாயிகள் நலத்துறை',
    version: 'v1.8.0',
    status: 'active',
    lastUpdated: '12 October 2026',
    officialSource: 'Agriculture Dept G.O. 112',
    sourceUrl: 'https://agritech.tnau.ac.in',
    sourceLastVerified: 'October 2026',
    rulePack: {
      version: 'v1.8.0',
      rules: [
        {
          id: 'rule-uzh-occ',
          field: 'occupation',
          operator: 'in',
          value: 'farmer, agricultural_labour',
          descriptionEn: 'Primary occupation must be agricultural cultivator or farm worker.',
          descriptionTa: 'முதன்மைத் தொழில் விவசாயம் அல்லது விவசாயக் கூலியாக இருக்க வேண்டும்.',
        },
      ],
    },
    validationReport: {
      valid: true,
      errorsCount: 0,
      warningsCount: 0,
      messages: ['Landholding criteria match agricultural census standards.'],
    },
  },
  {
    schemeId: 'kmut',
    nameEn: 'Kalaignar Magalir Urimai Thittam',
    nameTa: 'கலைஞர் மகளிர் உரிமைத் திட்டம்',
    officialNameEn: 'Kalaignar Magalir Urimai Thogai Thittam',
    officialNameTa: 'கலைஞர் மகளிர் உரிமைத் தொகைத் திட்டம்',
    category: 'social',
    departmentEn: 'Special Programme Implementation Department',
    departmentTa: 'சிறப்பு திட்ட செயலாக்கத் துறை',
    version: 'v2.0.0',
    status: 'active',
    lastUpdated: '01 October 2026',
    officialSource: 'Special Programme Implementation Dept G.O. 45',
    sourceUrl: 'https://kmut.tn.gov.in',
    sourceLastVerified: 'October 2026',
    rulePack: {
      version: 'v2.0.0',
      rules: [
        {
          id: 'rule-kmut-inc',
          field: 'annualHouseholdIncome',
          operator: 'lte',
          value: 250000,
          unit: 'INR/yr',
          descriptionEn: 'Annual family income ceiling must not exceed ₹2,50,000.',
          descriptionTa: 'குடும்ப ஆண்டு வருமானம் ₹2,50,000-க்குள் இருக்க வேண்டும்.',
        },
      ],
    },
    validationReport: {
      valid: true,
      errorsCount: 0,
      warningsCount: 0,
      messages: ['Electricity consumption rules cross-checked.'],
    },
  },
  {
    schemeId: 'kanavu-illam',
    nameEn: 'Kalaignar Kanavu Illam',
    nameTa: 'கலைஞர் கனவு இல்லம்',
    officialNameEn: 'Chief Minister Rural Housing Dream Home Project',
    officialNameTa: 'முதலமைச்சரின் ஊரக கனவு இல்லம் திட்டம்',
    category: 'housing',
    departmentEn: 'Rural Development and Panchayat Raj Department',
    departmentTa: 'ஊரக வளர்ச்சி மற்றும் ஊராட்சித் துறை',
    version: 'v1.0.0',
    status: 'approved', // Approved by reviewer, pending explicit activation
    lastUpdated: '05 October 2026',
    officialSource: 'RD & PR Dept Policy Note',
    sourceUrl: 'https://tnrd.tn.gov.in',
    sourceLastVerified: 'October 2026',
    rulePack: {
      version: 'v1.0.0',
      rules: [
        {
          id: 'rule-ki-house',
          field: 'roofType',
          operator: 'in',
          value: 'kutcha, semi_pucca',
          descriptionEn: 'Existing dwelling must be kutcha / hut structure.',
          descriptionTa: 'தற்போதுள்ள வீடு குடிசை அல்லது கூரை வீடாக இருக்க வேண்டும்.',
        },
      ],
    },
    validationReport: {
      valid: true,
      errorsCount: 0,
      warningsCount: 0,
      messages: ['Rural housing survey criteria confirmed.'],
    },
  },
  {
    schemeId: 'oap',
    nameEn: 'Old Age Pension (OAP)',
    nameTa: 'முதியோர் உதவித்தொகை திட்டம்',
    officialNameEn: 'Tamil Nadu Social Security Old Age Pension Scheme',
    officialNameTa: 'தமிழ்நாடு சமூக பாதுகாப்பு முதியோர் ஓய்வூதியத் திட்டம்',
    category: 'social',
    departmentEn: 'Revenue and Disaster Management Department',
    departmentTa: 'வருவாய் மற்றும் பேரிடர் மேலாண்மைத் துறை',
    version: 'v3.0.0',
    status: 'suspended',
    lastUpdated: '20 September 2026',
    officialSource: 'Revenue Dept Circular 2026/09',
    sourceUrl: 'https://cra.tn.gov.in',
    sourceLastVerified: 'September 2026',
    rulePack: {
      version: 'v3.0.0',
      rules: [
        {
          id: 'rule-oap-age',
          field: 'beneficiaryAge',
          operator: 'gte',
          value: 60,
          unit: 'years',
          descriptionEn: 'Applicant must be 60 years of age or older.',
          descriptionTa: 'விண்ணப்பதாரர் 60 வயது அல்லது அதற்கு மேற்பட்டவராக இருக்க வேண்டும்.',
        },
      ],
    },
    validationReport: {
      valid: true,
      errorsCount: 0,
      warningsCount: 1,
      messages: ['Temporary suspension pending verification criteria update.'],
    },
  },
];

const initialRequests: ChangeRequest[] = [
  {
    id: 'REQ-2026-0042',
    schemeId: 'pudhumai-penn',
    schemeNameEn: 'Pudhumai Penn Scheme',
    schemeNameTa: 'புதுமைப் பெண் திட்டம்',
    submittedBy: 'Kannan M. (State Administrator)',
    submittedAt: '28 October 2026, 11:30 AM',
    status: 'pending',
    previousVersion: 'v2.0.0',
    proposedVersion: 'v2.1.0',
    summaryEn: 'Include autonomous government-aided polytechnic colleges under collegiate eligibility list.',
    summaryTa: 'அரசு உதவிபெறும் பாலிடெக்னிக் கல்லூரிகளையும் இத்திட்டத்தின் கீழ் சேர்த்தல்.',
    ruleChanges: [
      {
        ruleId: 'rule-pp-enrolled',
        field: 'isEnrolledHigherEdu',
        oldValue: 'Govt Degree Colleges Only',
        newValue: 'Govt Degree & Aided Polytechnic Colleges',
        changeDescriptionEn: 'Expanded enrolled college types to include polytechnic diplomas.',
      },
    ],
    sources: [
      {
        title: 'Higher Education Dept Expansion G.O. (Ms) No. 89',
        url: 'https://pudhumaipenn.tn.gov.in/orders/go89.pdf',
        verifiedDate: '26 October 2026',
      },
    ],
    validationReport: {
      valid: true,
      issues: ['No conflicting rules detected against state scholarship criteria.'],
    },
  },
  {
    id: 'REQ-2026-0038',
    schemeId: 'kanavu-illam',
    schemeNameEn: 'Kalaignar Kanavu Illam',
    schemeNameTa: 'கலைஞர் கனவு இல்லம்',
    submittedBy: 'Kannan M. (State Administrator)',
    submittedAt: '24 October 2026, 04:15 PM',
    status: 'approved',
    previousVersion: 'v0.9.0',
    proposedVersion: 'v1.0.0',
    summaryEn: 'Initial production rule pack formulation for rural hut conversion grant.',
    summaryTa: 'ஊரக குடிசை மாற்று மானியத்திற்கான புதிய விதிமுறை தொகுப்பு.',
    ruleChanges: [
      {
        ruleId: 'rule-ki-house',
        field: 'roofType',
        oldValue: 'None',
        newValue: 'kutcha, semi_pucca',
        changeDescriptionEn: 'Initial eligibility threshold established.',
      },
    ],
    sources: [
      {
        title: 'Rural Development Order No. 421',
        url: 'https://tnrd.tn.gov.in/schemes',
        verifiedDate: '22 October 2026',
      },
    ],
    validationReport: {
      valid: true,
      issues: ['Gram Panchayat verification requirements cross-checked.'],
    },
    reviewerNotes: 'Approved following legal vetting of district collectorate survey norms.',
    reviewedBy: 'Dr. V. Sundaram (Independent Reviewer)',
    reviewedAt: '25 October 2026, 02:00 PM',
  },
];

const initialAuditLogs: AuditLogEntry[] = [
  {
    id: 'log-001',
    timestamp: '28 October 2026, 11:30 AM',
    action: 'submitted',
    actorName: 'Kannan M. (Admin)',
    actorRole: 'admin',
    schemeId: 'pudhumai-penn',
    schemeName: 'Pudhumai Penn Scheme',
    details: 'Submitted rule-pack update v2.1.0 for independent review (REQ-2026-0042).',
  },
  {
    id: 'log-002',
    timestamp: '25 October 2026, 02:00 PM',
    action: 'approved',
    actorName: 'Dr. V. Sundaram (Reviewer)',
    actorRole: 'reviewer',
    schemeId: 'kanavu-illam',
    schemeName: 'Kalaignar Kanavu Illam',
    details: 'Approved change request REQ-2026-0038 with notes. Ready for activation.',
  },
  {
    id: 'log-003',
    timestamp: '20 September 2026, 05:40 PM',
    action: 'suspended',
    actorName: 'Dr. V. Sundaram (Reviewer)',
    actorRole: 'reviewer',
    schemeId: 'oap',
    schemeName: 'Old Age Pension (OAP)',
    details: 'Suspended live rule-pack v3.0.0 pending district revenue verification update.',
  },
];

export const schemeGovernanceService = {
  getSchemes(): GovernanceSchemeItem[] {
    try {
      const raw = localStorage.getItem(STORAGE_SCHEMES_KEY);
      if (raw) return JSON.parse(raw);
    } catch {
      // fallback
    }
    this.saveSchemes(initialGovSchemes);
    return initialGovSchemes;
  },

  saveSchemes(schemes: GovernanceSchemeItem[]): void {
    try {
      localStorage.setItem(STORAGE_SCHEMES_KEY, JSON.stringify(schemes));
    } catch {
      // ignore
    }
  },

  getSchemeById(schemeId: string): GovernanceSchemeItem | undefined {
    return this.getSchemes().find((s) => s.schemeId === schemeId);
  },

  updateScheme(schemeId: string, updates: Partial<GovernanceSchemeItem>): GovernanceSchemeItem | undefined {
    const list = this.getSchemes();
    const idx = list.findIndex((s) => s.schemeId === schemeId);
    if (idx === -1) return undefined;
    list[idx] = { ...list[idx], ...updates, lastUpdated: 'Today' };
    this.saveSchemes(list);
    return list[idx];
  },

  getRequests(): ChangeRequest[] {
    try {
      const raw = localStorage.getItem(STORAGE_REQUESTS_KEY);
      if (raw) return JSON.parse(raw);
    } catch {
      // fallback
    }
    this.saveRequests(initialRequests);
    return initialRequests;
  },

  saveRequests(reqs: ChangeRequest[]): void {
    try {
      localStorage.setItem(STORAGE_REQUESTS_KEY, JSON.stringify(reqs));
    } catch {
      // ignore
    }
  },

  getRequestById(requestId: string): ChangeRequest | undefined {
    return this.getRequests().find((r) => r.id === requestId);
  },

  submitForReview(schemeId: string, summaryEn: string, summaryTa: string): ChangeRequest {
    const scheme = this.getSchemeById(schemeId);
    if (!scheme) throw new Error('Scheme not found');

    const reqId = `REQ-2026-${String(Math.floor(1000 + Math.random() * 9000))}`;
    const nextVersionParts = scheme.version.replace('v', '').split('.');
    const patch = Number(nextVersionParts[2] || 0) + 1;
    const proposedVersion = `v${nextVersionParts[0]}.${nextVersionParts[1]}.${patch}`;

    const newRequest: ChangeRequest = {
      id: reqId,
      schemeId,
      schemeNameEn: scheme.nameEn,
      schemeNameTa: scheme.nameTa,
      submittedBy: 'Kannan M. (State Administrator)',
      submittedAt: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      status: 'pending',
      previousVersion: scheme.version,
      proposedVersion,
      summaryEn,
      summaryTa: summaryTa || summaryEn,
      ruleChanges: scheme.rulePack.rules.map((r) => ({
        ruleId: r.id,
        field: r.field,
        oldValue: r.value,
        newValue: r.value,
        changeDescriptionEn: r.descriptionEn,
      })),
      sources: [
        {
          title: scheme.officialSource,
          url: scheme.sourceUrl,
          verifiedDate: scheme.sourceLastVerified,
        },
      ],
      validationReport: {
        valid: scheme.validationReport.valid,
        issues: scheme.validationReport.messages,
      },
    };

    const reqs = this.getRequests();
    reqs.unshift(newRequest);
    this.saveRequests(reqs);

    // Update scheme status to in_review
    this.updateScheme(schemeId, { status: 'in_review' });

    // Add audit log
    this.addAuditLog({
      action: 'submitted',
      actorName: 'Kannan M. (State Administrator)',
      actorRole: 'admin',
      schemeId,
      schemeName: scheme.nameEn,
      details: `Submitted change request ${reqId} for ${scheme.nameEn} (${proposedVersion}).`,
    });

    return newRequest;
  },

  approveRequest(requestId: string, reviewerNotes: string): ChangeRequest {
    const reqs = this.getRequests();
    const req = reqs.find((r) => r.id === requestId);
    if (!req) throw new Error('Request not found');

    req.status = 'approved';
    req.reviewerNotes = reviewerNotes;
    req.reviewedBy = 'Dr. V. Sundaram (Independent Reviewer)';
    req.reviewedAt = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    this.saveRequests(reqs);

    // Update scheme to approved (NOT active yet!)
    this.updateScheme(req.schemeId, {
      status: 'approved',
      version: req.proposedVersion,
    });

    this.addAuditLog({
      action: 'approved',
      actorName: 'Dr. V. Sundaram (Reviewer)',
      actorRole: 'reviewer',
      schemeId: req.schemeId,
      schemeName: req.schemeNameEn,
      details: `Approved request ${requestId}. Scheme status is now APPROVED. Notes: "${reviewerNotes}"`,
    });

    return req;
  },

  rejectRequest(requestId: string, reviewerNotes: string): ChangeRequest {
    const reqs = this.getRequests();
    const req = reqs.find((r) => r.id === requestId);
    if (!req) throw new Error('Request not found');

    req.status = 'rejected';
    req.reviewerNotes = reviewerNotes;
    req.reviewedBy = 'Dr. V. Sundaram (Independent Reviewer)';
    req.reviewedAt = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    this.saveRequests(reqs);

    // Update scheme back to draft
    this.updateScheme(req.schemeId, { status: 'draft' });

    this.addAuditLog({
      action: 'rejected',
      actorName: 'Dr. V. Sundaram (Reviewer)',
      actorRole: 'reviewer',
      schemeId: req.schemeId,
      schemeName: req.schemeNameEn,
      details: `Rejected request ${requestId}. Reason: "${reviewerNotes}"`,
    });

    return req;
  },

  activateScheme(schemeId: string): void {
    const scheme = this.getSchemeById(schemeId);
    if (!scheme) return;
    this.updateScheme(schemeId, { status: 'active' });
    this.addAuditLog({
      action: 'activated',
      actorName: 'Dr. V. Sundaram (Reviewer)',
      actorRole: 'reviewer',
      schemeId,
      schemeName: scheme.nameEn,
      details: `Explicitly activated approved scheme ${scheme.nameEn} (${scheme.version}) to live status.`,
    });
  },

  suspendScheme(schemeId: string, reason: string): void {
    const scheme = this.getSchemeById(schemeId);
    if (!scheme) return;
    this.updateScheme(schemeId, { status: 'suspended' });
    this.addAuditLog({
      action: 'suspended',
      actorName: 'Dr. V. Sundaram (Reviewer)',
      actorRole: 'reviewer',
      schemeId,
      schemeName: scheme.nameEn,
      details: `Suspended live scheme ${scheme.nameEn}. Reason: "${reason}"`,
    });
  },

  reinstateScheme(schemeId: string): void {
    const scheme = this.getSchemeById(schemeId);
    if (!scheme) return;
    this.updateScheme(schemeId, { status: 'active' });
    this.addAuditLog({
      action: 'reinstated',
      actorName: 'Dr. V. Sundaram (Reviewer)',
      actorRole: 'reviewer',
      schemeId,
      schemeName: scheme.nameEn,
      details: `Reinstated suspended scheme ${scheme.nameEn} to active live status.`,
    });
  },

  getAuditLogs(): AuditLogEntry[] {
    try {
      const raw = localStorage.getItem(STORAGE_AUDIT_KEY);
      if (raw) return JSON.parse(raw);
    } catch {
      // fallback
    }
    this.saveAuditLogs(initialAuditLogs);
    return initialAuditLogs;
  },

  saveAuditLogs(logs: AuditLogEntry[]): void {
    try {
      localStorage.setItem(STORAGE_AUDIT_KEY, JSON.stringify(logs));
    } catch {
      // ignore
    }
  },

  addAuditLog(entry: Omit<AuditLogEntry, 'id' | 'timestamp'>): void {
    const logs = this.getAuditLogs();
    const newEntry: AuditLogEntry = {
      ...entry,
      id: `log-${Date.now()}`,
      timestamp: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
    logs.unshift(newEntry);
    this.saveAuditLogs(logs);
  },
};

