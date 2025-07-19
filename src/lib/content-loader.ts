import 'server-only';
import { adminDb } from '@/lib/firebase';
import type { HeroSectionProps } from '@/components/page-sections/hero-section';
import type { WhyChooseUsSectionProps } from '@/components/page-sections/why-choose-us-section';
import type { TestimonialsSectionProps } from '@/components/page-sections/testimonials-section';
import { unstable_cache } from 'next/cache';

// Union type for all possible component configurations
export type ComponentConfig = HeroSectionProps | WhyChooseUsSectionProps | TestimonialsSectionProps;

/**
 * Fetches and returns the content for a specific page from Firestore.
 * Caches the result to minimize database reads.
 * @param page - The name of the page (e.g., 'design-studio') to fetch content for.
 * @returns A promise that resolves to an array of component configurations, or null if content cannot be fetched.
 */
export const loadPageContent = unstable_cache(
  async (page: string): Promise<ComponentConfig[] | null> => {
    console.log(`Fetching content for page: ${page}`);
    if (!adminDb) {
      console.error("Firestore is not initialized. Cannot fetch page content.");
      return null;
    }
    
    try {
      const contentCollection = adminDb.collection('pages').doc(page).collection('sections');
      const snapshot = await contentCollection.orderBy('order').get();

      if (snapshot.empty) {
        console.warn(`No content sections found for page: ${page}`);
        return [];
      }

      const content = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      } as ComponentConfig));

      return content;
    } catch (error) {
      console.error(`Error fetching content for page '${page}':`, error);
      // In a real app, you might want more robust error handling or logging
      return null;
    }
  },
  ['page-content'], // Cache key prefix
  {
    revalidate: 60, // Optional: revalidate the cache every 60 seconds
    tags: ['content'], // Optional: tag for on-demand revalidation
  }
);
