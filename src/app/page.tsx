
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Phone, MapPin, Star } from 'lucide-react';
import BubblePoopAnimation from '@/components/animations/bubble-poop-animation';
import { FadeInOnScroll } from '@/components/animations/fade-in-on-scroll';

const services = [
  { name: 'HOT TUBS', image: 'https://placehold.co/300x200.png', dataAiHint: 'hot tub' },
  { name: 'SAUNAS', image: 'https://placehold.co/300x200.png', dataAiHint: 'sauna interior' },
  { name: 'POOLS', image: 'https://placehold.co/300x200.png', dataAiHint: 'swimming pool' },
  { name: 'SWIM SPAS', image: 'https://placehold.co/300x200.png', dataAiHint: 'swim spa' },
  { name: 'GAME ROOM ESSENTIALS', image: 'https://placehold.co/300x200.png', dataAiHint: 'game room' },
  { name: 'GRILLS', image: 'https://placehold.co/300x200.png', dataAiHint: 'bbq grill' },
  { name: 'SERVICE', image: 'https://placehold.co/300x200.png', dataAiHint: 'technician tools' },
  { name: 'REPAIRS', image: 'https://placehold.co/300x200.png', dataAiHint: 'spa repair' },
];

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[95vh] text-primary-foreground flex items-center justify-center text-center hero-section">
        <video autoPlay loop muted playsInline className="absolute top-0 left-0 w-full h-full object-cover z-0" poster="https://placehold.co/1920x1080.png">
          <source src="https://storage.googleapis.com/msgsndr/Q8i1yKqsccON1uqGARTN/media/679284b1c21e371866b0d7ab.mp4" type="video/mp4" />
        </video>
        <div className="absolute top-0 left-0 w-full h-full z-10 bg-black/70"></div>
        <div className="relative z-20 p-4">
          <h1 className="text-5xl md:text-8xl font-bold text-shadow-lg">
            FAMILY TIME MADE SIMPLE!!!
          </h1>
          <p className="text-xl md:text-2xl mt-4 text-shadow">
            Let us help you transform your space into something special
          </p>
          <p className="text-lg md:text-xl mt-2 text-shadow">
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
      <section className="py-16 bg-gradient-to-br from-muted to-background relative overflow-hidden -mt-10">
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
              <div className="text-center md:text-left">
                  <p className="uppercase text-primary font-semibold">
                      MEET THE FOUNDER & CEO
                  </p>
                  <h3 className="text-4xl font-bold text-foreground my-2">
                      Hi, I'm Troy!
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                      Our business began in 1991, as a hot tub rental company. We grew that company into a hot tub superstore. Our founder and CEO Troy Derheim eventually sold Tubs of Fun! to focus on designing and building swimming pools, splash pads, and and specialty aquatic therapy products. Now, by customer request, and a passion re-imagined, we are back! Fully committed to serving the great people of our community with quality products and unmatched service.
                  </p>
                  <Button variant="accent" className="mt-6">See More</Button>
              </div>
              <div className="flex justify-center">
                   <Image src="https://firebasestorage.googleapis.com/v0/b/tubclone.firebasestorage.app/o/Troy.webp?alt=media&token=ed2c1bc3-f12b-49d9-ba9b-921d2693039c" alt="Founder Troy" width={300} height={200} className="rounded-lg shadow-lg" data-ai-hint="founder portrait" />
              </div>
          </div>
        </FadeInOnScroll>
      </section>

      {/* Blue Divider */}
      <section className="bg-blue-900 h-[100px]"></section>
      
      {/* Full-width Video Section */}
      <section className="w-full">
        <video autoPlay loop muted playsInline className="w-full h-full object-cover">
            <source src="https://firebasestorage.googleapis.com/v0/b/tubclone.firebasestorage.app/o/Your%20paragraph%20text%20(4).mp4?alt=media&token=48d8e87e-bd79-462c-920d-0cf92071fae2" type="video/mp4" />
        </video>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-muted">
        <FadeInOnScroll>
          <div className="container mx-auto text-center">
              <h2 className="text-3xl font-bold text-primary">Our Services</h2>
              <div className="w-16 h-1 bg-accent mx-auto my-4"></div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                  {services.map((service, index) => (
                    <FadeInOnScroll key={service.name} delay={index * 100}>
                      <div className="group">
                          <Card className="overflow-hidden bg-background shadow-md">
                              <CardContent className="p-0">
                                  <Image src={service.image} alt={service.name} width={300} height={200} className="w-full h-auto object-cover group-hover:scale-105 transition-transform" data-ai-hint={service.dataAiHint}/>
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

      {/* Testimonials Section */}
      <section className="py-16 bg-background">
        <FadeInOnScroll>
          <div className="container mx-auto text-center">
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
          <div className="container mx-auto text-center">
              <h2 className="text-3xl font-bold text-primary">Gallery</h2>
               <div className="w-16 h-1 bg-accent mx-auto my-4"></div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <FadeInOnScroll key={i} delay={i * 100}>
                      <div className="overflow-hidden rounded-lg">
                          <Image src="https://placehold.co/600x400.png" alt={`Gallery image ${i + 1}`} width={600} height={400} className="w-full h-full object-cover hover:scale-105 transition-transform" data-ai-hint={i % 2 === 0 ? 'family hot tub' : 'modern swim spa'} />
                      </div>
                    </FadeInOnScroll>
                  ))}
              </div>
          </div>
        </FadeInOnScroll>
      </section>

    </>
  );
}
