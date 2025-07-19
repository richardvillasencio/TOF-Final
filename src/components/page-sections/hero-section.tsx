// src/components/page-sections/hero-section.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';
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
import { useEditableContent } from '@/hooks/use-editable-content';
import { homeContent } from '@/lib/content/home';
import { Skeleton } from '../ui/skeleton';
import { ImageUploader } from '../image-uploader';

// --- Types ---
type ButtonLink = {
  href: string;
  text: string;
};

type HeroSectionContent = {
  backgroundImage: string;
  backgroundHint: string;
  title: string;
  subtitle: string;
  buttons: {
    primary: ButtonLink;
    secondary: ButtonLink;
  };
};

// --- Initial Data ---
const getInitialContent = (): HeroSectionContent => {
  const sectionData = homeContent.find(s => s.id === 'hero');
  // Type assertion to ensure props match the expected structure
  return sectionData?.props as HeroSectionContent || {
    backgroundImage: 'https://placehold.co/1920x1080.png',
    backgroundHint: 'relaxing poolside',
    title: 'Your Oasis of Relaxation Awaits',
    subtitle: 'Discover the highest quality hot tubs, swim spas, saunas, and more to transform your home into a personal sanctuary.',
    buttons: {
      primary: { href: '/hot-tubs', text: 'Explore Hot Tubs' },
      secondary: { href: '/swim-spas', text: 'Discover Swim Spas' },
    },
  };
};

// --- Main Component ---
export function HeroSection({ id }: { id: string }) {
  const { content, loading, isAuth, updateContent } = useEditableContent<HeroSectionContent>({
    collectionName: 'sectionContent',
    docId: id,
    initialContent: getInitialContent(),
  });
  
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  if (loading) {
    return <Skeleton className="h-[70vh] w-full" />;
  }

  return (
    <section
      className="relative h-[60vh] md:h-[70vh] bg-cover bg-center"
      style={{ backgroundImage: `url('${content.backgroundImage}')` }}
      data-ai-hint={content.backgroundHint}
    >
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
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white p-4">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white drop-shadow-lg">
          {content.title}
        </h1>
        <p className="mt-4 max-w-2xl text-lg md:text-xl text-gray-200 drop-shadow-md">
          {content.subtitle}
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Button asChild size="lg" variant="accent" className="text-lg px-8 py-6">
            <Link href={content.buttons.primary.href}>{content.buttons.primary.text}</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="text-lg px-8 py-6 bg-transparent text-white border-white hover:bg-white hover:text-primary"
          >
            <Link href={content.buttons.secondary.href}>{content.buttons.secondary.text}</Link>
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
    currentContent: HeroSectionContent;
    onSave: (newContent: Partial<HeroSectionContent>) => void;
    docId: string;
}

function EditDialog({ isOpen, onOpenChange, currentContent, onSave, docId }: EditDialogProps) {
  const [editedContent, setEditedContent] = useState(currentContent);

  // Sync state when dialog opens
  useEffect(() => {
    if (isOpen) {
      setEditedContent(currentContent);
    }
  }, [isOpen, currentContent]);

  const handleFieldChange = (field: keyof HeroSectionContent, value: any) => {
    setEditedContent(prev => ({ ...prev, [field]: value }));
  };

  const handleButtonChange = (
    buttonType: 'primary' | 'secondary',
    field: keyof ButtonLink,
    value: string
  ) => {
    setEditedContent(prev => ({
      ...prev,
      buttons: {
        ...prev.buttons,
        [buttonType]: {
          ...prev.buttons[buttonType],
          [field]: value,
        },
      },
    }));
  };

  const handleSave = () => {
    onSave(editedContent);
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Hero Section</DialogTitle>
          <DialogDescription>
            Modify the text, background image, and buttons for this section.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4 max-h-[70vh] overflow-y-auto pr-2">
            <ImageUploader
                currentImageUrl={editedContent.backgroundImage}
                onUploadComplete={(url) => handleFieldChange('backgroundImage', url)}
                storagePath={`sectionContent/${docId}`}
            />
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={editedContent.title}
              onChange={(e) => handleFieldChange('title', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="subtitle">Subtitle</Label>
            <Input
              id="subtitle"
              value={editedContent.subtitle}
              onChange={(e) => handleFieldChange('subtitle', e.target.value)}
            />
          </div>
          <hr />
          <h3 className="font-medium">Primary Button</h3>
          <div>
            <Label>Text</Label>
            <Input
              value={editedContent.buttons.primary.text}
              onChange={(e) =>
                handleButtonChange('primary', 'text', e.target.value)
              }
            />
          </div>
          <div>
            <Label>Link URL</Label>
            <Input
              value={editedContent.buttons.primary.href}
              onChange={(e) =>
                handleButtonChange('primary', 'href', e.target.value)
              }
            />
          </div>
          <hr />
          <h3 className="font-medium">Secondary Button</h3>
          <div>
            <Label>Text</Label>
            <Input
              value={editedContent.buttons.secondary.text}
              onChange={(e) =>
                handleButtonChange('secondary', 'text', e.target.value)
              }
            />
          </div>
          <div>
            <Label>Link URL</Label>
            <Input
              value={editedContent.buttons.secondary.href}
              onChange={(e) =>
                handleButtonChange('secondary', 'href', e.target.value)
              }
            />
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
  );
}
