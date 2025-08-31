import type { SocialLink, PortfolioItem } from './types';
import WebsiteIcon from './components/icons/WebsiteIcon';
import InstagramIcon from './components/icons/InstagramIcon';
import TikTokIcon from './components/icons/TikTokIcon';
import LinkedInIcon from './components/icons/LinkedInIcon';
import PortfolioIcon from './components/icons/PortfolioIcon';

export const instagramLinks: SocialLink[] = [
    {
        id: 1,
        url: 'https://www.instagram.com/inteligenciarte.ia',
        text: 'InteligenciArte.IA',
        Icon: InstagramIcon,
        brandColor: 'hover:shadow-[#E1306C]',
    },
    {
        id: 2,
        url: 'https://www.instagram.com/davicortelete',
        text: 'Davi Cortelete',
        Icon: InstagramIcon,
        brandColor: 'hover:shadow-[#E1306C]',
    },
];

export const links: SocialLink[] = [
  {
    id: 5,
    url: 'https://inteligenciarteia.vercel.app',
    text: 'InteligenciArte.IA',
    Icon: WebsiteIcon,
    brandColor: 'hover:shadow-[#00ffff]',
  },
  {
    id: 15,
    text: 'Portfólio',
    Icon: PortfolioIcon,
    brandColor: 'hover:shadow-[#a855f7]',
  },
  {
    id: 10,
    text: 'Instagram',
    Icon: InstagramIcon,
    brandColor: 'hover:shadow-[#E1306C]',
  },
  {
    id: 3,
    url: 'https://www.tiktok.com/@davicortelete',
    text: 'TikTok',
    Icon: TikTokIcon,
    brandColor: 'hover:shadow-[#00f2ea]',
  },
  {
    id: 4,
    url: 'https://www.linkedin.com/in/davicortelete',
    text: 'LinkedIn',
    Icon: LinkedInIcon,
    brandColor: 'hover:shadow-[#0A66C2]',
  },
];

export const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    url: 'https://tabacabeca.vercel.app/',
    title: 'Tabacabeça',
    imageSrc: '/1.png',
  },
  {
    id: 2,
    url: 'https://lkruppa.vercel.app/',
    title: 'Luiza Kruppa',
    imageSrc: '/2.png',
  },
  {
    id: 3,
    url: 'https://luxbio.vercel.app/',
    title: 'Luxury Joyci Almeida',
    imageSrc: '/3.png',
  },
  {
    id: 4,
    url: 'https://comandoauto.vercel.app/',
    title: 'Comando AutoService',
    imageSrc: '/4.png',
  },
  {
    id: 5,
    url: 'https://gustabio.vercel.app/',
    title: 'Gusta',
    imageSrc: '/5.png',
  },
  {
    id: 6,
    url: 'https://caramellabio.vercel.app/',
    title: 'Caramella Chocolates',
    imageSrc: '/6.png',
  },
  {
    id: 7,
    url: 'https://joybio.vercel.app/',
    title: 'Joyci Almeida',
    imageSrc: '/7.png',
  },
  {
    id: 8,
    url: 'https://nutrisyr.vercel.app/',
    title: 'Nutricionista Biedermann',
    imageSrc: '/8.png',
  },
];

export const quotes: string[] = [
    "O Senhor é o meu pastor; nada me faltará. (Salmos 23:1)",
    "Tudo posso naquele que me fortalece. (Filipenses 4:13)",
    "O coração do homem planeja o seu caminho, mas o Senhor lhe dirige os passos. (Provérbios 16:9)",
    "Deleita-te também no Senhor, e te concederá os desejos do teu coração. (Salmos 37:4)",
    "Porque para Deus nada é impossível. (Lucas 1:37)",
    "O temor do Senhor é o princípio da sabedoria. (Provérbios 9:10)",
    "Lâmpada para os meus pés é tua palavra, e luz para o meu caminho. (Salmos 119:105)",
    "Porque a seus anjos dará ordem a teu respeito, para te guardarem em todos os teus caminhos. (Salmos 91:11)",
    "O choro pode durar uma noite, mas a alegria vem pela manhã. (Salmos 30:5)",
    "Confia no Senhor de todo o teu coração, e não te estribes no teu próprio entendimento. (Provérbios 3:5)",
    "Os céus declaram a glória de Deus e o firmamento anuncia a obra das suas mãos. (Salmos 19:1)",
    "Ainda que eu andasse pelo vale da sombra da morte, não temeria mal algum, porque tu estás comigo. (Salmos 23:4)",
    "O Senhor é a minha luz e a minha salvação; a quem temerei? (Salmos 27:1)",
    "Ensina-nos a contar os nossos dias, de tal maneira que alcancemos corações sábios. (Salmos 90:12)",
    "A resposta branda desvia o furor, mas a palavra dura suscita a ira. (Provérbios 15:1)",
    "Em todo tempo ama o amigo e para a hora da angústia nasce o irmão. (Provérbios 17:17)",
    "Como o ferro com o ferro se afia, assim o homem afia o rosto do seu amigo. (Provérbios 27:17)",
    "Porque sou eu que conheço os planos que tenho para vocês, diz o Senhor. (Jeremias 29:11)",
    "O cavalo prepara-se para o dia da batalha, porém do Senhor vem a vitória. (Provérbios 21:31)",
    "Mil poderão cair ao teu lado, e dez mil à tua direita, mas tu não serás atingido. (Salmos 91:7)",
];
