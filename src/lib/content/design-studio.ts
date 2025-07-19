import type { HeroSectionProps } from '@/components/page-sections/hero-section';
import type { TestimonialsSectionProps } from '@/components/page-sections/testimonials-section';
import type { WhyChooseUsSectionProps } from '@/components/page-sections/why-choose-us-section';
// We don't need a specific prop type for CustomizableFeatureGrid as it manages its own content.
// We'll just define it as a component that takes an `id`.

export type PageSection = 
  | { component: 'HeroSection'; props: Omit<HeroSectionProps, 'id'>, id: string }
  | { component: 'WhyChooseUsSection'; props: Omit<WhyChooseUsSectionProps, 'id'>, id: string }
  | { component: 'TestimonialsSection'; props: Omit<TestimonialsSectionProps, 'id'>, id: string }
  | { component: 'CustomizableFeatureGrid'; props: {}, id: string };

export const designStudioContent: PageSection[] = [
    {
      id: 'hero',
      component: 'HeroSection',
      props: {
        backgroundImage: 'https://placehold.co/1920x1080.png',
        backgroundHint: 'serene modern interior',
        title: 'Design Your Dream Space',
        subtitle: 'Use our interactive tools to create the perfect backyard oasis or home relaxation setup. Your vision, our expertise.',
        buttons: {
          primary: {
            href: '/hot-tubs',
            text: 'Start with a Hot Tub',
          },
          secondary: {
            href: '/contact',
            text: 'Consult an Expert',
          },
        },
      }
    },
    {
      id: 'custom-grid-1',
      component: 'CustomizableFeatureGrid',
      props: {},
    },
    {
      id: 'why-choose-us',
      component: 'WhyChooseUsSection',
      props: {
        title: 'Why Design With Us?',
        subtitle: 'Our Design Studio empowers you to bring your vision to life with ease and confidence.',
        features: [
          {
            icon: 'Palette',
            title: 'Visualize Instantly',
            description: 'See your color, material, and layout choices in real-time with our live visualizer.',
          },
          {
            icon: 'Ruler',
            title: 'Perfect Placement',
            description: 'Use our AR tool to see how your new spa or sauna will fit in your actual space.',
          },
          {
            icon: 'Save',
            title: 'Save & Share',
            description: 'Save your designs to your account and share them with family or our design experts.',
          },
        ],
      }
    },
    {
      id: 'testimonials',
      component: 'TestimonialsSection',
      props: {
        title: 'Success Stories from Our Studio',
        reviews: [
          {
            quote: "The Design Studio was a game-changer. Being able to see everything before committing made the process so much less stressful.",
            name: "Jessica Miller",
            location: "Lakeville, MN"
          },
          {
            quote: "I loved playing with the different options. It helped my husband and I agree on a final design we both love!",
            name: "David Chen",
            location: "Fargo, ND"
          },
          {
            quote: "Using the AR feature was amazing. We knew for sure the hot tub would fit on our deck. No guesswork!",
            name: "Emily Rodriguez",
            location: "West Fargo, ND"
          },
        ],
      }
    },
  ];