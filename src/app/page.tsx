import { HeroSection } from '@/components/page-sections/hero-section';
import { FeaturedProductsSection } from '@/components/page-sections/featured-products-section';
import { WhyChooseUsSection } from '@/components/page-sections/why-choose-us-section';
import { TestimonialsSection } from '@/components/page-sections/testimonials-section';
import { ShowroomsSection } from '@/components/page-sections/showrooms-section';
import { loadPageContent, type PageSection } from '@/lib/content-loader';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

const componentMap: Record<string, React.ComponentType<any>> = {
  HeroSection,
  FeaturedProductsSection,
  WhyChooseUsSection,
  TestimonialsSection,
  ShowroomsSection,
};

function renderComponent(config: PageSection, index: number) {
  const Component = componentMap[config.component];
  if (!Component) {
    return null;
  }
  return <Component key={`${config.component}-${index}`} {...config.props} id={config.id} />;
}

export default async function Home() {
  const pageContent = await loadPageContent('home');

  if (!pageContent || pageContent.length === 0) {
    return (
        <div className="container mx-auto px-4 py-16">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Content Unavailable</AlertTitle>
              <AlertDescription>
                 We were unable to load the content for this page. Please try again later.
              </AlertDescription>
            </Alert>
        </div>
    )
  }

  return (
    <div className="flex flex-col">
      {pageContent.map((sectionConfig, index) => renderComponent(sectionConfig, index))}
    </div>
  );
}
