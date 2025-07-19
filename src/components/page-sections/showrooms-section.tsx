// src/components/page-sections/showrooms-section.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Pencil } from 'lucide-react';
import { useEditableContent } from '@/hooks/use-editable-content';
import { homeContent } from '@/lib/content/home';
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
import { Skeleton } from '../ui/skeleton';
import { ImageUploader } from '../image-uploader';


// --- Types ---
type ButtonLink = {
  href: string;
  text: string;
};

type ShowroomsSectionContent = {
  backgroundImage: string;
  backgroundHint: string;
  title: string;
  subtitle: string;
  button: ButtonLink;
};

// --- Initial Data ---
const getInitialContent = (): ShowroomsSectionContent => {
    const sectionData = homeContent.find(s => s.id === 'showrooms');
    return sectionData?.props as ShowroomsSectionContent || {
        backgroundImage: 'https://placehold.co/1920x800.png',
        backgroundHint: 'showroom interior',
        title: 'Visit Our Showrooms',
        subtitle: 'Experience the quality firsthand. Our experts are ready to help you find the perfect addition to your home.',
        button: { href: '/contact', text: 'Find a Location' },
    };
};

// --- Main Component ---
export function ShowroomsSection({ id }: { id: string }) {
  const { content, loading, isAuth, updateContent } = useEditableContent<ShowroomsSectionContent>({
    collectionName: 'sectionContent',
    docId: id,
    initialContent: getInitialContent(),
  });

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  if (loading) {
    return <Skeleton className="h-96 w-full" />;
  }

  return (
    <section
      className="relative bg-cover bg-center text-white"
      style={{ backgroundImage: `url('${content.backgroundImage}')` }}
      data-ai-hint={content.backgroundHint}
    >
        {isAuth && (
            <Button
            variant="outline"
            size="icon"
            className="absolute top-4 right-4 z-20 text-black"
            onClick={() => setIsEditDialogOpen(true)}
            >
            <Pencil className="h-4 w-4" />
            </Button>
        )}
      <div className="bg-primary/80 py-24 sm:py-32">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{content.title}</h2>
          <p className="max-w-2xl mx-auto text-lg text-blue-100 mb-8">{content.subtitle}</p>
          <Button asChild size="lg" variant="accent" className="text-lg px-8 py-6">
            <Link href={content.button.href}>
              {content.button.text} <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
      <EditDialog
        isOpen={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        currentContent={content}
        onSave={updateContent}
        docId={id}
      />
    </section>
  );
}

// --- Editing Dialog ---
interface EditDialogProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    currentContent: ShowroomsSectionContent;
    onSave: (newContent: Partial<ShowroomsSectionContent>) => void;
    docId: string;
}

function EditDialog({ isOpen, onOpenChange, currentContent, onSave, docId }: EditDialogProps) {
    const [editedContent, setEditedContent] = useState(currentContent);

    useEffect(() => {
        if(isOpen) setEditedContent(currentContent)
    }, [isOpen, currentContent]);

    const handleSave = () => {
        onSave(editedContent);
        onOpenChange(false);
    }
    
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Showrooms Section</DialogTitle>
                    <DialogDescription>
                        Update the content for this call-to-action section.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                     <ImageUploader
                        currentImageUrl={editedContent.backgroundImage}
                        onUploadComplete={(url) => setEditedContent(prev => ({...prev, backgroundImage: url}))}
                        storagePath={`sectionContent/${docId}`}
                    />
                    <div>
                        <Label>Title</Label>
                        <Input value={editedContent.title} onChange={e => setEditedContent(prev => ({...prev, title: e.target.value}))} />
                    </div>
                     <div>
                        <Label>Subtitle</Label>
                        <Input value={editedContent.subtitle} onChange={e => setEditedContent(prev => ({...prev, subtitle: e.target.value}))} />
                    </div>
                    <hr />
                    <h3 className="font-medium">Button</h3>
                    <div>
                        <Label>Button Text</Label>
                        <Input value={editedContent.button.text} onChange={e => setEditedContent(prev => ({...prev, button: {...prev.button, text: e.target.value}}))} />
                    </div>
                     <div>
                        <Label>Button Link URL</Label>
                        <Input value={editedContent.button.href} onChange={e => setEditedContent(prev => ({...prev, button: {...prev.button, href: e.target.value}}))} />
                    </div>
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
