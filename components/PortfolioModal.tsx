
import React, { useState, useEffect, useCallback } from 'react';

interface PortfolioModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PortfolioModal: React.FC<PortfolioModalProps> = ({ isOpen, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imagePaths, setImagePaths] = useState<string[]>([]);
  const [isCheckingImages, setIsCheckingImages] = useState(true);
  const [isImageLoading, setIsImageLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      const checkImages = async () => {
        setIsCheckingImages(true);
        const availablePaths: string[] = [];
        // Verifica sequencialmente por até 20 imagens. Para ao não encontrar uma.
        for (let i = 1; i <= 20; i++) {
          const path = `/${i}.png`;
          try {
            const response = await fetch(path, { method: 'HEAD' });
            if (response.ok) {
              availablePaths.push(path);
            } else {
              break; // Para a verificação se uma imagem não for encontrada
            }
          } catch (error) {
            console.error('Erro ao verificar a imagem:', error);
            break;
          }
        }
        setImagePaths(availablePaths);
        setCurrentIndex(0);
        setIsCheckingImages(false);
      };
      
      checkImages();
    } else {
        // Reseta o estado ao fechar
        setImagePaths([]);
        setIsCheckingImages(true);
    }
  }, [isOpen]);

  const totalImages = imagePaths.length;

  const goToPrevious = useCallback(() => {
    if (totalImages === 0) return;
    setIsImageLoading(true);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalImages) % totalImages);
  }, [totalImages]);

  const goToNext = useCallback(() => {
    if (totalImages === 0) return;
    setIsImageLoading(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalImages);
  }, [totalImages]);
  
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
    if (isCheckingImages) {
      return (
        <div className="w-full aspect-square flex items-center justify-center text-white/50">
          Verificando portfólio...
        </div>
      );
    }

    if (totalImages === 0) {
      return (
        <div className="w-full aspect-square flex items-center justify-center text-white/50 text-center p-4">
          O portfólio está vazio no momento. Adicione imagens como `1.png`, `2.png` etc. na pasta `public`.
        </div>
      );
    }

    return (
      <>
        <div className="relative w-full aspect-square overflow-hidden rounded-lg bg-black">
          {isImageLoading && (
            <div className="absolute inset-0 flex items-center justify-center text-white/50">
              Carregando...
            </div>
          )}
          <img
            key={currentIndex}
            src={imagePaths[currentIndex]}
            alt={`Imagem do portfólio ${currentIndex + 1} de ${totalImages}`}
            className={`w-full h-full object-contain transition-opacity duration-300 ${isImageLoading ? 'opacity-0' : 'opacity-100'}`}
            onLoad={() => setIsImageLoading(false)}
            onError={() => setIsImageLoading(false)}
          />
          
          <button 
            onClick={goToPrevious} 
            className="absolute top-1/2 left-2 -translate-y-1/2 p-2 bg-black/40 rounded-full text-white hover:bg-black/70 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-400"
            aria-label="Imagem anterior"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>

          <button 
            onClick={goToNext} 
            className="absolute top-1/2 right-2 -translate-y-1/2 p-2 bg-black/40 rounded-full text-white hover:bg-black/70 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-400"
            aria-label="Próxima imagem"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>
        </div>

        <p className="mt-4 text-sm text-gray-400" aria-live="polite">
          {currentIndex + 1} / {totalImages}
        </p>
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
