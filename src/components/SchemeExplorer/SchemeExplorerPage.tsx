import React, { useMemo, useState } from 'react';
import { schemesData } from '../../data/schemes';
import { translations } from '../../data/translations';
import { AdminLevel, Language, SchemeCategory, SortOption } from '../../types';
import { CategorySelector } from './CategorySelector';
import { ExplorerHeader } from './ExplorerHeader';
import { ExplorerHero } from './ExplorerHero';
import { FilterSortBar } from './FilterSortBar';
import { ResultsSummary } from './ResultsSummary';
import { SearchBar } from './SearchBar';
import { SchemeCard } from './SchemeCard';

export interface ExplorerFilters {
  searchQuery: string;
  selectedCategory: SchemeCategory;
  selectedLevel: AdminLevel;
  selectedSort: SortOption;
  showSavedOnly: boolean;
}

interface SchemeExplorerPageProps {
  currentLang: Language;
  savedSchemeIds: string[];
  filters?: ExplorerFilters;
  onUpdateFilters?: (filters: ExplorerFilters) => void;
  onToggleSaveScheme: (schemeId: string) => void;
  onBackToLanding: () => void;
  onSelectScheme: (schemeId: string) => void;
  onOpenLanguage: () => void;
}

export const SchemeExplorerPage: React.FC<SchemeExplorerPageProps> = ({
  currentLang,
  savedSchemeIds,
  filters,
  onUpdateFilters,
  onToggleSaveScheme,
  onBackToLanding,
  onSelectScheme,
  onOpenLanguage,
}) => {
  const [localSearchQuery, setLocalSearchQuery] = useState('');
  const [localSelectedCategory, setLocalSelectedCategory] = useState<SchemeCategory>('all');
  const [localSelectedLevel, setLocalSelectedLevel] = useState<AdminLevel>('all');
  const [localSelectedSort, setLocalSelectedSort] = useState<SortOption>('relevance');
  const [localShowSavedOnly, setLocalShowSavedOnly] = useState(false);

  const searchQuery = filters ? filters.searchQuery : localSearchQuery;
  const selectedCategory = filters ? filters.selectedCategory : localSelectedCategory;
  const selectedLevel = filters ? filters.selectedLevel : localSelectedLevel;
  const selectedSort = filters ? filters.selectedSort : localSelectedSort;
  const showSavedOnly = filters ? filters.showSavedOnly : localShowSavedOnly;

  const setSearchQuery = (val: string) => {
    if (filters && onUpdateFilters) {
      onUpdateFilters({ ...filters, searchQuery: val });
    } else {
      setLocalSearchQuery(val);
    }
  };

  const setSelectedCategory = (val: SchemeCategory) => {
    if (filters && onUpdateFilters) {
      onUpdateFilters({ ...filters, selectedCategory: val });
    } else {
      setLocalSelectedCategory(val);
    }
  };

  const setSelectedLevel = (val: AdminLevel) => {
    if (filters && onUpdateFilters) {
      onUpdateFilters({ ...filters, selectedLevel: val });
    } else {
      setLocalSelectedLevel(val);
    }
  };

  const setSelectedSort = (val: SortOption) => {
    if (filters && onUpdateFilters) {
      onUpdateFilters({ ...filters, selectedSort: val });
    } else {
      setLocalSelectedSort(val);
    }
  };

  const setShowSavedOnly = (val: boolean) => {
    if (filters && onUpdateFilters) {
      onUpdateFilters({ ...filters, showSavedOnly: val });
    } else {
      setLocalShowSavedOnly(val);
    }
  };

  const t = translations[currentLang];
  const isTamil = currentLang === 'ta';

  // Filtered and Sorted Schemes
  const filteredSchemes = useMemo(() => {
    let result = [...schemesData];

    // Filter by Saved
    if (showSavedOnly) {
      result = result.filter((s) => savedSchemeIds.includes(s.schemeId));
    }

    // Filter by Category
    if (selectedCategory !== 'all') {
      result = result.filter((s) => s.category === selectedCategory);
    }

    // Filter by Admin Level
    if (selectedLevel !== 'all') {
      result = result.filter((s) => s.governmentLevel === selectedLevel);
    }

    // Filter by Search Query
    const q = searchQuery.trim().toLowerCase();
    if (q) {
      result = result.filter((s) => {
        const name = s.schemeName.toLowerCase();
        const nameTa = s.schemeNameTa.toLowerCase();
        const official = s.officialName.toLowerCase();
        const officialTa = s.officialNameTa.toLowerCase();
        const summary = s.summary.toLowerCase();
        const summaryTa = s.summaryTa.toLowerCase();
        const category = s.category.toLowerCase();
        return (
          name.includes(q) ||
          nameTa.includes(q) ||
          official.includes(q) ||
          officialTa.includes(q) ||
          summary.includes(q) ||
          summaryTa.includes(q) ||
          category.includes(q)
        );
      });
    }

    // Sort Results
    if (selectedSort === 'alphabetical') {
      result.sort((a, b) => {
        const nameA = isTamil ? a.schemeNameTa : a.schemeName;
        const nameB = isTamil ? b.schemeNameTa : b.schemeName;
        return nameA.localeCompare(nameB, isTamil ? 'ta' : 'en');
      });
    } else if (selectedSort === 'recently_updated') {
      // Prioritize recently gazetted schemes
      result.sort((a, b) => b.lastUpdated.localeCompare(a.lastUpdated));
    }

    return result;
  }, [searchQuery, selectedCategory, selectedLevel, selectedSort, showSavedOnly, savedSchemeIds, isTamil]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedLevel('all');
    setSelectedSort('relevance');
    setShowSavedOnly(false);
  };

  return (
    <div className="relative w-full max-w-[430px] mx-auto min-h-screen bg-[#FBF7EF] flex flex-col justify-start overflow-x-hidden pt-[max(env(safe-area-inset-top),14px)] pb-[max(env(safe-area-inset-bottom),20px)]">
      {/* SECTION A: Header */}
      <ExplorerHeader
        currentLang={currentLang}
        onBack={onBackToLanding}
        onOpenLanguage={onOpenLanguage}
      />

      {/* SECTION B: Page Title and Introduction */}
      <ExplorerHero currentLang={currentLang} />

      {/* SECTION C: Search Field */}
      <SearchBar
        currentLang={currentLang}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* SECTION D: Scheme Category Selector */}
      <CategorySelector
        currentLang={currentLang}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* SECTION E: Filter and Sort Controls */}
      <FilterSortBar
        currentLang={currentLang}
        selectedLevel={selectedLevel}
        selectedCategory={selectedCategory}
        selectedSort={selectedSort}
        onSelectLevel={setSelectedLevel}
        onSelectCategory={setSelectedCategory}
        onSelectSort={setSelectedSort}
      />

      {/* SECTION F: Results Summary */}
      <ResultsSummary
        currentLang={currentLang}
        count={filteredSchemes.length}
        savedCount={savedSchemeIds.length}
        showSavedOnly={showSavedOnly}
        onToggleSavedOnly={() => setShowSavedOnly(!showSavedOnly)}
      />

      {/* SECTION G: Scheme Listing Cards */}
      <main className="w-full px-5 py-1 space-y-3 flex-1">
        {filteredSchemes.length === 0 ? (
          /* Empty State */
          <div className="w-full bg-white/90 border border-[#ECE5D8] rounded-[22px] p-8 text-center my-4">
            <div className="w-12 h-12 rounded-full bg-[#FFF3CF] text-[#98741D] flex items-center justify-center mx-auto mb-3 text-xl">
              🔍
            </div>
            <h3 className="text-[#1C2220] font-bold text-[15.5px] mb-1">
              {t.noSchemesMatch}
            </h3>
            <p className="text-[#555C58] text-[13px] mb-4">
              {isTamil
                ? 'வடிகட்டிகளை மாற்றி அல்லது புதிய தேடல் வார்த்தையைப் பயன்படுத்தி முயற்சிக்கவும்.'
                : 'Try adjusting your search terms, changing categories, or clearing active filters.'}
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="px-4 py-2 bg-[#165446] text-white text-[13px] font-bold rounded-xl active:scale-95 transition-all shadow-xs"
            >
              {t.clearFilters}
            </button>
          </div>
        ) : (
          /* Scheme Cards */
          filteredSchemes.map((scheme) => (
            <SchemeCard
              key={scheme.schemeId}
              scheme={scheme}
              currentLang={currentLang}
              isSaved={savedSchemeIds.includes(scheme.schemeId)}
              onToggleSave={(id, e) => {
                e.stopPropagation();
                onToggleSaveScheme(id);
              }}
              onClick={onSelectScheme}
            />
          ))
        )}
      </main>
    </div>
  );
};
