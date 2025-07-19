
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { UploadCloud, AlertCircle } from 'lucide-react';
import { storage } from '@/lib/firebase/client'; // Import client storage

interface ImageUploaderProps {
  label: string;
  currentImageUrl: string;
  onUploadComplete: (url: string) => void;
  storagePath: string; // e.g., 'page-sections/feature-grids'
}

export function ImageUploader({
  label,
  currentImageUrl,
  onUploadComplete,
  storagePath,
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentImageUrl);

  useEffect(() => {
    // When the canonical URL from the database changes, update the preview.
    setPreviewUrl(currentImageUrl);
  }, [currentImageUrl]);
  
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);
    setProgress(0);
    // Create a local URL for immediate preview. This is temporary.
    const localUrl = URL.createObjectURL(file);
    setPreviewUrl(localUrl);

    try {
      // Simulate progress for better UX as upload can be fast
      const progressInterval = setInterval(() => {
        setProgress((prev) => (prev >= 90 ? 90 : prev + 10));
      }, 200);

      const fileRef = ref(storage, `${storagePath}/${Date.now()}_${file.name}`);
      const uploadTask = await uploadBytes(fileRef, file);
      const downloadURL = await getDownloadURL(uploadTask.ref);

      clearInterval(progressInterval);
      setProgress(100);
      onUploadComplete(downloadURL); 
    } catch (err) {
      console.error('Upload failed:', err);
      setError('Upload failed. Please try again.');
    } finally {
      setUploading(false);
      if(localUrl) {
          URL.revokeObjectURL(localUrl);
      }
    }
  };
  
  return (
    <div className="space-y-4">
      <Label>{label}</Label>
      {previewUrl && (
        <div className="relative aspect-video w-full overflow-hidden rounded-md bg-muted">
          <Image
            src={previewUrl}
            alt="Image preview"
            fill
            className="object-contain"
            key={previewUrl} // Force re-render on change
          />
        </div>
      )}
      <div className="flex flex-col gap-4">
        <Button asChild variant="outline" className="relative w-fit">
          <label
            htmlFor={`image-upload-${label}`}
            className="flex cursor-pointer items-center"
          >
            <UploadCloud className="mr-2 h-4 w-4" />
            Change Image
            <Input
              id={`image-upload-${label}`}
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={handleFileChange}
              disabled={uploading}
            />
          </label>
        </Button>

        {uploading && (
          <div className="w-full space-y-2">
            <Progress value={progress} className="h-2" />
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
