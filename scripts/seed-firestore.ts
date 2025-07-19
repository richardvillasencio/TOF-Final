// A script to seed the Firestore database with initial page content.
import { adminDb } from '../src/lib/firebase';
import { designStudioContent } from '../src/lib/content/design-studio';
import { homeContent } from '../src/lib/content/home';
import type { PageSection as DesignStudioPageSection } from '../src/lib/content/design-studio';
import type { PageSection as HomePageSection } from '../src/lib/content/home';

// A map of page slugs to their content arrays.
const pagesToSeed: Record<string, (DesignStudioPageSection | HomePageSection)[]> = {
  'design-studio': designStudioContent,
  'home': homeContent,
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
