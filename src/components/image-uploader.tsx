
'use client';

import { useState, useCallback } from 'react';
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

  const handleFileChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setError(null);
    setUploading(true);
    
    const tempUrl = URL.createObjectURL(file);
    setLocalPreview(tempUrl);
    
    try {
      // Create a unique file name to avoid overwrites
      const fileName = `${Date.now()}_${file.name.replace(/\s+/g, '_')}`;
      const fileRef = ref(storage, `${storagePath}/${fileName}`);
      
      // Use await to ensure uploadBytes finishes before proceeding
      await uploadBytes(fileRef, file);
      
      const downloadURL = await getDownloadURL(fileRef);

      onUploadComplete(downloadURL);

    } catch (err: any) {
      console.error('Upload failed:', err);
      setError(`Upload failed: ${err.message || 'Please try again.'}`);
    } finally {
      // This will run regardless of success or failure
      setUploading(false);
      // Revoke the temporary URL
      URL.revokeObjectURL(tempUrl);
      // Clear the local preview so the component uses the new `currentImageUrl` prop
      setLocalPreview(null);
    }
  }, [onUploadComplete, storagePath]);
  
  const displayUrl = localPreview || currentImageUrl;

  return (
    <div className="space-y-4">
      <Label>{label}</Label>
      <div className="relative aspect-video w-full overflow-hidden rounded-md bg-muted">
        {displayUrl ? (
            <Image
                src={displayUrl}
                alt="Image preview"
                fill
                className="object-contain"
                key={displayUrl} 
                unoptimized // Useful for ensuring the latest image is fetched
            />
        ) : (
            <div className="flex items-center justify-center h-full w-full text-muted-foreground">
                No Image
            </div>
        )}
      </div>

      <div className="flex flex-col gap-4">
         <label
          htmlFor={`image-upload-${label.replace(/\s+/g, '-')}`}
          className={cn(
            buttonVariants({ variant: 'outline' }),
            'relative w-fit cursor-pointer flex items-center',
            uploading && 'pointer-events-none opacity-50'
          )}
        >
          <UploadCloud className="mr-2 h-4 w-4" />
          Change Image
          <Input
            id={`image-upload-${label.replace(/\s+/g, '-')}`}
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
