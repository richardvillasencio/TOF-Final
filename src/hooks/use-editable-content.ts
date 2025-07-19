// src/hooks/use-editable-content.ts
'use client';

import { useState, useEffect, useCallback } from 'react';
import { doc, onSnapshot, setDoc, getDoc } from 'firebase/firestore';
import { firestore } from '@/lib/firebase/client'; // Import client firestore

/**
 * A custom hook to manage editable content for a component,
 * fetching from and persisting to Firestore in real-time.
 */
export function useEditableContent<T>({
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

  // useCallback to memoize the docRef creation
  const getDocRef = useCallback(() => {
    // Ensure docPath is not empty to prevent Firebase errors
    if (!docPath) return null;
    return doc(firestore, docPath);
  }, [docPath]);

  useEffect(() => {
    if (!isAuth) {
      setLoading(false);
      return; // Don't fetch if not authenticated
    }

    const docRef = getDocRef();
    if (!docRef) {
      setLoading(false);
      console.error("useEditableContent: docPath is empty.");
      return;
    }

    const unsubscribe = onSnapshot(
      docRef,
      (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          // Merge with initial content to ensure all keys are present
          setContent(prev => ({ ...initialContent, ...data }));
        } else {
          // If no content exists in Firestore, create it.
          // This check ensures we only seed once.
          console.log(`Document at ${docPath} does not exist. Seeding with initial content.`);
          setDoc(docRef, initialContent, { merge: true }).catch(error => {
              console.error(`Failed to seed initial content for ${docPath}:`, error);
          });
          setContent(initialContent);
        }
        setLoading(false);
      },
      (error) => {
        console.error(`Error fetching content snapshot for ${docPath}:`, error);
        setContent(initialContent); // Fallback to initial content on error
        setLoading(false);
      }
    );

    // Cleanup the listener on component unmount
    return () => unsubscribe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [docPath, isAuth, getDocRef]); // getDocRef is memoized

  /**
   * Updates the Firestore document with new content.
   * This performs a merge, so you can pass a partial object.
   */
  const updateContent = useCallback(async (newContent: Partial<T>) => {
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
      // The onSnapshot listener will automatically update the local state.
    } catch (error) {
      console.error('Error saving content:', error);
    }
  }, [getDocRef, isAuth]);

  return {
    content,
    setContent,
    loading,
    isAuth,
    updateContent,
  };
}
