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
  return <Component key={config.id} {...config.props} id={config.id} />;
}

export default async function AboutPage() {
  const pageContent = await loadPageContent('about');

  if (!pageContent || pageContent.length === 0) {
    return (
        <div className="container mx-auto px-4 py-16">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error Loading Content</AlertTitle>
              <AlertDescription>
                We were unable to load the content for the &apos;About&apos; page. Please ensure you have run the database seed command: `npm run seed`.
              </AlertDescription>
            </Alert>
        </div>
    )
  }

  return (
    <div data-studio-id="pages/about/sections" data-studio-id-mode="reorder" className="flex flex-col">
      {pageContent.map((sectionConfig, index) => renderComponent(sectionConfig, index))}
    </div>
  );
}
