import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { homepageContent } from '@/lib/content/homepage';

export default function Home() {
  const { hero, featuredProducts, whyChooseUs, testimonials, showrooms } = homepageContent;

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] bg-cover bg-center" style={{ backgroundImage: `url('${hero.backgroundImage}')` }} data-ai-hint={hero.backgroundHint}>
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white p-4">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white drop-shadow-lg">
            {hero.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl text-gray-200 drop-shadow-md">
            {hero.subtitle}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" variant="accent" className="text-lg px-8 py-6">
              <Link href={hero.buttons.primary.href}>{hero.buttons.primary.text}</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-lg px-8 py-6 bg-transparent text-white border-white hover:bg-white hover:text-primary">
              <Link href={hero.buttons.secondary.href}>{hero.buttons.secondary.text}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 sm:py-24 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{featuredProducts.title}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.products.map((product) => (
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
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">{whyChooseUs.title}</h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">{whyChooseUs.subtitle}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {whyChooseUs.features.map((feature, index) => (
              <div key={index} className="p-6">
                <feature.Icon className="w-12 h-12 mx-auto text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 sm:py-24 bg-muted">
         <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{testimonials.title}</h2>
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-4xl mx-auto"
          >
            <CarouselContent>
              {testimonials.reviews.map((testimonial, index) => (
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
       <section className="bg-cover bg-center text-white" style={{backgroundImage: `url('${showrooms.backgroundImage}')`}} data-ai-hint={showrooms.backgroundHint}>
         <div className="bg-primary/80 py-24 sm:py-32">
          <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{showrooms.title}</h2>
              <p className="max-w-2xl mx-auto text-lg text-blue-100 mb-8">{showrooms.subtitle}</p>
              <Button asChild size="lg" variant="accent" className="text-lg px-8 py-6">
                <Link href={showrooms.button.href}>{showrooms.button.text} <ArrowRight className="ml-2 h-5 w-5"/></Link>
              </Button>
            </div>
         </div>
      </section>
    </div>
  );
}
