
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { FadeInOnScroll } from '@/components/animations/fade-in-on-scroll';
import { HeartPulse, Leaf, Wind, BrainCircuit } from 'lucide-react';

const saunaBrands = [
    {
        name: 'QCA Saunas',
        description: 'Blending innovation with relaxation, QCA offers a diverse range of infrared and traditional saunas designed for energy efficiency and superior performance.',
        image: 'https://firebasestorage.googleapis.com/v0/b/tubclone.firebasestorage.app/o/Saunas%2Fqca-sauna.jpg?alt=media&token=e110a159-8664-4dc4-ab12-1f3c3a4f15d7',
        dataAiHint: 'woman relaxing sauna',
        href: '#',
    },
    {
        name: 'Golden Designs',
        description: 'Specializing in infrared saunas that offer low EMF emissions and therapeutic benefits. Perfect for detoxification, stress relief, and improved circulation.',
        image: 'https://firebasestorage.googleapis.com/v0/b/tubclone.firebasestorage.app/o/Saunas%2FGolden%20Designs.webp?alt=media&token=8e9f50e8-d102-45e8-8a4d-c052d9a9f243',
        dataAiHint: 'infrared sauna interior',
        href: '#',
    },
    {
        name: 'Almost Heaven',
        description: "With a legacy in authentic Finnish traditions, Almost Heaven is renowned for its beautifully crafted barrel and indoor saunas built from premium lumber.",
        image: 'https://firebasestorage.googleapis.com/v0/b/tubclone.firebasestorage.app/o/Saunas%2Falmost-heaven-sauna.jpg?alt=media&token=23eb7844-9ad9-4d6b-bd85-05e8105c3384',
        dataAiHint: 'woman entering sauna',
        href: '#',
    }
];

const saunaBenefits = [
    {
        icon: Leaf,
        title: 'Detoxification',
        description: 'Sweat out toxins and impurities, leaving you feeling refreshed and cleansed.'
    },
    {
        icon: Wind,
        title: 'Stress Relief',
        description: 'Melt away tension and anxiety in a peaceful environment of gentle, radiant heat.'
    },
    {
        icon: HeartPulse,
        title: 'Improved Circulation',
        description: 'The heat helps dilate blood vessels, boosting blood flow and promoting cardiovascular health.'
    },
     {
        icon: BrainCircuit,
        title: 'Mental Clarity',
        description: 'A session can help calm the mind, improve focus, and promote a sense of well-being.'
    }
];

export default function SaunasPage() {
  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative h-[70vh] w-full flex items-center justify-center text-white text-center overflow-hidden">
        <Image
          src="https://firebasestorage.googleapis.com/v0/b/tubclone.firebasestorage.app/o/Saunas%2Fsauna%20banner.jpeg?alt=media&token=fe69d19e-e7ff-403c-a3a4-53164de1eb21"
          alt="Woman relaxing in a premium sauna"
          fill
          className="object-cover"
          priority
          data-ai-hint="woman relaxing sauna"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
        <FadeInOnScroll className="relative z-10 p-4 max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-shadow-lg leading-tight">
            Your Personal Sanctuary of Heat and Steam
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-200 text-shadow-md">
            Discover our curated collection of world-class saunas, designed to bring the ultimate relaxation and wellness experience into your home.
          </p>
        </FadeInOnScroll>
      </section>

      {/* Benefits Section */}
      <section className="bg-muted py-16 sm:py-24">
        <div className="container mx-auto px-4 text-center">
            <FadeInOnScroll>
                <h2 className="text-3xl font-bold text-primary mb-4">Embrace the Benefits</h2>
                <p className="max-w-2xl mx-auto text-muted-foreground mb-12">
                    Integrating a sauna into your life is an investment in your well-being, offering a host of physical and mental health advantages.
                </p>
            </FadeInOnScroll>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {saunaBenefits.map((benefit, index) => (
                    <FadeInOnScroll key={benefit.title} delay={index * 100}>
                        <div className="p-6">
                            <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-primary/10 text-primary rounded-full">
                                <benefit.icon className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">{benefit.description}</p>
                        </div>
                    </FadeInOnScroll>
                ))}
            </div>
        </div>
      </section>

      {/* Brand Cards Section */}
       <section className="py-16 sm:py-24 bg-background">
        <div className="container mx-auto px-4">
            <FadeInOnScroll className="text-center mb-16">
                 <h2 className="text-3xl font-bold text-primary mb-4">Trusted Brands, Unmatched Quality</h2>
                 <p className="max-w-3xl mx-auto text-muted-foreground">
                    We partner with the world's leading sauna manufacturers, ensuring every product meets our high standards for craftsmanship, innovation, and durability.
                 </p>
            </FadeInOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {saunaBrands.map((brand, index) => (
              <FadeInOnScroll key={brand.name} delay={index * 100}>
                <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full border-0 group bg-muted">
                  <CardHeader className="p-0">
                    <div className="overflow-hidden">
                        <Image
                            src={brand.image}
                            alt={`Image of ${brand.name} sauna`}
                            width={600}
                            height={400}
                            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                            data-ai-hint={brand.dataAiHint}
                        />
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 flex-grow flex flex-col">
                    <CardTitle className="text-2xl text-primary mb-3">{brand.name}</CardTitle>
                    <p className="text-muted-foreground text-sm mb-6 flex-grow">{brand.description}</p>
                     <Button asChild variant="default" className="mt-auto w-fit">
                      <Link href={brand.href}>Explore {brand.name}</Link>
                    </Button>
                  </CardContent>
                </Card>
              </FadeInOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Wellness CTA Section */}
      <section className="bg-muted py-20">
        <div className="container mx-auto px-4">
          <FadeInOnScroll>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="rounded-lg overflow-hidden shadow-2xl">
                <Image
                  src="https://firebasestorage.googleapis.com/v0/b/tubclone.firebasestorage.app/o/Saunas%2Fwellness-journey-new.jpg?alt=media&token=c1901a88-75c1-4560-b88d-e4c16d56dd19"
                  alt="Woman enjoying the wellness benefits of a sauna"
                  width={600}
                  height={700}
                  className="w-full h-full object-cover"
                  data-ai-hint="wellness sauna woman"
                />
              </div>
               <div>
                <h2 className="text-4xl md:text-5xl font-bold leading-tight text-primary">Discover Your Sanctuary</h2>
                <p className="mt-6 text-lg text-muted-foreground">
                  Whether you're creating a personal spa oasis indoors or a rustic outdoor retreat, we have the perfect sauna for you. Our expert team is here to guide you through every step, from selection to installation.
                </p>
                 <Button asChild size="lg" className="mt-8">
                    <Link href="/contact">Book a Consultation</Link>
                 </Button>
              </div>
            </div>
          </FadeInOnScroll>
        </div>
      </section>
    </div>
  );
}

    
