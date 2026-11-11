import React, { useState } from 'react';
import { Language } from '../types';
import { FeatureDetailModal } from './FeatureDetailModal';
import { FeatureGrid } from './FeatureGrid';
import { HeroSection } from './HeroSection';
import { PrimaryCTA } from './PrimaryCTA';
import { TamilLandscape } from './TamilLandscape';

interface LandingPageProps {
  currentLang: Language;
  onOpenLanguage?: () => void;
  onNavigateToExplorer: () => void;
  onNavigateToDashboard?: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  currentLang,
  onNavigateToExplorer,
}) => {
  const [selectedFeatureId, setSelectedFeatureId] = useState<string | null>(null);

  const handleSelectFeature = (id: string) => {
    if (id === 'discover') {
      onNavigateToExplorer();
    } else {
      setSelectedFeatureId(id);
    }
  };

  return (
    <div className="relative w-full max-w-[430px] mx-auto flex flex-col justify-start overflow-x-hidden pb-4">
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
    </div>
  );
};
