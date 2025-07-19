// src/hooks/use-editable-content.ts
'use client';

import { useState, useEffect, useCallback } from 'react';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { firestore } from '@/lib/firebase/client'; // Import client firestore

/**
 * A custom hook to manage editable content for a component,
 * fetching from and persisting to Firestore in real-time.
 */
export function useEditableContent<T>({
  collectionName,
  docId,
  initialContent,
}: {
  collectionName: string;
  docId: string;
  initialContent: T;
}) {
  const [content, setContent] = useState<T>(initialContent);
  const [loading, setLoading] = useState(true);
  
  // In a real app, this would come from an auth provider.
  // For this prototype, we'll assume the user is always authenticated.
  const isAuth = true; 

  const docRef = doc(firestore, collectionName, docId);

  useEffect(() => {
    if (!isAuth) {
      setLoading(false);
      return; // Don't fetch if not authenticated
    }

    const unsubscribe = onSnapshot(
      docRef,
      (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          // Merge with initial content to ensure all keys are present
          setContent(prev => ({ ...prev, ...data }));
        } else {
          // If no content exists in Firestore, save the initial content.
          setDoc(docRef, initialContent, { merge: true }).catch(error => {
              console.error("Failed to seed initial content:", error);
          });
          setContent(initialContent);
        }
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching content snapshot:', error);
        setLoading(false);
      }
    );

    // Cleanup the listener on component unmount
    return () => unsubscribe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collectionName, docId, isAuth]);

  /**
   * Updates the Firestore document with new content.
   * This performs a merge, so you can pass a partial object.
   */
  const updateContent = useCallback(async (newContent: Partial<T>) => {
    if (!isAuth) {
      console.warn('User is not authenticated. Cannot save content.');
      return;
    }
    try {
      await setDoc(docRef, newContent, { merge: true });
      // The onSnapshot listener will automatically update the local state.
    } catch (error) {
      console.error('Error saving content:', error);
    }
  }, [docRef, isAuth]);

  return {
    content,
    setContent,
    loading,
    isAuth,
    updateContent,
  };
}
