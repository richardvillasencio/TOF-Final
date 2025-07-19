import { loadPageContent, type ComponentConfig } from '@/lib/content-loader';
import { HeroSection } from '@/components/page-sections/hero-section';
import { WhyChooseUsSection } from '@/components/page-sections/why-choose-us-section';
import { TestimonialsSection } from '@/components/page-sections/testimonials-section';
import { notFound } from 'next/navigation';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

// Map component names from the config to the actual components
const componentMap = {
  HeroSection,
  WhyChooseUsSection,
  TestimonialsSection,
};

function renderComponent(config: ComponentConfig, index: number) {
  const Component = componentMap[config.component];
  if (!Component) {
    // Optionally handle cases where a component name in the config is not found
    return null;
  }
  // @ts-expect-error - We trust the config to provide the correct props for the component
  return <Component key={`${config.component}-${index}`} {...config} />;
}

export default async function DesignStudioPage() {
  const pageContent = await loadPageContent('design-studio');

  if (!pageContent) {
    return (
        <div className="container mx-auto px-4 py-16">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error Loading Content</AlertTitle>
              <AlertDescription>
                Could not load page content from the database. This could be due to missing Firebase credentials on the server or a network issue. Please check your configuration.
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
