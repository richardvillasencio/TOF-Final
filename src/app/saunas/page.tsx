
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { FadeInOnScroll } from '@/components/animations/fade-in-on-scroll';

const saunaBrands = [
    {
        name: 'Golden Designs',
        description: 'Combining modern technology with luxury design, Golden Designs specializes in infrared saunas that offer low EMF emissions, energy efficiency, and therapeutic benefits. These sleek, easy-to-use saunas are perfect for anyone looking to enjoy detoxification, stress relief, and improved circulation in the comfort of their home.',
        image: 'https://firebasestorage.googleapis.com/v0/b/tubclone.firebasestorage.app/o/Saunas%2FGolden%20Designs.webp?alt=media&token=8e9f50e8-d102-45e8-8a4d-c052d9a9f243',
        dataAiHint: 'infrared sauna interior',
        href: '#',
    },
    {
        name: 'Almost Heaven',
        description: 'With a legacy rooted in authentic Finnish sauna traditions, Almost Heaven Saunas is renowned for its beautifully crafted barrel and indoor saunas. Built from premium-grade lumber and designed for exceptional heat retention, these saunas provide the ultimate steam therapy experience for deep relaxation and wellness.',
        image: 'https://firebasestorage.googleapis.com/v0/b/tubclone.firebasestorage.app/o/Saunas%2FAlmost%20Heaven.webp?alt=media&token=f0d2c0b3-6c8a-4933-9188-51838634e2c2',
        dataAiHint: 'barrel sauna outdoor',
        href: '#',
    },
    {
        name: 'Finlandia',
        description: 'Experience authentic Finnish craftsmanship with Finlandia. These saunas are built with premium woods and offer a traditional sauna experience, known for promoting relaxation, improving circulation, and cleansing the body through deep, comforting heat.',
        image: 'https://firebasestorage.googleapis.com/v0/b/tubclone.firebasestorage.app/o/Saunas%2FFinlandia.webp?alt=media&token=0b604a8e-28f0-45f8-857e-f6335a14d593',
        dataAiHint: 'traditional finnish sauna',
        href: '#',
    }
];

export default function SaunasPage() {
  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] w-full flex items-center justify-center text-white text-center overflow-hidden">
        <Image
          src="https://firebasestorage.googleapis.com/v0/b/tubclone.firebasestorage.app/o/Saunas%2Fsauna%20banner.jpeg?alt=media&token=fe69d19e-e7ff-403c-a3a4-53164de1eb21"
          alt="Woman relaxing in a premium sauna"
          fill
          className="object-cover object-top"
          priority
          data-ai-hint="woman relaxing sauna"
        />
        <div className="absolute inset-0 bg-black/40" />
        <FadeInOnScroll className="relative z-10 p-4">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-shadow-lg">
            Relax, Rejuvenate, and Reignite
          </h1>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-shadow-md mt-2">
            Your Senses with a Premium Sauna
          </h2>
        </FadeInOnScroll>
      </section>

      {/* Sauna Brands Intro */}
      <section className="bg-gray-50 py-16 text-center">
        <div className="container mx-auto px-4">
          <FadeInOnScroll>
            <h2 className="text-3xl font-bold text-primary mb-4">Sauna Brands</h2>
            <div className="w-16 h-1 bg-accent mx-auto my-4"></div>
            <p className="max-w-4xl mx-auto text-gray-600 leading-relaxed">
              Discover the ultimate home spa experience with our collection of high-quality indoor and outdoor saunas at Tubs of Fun. Whether you crave the deep, penetrating heat of an infrared sauna, the authentic steam of a traditional Finnish sauna, or the rustic elegance of a barrel sauna, we offer top-tier options built for luxury, durability, and relaxation. We proudly carry industry-leading brands like Almost Heaven, Golden Designs, and Finlandia, ensuring you get a sauna that blends superior craftsmanship, energy efficiency, and unmatched comfort.
            </p>
          </FadeInOnScroll>
        </div>
      </section>

      {/* Brand Cards Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {saunaBrands.map((brand, index) => (
              <FadeInOnScroll key={brand.name} delay={index * 100}>
                <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
                  <CardHeader className="p-0">
                    <Image
                      src={brand.image}
                      alt={`Image of ${brand.name} sauna`}
                      width={600}
                      height={400}
                      className="w-full h-56 object-cover"
                      data-ai-hint={brand.dataAiHint}
                    />
                  </CardHeader>
                  <CardContent className="p-6 flex-grow">
                    <CardTitle className="text-2xl text-primary mb-2">{brand.name}</CardTitle>
                    <p className="text-muted-foreground text-sm">{brand.description}</p>
                  </CardContent>
                  <CardFooter className="p-6 pt-0">
                    <Button asChild variant="default" className="w-full">
                      <Link href={brand.href}>See More</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </FadeInOnScroll>
            ))}
          </div>
        </div>
      </section>

       {/* Mascot Section */}
        <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-4 text-center">
                <FadeInOnScroll>
                    <Image
                        src="https://firebasestorage.googleapis.com/v0/b/tubclone.firebasestorage.app/o/tmpw_imh3fc.webp?alt=media&token=49a0cdfb-d711-4eea-a4b5-3713bc4da3be"
                        alt="Tubs of Fun Mascot"
                        width={200}
                        height={200}
                        className="mx-auto"
                        data-ai-hint="company mascot"
                    />
                </FadeInOnScroll>
            </div>
        </section>

      {/* Wellness CTA Section */}
      <section className="bg-gray-800 text-white py-20">
        <div className="container mx-auto px-4">
          <FadeInOnScroll>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold leading-tight">Your <span className="text-red-400">Wellness</span> journey starts HERE!</h2>
                <p className="mt-4 text-gray-300">
                  Whether you're creating a personal spa oasis indoors or an outdoor retreat, we have the perfect sauna for you. Explore our collection today and transform the way you relax! Browse Our Saunas & Find Your Perfect Fit!
                </p>
              </div>
              <div className="rounded-lg overflow-hidden shadow-2xl">
                <Image
                  src="https://firebasestorage.googleapis.com/v0/b/tubclone.firebasestorage.app/o/Saunas%2FSauna-cta.webp?alt=media&token=25081f96-3c0e-436d-9781-8319f391b157"
                  alt="Woman enjoying the wellness benefits of a sauna"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover"
                  data-ai-hint="wellness sauna woman"
                />
              </div>
            </div>
          </FadeInOnScroll>
        </div>
      </section>

      {/* Final CTA */}
        <section className="bg-white py-8 text-center">
            <div className="container mx-auto px-4">
                <FadeInOnScroll>
                    <Link href="#" className="text-primary hover:underline font-semibold">
                        Explore our selection today and bring the luxury of spa-quality heat therapy right to your home.
                    </Link>
                </FadeInOnScroll>
            </div>
        </section>
    </div>
  );
}
