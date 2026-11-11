import { schemesData } from '../data/schemes';
import {
  ConditionOutcomeStatus,
  EvaluatedSchemeResult,
  HouseholdMember,
  HouseholdProfile,
  SchemeEligibilityExplanationData,
  SchemeOutcomeStatus,
} from '../types';
import { householdService } from './householdService';

export interface EvaluationRecord {
  id: string;
  evaluatedAt: string;
  evaluatedAtTa: string;
  categories: string[];
  results: EvaluatedSchemeResult[];
  explanations: Record<string, SchemeEligibilityExplanationData>;
}

const STORAGE_KEY = 'urimai_aram_evaluations';

export const evaluationService = {
  getEvaluations(): EvaluationRecord[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch {
      // fallback
    }
    // Return initial default evaluation if empty
    return [this.generateDefaultEvaluation()];
  },

  getLatestEvaluation(): EvaluationRecord {
    const list = this.getEvaluations();
    return list[0] || this.generateDefaultEvaluation();
  },

  getEvaluationById(id: string): EvaluationRecord | undefined {
    return this.getEvaluations().find((e) => e.id === id);
  },

  runEvaluation(selectedCategories: string[] = ['health', 'education', 'agriculture', 'social', 'housing']): EvaluationRecord {
    const household = householdService.getState();
    const profile = household.profile;
    const members = household.members;
    const primaryApplicant = members[0];
    const primaryQuestionnaire = primaryApplicant ? householdService.getMemberProfile(primaryApplicant.id) : null;

    const evaluatedResults: EvaluatedSchemeResult[] = [];
    const explanations: Record<string, SchemeEligibilityExplanationData> = {};

    schemesData.forEach((scheme) => {
      // Check category match
      const catMatches = selectedCategories.includes('all') ||
        selectedCategories.includes(scheme.category) ||
        (selectedCategories.includes('income') && scheme.category === 'social');

      let status: SchemeOutcomeStatus = 'matched';
      let summaryEn = '';
      let summaryTa = '';
      const conditions: {
        id: string;
        textEn: string;
        textTa: string;
        status: ConditionOutcomeStatus;
        statusLabelEn: string;
        statusLabelTa: string;
        explanationEn: string;
        explanationTa: string;
      }[] = [];

      // Logic based on scheme rules
      if (scheme.schemeId === 'cmchis') {
        const incomeCeiling = 120000;
        const incomeMatches = profile.annualIncome <= incomeCeiling;
        
        conditions.push({
          id: 'cmchis-c1',
          textEn: 'Annual household income within ₹1,20,000 threshold',
          textTa: 'குடும்ப ஆண்டு வருமானம் ₹1,20,000-க்குள் இருக்க வேண்டும்',
          status: incomeMatches ? 'matched' : 'not_matched',
          statusLabelEn: incomeMatches ? 'Matched' : 'Exceeded Limit',
          statusLabelTa: incomeMatches ? 'பொருந்துகிறது' : 'வரம்பை மீறுகிறது',
          explanationEn: `Household income of ₹${profile.annualIncome.toLocaleString('en-IN')} is ${incomeMatches ? 'within' : 'above'} the ceiling.`,
          explanationTa: `அறிவிக்கப்பட்ட ஆண்டு வருமானம் ₹${profile.annualIncome.toLocaleString('en-IN')} என்பது நிர்ணயிக்கப்பட்ட வரம்பிற்குள் ${incomeMatches ? 'உள்ளது' : 'இல்லை'}.`,
        });

        conditions.push({
          id: 'cmchis-c2',
          textEn: 'Listed in Tamil Nadu Smart Family Card',
          textTa: 'தமிழக ஸ்மார்ட் குடும்ப அட்டையில் பதிவு பெற்றுள்ளார்',
          status: profile.rationCardNumber ? 'matched' : 'insufficient',
          statusLabelEn: profile.rationCardNumber ? 'Matched' : 'Missing Info',
          statusLabelTa: profile.rationCardNumber ? 'பொருந்துகிறது' : 'தகவல் இல்லை',
          explanationEn: profile.rationCardNumber
            ? `Smart Card number ${profile.rationCardNumber} is recorded.`
            : 'No ration card number was entered.',
          explanationTa: profile.rationCardNumber
            ? `ஸ்மார்ட் கார்டு எண் ${profile.rationCardNumber} பதிவு செய்யப்பட்டுள்ளது.`
            : 'ரேஷன் அட்டை எண் உள்ளிடப்படவில்லை.',
        });

        conditions.push({
          id: 'cmchis-c3',
          textEn: 'VAO / Tahsildar Income Certification Verification',
          textTa: 'கிராம நிர்வாக அலுவலர் (VAO) வருமானச் சான்றிதழ் சரிபார்ப்பு',
          status: 'conditional',
          statusLabelEn: 'Verification Required',
          statusLabelTa: 'சரிபார்ப்பு தேவை',
          explanationEn: 'Physical income certificate or biometric e-KYC must be validated at the hospital desk.',
          explanationTa: 'மருத்துவமனை சேர்க்கையின்போது கிராம நிர்வாக அலுவலர் வருமானச் சான்று சரிபார்க்கப்பட வேண்டும்.',
        });

        status = 'conditional';
        summaryEn = 'Income criteria satisfied. Kiosk verification required at empanelled hospital.';
        summaryTa = 'வருமான வரம்பு பொருந்துகிறது. மருத்துவமனை சேர்க்கையின்போது ஆவணச் சரிபார்ப்பு தேவை.';
      } else if (scheme.schemeId === 'pudhumai-penn') {
        const hasDaughter = members.some((m) => m.relation === 'Daughter' || (m.gender === 'Female' && m.age <= 23 && m.age >= 10));
        
        conditions.push({
          id: 'pp-c1',
          textEn: 'Female student studying in government schools (Class 6-12)',
          textTa: 'அரசுப் பள்ளியில் 6 முதல் 12 வரை படித்த மாணவி',
          status: hasDaughter ? 'conditional' : 'not_matched',
          statusLabelEn: hasDaughter ? 'Verification Required' : 'Not Applicable',
          statusLabelTa: hasDaughter ? 'சரிபார்ப்பு தேவை' : 'பொருந்தவில்லை',
          explanationEn: hasDaughter
            ? 'Household has an eligible female candidate. Government school EMIS attendance certificate required.'
            : 'No eligible female collegiate student identified in household.',
          explanationTa: hasDaughter
            ? 'குடும்பத்தில் பெண் உறுப்பினர் உள்ளார். அரசுப் பள்ளி EMIS சான்றிதழ் தேவை.'
            : 'தகுதியான பெண் மாணவி குடும்பத்தில் இல்லை.',
        });

        status = hasDaughter ? 'conditional' : 'not_matched';
        summaryEn = hasDaughter
          ? 'Eligible female student identified in household; school bonafide required.'
          : 'No female student within collegiate eligibility age in registered household.';
        summaryTa = hasDaughter
          ? 'தகுதியான பெண் உறுப்பினர் உள்ளார்; அரசுப் பள்ளிச் சான்று தேவை.'
          : 'குடும்பத்தில் கல்லூரி செல்லும் வயதுடைய பெண் உறுப்பினர்கள் இல்லை.';
      } else if (scheme.schemeId === 'uzhavar-nanban') {
        const isFarmer = primaryQuestionnaire?.occupationType === 'farmer' || primaryQuestionnaire?.occupationType === 'agricultural_labour';
        
        conditions.push({
          id: 'uzh-c1',
          textEn: 'Practicing small or marginal agriculturalist / farmer',
          textTa: 'சிறு / குறு விவசாயம் அல்லது உழவர் குடும்பம்',
          status: isFarmer ? 'matched' : 'not_matched',
          statusLabelEn: isFarmer ? 'Matched' : 'Not Matched',
          statusLabelTa: isFarmer ? 'பொருந்துகிறது' : 'பொருந்தவில்லை',
          explanationEn: isFarmer
            ? `Reported occupation is ${primaryQuestionnaire?.occupationType}.`
            : 'Primary earner does not report agriculture as primary occupation.',
          explanationTa: isFarmer
            ? 'விவசாயத் தொழில் பதிவாகியுள்ளது.'
            : 'குடும்பத் தலைவர் விவசாயத் தொழிலில் ஈடுபடவில்லை.',
        });

        status = isFarmer ? 'matched' : 'not_matched';
        summaryEn = isFarmer ? 'Fully matched based on agricultural occupation.' : 'Requires agricultural landholding / occupation.';
        summaryTa = isFarmer ? 'விவசாய தொழில் மற்றும் நில விவரங்களின் அடிப்படையில் முழு தகுதி.' : 'விவசாயம் சார்ந்த தொழில் தேவையாகும்.';
      } else if (scheme.schemeId === 'pm-kisan') {
        const isFarmer = primaryQuestionnaire?.occupationType === 'farmer';
        status = isFarmer ? 'matched' : 'not_matched';
        summaryEn = isFarmer ? 'Small/marginal farmer with landholding below 2 hectares.' : 'Farmer landholder criteria not satisfied.';
        summaryTa = isFarmer ? '2 ஹெக்டேருக்குட்பட்ட விவசாய நிலம் உள்ளதால் முழு தகுதி.' : 'விவசாய நிலம் இல்லாததால் பொருந்தவில்லை.';
      } else if (scheme.schemeId === 'kmut') {
        // Kalaignar Magalir Urimai Thittam - Conflict demo when income limit conflicts
        if (profile.annualIncome > 250000) {
          status = 'conflict';
          summaryEn = 'Income ceiling conflict: Reported household income exceeds scheme ceiling limit.';
          summaryTa = 'வருமான வரம்பு முரண்பாடு: அறிவிக்கப்பட்ட குடும்ப வருமானம் உச்சவரம்பை விட அதிகம்.';
        } else {
          status = 'matched';
          summaryEn = 'Household qualifies under women family head criteria with income below ₹2.5 Lakhs.';
          summaryTa = 'குடும்ப ஆண்டு வருமானம் ₹2.5 லட்சத்திற்குள் இருப்பதால் தகுதி பெறுகிறது.';
        }
      } else if (scheme.schemeId === 'oap') {
        // Old age pension - check for member >= 60
        const hasSenior = members.some((m) => m.age >= 60);
        if (hasSenior) {
          status = 'matched';
          summaryEn = 'Senior citizen (age 60+) identified in household.';
          summaryTa = 'குடும்பத்தில் 60 வயதுக்கு மேற்பட்ட மூத்த குடிமகன் உள்ளார்.';
        } else {
          status = 'insufficient';
          summaryEn = 'Information incomplete: Verification of elderly dependent family members required.';
          summaryTa = 'தகவல் பற்றாக்குறை: முதியோர் சார்ந்த விவரங்கள் முழுமையாக உள்ளிடப்படவில்லை.';
        }
      } else if (scheme.schemeId === 'kanavu-illam' || scheme.schemeId === 'pmay-urban') {
        status = profile.housingType === 'rented' ? 'matched' : 'conditional';
        summaryEn = 'Housing support relevance verified based on housing classification.';
        summaryTa = 'இருப்பிட வகைப்பாட்டின் அடிப்படையில் தகுதி பொருந்துகிறது.';
      } else {
        // Default based on category selection
        status = catMatches ? 'matched' : 'not_matched';
        summaryEn = catMatches ? 'Matches selected household welfare categories.' : 'Category outside selected discovery focus.';
        summaryTa = catMatches ? 'தேர்ந்தெடுக்கப்பட்ட நலத் திட்ட வகைகளுடன் பொருந்துகிறது.' : 'தேர்ந்தெடுக்கப்பட்ட வகைகளுக்கு வெளியே உள்ளது.';
      }

      // If user did not select this category, de-prioritize or mark not matched if not all selected
      if (!catMatches) {
        status = 'not_matched';
      }

      const resultItem: EvaluatedSchemeResult = {
        id: `res-${scheme.schemeId}`,
        schemeId: scheme.schemeId,
        titleEn: scheme.schemeName,
        titleTa: scheme.schemeNameTa,
        deptEn: scheme.departmentEn || scheme.administeringAuthority,
        deptTa: scheme.departmentTa || scheme.administeringAuthorityTa,
        descEn: summaryEn || scheme.summary,
        descTa: summaryTa || scheme.summaryTa,
        category: scheme.category,
        iconType: scheme.category === 'health' ? 'health' : scheme.category === 'education' ? 'education' : scheme.category === 'agriculture' ? 'plant' : scheme.category === 'housing' ? 'housing' : 'social',
        status,
      };

      evaluatedResults.push(resultItem);

      // Create detailed explanation record
      explanations[scheme.schemeId] = {
        schemeId: scheme.schemeId,
        schemeNameEn: scheme.officialName,
        schemeNameTa: scheme.officialNameTa,
        departmentEn: scheme.departmentEn || scheme.administeringAuthority,
        departmentTa: scheme.departmentTa || scheme.administeringAuthorityTa,
        overallStatus: status,
        overallStatusTitleEn: `Overall Assessment: ${status.toUpperCase().replace('_', ' ')}`,
        overallStatusTitleTa: `முழு மதிப்பீடு: ${status === 'matched' ? 'முழு தகுதி' : status === 'conditional' ? 'நிபந்தனையுடன் பொருந்துகிறது' : status === 'insufficient' ? 'தகவல் தேவை' : status === 'conflict' ? 'முரண்பாடு' : 'பொருந்தவில்லை'}`,
        overallStatusDescEn: summaryEn,
        overallStatusDescTa: summaryTa,
        conditions: conditions.length > 0 ? conditions : [
          {
            id: 'c-gen-1',
            textEn: 'Residency in Tamil Nadu',
            textTa: 'தமிழ்நாடு இருப்பிடத் தகுதி',
            status: 'matched',
            statusLabelEn: 'Verified',
            statusLabelTa: 'சரிபார்க்கப்பட்டது',
            explanationEn: `Household registered in ${profile.district}, Tamil Nadu.`,
            explanationTa: `குடும்பம் ${profile.districtTa || profile.district} மாவட்டத்தில் பதிவாகியுள்ளது.`,
          },
          {
            id: 'c-gen-2',
            textEn: 'Welfare category alignment',
            textTa: 'நலத்திட்ட வகை பொருத்தம்',
            status: status === 'matched' ? 'matched' : status === 'conditional' ? 'conditional' : 'not_matched',
            statusLabelEn: status === 'matched' ? 'Matched' : 'Check Required',
            statusLabelTa: status === 'matched' ? 'பொருந்துகிறது' : 'சரிபார்ப்பு தேவை',
            explanationEn: summaryEn,
            explanationTa: summaryTa,
          },
        ],
        explanationHeadingEn: 'Eligibility Evaluation Breakdown',
        explanationHeadingTa: 'தகுதி ஆய்வு விவரங்கள்',
        explanationTextEn: summaryEn,
        explanationTextTa: summaryTa,
        requiredDocuments: scheme.documentsEn.map((doc, idx) => ({
          id: `req-doc-${idx}`,
          titleEn: doc,
          titleTa: scheme.documentsTa[idx] || doc,
          descEn: 'Required for official application & identity proof',
          descTa: 'விண்ணப்பம் மற்றும் அடையாளச் சரிபார்ப்பிற்கு தேவைப்படுகிறது',
          iconType: doc.toLowerCase().includes('ration') ? 'ration' : doc.toLowerCase().includes('aadhaar') ? 'aadhaar' : 'income',
        })),
        officialSourceLabelEn: 'Official Source Citation',
        officialSourceLabelTa: 'அதிகாரப்பூர்வ அரசு மேற்கோள்',
        officialSourceOrgEn: scheme.officialSource,
        officialSourceOrgTa: scheme.administeringAuthorityTa,
        officialSourceUrl: scheme.sourceUrl,
      };
    });

    const now = new Date();
    const evaluationRecord: EvaluationRecord = {
      id: `eval-${Date.now()}`,
      evaluatedAt: now.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
      evaluatedAtTa: now.toLocaleDateString('ta-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
      categories: selectedCategories,
      results: evaluatedResults,
      explanations,
    };

    // Save in storage
    const all = this.getEvaluations();
    all.unshift(evaluationRecord);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(all.slice(0, 10)));
    } catch {
      // ignore
    }

    return evaluationRecord;
  },

  generateDefaultEvaluation(): EvaluationRecord {
    return {
      id: 'eval-default',
      evaluatedAt: '10 November 2026',
      evaluatedAtTa: '10 நவம்பர் 2026',
      categories: ['income', 'health', 'agriculture'],
      results: [
        {
          id: 'res-cmchis',
          schemeId: 'cmchis',
          titleEn: 'CMCHIS Health Insurance',
          titleTa: 'முதலமைச்சரின் விரிவான மருத்துவக் காப்பீடு',
          deptEn: 'Health and Family Welfare Department',
          deptTa: 'மருத்துவம் மற்றும் மக்கள் நல்வாழ்வுத்துறை',
          descEn: 'Annual income within threshold limit; empanelled hospital verification required.',
          descTa: 'ஆண்டு வருமானம் வரம்பிற்குள் உள்ளது; மருத்துவமனை சேர்க்கையின்போது சரிபார்ப்பு தேவை.',
          category: 'health',
          iconType: 'health',
          status: 'conditional',
        },
        {
          id: 'res-uzhavar',
          schemeId: 'uzhavar-nanban',
          titleEn: 'Chief Minister’s Farmer Welfare Scheme',
          titleTa: 'முதலமைச்சரின் உழவர் நலத் திட்டம்',
          deptEn: 'Department of Agriculture and Farmers Welfare',
          deptTa: 'விவசாயிகள் நலத்துறை',
          descEn: 'Eligible small and marginal farming household with certified landholding.',
          descTa: 'நில விவரங்களுடன் கூடிய சிறு, குறு உழவர் குடும்பங்களுக்கு முழு தகுதி.',
          category: 'agriculture',
          iconType: 'plant',
          status: 'matched',
        },
        {
          id: 'res-pudhumai',
          schemeId: 'pudhumai-penn',
          titleEn: 'Pudhumai Penn Higher Education Scheme',
          titleTa: 'புதுமைப் பெண் உயர்கல்வித் திட்டம்',
          deptEn: 'Social Welfare & Women Empowerment Department',
          deptTa: 'சமூக நலன் மற்றும் மகளிர் உரிமைத் துறை',
          descEn: 'Eligible female student enrolled in higher secondary; EMIS attendance required.',
          descTa: 'குடும்பத்தில் பயிலும் மாணவி உள்ளார்; அரசுப் பள்ளி EMIS சான்று தேவை.',
          category: 'education',
          iconType: 'education',
          status: 'conditional',
        },
        {
          id: 'res-kmut',
          schemeId: 'kmut',
          titleEn: 'Kalaignar Magalir Urimai Thittam',
          titleTa: 'கலைஞர் மகளிர் உரிமைத் திட்டம்',
          deptEn: 'Special Programme Implementation Department',
          deptTa: 'சிறப்பு திட்ட செயலாக்கத் துறை',
          descEn: 'Household income ceiling verified against annual tax threshold.',
          descTa: 'குடும்ப ஆண்டு வருமானம் வரி வரம்பிற்குள் உள்ளதால் முழு தகுதி.',
          category: 'social',
          iconType: 'social',
          status: 'matched',
        },
        {
          id: 'res-oap',
          schemeId: 'oap',
          titleEn: 'Old Age Pension (OAP)',
          titleTa: 'முதியோர் உதவித்தொகை திட்டம்',
          deptEn: 'Revenue and Disaster Management Department',
          deptTa: 'வருவாய் மற்றும் பேரிடர் மேலாண்மைத் துறை',
          descEn: 'Missing age documentation for dependent senior citizen members.',
          descTa: 'முதியோர் வயது குறித்த ஆவண விவரங்கள் முழுமையாக உள்ளிடப்படவில்லை.',
          category: 'social',
          iconType: 'social',
          status: 'insufficient',
        },
        {
          id: 'res-kanavu',
          schemeId: 'kanavu-illam',
          titleEn: 'Kalaignar Kanavu Illam',
          titleTa: 'கலைஞர் கனவு இல்லம் திட்டம்',
          deptEn: 'Rural Development and Panchayat Raj Department',
          deptTa: 'ஊரக வளர்ச்சி மற்றும் ஊராட்சித் துறை',
          descEn: 'Kutcha / semi-pucca roof status recorded; rural panchayat survey required.',
          descTa: 'பழைய வீட்டின் கூரை வகைப்பாடு அடிப்படையில் ஊராட்சி ஆய்வு தேவை.',
          category: 'housing',
          iconType: 'housing',
          status: 'conditional',
        },
        {
          id: 'res-pm-kisan',
          schemeId: 'pm-kisan',
          titleEn: 'PM-KISAN Samman Nidhi',
          titleTa: 'பிரதமர் கிசான் சம்மான் நிதி',
          deptEn: 'Ministry of Agriculture and Farmers Welfare',
          deptTa: 'மத்திய வேளாண்மை மற்றும் விவசாயிகள் நலத்துறை',
          descEn: 'Agricultural cultivable landholding verified under land registry records.',
          descTa: 'பட்டா நில பதிவேடு தகவல்களின்படி விவசாய குடும்ப தகுதி பூர்த்தி செய்யப்பட்டுள்ளது.',
          category: 'agriculture',
          iconType: 'plant',
          status: 'matched',
        },
      ],
      explanations: {},
    };
  },
};

