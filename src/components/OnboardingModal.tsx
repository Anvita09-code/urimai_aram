import React, { useState } from 'react';
import { schemesData } from '../data/schemes';
import { translations } from '../data/translations';
import { Language, SchemeRecord } from '../types';

interface OnboardingModalProps {
  isOpen: boolean;
  currentLang: Language;
  onClose: () => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  currentLang,
  onClose,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeScheme, setActiveScheme] = useState<SchemeRecord | null>(null);

  if (!isOpen) return null;

  const t = translations[currentLang];

  const filteredSchemes = schemesData.filter((scheme) => {
    const matchesCategory = selectedCategory === 'all' || scheme.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    const name = currentLang === 'ta' ? scheme.schemeNameTa : scheme.schemeName;
    const official = currentLang === 'ta' ? scheme.officialNameTa : scheme.officialName;
    const benefit = currentLang === 'ta' ? scheme.benefitTa : scheme.benefitEn;
    const matchesQuery = !q || name.toLowerCase().includes(q) || official.toLowerCase().includes(q) || benefit.toLowerCase().includes(q);
    return matchesCategory && matchesQuery;
  });

  const categories = [
    { id: 'all', label: t.categoryAll },
    { id: 'women', label: t.categoryWomen },
    { id: 'farmers', label: t.categoryFarmers },
    { id: 'students', label: t.categoryStudents },
    { id: 'seniors', label: t.categorySeniors },
    { id: 'health', label: t.categoryHealth },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/45 backdrop-blur-xs transition-opacity animate-in fade-in duration-150">
      <div className="w-full max-w-lg max-h-[90vh] bg-[#FAF7F0] rounded-t-[28px] sm:rounded-[28px] flex flex-col shadow-2xl border border-[#E8E1D2] overflow-hidden animate-in slide-in-from-bottom duration-200">
        {/* Header */}
        <div className="p-4 sm:p-5 pb-3 border-b border-[#E8E1D2] bg-[#FAF7F0] shrink-0">
          <div className="w-10 h-1 bg-[#D3CABB] rounded-full mx-auto mb-3 sm:hidden" />
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-[19px] font-bold text-[#165446] tracking-tight">
                {t.onboardingTitle}
              </h2>
              <p className="text-[13px] text-[#555C58] mt-0.5">{t.onboardingSub}</p>
            </div>
            <button
              onClick={onClose}
              type="button"
              className="w-8 h-8 rounded-full bg-[#EFE9DC] text-[#4F5552] flex items-center justify-center hover:bg-[#E5DFCE] transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Search Input */}
          <div className="mt-3 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={currentLang === 'ta' ? 'திட்டம் அல்லது தேவையை தேடுக...' : 'Search scheme or requirement...'}
              className="w-full h-10 pl-9 pr-3 text-[13.5px] bg-white rounded-xl border border-[#ECE5D8] focus:outline-none focus:ring-2 focus:ring-[#165446]/30 text-[#20231F]"
            />
            <svg
              className="w-4 h-4 text-[#8C928F] absolute left-3 top-3 stroke-[2.2]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" strokeLinecap="round" />
            </svg>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 mt-3 overflow-x-auto no-scrollbar py-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 text-[12px] font-semibold rounded-full whitespace-nowrap transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-[#165446] text-white shadow-xs'
                    : 'bg-white text-[#5A605D] border border-[#ECE5D8] hover:bg-[#FFFDF7]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-3.5 flex-1">
          {activeScheme ? (
            /* Detailed Scheme View */
            <div className="space-y-4">
              <button
                onClick={() => setActiveScheme(null)}
                className="text-[13px] font-semibold text-[#165446] flex items-center gap-1 hover:underline"
              >
                ← {t.back}
              </button>

              <div className="bg-white rounded-2xl p-4 border border-[#ECE5D8] shadow-xs">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#98741D] bg-[#FFF3CF] px-2 py-0.5 rounded-md inline-block mb-2">
                  {activeScheme.category}
                </span>
                <h3 className="text-[18px] font-bold text-[#1C2220] leading-snug">
                  {currentLang === 'ta' ? activeScheme.schemeNameTa : activeScheme.schemeName}
                </h3>
                <h4 className="text-[13.5px] font-semibold text-[#444] mt-0.5">
                  {currentLang === 'ta' ? activeScheme.officialNameTa : activeScheme.officialName}
                </h4>
                <p className="text-[14px] font-semibold text-[#165446] mt-2 bg-[#F0F7F4] p-2.5 rounded-xl border border-[#D5EAE2]">
                  {currentLang === 'ta' ? activeScheme.benefitTa : activeScheme.benefitEn}
                </p>

                <div className="mt-4">
                  <h4 className="text-[13px] font-bold text-[#20231F] mb-1.5">{t.eligibilityTitle}</h4>
                  <ul className="space-y-1.5 text-[12.5px] text-[#555C58]">
                    {(currentLang === 'ta' ? activeScheme.eligibilityTa : activeScheme.eligibilityEn).map((item: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-[#165446] font-bold">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4">
                  <h4 className="text-[13px] font-bold text-[#20231F] mb-1.5">{t.documentsTitle}</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {(currentLang === 'ta' ? activeScheme.documentsTa : activeScheme.documentsEn).map((doc: string, idx: number) => (
                      <span key={idx} className="text-[12px] bg-[#FAF7F0] border border-[#E8E1D2] px-2.5 py-1 rounded-lg text-[#333835]">
                        📄 {doc}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-[#ECE5D8] flex items-center justify-between">
                  <span className="text-[11.5px] text-[#7A827E]">{activeScheme.officialSource}</span>
                  <a
                    href={activeScheme.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[12.5px] font-bold text-[#165446] hover:underline flex items-center gap-1"
                  >
                    {t.officialPortal} ↗
                  </a>
                </div>
              </div>
            </div>
          ) : (
            /* Scheme List */
            <>
              {filteredSchemes.length === 0 ? (
                <div className="text-center py-10 text-[#7A827E]">
                  <p className="text-[14px]">No schemes found matching your filter.</p>
                </div>
              ) : (
                filteredSchemes.map((scheme) => (
                  <div
                    key={scheme.schemeId}
                    onClick={() => setActiveScheme(scheme)}
                    className="bg-white hover:bg-[#FFFDF9] rounded-2xl p-4 border border-[#ECE5D8] shadow-xs cursor-pointer transition-all hover:border-[#165446]/40 group"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-[15.5px] font-bold text-[#1C2220] group-hover:text-[#165446] transition-colors">
                          {currentLang === 'ta' ? scheme.schemeNameTa : scheme.schemeName}
                        </h3>
                        <p className="text-[13px] text-[#165446] font-medium mt-1">
                          {currentLang === 'ta' ? scheme.benefitTa : scheme.benefitEn}
                        </p>
                      </div>
                      <span className="text-[12px] text-[#165446] font-bold shrink-0 ml-2">
                        {t.viewDetails} →
                      </span>
                    </div>
                  </div>
                ))
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
