
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
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const displayUrl = previewUrl || currentImageUrl;

  useEffect(() => {
    // If the canonical URL from the database changes, clear the local preview
    setPreviewUrl(null);
  }, [currentImageUrl]);
  
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);
    setProgress(0);
    setPreviewUrl(URL.createObjectURL(file));


    try {
      // Simulate progress for better UX
      const progressInterval = setInterval(() => {
        setProgress((prev) => (prev >= 90 ? 90 : prev + 10));
      }, 200);

      const fileRef = ref(storage, `${storagePath}/${Date.now()}_${file.name}`);
      const uploadTask = await uploadBytes(fileRef, file);
      const downloadURL = await getDownloadURL(uploadTask.ref);

      clearInterval(progressInterval);
      setProgress(100);
      onUploadComplete(downloadURL); 
      setPreviewUrl(null); // Clear preview after successful upload
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
      {displayUrl && !uploading && (
        <div className="relative aspect-video w-full overflow-hidden rounded-md bg-muted">
          <Image
            src={displayUrl}
            alt="Image preview"
            fill
            className="object-contain"
            key={displayUrl} // Force re-render on change
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
