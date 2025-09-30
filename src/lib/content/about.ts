
import type { HeroSectionProps } from '@/components/page-sections/hero-section';
import type { TextWithImageSectionProps } from '@/components/page-sections/text-with-image-section';
import type { MissionVisionSectionProps } from '@/components/page-sections/mission-vision-section';
import type { TeamSectionProps } from '@/components/page-sections/team-section';
import placeholderImages from './placeholder-images.json';

export type PageSection = 
  | { component: 'HeroSection'; props: Omit<HeroSectionProps, 'id'>, id: string }
  | { component: 'TextWithImageSection'; props: Omit<TextWithImageSectionProps, 'id'>, id: string }
  | { component: 'MissionVisionSection'; props: Omit<MissionVisionSectionProps, 'id'>, id: string }
  | { component: 'TeamSection'; props: Omit<TeamSectionProps, 'id'>, id: string };

export const aboutContent: PageSection[] = [
  {
    id: 'hero',
    component: 'HeroSection',
    props: {
      backgroundImage: placeholderImages.about.hero.src,
      backgroundHint: 'company building exterior',
      title: 'About TubClone',
      subtitle: 'Your trusted partner in home relaxation and recreation for over 20 years.',
      buttons: {
        primary: { href: '/contact', text: 'Contact Us' },
        secondary: { href: '/hot-tubs', text: 'View Products' },
      },
    },
  },
  {
    id: 'story',
    component: 'TextWithImageSection',
    props: {
      title: 'Our Story',
      paragraphs: [
        "Founded in 2003, TubClone started as a small family business with a simple mission: to bring the joy and therapeutic benefits of hot tubs to our community. With a passion for quality and a commitment to our customers, we've grown to become the region's leading provider of hot tubs, swim spas, and backyard leisure products.",
        "From our humble beginnings in Fargo, we expanded to our second location in Lakeville to better serve our growing family of customers. Despite our growth, our core values remain the same: integrity, quality, and unparalleled customer service."
      ],
      image: {
        src: placeholderImages.about.story.src,
        alt: 'Family enjoying a hot tub',
        dataAiHint: 'company history family'
      },
      imagePosition: 'right'
    }
  },
  {
    id: 'mission',
    component: 'MissionVisionSection',
    props: {
        items: [
            {
                icon: 'Target',
                title: 'Our Mission',
                description: "To enhance our customers' lives by providing high-quality relaxation and recreation products, backed by expert knowledge and exceptional service."
            },
            {
                icon: 'Eye',
                title: 'Our Vision',
                description: "To be the most trusted and respected name in home and backyard leisure, creating lasting relationships with our customers and communities."
            },
            {
                icon: 'ShieldCheck',
                title: 'Our Commitment',
                description: "We stand behind every product we sell, offering comprehensive warranties and a dedicated service team to ensure your peace of mind."
            }
        ]
    }
  },
  {
    id: 'team',
    component: 'TeamSection',
    props: {
        title: 'Meet Our Team',
        members: placeholderImages.team,
    }
  }
];
