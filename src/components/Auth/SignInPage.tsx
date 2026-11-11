import React, { useState } from 'react';
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  Lock,
  Phone,
  Shield,
  User,
  Users,
  Briefcase,
  FileCheck2,
} from 'lucide-react';
import { authService, DEMO_USERS, UserRole } from '../../services/authService';
import { Language } from '../../types';

interface SignInPageProps {
  currentLang: Language;
  redirectUrl?: string;
  onSuccess: (role: UserRole, targetUrl: string) => void;
  onNavigateHome: () => void;
  onOpenLanguage: () => void;
}

export const SignInPage: React.FC<SignInPageProps> = ({
  currentLang,
  redirectUrl = '/app',
  onSuccess,
  onNavigateHome,
  onOpenLanguage,
}) => {
  const isTamil = currentLang === 'ta';
  const [selectedRole, setSelectedRole] = useState<Exclude<UserRole, 'public'>>('citizen');
  const [phoneInput, setPhoneInput] = useState('9876543210');
  const [otpInput, setOtpInput] = useState('123456');
  const [showOtp, setShowOtp] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRoleQuickSelect = (role: Exclude<UserRole, 'public'>) => {
    setSelectedRole(role);
    setError(null);
  };

  const handleContinueWithPhone = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneInput.length < 10) {
      setError(isTamil ? 'சரியான 10 இலக்க மொபைல் எண்ணை உள்ளிடவும்' : 'Please enter a valid 10-digit mobile number');
      return;
    }
    setError(null);
    setShowOtp(true);
  };

  const handleVerifyAndLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpInput.length < 6) {
      setError(isTamil ? 'சரியான 6 இலக்க OTP உள்ளிடவும்' : 'Please enter the 6-digit OTP code');
      return;
    }
    executeLogin(selectedRole);
  };

  const executeLogin = (role: Exclude<UserRole, 'public'>) => {
    authService.loginAs(role);
    let target = redirectUrl;
    if (!target || target === '/' || target === '/sign-in') {
      if (role === 'citizen') target = '/app';
      else if (role === 'operator') target = '/operator';
      else if (role === 'admin') target = '/admin';
      else if (role === 'reviewer') target = '/review';
    }
    onSuccess(role, target);
  };

  const roles = [
    {
      id: 'citizen' as const,
      titleEn: 'Citizen',
      titleTa: 'பொது குடிமக்கள்',
      descEn: 'Discover schemes, maintain household facts & check eligibility',
      descTa: 'திட்டங்கள் கண்டறிதல், குடும்ப விவரங்கள் மற்றும் தகுதி ஆய்வு',
      icon: Users,
      badgeEn: 'Family Head: Rajesh Kumar',
      badgeTa: 'குடும்பத் தலைவர்: ராஜேஷ் குமார்',
    },
    {
      id: 'operator' as const,
      titleEn: 'Operator',
      titleTa: 'உதவி மைய ஆபரேட்டர்',
      descEn: 'Assisted-service kiosk workflow for walk-in citizens',
      descTa: 'நேரில் வரும் குடிமக்களுக்கான வழிகாட்டப்பட்ட சேவை',
      icon: Briefcase,
      badgeEn: 'e-Sevai #14: Gayathri S.',
      badgeTa: 'இ-சேவை #14: காயத்ரி ச.',
    },
    {
      id: 'admin' as const,
      titleEn: 'Administrator',
      titleTa: 'அரசு நிர்வாகி',
      descEn: 'Scheme catalogue management, rule packs & validation',
      descTa: 'திட்ட விதிமுறைகள் மற்றும் அதிகாரப்பூர்வ மேற்கோள்கள்',
      icon: Shield,
      badgeEn: 'State Admin: Kannan M.',
      badgeTa: 'மாநில நிர்வாகி: கண்ணன் மு.',
    },
    {
      id: 'reviewer' as const,
      titleEn: 'Independent Reviewer',
      titleTa: 'சுயாதீன மதிப்பீட்டாளர்',
      descEn: 'Review submitted rule packs, approve/reject & activate schemes',
      descTa: 'விதிமுறை மதிப்பாய்வு, ஒப்புதல் மற்றும் நேரலை செயல்படுத்தல்',
      icon: FileCheck2,
      badgeEn: 'Policy Board: Dr. V. Sundaram',
      badgeTa: 'ஆலோசனைக் குழு: முனைவர் வெ. சுந்தரம்',
    },
  ];

  return (
    <div className="w-full min-h-screen bg-[#FAF7EF] flex flex-col items-center justify-start select-none pt-2 pb-8 px-4">
      {/* Top Header */}
      <div className="w-full max-w-[460px] flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={onNavigateHome}
          className="flex items-center gap-1.5 text-[#155B4D] hover:opacity-80 transition-all font-semibold text-[13px] cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 stroke-[2.4]" />
          <span>{isTamil ? 'முகப்பு' : 'Home'}</span>
        </button>

        <button
          type="button"
          onClick={onOpenLanguage}
          className="text-[12px] font-bold text-[#155B4D] bg-white border border-[#D5DDD7] px-3 py-1 rounded-full cursor-pointer hover:bg-[#F3EFE3]"
        >
          {isTamil ? 'English' : 'தமிழ்'}
        </button>
      </div>

      <div className="w-full max-w-[460px] bg-white rounded-[22px] border border-[#E5DFD4] p-5 sm:p-6 shadow-sm">
        {/* Demonstration Disclaimer */}
        <div className="mb-4 bg-[#FFF8E6] border border-[#FBEAC0] rounded-[14px] p-3 flex items-start gap-2.5 text-left">
          <div className="w-5 h-5 rounded-full bg-[#E5A824]/20 text-[#B87A00] flex items-center justify-center shrink-0 mt-0.5 text-[11px] font-bold">
            i
          </div>
          <div>
            <p className="text-[12px] font-bold text-[#7A5200]">
              {isTamil ? 'முன்மாதிரி செயல்முறை விளக்கம் (Demonstration Mode)' : 'Frontend Demonstration Authentication'}
            </p>
            <p className="text-[11px] text-[#694A06] mt-0.5 leading-snug">
              {isTamil
                ? 'இது உண்மையான அரசு உள்நுழைவு அல்ல. எந்தவொரு பாத்திரத்தையும் (Role) தேர்வு செய்து முழு அனுபவத்தையும் சோதிக்கலாம்.'
                : 'This is an isolated frontend demonstration layer. Select any persona to test the end-to-end journey.'}
            </p>
          </div>
        </div>

        <h1
          className={`text-[20px] sm:text-[22px] font-bold text-[#155B4D] text-left leading-tight ${
            isTamil ? 'font-tamil' : ''
          }`}
        >
          {isTamil ? 'அடையாள உள்நுழைவு' : 'Sign In & Select Experience'}
        </h1>
        <p className="text-[#59635F] text-[12.5px] text-left mt-1 mb-4 leading-normal">
          {isTamil
            ? 'நீங்கள் பயன்படுத்த விரும்பும் பயனர் அனுபவத்தைத் தேர்வு செய்யவும்:'
            : 'Choose the role experience you wish to evaluate:'}
        </p>

        {/* Role Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-5">
          {roles.map((role) => {
            const Icon = role.icon;
            const isSelected = selectedRole === role.id;
            return (
              <button
                key={role.id}
                type="button"
                onClick={() => handleRoleQuickSelect(role.id)}
                className={`p-3 rounded-[16px] border text-left transition-all cursor-pointer relative flex flex-col justify-between ${
                  isSelected
                    ? 'border-[#155B4D] bg-[#EFF6ED] shadow-xs ring-1 ring-[#155B4D]'
                    : 'border-[#E2DDD3] bg-[#FCFAF5] hover:border-[#CBD3CE]'
                }`}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <div
                    className={`w-7 h-7 rounded-[8px] flex items-center justify-center shrink-0 ${
                      isSelected ? 'bg-[#155B4D] text-white' : 'bg-[#EAE5D9] text-[#155B4D]'
                    }`}
                  >
                    <Icon className="w-4 h-4 stroke-[2.2]" />
                  </div>
                  <span
                    className={`text-[13px] font-bold ${
                      isSelected ? 'text-[#155B4D]' : 'text-[#202820]'
                    } ${isTamil ? 'font-tamil' : ''}`}
                  >
                    {isTamil ? role.titleTa : role.titleEn}
                  </span>
                </div>

                <p className="text-[10.5px] text-[#5C6661] leading-tight mb-2 line-clamp-2">
                  {isTamil ? role.descTa : role.descEn}
                </p>

                <span className="text-[9.5px] font-semibold text-[#155B4D] bg-white/80 border border-[#D5E2D8] px-2 py-0.5 rounded-full inline-block truncate">
                  {isTamil ? role.badgeTa : role.badgeEn}
                </span>
              </button>
            );
          })}
        </div>

        {/* Instant 1-Click Launch Button */}
        <button
          type="button"
          onClick={() => executeLogin(selectedRole)}
          className="w-full py-3.5 bg-[#155B4D] hover:bg-[#10483D] active:scale-[0.99] text-white font-bold rounded-[14px] text-[14.5px] transition-all cursor-pointer shadow-sm flex items-center justify-center gap-2 mb-4"
        >
          <CheckCircle2 className="w-5 h-5 stroke-[2.2]" />
          <span>
            {isTamil
              ? `${selectedRole === 'citizen' ? 'குடிமகன்' : selectedRole === 'operator' ? 'ஆபரேட்டர்' : selectedRole === 'admin' ? 'நிர்வாகி' : 'மதிப்பீட்டாளர்'} ஆக தொடரவும்`
              : `Enter as ${selectedRole.toUpperCase()}`}
          </span>
        </button>

        {/* Separator */}
        <div className="relative my-4 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#E5DFD4]" />
          </div>
          <span className="relative bg-white px-3 text-[11px] font-medium text-[#7A8680] uppercase tracking-wider">
            {isTamil ? 'அல்லது மொபைல் OTP வழி' : 'Or Mobile OTP Demonstration'}
          </span>
        </div>

        {/* Simulated Mobile OTP Form */}
        {!showOtp ? (
          <form onSubmit={handleContinueWithPhone} className="space-y-3 text-left">
            <div>
              <label className="block text-[12px] font-semibold text-[#303833] mb-1">
                {isTamil ? 'மொபைல் எண்' : 'Mobile Number'}
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-3 text-[13px] font-bold text-[#55645E]">+91</span>
                <input
                  type="tel"
                  maxLength={10}
                  value={phoneInput}
                  onChange={(e) => setPhoneInput(e.target.value.replace(/\D/g, ''))}
                  className="w-full pl-12 pr-3 py-2.5 bg-[#FAF7EF] border border-[#CBD5CF] rounded-[12px] text-[14px] font-semibold text-[#202820] focus:outline-none focus:border-[#155B4D]"
                  placeholder="98765 43210"
                />
              </div>
            </div>

            {error && <p className="text-[12px] text-red-600 font-medium">{error}</p>}

            <button
              type="submit"
              className="w-full py-2.5 bg-[#E8F3EB] hover:bg-[#DCEDE0] text-[#155B4D] font-bold rounded-[12px] text-[13px] transition-all cursor-pointer"
            >
              {isTamil ? 'OTP அனுப்பவும் (Demo)' : 'Get OTP (Simulated)'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyAndLogin} className="space-y-3 text-left">
            <div>
              <label className="block text-[12px] font-semibold text-[#303833] mb-1">
                {isTamil ? 'அனுப்பப்பட்ட OTP குறியீடு (Default: 123456)' : 'Enter 6-digit OTP (Default: 123456)'}
              </label>
              <input
                type="text"
                maxLength={6}
                value={otpInput}
                onChange={(e) => setOtpInput(e.target.value)}
                className="w-full px-3 py-2.5 bg-[#FAF7EF] border border-[#CBD5CF] rounded-[12px] text-[16px] font-mono tracking-widest text-center font-bold text-[#155B4D] focus:outline-none focus:border-[#155B4D]"
              />
            </div>

            {error && <p className="text-[12px] text-red-600 font-medium">{error}</p>}

            <button
              type="submit"
              className="w-full py-3 bg-[#155B4D] hover:bg-[#10483D] text-white font-bold rounded-[12px] text-[13.5px] transition-all cursor-pointer"
            >
              {isTamil ? 'சரிபார்த்து உள்நுழைக' : 'Verify & Sign In'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

