import React from 'react';
import { BarChart2, ClipboardCheck, Search, UserPlus } from 'lucide-react';
import { translations } from '../../data/translations';
import { Language } from '../../types';

interface QuickActionsGridProps {
  currentLang: Language;
  onManageHousehold: () => void;
  onUpdateProfile: () => void;
  onExploreSchemes: () => void;
  onMyResults: () => void;
}

export const QuickActionsGrid: React.FC<QuickActionsGridProps> = ({
  currentLang,
  onManageHousehold,
  onUpdateProfile,
  onExploreSchemes,
  onMyResults,
}) => {
  const t = translations[currentLang];
  const isTamil = currentLang === 'ta';

  const actions = [
    {
      id: 'household',
      icon: UserPlus,
      line1: t.qaManageHouseholdLine1,
      line2: t.qaManageHouseholdLine2,
      onClick: onManageHousehold,
      ariaLabel: isTamil ? 'குடும்பத்தை நிர்வகிக்க' : 'Manage Household',
    },
    {
      id: 'profile',
      icon: ClipboardCheck,
      line1: t.qaUpdateProfileLine1,
      line2: t.qaUpdateProfileLine2,
      onClick: onUpdateProfile,
      ariaLabel: isTamil ? 'சுயவிவரத்தை புதுப்பிக்க' : 'Update Profile',
    },
    {
      id: 'explore',
      icon: Search,
      line1: t.qaExploreSchemesLine1,
      line2: t.qaExploreSchemesLine2,
      onClick: onExploreSchemes,
      ariaLabel: isTamil ? 'திட்டங்களை தேடுக' : 'Explore Schemes',
    },
    {
      id: 'results',
      icon: BarChart2,
      line1: t.qaMyResultsLine1,
      line2: t.qaMyResultsLine2,
      onClick: onMyResults,
      ariaLabel: isTamil ? 'என் முடிவுகள்' : 'My Results',
    },
  ];

  return (
    <section className="w-full px-4 sm:px-5 pt-2 pb-1 select-none">
      {/* Section Heading */}
      <h2
        className={`text-[#155B4D] font-bold text-[16px] sm:text-[17px] mb-2.5 text-left leading-tight ${
          isTamil ? 'font-tamil' : ''
        }`}
      >
        {t.quickActionsHeading}
      </h2>

      {/* 4 Cards in 1 Row - Equal heights, centered alignment, balanced spacing */}
      <div className="grid grid-cols-4 gap-2 sm:gap-2.5 items-stretch">
        {actions.map((act) => {
          const Icon = act.icon;
          return (
            <button
              key={act.id}
              type="button"
              onClick={act.onClick}
              aria-label={act.ariaLabel}
              className="w-full bg-white hover:bg-[#FFFDF9] active:scale-95 rounded-[16px] px-1.5 py-2.5 sm:px-2 sm:py-3 border border-[#ECE5D8] shadow-2xs flex flex-col items-center justify-center text-center transition-all cursor-pointer h-[86px] sm:h-[90px] group"
            >
              {/* Centered Deep Teal Icon with Consistent Dimensions */}
              <div className="w-6 h-6 flex items-center justify-center text-[#155B4D] group-hover:scale-105 transition-transform mb-1.5 shrink-0">
                {act.id === 'results' ? (
                  <svg
                    className="w-5 h-5 text-[#155B4D]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 20v-6" />
                    <path d="M12 20v-10" />
                    <path d="M18 20v-15" />
                  </svg>
                ) : (
                  <Icon className="w-5 h-5 stroke-[2.1]" />
                )}
              </div>

              {/* Centered Label with Semibold Weight, Line Height 1.35, and Comfortable Margins */}
              <div
                className={`w-full px-0.5 flex flex-col items-center justify-center text-center text-[#202820] font-semibold leading-[1.35] tracking-normal ${
                  isTamil
                    ? 'font-tamil text-[11px] sm:text-[11.5px]'
                    : 'text-[11px] sm:text-[11.5px]'
                }`}
              >
                <span className="block whitespace-nowrap overflow-hidden text-ellipsis max-w-full">
                  {act.line1}
                </span>
                <span className="block whitespace-nowrap overflow-hidden text-ellipsis max-w-full mt-0.5">
                  {act.line2}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};
