import React from 'react';
import { translations } from '../../data/translations';
import { Language, SchemeCategory } from '../../types';

interface CategorySelectorProps {
  currentLang: Language;
  selectedCategory: SchemeCategory;
  onSelectCategory: (cat: SchemeCategory) => void;
}

export const CategorySelector: React.FC<CategorySelectorProps> = ({
  currentLang,
  selectedCategory,
  onSelectCategory,
}) => {
  const t = translations[currentLang];
  const isTamil = currentLang === 'ta';

  const categories: { id: SchemeCategory; label: string; icon: string }[] = [
    { id: 'all', label: t.catAll, icon: 'grid' },
    { id: 'health', label: t.catHealth, icon: 'health' },
    { id: 'education', label: t.catEducation, icon: 'education' },
    { id: 'agriculture', label: t.catAgriculture, icon: 'agriculture' },
    { id: 'social', label: t.catSocial, icon: 'social' },
    { id: 'housing', label: t.catHousing, icon: 'housing' },
  ];

  const renderIcon = (type: string, isSelected: boolean) => {
    const strokeClass = 'w-5 h-5 stroke-[2] mx-auto block';

    switch (type) {
      case 'grid':
        return (
          <svg className={strokeClass} viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <rect x="3" y="3" width="7" height="7" rx="1.5" />
            <rect x="14" y="3" width="7" height="7" rx="1.5" />
            <rect x="3" y="14" width="7" height="7" rx="1.5" />
            <rect x="14" y="14" width="7" height="7" rx="1.5" />
          </svg>
        );
      case 'health':
        return (
          <svg className={strokeClass} viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            <path d="M7 11h2l1-2 2 4 1-2h2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      case 'education':
        return (
          <svg className={strokeClass} viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
            <path d="M6 12v5c3 3 9 3 12 0v-5" />
          </svg>
        );
      case 'agriculture':
        return (
          <svg className={strokeClass} viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M12 22v-9" />
            <path d="M12 13a5 5 0 0 1 5-5c2.5 0 3 2.5 3 5 0 2.5-3 5-8 5" />
            <path d="M12 13a5 5 0 0 0-5-5c-2.5 0-3 2.5-3 5 0 2.5 3 5 8 5" />
          </svg>
        );
      case 'social':
        return (
          <svg className={strokeClass} viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        );
      case 'housing':
        return (
          <svg className={strokeClass} viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full py-1">
      <div className="flex items-center gap-2 px-5 overflow-x-auto no-scrollbar scroll-smooth">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelectCategory(cat.id)}
              className={`flex-none w-[84px] min-w-[84px] sm:w-[88px] sm:min-w-[88px] h-[72px] sm:h-[74px] rounded-[16px] px-2 py-2 flex flex-col items-center justify-center gap-1.5 transition-all duration-150 cursor-pointer text-center select-none active:scale-95 ${
                isSelected
                  ? 'bg-[#F6D779] text-[#20231F] shadow-[0_2px_8px_rgba(246,215,121,0.35)] border border-[#EAC964]'
                  : 'bg-white text-[#2E332E] border border-[#ECE5D8] hover:bg-white/90 shadow-[0_1px_3px_rgba(0,0,0,0.02)]'
              }`}
            >
              <div className="w-full flex items-center justify-center text-[#20231F] shrink-0 pointer-events-none">
                {renderIcon(cat.icon, isSelected)}
              </div>
              <div className="w-full flex items-center justify-center text-center overflow-hidden">
                <span
                  className={`block w-full text-center mx-auto leading-[1.2] ${
                    isSelected ? 'font-bold text-[#1C221F]' : 'font-medium text-[#2E332E]'
                  } ${isTamil ? 'font-tamil text-[10px] sm:text-[10.5px] leading-[1.2] tracking-normal' : 'text-[11px] sm:text-[11.5px]'}`}
                  style={{
                    textAlign: 'center',
                    wordBreak: 'keep-all',
                    overflowWrap: 'normal',
                  }}
                >
                  {cat.label}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
