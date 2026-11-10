import React from 'react';
import { Home, Users, FileText, User } from 'lucide-react';
import { translations } from '../../data/translations';
import { Language } from '../../types';

export type OperatorNavTab = 'home' | 'citizens' | 'applications' | 'profile';

interface OperatorBottomNavProps {
  currentLang: Language;
  activeItem: OperatorNavTab;
  tabLayout?: 'dashboard' | 'applications';
  onNavigateHome: () => void;
  onNavigateCitizens?: () => void;
  onNavigateApplications: () => void;
  onNavigateProfile?: () => void;
}

export const OperatorBottomNav: React.FC<OperatorBottomNavProps> = ({
  currentLang,
  activeItem,
  tabLayout = 'dashboard',
  onNavigateHome,
  onNavigateCitizens,
  onNavigateApplications,
  onNavigateProfile,
}) => {
  const t = translations[currentLang];
  const isTamil = currentLang === 'ta';

  // Screen 1 has: Home, Citizens, Applications, Profile
  // Screen 2 has: Home, Applications, Citizens, Profile
  const tabs =
    tabLayout === 'applications'
      ? [
          {
            id: 'home' as OperatorNavTab,
            label: t.opNavHome,
            icon: Home,
            onClick: onNavigateHome,
          },
          {
            id: 'applications' as OperatorNavTab,
            label: t.opNavApplications,
            icon: FileText,
            onClick: onNavigateApplications,
          },
          {
            id: 'citizens' as OperatorNavTab,
            label: t.opNavCitizens,
            icon: Users,
            onClick: onNavigateCitizens || onNavigateHome,
          },
          {
            id: 'profile' as OperatorNavTab,
            label: t.opNavProfile,
            icon: User,
            onClick: onNavigateProfile || onNavigateHome,
          },
        ]
      : [
          {
            id: 'home' as OperatorNavTab,
            label: t.opNavHome,
            icon: Home,
            onClick: onNavigateHome,
          },
          {
            id: 'citizens' as OperatorNavTab,
            label: t.opNavCitizens,
            icon: Users,
            onClick: onNavigateCitizens || onNavigateHome,
          },
          {
            id: 'applications' as OperatorNavTab,
            label: t.opNavApplications,
            icon: FileText,
            onClick: onNavigateApplications,
          },
          {
            id: 'profile' as OperatorNavTab,
            label: t.opNavProfile,
            icon: User,
            onClick: onNavigateProfile || onNavigateHome,
          },
        ];

  return (
    <nav
      className="sticky bottom-0 left-0 right-0 w-full bg-[#FAF7F3]/95 backdrop-blur-md pt-1.5 pb-[max(env(safe-area-inset-bottom),10px)] z-40 select-none border-t border-[#E8EDE8]"
      role="navigation"
      aria-label="Operator Bottom Navigation"
    >
      <div className="grid grid-cols-4 items-end max-w-[400px] mx-auto px-2">
        {tabs.map((tab) => {
          const isActive = activeItem === tab.id;
          const Icon = tab.icon;

          return (
            <div key={tab.id} className="w-full min-w-0 flex flex-col items-center justify-center px-0.5">
              <button
                type="button"
                onClick={tab.onClick}
                className="w-full min-w-0 flex flex-col items-center justify-center group cursor-pointer focus:outline-none py-0.5"
                aria-current={isActive ? 'page' : undefined}
              >
                {/* Active Indicator Capsule Pill matching reference */}
                <div
                  className={`w-11 h-7 rounded-full flex items-center justify-center transition-all shrink-0 ${
                    isActive
                      ? 'bg-[#145B49] text-white shadow-xs'
                      : 'text-[#2F3E37] hover:text-[#145B49]'
                  }`}
                >
                  <Icon
                    className={`w-4.5 h-4.5 transition-transform ${
                      isActive ? 'stroke-[2.2] scale-105' : 'stroke-[1.8] group-hover:scale-105'
                    }`}
                  />
                </div>
                <span
                  className={`mt-1 w-full text-center truncate block leading-tight tracking-tight transition-colors ${
                    isActive
                      ? 'font-bold text-[#145B49]'
                      : 'font-medium text-[#4B5563] group-hover:text-[#145B49]'
                  } ${isTamil ? 'font-tamil text-[9px] min-[360px]:text-[9.5px]' : 'text-[9.5px] min-[360px]:text-[10px]'}`}
                >
                  {tab.label}
                </span>
              </button>
            </div>
          );
        })}
      </div>
    </nav>
  );
};
