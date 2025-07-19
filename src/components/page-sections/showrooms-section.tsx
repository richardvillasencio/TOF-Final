// src/components/page-sections/showrooms-section.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Pencil } from 'lucide-react';
import { useEditableContent } from '@/hooks/use-editable-content';
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
const initialContent: ShowroomsSectionContent = {
    backgroundImage: 'https://placehold.co/1920x800.png',
    backgroundHint: 'showroom interior',
    title: 'Visit Our Showrooms',
    subtitle: 'Experience the quality firsthand. Our experts are ready to help you find the perfect addition to your home.',
    button: { href: '/contact', text: 'Find a Location' },
};

// --- Main Component ---
export function ShowroomsSection({ docPath }: { docPath: string }) {
  const { content, setContent, loading, isAuth, saveContent } = useEditableContent<ShowroomsSectionContent>({
    docPath: docPath,
    initialContent: initialContent,
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
        content={content}
        setContent={setContent}
        onSave={() => saveContent(content)}
        docPath={docPath}
      />
    </section>
  );
}

// --- Editing Dialog ---
interface EditDialogProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    content: ShowroomsSectionContent;
    setContent: (content: ShowroomsSectionContent) => void;
    onSave: () => void;
    docPath: string;
}

function EditDialog({ isOpen, onOpenChange, content, setContent, onSave, docPath }: EditDialogProps) {
    const handleSave = () => {
        onSave();
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
                        label="Background Image"
                        currentImageUrl={content.backgroundImage}
                        onUploadComplete={(url) => setContent(prev => ({...prev, backgroundImage: url}))}
                        storagePath={docPath}
                    />
                    <div>
                        <Label>Title</Label>
                        <Input value={content.title} onChange={e => setContent(prev => ({...prev, title: e.target.value}))} />
                    </div>
                     <div>
                        <Label>Subtitle</Label>
                        <Input value={content.subtitle} onChange={e => setContent(prev => ({...prev, subtitle: e.target.value}))} />
                    </div>
                    <hr />
                    <h3 className="font-medium">Button</h3>
                    <div>
                        <Label>Button Text</Label>
                        <Input value={content.button.text} onChange={e => setContent(prev => ({...prev, button: {...prev.button, text: e.target.value}}))} />
                    </div>
                     <div>
                        <Label>Button Link URL</Label>
                        <Input value={content.button.href} onChange={e => setContent(prev => ({...prev, button: {...prev.button, href: e.target.value}}))} />
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
                    <Button onClick={handleSave}>Save Changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
