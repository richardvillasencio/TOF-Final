import { loadPageContent, type PageSection } from '@/lib/content-loader';
import { HeroSection } from '@/components/page-sections/hero-section';
import { FeaturedBrandsSection } from '@/components/page-sections/featured-brands-section';
import { ProductCollectionSection } from '@/components/page-sections/product-collection-section';
import { CtaSection } from '@/components/page-sections/cta-section';
import { notFound } from 'next/navigation';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import type { ComponentProps } from 'react';

const componentMap: Record<string, React.ComponentType<any>> = {
  HeroSection,
  FeaturedBrandsSection,
  ProductCollectionSection,
  CtaSection,
};

function renderComponent(config: PageSection, index: number) {
  const Component = componentMap[config.component];
  if (!Component) {
    return null;
  }
  return <Component key={`${config.component}-${index}`} {...config.props} id={config.id} />;
}


export default async function HotTubsPage() {
  const pageContent = await loadPageContent('hot-tubs');

  if (!pageContent || pageContent.length === 0) {
    return (
        <div className="container mx-auto px-4 py-16">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Content Unavailable</AlertTitle>
              <AlertDescription>
                 We were unable to load the content for this page. Please try again later. This may be due to a misconfigured database connection.
              </AlertDescription>
            </Alert>
        </div>
    )
  }

  return (
    <div className="flex flex-col" data-studio-id="hot-tubs-page-container" data-studio-id-mode="reorder">
      {pageContent.map((sectionConfig, index) => renderComponent(sectionConfig, index))}
    </div>
  );
}
