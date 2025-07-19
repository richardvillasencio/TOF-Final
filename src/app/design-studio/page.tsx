import { loadPageContent, type PageSection } from '@/lib/content-loader';
import { HeroSection } from '@/components/page-sections/hero-section';
import { WhyChooseUsSection } from '@/components/page-sections/why-choose-us-section';
import { TestimonialsSection } from '@/components/page-sections/testimonials-section';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

const componentMap: Record<string, React.ComponentType<any>> = {
  HeroSection,
  WhyChooseUsSection,
  TestimonialsSection,
};

function renderComponent(config: PageSection) {
  const Component = componentMap[config.component];
  if (!Component) {
    return null;
  }
  return <Component key={config.id} {...config.props} id={config.id} />;
}

export default async function DesignStudioPage() {
  const pageContent = await loadPageContent('design-studio');

  if (!pageContent || pageContent.length === 0) {
    return (
        <div className="container mx-auto px-4 py-16">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error Loading Content</AlertTitle>
              <AlertDescription>
                We were unable to load the content for the &apos;Design Studio&apos; page. Please ensure you have run the database seed command: `npm run seed`.
              </AlertDescription>
            </Alert>
        </div>
    )
  }

  return (
    <div data-studio-id="pages/design-studio/sections" data-studio-id-mode="reorder" className="flex flex-col">
      {pageContent.map((sectionConfig) => renderComponent(sectionConfig))}
    </div>
  );
}
