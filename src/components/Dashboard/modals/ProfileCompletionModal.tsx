import React from 'react';
import { Award, CheckCircle2, Circle, X } from 'lucide-react';
import { Language } from '../../../types';

export interface ProfileStep {
  id: string;
  titleEn: string;
  titleTa: string;
  descEn: string;
  descTa: string;
  completed: boolean;
  weight: number;
}

interface ProfileCompletionModalProps {
  isOpen: boolean;
  currentLang: Language;
  steps: ProfileStep[];
  onToggleStep: (stepId: string) => void;
  onClose: () => void;
}

export const ProfileCompletionModal: React.FC<ProfileCompletionModalProps> = ({
  isOpen,
  currentLang,
  steps,
  onToggleStep,
  onClose,
}) => {
  if (!isOpen) return null;
  const isTamil = currentLang === 'ta';

  const totalPercentage = steps.reduce(
    (acc, step) => acc + (step.completed ? step.weight : 0),
    0
  );

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/45 backdrop-blur-xs transition-opacity animate-in fade-in duration-150">
      <div className="w-full max-w-md bg-[#FAF7F0] rounded-t-[28px] sm:rounded-[28px] p-5 shadow-2xl border border-[#E8E1D2] animate-in slide-in-from-bottom duration-200 max-h-[90vh] flex flex-col">
        {/* Handle bar on mobile */}
        <div className="w-10 h-1 bg-[#D3CABB] rounded-full mx-auto mb-3 sm:hidden shrink-0" />

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#ECE5D8] shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-[#FFF4D2] border border-[#F5D879] flex items-center justify-center text-[#155B4D]">
              <Award className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <h2 className="text-[17px] font-bold text-[#155B4D] leading-tight">
                {isTamil ? 'சுயவிவர நிறைவு நிலை' : 'Profile Completion Readiness'}
              </h2>
              <span className="text-[12px] text-[#626A62]">
                {isTamil ? `${totalPercentage}% தயார்நிலை அடைந்துள்ளது` : `${totalPercentage}% Readiness Achieved`}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="w-8 h-8 rounded-full bg-[#EFE9DC] text-[#4F5552] flex items-center justify-center hover:bg-[#E5DFCE] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Progress Bar Container */}
        <div className="my-3 bg-white rounded-2xl p-3 border border-[#ECE5D8] shrink-0">
          <div className="flex items-center justify-between text-xs font-bold text-[#155B4D] mb-1.5">
            <span>{isTamil ? 'சுயவிவர முன்னேற்றம்' : 'Profile Readiness'}</span>
            <span className="text-sm font-extrabold">{totalPercentage}%</span>
          </div>
          <div className="w-full h-3 bg-[#FAF7EF] rounded-full overflow-hidden border border-[#EAE3D2]">
            <div
              className="h-full bg-gradient-to-r from-[#F4C746] to-[#155B4D] rounded-full transition-all duration-500 ease-out"
              style={{ width: `${totalPercentage}%` }}
            />
          </div>
          <p className="text-[11.5px] text-[#626A62] mt-2">
            {isTamil
              ? 'அனைத்து விவரங்களையும் இணைக்கும்போது கூடுதல் திட்டங்கள் திறக்கப்படும்.'
              : 'Completing all checklist items unlocks automatic eligibility verification for all 9 schemes.'}
          </p>
        </div>

        {/* Steps Checklist */}
        <div className="space-y-2.5 overflow-y-auto pr-1 flex-1 py-1">
          {steps.map((step) => (
            <button
              key={step.id}
              type="button"
              onClick={() => onToggleStep(step.id)}
              className={`w-full p-3.5 rounded-2xl border text-left transition-all flex items-start justify-between gap-3 cursor-pointer ${
                step.completed
                  ? 'bg-white border-[#CDE8D6] shadow-2xs'
                  : 'bg-[#FFFDF9] border-[#EDE7DA] hover:border-[#155B4D]/30'
              }`}
            >
              <div className="flex items-start gap-2.5 min-w-0 flex-1">
                <div className="mt-0.5 shrink-0">
                  {step.completed ? (
                    <CheckCircle2 className="w-5 h-5 text-[#155B4D] fill-[#E5F1E7]" />
                  ) : (
                    <Circle className="w-5 h-5 text-[#A0A8A2] stroke-[2]" />
                  )}
                </div>
                <div>
                  <h4 className={`text-[13.5px] font-bold ${step.completed ? 'text-[#155B4D]' : 'text-[#202820]'}`}>
                    {isTamil ? step.titleTa : step.titleEn}
                  </h4>
                  <p className="text-[11.5px] text-[#626A62] mt-0.5 leading-snug">
                    {isTamil ? step.descTa : step.descEn}
                  </p>
                </div>
              </div>

              <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md shrink-0 ${
                step.completed
                  ? 'bg-[#E5F1E7] text-[#155B4D]'
                  : 'bg-[#FAF7EF] text-[#7A827E] border border-[#E5DFD4]'
              }`}>
                +{step.weight}%
              </span>
            </button>
          ))}
        </div>

        {/* Close Button */}
        <div className="pt-3 border-t border-[#ECE5D8] shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 bg-[#155B4D] hover:bg-[#11493e] text-white font-bold text-[13.5px] rounded-xl active:scale-98 transition-all shadow-xs"
          >
            {isTamil ? 'சேமித்து மூடுக' : 'Save & Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
