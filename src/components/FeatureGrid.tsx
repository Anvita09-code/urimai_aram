import React from 'react';
import { translations } from '../data/translations';
import { Language } from '../types';
import { FeatureCard } from './FeatureCard';

interface FeatureGridProps {
  currentLang: Language;
  onSelectFeature: (featureId: string) => void;
}

export const FeatureGrid: React.FC<FeatureGridProps> = ({ currentLang, onSelectFeature }) => {
  const t = translations[currentLang];
  const isTamil = currentLang === 'ta';

  return (
    <section className="w-full px-5 pt-1 pb-3">
      <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5 items-stretch">
        {/* Card 1: Discover Schemes */}
        <FeatureCard
          title={t.card1Title}
          desc={t.card1Desc}
          iconType="search"
          isTamil={isTamil}
          onClick={() => onSelectFeature('discover')}
        />

        {/* Card 2: Check Readiness */}
        <FeatureCard
          title={t.card2Title}
          desc={t.card2Desc}
          iconType="checklist"
          isTamil={isTamil}
          onClick={() => onSelectFeature('readiness')}
        />

        {/* Card 3: Prepare & Apply */}
        <FeatureCard
          title={t.card3Title}
          desc={t.card3Desc}
          iconType="document"
          isTamil={isTamil}
          onClick={() => onSelectFeature('prepare')}
        />

        {/* Card 4: Reliable & Transparent */}
        <FeatureCard
          title={t.card4Title}
          desc={t.card4Desc}
          iconType="shield"
          isTamil={isTamil}
          onClick={() => onSelectFeature('transparency')}
        />
      </div>
    </section>
  );
};
