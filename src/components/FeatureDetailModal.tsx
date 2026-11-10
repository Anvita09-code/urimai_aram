import React from 'react';
import { translations } from '../data/translations';
import { Language } from '../types';

interface FeatureDetailModalProps {
  featureId: string | null;
  currentLang: Language;
  onClose: () => void;
  onOpenDiscovery: () => void;
}

export const FeatureDetailModal: React.FC<FeatureDetailModalProps> = ({
  featureId,
  currentLang,
  onClose,
  onOpenDiscovery,
}) => {
  if (!featureId) return null;

  const t = translations[currentLang];

  const contentMap: Record<
    string,
    { title: string; subtitle: string; icon: string; points: string[]; actionText: string }
  > = {
    discover: {
      title: t.card1Title,
      subtitle: t.card1Desc,
      icon: '🔍',
      points: currentLang === 'ta' ? [
        '50-க்கும் மேற்பட்ட தமிழக அரசு மற்றும் மத்திய நலத்திட்டங்கள்.',
        'பெண்கள், விவசாயிகள், மாணவர்கள், முதியோர் மற்றும் மாற்றுத்திறனாளிகளுக்கான பிரத்யேக பிரிவுகள்.',
        'குடும்ப ஆண்டு வருமானம் மற்றும் வசிப்பிடத்திற்கு ஏற்ப வடிகட்டும் வசதி.',
        'ஒவ்வொரு திட்டத்திற்கும் உரிய நிதி பயன்கள் மற்றும் சலுகைகள் தெளிவான வடிவில்.'
      ] : [
        'Over 50+ Tamil Nadu state and central government welfare schemes.',
        'Dedicated categories for women, small farmers, students, and elders.',
        'Filter based on household income, landholding, and family profile.',
        'Clear breakdown of monthly financial transfers, subsidies, and grants.'
      ],
      actionText: currentLang === 'ta' ? 'திட்டங்களைக் காண்க' : 'Explore All Schemes'
    },
    readiness: {
      title: t.card2Title,
      subtitle: t.card2Desc,
      icon: '📋',
      points: currentLang === 'ta' ? [
        'ஸ்மார்ட் குடும்ப அட்டை (Smart Ration Card) மற்றும் குடும்ப உறுப்பினர்களின் பெயர்கள் சரிபார்ப்பு.',
        'ஆதாருடன் இணைக்கப்பட்ட வங்கி கணக்கு (Aadhaar Seeded & NPCI Active).',
        'வருமானச் சான்றிதழ் (Income Certificate) மற்றும் சாதிச் சான்றிதழ் தயார்நிலை.',
        'நில உடமை ஆவணங்கள் (பட்டா/சிட்டா & மின் பயன்பாட்டு ரசீதுகள்).'
      ] : [
        'Verification of family members in Smart Family Card (TNPDS).',
        'Bank account mapped to Aadhaar with active NPCI DBT status.',
        'Current year Income Certificate and Community Certificate readiness.',
        'Land records (Patta / Chitta) and electricity consumption records.'
      ],
      actionText: currentLang === 'ta' ? 'சரிபார்ப்புப் பட்டியலைத் திறக்க' : 'Check Readiness'
    },
    prepare: {
      title: t.card3Title,
      subtitle: t.card3Desc,
      icon: '📄',
      points: currentLang === 'ta' ? [
        'விண்ணப்பிக்கும் முன் தேவையான அனைத்து ஆவண நகல்களின் சரிபார்ப்பு.',
        'இ-சேவை மையம் (e-Sevai) அல்லது இணையதளத்தில் சமர்ப்பிக்கும் வழிமுறைகள்.',
        'விண்ணப்ப நிராகரிப்பை தவிர்க்க உதவும் முன்னெச்சரிக்கை வழிகாட்டுதல்.',
        'விண்ணப்ப நிலை (Application Status) கண்காணிக்கும் முறைகள்.'
      ] : [
        'Pre-application document preparation checklist for error-free submission.',
        'Guidance for e-Sevai centres, village administrative offices, and web portals.',
        'Prevent common application rejections before official submission.',
        'Tracking application status and acknowledgement receipts.'
      ],
      actionText: currentLang === 'ta' ? 'விண்ணப்ப வழிகாட்டல்' : 'Application Guide'
    },
    transparency: {
      title: t.card4Title,
      subtitle: t.card4Desc,
      icon: '🛡️',
      points: currentLang === 'ta' ? [
        'அனைத்து தகுதி விதிகளும் தமிழக அரசு அரசாணைகள் (Government Orders - G.O.) மூலம் சரிபார்க்கப்பட்டவை.',
        'அதிகாரப்பூர்வ அரசு இணையதள இணைப்புகள் (tn.gov.in, myscheme.gov.in).',
        'மறைமுக கட்டணங்களோ அல்லது தரகர் தலையீடோ இல்லாத வெளிப்படையான தகவல்.',
        'எந்தவொரு தனிப்பட்ட தகவலும் வெளிப்புற சேவையகங்களில் சேமிக்கப்படாது.'
      ] : [
        'Every eligibility rule is directly grounded in official Government Orders (G.O. Ms).',
        'Direct outbound citations to official government portals (tn.gov.in, myscheme.gov.in).',
        'Zero intermediary fees or political affiliation—pure citizen empowerment.',
        'Completely independent public-benefit verification system.'
      ],
      actionText: currentLang === 'ta' ? 'அதிகாரப்பூர்வ விதிகளை அறிக' : 'View Official Citations'
    }
  };

  const feature = contentMap[featureId] || contentMap.discover;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/45 backdrop-blur-xs transition-opacity animate-in fade-in duration-150">
      <div className="w-full max-w-md bg-[#FAF7F0] rounded-t-[28px] sm:rounded-[28px] p-5 shadow-2xl border border-[#E8E1D2] animate-in slide-in-from-bottom duration-200">
        <div className="w-10 h-1 bg-[#D3CABB] rounded-full mx-auto mb-3 sm:hidden" />

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{feature.icon}</span>
            <h2 className="text-[18px] font-bold text-[#165446]">{feature.title}</h2>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="w-8 h-8 rounded-full bg-[#EFE9DC] text-[#4F5552] flex items-center justify-center hover:bg-[#E5DFCE] transition-colors"
          >
            ✕
          </button>
        </div>

        <p className="text-[13px] text-[#555C58] mb-4 whitespace-pre-line leading-relaxed">
          {feature.subtitle}
        </p>

        <div className="bg-white rounded-2xl p-4 border border-[#ECE5D8] mb-4 space-y-2.5">
          {feature.points.map((pt, idx) => (
            <div key={idx} className="flex items-start gap-2.5 text-[13px] text-[#2C312E] leading-snug">
              <span className="w-5 h-5 rounded-full bg-[#FFF3CF] text-[#98741D] flex items-center justify-center text-[11px] font-bold shrink-0 mt-0.5">
                ✓
              </span>
              <span>{pt}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenDiscovery();
            }}
            className="flex-1 py-3 bg-[#165446] hover:bg-[#12473b] active:scale-[0.98] text-white text-[14px] font-bold rounded-xl transition-all shadow-sm"
          >
            {feature.actionText} →
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-3 bg-white border border-[#ECE5D8] text-[#555C58] text-[14px] font-semibold rounded-xl hover:bg-[#FAF7F0] transition-colors"
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
};
