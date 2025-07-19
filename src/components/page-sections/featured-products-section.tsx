// src/components/page-sections/featured-products-section.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
import { Pencil } from 'lucide-react';
import { useEditableContent } from '@/hooks/use-editable-content';
import { ImageUploader } from '@/components/image-uploader';
import { Skeleton } from '../ui/skeleton';

// --- Types ---
type Product = {
  name: string;
  brand: string;
  image: string;
  dataAiHint: string;
  href: string;
  price: string;
};

type FeaturedProductsSectionContent = {
  title: string;
  products: Product[];
};

// --- Initial Data ---
const initialContent: FeaturedProductsSectionContent = {
    title: 'Popular Hot Tubs & Spas',
    products: [
        {
          name: 'M-Series M9',
          brand: 'Bullfrog Spas',
          image: 'https://placehold.co/600x400.png',
          dataAiHint: 'luxury hot tub',
          href: '/hot-tubs/bullfrog-spas/m-series',
          price: 'Call for Price'
        },
        {
          name: 'Star Series Spa',
          brand: 'QCA Spas',
          image: 'https://placehold.co/600x400.png',
          dataAiHint: 'outdoor spa',
          href: '/hot-tubs/qca-spas/star',
          price: 'Call for Price'
        },
        {
          name: 'Aquarius Swim Spa',
          brand: 'Swim Spa Collection',
          image: 'https://placehold.co/600x400.png',
          dataAiHint: 'swim spa',
          href: '/swim-spas/collection',
          price: 'Call for Price'
        },
        {
          name: 'Cal Flame Grill',
          brand: 'Grills',
          image: 'https://placehold.co/600x400.png',
          dataAiHint: 'bbq grill',
          href: '/grills/calflame',
          price: 'View models'
        },
      ],
};

// --- Main Component ---
export function FeaturedProductsSection({ docPath }: { docPath: string }) {
  const { content, setContent, loading, isAuth, updateContent } =
    useEditableContent<FeaturedProductsSectionContent>({
      docPath: docPath,
      initialContent: initialContent,
    });

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  if (loading) {
    return (
        <div className="container mx-auto px-4 py-16 sm:py-24">
             <Skeleton className="h-10 w-1/2 mx-auto mb-12" />
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                <Skeleton className="h-80" />
                <Skeleton className="h-80" />
                <Skeleton className="h-80" />
                <Skeleton className="h-80" />
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
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          {content.title}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {content.products.map((product, index) => (
            <Card
              key={index}
              className="overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col"
            >
              <CardHeader className="p-0">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={600}
                  height={400}
                  className="w-full h-48 object-cover"
                  data-ai-hint={product.dataAiHint}
                />
              </CardHeader>
              <CardContent className="p-6 flex-grow">
                <p className="text-sm text-primary font-semibold">
                  {product.brand}
                </p>
                <CardTitle className="text-xl mt-2">{product.name}</CardTitle>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button asChild className="w-full" variant="accent">
                  <Link href={product.href}>{product.price}</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
      <EditDialog
        isOpen={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        currentContent={content}
        onSave={updateContent}
        docPath={docPath}
      />
    </section>
  );
}

// --- Editing Dialog ---
interface EditDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  currentContent: FeaturedProductsSectionContent;
  onSave: (newContent: Partial<FeaturedProductsSectionContent>) => void;
  docPath: string;
}

function EditDialog({ isOpen, onOpenChange, currentContent, onSave, docPath }: EditDialogProps) {
  const [editedContent, setEditedContent] = useState(currentContent);

  // Sync state when dialog opens
  useEffect(() => {
    if (isOpen) {
      setEditedContent(currentContent);
    }
  }, [isOpen, currentContent]);

  const handleSave = () => {
    onSave(editedContent);
    onOpenChange(false);
  };
  
  const handleProductChange = (index: number, field: keyof Product, value: string) => {
    const newProducts = [...editedContent.products];
    newProducts[index] = { ...newProducts[index], [field]: value };
    setEditedContent(prev => ({ ...prev, products: newProducts }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Featured Products</DialogTitle>
          <DialogDescription>
            Update the title and manage the products displayed in this section.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div>
            <Label htmlFor="main-title">Section Title</Label>
            <Input
              id="main-title"
              value={editedContent.title}
              onChange={(e) =>
                setEditedContent({ ...editedContent, title: e.target.value })
              }
            />
          </div>
          <hr />
          <h3 className="text-lg font-medium">Products</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {editedContent.products.map((product, index) => (
              <div key={index} className="rounded-md border p-4 space-y-4">
                 <ImageUploader 
                    currentImageUrl={product.image}
                    onUploadComplete={url => handleProductChange(index, 'image', url)}
                    storagePath={`${docPath}/product-${index}`}
                />
                <div>
                  <Label>Name</Label>
                  <Input value={product.name} onChange={e => handleProductChange(index, 'name', e.target.value)} />
                </div>
                 <div>
                  <Label>Brand</Label>
                  <Input value={product.brand} onChange={e => handleProductChange(index, 'brand', e.target.value)} />
                </div>
                 <div>
                  <Label>Price Text</Label>
                  <Input value={product.price} onChange={e => handleProductChange(index, 'price', e.target.value)} />
                </div>
                 <div>
                  <Label>Link URL</Label>
                  <Input value={product.href} onChange={e => handleProductChange(index, 'href', e.target.value)} />
                </div>
              </div>
            ))}
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
