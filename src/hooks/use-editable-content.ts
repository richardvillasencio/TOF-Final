
// src/hooks/use-editable-content.ts
'use client';

import { useState, useEffect, useCallback } from 'react';
import { doc, onSnapshot, setDoc, getDoc } from 'firebase/firestore';
import { firestore } from '@/lib/firebase/client'; // Import client firestore

/**
 * A custom hook to manage editable content for a component,
 * fetching from and persisting to Firestore in real-time.
 */
export function useEditableContent<T extends object>({
  docPath,
  initialContent,
}: {
  docPath: string;
  initialContent: T;
}) {
  const [content, setContent] = useState<T>(initialContent);
  const [loading, setLoading] = useState(true);
  
  // In a real app, this would come from an auth provider.
  // For this prototype, we'll assume the user is always authenticated.
  const isAuth = true; 

  const getDocRef = useCallback(() => {
    if (!docPath) return null;
    return doc(firestore, docPath);
  }, [docPath]);

  useEffect(() => {
    if (!isAuth || !docPath) {
      setLoading(false);
      if (!docPath) console.error("useEditableContent: docPath is empty.");
      return;
    }

    const docRef = getDocRef();
    if (!docRef) return; // Should be covered by the check above, but for safety

    const unsubscribe = onSnapshot(
      docRef,
      (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          // Merge Firestore data with initial content to ensure all fields are present
          setContent(prev => ({ ...initialContent, ...data }));
        } else {
          // Document does not exist, so create it with the initial content
          console.log(`Document at ${docPath} does not exist. Seeding with initial content.`);
          setDoc(docRef, initialContent, { merge: true })
            .then(() => {
              // The listener will automatically pick up the new document,
              // but we can set content here to avoid a flicker.
              setContent(initialContent);
            })
            .catch(error => {
              console.error(`Failed to seed initial content for ${docPath}:`, error);
            });
        }
        setLoading(false);
      },
      (error) => {
        console.error(`Error fetching content snapshot for ${docPath}:`, error);
        setContent(initialContent); // Fallback to initial content on error
        setLoading(false);
      }
    );

    return () => unsubscribe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [docPath, isAuth]);

  const saveContent = useCallback(async (newContent: T) => {
    if (!isAuth) {
      console.warn('User is not authenticated. Cannot save content.');
      return;
    }
    const docRef = getDocRef();
    if (!docRef) {
        console.error("useEditableContent: docPath is empty, cannot update.");
        return;
    }
    try {
      await setDoc(docRef, newContent, { merge: true });
    } catch (error) {
      console.error('Error saving content:', error);
    }
  }, [getDocRef, isAuth]);

  return {
    content,
    setContent,
    loading,
    isAuth,
    saveContent,
  };
}
