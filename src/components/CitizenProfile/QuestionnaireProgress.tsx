import React from 'react';
import { Language } from '../../types';

interface QuestionnaireProgressProps {
  currentLang: Language;
  currentStep: number; // 1 to 5
  totalSteps?: number;
  onSelectStep?: (step: number) => void;
}

export const QuestionnaireProgress: React.FC<QuestionnaireProgressProps> = ({
  currentLang,
  currentStep,
  totalSteps = 5,
  onSelectStep,
}) => {
  const isTamil = currentLang === 'ta';

  // Compact, high-clarity labels per user specification to prevent collisions
  const stepLabels = isTamil
    ? [
        'தனிப்பட்ட தகவல்',
        'கல்வி & தொழில்',
        'வருமானம்',
        'வீடு & சொத்து',
        'பிற தகவல்',
      ]
    : [
        'Personal Details',
        'Education & Work',
        'Income',
        'Housing & Assets',
        'Other Details',
      ];

  const steps = [1, 2, 3, 4, 5];

  return (
    <section className="w-full bg-[#EFF6ED] rounded-[22px] px-3.5 py-4 sm:px-5 sm:py-4.5 border border-[#D5E6D8] shadow-[0_1px_4px_rgba(21,91,77,0.03)] box-border">
      {/* Top Header Row: Section Label + Step Counter */}
      <div className="flex items-center justify-between mb-4 sm:mb-4.5">
        <h2
          className={`text-[#155B4D] font-bold text-[15.5px] sm:text-[17px] leading-none ${
            isTamil ? 'font-tamil' : ''
          }`}
        >
          {isTamil ? 'சுயவிவர முன்னேற்றம்' : 'Profile Progress'}
        </h2>

        <span
          className={`text-[#155B4D] font-semibold text-[13px] sm:text-[13.5px] leading-none ${
            isTamil ? 'font-tamil' : ''
          }`}
        >
          {isTamil
            ? `படி ${currentStep} / ${totalSteps}`
            : `Step ${currentStep} / ${totalSteps}`}
        </span>
      </div>

      {/* 5 Progress Steps: One Shared 5-Column Grid */}
      <div className="relative w-full">
        {/* Continuous Connecting Line Behind Circles (centered at circle midpoint 16px/18px) */}
        <div
          className="absolute top-[16px] sm:top-[18px] -translate-y-1/2 left-[10%] right-[10%] h-[2.5px] sm:h-[3px] bg-[#D5E6D8] z-0 pointer-events-none"
          aria-hidden="true"
        >
          {/* Active Progress Fill */}
          <div
            className="h-full bg-[#155B4D] transition-all duration-300"
            style={{
              width: `${((Math.min(currentStep, totalSteps) - 1) / (totalSteps - 1)) * 100}%`,
            }}
          />
        </div>

        {/* One Shared 5-Column CSS Grid */}
        <div className="progress-steps relative z-10 w-full">
          {steps.map((stepNum, idx) => {
            const isActive = stepNum === currentStep;
            const isCompleted = stepNum < currentStep;

            return (
              <div
                key={stepNum}
                onClick={() => onSelectStep && stepNum <= currentStep + 1 && onSelectStep(stepNum)}
                className={`progress-step min-w-0 w-full ${onSelectStep ? 'cursor-pointer group' : ''}`}
              >
                {/* Numbered Circle Indicator (32px on mobile, 36px on sm+) */}
                <div
                  className={`w-[32px] h-[32px] sm:w-[36px] sm:h-[36px] rounded-full flex items-center justify-center font-bold text-[13px] sm:text-[14px] transition-all duration-200 select-none z-10 ${
                    isActive
                      ? 'bg-[#155B4D] text-white shadow-xs ring-4 ring-[#EFF6ED]'
                      : isCompleted
                      ? 'bg-[#155B4D] text-white'
                      : 'bg-white border-[1.5px] border-[#CCE3D1] text-[#155B4D]'
                  } ${onSelectStep ? 'group-hover:scale-105 active:scale-95' : ''}`}
                  aria-current={isActive ? 'step' : undefined}
                >
                  {stepNum}
                </div>

                {/* Step Label Centred Directly Beneath Its Circle */}
                <div className="progress-step-label-container mt-2">
                  <span
                    className={`progress-step-label-text text-[8.5px] min-[360px]:text-[9px] min-[390px]:text-[9.5px] sm:text-[10px] leading-[1.22] font-semibold transition-colors select-none ${
                      isActive
                        ? 'text-[#155B4D] font-bold'
                        : isCompleted
                        ? 'text-[#155B4D]'
                        : 'text-[#4A5550]'
                    } ${isTamil ? 'font-tamil' : ''}`}
                  >
                    {stepLabels[idx]}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
