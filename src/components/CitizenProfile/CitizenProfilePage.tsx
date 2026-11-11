import React, { useEffect, useState } from 'react';
import { ArrowLeft, CheckCircle2, ChevronLeft, ChevronRight, Home, Users } from 'lucide-react';
import { translations } from '../../data/translations';
import { householdService } from '../../services/householdService';
import { CitizenProfileData, Language } from '../../types';
import { EducationWorkForm } from './EducationWorkForm';
import { HousingAssetsForm } from './HousingAssetsForm';
import { IncomeLivelihoodForm } from './IncomeLivelihoodForm';
import { OtherDetailsForm } from './OtherDetailsForm';
import { PersonalInformationForm } from './PersonalInformationForm';
import { ProfileReviewPage } from './ProfileReviewPage';
import { QuestionnaireProgress } from './QuestionnaireProgress';
import { NotFoundPage } from '../Common/NotFoundPage';

interface CitizenProfilePageProps {
  memberId?: string;
  currentLang: Language;
  initialStep?: number | 'review';
  onNavigateBack: () => void;
  onNavigateHome: () => void;
  onNavigateToHousehold: () => void;
  onOpenLanguage: () => void;
}

export const CitizenProfilePage: React.FC<CitizenProfilePageProps> = ({
  memberId = 'm1',
  currentLang,
  initialStep = 1,
  onNavigateBack,
  onNavigateHome,
  onNavigateToHousehold,
  onOpenLanguage,
}) => {
  const t = translations[currentLang];
  const isTamil = currentLang === 'ta';

  const member = householdService.getMember(memberId);

  if (!member) {
    return (
      <NotFoundPage
        currentLang={currentLang}
        title={isTamil ? `உறுப்பினர் '${memberId}' காணப்படவில்லை` : `Member '${memberId}' Not Found`}
        message={
          isTamil
            ? 'கோரப்பட்ட குடும்ப உறுப்பினர் விவரம் பதிவேட்டில் இல்லை. குடும்ப மையத்திற்குத் திரும்பவும்.'
            : `The household member ID '${memberId}' does not exist in your household. Please return to the Household Hub.`
        }
        onNavigateHome={onNavigateToHousehold}
      />
    );
  }

  const [currentStep, setCurrentStep] = useState<number>(
    typeof initialStep === 'number' && initialStep >= 1 && initialStep <= 5 ? initialStep : 1
  );
  const [isReviewing, setIsReviewing] = useState<boolean>(initialStep === 'review');
  const [formData, setFormData] = useState<CitizenProfileData>(() =>
    householdService.getMemberProfile(memberId)
  );
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  useEffect(() => {
    // When memberId changes, reload that member's specific profile
    const prof = householdService.getMemberProfile(memberId);
    setFormData(prof);
    setCurrentStep(1);
    setIsReviewing(false);
    setIsCompleted(false);
  }, [memberId]);

  const handleUpdateFormData = (updated: Partial<CitizenProfileData>) => {
    setFormData((prev) => {
      const next = { ...prev, ...updated };
      householdService.saveMemberProfile(memberId, next);
      return next;
    });
  };

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setIsReviewing(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onNavigateBack();
    }
  };

  const handleConfirmAndComplete = () => {
    householdService.saveMemberProfile(memberId, formData);
    setIsReviewing(false);
    setIsCompleted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isReviewing) {
    return (
      <ProfileReviewPage
        currentLang={currentLang}
        formData={formData}
        onNavigateBack={() => {
          setIsReviewing(false);
          setCurrentStep(5);
        }}
        onNavigateHome={onNavigateHome}
        onOpenLanguage={onOpenLanguage}
        onSelectSection={(step) => {
          setIsReviewing(false);
          setCurrentStep(step);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onMakeCorrections={() => {
          setIsReviewing(false);
          setCurrentStep(4);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onConfirm={handleConfirmAndComplete}
      />
    );
  }

  return (
    <div className="w-full max-w-[460px] mx-auto px-4 py-3 pb-8 text-left select-none">
      {/* Top Header Row */}
      <section className="flex items-center justify-between mb-3">
        <button
          type="button"
          onClick={onNavigateBack}
          className="p-1 -ml-1 text-[#155B4D] hover:bg-[#E5F1E7] rounded-full transition-all cursor-pointer"
          aria-label={t.back}
        >
          <ArrowLeft className="w-5.5 h-5.5 stroke-[2.4]" />
        </button>

        <div className="flex items-center gap-1.5 text-[11.5px] font-semibold text-[#155B4D] bg-[#E8F3EB] px-3 py-1 rounded-full border border-[#CDE1D0]">
          <Users className="w-3.5 h-3.5" />
          <span>
            {member ? (isTamil ? member.nameTa || member.name : member.name) : 'Household Member'}
          </span>
          {member && <span className="text-[10px] text-[#55645E]">({member.relation})</span>}
        </div>
      </section>

      {/* Heading */}
      <section className="mb-4">
        <h1
          className={`text-[#155B4D] font-bold text-[22px] sm:text-[24px] leading-tight tracking-tight ${
            isTamil ? 'font-tamil' : ''
          }`}
        >
          {isTamil ? 'உறுப்பினர் தகுதி கேள்வித்தாள்' : 'Member Questionnaire'}
        </h1>
        <p className={`text-[#59635F] text-[13px] leading-snug mt-1 ${isTamil ? 'font-tamil' : ''}`}>
          {isTamil
            ? 'அனைத்து 5 பகுதிகளையும் பூர்த்தி செய்வதன் மூலம் தகுதியான நலத்திட்டங்களை துல்லியமாக கண்டறியலாம்.'
            : 'Complete the 5 sections to evaluate scheme eligibility criteria for this member.'}
        </p>
      </section>

      {/* Completion View */}
      {isCompleted ? (
        <section className="bg-white rounded-[22px] border border-[#CDE1D0] p-6 shadow-sm text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#E8F3EB] text-[#155B4D] flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-9 h-9 stroke-[2.4]" />
          </div>

          <div>
            <h2 className="text-[18px] font-bold text-[#155B4D]">
              {isTamil ? 'கேள்வித்தாள் வெற்றிகரமாக சேமிக்கப்பட்டது!' : 'Questionnaire Saved Successfully!'}
            </h2>
            <p className="text-[12.5px] text-[#55645E] mt-1.5 max-w-xs mx-auto leading-relaxed">
              {isTamil
                ? `${member ? member.name : 'உறுப்பினர்'} பற்றிய விவரங்கள் புதுப்பிக்கப்பட்டன. இப்போது குடும்ப முனையத்திற்குத் திரும்பலாம்.`
                : `Profile details for ${member ? member.name : 'this member'} have been recorded. Return to the Household Hub to continue.`}
            </p>
          </div>

          {/* CRITICAL: A01 Fix: Returns to Household Hub (NOT public explorer!) */}
          <button
            type="button"
            onClick={onNavigateToHousehold}
            className="w-full py-3.5 bg-[#155B4D] hover:bg-[#10483D] active:scale-[0.99] text-white font-bold rounded-[14px] text-[14px] shadow-sm flex items-center justify-center gap-2 cursor-pointer transition-all"
          >
            <span>{isTamil ? 'குடும்ப முனையத்திற்குத் திரும்பு →' : 'Return to Household Hub →'}</span>
          </button>
        </section>
      ) : (
        <>
          {/* Progress Indicator */}
          <div className="w-full mb-4">
            <QuestionnaireProgress
              currentLang={currentLang}
              currentStep={currentStep}
              totalSteps={5}
              onSelectStep={(step) => setCurrentStep(step)}
            />
          </div>

          {/* Form Step Content */}
          <div className="w-full">
            {currentStep === 1 && (
              <PersonalInformationForm
                currentLang={currentLang}
                formData={formData}
                onChange={handleUpdateFormData}
              />
            )}

            {currentStep === 2 && (
              <EducationWorkForm
                currentLang={currentLang}
                formData={formData}
                onChange={handleUpdateFormData}
              />
            )}

            {currentStep === 3 && (
              <IncomeLivelihoodForm
                currentLang={currentLang}
                formData={formData}
                onChange={handleUpdateFormData}
              />
            )}

            {currentStep === 4 && (
              <HousingAssetsForm
                currentLang={currentLang}
                formData={formData}
                onChange={handleUpdateFormData}
              />
            )}

            {currentStep === 5 && (
              <OtherDetailsForm
                currentLang={currentLang}
                formData={formData}
                onChange={handleUpdateFormData}
              />
            )}
          </div>

          {/* Step Navigation Controls (Prev / Next) */}
          <div className="w-full mt-5 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={handlePrevious}
              className="px-4 py-2.5 rounded-[12px] border border-[#CBD5CF] bg-white hover:bg-[#FAF7EF] active:scale-95 text-[#155B4D] font-bold text-[13px] flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
            >
              <ChevronLeft className="w-4 h-4 stroke-[2.4]" />
              <span>{isTamil ? 'முந்தையது' : 'Previous'}</span>
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="flex-1 py-2.5 rounded-[12px] bg-[#155B4D] hover:bg-[#10483D] active:scale-[0.99] text-white font-bold text-[13.5px] flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs"
            >
              <span>{currentStep === 5 ? (isTamil ? 'விவரங்களை ஆய்வு செய் →' : 'Review Answers →') : (isTamil ? 'அடுத்தது →' : 'Next Step →')}</span>
              <ChevronRight className="w-4 h-4 stroke-[2.4]" />
            </button>
          </div>
        </>
      )}
    </div>
  );
};
