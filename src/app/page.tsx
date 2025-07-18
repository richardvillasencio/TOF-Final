import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, ThumbsUp, Wrench, ArrowRight } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

const featuredProducts = [
  {
    name: 'M-Series M9',
    brand: 'Bullfrog Spas',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'luxury hot tub',
    href: '/hot-tubs/bullfrog-spas/m-series',
    price: 'Call for Price'
  },
  {
    name: 'Star Series Spa',
    brand: 'QCA Spas',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'outdoor spa',
    href: '/hot-tubs/qca-spas/star',
    price: 'Call for Price'
  },
  {
    name: 'Aquarius Swim Spa',
    brand: 'Swim Spa Collection',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'swim spa',
    href: '/swim-spas/collection',
    price: 'Call for Price'
  },
  {
    name: 'Cal Flame Grill',
    brand: 'Grills',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'bbq grill',
    href: '/grills/calflame',
    price: 'View models'
  },
];

const testimonials = [
  {
    quote: "The best customer service and selection! We love our new hot tub. The team was so helpful from start to finish.",
    name: "The Johnson Family",
    location: "Fargo, ND"
  },
  {
    quote: "Our swim spa is a dream come true. Installation was seamless, and the quality is outstanding. Highly recommend!",
    name: "Mark D.",
    location: "Lakeville, MN"
  },
  {
    quote: "I purchased a sauna and it has completely changed my wellness routine. The quality is top-notch.",
    name: "Sarah P.",
    location: "Fargo, ND"
  },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] bg-cover bg-center" style={{ backgroundImage: "url('https://placehold.co/1920x1080.png')" }} data-ai-hint="relaxing poolside">
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white p-4">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white drop-shadow-lg">
            Your Oasis of Relaxation Awaits
          </h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl text-gray-200 drop-shadow-md">
            Discover the highest quality hot tubs, swim spas, saunas, and more to transform your home into a personal sanctuary.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" variant="accent" className="text-lg px-8 py-6">
              <Link href="/hot-tubs">Explore Hot Tubs</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-lg px-8 py-6 bg-transparent text-white border-white hover:bg-white hover:text-primary">
              <Link href="/swim-spas">Discover Swim Spas</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 sm:py-24 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Popular Hot Tubs & Spas</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <Card key={product.name} className="overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col">
                <CardHeader className="p-0">
                  <Image src={product.image} alt={product.name} width={600} height={400} className="w-full h-48 object-cover" data-ai-hint={product.dataAiHint}/>
                </CardHeader>
                <CardContent className="p-6 flex-grow">
                  <p className="text-sm text-primary font-semibold">{product.brand}</p>
                  <CardTitle className="text-xl mt-2">{product.name}</CardTitle>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Button asChild className="w-full" variant="accent">
                    <Link href={product.href}>{product.price}</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Unmatched Quality & Service</h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">We are dedicated to providing you with the best products and support in the industry.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <Award className="w-12 h-12 mx-auto text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Quality Products</h3>
              <p className="text-muted-foreground">We carry only the most reputable brands, ensuring longevity and performance.</p>
            </div>
            <div className="p-6">
              <Wrench className="w-12 h-12 mx-auto text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Expert Service & Repair</h3>
              <p className="text-muted-foreground">Our certified technicians are here to help with any maintenance or repair needs.</p>
            </div>
            <div className="p-6">
              <ThumbsUp className="w-12 h-12 mx-auto text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Customer Satisfaction</h3>
              <p className="text-muted-foreground">Your happiness is our priority. We're with you every step of the way.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 sm:py-24 bg-muted">
         <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">What Our Customers Say</h2>
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-4xl mx-auto"
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2">
                  <div className="p-1">
                    <Card className="h-full">
                      <CardContent className="flex flex-col justify-center p-6 text-center h-full">
                        <p className="text-lg italic text-muted-foreground mb-4">"{testimonial.quote}"</p>
                        <p className="font-bold text-primary">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      {/* Showrooms Section */}
       <section className="bg-cover bg-center text-white" style={{backgroundImage: "url('https://placehold.co/1920x800.png')"}} data-ai-hint="showroom interior">
         <div className="bg-primary/80 py-24 sm:py-32">
          <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Visit Our Showrooms</h2>
              <p className="max-w-2xl mx-auto text-lg text-blue-100 mb-8">Experience the quality firsthand. Our experts are ready to help you find the perfect addition to your home.</p>
              <Button asChild size="lg" variant="accent" className="text-lg px-8 py-6">
                <Link href="/contact">Find a Location <ArrowRight className="ml-2 h-5 w-5"/></Link>
              </Button>
            </div>
         </div>
      </section>
    </div>
  );
}
