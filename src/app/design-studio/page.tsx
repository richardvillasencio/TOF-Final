import { HeroSection } from '@/components/page-sections/hero-section';
import { WhyChooseUsSection } from '@/components/page-sections/why-choose-us-section';
import { TestimonialsSection } from '@/components/page-sections/testimonials-section';
import { designStudioSections, type ComponentConfig } from '@/lib/content/design-studio';

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
  return <Component key={`${config.component}-${index}`} {...config.props} />;
}

export default function DesignStudioPage() {
  return (
    <div className="flex flex-col">
      {/* 
        This page is rendered dynamically based on the `designStudioSections` array
        from `src/lib/content/design-studio.ts`. 
        
        To edit content, change images, or reorder sections,
        you only need to modify that file.
      */}
      {designStudioSections.map((sectionConfig, index) => renderComponent(sectionConfig, index))}
    </div>
  );
}
