import { loadPageContent, type PageSection } from '@/lib/content-loader';
import { HeroSection } from '@/components/page-sections/hero-section';
import { TextWithImageSection } from '@/components/page-sections/text-with-image-section';
import { MissionVisionSection } from '@/components/page-sections/mission-vision-section';
import { TeamSection } from '@/components/page-sections/team-section';
import { notFound } from 'next/navigation';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import type { ComponentProps } from 'react';

const componentMap: Record<string, React.ComponentType<any>> = {
  HeroSection,
  TextWithImageSection,
  MissionVisionSection,
  TeamSection,
};

function renderComponent(config: PageSection, index: number) {
  const Component = componentMap[config.component];
  if (!Component) {
    return null;
  }
  return <Component key={`${config.component}-${index}`} {...config.props} id={config.id} />;
}

export default async function AboutPage() {
  const pageContent = await loadPageContent('about');

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
    <div className="flex flex-col" data-studio-id="about-page-container" data-studio-id-mode="reorder">
      {pageContent.map((sectionConfig, index) => renderComponent(sectionConfig, index))}
    </div>
  );
}
