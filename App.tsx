
import React, { useState } from 'react';
import StarryBackground from './components/StarryBackground';
import ProfileSection from './components/ProfileSection';
import Subtitle from './components/Subtitle';
import LinkButton from './components/LinkButton';
import Footer from './components/Footer';
import WhatsAppModal from './components/WhatsAppModal';
import InstagramModal from './components/InstagramModal';
import PortfolioModal from './components/PortfolioModal';
import { links } from './constants';

const App: React.FC = () => {
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
  const [isInstagramModalOpen, setIsInstagramModalOpen] = useState(false);
  const [isPortfolioModalOpen, setIsPortfolioModalOpen] = useState(false);

  const handleOpenWhatsAppModal = () => setIsWhatsAppModalOpen(true);
  const handleCloseWhatsAppModal = () => setIsWhatsAppModalOpen(false);
  
  const handleOpenInstagramModal = () => setIsInstagramModalOpen(true);
  const handleCloseInstagramModal = () => setIsInstagramModalOpen(false);

  const handleOpenPortfolioModal = () => setIsPortfolioModalOpen(true);
  const handleClosePortfolioModal = () => setIsPortfolioModalOpen(false);

  const getClickHandler = (text: string) => {
    switch (text) {
      case 'Instagram':
        return handleOpenInstagramModal;
      case 'Portfólio':
        return handleOpenPortfolioModal;
      default:
        return undefined;
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black flex items-center justify-center p-2 sm:p-4">
      <StarryBackground />
      
      <main className="relative z-10 w-full max-w-md mx-auto flex flex-col items-center text-center text-white p-4 sm:p-6 lg:p-8 rounded-2xl bg-black/40 backdrop-blur-md border border-purple-500/20 shadow-2xl shadow-purple-500/10">
        <div className="w-full bg-gradient-to-br from-purple-900/50 via-indigo-800/50 to-black/50 rounded-xl p-4 sm:p-6 shadow-lg animate-gradient-y">
            <ProfileSection />
            <Subtitle />
            <div className="w-full mt-8 space-y-4">
              {links.map((link) => (
                <LinkButton
                  key={link.id}
                  href={link.url}
                  onClick={getClickHandler(link.text)}
                  text={link.text}
                  Icon={link.Icon}
                  brandColor={link.brandColor}
                />
              ))}
            </div>
        </div>
        <Footer onCtaClick={handleOpenWhatsAppModal} />
      </main>

      <WhatsAppModal isOpen={isWhatsAppModalOpen} onClose={handleCloseWhatsAppModal} />
      <InstagramModal isOpen={isInstagramModalOpen} onClose={handleCloseInstagramModal} />
      <PortfolioModal isOpen={isPortfolioModalOpen} onClose={handleClosePortfolioModal} />
    </div>
  );
};

export default App;
