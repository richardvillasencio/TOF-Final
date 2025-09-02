
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Check, ChevronDown } from 'lucide-react';
import { FadeInOnScroll } from '@/components/animations/fade-in-on-scroll';

const spaSeries = [
  {
    name: 'M Series™ Spas',
    tagline: 'Elite Class',
    description: "M Series™ spas combine intuitive functionality, gorgeous aesthetics, and the most versatile layouts ever seen in portable spas, together with Bullfrog Spas' legendary JetPak Therapy System™, to create the most elite spa experience available today.",
    image: {
      src: 'https://firebasestorage.googleapis.com/v0/b/tubclone.firebasestorage.app/o/BullfrogSpa%2FM%20SERIES%E2%84%A2%20SPAS.webp?alt=media&token=2c64a282-a2c9-436d-919f-2ceb8d763523',
      alt: 'Bullfrog M-Series Spa in a luxurious backyard setting',
      hint: 'luxury hot tub',
    },
    logo: 'https://firebasestorage.googleapis.com/v0/b/tubclone.firebasestorage.app/o/BullfrogSpa%2FM%20SERIES%20logo.webp?alt=media&token=23c07b49-258c-451f-a9a6-f4c305830d69',
    specs: {
      'Seats': '7-10',
      'JetPaks': '4-7',
      'Spa Models': '4',
      'Starting MSRP': '$21,995',
    },
    href: '/hot-tubs/bullfrog-spas/m-series',
  },
  {
    name: 'A Series™ Spas',
    tagline: 'Luxury Class',
    description: 'Available in three trim levels, the A Series is an advanced and stylish collection of premium hot tubs that set an elevated standard for luxury and performance. The elegantly styled A Series spas allow you to design your ultimate personal experience.',
    image: {
      src: 'https://firebasestorage.googleapis.com/v0/b/tubclone.firebasestorage.app/o/BullfrogSpa%2FA%20SERIES%E2%84%A2%20SPAS.webp?alt=media&token=7d6c41cb-f7fb-4697-bdee-a105f97b2bff',
      alt: 'Bullfrog A-Series Spa on a clean patio',
      hint: 'modern hot tub',
    },
    logo: 'https://firebasestorage.googleapis.com/v0/b/tubclone.firebasestorage.app/o/BullfrogSpa%2FA%20SERIES%20logo.webp?alt=media&token=9b3285c9-d73d-4be5-93e4-2fec4ab6d1b3',
    specs: {
      'Seats': '3-9',
      'JetPaks': '2-7',
      'Spa Models': '9',
      'Starting MSRP': '$10,495',
    },
    href: '#', // Placeholder link
  },
  {
    name: 'X Series™ Spas',
    tagline: 'Comfort Class',
    description: "X Series™ brings you the legendary engineering and reliability of Bullfrog Spas in a value-packed, comfort-class spa line. Discover the life-changing benefits of a Bullfrog Spa.",
    image: {
      src: 'https://firebasestorage.googleapis.com/v0/b/tubclone.firebasestorage.app/o/BullfrogSpa%2FX%20SERIES%E2%84%A2%20SPAS.webp?alt=media&token=79cbac66-dbd2-4557-90fa-3fabecac17d4',
      alt: 'Bullfrog X-Series Spa in a backyard',
      hint: 'family hot tub',
    },
    logo: 'https://firebasestorage.googleapis.com/v0/b/tubclone.firebasestorage.app/o/BullfrogSpa%2FX%20SERIES%20logo.webp?alt=media&token=749c53a5-a3f8-4593-87c6-9b1a0bc15a43',
    specs: {
      'Seats': '3-8',
      'JetPaks': 'N/A',
      'Spa Models': '7',
      'Starting MSRP': '$7,995',
    },
    href: '#', // Placeholder link
  },
];

export default function BullfrogSpasPage() {
  return (
    <div className="bg-gray-50 text-foreground">
      
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[80vh] w-full flex items-center justify-center text-white">
        <Image
          src="https://firebasestorage.googleapis.com/v0/b/tubclone.firebasestorage.app/o/BullfrogSpa%2F16_couple_2.jpg?alt=media&token=cdc09a33-07ea-4458-befb-28887154323a"
          alt="Couple relaxing in a Bullfrog Spa"
          fill
          className="object-cover"
          data-ai-hint="couple relaxing spa"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center p-4">
          <FadeInOnScroll>
            <h1 className="text-4xl md:text-6xl font-extrabold text-shadow-lg">
              Peaceful Body, Peaceful Mind, Peaceful Home.
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-gray-200 text-shadow">
              Your Bullfrog Spa will be the best place to connect with what matters most. You’ll find that as you take time to relax and connect with family and loved ones your home will become a more peaceful and joyful place.
            </p>
          </FadeInOnScroll>
        </div>
        <div className="absolute bottom-10 z-10 animate-bounce">
            <ChevronDown className="w-10 h-10 text-white/80"/>
        </div>
      </section>

      {/* Spa Series Sections */}
      <div className="container mx-auto px-4 py-16 sm:py-24">
        <div className="flex flex-col gap-24">
          {spaSeries.map((series, index) => (
            <FadeInOnScroll key={series.name} delay={index * 150}>
              <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
                
                <div className={`relative w-full aspect-w-4 aspect-h-3 rounded-2xl overflow-hidden shadow-2xl group ${index % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
                  <Image
                    src={series.image.src}
                    alt={series.image.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    data-ai-hint={series.image.hint}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-6 left-6">
                      <Image
                          src={series.logo}
                          alt={`${series.name} Logo`}
                          width={180}
                          height={60}
                          className="object-contain drop-shadow-lg"
                      />
                  </div>
                </div>
                
                <div className={`flex flex-col justify-center ${index % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}>
                  <h3 className="text-primary font-semibold tracking-wider uppercase">{series.tagline}</h3>
                  <h2 className="text-4xl font-bold text-foreground mt-1 mb-4">{series.name}</h2>
                  <p className="text-muted-foreground mb-6 leading-relaxed">{series.description}</p>
                  
                  <ul className="grid grid-cols-2 gap-x-6 gap-y-3 mb-8 text-muted-foreground">
                      {Object.entries(series.specs).map(([key, value]) => (
                          <li key={key} className="flex items-center gap-3">
                            <Check className="w-5 h-5 text-green-500 shrink-0" />
                            <span><strong className="font-semibold text-foreground">{key}:</strong> {value}</span>
                          </li>
                      ))}
                  </ul>

                  <div className="mt-4">
                      <Button asChild size="lg" className="shadow-lg transform hover:-translate-y-1 transition-transform">
                        <Link href={series.href}>Explore {series.name.split(' ')[0]}</Link>
                      </Button>
                  </div>
                </div>

              </div>
            </FadeInOnScroll>
          ))}
        </div>
      </div>
    </div>
  );
}
