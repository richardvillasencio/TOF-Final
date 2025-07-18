import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

type Review = {
  quote: string;
  name: string;
  location: string;
};

export type TestimonialsSectionProps = {
  title: string;
  reviews: Review[];
};

export function TestimonialsSection({ title, reviews }: TestimonialsSectionProps) {
  return (
    <section className="py-16 sm:py-24 bg-muted">
       <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{title}</h2>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-4xl mx-auto"
        >
          <CarouselContent>
            {reviews.map((testimonial, index) => (
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
  );
}
