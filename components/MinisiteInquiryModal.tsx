import React, { useState, useEffect, Fragment, useRef } from 'react';
import UserIcon from './icons/UserIcon';
import BuildingIcon from './icons/BuildingIcon';
import InstagramIcon from './icons/InstagramIcon';
import FacebookIcon from './icons/FacebookIcon';
import TikTokIcon from './icons/TikTokIcon';
import EmailIcon from './icons/EmailIcon';
import WebsiteIcon from './icons/WebsiteIcon';
import LinkIcon from './icons/LinkIcon';
import LogoIcon from './icons/LogoIcon';
import SloganIcon from './icons/SloganIcon';
import PaletteIcon from './icons/PaletteIcon';

// Interfaces for form data
interface PersonalData {
  name: string;
  age: string;
  publicPhone: boolean;
  instagram: string;
  facebook: string;
  tiktok: string;
  email: string;
  website: string;
  other: string;
  [key: string]: any; // Index signature
}

interface BusinessData {
  name: string;
  hasLogo: boolean;
  hasSlogan: boolean;
  slogan: string;
  hasPalette: boolean;
  palette: string;
  meetingTime: 'now' | 'later' | '';
  meetingDate: string;
  meetingHour: string;
  instagram: string;
  facebook: string;
  tiktok: string;
  email: string;
  website: string;
  other: string;
  [key: string]: any; // Index signature
}

interface MinisiteInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const socialOptions = [
  { id: 'instagram', label: 'Instagram', Icon: InstagramIcon, placeholder: 'seu_usuario' },
  { id: 'facebook', label: 'Facebook', Icon: FacebookIcon, placeholder: 'seu.usuario' },
  { id: 'tiktok', label: 'TikTok', Icon: TikTokIcon, placeholder: '@seu_usuario' },
  { id: 'email', label: 'Email', Icon: EmailIcon, placeholder: 'contato@email.com', type: 'email' },
  { id: 'website', label: 'Site', Icon: WebsiteIcon, placeholder: 'seusite.com.br' },
  { id: 'other', label: 'Outro Link', Icon: LinkIcon, placeholder: 'Link do seu canal, etc.' }
];

const visualIdentityOptions = [
    { id: 'hasLogo', label: 'Logotipo', Icon: LogoIcon },
    { id: 'hasSlogan', label: 'Slogan', Icon: SloganIcon },
    { id: 'hasPalette', label: 'Paleta de Cores', Icon: PaletteIcon },
];

// Helper Components (defined outside the main component to prevent re-creation on re-renders)
const FormInput = ({ label, id, value, onChange, placeholder, type = "text" }: { label: string; id: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; placeholder: string; type?: string; }) => (
    <div className="animate-[fadeIn_0.3s_ease-out]">
      <label htmlFor={id} className="block text-sm font-medium text-gray-400">{label}</label>
      <input
        type={type} id={id} name={id} value={value} onChange={onChange}
        placeholder={placeholder}
        className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400"
      />
    </div>
);

const FormCheckbox = ({ label, id, checked, onChange }: { label: string; id: string; checked: boolean; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; }) => (
    <div className="flex items-center">
    <input
        id={id} name={id} type="checkbox" checked={checked} onChange={onChange}
        className="h-4 w-4 rounded border-gray-600 bg-gray-800 text-purple-500 focus:ring-purple-600"
    />
    <label htmlFor={id} className="ml-2 block text-sm text-gray-300">{label}</label>
    </div>
);

