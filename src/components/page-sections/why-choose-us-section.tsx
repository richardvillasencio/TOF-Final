// src/components/page-sections/why-choose-us-section.tsx
'use client';

import { useState, useEffect } from 'react';
import type { LucideProps } from 'lucide-react';
import type { ForwardRefExoticComponent, RefAttributes } from 'react';
import * as LucideIcons from 'lucide-react';
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
type Feature = {
  icon: keyof typeof LucideIcons;
  title: string;
  description: string;
};

type WhyChooseUsSectionContent = {
  title: string;
  subtitle: string;
  features: Feature[];
};

// --- Initial Data ---
const getInitialContent = (): WhyChooseUsSectionContent => {
    const sectionData = homeContent.find(s => s.id === 'why-choose-us');
    return sectionData?.props as WhyChooseUsSectionContent || {
      title: 'Unmatched Quality & Service',
      subtitle: 'We are dedicated to providing you with the best products and support in the industry.',
      features: [],
    };
  };

// --- Main Component ---
export function WhyChooseUsSection({ id }: { id: string }) {
  const { content, loading, isAuth, updateContent } = useEditableContent<WhyChooseUsSectionContent>({
    collectionName: 'sectionContent',
    docId: id,
    initialContent: getInitialContent(),
  });

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  if (loading) {
    return (
        <div className="container mx-auto px-4 py-16 sm:py-24">
            <Skeleton className="h-10 w-1/2 mx-auto mb-4" />
            <Skeleton className="h-6 w-3/4 mx-auto mb-12" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Skeleton className="h-32" />
                <Skeleton className="h-32" />
                <Skeleton className="h-32" />
            </div>
        </div>
    );
  }

  return (
    <section className="relative py-16 sm:py-24 bg-background">
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
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">{content.title}</h2>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">{content.subtitle}</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {content.features.map((feature, index) => {
            const IconComponent = LucideIcons[feature.icon] as ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>> | undefined;
            return (
              <div key={index} className="p-6">
                {IconComponent && <IconComponent className="w-12 h-12 mx-auto text-primary mb-4" />}
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            );
          })}
        </div>
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
    currentContent: WhyChooseUsSectionContent;
    onSave: (newContent: Partial<WhyChooseUsSectionContent>) => void;
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
    
    const handleFeatureChange = (index: number, field: keyof Feature, value: string) => {
        const newFeatures = [...editedContent.features];
        newFeatures[index] = {...newFeatures[index], [field]: value};
        setEditedContent(prev => ({...prev, features: newFeatures}));
    }

    const handleAddFeature = () => {
        const newFeatures = [...editedContent.features, { icon: 'Star', title: 'New Feature', description: 'New description'}];
        setEditedContent(prev => ({...prev, features: newFeatures}));
    }

    const handleDeleteFeature = (index: number) => {
        const newFeatures = editedContent.features.filter((_, i) => i !== index);
        setEditedContent(prev => ({...prev, features: newFeatures}));
    }

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Edit "Why Choose Us" Section</DialogTitle>
                </DialogHeader>
                 <div className="space-y-4 py-4">
                    <div>
                        <Label>Title</Label>
                        <Input value={editedContent.title} onChange={e => setEditedContent(prev => ({...prev, title: e.target.value}))}/>
                    </div>
                     <div>
                        <Label>Subtitle</Label>
                        <Textarea value={editedContent.subtitle} onChange={e => setEditedContent(prev => ({...prev, subtitle: e.target.value}))}/>
                    </div>
                    <hr/>
                    <div className="space-y-4">
                        <h3 className="font-medium">Features</h3>
                        {editedContent.features.map((feature, index) => (
                            <div key={index} className="border p-4 rounded-md space-y-2 relative">
                                 <Button variant="ghost" size="icon" className="absolute top-2 right-2" onClick={() => handleDeleteFeature(index)}>
                                    <Trash2 className="h-4 w-4 text-destructive"/>
                                </Button>
                                <div>
                                    <Label>Icon Name</Label>
                                    <Input value={feature.icon} onChange={e => handleFeatureChange(index, 'icon', e.target.value)} />
                                    <p className="text-xs text-muted-foreground mt-1">Use any name from <a href="https://lucide.dev/icons/" target="_blank" rel="noopener noreferrer" className="underline">lucide.dev</a> (e.g., "Award", "Wrench").</p>
                                </div>
                                <div>
                                    <Label>Title</Label>
                                    <Input value={feature.title} onChange={e => handleFeatureChange(index, 'title', e.target.value)} />
                                </div>
                                 <div>
                                    <Label>Description</Label>
                                    <Textarea value={feature.description} onChange={e => handleFeatureChange(index, 'description', e.target.value)} />
                                </div>
                            </div>
                        ))}
                    </div>
                    <Button variant="outline" onClick={handleAddFeature}>Add Feature</Button>
                </div>
                <DialogFooter>
                    <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
                    <Button onClick={handleSave}>Save Changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
