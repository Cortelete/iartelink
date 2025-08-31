
import type React from 'react';

export interface SocialLink {
  id: number;
  url?: string;
  text: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  brandColor: string;
}
