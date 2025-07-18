import { HeroSection } from '@/components/page-sections/hero-section';
import { FeaturedProductsSection } from '@/components/page-sections/featured-products-section';
import { WhyChooseUsSection } from '@/components/page-sections/why-choose-us-section';
import { TestimonialsSection } from '@/components/page-sections/testimonials-section';
import { ShowroomsSection } from '@/components/page-sections/showrooms-section';
import { homepageSections, type ComponentConfig } from '@/lib/content/homepage';

const componentMap = {
  HeroSection,
  FeaturedProductsSection,
  WhyChooseUsSection,
  TestimonialsSection,
  ShowroomsSection,
};

function renderComponent(config: ComponentConfig, index: number) {
  const Component = componentMap[config.component];
  if (!Component) {
    return null;
  }
  // @ts-expect-error - props are guaranteed to match component type by ComponentConfig
  return <Component key={`${config.component}-${index}`} {...config.props} />;
}

export default function Home() {
  return (
    <div className="flex flex-col">
      {homepageSections.map((sectionConfig, index) => renderComponent(sectionConfig, index))}
    </div>
  );
}
