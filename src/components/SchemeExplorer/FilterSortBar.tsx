import React, { useState } from 'react';
import { translations } from '../../data/translations';
import { AdminLevel, Language, SchemeCategory, SortOption } from '../../types';

interface FilterSortBarProps {
  currentLang: Language;
  selectedLevel: AdminLevel;
  selectedCategory: SchemeCategory;
  selectedSort: SortOption;
  onSelectLevel: (lvl: AdminLevel) => void;
  onSelectCategory: (cat: SchemeCategory) => void;
  onSelectSort: (sort: SortOption) => void;
}

export const FilterSortBar: React.FC<FilterSortBarProps> = ({
  currentLang,
  selectedLevel,
  selectedCategory,
  selectedSort,
  onSelectLevel,
  onSelectCategory,
  onSelectSort,
}) => {
  const [activeDropdown, setActiveDropdown] = useState<'level' | 'category' | 'sort' | null>(null);

  const t = translations[currentLang];
  const isTamil = currentLang === 'ta';

  const getLevelLabel = () => {
    switch (selectedLevel) {
      case 'state':
        return t.levelState;
      case 'central':
        return t.levelCentral;
      default:
        return t.levelAll;
    }
  };

  const getCategoryLabel = () => {
    switch (selectedCategory) {
      case 'health':
        return t.catHealth;
      case 'education':
        return t.catEducation;
      case 'agriculture':
        return t.catAgriculture;
      case 'social':
        return t.catSocial;
      case 'housing':
        return t.catHousing;
      default:
        return isTamil ? 'அனைத்து பிரிவுகள்' : 'All Categories';
    }
  };

  const getSortLabel = () => {
    switch (selectedSort) {
      case 'alphabetical':
        return t.sortAlpha;
      case 'recently_updated':
        return t.sortUpdated;
      default:
        return t.sortRelevance;
    }
  };

  return (
    <div className="w-full px-5 py-0.5">
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth py-0.5">
        {/* Dropdown 1: All Levels */}
        <button
          type="button"
          onClick={() => setActiveDropdown(activeDropdown === 'level' ? null : 'level')}
          className={`inline-flex items-center justify-between gap-2.5 px-3.5 py-1.5 min-h-[36px] w-auto bg-white hover:bg-white active:scale-95 border rounded-full text-[12px] sm:text-[12.5px] font-semibold transition-all shadow-[0_1px_3px_rgba(0,0,0,0.025)] shrink-0 cursor-pointer ${
            selectedLevel !== 'all'
              ? 'border-[#165446] text-[#165446] bg-[#F2F8F5]'
              : 'border-[#ECE5D8] text-[#2C312E]'
          }`}
        >
          <span
            className={`whitespace-nowrap select-none ${isTamil ? 'font-tamil text-[12px] tracking-normal' : ''}`}
            style={{ wordBreak: 'keep-all', overflowWrap: 'normal' }}
          >
            {getLevelLabel()}
          </span>
          <svg className="w-3.5 h-3.5 text-[#555C58] shrink-0 ml-0.5 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>

        {/* Dropdown 2: All Categories */}
        <button
          type="button"
          onClick={() => setActiveDropdown(activeDropdown === 'category' ? null : 'category')}
          className={`inline-flex items-center justify-between gap-2.5 px-3.5 py-1.5 min-h-[36px] w-auto bg-white hover:bg-white active:scale-95 border rounded-full text-[12px] sm:text-[12.5px] font-semibold transition-all shadow-[0_1px_3px_rgba(0,0,0,0.025)] shrink-0 cursor-pointer ${
            selectedCategory !== 'all'
              ? 'border-[#165446] text-[#165446] bg-[#F2F8F5]'
              : 'border-[#ECE5D8] text-[#2C312E]'
          }`}
        >
          <span
            className={`whitespace-nowrap select-none ${isTamil ? 'font-tamil text-[12px] tracking-normal' : ''}`}
            style={{ wordBreak: 'keep-all', overflowWrap: 'normal' }}
          >
            {getCategoryLabel()}
          </span>
          <svg className="w-3.5 h-3.5 text-[#555C58] shrink-0 ml-0.5 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>

        {/* Dropdown 3: Sort: Relevance */}
        <button
          type="button"
          onClick={() => setActiveDropdown(activeDropdown === 'sort' ? null : 'sort')}
          className={`inline-flex items-center justify-between gap-2.5 px-3.5 py-1.5 min-h-[36px] w-auto bg-white hover:bg-white active:scale-95 border rounded-full text-[12px] sm:text-[12.5px] font-semibold transition-all shadow-[0_1px_3px_rgba(0,0,0,0.025)] shrink-0 cursor-pointer ${
            selectedSort !== 'relevance'
              ? 'border-[#165446] text-[#165446] bg-[#F2F8F5]'
              : 'border-[#ECE5D8] text-[#2C312E]'
          }`}
        >
          <span
            className={`whitespace-nowrap select-none ${isTamil ? 'font-tamil text-[12px] tracking-normal' : ''}`}
            style={{ wordBreak: 'keep-all', overflowWrap: 'normal' }}
          >
            {getSortLabel()}
          </span>
          <svg className="w-3.5 h-3.5 text-[#555C58] shrink-0 ml-0.5 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      </div>

      {/* Floating Selection Sheet / Dropdown Menu */}
      {activeDropdown && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/35 backdrop-blur-xs animate-in fade-in duration-100">
          <div className="w-full max-w-sm bg-[#FAF7F0] rounded-t-[24px] sm:rounded-[24px] p-4 sm:p-5 shadow-2xl border border-[#E8E1D2] animate-in slide-in-from-bottom duration-150">
            <div className="flex items-center justify-between mb-3 border-b border-[#ECE5D8] pb-2.5">
              <h3 className="text-[15px] font-bold text-[#165446]">
                {activeDropdown === 'level' && (isTamil ? 'அரசு நிர்வாக நிலை' : 'Government Administration Level')}
                {activeDropdown === 'category' && (isTamil ? 'திட்டப் பிரிவு' : 'Scheme Category')}
                {activeDropdown === 'sort' && (isTamil ? 'வரிசைப்படுத்துதல்' : 'Sort Schemes')}
              </h3>
              <button
                type="button"
                onClick={() => setActiveDropdown(null)}
                className="w-7 h-7 rounded-full bg-[#EFE9DC] text-[#4F5552] flex items-center justify-center text-xs"
              >
                ✕
              </button>
            </div>

            <div className="space-y-1.5">
              {/* Level Options */}
              {activeDropdown === 'level' && (
                <>
                  {[
                    { id: 'all' as AdminLevel, label: t.levelAll },
                    { id: 'state' as AdminLevel, label: t.levelState },
                    { id: 'central' as AdminLevel, label: t.levelCentral },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => {
                        onSelectLevel(opt.id);
                        setActiveDropdown(null);
                      }}
                      className={`w-full p-3 rounded-xl flex items-center justify-between text-left text-[13.5px] font-semibold transition-all ${
                        selectedLevel === opt.id
                          ? 'bg-[#165446] text-white'
                          : 'bg-white text-[#20231F] border border-[#ECE5D8] hover:bg-[#FFFDF7]'
                      }`}
                    >
                      <span>{opt.label}</span>
                      {selectedLevel === opt.id && <span>✓</span>}
                    </button>
                  ))}
                </>
              )}

              {/* Category Options */}
              {activeDropdown === 'category' && (
                <>
                  {[
                    { id: 'all' as SchemeCategory, label: t.catAll },
                    { id: 'health' as SchemeCategory, label: t.catHealth },
                    { id: 'education' as SchemeCategory, label: t.catEducation },
                    { id: 'agriculture' as SchemeCategory, label: t.catAgriculture },
                    { id: 'social' as SchemeCategory, label: t.catSocial },
                    { id: 'housing' as SchemeCategory, label: t.catHousing },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => {
                        onSelectCategory(opt.id);
                        setActiveDropdown(null);
                      }}
                      className={`w-full p-2.5 rounded-xl flex items-center justify-between text-left text-[13.5px] font-semibold transition-all ${
                        selectedCategory === opt.id
                          ? 'bg-[#165446] text-white'
                          : 'bg-white text-[#20231F] border border-[#ECE5D8] hover:bg-[#FFFDF7]'
                      }`}
                    >
                      <span>{opt.label}</span>
                      {selectedCategory === opt.id && <span>✓</span>}
                    </button>
                  ))}
                </>
              )}

              {/* Sort Options */}
              {activeDropdown === 'sort' && (
                <>
                  {[
                    { id: 'relevance' as SortOption, label: t.sortRelevance },
                    { id: 'alphabetical' as SortOption, label: t.sortAlpha },
                    { id: 'recently_updated' as SortOption, label: t.sortUpdated },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => {
                        onSelectSort(opt.id);
                        setActiveDropdown(null);
                      }}
                      className={`w-full p-3 rounded-xl flex items-center justify-between text-left text-[13.5px] font-semibold transition-all ${
                        selectedSort === opt.id
                          ? 'bg-[#165446] text-white'
                          : 'bg-white text-[#20231F] border border-[#ECE5D8] hover:bg-[#FFFDF7]'
                      }`}
                    >
                      <span>{opt.label}</span>
                      {selectedSort === opt.id && <span>✓</span>}
                    </button>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
