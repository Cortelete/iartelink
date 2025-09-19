
import React, { useState, useEffect, useCallback, Fragment } from 'react';
import { portfolioItems } from '../constants';

interface PortfolioModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInquiryClick: () => void;
}

const PortfolioModal: React.FC<PortfolioModalProps> = ({ isOpen, onClose, onInquiryClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);

  // Reset index when modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(0);
      setIsImageLoading(true);
      setIsFullScreen(false); // Ensure fullscreen is closed when modal reopens
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
  
  const openFullScreen = () => {
    if (totalItems > 0) {
      setIsFullScreen(true);
    }
  }

  const closeFullScreen = () => {
    setIsFullScreen(false);
  }
  
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;

      if (isFullScreen) {
        if (event.key === 'Escape') {
          closeFullScreen();
        }
        return;
      }
      
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
  }, [isOpen, isFullScreen, goToPrevious, goToNext, onClose]);

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
          
          <img
            key={currentIndex}
            src={currentItem.imageSrc}
            alt={currentItem.title}
            className={`w-full h-full object-contain transition-opacity duration-300 cursor-pointer ${isImageLoading ? 'opacity-0' : 'opacity-100'}`}
            onLoad={() => setIsImageLoading(false)}
            onError={() => setIsImageLoading(false)}
            onClick={openFullScreen}
          />
          
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

        <div className="mt-4 w-full flex items-center justify-between gap-4" aria-live="polite">
          <a
            href={currentItem.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-sm font-semibold text-left text-purple-300 flex-grow truncate hover:underline"
            title={`Abrir o site ${currentItem.title}`}
          >
            {currentItem.title}
          </a>
           <p className="text-xs text-gray-500 flex-shrink-0">
            {currentIndex + 1} / {totalItems}
          </p>
          <button 
            onClick={onInquiryClick}
            className="flex-shrink-0 px-3 py-1.5 text-xs font-bold text-black rounded-full bg-gradient-to-r from-purple-400 to-indigo-500 hover:scale-105 transition-transform duration-200 shadow-md shadow-purple-500/20"
            aria-label="Solicitar um Minisite"
          >
            Quero um desse
          </button>
        </div>
      </>
    );
  };

  return (
    <Fragment>
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

      {isFullScreen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={closeFullScreen}
          role="dialog"
          aria-modal="true"
          aria-label="Visualização em tela cheia"
        >
           <button 
            onClick={closeFullScreen}
            className="absolute top-4 right-4 z-20 p-2 bg-gray-800/80 rounded-full text-white hover:bg-gray-700/80 transition-colors"
            aria-label="Voltar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
          
          <img
            src={portfolioItems[currentIndex].imageSrc}
            alt={portfolioItems[currentIndex].title}
            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl shadow-purple-500/20"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </Fragment>
  );
};

export default PortfolioModal;