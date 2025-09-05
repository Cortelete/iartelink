import React from 'react';

interface FooterProps {
  onCtaClick: () => void;
}

const Footer: React.FC<FooterProps> = ({ onCtaClick }) => {
  return (
    <footer className="w-full mt-8 pt-6 border-t border-purple-500/20 text-center">
      <button
        onClick={onCtaClick}
        className="w-full mb-4 px-4 py-2 sm:px-6 sm:py-3 rounded-lg font-bold text-black text-xs sm:text-sm
                   bg-gradient-to-r from-purple-400 via-indigo-500 to-purple-500
                   animate-gradient-x transition-all duration-300 hover:scale-105 hover:-translate-y-1 shadow-lg shadow-purple-500/20"
      >
        Quer um site incrível como esse?
      </button>
      <p className="text-xs sm:text-sm text-purple-200/70">
        Desenvolvido por{' '}
        <a
          href="https://www.instagram.com/inteligenciarte.ia"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold hover:text-purple-300 transition-colors"
        >
          InteligenciArte.IA ✨
        </a>
      </p>
    </footer>
  );
};

export default Footer;
