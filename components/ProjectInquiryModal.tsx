
import React, { useState } from 'react';

interface ProjectInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectTitle: string;
}

const ProjectInquiryModal: React.FC<ProjectInquiryModalProps> = ({ isOpen, onClose, projectTitle }) => {
  const [name, setName] = useState('');

  const handleSubmit = () => {
    if (name.trim() === '') {
      alert('Por favor, digite seu nome.');
      return;
    }

    const devNumber = '5541988710303';
    const message = `Olá, me chamo ${name} e quero um link na bio igual do ${projectTitle}!`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${devNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
    onClose();
    setName('');
  };
  
  if (!isOpen) return null;

  return (
      <div 
        className="fixed inset-0 z-[60] flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm"
        onClick={onClose}
      >
        <div 
          className="relative w-full max-w-sm p-4 sm:p-6 bg-gray-900 border border-purple-500/30 rounded-2xl shadow-2xl shadow-purple-500/20 m-4"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-lg sm:text-xl font-bold text-center text-purple-300">Interesse no Projeto</h2>
          <p className="mt-2 text-center text-gray-300 text-sm">
            Você gostou do projeto <span className="font-bold text-white">{projectTitle}</span>. Que legal!
          </p>
          <p className="mt-1 text-center text-gray-300 text-sm">
            Para personalizar sua mensagem, diga-nos seu nome.
          </p>
          
          <div className="mt-6">
            <label htmlFor="inquiry-name" className="block text-sm font-medium text-gray-400">Seu nome</label>
            <input
              type="text"
              id="inquiry-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Digite seu nome aqui"
              className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div className="mt-6 flex flex-col sm:flex-row-reverse gap-3">
            <button
              onClick={handleSubmit}
              className="w-full px-4 py-2 rounded-md font-bold text-black text-sm sm:text-base
                         bg-gradient-to-r from-purple-400 to-indigo-500
                         hover:scale-105 hover:-translate-y-0.5 transition-transform duration-300"
            >
              Enviar Mensagem 🚀
            </button>
            <button
              onClick={onClose}
              className="w-full px-4 py-2 rounded-md font-semibold text-gray-300 bg-gray-700/50 hover:bg-gray-700 transition-colors text-sm sm:text-base"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
  );
};

export default ProjectInquiryModal;
