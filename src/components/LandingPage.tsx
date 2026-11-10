import React, { useState } from 'react';
import { Language } from '../types';
import { BrandHeader } from './BrandHeader';
import { FeatureDetailModal } from './FeatureDetailModal';
import { FeatureGrid } from './FeatureGrid';
import { HeroSection } from './HeroSection';
import { PrimaryCTA } from './PrimaryCTA';
import { TamilLandscape } from './TamilLandscape';
import { TrustFooter } from './TrustFooter';
import { TrustModal } from './TrustModal';

interface LandingPageProps {
  currentLang: Language;
  onOpenLanguage: () => void;
  onNavigateToExplorer: () => void;
  onNavigateToDashboard?: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  currentLang,
  onOpenLanguage,
  onNavigateToExplorer,
  onNavigateToDashboard,
}) => {
  const [selectedFeatureId, setSelectedFeatureId] = useState<string | null>(null);
  const [isTrustModalOpen, setIsTrustModalOpen] = useState(false);

  const handleSelectFeature = (id: string) => {
    if (id === 'discover') {
      onNavigateToExplorer();
    } else {
      setSelectedFeatureId(id);
    }
  };

  return (
    <div className="relative w-full max-w-[430px] mx-auto min-h-screen bg-[#FBF7EF] flex flex-col justify-between overflow-x-hidden pt-[max(env(safe-area-inset-top),14px)] pb-[max(env(safe-area-inset-bottom),18px)]">
      {/* Top Brand Header */}
      <div className="w-full flex-none">
        <BrandHeader
          currentLang={currentLang}
          onOpenLanguage={onOpenLanguage}
          onNavigateToDashboard={onNavigateToDashboard}
        />
      </div>

      {/* Main Content */}
      <main className="w-full flex-1 flex flex-col justify-start">
        {/* Section C: Hero Section */}
        <HeroSection currentLang={currentLang} />

        {/* Section D: Primary Call to Action -> Navigates to Scheme Explorer */}
        <PrimaryCTA
          currentLang={currentLang}
          onGetStarted={onNavigateToExplorer}
        />

        {/* Section E: Four Feature Cards */}
        <FeatureGrid
          currentLang={currentLang}
          onSelectFeature={handleSelectFeature}
        />

        {/* Section F: Tamil Landscape Decorative Illustration */}
        <TamilLandscape />

        {/* Section G: Trust and Privacy Footer */}
        <TrustFooter
          currentLang={currentLang}
          onOpenTrustModal={() => setIsTrustModalOpen(true)}
        />
      </main>

      {/* Feature Detail Modal for other 3 cards */}
      <FeatureDetailModal
        featureId={selectedFeatureId}
        currentLang={currentLang}
        onClose={() => setSelectedFeatureId(null)}
        onOpenDiscovery={() => {
          setSelectedFeatureId(null);
          onNavigateToExplorer();
        }}
      />

      {/* Trust & Privacy Charter Modal */}
      <TrustModal
        isOpen={isTrustModalOpen}
        currentLang={currentLang}
        onClose={() => setIsTrustModalOpen(false)}
      />
    </div>
  );
};
