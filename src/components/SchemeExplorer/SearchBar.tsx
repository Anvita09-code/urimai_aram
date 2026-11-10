import React from 'react';
import { translations } from '../../data/translations';
import { Language } from '../../types';

interface SearchBarProps {
  currentLang: Language;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  currentLang,
  searchQuery,
  onSearchChange,
}) => {
  const t = translations[currentLang];

  return (
    <div className="w-full px-5 pt-2 pb-1.5">
      <div className="relative w-full h-[46px] sm:h-[48px] bg-white rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.035)] border border-[#ECE5D8] flex items-center px-4 transition-all focus-within:ring-2 focus-within:ring-[#165446]/25 focus-within:border-[#165446]/40">
        {/* Search Icon */}
        <svg
          className="w-5 h-5 text-[#20231F] shrink-0 mr-3 stroke-[2.2]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <circle cx="11" cy="11" r="7" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" strokeLinecap="round" />
        </svg>

        {/* Input Field */}
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={t.searchPlaceholder}
          className={`w-full bg-transparent text-[#20231F] placeholder:text-[#7A807C] text-[13.5px] sm:text-[14px] font-medium focus:outline-none ${
            currentLang === 'ta' ? 'font-tamil text-[13px]' : ''
          }`}
        />

        {/* Clear Button */}
        {searchQuery.length > 0 && (
          <button
            type="button"
            onClick={() => onSearchChange('')}
            aria-label="Clear search"
            className="w-6 h-6 rounded-full bg-[#EFE9DC] text-[#4F5552] flex items-center justify-center hover:bg-[#E5DFCE] active:scale-95 transition-all text-xs shrink-0 ml-2"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
};
