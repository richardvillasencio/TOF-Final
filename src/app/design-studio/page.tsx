import { loadPageContent, type PageSection } from '@/lib/content-loader';
import { HeroSection } from '@/components/page-sections/hero-section';
import { WhyChooseUsSection } from '@/components/page-sections/why-choose-us-section';
import { TestimonialsSection } from '@/components/page-sections/testimonials-section';
import { notFound } from 'next/navigation';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import type { ComponentProps } from 'react';

const componentMap: Record<string, React.ComponentType<any>> = {
  HeroSection,
  WhyChooseUsSection,
  TestimonialsSection,
};

function renderComponent(config: PageSection, index: number) {
  const Component = componentMap[config.component];
  if (!Component) {
    return null;
  }
  // Pass the entire props object from the config
  return <Component key={`${config.component}-${index}`} {...config.props} id={config.id} />;
}

export default async function DesignStudioPage() {
  const pageContent = await loadPageContent('design-studio');

  if (!pageContent || pageContent.length === 0) {
    // This will now only show if both Firestore and fallback fail, which is unlikely.
    return (
        <div className="container mx-auto px-4 py-16">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Content Unavailable</AlertTitle>
              <AlertDescription>
                We were unable to load the content for this page from both our database and local fallbacks. Please contact support. This may be due to a misconfigured database connection.
              </AlertDescription>
            </Alert>
        </div>
    )
  }

  return (
    <div className="flex flex-col" data-studio-id="design-studio-page-container" data-studio-id-mode="reorder">
      {pageContent.map((sectionConfig, index) => renderComponent(sectionConfig, index))}
    </div>
  );
}
