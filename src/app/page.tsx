
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Phone, MapPin, Star, MoveRight } from 'lucide-react';

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
    <div className="bg-background text-foreground overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-blue-50 to-white pt-24 pb-32">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 bg-blue-200/50 rounded-full -top-20 -left-40 animate-bubble blur-2xl"></div>
          <div className="absolute w-[30rem] h-[30rem] bg-orange-200/50 rounded-full -bottom-40 -right-20 animate-bubble animation-delay-2000 blur-2xl"></div>
          <div className="absolute w-72 h-72 bg-blue-200/40 rounded-full top-40 right-40 animate-bubble animation-delay-4000 blur-2xl"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left animate-fade-in-up">
              <span className="text-primary font-bold uppercase tracking-wider">Your Oasis Awaits</span>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mt-2 mb-6 leading-tight">
                Family Time, Simplified.
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg mx-auto md:mx-0">
                Let us help you transform your space into something special. Our friendly staff are here to show you our amazing Hot tubs, Swim spas, Pools, Saunas, and more!
              </p>
              <div className="mt-8 flex justify-center md:justify-start gap-4">
                <Button size="lg" variant="default" className="shadow-lg shadow-primary/30">
                  Explore Products <MoveRight className="ml-2" />
                </Button>
                <Button size="lg" variant="outline">
                  Contact Us
                </Button>
              </div>
            </div>
            <div className="relative animate-fade-in">
              <div className="absolute w-full h-full bg-blue-100/50 rounded-full -top-10 -left-10 blur-3xl animate-bubble animation-delay-1000"></div>
              <Image 
                src="https://placehold.co/600x600.png" 
                alt="Family enjoying a hot tub" 
                width={600} height={600} 
                className="rounded-full shadow-2xl mx-auto"
                data-ai-hint="family hot tub"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto text-center animate-fade-in-up animation-delay-300">
          <h2 className="text-3xl font-bold text-gray-800">Our Services</h2>
          <div className="w-20 h-1 bg-primary mx-auto my-4"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {services.map((service) => (
              <div key={service.name} className="group text-center">
                <Card className="overflow-hidden rounded-xl shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                  <CardContent className="p-0">
                    <Image src={service.image} alt={service.name} width={300} height={200} className="w-full h-auto object-cover" data-ai-hint={service.dataAiHint} />
                  </CardContent>
                </Card>
                <p className="mt-4 font-semibold text-gray-700 group-hover:text-primary transition-colors">{service.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

       {/* About Us Section */}
       <section className="py-24 bg-gray-50/70">
        <div className="container mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="animate-fade-in-right">
            <Image src="https://placehold.co/600x700.png" alt="Founder Troy" width={600} height={700} className="rounded-2xl shadow-xl object-cover" data-ai-hint="founder portrait" />
          </div>
          <div className="text-left animate-fade-in-left">
            <p className="uppercase text-primary font-semibold tracking-wider">MEET THE FOUNDER & CEO</p>
            <h3 className="text-4xl font-bold text-gray-800 my-3">Hi, I'm Troy!</h3>
            <p className="text-muted-foreground leading-relaxed">
              Our business began in 1991, as a hot tub rental company. We grew that company into a hot tub superstore. Our founder and CEO Troy Derheim eventually sold Tubs of Fun! to focus on designing and building swimming pools, splash pads, and specialty aquatic therapy products. Now, by customer request, and a passion re-imagined, we are back! Fully committed to serving the great people of our community with quality products and unmatched service.
            </p>
            <Button variant="outline" className="mt-8">Learn More About Us</Button>
          </div>
        </div>
      </section>


      {/* Testimonials Section */}
       <section className="py-24 bg-white">
        <div className="container mx-auto text-center animate-fade-in">
          <h2 className="text-3xl font-bold text-gray-800">What Our Customers Say</h2>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">We're honored to have served so many families in our community.</p>
          <div className="mt-12 grid md:grid-cols-3 gap-8">
            {Array(3).fill(0).map((_, i) => (
              <Card key={i} className="bg-gray-50/70 border-gray-200/80 rounded-xl shadow-sm text-left p-6">
                <CardContent className="p-0">
                  <div className="flex text-yellow-400 mb-4">
                      <Star fill="currentColor" /><Star fill="currentColor" /><Star fill="currentColor" /><Star fill="currentColor" /><Star fill="currentColor" />
                  </div>
                  <p className="italic text-muted-foreground">&quot;This is a placeholder for a customer review. Their wonderful feedback will be displayed here.&quot;</p>
                  <p className="font-bold mt-4 text-gray-800">- A Happy Customer</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
