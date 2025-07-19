
import 'server-only';
import { adminDb } from '@/lib/firebase';
import { unstable_cache } from 'next/cache';

// A generic "PageSection" type that can represent any of our section components.
// It includes the component name, its props, and a unique ID for reordering.
export type PageSection = {
  id: string;
  component: string;
  props: Record<string, any>;
};

// A map to dynamically import the fallback content.
const staticContentFallbacks: Record<string, () => Promise<{ default: PageSection[] }>> = {
  'home': () => import('@/lib/content/home').then(m => ({ default: m.homeContent })),
  'design-studio': () => import('@/lib/content/design-studio').then(m => ({ default: m.designStudioContent })),
};


/**
 * Fetches and returns the content for a specific page.
 * It first tries to fetch from Firestore. If Firestore is unavailable or has no content
 * for that page, it falls back to a local static content file.
 * Caches the result to minimize database reads and file system access.
 */
export const loadPageContent = unstable_cache(
  async (page: string): Promise<PageSection[] | null> => {
    // 1. Try to fetch from Firestore first
    if (adminDb) {
      try {
        console.log(`Fetching content for page: ${page} from Firestore`);
        const contentCollection = adminDb.collection('pages').doc(page).collection('sections');
        const snapshot = await contentCollection.orderBy('order').get();

        if (!snapshot.empty) {
          const content = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          } as PageSection));
          console.log(`Successfully fetched ${content.length} sections for page: ${page} from Firestore.`);
          return content;
        }
        console.warn(`No content found in Firestore for page: ${page}. Trying fallback.`);
      } catch (error) {
        console.error(`Error fetching from Firestore for page '${page}'. This might be a permissions issue or a problem with your service account key. Trying fallback.`, error);
      }
    } else {
      console.warn("Firestore Admin DB is not initialized. This is expected if FIREBASE_SERVICE_ACCOUNT_KEY is not set. Trying fallback.");
    }

    // 2. If Firestore fails or is empty, fall back to static content file
    try {
        const fallbackLoader = staticContentFallbacks[page];
        if (fallbackLoader) {
            console.log(`Loading fallback content for page: ${page}`);
            const contentModule = await fallbackLoader();
            return contentModule.default;
        } else {
            console.error(`No static fallback content found for page: ${page}`);
            return null;
        }
    } catch (error) {
        console.error(`Error loading fallback content for page '${page}':`, error);
        return null;
    }
  },
  ['page-content'], // Cache key prefix
  {
    revalidate: 60, // Optional: revalidate the cache every 60 seconds
    tags: ['content'], // Optional: tag for on-demand revalidation
  }
);
