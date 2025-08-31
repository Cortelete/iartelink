import type React from 'react';

export interface SocialLink {
  id: number;
  url?: string;
  text: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  brandColor: string;
}

export interface PortfolioItem {
  id: number;
  url: string;
  title: string;
  imageSrc: string;
}
