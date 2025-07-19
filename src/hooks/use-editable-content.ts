// src/hooks/use-editable-content.ts
'use client';

import { useState, useEffect, useCallback } from 'react';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

/**
 * A custom hook to manage editable content for a component,
 * fetching from and persisting to Firestore.
 *
 * Note: This hook is a placeholder for a real implementation with user authentication.
 * For this prototype, it simulates an authenticated user.
 * In a real app, you would replace `isAuth` with a check against a real auth provider.
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
  
  // Placeholder for real authentication. In this prototype, we'll assume the user is always authenticated.
  // In a real app, you would integrate your actual authentication provider here.
  const isAuth = true; 

  const db = getFirestore();
  const contentRef = doc(db, docPath);

  useEffect(() => {
    const fetchContent = async () => {
      if (!isAuth) {
        setLoading(false);
        return; // Don't fetch if not authenticated
      }
      try {
        const docSnap = await getDoc(contentRef);
        if (docSnap.exists()) {
          setContent(docSnap.data() as T);
        } else {
          // If no content exists in Firestore, save the initial content.
          await setDoc(contentRef, initialContent);
          setContent(initialContent);
        }
      } catch (error) {
        console.error('Error fetching content:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [docPath, isAuth, contentRef, initialContent]);

  const saveContent = useCallback(async (newContent: T) => {
    if (!isAuth) {
      console.warn('User is not authenticated. Cannot save content.');
      return;
    }
    try {
      await setDoc(contentRef, newContent, { merge: true });
      setContent(newContent); // Ensure local state is in sync
    } catch (error) {
      console.error('Error saving content:', error);
    }
  }, [contentRef, isAuth]);

  return {
    content,
    setContent,
    saveContent,
    loading,
    isAuth,
  };
}
