import React from 'react';
import { AlertCircle, ArrowLeft, Home, Search } from 'lucide-react';
import { Language } from '../../types';

interface NotFoundPageProps {
  currentLang: Language;
  title?: string;
  message?: string;
  onNavigateHome: () => void;
  onNavigateSchemes?: () => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({
  currentLang,
  title,
  message,
  onNavigateHome,
  onNavigateSchemes,
}) => {
  const isTamil = currentLang === 'ta';

  return (
    <div className="w-full min-h-[70vh] flex flex-col items-center justify-center px-4 py-12 text-center select-none">
      <div className="w-16 h-16 rounded-full bg-[#FCE8A2]/60 text-[#155B4D] flex items-center justify-center mb-4 border border-[#FBEAC0]">
        <AlertCircle className="w-8 h-8 stroke-[2.2]" />
      </div>

      <h1
        className={`text-[#155B4D] font-bold text-[22px] sm:text-[26px] tracking-tight mb-2 ${
          isTamil ? 'font-tamil' : ''
        }`}
      >
        {title || (isTamil ? 'பக்கம் அல்லது விவரம் காணப்படவில்லை (404)' : 'Page or Scheme Not Found (404)')}
      </h1>

      <p
        className={`text-[#59635F] text-[14px] sm:text-[15px] max-w-md mb-6 leading-relaxed ${
          isTamil ? 'font-tamil' : ''
        }`}
      >
        {message ||
          (isTamil
            ? 'நீங்கள் தேடும் முகவரி அல்லது அடையாள எண் தவறானது. தயவுசெய்து முகப்புப் பக்கத்திற்குச் செல்லவும் அல்லது திட்டங்களைத் தேடவும்.'
            : 'The requested page or scheme ID does not exist or has been moved. Use the options below to return safely.')}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={onNavigateHome}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#155B4D] hover:bg-[#10483D] active:scale-95 text-white font-bold rounded-full transition-all cursor-pointer shadow-xs text-[13.5px]"
        >
          <Home className="w-4 h-4 stroke-[2]" />
          <span>{isTamil ? 'முகப்புக்குச் செல்' : 'Back to Home'}</span>
        </button>

        {onNavigateSchemes && (
          <button
            type="button"
            onClick={onNavigateSchemes}
            className="flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-[#FAF7EF] active:scale-95 text-[#155B4D] border border-[#CBD5D0] font-bold rounded-full transition-all cursor-pointer shadow-xs text-[13.5px]"
          >
            <Search className="w-4 h-4 stroke-[2]" />
            <span>{isTamil ? 'திட்டங்களை உலாவு' : 'Browse Schemes'}</span>
          </button>
        )}
      </div>
    </div>
  );
};

