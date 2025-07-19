// A script to seed the Firestore database with initial page content.
import { adminDb } from '../src/lib/firebase';
import { designStudioContent } from '../src/lib/content/design-studio';
import { homeContent } from '../src/lib/content/home';
import { aboutContent } from '../src/lib/content/about';
import { contactContent } from '../src/lib/content/contact';
import { hotTubsContent } from '../src/lib/content/hot-tubs';
import type { PageSection as GenericPageSection } from '../src/lib/content-loader';

// A map of page slugs to their content arrays.
const pagesToSeed: Record<string, GenericPageSection[]> = {
  'design-studio': designStudioContent,
  'home': homeContent,
  'about': aboutContent,
  'contact': contactContent,
  'hot-tubs': hotTubsContent,
};

async function seedDatabase() {
  if (!adminDb) {
    console.error('Firestore Admin DB is not initialized. Make sure your FIREBASE_SERVICE_ACCOUNT_KEY is set in .env.local');
    process.exit(1);
  }

  console.log('Starting to seed database...');

  for (const [pageSlug, sections] of Object.entries(pagesToSeed)) {
    console.log(`\nSeeding content for page: '${pageSlug}'`);
    const pageRef = adminDb.collection('pages').doc(pageSlug);

    // Use a batched write to perform multiple operations atomically.
    const batch = adminDb.batch();

    for (const [index, section] of sections.entries()) {
      const { id, component, props } = section;
      const sectionRef = pageRef.collection('sections').doc(id);
      
      const dataToSet = {
        component,
        props,
        order: index, // Add an 'order' field to maintain the sequence.
      };

      batch.set(sectionRef, dataToSet);
      console.log(`  -> Queued section '${id}' with order ${index}`);
    }

    try {
      await batch.commit();
      console.log(`Successfully seeded ${sections.length} sections for page '${pageSlug}'.`);
    } catch (error) {
      console.error(`Error committing batch for page '${pageSlug}':`, error);
    }
  }

  console.log('\nDatabase seeding completed.');
  process.exit(0);
}

seedDatabase().catch((error) => {
  console.error('An unexpected error occurred during seeding:', error);
  process.exit(1);
});
