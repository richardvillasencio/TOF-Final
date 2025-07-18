export type NavLink = {
  href: string;
  label: string;
  subLinks?: NavLink[];
};

export const topNavLinks: NavLink[] = [
  { 
    href: '/contact', 
    label: 'Contact Us',
    subLinks: [
      { href: '/about', label: 'About Us' },
    ]
  },
  { 
    href: '/about', 
    label: 'Our Company',
    subLinks: [
      { href: '/service-repair', label: 'Service/Repair' },
    ]
  },
  { href: '/', label: 'Home' },
];

export const mainNavLinks: NavLink[] = [
  {
    href: '/hot-tubs',
    label: 'HOT TUBS',
    subLinks: [
      {
        href: '/hot-tubs/bullfrog-spas',
        label: 'Bullfrog Spas',
        subLinks: [
          { href: '/hot-tubs/bullfrog-spas/m-series', label: 'M Series' },
        ],
      },
      {
        href: '/hot-tubs/qca-spas',
        label: 'QCA Spas',
        subLinks: [
          { href: '/hot-tubs/qca-spas/star', label: 'Star Series' },
          { href: '/hot-tubs/qca-spas/majestic', label: 'Majestic Series' },
          { href: '/hot-tubs/qca-spas/jewel', label: 'Jewel Series' },
        ],
      },
      { href: '/spa-upgrades', label: 'Spa Alteration/Upgrades' },
      {
        href: '/hot-tubs/models', label: 'All Models',
        subLinks: [
            { href: '/hot-tubs/models/ultra', label: 'Ultra' },
            { href: '/hot-tubs/models/aquarius', label: 'Aquarius' },
            { href: '/hot-tubs/models/pisces', label: 'Pisces' },
        ]
      }
    ],
  },
  { href: '/saunas', label: 'SAUNAS' },
  {
    href: '/pools',
    label: 'POOL',
    subLinks: [
        { href: '/pools/endless-pools', label: 'Fastlane Pro / Endless Pool' }
    ],
  },
  {
    href: '/swim-spas',
    label: 'SWIM SPAS',
    subLinks: [
      { href: '/swim-spas/collection', label: 'Swim Spa Collection' },
    ],
  },
  { href: '/game-room', label: 'GAME ROOM ESSENTIALS' },
  { 
    href: '/grills',
    label: 'GRILLS',
    subLinks: [
        { href: '/grills/calflame', label: 'CalFlame Grills' }
    ]
  },
];
