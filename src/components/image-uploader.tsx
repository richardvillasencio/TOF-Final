
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { UploadCloud, AlertCircle } from 'lucide-react';
import { storage } from '@/lib/firebase/client';
import { cn } from '@/lib/utils';
import { buttonVariants } from './ui/button';

interface ImageUploaderProps {
  label: string;
  currentImageUrl: string;
  onUploadComplete: (url: string) => void;
  storagePath: string; // e.g., "globals/header"
}

export function ImageUploader({
  label,
  currentImageUrl,
  onUploadComplete,
  storagePath,
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [localPreview, setLocalPreview] = useState<string | null>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);
    
    const tempUrl = URL.createObjectURL(file);
    setLocalPreview(tempUrl);
    
    try {
        // Create a valid and unique storage path
        const fileName = `${Date.now()}_${file.name.replace(/\s+/g, '_')}`;
        const fileRef = ref(storage, `${storagePath}/${fileName}`);
        
        await uploadBytes(fileRef, file);
        const downloadURL = await getDownloadURL(fileRef);

        onUploadComplete(downloadURL);

    } catch (err: any) {
        console.error('Upload failed:', err);
        setError(`Upload failed: ${err.message || 'Please try again.'}`);
    } finally {
        setUploading(false);
        if (tempUrl) {
            URL.revokeObjectURL(tempUrl);
        }
        setLocalPreview(null); // Clear local preview to show the final URL from props
    }
  };
  
  const displayUrl = localPreview || currentImageUrl;

  return (
    <div className="space-y-4">
      <Label>{label}</Label>
      {displayUrl ? (
        <div className="relative aspect-video w-full overflow-hidden rounded-md bg-muted">
          <Image
            src={displayUrl}
            alt="Image preview"
            fill
            className="object-contain"
            key={displayUrl} 
            unoptimized // Useful for ensuring the latest image is fetched
          />
        </div>
      ) : (
        <div className="relative aspect-video w-full flex items-center justify-center rounded-md bg-muted text-muted-foreground">
            No Image
        </div>
      )}
      <div className="flex flex-col gap-4">
         <label
          htmlFor={`image-upload-${label}`}
          className={cn(
            buttonVariants({ variant: 'outline' }),
            'relative w-fit cursor-pointer flex items-center',
            uploading && 'pointer-events-none opacity-50'
          )}
        >
          <UploadCloud className="mr-2 h-4 w-4" />
          Change Image
          <Input
            id={`image-upload-${label}`}
            type="file"
            accept="image/*,image/svg+xml"
            className="sr-only"
            onChange={handleFileChange}
            disabled={uploading}
          />
        </label>
        
        {uploading && (
          <div className="w-full space-y-2">
            <Progress value={100} className="h-2 animate-pulse" />
            <p className="text-xs text-muted-foreground">Uploading...</p>
          </div>
        )}
      </div>

      {error && (
        <Alert variant="destructive" className="mt-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Upload Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}
