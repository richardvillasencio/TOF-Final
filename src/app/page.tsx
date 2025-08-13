
'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Phone, MapPin, Star, BrainCircuit, ShieldCheck, ChevronLeft, ChevronRight } from 'lucide-react';
import BubblePoopAnimation from '@/components/animations/bubble-poop-animation';
import { FadeInOnScroll } from '@/components/animations/fade-in-on-scroll';
import { useState } from 'react';
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { BookingSection } from '@/components/page-sections/booking-section';

const services = [
  { name: 'HOT TUBS', image: 'https://firebasestorage.googleapis.com/v0/b/tubclone.firebasestorage.app/o/Services%20images%2FHottubs.webp?alt=media&token=f55778aa-72cf-477f-bbdf-4c480286ab70', dataAiHint: 'hot tub' },
  { name: 'SAUNAS', image: 'https://firebasestorage.googleapis.com/v0/b/tubclone.firebasestorage.app/o/Services%20images%2FSaunas.webp?alt=media&token=18a49be9-d120-406c-b6cb-c9790ed08d28', dataAiHint: 'sauna interior' },
  { name: 'POOLS', image: 'https://firebasestorage.googleapis.com/v0/b/tubclone.firebasestorage.app/o/Services%20images%2FPools.webp?alt=media&token=4349ac39-50a1-424a-a035-77673551f332', dataAiHint: 'swimming pool' },
  { name: 'SWIM SPAS', image: 'https://firebasestorage.googleapis.com/v0/b/tubclone.firebasestorage.app/o/Services%20images%2Fswimspas.webp?alt=media&token=0ffadadc-9af2-4225-a141-8b754e8a1518', dataAiHint: 'swim spa' },
  { name: 'GAME ROOM ESSENTIALS', image: 'https://firebasestorage.googleapis.com/v0/b/tubclone.firebasestorage.app/o/Services%20images%2FGameroomEssentials.webp?alt=media&token=85b79a59-f590-432f-b3c3-79ce102d41a2', dataAiHint: 'game room' },
  { name: 'GRILLS', image: 'https://firebasestorage.googleapis.com/v0/b/tubclone.firebasestorage.app/o/Services%20images%2FGrills.webp?alt=media&token=38a832f0-5847-4e78-831d-2495d038e2d4', dataAiHint: 'bbq grill' },
  { name: 'SERVICE', image: 'https://firebasestorage.googleapis.com/v0/b/tubclone.firebasestorage.app/o/Services%20images%2FServices.webp?alt=media&token=f3ba459f-ae99-48ec-9219-cea429b0a697', dataAiHint: 'technician tools' },
  { name: 'REPAIRS', image: 'https://firebasestorage.googleapis.com/v0/b/tubclone.firebasestorage.app/o/Services%20images%2FRepairs.webp?alt=media&token=49f85496-e178-4cb5-a352-d35d6480b06b', dataAiHint: 'spa repair' },
];

const galleryImages = [
    { url: 'https://firebasestorage.googleapis.com/v0/b/tubclone.firebasestorage.app/o/Gallery%2Ftmp1th8eydt.webp?alt=media', hint: 'luxury hot tub' },
    { url: 'https://firebasestorage.googleapis.com/v0/b/tubclone.firebasestorage.app/o/Gallery%2Ftmp5p3u3289.webp?alt=media', hint: 'outdoor spa' },
    { url: 'https://firebasestorage.googleapis.com/v0/b/tubclone.firebasestorage.app/o/Gallery%2Ftmp69jqwjvg.webp?alt=media', hint: 'modern backyard' },
    { url: 'https://firebasestorage.googleapis.com/v0/b/tubclone.firebasestorage.app/o/Gallery%2Ftmp8yos2_u2.webp?alt=media', hint: 'patio furniture' },
    { url: 'https://firebasestorage.googleapis.com/v0/b/tubclone.firebasestorage.app/o/Gallery%2Ftmp_aiw6b2t.webp?alt=media', hint: 'sauna interior' },
    { url: 'https://firebasestorage.googleapis.com/v0/b/tubclone.firebasestorage.app/o/Gallery%2Ftmpfpg1t81n.webp?alt=media', hint: 'swim spa' },
    { url: 'https://firebasestorage.googleapis.com/v0/b/tubclone.firebasestorage.app/o/Gallery%2Ftmpp4ovjmxg.webp?alt=media', hint: 'family fun' },
    { url: 'https://firebasestorage.googleapis.com/v0/b/tubclone.firebasestorage.app/o/Gallery%2Ftmppr74nfqm.webp?alt=media', hint: 'backyard oasis' },
    { url: 'https://firebasestorage.googleapis.com/v0/b/tubclone.firebasestorage.app/o/Gallery%2Ftmpy9gzrogz.webp?alt=media', hint: 'night ambiance' },
];


