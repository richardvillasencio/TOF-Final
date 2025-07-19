
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
  
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);
    setProgress(0);

    try {
      // Simulate progress for better UX
      const interval = setInterval(() => {
        setProgress((prev) => (prev >= 90 ? 90 : prev + 10));
      }, 200);

      const fileRef = ref(storage, `${storagePath}/${Date.now()}_${file.name}`);
      const uploadTask = await uploadBytes(fileRef, file);
      const downloadURL = await getDownloadURL(uploadTask.ref);

      clearInterval(interval);
      setProgress(100);
      onUploadComplete(downloadURL); // This updates the parent state
    } catch (err) {
      console.error('Upload failed:', err);
      setError('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };
  
  return (
    <div className="space-y-4">
      <Label>{label}</Label>
      {currentImageUrl && !uploading && (
        <div className="relative aspect-video w-full overflow-hidden rounded-md bg-muted">
          <Image
            src={currentImageUrl}
            alt="Image preview"
            fill
            className="object-contain"
            key={currentImageUrl} // Add key to force re-render on change
          />
        </div>
      )}
      <div className="flex items-center gap-4">
        <Button asChild variant="outline" className="relative">
          <div>
            <UploadCloud className="mr-2 h-4 w-4" />
            Change Image
            <Input
              id={`image-upload-${label}`}
              type="file"
              accept="image/*"
              className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
              onChange={handleFileChange}
              disabled={uploading}
            />
          </div>
        </Button>
      </div>
      {uploading && (
        <div className="w-full">
          <Progress value={progress} className="h-2" />
          <p className="mt-1 text-xs text-muted-foreground">Uploading...</p>
        </div>
      )}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Upload Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}
