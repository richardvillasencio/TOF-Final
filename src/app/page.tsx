
// src/app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { SortableItem } from '@/components/ui/sortable-item';
import { Button } from '@/components/ui/button';
import { GripVertical, LayoutList, Check } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { firestore } from '@/lib/firebase/client'; // Import client firestore

// Import all possible section components
import { HeroSection } from '@/components/page-sections/hero-section';
import { FeaturedProductsSection } from '@/components/page-sections/featured-products-section';
import { WhyChooseUsSection } from '@/components/page-sections/why-choose-us-section';
import { TestimonialsSection } from '@/components/page-sections/testimonials-section';
import { ShowroomsSection } from '@/components/page-sections/showrooms-section';
import { homeContent } from '@/lib/content/home';

// A map to look up components by their name
const allSections: Record<string, React.ComponentType<{ id: string }>> = {
  HeroSection,
  FeaturedProductsSection,
  WhyChooseUsSection,
  TestimonialsSection,
  ShowroomsSection,
};

// Define the initial order of sections as a fallback
const initialSectionOrder = homeContent.map(section => section.id);

// The main layout component that manages fetching and reordering
function EditablePageLayout() {
  const [sectionOrder, setSectionOrder] = useState<string[]>(initialSectionOrder);
  const [isReorderMode, setIsReorderMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // In a real app, this would come from an auth provider like Clerk or Firebase Auth
  const isAuth = true; 

  // Fetch the layout from Firestore on component mount
  useEffect(() => {
    const fetchLayout = async () => {
      if (!isAuth) {
        setLoading(false);
        return;
      }
      try {
        const layoutDocRef = doc(firestore, 'layouts', 'homePage');
        const docSnap = await getDoc(layoutDocRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.order && Array.isArray(data.order) && data.order.length > 0) {
            setSectionOrder(data.order);
          }
        } else {
          // If no layout exists, create one with the initial order
          await setDoc(layoutDocRef, { order: initialSectionOrder });
        }
      } catch (err) {
        console.error('Error fetching layout:', err);
        setError('Could not load page layout. Displaying default order.');
      } finally {
        setLoading(false);
      }
    };

    fetchLayout();
  }, [isAuth]);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setSectionOrder((items) => {
        const oldIndex = items.indexOf(active.id as string);
        const newIndex = items.indexOf(over.id as string);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleSaveOrder = async () => {
    setIsSaving(true);
    try {
      const layoutDocRef = doc(firestore, 'layouts', 'homePage');
      await setDoc(layoutDocRef, { order: sectionOrder });
      setIsReorderMode(false);
    } catch (err) {
      console.error('Error saving layout:', err);
      setError('Failed to save the new layout. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 space-y-8">
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-48 w-full" />
      </div>
    );
  }

  return (
    <div className="relative">
      {isAuth && (
        <div className="fixed bottom-5 right-5 z-50 flex gap-2">
           {!isReorderMode ? (
             <Button onClick={() => setIsReorderMode(true)} variant="secondary" size="lg" className="shadow-lg">
                <LayoutList className="mr-2 h-5 w-5" />
                Reorder Sections
            </Button>
           ) : (
            <>
              <Button onClick={handleSaveOrder} size="lg" className="shadow-lg" disabled={isSaving}>
                <Check className="mr-2 h-5 w-5" />
                {isSaving ? 'Saving...' : 'Save Order'}
              </Button>
               <Button onClick={() => setIsReorderMode(false)} variant="outline" size="lg" className="shadow-lg">
                Cancel
              </Button>
            </>
           )}
        </div>
      )}
       {error && (
            <div className="container mx-auto my-4">
                <Alert variant="destructive">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            </div>
        )}

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={sectionOrder} strategy={verticalListSortingStrategy}>
          <div className="flex flex-col">
            {sectionOrder.map((sectionId) => {
              const Component = allSections[sectionId];
              if (!Component) return null;

              if (isReorderMode) {
                // In reorder mode, wrap with SortableItem
                return (
                  <SortableItem key={sectionId} id={sectionId}>
                    <div className="relative border-2 border-dashed border-primary my-2 p-4 rounded-lg">
                      <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-2 z-10">
                        <GripVertical className="h-6 w-6" />
                      </div>
                      <div className="opacity-60 pointer-events-none">
                        <Component id={sectionId} />
                      </div>
                    </div>
                  </SortableItem>
                );
              }
              // Normal rendering
              return <Component key={sectionId} id={sectionId} />;
            })}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}


export default function Home() {
  return <EditablePageLayout />;
}
