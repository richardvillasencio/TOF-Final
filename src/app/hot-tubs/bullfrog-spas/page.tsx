
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
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
        'Available Seats: 7-10',
        'JetPaks: 4-7',
        'Spa Models: 4',
        'Starting MSRP: $21,995-$27,495',
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
        'Available Seats: 3-9',
        'JetPaks: 2-7',
        'Spa Models: 9',
        'Starting MSRP: $10,495-$24,995',
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
        'Available Seats: 3-8',
        'Jet Count: 21-44',
        'Spa Models: 7',
        'Starting MSRP: $7,995-$13,995',
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

      {/* Introduction Section */}
      <section className="bg-gray-50 py-16 text-center">
        <div className="container mx-auto px-4">
          <FadeInOnScroll>
            <h2 className="text-xl font-semibold text-gray-600 tracking-widest">BULLFROG SPAS</h2>
            <h3 className="text-4xl font-bold text-primary my-2">HOT TUB SELECTION</h3>
            <div className="w-16 h-1 bg-accent mx-auto my-4"></div>
            <p className="max-w-3xl mx-auto text-gray-600 leading-relaxed">
              Bullfrog Spas is a premium hot tub manufacturer that focuses on providing a customizable, high-quality, and innovative spa experience. The company was founded on the idea of offering a spa that can be tailored to individual needs, and they achieved this with their JetPak Therapy System. This system allows users to customize their spa's jet configurations by swapping out different JetPaks, which each offer a variety of massage styles. Whether you want a deep tissue massage, a relaxing soak, or a gentle hydromassage, the flexibility of the JetPak system ensures that the spa experience meets your specific preferences.
            </p>
          </FadeInOnScroll>
        </div>
      </section>

      {/* Spa Series Sections */}
      <div className="bg-white">
        <div className="container mx-auto px-4 py-16 sm:py-24 space-y-20">
          {spaSeries.map((series) => (
            <FadeInOnScroll key={series.name}>
                <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
                
                {/* Image & Specs Column */}
                <div className="space-y-4">
                    <div className="overflow-hidden rounded-lg shadow-lg">
                        <Image
                            src={series.image.src}
                            alt={series.image.alt}
                            width={800}
                            height={600}
                            className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                            data-ai-hint={series.image.hint}
                        />
                    </div>
                    <div className="p-4 border rounded-md bg-gray-50">
                        <ul className="space-y-1 text-sm text-gray-700">
                            {series.specs.map(spec => (
                                <li key={spec}>
                                    <span className="font-semibold">{spec.split(':')[0]}:</span> {spec.split(':')[1]}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                
                {/* Details Column */}
                <div className="flex flex-col justify-center text-center md:text-left items-center md:items-start">
                    <div className="relative h-24 w-48 mb-4">
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
                    
                    <Button asChild size="lg" className="bg-gray-700 hover:bg-gray-800 text-white shadow-lg transform hover:-translate-y-1 transition-transform px-10 self-center md:self-start">
                        <Link href={series.href}>Select {series.name.split(' ')[0]}</Link>
                    </Button>
                </div>

                </div>
            </FadeInOnScroll>
          ))}
        </div>
      </div>
      
      {/* Final Call to Action */}
      <section className="bg-blue-100/50 py-8 text-center">
          <div className="container mx-auto px-4">
              <p className="text-gray-700">
                  Experience the ultimate in personalized relaxation with Bullfrog Spas—where innovative design, powerful hydrotherapy, and customizable comfort come together to create the perfect spa experience, just for you.
              </p>
          </div>
      </section>
    </div>
  );
}

