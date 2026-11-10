import React from 'react';

interface MemberAvatarProps {
  avatarType?: 'male_head' | 'female_spouse' | 'boy_son' | 'girl_daughter' | 'generic';
  gender?: 'Male' | 'Female' | 'Other';
  age?: number;
  className?: string;
  name?: string;
}

export const MemberAvatar: React.FC<MemberAvatarProps> = ({
  avatarType,
  gender = 'Male',
  age = 30,
  className = 'w-13 h-13 sm:w-14 sm:h-14',
  name = '',
}) => {
  // Determine effective avatar type if generic
  let effectiveType = avatarType;
  if (!effectiveType || effectiveType === 'generic') {
    if (gender === 'Female') {
      effectiveType = age < 18 ? 'girl_daughter' : 'female_spouse';
    } else {
      effectiveType = age < 18 ? 'boy_son' : 'male_head';
    }
  }

  return (
    <div
      className={`relative rounded-full overflow-hidden shrink-0 select-none bg-[#F5EEE2] flex items-center justify-center ${className}`}
      aria-label={name}
    >
      {effectiveType === 'male_head' && (
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background circle */}
          <circle cx="50" cy="50" r="50" fill="#F5EEE2" />

          {/* Green Shirt */}
          <path
            d="M20 98 C20 78, 32 72, 50 72 C68 72, 80 78, 80 98 Z"
            fill="#459A70"
          />
          {/* Shirt collar / neckline */}
          <path
            d="M42 72 C45 78, 55 78, 58 72 Z"
            fill="#347856"
          />
          <path
            d="M44 64 L50 75 L56 64 Z"
            fill="#D59B73"
          />

          {/* Neck */}
          <rect x="44" y="55" width="12" height="15" fill="#D59B73" rx="2" />

          {/* Ears */}
          <ellipse cx="32" cy="48" rx="4.5" ry="6" fill="#D59B73" />
          <ellipse cx="68" cy="48" rx="4.5" ry="6" fill="#D59B73" />

          {/* Face Base */}
          <ellipse cx="50" cy="48" rx="18" ry="21" fill="#E2A880" />

          {/* Hair back & side */}
          <path
            d="M32 44 C31 30, 40 22, 50 22 C60 22, 69 30, 68 44 C68 32, 62 26, 50 26 C38 26, 32 32, 32 44 Z"
            fill="#1E2320"
          />
          {/* Hair top styling */}
          <path
            d="M31 38 C33 26, 42 21, 50 21 C58 21, 67 25, 69 36 C64 30, 56 28, 50 28 C41 28, 35 32, 31 38 Z"
            fill="#1E2320"
          />

          {/* Eyebrows */}
          <path d="M37 40 Q42 38 46 41" stroke="#1E2320" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M54 41 Q58 38 63 40" stroke="#1E2320" strokeWidth="2.2" strokeLinecap="round" />

          {/* Eyes */}
          <circle cx="41.5" cy="46" r="2.2" fill="#1E2320" />
          <circle cx="58.5" cy="46" r="2.2" fill="#1E2320" />
          <circle cx="42.2" cy="45.3" r="0.7" fill="#FFFFFF" />
          <circle cx="59.2" cy="45.3" r="0.7" fill="#FFFFFF" />

          {/* Nose */}
          <path d="M50 45 L48.5 52 L51.5 52" stroke="#BF825C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />

          {/* Distinctive Moustache */}
          <path
            d="M40 57 C44 55, 48 57, 50 58 C52 57, 56 55, 60 57 C58 60, 52 61, 50 59.5 C48 61, 42 60, 40 57 Z"
            fill="#1E2320"
          />

          {/* Gentle Smile below moustache */}
          <path d="M46 62 Q50 64 54 62" stroke="#A76846" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      )}

      {effectiveType === 'female_spouse' && (
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background circle */}
          <circle cx="50" cy="50" r="50" fill="#F5EEE2" />

          {/* Long Black Hair behind shoulders */}
          <path
            d="M26 48 C24 64, 25 80, 28 95 C33 95, 67 95, 72 95 C75 80, 76 64, 74 48 Z"
            fill="#1E2320"
          />

          {/* Green Saree blouse & Yellow Drape */}
          <path
            d="M20 98 C20 78, 32 72, 50 72 C68 72, 80 78, 80 98 Z"
            fill="#459A70"
          />
          {/* Golden Yellow Pallu diagonal drape */}
          <path
            d="M28 98 L52 72 L62 72 L42 98 Z"
            fill="#EAA824"
          />

          {/* Neck */}
          <rect x="44" y="55" width="12" height="15" fill="#D59B73" rx="2" />

          {/* Subtle gold necklace */}
          <path d="M43 67 Q50 72 57 67" stroke="#EAA824" strokeWidth="2" strokeLinecap="round" />

          {/* Gold Stud Earrings */}
          <circle cx="31" cy="51" r="2.8" fill="#EAA824" />
          <circle cx="69" cy="51" r="2.8" fill="#EAA824" />

          {/* Face Base */}
          <ellipse cx="50" cy="49" rx="17.5" ry="20" fill="#E2A880" />

          {/* Hair parted in middle */}
          <path
            d="M32 46 C32 30, 40 22, 50 22 C60 22, 68 30, 68 46 C67 36, 59 31, 50 34 C41 31, 33 36, 32 46 Z"
            fill="#1E2320"
          />

          {/* Red Bindi / Pottu */}
          <circle cx="50" cy="41" r="2.2" fill="#BA2222" />

          {/* Eyebrows */}
          <path d="M38 41 Q42 39 46 42" stroke="#1E2320" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M54 42 Q58 39 62 41" stroke="#1E2320" strokeWidth="1.8" strokeLinecap="round" />

          {/* Eyes with warm expression */}
          <circle cx="42" cy="47" r="2.2" fill="#1E2320" />
          <circle cx="58" cy="47" r="2.2" fill="#1E2320" />
          <circle cx="42.6" cy="46.3" r="0.7" fill="#FFFFFF" />
          <circle cx="58.6" cy="46.3" r="0.7" fill="#FFFFFF" />

          {/* Nose */}
          <path d="M50 46 L49 53 L51.5 53" stroke="#BF825C" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />

          {/* Warm Reddish Smile */}
          <path d="M45 58 Q50 63 55 58" stroke="#B83A3A" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      )}

      {effectiveType === 'boy_son' && (
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background circle */}
          <circle cx="50" cy="50" r="50" fill="#F5EEE2" />

          {/* Green Shirt */}
          <path
            d="M22 98 C22 79, 33 74, 50 74 C67 74, 78 79, 78 98 Z"
            fill="#459A70"
          />
          {/* Crew neckline */}
          <path d="M42 74 C44 79, 56 79, 58 74 Z" fill="#347856" />

          {/* Neck */}
          <rect x="45" y="57" width="10" height="15" fill="#D59B73" rx="2" />

          {/* Ears */}
          <ellipse cx="32" cy="49" rx="4" ry="5.5" fill="#D59B73" />
          <ellipse cx="68" cy="49" rx="4" ry="5.5" fill="#D59B73" />

          {/* Youthful Round Face Base */}
          <ellipse cx="50" cy="49" rx="17" ry="19" fill="#E2A880" />

          {/* Short Youthful Haircut */}
          <path
            d="M32 42 C32 28, 41 22, 50 22 C59 22, 68 28, 68 42 C67 32, 60 27, 50 27 C40 27, 33 32, 32 42 Z"
            fill="#1E2320"
          />
          {/* Hair bangs */}
          <path
            d="M32 38 C37 28, 46 25, 52 26 C58 27, 65 31, 68 38 C64 34, 57 32, 50 32 C43 32, 36 34, 32 38 Z"
            fill="#1E2320"
          />

          {/* Eyebrows */}
          <path d="M38 42 Q42 40 46 42" stroke="#1E2320" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M54 42 Q58 40 62 42" stroke="#1E2320" strokeWidth="1.8" strokeLinecap="round" />

          {/* Cheerful Eyes */}
          <circle cx="42" cy="47" r="2.2" fill="#1E2320" />
          <circle cx="58" cy="47" r="2.2" fill="#1E2320" />
          <circle cx="42.6" cy="46.3" r="0.8" fill="#FFFFFF" />
          <circle cx="58.6" cy="46.3" r="0.8" fill="#FFFFFF" />

          {/* Small Nose */}
          <path d="M50 48 L49 53 L51 53" stroke="#BF825C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />

          {/* Youthful Broad Smile */}
          <path d="M44 58 Q50 64 56 58" stroke="#A76846" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )}

      {effectiveType === 'girl_daughter' && (
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background circle */}
          <circle cx="50" cy="50" r="50" fill="#F5EEE2" />

          {/* Left Ponytail with red band */}
          <ellipse cx="26" cy="48" rx="7" ry="12" fill="#1E2320" transform="rotate(-15 26 48)" />
          <ellipse cx="29" cy="44" rx="3.5" ry="2" fill="#D94343" transform="rotate(-15 29 44)" />

          {/* Right Ponytail with red band */}
          <ellipse cx="74" cy="48" rx="7" ry="12" fill="#1E2320" transform="rotate(15 74 48)" />
          <ellipse cx="71" cy="44" rx="3.5" ry="2" fill="#D94343" transform="rotate(15 71 44)" />

          {/* Yellow Top */}
          <path
            d="M22 98 C22 79, 33 74, 50 74 C67 74, 78 79, 78 98 Z"
            fill="#EAA824"
          />
          {/* Top neckline */}
          <path d="M42 74 C45 78, 55 78, 58 74 Z" fill="#D49117" />

          {/* Small Neck */}
          <rect x="45" y="58" width="10" height="15" fill="#D59B73" rx="2" />

          {/* Cute Little Ears */}
          <ellipse cx="33" cy="49" rx="3.8" ry="5" fill="#D59B73" />
          <ellipse cx="67" cy="49" rx="3.8" ry="5" fill="#D59B73" />

          {/* Sweet Round Face */}
          <ellipse cx="50" cy="49" rx="16.5" ry="18" fill="#E2A880" />

          {/* Hair bangs across forehead */}
          <path
            d="M33 42 C33 28, 41 22, 50 22 C59 22, 67 28, 67 42 C64 35, 58 32, 50 33 C42 32, 36 35, 33 42 Z"
            fill="#1E2320"
          />

          {/* Eyebrows */}
          <path d="M39 42 Q42 40 45 42" stroke="#1E2320" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M55 42 Q58 40 61 42" stroke="#1E2320" strokeWidth="1.6" strokeLinecap="round" />

          {/* Big Innocent Dark Eyes */}
          <circle cx="42" cy="47" r="2.4" fill="#1E2320" />
          <circle cx="58" cy="47" r="2.4" fill="#1E2320" />
          <circle cx="42.8" cy="46.2" r="0.9" fill="#FFFFFF" />
          <circle cx="58.8" cy="46.2" r="0.9" fill="#FFFFFF" />

          {/* Rosy Cheeks */}
          <circle cx="37" cy="52" r="3" fill="#EFA596" opacity="0.6" />
          <circle cx="63" cy="52" r="3" fill="#EFA596" opacity="0.6" />

          {/* Little Button Nose */}
          <circle cx="50" cy="51" r="1.3" fill="#BF825C" />

          {/* Happy Smile */}
          <path d="M45 57 Q50 62 55 57" stroke="#A76846" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      )}
    </div>
  );
};
