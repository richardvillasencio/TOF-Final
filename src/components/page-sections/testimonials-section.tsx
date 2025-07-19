
// src/components/page-sections/testimonials-section.tsx
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Pencil, Trash2 } from 'lucide-react';
import { useEditableContent } from '@/hooks/use-editable-content';
import { Skeleton } from '../ui/skeleton';

// --- Types ---
type Review = {
  quote: string;
  name: string;
  location: string;
};

type TestimonialsSectionContent = {
  title: string;
  reviews: Review[];
};

// --- Initial Data ---
const initialContent: TestimonialsSectionContent = {
    title: 'What Our Customers Say',
    reviews: [
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
      ],
};

// --- Main Component ---
export function TestimonialsSection({ docPath }: { docPath: string }) {
  const { content, setContent, loading, isAuth, saveContent } = useEditableContent<TestimonialsSectionContent>({
    docPath: docPath,
    initialContent: initialContent,
  });

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  if (loading) {
    return (
        <div className="container mx-auto px-4 py-16 sm:py-24">
             <Skeleton className="h-10 w-1/2 mx-auto mb-12" />
             <div className="flex justify-center gap-4">
                <Skeleton className="h-48 w-1/2" />
                <Skeleton className="h-48 w-1/2" />
             </div>
        </div>
    );
  }

  return (
    <section className="relative py-16 sm:py-24 bg-muted">
       {isAuth && (
            <Button
            variant="outline"
            size="icon"
            className="absolute top-4 right-4 z-10"
            onClick={() => setIsEditDialogOpen(true)}
            >
            <Pencil className="h-4 w-4" />
            </Button>
        )}
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{content.title}</h2>
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full max-w-4xl mx-auto"
        >
          <CarouselContent>
            {content.reviews.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2">
                <div className="p-1">
                  <Card className="h-full">
                    <CardContent className="flex flex-col justify-center p-6 text-center h-full">
                      <p className="text-lg italic text-muted-foreground mb-4">
                        "{testimonial.quote}"
                      </p>
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
       <EditDialog
        isOpen={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        content={content}
        setContent={setContent}
        onSave={() => saveContent(content)}
      />
    </section>
  );
}


// --- Editing Dialog ---
interface EditDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  content: TestimonialsSectionContent;
  setContent: (content: TestimonialsSectionContent) => void;
  onSave: () => void;
}

function EditDialog({ isOpen, onOpenChange, content, setContent, onSave }: EditDialogProps) {

    const handleSave = () => {
        onSave();
        onOpenChange(false);
    }

    const handleReviewChange = (index: number, field: keyof Review, value: string) => {
        const newReviews = [...content.reviews];
        newReviews[index] = {...newReviews[index], [field]: value};
        setContent(prev => ({...prev, reviews: newReviews}));
    }
    
    const handleAddReview = () => {
        const newReviews = [...content.reviews, { quote: 'New Quote', name: 'New Name', location: 'New Location'}];
        setContent(prev => ({...prev, reviews: newReviews}));
    }

    const handleDeleteReview = (index: number) => {
        const newReviews = content.reviews.filter((_, i) => i !== index);
        setContent(prev => ({...prev, reviews: newReviews}));
    }

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Edit Testimonials</DialogTitle>
                    <DialogDescription>
                        Manage the testimonials displayed in the carousel.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <div>
                        <Label>Section Title</Label>
                        <Input value={content.title} onChange={e => setContent(prev => ({...prev, title: e.target.value}))}/>
                    </div>
                    <hr/>
                    <div className="space-y-4">
                        {content.reviews.map((review, index) => (
                            <div key={index} className="border p-4 rounded-md space-y-2 relative">
                                <Button variant="ghost" size="icon" className="absolute top-2 right-2" onClick={() => handleDeleteReview(index)}>
                                    <Trash2 className="h-4 w-4 text-destructive"/>
                                </Button>
                                <div>
                                    <Label>Quote</Label>
                                    <Textarea value={review.quote} onChange={e => handleReviewChange(index, 'quote', e.target.value)} />
                                </div>
                                <div>
                                    <Label>Name</Label>
                                    <Input value={review.name} onChange={e => handleReviewChange(index, 'name', e.target.value)} />
                                </div>
                                 <div>
                                    <Label>Location</Label>
                                    <Input value={review.location} onChange={e => handleReviewChange(index, 'location', e.target.value)} />
                                </div>
                            </div>
                        ))}
                    </div>
                     <Button variant="outline" onClick={handleAddReview}>Add Testimonial</Button>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button onClick={handleSave}>Save Changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
