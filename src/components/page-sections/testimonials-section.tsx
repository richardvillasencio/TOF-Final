import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

type Review = {
  quote: string;
  name: string;
  location: string;
};

export type TestimonialsSectionProps = {
  id: string;
  component: 'TestimonialsSection';
  title: string;
  reviews: Review[];
};

export function TestimonialsSection({ id, title, reviews }: TestimonialsSectionProps) {
  return (
    <section data-studio-id={id} className="py-16 sm:py-24 bg-muted">
       <div className="container mx-auto px-4">
        <h2 data-studio-id={`${id}/title`} className="text-3xl md:text-4xl font-bold text-center mb-12">{title}</h2>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-4xl mx-auto"
        >
          <CarouselContent data-studio-id-mode="reorder">
            {reviews.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2" data-studio-id={`${id}/reviews/${index}`}>
                <div className="p-1">
                  <Card className="h-full">
                    <CardContent className="flex flex-col justify-center p-6 text-center h-full">
                      <p data-studio-id={`${id}/reviews/${index}/quote`} className="text-lg italic text-muted-foreground mb-4">"{testimonial.quote}"</p>
                      <p data-studio-id={`${id}/reviews/${index}/name`} className="font-bold text-primary">{testimonial.name}</p>
                      <p data-studio-id={`${id}/reviews/${index}/location`} className="text-sm text-muted-foreground">{testimonial.location}</p>
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
