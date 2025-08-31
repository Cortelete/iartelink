
import React, { useState, useEffect, useCallback } from 'react';
import { portfolioItems } from '../constants';

interface PortfolioModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInquiryClick: (title: string) => void;
}

const PortfolioModal: React.FC<PortfolioModalProps> = ({ isOpen, onClose, onInquiryClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isImageLoading, setIsImageLoading] = useState(true);

  // Reset index when modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(0);
      setIsImageLoading(true);
    }
  }, [isOpen]);

  const totalItems = portfolioItems.length;

  const goToPrevious = useCallback(() => {
    if (totalItems === 0) return;
    setIsImageLoading(true);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalItems) % totalItems);
  }, [totalItems]);

  const goToNext = useCallback(() => {
    if (totalItems === 0) return;
    setIsImageLoading(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalItems);
  }, [totalItems]);
  
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;
      if (event.key === 'ArrowLeft') {
        goToPrevious();
      } else if (event.key === 'ArrowRight') {
        goToNext();
      } else if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, goToPrevious, goToNext, onClose]);

  if (!isOpen) return null;

  const renderCarouselContent = () => {
    if (totalItems === 0) {
      return (
        <div className="w-full aspect-square flex items-center justify-center text-white/50 text-center p-4">
          Nenhum projeto no portfólio no momento.
        </div>
      );
    }

    const currentItem = portfolioItems[currentIndex];

    return (
      <>
        <div className="relative w-full aspect-square overflow-hidden rounded-lg bg-black group">
          {isImageLoading && (
            <div className="absolute inset-0 flex items-center justify-center text-white/50 z-10">
              Carregando...
            </div>
          )}
          <a
            href={currentItem.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Ver projeto ${currentItem.title}`}
            className="w-full h-full block"
          >
            <img
              key={currentIndex}
              src={currentItem.imageSrc}
              alt={currentItem.title}
              className={`w-full h-full object-contain transition-opacity duration-300 ${isImageLoading ? 'opacity-0' : 'opacity-100'}`}
              onLoad={() => setIsImageLoading(false)}
              onError={() => setIsImageLoading(false)}
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent transition-opacity opacity-0 group-hover:opacity-100 flex items-end">
                <h3 className="text-lg font-bold text-white drop-shadow-md">
                    {currentItem.title}
                </h3>
            </div>
          </a>
          
          <button 
            onClick={goToPrevious} 
            className="absolute top-1/2 left-2 -translate-y-1/2 p-2 bg-black/40 rounded-full text-white hover:bg-black/70 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-400 z-20"
            aria-label="Imagem anterior"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>

          <button 
            onClick={goToNext} 
            className="absolute top-1/2 right-2 -translate-y-1/2 p-2 bg-black/40 rounded-full text-white hover:bg-black/70 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-400 z-20"
            aria-label="Próxima imagem"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>
        </div>

        <div className="mt-4 w-full flex items-center justify-between gap-2" aria-live="polite">
          <p className="text-sm text-left text-gray-400 flex-grow truncate" title={currentItem.title}>
            {currentItem.title}
            <span className="text-gray-500 hidden sm:inline"> — {currentIndex + 1} / {totalItems}</span>
          </p>
          <button 
            onClick={() => onInquiryClick(currentItem.title)}
            className="flex-shrink-0 px-3 py-1.5 text-xs font-bold text-black rounded-full bg-gradient-to-r from-purple-400 to-indigo-500 hover:scale-105 transition-transform duration-200 shadow-md shadow-purple-500/20"
            aria-label={`Solicitar um site como o de ${currentItem.title}`}
          >
            Quero um desse
          </button>
        </div>
      </>
    );
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-md"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="portfolio-title"
    >
      <div 
        className="relative w-full max-w-lg p-4 bg-gray-900/80 border border-purple-500/30 rounded-2xl shadow-2xl shadow-purple-500/20 m-4 flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose} 
          className="absolute -top-3 -right-3 z-20 p-2 bg-gray-800 rounded-full text-white hover:bg-gray-700 transition-colors"
          aria-label="Fechar modal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>

        <h2 id="portfolio-title" className="text-xl font-bold text-center text-purple-300 mb-4">Nosso Portfólio</h2>
        
        {renderCarouselContent()}
      </div>
    </div>
  );
};

export default PortfolioModal;
