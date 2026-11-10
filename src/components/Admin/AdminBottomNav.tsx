import React from 'react';
import { Home, Users, FileText, User } from 'lucide-react';
import { translations } from '../../data/translations';
import { Language } from '../../types';

export type AdminNavTab = 'home' | 'review' | 'records' | 'settings';

interface AdminBottomNavProps {
  currentLang: Language;
  activeItem: AdminNavTab;
  onNavigateHome: () => void;
  onNavigateReview: () => void;
  onNavigateRecords?: () => void;
  onNavigateSettings?: () => void;
}

export const AdminBottomNav: React.FC<AdminBottomNavProps> = ({
  currentLang,
  activeItem,
  onNavigateHome,
  onNavigateReview,
  onNavigateRecords,
  onNavigateSettings,
}) => {
  const t = translations[currentLang];
  const isTamil = currentLang === 'ta';

  const tabs = [
    {
      id: 'home' as AdminNavTab,
      label: t.adminNavHome,
      icon: Home,
      onClick: onNavigateHome,
    },
    {
      id: 'review' as AdminNavTab,
      label: t.adminNavReview,
      icon: Users,
      onClick: onNavigateReview,
    },
    {
      id: 'records' as AdminNavTab,
      label: t.adminNavRecords,
      icon: FileText,
      onClick: onNavigateRecords || onNavigateReview,
    },
    {
      id: 'settings' as AdminNavTab,
      label: t.adminNavSettings,
      icon: User,
      onClick: onNavigateSettings || onNavigateHome,
    },
  ];

  return (
    <nav
      className="sticky bottom-0 left-0 right-0 w-full bg-[#FAF7F3]/95 backdrop-blur-md pt-1.5 pb-[max(env(safe-area-inset-bottom),10px)] z-40 select-none border-t border-[#E8EDE8]"
      role="navigation"
      aria-label="Administration Bottom Navigation"
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
