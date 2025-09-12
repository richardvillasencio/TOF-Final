// src/lib/content/header.ts

// Define a unique ID for each link for drag-and-drop stability
export type NavLink = {
  id: string;
  href: string;
  label: string;
  subLinks?: NavLink[];
};

export type HeaderContent = {
  logoImageUrl: string;
  phoneNumber: string;
  address: string;
  mascotImageUrl: string;
  veteranOwnedLogoUrl: string;
  topNavLinks: NavLink[];
  mainNavLinks: NavLink[];
}

export const headerContent: HeaderContent = {
  logoImageUrl: 'https://storage.googleapis.com/msgsndr/Q8i1yKqsccON1uqGARTN/media/67f93f9a71384b7dddafb553.png',
  phoneNumber: '(701) 234-0705',
  address: '601 Main Ave W, West Fargo, ND 58708',
  mascotImageUrl: 'https://firebasestorage.googleapis.com/v0/b/tubclone.firebasestorage.app/o/tmpw_imh3fc.webp?alt=media&token=49a0cdfb-d711-4eea-a4b5-3713bc4da3be',
  veteranOwnedLogoUrl: 'https://firebasestorage.googleapis.com/v0/b/tubclone.firebasestorage.app/o/veteran.svg?alt=media&token=814412af-0346-46ad-b5e5-317421da2a8a',
  topNavLinks: [
    { 
      id: 'top-1',
      href: '/contact', 
      label: 'Contact Us',
    },
    { 
      id: 'top-2',
      href: '/about', 
      label: 'Our Company',
    },
    { id: 'top-3', href: '/', label: 'Home' },
  ],
  mainNavLinks: [
    {
      id: 'main-1',
      href: '/hot-tubs',
      label: 'HOT TUBS',
      subLinks: [
        {
          id: 'main-1-1',
          href: '/hot-tubs/bullfrog-spas',
          label: 'Bullfrog Spas',
        }
      ],
    },
    { id: 'main-2', href: '/saunas', label: 'SAUNAS' },
    {
      id: 'main-3',
      href: '/pools',
      label: 'POOL',
      subLinks: [
        {
          id: 'main-3-1',
          href: '/pools',
          label: 'ABOVE GROUND POOLS',
        },
        {
          id: 'main-3-2',
          href: '/pools/endless-pools',
          label: 'SWIM MACHINES',
        }
      ],
    },
    {
      id: 'main-4',
      href: '/swim-spas',
      label: 'SWIM SPAS',
    },
    { id: 'main-5', href: '/game-room', label: 'GAME ROOM ESSENTIALS' },
    { 
      id: 'main-6',
      href: '/grills',
      label: 'GRILLS',
    },
  ],
};