const SocialLinkSelector = ({ onToggle, activeSet, data, onDataChange }: { onToggle: (id: string) => void, activeSet: Set<string>, data: any, onDataChange: (data: any) => void }) => (
    <Fragment>
    <h3 className="text-lg font-semibold text-purple-300 pt-4 border-t border-purple-500/20">Redes Sociais e Links</h3>
    <p className="text-sm text-gray-400 -mt-2 mb-4">Selecione as redes que deseja adicionar:</p>
    <div className="grid grid-cols-3 sm:grid-cols-3 gap-2">
        {socialOptions.map(({ id, label, Icon }) => (
        <button
            key={id}
            onClick={() => onToggle(id)}
            className={`group flex flex-col items-center justify-center p-2 rounded-lg border text-center transition-all duration-200 ${
            activeSet.has(id)
                ? 'bg-purple-900/60 border-purple-400 scale-105'
                : 'bg-gray-800/50 border-purple-500/30 hover:bg-purple-900/40'
            }`}
        >
            <Icon className={`w-5 h-5 mb-1 transition-transform ${activeSet.has(id) ? 'text-purple-300' : 'text-purple-400 group-hover:scale-110'}`} />
            <span className="text-xs font-medium text-white">{label}</span>
        </button>
        ))}
    </div>
    <div className="space-y-4 pt-4">
        {socialOptions.map(({ id, label, placeholder, type }) => 
        activeSet.has(id) && (
            <div key={id} id={`input-wrapper-${id}`}>
            <FormInput
                label={label} id={id} type={type || 'text'}
                value={data[id]}
                onChange={(e) => onDataChange({ ...data, [id]: e.target.value })}
                placeholder={placeholder}
            />
            </div>
        )
        )}
    </div>
    </Fragment>
);

