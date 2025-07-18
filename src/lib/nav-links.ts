export type NavLink = {
  href: string;
  label: string;
  subLinks?: NavLink[];
};

export const navLinks: NavLink[] = [
  { href: '/', label: 'Home' },
  {
    href: '/hot-tubs',
    label: 'Hot Tubs',
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
  {
    href: '/swim-spas',
    label: 'Swim Spas',
    subLinks: [
      { href: '/swim-spas/collection', label: 'Swim Spa Collection' },
    ],
  },
  {
    href: '/pools',
    label: 'Pool',
    subLinks: [
        { href: '/pools/endless-pools', label: 'Fastlane Pro / Endless Pool' }
    ],
  },
  { href: '/saunas', label: 'Saunas' },
  { href: '/game-room', label: 'Game Room' },
  { 
    href: '/grills',
    label: 'Grills',
    subLinks: [
        { href: '/grills/calflame', label: 'CalFlame Grills' }
    ]
  },
  { href: '/service-repair', label: 'Service/Repair' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact Us' },
];
