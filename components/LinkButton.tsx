
import React from 'react';

interface LinkButtonProps {
  href?: string;
  onClick?: () => void;
  text: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  brandColor: string;
}

const LinkButton: React.FC<LinkButtonProps> = ({ href, onClick, text, Icon, brandColor }) => {
  const commonClasses = `group relative flex items-center justify-center w-full p-2.5 sm:p-4 rounded-lg bg-white/10 border border-white/20 backdrop-blur-sm
                 text-white font-semibold text-xs sm:text-base
                 transition-all duration-300 ease-in-out
                 hover:bg-white/20 hover:scale-105 hover:-translate-y-1 hover:shadow-lg ${brandColor}
                 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-75`;
  
  const content = (
    <>
      <Icon className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-5 h-5 sm:w-6 sm:h-6 text-purple-300 transition-transform duration-300 group-hover:scale-110" />
      <span className="text-center">{text}</span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={commonClasses}
      >
        {content}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={commonClasses}>
      {content}
    </button>
  );
};

export default LinkButton;