const MinisiteInquiryModal: React.FC<MinisiteInquiryModalProps> = ({ isOpen, onClose }) => {
  // State for modal logic
  const [step, setStep] = useState<'selection' | 'personal' | 'business'>('selection');
  const [ageWarning, setAgeWarning] = useState<string | null>(null);
  const [activeInputs, setActiveInputs] = useState(new Set<string>());
  
  // State for form data
  const [personalData, setPersonalData] = useState<PersonalData>({
    name: '', age: '', publicPhone: false, instagram: '', facebook: '',
    tiktok: '', email: '', website: '', other: ''
  });

  const [businessData, setBusinessData] = useState<BusinessData>({
    name: '', hasLogo: false, hasSlogan: false, slogan: '', hasPalette: false, palette: '',
    meetingTime: '', meetingDate: '', meetingHour: '', instagram: '', facebook: '',
    tiktok: '', email: '', website: '', other: ''
  });

  // Refs for auto-scrolling logic
  const prevActiveInputsRef = useRef(activeInputs);
  const prevBusinessDataRef = useRef(businessData);

  // Reset state when modal is closed/opened
  useEffect(() => {
    if (isOpen) {
      setStep('selection');
      setAgeWarning(null);
      setActiveInputs(new Set());
      setPersonalData({
        name: '', age: '', publicPhone: false, instagram: '', facebook: '',
        tiktok: '', email: '', website: '', other: ''
      });
      setBusinessData({
        name: '', hasLogo: false, hasSlogan: false, slogan: '', hasPalette: false, palette: '',
        meetingTime: '', meetingDate: '', meetingHour: '', instagram: '', facebook: '',
        tiktok: '', email: '', website: '', other: ''
      });
    }
  }, [isOpen]);

  // Effect for auto-scrolling to new social media inputs
  useEffect(() => {
    const newlyAdded = [...activeInputs].filter(id => !prevActiveInputsRef.current.has(id));
    if (newlyAdded.length > 0) {
      const lastAddedId = newlyAdded[newlyAdded.length - 1];
      setTimeout(() => {
        const element = document.getElementById(`input-wrapper-${lastAddedId}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }, 100);
    }
    prevActiveInputsRef.current = activeInputs;
  }, [activeInputs]);

  // Effect for auto-scrolling to new visual identity inputs
  useEffect(() => {
    if (businessData.hasSlogan && !prevBusinessDataRef.current.hasSlogan) {
      setTimeout(() => {
        const element = document.getElementById('input-wrapper-slogan');
        element?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 100);
    }
    if (businessData.hasPalette && !prevBusinessDataRef.current.hasPalette) {
       setTimeout(() => {
        const element = document.getElementById('input-wrapper-palette');
        element?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 100);
    }
    prevBusinessDataRef.current = businessData;
  }, [businessData.hasSlogan, businessData.hasPalette]);


  const toggleInput = (inputId: string) => {
    setActiveInputs(prev => {
        const newSet = new Set(prev);
        if (newSet.has(inputId)) {
            newSet.delete(inputId);
            if (step === 'personal') {
                setPersonalData(d => ({ ...d, [inputId]: '' }));
            } else if (step === 'business') {
                setBusinessData(d => ({ ...d, [inputId]: '' }));
            }
        } else {
            newSet.add(inputId);
        }
        return newSet;
    });
  };

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const age = parseInt(e.target.value, 10);
    setPersonalData({ ...personalData, age: e.target.value });
    
    if (isNaN(age)) {
        setAgeWarning(null);
    } else if (age < 14) {
      setAgeWarning('Menores de 14 anos não podem prosseguir. Peça a um responsável para entrar em contato.');
    } else if (age >= 15 && age <= 18) {
      setAgeWarning('Lembre-se de que é importante ter a conscientização dos seus pais ou responsáveis.');
    } else {
      setAgeWarning(null);
    }
  };
  
  const isPersonalSubmitDisabled = () => {
      const ageNum = parseInt(personalData.age, 10);
      return !personalData.age || (ageNum < 14);
  }

  const handleSubmit = () => {
    let message = 'Olá! Gostaria de solicitar um Minisite.\n\n';
    const devNumber = '5541988710303';
    
    if (step === 'personal') {
        if (isPersonalSubmitDisabled()) return;

        message += '--- DADOS DO PEDIDO (PESSOAL) ---\n';
        message += personalData.name ? `Nome: ${personalData.name}\n` : '';
        message += `Idade: ${personalData.age}\n`;
        message += `Disponibilizar celular no link: ${personalData.publicPhone ? 'Sim' : 'Não'}\n`;
        
        const socialLinks = socialOptions.map(s => s.id).filter(id => personalData[id]).map(id => {
            const label = socialOptions.find(s => s.id === id)?.label || 'Link';
            const value = id === 'instagram' || id === 'tiktok' || id === 'facebook' ? `@${personalData[id]}` : personalData[id];
            return `${label}: ${value}`;
        }).join('\n');
        if (socialLinks) message += '\n--- REDES SOCIAIS E LINKS ---\n' + socialLinks;

    } else if (step === 'business') {
        message += '--- DADOS DO PEDIDO (EMPRESA) ---\n';
        message += businessData.name ? `Nome da Empresa/Responsável: ${businessData.name}\n` : '';
        message += `Possui logotipo? ${businessData.hasLogo ? 'Sim' : 'Não'}\n`;
        if (businessData.hasSlogan) message += `Slogan: ${businessData.slogan}\n`;
        if (businessData.hasPalette) message += `Paleta de Cores: ${businessData.palette}\n`;

        message += '\n--- AGENDAMENTO ---\n';
        if (businessData.meetingTime === 'now') {
            message += 'Melhor horário para reunião: Agora\n';
        } else if (businessData.meetingTime === 'later' && businessData.meetingDate && businessData.meetingHour) {
            message += `Melhor horário para reunião: ${businessData.meetingDate} às ${businessData.meetingHour}\n`;
        } else {
             message += 'Melhor horário para reunião: A combinar\n';
        }

        const socialLinks = socialOptions.map(s => s.id).filter(id => businessData[id]).map(id => {
            const label = socialOptions.find(s => s.id === id)?.label || 'Link';
             const value = id === 'instagram' || id === 'tiktok' || id === 'facebook' ? `@${businessData[id]}` : businessData[id];
            return `${label}: ${value}`;
        }).join('\n');
        if (socialLinks) message += '\n--- REDES SOCIAIS E CONTATO ---\n' + socialLinks;
    }

    const encodedMessage = encodeURIComponent(message.trim());
    const whatsappUrl = `https://wa.me/${devNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
    onClose();
  };
  
  const renderSelectionStep = () => (
    <Fragment>
      <h2 className="text-xl sm:text-2xl font-bold text-center text-purple-300">Para quem é o Minisite?</h2>
      <p className="mt-2 text-center text-gray-300 text-sm">Selecione o tipo de perfil que você deseja criar.</p>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button onClick={() => setStep('personal')} className="group flex flex-col items-center justify-center p-6 bg-gray-800/50 border border-purple-500/30 rounded-lg hover:bg-purple-900/40 transition-all duration-300 hover:scale-105">
          <UserIcon className="w-10 h-10 mb-3 text-purple-400 group-hover:scale-110 transition-transform" />
          <span className="font-semibold text-white">Uso Pessoal</span>
        </button>
        <button onClick={() => setStep('business')} className="group flex flex-col items-center justify-center p-6 bg-gray-800/50 border border-purple-500/30 rounded-lg hover:bg-purple-900/40 transition-all duration-300 hover:scale-105">
          <BuildingIcon className="w-10 h-10 mb-3 text-purple-400 group-hover:scale-110 transition-transform" />
          <span className="font-semibold text-white">Para Empresa</span>
        </button>
      </div>
    </Fragment>
  );

  const renderPersonalForm = () => (
    <Fragment>
       <h2 className="text-xl sm:text-2xl font-bold text-center text-purple-300">Minisite Pessoal</h2>
       <div className="mt-6 w-full space-y-4 max-h-[60vh] overflow-y-auto hide-scrollbar">
         <FormInput label="Seu Nome" id="name" value={personalData.name} onChange={(e) => setPersonalData({ ...personalData, name: e.target.value })} placeholder="Ex: João Silva" />
         <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-400">Sua Idade (Obrigatório)</label>
            <input
              type="number" id="age" name="age" value={personalData.age} onChange={handleAgeChange}
              placeholder="Ex: 25" required
              className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            {ageWarning && <p className={`mt-2 text-xs ${parseInt(personalData.age, 10) < 14 ? 'text-red-400' : 'text-yellow-400'}`}>{ageWarning}</p>}
         </div>
         <FormCheckbox label="Exibir meu celular publicamente" id="publicPhone" checked={personalData.publicPhone} onChange={(e) => setPersonalData({ ...personalData, publicPhone: e.target.checked })} />
         <SocialLinkSelector onToggle={toggleInput} activeSet={activeInputs} data={personalData} onDataChange={setPersonalData} />
       </div>
    </Fragment>
  );

  const renderBusinessForm = () => (
     <Fragment>
       <h2 className="text-xl sm:text-2xl font-bold text-center text-purple-300">Minisite para Empresa</h2>
       <div className="mt-6 w-full space-y-4 max-h-[60vh] overflow-y-auto hide-scrollbar">
         <FormInput label="Nome da Empresa / Responsável" id="name" value={businessData.name} onChange={(e) => setBusinessData({ ...businessData, name: e.target.value })} placeholder="Ex: Minha Empresa LTDA" />
         
         <div>
            <h3 className="text-lg font-semibold text-purple-300 pt-4 border-t border-purple-500/20">Identidade Visual</h3>
            <p className="text-sm text-gray-400 -mt-2 mb-4">Selecione os itens que você já possui:</p>
            <div className="grid grid-cols-3 sm:grid-cols-3 gap-2">
            {visualIdentityOptions.map(({ id, label, Icon }) => (
                <button
                key={id}
                onClick={() => setBusinessData(d => ({ ...d, [id]: !d[id] }))}
                className={`group flex flex-col items-center justify-center p-2 rounded-lg border text-center transition-all duration-200 ${
                    businessData[id]
                    ? 'bg-purple-900/60 border-purple-400 scale-105'
                    : 'bg-gray-800/50 border-purple-500/30 hover:bg-purple-900/40'
                }`}
                >
                <Icon className={`w-5 h-5 mb-1 transition-transform ${businessData[id] ? 'text-purple-300' : 'text-purple-400 group-hover:scale-110'}`} />
                <span className="text-xs font-medium text-white">{label}</span>
                </button>
            ))}
            </div>
            <div className="space-y-4 pt-4">
                {businessData.hasSlogan && (
                  <div id="input-wrapper-slogan">
                    <FormInput label="Qual é o slogan?" id="slogan" value={businessData.slogan} onChange={(e) => setBusinessData({ ...businessData, slogan: e.target.value })} placeholder="Ex: A melhor da cidade" />
                  </div>
                )}
                {businessData.hasPalette && (
                  <div id="input-wrapper-palette">
                    <FormInput label="Quais são as cores?" id="palette" value={businessData.palette} onChange={(e) => setBusinessData({ ...businessData, palette: e.target.value })} placeholder="Ex: #FFFFFF, Preto, Roxo" />
                  </div>
                )}
            </div>
         </div>
         
         <h3 className="text-lg font-semibold text-purple-300 pt-4 border-t border-purple-500/20">Reunião Online</h3>
         <p className="text-sm text-gray-400">Qual o melhor horário para conversarmos sobre o projeto?</p>
         <div className="flex gap-4">
            <button onClick={() => setBusinessData({...businessData, meetingTime: 'now'})} className={`flex-1 p-2 rounded-md text-sm transition-colors ${businessData.meetingTime === 'now' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300'}`}>Agora</button>
            <button onClick={() => setBusinessData({...businessData, meetingTime: 'later'})} className={`flex-1 p-2 rounded-md text-sm transition-colors ${businessData.meetingTime === 'later' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300'}`}>Mais Tarde</button>
         </div>
         {businessData.meetingTime === 'later' && (
           <div className="grid grid-cols-2 gap-4">
              <FormInput label="Data" id="meetingDate" type="date" value={businessData.meetingDate} onChange={(e) => setBusinessData({ ...businessData, meetingDate: e.target.value })} placeholder="" />
              <FormInput label="Hora" id="meetingHour" type="time" value={businessData.meetingHour} onChange={(e) => setBusinessData({ ...businessData, meetingHour: e.target.value })} placeholder="" />
           </div>
         )}
         
         <SocialLinkSelector onToggle={toggleInput} activeSet={activeInputs} data={businessData} onDataChange={setBusinessData} />
       </div>
    </Fragment>
  );

  return (
    <div
      className={`fixed inset-0 z-[60] flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg p-4 sm:p-6 bg-gray-900 border border-purple-500/30 rounded-2xl shadow-2xl shadow-purple-500/20 m-4 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {step === 'selection' && renderSelectionStep()}
        {step === 'personal' && renderPersonalForm()}
        {step === 'business' && renderBusinessForm()}
        
        {step !== 'selection' && (
           <div className="mt-6 flex flex-col sm:flex-row-reverse gap-3">
            <button
              onClick={handleSubmit}
              disabled={step === 'personal' && isPersonalSubmitDisabled()}
              className="w-full px-4 py-2 rounded-md font-bold text-black text-sm sm:text-base
                         bg-gradient-to-r from-purple-400 to-indigo-500
                         hover:scale-105 hover:-translate-y-0.5 transition-transform duration-300
                         disabled:bg-gray-500 disabled:hover:scale-100 disabled:hover:-translate-y-0 disabled:cursor-not-allowed"
            >
              Enviar Solicitação 🚀
            </button>
            <button
              onClick={() => {
                setStep('selection');
                setActiveInputs(new Set());
              }}
              className="w-full px-4 py-2 rounded-md font-semibold text-gray-300 bg-gray-700/50 hover:bg-gray-700 transition-colors text-sm sm:text-base"
            >
              Voltar
            </button>
          </div>
        )}

         <button 
            onClick={onClose} 
            className="absolute -top-3 -right-3 z-20 p-2 bg-gray-800 rounded-full text-white hover:bg-gray-700 transition-colors"
            aria-label="Fechar modal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>

      </div>
    </div>
  );
};

export default MinisiteInquiryModal;