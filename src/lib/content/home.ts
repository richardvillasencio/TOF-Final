import type { HeroSectionProps } from '@/components/page-sections/hero-section';
import type { FeaturedProductsSectionProps } from '@/components/page-sections/featured-products-section';
import type { WhyChooseUsSectionProps } from '@/components/page-sections/why-choose-us-section';
import type { TestimonialsSectionProps } from '@/components/page-sections/testimonials-section';
import type { ShowroomsSectionProps } from '@/components/page-sections/showrooms-section';

export type PageSection = 
  | { component: 'HeroSection'; props: Omit<HeroSectionProps, 'id'>; id: string }
  | { component: 'FeaturedProductsSection'; props: FeaturedProductsSectionProps; id: string }
  | { component: 'WhyChooseUsSection'; props: Omit<WhyChooseUsSectionProps, 'id'>; id: string }
  | { component: 'TestimonialsSection'; props: Omit<TestimonialsSectionProps, 'id'>; id: string }
  | { component: 'ShowroomsSection'; props: ShowroomsSectionProps; id: string };

export const homeContent: PageSection[] = [
  {
    id: 'hero',
    component: 'HeroSection',
    props: {
      backgroundImage: 'https://placehold.co/1920x1080.png',
      backgroundHint: 'relaxing poolside',
      title: 'Your Oasis of Relaxation Awaits',
      subtitle: 'Discover the highest quality hot tubs, swim spas, saunas, and more to transform your home into a personal sanctuary.',
      buttons: {
        primary: {
          href: '/hot-tubs',
          text: 'Explore Hot Tubs',
        },
        secondary: {
          href: '/swim-spas',
          text: 'Discover Swim Spas',
        },
      },
    }
  },
  {
    id: 'featured-products',
    component: 'FeaturedProductsSection',
    props: {
      title: 'Popular Hot Tubs & Spas',
      products: [
        {
          name: 'M-Series M9',
          brand: 'Bullfrog Spas',
          image: 'https://placehold.co/600x400.png',
          dataAiHint: 'luxury hot tub',
          href: '/hot-tubs/bullfrog-spas/m-series',
          price: 'Call for Price'
        },
        {
          name: 'Star Series Spa',
          brand: 'QCA Spas',
          image: 'https://placehold.co/600x400.png',
          dataAiHint: 'outdoor spa',
          href: '/hot-tubs/qca-spas/star',
          price: 'Call for Price'
        },
        {
          name: 'Aquarius Swim Spa',
          brand: 'Swim Spa Collection',
          image: 'https://placehold.co/600x400.png',
          dataAiHint: 'swim spa',
          href: '/swim-spas/collection',
          price: 'Call for Price'
        },
        {
          name: 'Cal Flame Grill',
          brand: 'Grills',
          image: 'https://placehold.co/600x400.png',
          dataAiHint: 'bbq grill',
          href: '/grills/calflame',
          price: 'View models'
        },
      ],
    }
  },
  {
    id: 'why-choose-us',
    component: 'WhyChooseUsSection',
    props: {
      title: 'Unmatched Quality & Service',
      subtitle: 'We are dedicated to providing you with the best products and support in the industry.',
      features: [
        {
          icon: 'Award',
          title: 'Quality Products',
          description: 'We carry only the most reputable brands, ensuring longevity and performance.',
        },
        {
          icon: 'Wrench',
          title: 'Expert Service & Repair',
          description: 'Our certified technicians are here to help with any maintenance or repair needs.',
        },
        {
          icon: 'ThumbsUp',
          title: 'Customer Satisfaction',
          description: 'Your happiness is our priority. We\'re with you every step of the way.',
        },
      ],
    }
  },
  {
    id: 'testimonials',
    component: 'TestimonialsSection',
    props: {
      title: 'What Our Customers Say',
      reviews: [
        {
          quote: "The best customer service and selection! We love our new hot tub. The team was so helpful from start to finish.",
          name: "The Johnson Family",
          location: "Fargo, ND"
        },
        {
          quote: "Our swim spa is a dream come true. Installation was seamless, and the quality is outstanding. Highly recommend!",
          name: "Mark D.",
          location: "Lakeville, MN"
        },
        {
          quote: "I purchased a sauna and it has completely changed my wellness routine. The quality is top-notch.",
          name: "Sarah P.",
          location: "Fargo, ND"
        },
      ],
    }
  },
  {
    id: 'showrooms',
    component: 'ShowroomsSection',
    props: {
      backgroundImage: 'https://placehold.co/1920x800.png',
      backgroundHint: 'showroom interior',
      title: 'Visit Our Showrooms',
      subtitle: 'Experience the quality firsthand. Our experts are ready to help you find the perfect addition to your home.',
      button: {
        href: '/contact',
        text: 'Find a Location',
      },
    }
  },
];
