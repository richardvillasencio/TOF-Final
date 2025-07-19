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
import { homeContent } from '@/lib/content/home';
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
const getInitialContent = (): TestimonialsSectionContent => {
    const sectionData = homeContent.find(s => s.id === 'testimonials');
    return sectionData?.props as TestimonialsSectionContent || {
        title: 'What Our Customers Say',
        reviews: [],
    };
};

// --- Main Component ---
export function TestimonialsSection({ id }: { id: string }) {
  const { content, loading, isAuth, updateContent } = useEditableContent<TestimonialsSectionContent>({
    collectionName: 'sectionContent',
    docId: id,
    initialContent: getInitialContent(),
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
        currentContent={content}
        onSave={updateContent}
      />
    </section>
  );
}


// --- Editing Dialog ---
interface EditDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  currentContent: TestimonialsSectionContent;
  onSave: (newContent: Partial<TestimonialsSectionContent>) => void;
}

function EditDialog({ isOpen, onOpenChange, currentContent, onSave }: EditDialogProps) {
    const [editedContent, setEditedContent] = useState(currentContent);

    useEffect(() => {
        if(isOpen) setEditedContent(currentContent)
    }, [isOpen, currentContent]);

    const handleSave = () => {
        onSave(editedContent);
        onOpenChange(false);
    }

    const handleReviewChange = (index: number, field: keyof Review, value: string) => {
        const newReviews = [...editedContent.reviews];
        newReviews[index] = {...newReviews[index], [field]: value};
        setEditedContent(prev => ({...prev, reviews: newReviews}));
    }
    
    const handleAddReview = () => {
        const newReviews = [...editedContent.reviews, { quote: 'New Quote', name: 'New Name', location: 'New Location'}];
        setEditedContent(prev => ({...prev, reviews: newReviews}));
    }

    const handleDeleteReview = (index: number) => {
        const newReviews = editedContent.reviews.filter((_, i) => i !== index);
        setEditedContent(prev => ({...prev, reviews: newReviews}));
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
                        <Input value={editedContent.title} onChange={e => setEditedContent(prev => ({...prev, title: e.target.value}))}/>
                    </div>
                    <hr/>
                    <div className="space-y-4">
                        {editedContent.reviews.map((review, index) => (
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
