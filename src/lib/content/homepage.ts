import type { ComponentProps } from 'react';
import { Award, ThumbsUp, Wrench } from 'lucide-react';
import type { HeroSection } from '@/components/page-sections/hero-section';
import type { FeaturedProductsSection } from '@/components/page-sections/featured-products-section';
import type { WhyChooseUsSection } from '@/components/page-sections/why-choose-us-section';
import type { TestimonialsSection } from '@/components/page-sections/testimonials-section';
import type { ShowroomsSection } from '@/components/page-sections/showrooms-section';

export type ComponentConfig = 
  | { component: 'HeroSection'; props: ComponentProps<typeof HeroSection> }
  | { component: 'FeaturedProductsSection'; props: ComponentProps<typeof FeaturedProductsSection> }
  | { component: 'WhyChooseUsSection'; props: ComponentProps<typeof WhyChooseUsSection> }
  | { component: 'TestimonialsSection'; props: ComponentProps<typeof TestimonialsSection> }
  | { component: 'ShowroomsSection'; props: ComponentProps<typeof ShowroomsSection> };

export const homepageSections: ComponentConfig[] = [
  {
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
    component: 'WhyChooseUsSection',
    props: {
      title: 'Unmatched Quality & Service',
      subtitle: 'We are dedicated to providing you with the best products and support in the industry.',
      features: [
        {
          Icon: Award,
          title: 'Quality Products',
          description: 'We carry only the most reputable brands, ensuring longevity and performance.',
        },
        {
          Icon: Wrench,
          title: 'Expert Service & Repair',
          description: 'Our certified technicians are here to help with any maintenance or repair needs.',
        },
        {
          Icon: ThumbsUp,
          title: 'Customer Satisfaction',
          description: 'Your happiness is our priority. We\'re with you every step of the way.',
        },
      ],
    }
  },
  {
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