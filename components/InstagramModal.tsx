
import React from 'react';
import { instagramLinks } from '../constants';
import LinkButton from './LinkButton';

interface InstagramModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const InstagramModal: React.FC<InstagramModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-sm p-4 sm:p-6 bg-gray-900 border border-purple-500/30 rounded-2xl shadow-2xl shadow-purple-500/20 m-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg sm:text-xl font-bold text-center text-purple-300">Nossos Perfis no Instagram</h2>
        <p className="mt-2 text-center text-gray-300 text-sm">Escolha qual perfil você gostaria de visitar.</p>
        
        <div className="mt-6 space-y-4">
          {instagramLinks.map((link) => (
            <LinkButton
              key={link.id}
              href={link.url}
              text={link.text}
              Icon={link.Icon}
              brandColor={link.brandColor}
            />
          ))}
        </div>

        <div className="mt-6">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 rounded-md font-semibold text-gray-300 bg-gray-700/50 hover:bg-gray-600/80 transition-colors text-sm sm:text-base"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstagramModal;