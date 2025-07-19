import { useState } from 'react';
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
  currentImageUrl: string;
  onUploadComplete: (url: string) => void;
  storagePath: string; // e.g., 'page-sections/feature-grids'
}

export function ImageUploader({
  currentImageUrl,
  onUploadComplete,
  storagePath,
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentImageUrl);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);
    setProgress(0);

    // Show a local preview immediately
    const reader = new FileReader();
    reader.onload = (e) => setPreviewUrl(e.target?.result as string);
    reader.readAsDataURL(file);

    try {
      const fileRef = ref(storage, `${storagePath}/${Date.now()}_${file.name}`);
      const uploadTask = await uploadBytes(fileRef, file);
      const downloadURL = await getDownloadURL(uploadTask.ref);

      onUploadComplete(downloadURL);
      setPreviewUrl(downloadURL); // Update preview to the final URL
      setProgress(100);
    } catch (err) {
      console.error('Upload failed:', err);
      setError('Upload failed. Please try again.');
      setPreviewUrl(currentImageUrl); // Revert to original image on error
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Label>Main Image</Label>
      {previewUrl && (
        <div className="relative aspect-video w-full overflow-hidden rounded-md">
          <Image
            src={previewUrl}
            alt="Current feature grid"
            fill
            className="object-cover"
          />
        </div>
      )}
      <div className="flex items-center gap-4">
        <Button asChild variant="outline" className="relative">
          <div>
            <UploadCloud className="mr-2 h-4 w-4" />
            Change Image
            <Input
              id="image-upload"
              type="file"
              accept="image/*"
              className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
              onChange={handleFileChange}
              disabled={uploading}
            />
          </div>
        </Button>
        {uploading && (
          <div className="w-full">
            <Progress value={progress} className="h-2" />
            <p className="mt-1 text-xs text-muted-foreground">Uploading...</p>
          </div>
        )}
      </div>
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
