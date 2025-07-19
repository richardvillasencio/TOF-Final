// src/lib/content/header.ts

// Define a unique ID for each link for drag-and-drop stability
export type NavLink = {
  id: string;
  href: string;
  label: string;
  subLinks?: NavLink[];
};

export type HeaderContent = {
  phoneNumber: string;
  address: string;
  mascotImageUrl: string;
  topNavLinks: NavLink[];
  mainNavLinks: NavLink[];
}

export const headerContent: HeaderContent = {
  phoneNumber: '(701) 234-0705',
  address: '601 Main Ave W. West Fargo, ND 58708',
  mascotImageUrl: 'https://firebasestorage.googleapis.com/v0/b/tubclone.firebasestorage.app/o/tmpw_imh3fc.webp?alt=media&token=49a0cdfb-d711-4eea-a4b5-3713bc4da3be',
  topNavLinks: [
    { 
      id: 'top-1',
      href: '/contact', 
      label: 'Contact Us',
      subLinks: [
        { id: 'top-1-1', href: '/about', label: 'About Us' },
      ]
    },
    { 
      id: 'top-2',
      href: '/about', 
      label: 'Our Company',
      subLinks: [
        { id: 'top-2-1', href: '/service-repair', label: 'Service/Repair' },
      ]
    },
    { id: 'top-3', href: '/', label: 'Home' },
    { id: 'top-4', href: '/design-studio', label: 'Design Studio' },
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
          subLinks: [
            { id: 'main-1-1-1', href: '/hot-tubs/bullfrog-spas/m-series', label: 'M Series' },
          ],
        },
        {
          id: 'main-1-2',
          href: '/hot-tubs/qca-spas',
          label: 'QCA Spas',
          subLinks: [
            { id: 'main-1-2-1', href: '/hot-tubs/qca-spas/star', label: 'Star Series' },
            { id: 'main-1-2-2', href: '/hot-tubs/qca-spas/majestic', label: 'Majestic Series' },
            { id: 'main-1-2-3', href: '/hot-tubs/qca-spas/jewel', label: 'Jewel Series' },
          ],
        },
        { id: 'main-1-3', href: '/spa-upgrades', label: 'Spa Alteration/Upgrades' },
        {
          id: 'main-1-4',
          href: '/hot-tubs/models', label: 'All Models',
          subLinks: [
              { id: 'main-1-4-1', href: '/hot-tubs/models/ultra', label: 'Ultra' },
              { id: 'main-1-4-2', href: '/hot-tubs/models/aquarius', label: 'Aquarius' },
              { id: 'main-1-4-3', href: '/hot-tubs/models/pisces', label: 'Pisces' },
          ]
        }
      ],
    },
    { id: 'main-2', href: '/saunas', label: 'SAUNAS' },
    {
      id: 'main-3',
      href: '/pools',
      label: 'POOL',
      subLinks: [
          { id: 'main-3-1', href: '/pools/endless-pools', label: 'Fastlane Pro / Endless Pool' }
      ],
    },
    {
      id: 'main-4',
      href: '/swim-spas',
      label: 'SWIM SPAS',
      subLinks: [
        { id: 'main-4-1', href: '/swim-spas/collection', label: 'Swim Spa Collection' },
      ],
    },
    { id: 'main-5', href: '/game-room', label: 'GAME ROOM ESSENTIALS' },
    { 
      id: 'main-6',
      href: '/grills',
      label: 'GRILLS',
      subLinks: [
          { id: 'main-6-1', href: '/grills/calflame', label: 'CalFlame Grills' }
      ]
    },
  ],
};