export default function HomePage() {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const handleNext = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % galleryImages.length);
    }
  };

  const handlePrev = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex - 1 + galleryImages.length) % galleryImages.length);
    }
  };
  
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[95vh] text-primary-foreground flex items-center justify-center text-center hero-section">
        <video autoPlay loop muted playsInline className="absolute top-0 left-0 w-full h-full object-cover z-0" poster="https://placehold.co/1920x1080.png">
          <source src="https://storage.googleapis.com/msgsndr/Q8i1yKqsccON1uqGARTN/media/679284b1c21e371866b0d7ab.mp4" type="video/mp4" />
        </video>
        <div className="absolute top-0 left-0 w-full h-full z-10 bg-black/70"></div>
        <div className="relative z-20 p-4">
          <h1 className="text-4xl md:text-8xl font-bold text-shadow-lg">
            FAMILY TIME MADE SIMPLE!!!
          </h1>
          <p className="text-lg md:text-2xl mt-4 text-shadow">
            Let us help you transform your space into something special
          </p>
          <p className="text-base md:text-xl mt-2 text-shadow">
            Our friendly and knowledgeable staff are here to show you our amazing Hot tubs, Swim spas, Pools, Saunas, and more!
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-24 text-background z-20">
            <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full h-full fill-current">
                <path d="M0,50 Q240,0 480,50 T960,50 T1440,50 V120 H0 Z" />
            </svg>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-16 bg-background relative overflow-hidden -mt-10">
        <BubblePoopAnimation />
        <FadeInOnScroll>
          <div className="container mx-auto text-center relative z-10 pt-10">
            <h2 className="text-3xl font-bold text-primary">
              ABOUT US
            </h2>
            <div className="w-16 h-1 bg-accent mx-auto my-4"></div>
          </div>
        </FadeInOnScroll>

        <FadeInOnScroll delay={200}>
          <div className="container mx-auto grid md:grid-cols-2 gap-8 items-center mt-8 relative z-10">
              <div className="text-left md:pl-8 px-4">
                  <p className="uppercase text-primary font-semibold">
                      MEET THE FOUNDER & CEO
                  </p>
                  <h3 className="text-4xl font-bold text-foreground my-2">
                      Hi, I'm Troy!
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                      Our business began in 1991, as a hot tub rental company. We grew that company into a hot tub superstore. Our founder and CEO Troy Derheim eventually sold Tubs of Fun! to focus on designing and building swimming pools, splash pads, and and specialty aquatic therapy products. Now, by customer request, and a passion re-imagined, we are back! Fully committed to serving the great people of our community with quality products and unmatched service.
                  </p>
                  <div className="text-center mt-6">
                    <Button variant="accent">See More</Button>
                  </div>
              </div>
              <div className="flex justify-center px-4">
                   <Image src="https://firebasestorage.googleapis.com/v0/b/tubclone.firebasestorage.app/o/Troy.webp?alt=media&token=ed2c1bc3-f12b-49d9-ba9b-921d2693039c" alt="Founder Troy" width={400} height={500} className="rounded-lg shadow-lg object-cover" data-ai-hint="founder portrait" />
              </div>
          </div>
        </FadeInOnScroll>
      </section>

      {/* Blue Divider */}
      <section className="bg-blue-900 h-[100px]"></section>
      
      {/* Full-width Video Section */}
      <section className="w-full">
        <video autoPlay loop muted playsInline className="w-full h-full object-cover">
            <source src="https://firebasestorage.googleapis.com/v0/b/tubclone.firebasestorage.app/o/Swimspasbanner.mp4?alt=media&token=2e0447bd-2d4b-4aee-9640-e4edbb38e4fd" type="video/mp4" />
        </video>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-muted">
        <FadeInOnScroll>
          <div className="container mx-auto text-center px-4">
              <h2 className="text-3xl font-bold text-primary">Our Services</h2>
              <div className="w-16 h-1 bg-accent mx-auto my-4"></div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                  {services.map((service, index) => (
                    <FadeInOnScroll key={service.name} delay={index * 100}>
                      <div className="group">
                          <Card className="overflow-hidden bg-background shadow-md">
                              <CardContent className="p-0">
                                  <div className="aspect-w-4 aspect-h-3">
                                    <Image src={service.image} alt={service.name} width={400} height={300} className="w-full h-full object-cover group-hover:scale-105 transition-transform" data-ai-hint={service.dataAiHint}/>
                                  </div>
                              </CardContent>
                          </Card>
                          <p className="mt-2 font-semibold text-foreground">{service.name}</p>
                      </div>
                    </FadeInOnScroll>
                  ))}
              </div>
          </div>
        </FadeInOnScroll>
      </section>
      
      <section className="bg-blue-900 h-[100px]"></section>

      {/* Lakeville Location Section */}
      <section className="py-16 bg-background">
        <FadeInOnScroll>
          <div className="container mx-auto text-center px-4">
            <h2 className="text-3xl font-bold text-primary">Check our Lakeville Location</h2>
            <p className="text-lg text-muted-foreground mt-2">
              Now open in Lakeville, MN—experience our full showroom and service team!
            </p>
            <div className="max-w-4xl mx-auto mt-8 p-8 bg-muted rounded-2xl shadow-lg">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <BrainCircuit className="w-8 h-8 text-primary" />
                  <h3 className="text-2xl font-bold text-foreground">In-Stock Hot Tubs</h3>
                </div>
                <p className="text-muted-foreground max-w-3xl mx-auto mb-8">
                    Looking for a new hot tub? We offer a selection of high-quality, in-stock hot tubs ready for immediate delivery. Each hot tub combines comfort, style, and durability, featuring powerful jets and energy-efficient designs for a luxurious soaking experience. Our in-stock options allow you to skip the wait and enjoy the relaxation of a hot tub in no time.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="overflow-hidden rounded-lg shadow-md">
                        <Image src="https://firebasestorage.googleapis.com/v0/b/tubclone.firebasestorage.app/o/tmp_0kn46w_.webp?alt=media&token=cd2a2b8b-e409-4f78-bd20-3b523f1ccd06" alt="In-stock hot tub 1" width={600} height={500} className="w-full h-full object-cover" data-ai-hint="in-stock hot tub" />
                    </div>
                     <div className="overflow-hidden rounded-lg shadow-md">
                        <Image src="https://firebasestorage.googleapis.com/v0/b/tubclone.firebasestorage.app/o/tmpr6hjnug1.webp?alt=media&token=d4e9600c-c1c1-4e5f-8179-ba94f87f87f4" alt="In-stock hot tub 2" width={600} height={500} className="w-full h-full object-cover" data-ai-hint="luxury spa interior" />
                    </div>
                </div>
            </div>
          </div>
        </FadeInOnScroll>
      </section>

      {/* Veteran-Owned Section */}
      <FadeInOnScroll>
        <section 
          className="relative bg-cover bg-center py-20 text-foreground"
          style={{ backgroundImage: "url('https://firebasestorage.googleapis.com/v0/b/tubclone.firebasestorage.app/o/67fbfb7ac7a015af86d6df0c.png?alt=media&token=49cbee03-d9b4-40ca-8bfe-c735464bf101')" }}
        >
         <div className="container mx-auto grid md:grid-cols-3 gap-8 items-center relative z-10">
            <div className="md:col-span-2"></div>
            <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    <span>We're committed to</span><br/>
                    <span>serve you!</span>
                </h2>
                <Image
                    src="https://firebasestorage.googleapis.com/v0/b/tubclone.firebasestorage.app/o/veteran.svg?alt=media&token=814412af-0346-46ad-b5e5-317421da2a8a"
                    alt="Service Disabled Veteran Owned Small Business Logo"
                    width={150}
                    height={150}
                    className="mx-auto mb-4"
                    data-ai-hint="veteran owned business logo"
                />
                <p className="font-semibold">Licensed & Insured</p>
                <p className="font-semibold">Military & Senior Discounts</p>
            </div>
         </div>
        </section>
      </FadeInOnScroll>

       <section className="bg-blue-900 h-[100px]"></section>

      {/* Testimonials Section */}
      <section className="py-16 bg-background">
        <FadeInOnScroll>
          <div className="container mx-auto text-center px-4">
              <h2 className="text-4xl font-bold text-primary">What they say about us...</h2>

              <div className="mt-8 p-6 border rounded-lg shadow-lg">
                  <div className="flex justify-center text-yellow-400 mb-4">
                      <Star fill="currentColor"/>
                      <Star fill="currentColor"/>
                      <Star fill="currentColor"/>
                      <Star fill="currentColor"/>
                      <Star fill="currentColor"/>
                  </div>
                  <p className="italic text-muted-foreground">
                      "This is a placeholder for the reviews widget. Customer testimonials will be displayed here."
                  </p>
                  <p className="font-bold mt-4 text-foreground">
                      - A Happy Customer
                  </p>
              </div>
          </div>
        </FadeInOnScroll>
      </section>

       {/* Gallery Section */}
       <section className="py-16 bg-muted">
        <FadeInOnScroll>
          <div className="container mx-auto text-center px-4">
            <h2 className="text-3xl font-bold text-primary">Gallery</h2>
            <div className="w-16 h-1 bg-accent mx-auto my-4"></div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
              {galleryImages.map((image, i) => (
                <FadeInOnScroll key={i} delay={i * 100}>
                  <div 
                    className="overflow-hidden rounded-lg aspect-square cursor-pointer"
                    onClick={() => setSelectedImageIndex(i)}
                  >
                    <Image
                      src={image.url}
                      alt={`Gallery image ${i + 1}`}
                      width={600}
                      height={600}
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                      data-ai-hint={image.hint}
                    />
                  </div>
                </FadeInOnScroll>
              ))}
            </div>
          </div>
        </FadeInOnScroll>
      </section>
      
      <Dialog open={selectedImageIndex !== null} onOpenChange={() => setSelectedImageIndex(null)}>
        <DialogContent className="max-w-5xl p-0">
           <DialogHeader className="sr-only">
            <DialogTitle>Enlarged Gallery Image</DialogTitle>
          </DialogHeader>
          {selectedImageIndex !== null && (
            <div className="relative">
              <Image
                src={galleryImages[selectedImageIndex].url}
                alt={`Enlarged gallery image ${selectedImageIndex + 1}`}
                width={1200}
                height={800}
                className="w-full h-auto max-h-[90vh] object-contain rounded-lg"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-2 top-1/2 -translate-y-1/2 text-white bg-black/50 hover:bg-black/75"
                onClick={handlePrev}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-white bg-black/50 hover:bg-black/75"
                onClick={handleNext}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <section className="bg-blue-900 h-[100px]"></section>

      <BookingSection />
    </>
  );
}
