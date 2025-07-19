// A script to seed the Firestore database with initial page content.
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { adminDb } from '../src/lib/firebase';
import { homeContent } from '../src/lib/content/home';

async function seedDatabase() {
  if (!adminDb) {
    console.error('Firestore Admin DB is not initialized. Make sure your FIREBASE_SERVICE_ACCOUNT_KEY is set in .env.local');
    process.exit(1);
  }

  console.log('Starting to seed database...');

  // Seed the layout for the home page
  try {
    const homeLayoutRef = adminDb.collection('layouts').doc('homePage');
    const initialOrder = homeContent.map(section => section.id);
    await homeLayoutRef.set({ order: initialOrder });
    console.log("Successfully seeded layout for 'homePage'.");
  } catch (error) {
      console.error("Error seeding layout for 'homePage':", error);
  }

  // Seed the content for each section of the home page
  for (const section of homeContent) {
    try {
        const sectionRef = adminDb.collection('sectionContent').doc(section.id);
        await sectionRef.set(section.props);
        console.log(`  -> Successfully seeded content for section '${section.id}'`);
    } catch (error) {
        console.error(`Error seeding content for section '${section.id}':`, error);
    }
  }


  console.log('\nDatabase seeding completed.');
  process.exit(0);
}

seedDatabase().catch((error) => {
  console.error('An unexpected error occurred during seeding:', error);
  process.exit(1);
});
