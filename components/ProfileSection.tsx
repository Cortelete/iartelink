
import React from 'react';

const ProfileSection: React.FC = () => {
  return (
    <div className="flex flex-col items-center">
      <img
        src="/logo.png" // Ensure `logo.png` is in the `public` directory
        alt="Logo InteligenciArte.IA"
        className="w-20 h-20 sm:w-28 sm:h-28 object-contain shadow-lg shadow-purple-500/20 mb-5"
      />
      <h1 className="text-base sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-purple-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent animate-gradient-x">
        @InteligenciArte.IA
      </h1>
    </div>
  );
};

export default ProfileSection;