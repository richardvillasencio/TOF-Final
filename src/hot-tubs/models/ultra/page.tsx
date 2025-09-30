
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Users, Droplets, Waves } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import placeholderImages from '@/lib/placeholder-images.json';

const galleryImages = placeholderImages.gallery;

const features = [
  '50 Hydrotherapy Jets',
  'Dual-Speed Deep-Tissue Massage Pumps',
  'Multi-Color LED Lighting System',
  'Ozone Water Purification System',
  'Bluetooth Audio with Subwoofer',
  'Energy-Efficient Full-Foam Insulation',
];

export default function ModelUltraPage() {
  return (
    <div className="bg-muted">
      <div className="container mx-auto px-4 py-12 sm:py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div>
            <Carousel className="w-full rounded-lg overflow-hidden shadow-2xl">
              <CarouselContent>
                {galleryImages.map((image, index) => (
                  <CarouselItem key={index}>
                    <Image src={image.src} alt={image.alt} width={800} height={600} className="w-full object-cover" data-ai-hint={image.dataAiHint} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-4" />
              <CarouselNext className="right-4" />
            </Carousel>
          </div>

          {/* Product Details */}
          <div className="flex flex-col">
            <p className="text-primary font-semibold">Premium Series</p>
            <h1 className="text-4xl md:text-5xl font-bold my-2">The Ultra</h1>
            <p className="text-lg text-muted-foreground mb-6">Experience the pinnacle of luxury and performance. The Ultra model is designed for those who demand the very best in hydrotherapy and relaxation.</p>
            
            <Card className="mb-6 bg-background">
                <CardContent className="p-6 grid grid-cols-3 gap-4 text-center">
                    <div>
                        <Users className="mx-auto h-8 w-8 text-primary mb-2"/>
                        <p className="font-bold text-lg">6-7 Adults</p>
                        <p className="text-sm text-muted-foreground">Capacity</p>
                    </div>
                     <div>
                        <Droplets className="mx-auto h-8 w-8 text-primary mb-2"/>
                        <p className="font-bold text-lg">450 Gallons</p>
                        <p className="text-sm text-muted-foreground">Volume</p>
                    </div>
                     <div>
                        <Waves className="mx-auto h-8 w-8 text-primary mb-2"/>
                        <p className="font-bold text-lg">50 Jets</p>
                        <p className="text-sm text-muted-foreground">Hydrotherapy</p>
                    </div>
                </CardContent>
            </Card>

            <h2 className="text-2xl font-bold mb-4">Key Features</h2>
            <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3 mb-8">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <div className="mt-auto pt-6">
                <Button size="lg" variant="accent" className="w-full text-lg py-7">
                    Request a Quote
                </Button>
                <p className="text-center text-sm text-muted-foreground mt-2">Financing options available. <a href="/contact" className="underline hover:text-primary">Contact us</a> for details.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
