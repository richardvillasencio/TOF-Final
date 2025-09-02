
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { FadeInOnScroll } from '@/components/animations/fade-in-on-scroll';

const spaSeries = [
  {
    name: 'M Series™ Spas',
    tagline: 'Elite Class',
    description: "M Series™ spas combine intuitive functionality, gorgeous aesthetics, and the most versatile layouts ever seen in portable spas, together with Bullfrog Spas' legendary JetPak Therapy System™, to create the most elite spa experience available today. Enjoy JetPaks in all premium seat locations, Simplicity™ water care, multi-functional controls throughout the spa, smart sensor technology, and layouts designed to be enjoyed by people of various sizes and body types.",
    image: {
      src: 'https://firebasestorage.googleapis.com/v0/b/tubclone.firebasestorage.app/o/BullfrogSpa%2FM%20SERIES%E2%84%A2%20SPAS.webp?alt=media&token=2c64a282-a2c9-436d-919f-2ceb8d763523',
      alt: 'Bullfrog M-Series Spa in a luxurious backyard setting',
      hint: 'luxury hot tub',
    },
    logo: 'https://firebasestorage.googleapis.com/v0/b/tubclone.firebasestorage.app/o/BullfrogSpa%2FM%20SERIES%20logo.webp?alt=media&token=23c07b49-258c-451f-a9a6-f4c305830d69',
    specs: [
        'Premium JetPaks in all locations',
        'Multi-functional controls',
        'Designed for varied body types',
        'The most elite spa experience'
    ],
    href: '/hot-tubs/bullfrog-spas/m-series',
  },
  {
    name: 'A Series™ Spas',
    tagline: 'Luxury Class',
    description: 'Available in three trim levels, the A Series is an advanced and stylish collection of premium hot tubs that set an elevated standard for luxury and performance. The elegantly styled A Series spas allow you to design your ultimate personal experience. Each trim level features the JetPak Therapy System™, a thoughtful mix of seat depths, improved seating ergonomics, headrests, and water features. The three trim level options truly raise the bar for maximum personalization of your hot tub.',
    image: {
      src: 'https://firebasestorage.googleapis.com/v0/b/tubclone.firebasestorage.app/o/BullfrogSpa%2FA%20SERIES%E2%84%A2%20SPAS.webp?alt=media&token=7d6c41cb-f7fb-4697-bdee-a105f97b2bff',
      alt: 'Bullfrog A-Series Spa on a clean patio',
      hint: 'modern hot tub',
    },
    logo: 'https://firebasestorage.googleapis.com/v0/b/tubclone.firebasestorage.app/o/BullfrogSpa%2FA%20SERIES%20logo.webp?alt=media&token=9b3285c9-d73d-4be5-93e4-2fec4ab6d1b3',
    specs: [
        '3 trim levels available',
        'JetPak Therapy System™',
        'Improved seating ergonomics',
        'Maximum personalization'
    ],
    href: '#', // Placeholder link
  },
  {
    name: 'X Series™ Spas',
    tagline: 'Comfort Class',
    description: "X Series™ brings you the legendary engineering and reliability of Bullfrog Spas in a value-packed, comfort-class spa line. The remarkable set of features include the long-lasting, wood-free EnduraFrame™, the solid one-piece spa base, full-foam insulation, impressive lighting and water features, and superior-quality components, to create a luxurious spa experience that rivals competitors' high-end offerings but at a price you'll love. Discover X Series for yourself and enjoy the life-changing benefits.",
    image: {
      src: 'https://firebasestorage.googleapis.com/v0/b/tubclone.firebasestorage.app/o/BullfrogSpa%2FX%20SERIES%E2%84%A2%20SPAS.webp?alt=media&token=79cbac66-dbd2-4557-90fa-3fabecac17d4',
      alt: 'Bullfrog X-Series Spa in a backyard',
      hint: 'family hot tub',
    },
    logo: 'https://firebasestorage.googleapis.com/v0/b/tubclone.firebasestorage.app/o/BullfrogSpa%2FX%20SERIES%20logo.webp?alt=media&token=749c53a5-a3f8-4593-87c6-9b1a0bc15a43',
    specs: [
        'Wood-free EnduraFrame™',
        'Full-foam insulation',
        'Impressive lighting & water features',
        'Great value for the price'
    ],
    href: '#', // Placeholder link
  },
];

export default function BullfrogSpasPage() {
  return (
    <div className="bg-white text-gray-800">
      
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] w-full flex items-center justify-center text-white text-center overflow-hidden">
        <Image
            src="https://firebasestorage.googleapis.com/v0/b/tubclone.firebasestorage.app/o/BullfrogSpa%2F16_couple_2.jpg?alt=media&token=cdc09a33-07ea-4458-befb-28887154323a"
            alt="Couple relaxing in a Bullfrog Spa"
            fill
            className="object-cover"
            priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <FadeInOnScroll className="relative z-10 p-4">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-shadow-lg">
                Peaceful Body.
            </h1>
             <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-shadow-md mt-2">
                Peaceful Mind. Peaceful Home.
            </h2>
        </FadeInOnScroll>
      </section>

      {/* Spa Series Sections */}
      <div className="bg-gray-50/70">
        <div className="container mx-auto px-4 py-16 sm:py-24 space-y-24">
          {spaSeries.map((series, index) => (
            <FadeInOnScroll key={series.name} delay={index * 150}>
                <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
                
                {/* Image Column */}
                <div className={`overflow-hidden rounded-lg shadow-2xl ${index % 2 === 1 ? 'md:order-last' : ''}`}>
                    <Image
                        src={series.image.src}
                        alt={series.image.alt}
                        width={800}
                        height={600}
                        className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                        data-ai-hint={series.image.hint}
                    />
                </div>
                
                {/* Details Column */}
                <div className="flex flex-col justify-center">
                    <div className="relative h-20 w-40 mb-4">
                        <Image
                            src={series.logo}
                            alt={`${series.name} Logo`}
                            fill
                            className="object-contain"
                        />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800">{series.name}</h2>
                    <h3 className="text-primary text-xl font-semibold tracking-wider uppercase mt-1 mb-4">{series.tagline}</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">{series.description}</p>
                    
                    <ul className="space-y-3 mb-8">
                        {series.specs.map(spec => (
                            <li key={spec} className="flex items-center gap-3">
                                <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                                <span className="text-gray-700">{spec}</span>
                            </li>
                        ))}
                    </ul>

                    <Button asChild size="lg" className="bg-gray-800 hover:bg-gray-900 text-white shadow-lg transform hover:-translate-y-1 transition-transform px-10 self-start">
                    <Link href={series.href}>Select {series.name.split(' ')[0]}</Link>
                    </Button>
                </div>

                </div>
            </FadeInOnScroll>
          ))}
        </div>
      </div>
    </div>
  );
}
