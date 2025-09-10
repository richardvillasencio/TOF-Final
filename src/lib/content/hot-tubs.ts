import type { HeroSectionProps } from '@/components/page-sections/hero-section';
import type { FeaturedBrandsSectionProps } from '@/components/page-sections/featured-brands-section';
import type { ProductCollectionSectionProps } from '@/components/page-sections/product-collection-section';
import type { CtaSectionProps } from '@/components/page-sections/cta-section';

export type PageSection = 
  | { component: 'HeroSection'; props: Omit<HeroSectionProps, 'id'>; id: string }
  | { component: 'FeaturedBrandsSection'; props: Omit<FeaturedBrandsSectionProps, 'id'>; id: string }
  | { component: 'ProductCollectionSection'; props: Omit<ProductCollectionSectionProps, 'id'>; id: string }
  | { component: 'CtaSection'; props: Omit<CtaSectionProps, 'id'>; id: string };

export const hotTubsContent: PageSection[] = [
    {
        id: 'hero',
        component: 'HeroSection',
        props: {
            backgroundImage: "https://placehold.co/1920x600.png",
            backgroundHint: "hot tub sunset",
            title: 'Discover Your Perfect Hot Tub',
            subtitle: 'Melt away stress, soothe muscles, and reconnect with loved ones in your own backyard oasis.',
            buttons: {
                primary: { href: '#collection', text: 'View Collection' },
                secondary: { href: '/contact', text: 'Request Info' },
            }
        }
    },
    {
        id: 'brands',
        component: 'FeaturedBrandsSection',
        props: {
            subtitle: 'PREMIUM BRANDS',
            title: 'Featuring Bullfrog Spas',
            description: 'We exclusively carry the most innovative and reliable brands in the industry. Bullfrog Spas offer the patented JetPak Therapy System™ for a personalized massage experience.',
            brands: [
                { name: 'Bullfrog Spas', logoUrl: 'https://placehold.co/400x300.png', dataAiHint: 'brand logo', href: '/hot-tubs/bullfrog-spas' },
            ],
            buttons: {
                primary: { href: '/hot-tubs/bullfrog-spas', text: 'Explore Bullfrog' },
                secondary: { href: '/contact', text: 'Request Info' },
            }
        }
    },
    {
        id: 'collection',
        component: 'ProductCollectionSection',
        props: {
            title: 'Our Hot Tub Collection',
            products: [
                { name: 'M-Series M9', category: 'Bullfrog Spas', imageUrl: 'https://placehold.co/600x400.png', imageHint: 'luxury spa night', href: '/hot-tubs/bullfrog-spas/m-series', price: 'Call for Price' },
                { name: 'Model Ultra', category: 'Premium Series', imageUrl: 'https://placehold.co/600x400.png', imageHint: 'modern hot tub', href: '/hot-tubs/models/ultra', price: 'View Details' },
                { name: 'Model Aquarius', category: 'Premium Series', imageUrl: 'https://placehold.co/600x400.png', imageHint: 'family hot tub', href: '/hot-tubs/models/aquarius', price: 'View Details' },
                { name: 'Model Pisces', category: 'Premium Series', imageUrl: 'https://placehold.co/600x400.png', imageHint: 'relaxing spa', href: '/hot-tubs/models/pisces', price: 'View Details' },
            ]
        }
    },
    {
        id: 'cta',
        component: 'CtaSection',
        props: {
            title: 'Ready to Upgrade Your Spa?',
            subtitle: 'Explore our range of alterations and upgrades to enhance your spa experience.',
            button: { href: '/spa-upgrades', text: 'View Upgrades' }
        }
    }
];
