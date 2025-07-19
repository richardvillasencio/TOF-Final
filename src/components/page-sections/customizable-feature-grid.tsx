// src/components/page-sections/customizable-feature-grid.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useEditableContent } from '@/hooks/use-editable-content';
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
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import { SortableItem } from '@/components/ui/sortable-item';
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
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Pencil, Trash2, GripVertical, PlusCircle } from 'lucide-react';
import { ImageUploader } from '../image-uploader';

// --- Types and Initial Data ---
interface Feature {
  id: string;
  title: string;
  description: string;
}

interface FeatureGridContent {
  title: string;
  imageUrl: string;
  imageHint: string;
  features: Feature[];
  layout: string[];
}

const initialContent: FeatureGridContent = {
  title: 'Discover Our Core Features',
  imageUrl: 'https://placehold.co/600x400.png',
  imageHint: 'team working together',
  features: [
    {
      id: 'feature-1',
      title: 'Personalized Hydrotherapy',
      description:
        'Customize your massage with our patented JetPak Therapy System™.',
    },
    {
      id: 'feature-2',
      title: 'Energy Efficiency',
      description:
        'Save on energy costs with our full-foam insulation and efficient heating.',
    },
    {
      id: 'feature-3',
      title: 'Lasting Quality',
      description:
        'Built with premium materials to ensure your spa lasts for years to come.',
    },
  ],
  layout: ['image', 'feature-1', 'feature-2', 'feature-3'],
};

// --- Main Component ---
export function CustomizableFeatureGrid({ id }: { id: string }) {
  const docPath = `pages/design-studio/sections/${id}`;
  const { content, setContent, saveContent, isAuth } = useEditableContent<FeatureGridContent>({
    docPath,
    initialContent,
  });

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = content.layout.indexOf(active.id as string);
      const newIndex = content.layout.indexOf(over.id as string);
      const newLayout = arrayMove(content.layout, oldIndex, newIndex);
      
      const newFullContent = {...content, layout: newLayout };
      setContent(newFullContent); // Update local state immediately for smooth UI
      saveContent(newFullContent); // Persist change
    }
  };

  const renderItem = (itemId: string) => {
    if (itemId === 'image') {
      return (
        <div className="relative aspect-video w-full min-h-[250px] overflow-hidden rounded-lg shadow-lg">
          <Image
            src={content.imageUrl}
            alt="Feature focus"
            fill
            className="object-cover"
            data-ai-hint={content.imageHint}
          />
        </div>
      );
    }
    const feature = content.features.find((f) => f.id === itemId);
    if (!feature) return null;
    return (
      <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
        <h3 className="mb-2 text-xl font-bold">{feature.title}</h3>
        <p className="text-muted-foreground">{feature.description}</p>
      </div>
    );
  };
  
  return (
    <section className="relative w-full py-16 sm:py-24">
      {isAuth && (
        <Button
          variant="outline"
          size="icon"
          className="absolute top-4 right-4 z-20"
          onClick={() => setIsEditDialogOpen(true)}
        >
          <Pencil className="h-4 w-4" />
        </Button>
      )}
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">
          {content.title}
        </h2>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={content.layout} strategy={rectSortingStrategy}>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {content.layout.map((itemId) => (
                <SortableItem key={itemId} id={itemId} className={itemId === 'image' ? 'lg:col-span-2' : ''}>
                  {renderItem(itemId)}
                </SortableItem>
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>

      <EditDialog
        isOpen={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        currentContent={content}
        onSave={(newContent) => {
          setContent(newContent);
          saveContent(newContent);
          setIsEditDialogOpen(false);
        }}
        docPath={docPath}
      />
    </section>
  );
}


// --- Editing Dialog Component ---
interface EditDialogProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    currentContent: FeatureGridContent;
    onSave: (newContent: FeatureGridContent) => void;
    docPath: string;
}

function EditDialog({ isOpen, onOpenChange, currentContent, onSave, docPath }: EditDialogProps) {
    const [editedContent, setEditedContent] = useState(currentContent);

    // Sync state when dialog opens
    useState(() => {
        if(isOpen) {
            setEditedContent(currentContent)
        }
    });

    const handleFieldChange = (field: keyof FeatureGridContent, value: any) => {
        setEditedContent(prev => ({...prev, [field]: value}));
    };
    
    const handleFeatureChange = (id: string, field: 'title' | 'description', value: string) => {
        setEditedContent(prev => ({
            ...prev,
            features: prev.features.map(f => f.id === id ? {...f, [field]: value} : f)
        }));
    };

    const handleAddNewFeature = () => {
        const newId = `feature-${crypto.randomUUID()}`;
        const newFeature: Feature = {
            id: newId,
            title: 'New Feature',
            description: 'Describe this new feature.'
        };
        setEditedContent(prev => ({
            ...prev,
            features: [...prev.features, newFeature],
            layout: [...prev.layout, newId]
        }))
    }

    const handleDeleteFeature = (idToDelete: string) => {
        setEditedContent(prev => ({
            ...prev,
            features: prev.features.filter(f => f.id !== idToDelete),
            layout: prev.layout.filter(layoutId => layoutId !== idToDelete)
        }));
    }

    const handleSave = () => {
        onSave(editedContent);
    };

    return (
         <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Edit Feature Grid</DialogTitle>
                    <DialogDescription>
                        Modify the title, image, and features. Reorder items by dragging them on the page.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-6 py-4">
                    {/* General Settings */}
                    <div className="space-y-2">
                        <Label htmlFor="main-title">Section Title</Label>
                        <Input 
                            id="main-title" 
                            value={editedContent.title}
                            onChange={e => handleFieldChange('title', e.target.value)}
                        />
                    </div>
                     <ImageUploader 
                        currentImageUrl={editedContent.imageUrl}
                        onUploadComplete={url => handleFieldChange('imageUrl', url)}
                        storagePath={docPath}
                    />
                    
                    <hr />

                    {/* Features List */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium">Features</h3>
                        {editedContent.features.map(feature => (
                            <div key={feature.id} className="flex items-start gap-4 rounded-md border p-4">
                               <GripVertical className="h-5 w-5 mt-2 text-muted-foreground flex-shrink-0" />
                                <div className="flex-grow space-y-2">
                                    <Label htmlFor={`title-${feature.id}`}>Feature Title</Label>
                                    <Input 
                                        id={`title-${feature.id}`}
                                        value={feature.title}
                                        onChange={e => handleFeatureChange(feature.id, 'title', e.target.value)}
                                    />
                                    <Label htmlFor={`desc-${feature.id}`}>Description</Label>
                                    <Textarea
                                        id={`desc-${feature.id}`}
                                        value={feature.description}
                                        onChange={e => handleFeatureChange(feature.id, 'description', e.target.value)}
                                        rows={3}
                                    />
                                </div>
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button variant="ghost" size="icon">
                                            <Trash2 className="h-4 w-4 text-destructive" />
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action cannot be undone. This will permanently delete the feature.
                                        </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={() => handleDeleteFeature(feature.id)}>Delete</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
                        ))}
                    </div>
                    <Button variant="outline" onClick={handleAddNewFeature}>
                        <PlusCircle className="mr-2 h-4 w-4"/>
                        Add New Feature
                    </Button>
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
