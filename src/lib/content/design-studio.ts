import type { ComponentProps } from 'react';
import { Award, ThumbsUp, Wrench, TestTube, Lightbulb, Rocket } from 'lucide-react';
import type { HeroSection } from '@/components/page-sections/hero-section';
import type { WhyChooseUsSection } from '@/components/page-sections/why-choose-us-section';
import type { TestimonialsSection } from '@/components/page-sections/testimonials-section';

export type ComponentConfig = 
  | { component: 'HeroSection'; props: ComponentProps<typeof HeroSection> }
  | { component: 'WhyChooseUsSection'; props: ComponentProps<typeof WhyChooseUsSection> }
  | { component: 'TestimonialsSection'; props: ComponentProps<typeof TestimonialsSection> };

export const designStudioSections: ComponentConfig[] = [
  {
    component: 'HeroSection',
    props: {
      backgroundImage: 'https://placehold.co/1920x1080.png',
      backgroundHint: 'abstract design background',
      title: 'Design Studio',
      subtitle: 'This is your canvas. Edit content, change images, and reorder sections in the `src/lib/content/design-studio.ts` file.',
      buttons: {
        primary: {
          href: '#features',
          text: 'Explore Features',
        },
        secondary: {
          href: '/contact',
          text: 'Contact Us',
        },
      },
    }
  },
  {
    component: 'WhyChooseUsSection',
    props: {
      title: 'Editable Feature Section',
      subtitle: 'Change the icons, titles, and descriptions below by modifying the configuration file.',
      features: [
        {
          Icon: Lightbulb,
          title: 'Fully Customizable',
          description: 'Easily swap out icons from the Lucide library and edit this text to fit your needs.',
        },
        {
          Icon: Rocket,
          title: 'Dynamic Rendering',
          description: 'The page is built dynamically from the configuration array. Change the order there to reorder sections here.',
        },
        {
          Icon: TestTube,
          title: 'Experiment Freely',
          description: 'Add, remove, or duplicate sections to experiment with different layouts for your page.',
        },
      ],
    }
  },
  {
    component: 'TestimonialsSection',
    props: {
      title: 'Editable Testimonials',
      reviews: [
        {
          quote: "This new page is amazing! I can change everything without touching the component code.",
          name: "Happy Developer",
          location: "Localhost"
        },
        {
          quote: "The ability to reorder sections by just moving them in an array is a game-changer.",
          name: "Content Manager",
          location: "Firebase Studio"
        },
        {
          quote: "I created a whole new look for this page in minutes. It's incredibly flexible.",
          name: "Creative Designer",
          location: "The Cloud"
        },
      ],
    }
  },
];
