
import React, { useState, useEffect } from 'react';
import { quotes } from '../constants';

const Subtitle: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [isFading, setIsFading] = useState(true);

  useEffect(() => {
    const quoteInterval = setInterval(() => {
      setIsFading(false); // Start fading out
    }, 5000);
    return () => clearInterval(quoteInterval);
  }, []);
  
  const handleTransitionEnd = () => {
    // When fade out transition finishes, change the quote and start fade in
    if (!isFading) {
      setIndex((prevIndex) => (prevIndex + 1) % quotes.length);
      setIsFading(true);
    }
  };

  return (
    <div className="mt-4 min-h-[2.5rem] sm:min-h-[3rem] flex items-center justify-center">
      <p 
        onTransitionEnd={handleTransitionEnd}
        className="text-xs sm:text-sm font-light text-indigo-200/80 italic transition-opacity duration-500 ease-in-out"
        style={{ opacity: isFading ? 1 : 0 }}
      >
        `"{quotes[index]}"`
      </p>
    </div>
  );
};

export default Subtitle;