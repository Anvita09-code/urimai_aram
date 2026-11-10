import React from 'react';

export const TamilLandscape: React.FC = () => {
  return (
    <div className="relative w-full overflow-hidden mt-1 select-none pointer-events-none">
      <img
        src="/assets/aistudio/landscape_illustration.png"
        alt="Tamil rural agricultural landscape"
        className="w-full h-auto object-cover object-top opacity-95"
        loading="eager"
      />
    </div>
  );
};
