import React, { useState } from 'react';

const ProfileSection: React.FC = () => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleLogoClick = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
    }, 5000); // Duration matches the CSS animation
  };

  return (
    <div className="flex flex-col items-center">
      <img
        src="/logo.png"
        alt="Logo InteligenciArte.IA"
        className={`w-20 h-20 sm:w-28 sm:h-28 object-contain mb-5 transition-transform duration-300 cursor-pointer ${
          isAnimating ? 'animate-logo-sequence' : 'hover:scale-110'
        }`}
        onClick={handleLogoClick}
        aria-label="Clique para animar o logo"
      />
      <h1 className="text-base sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-purple-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent animate-gradient-x">
        @InteligenciArte.IA
      </h1>
    </div>
  );
};

export default ProfileSection;
