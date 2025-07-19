import type { LucideProps } from 'lucide-react';
import type { ForwardRefExoticComponent, RefAttributes } from 'react';
import * as LucideIcons from 'lucide-react';

type Feature = {
  icon: keyof typeof LucideIcons; // Icon name as a string
  title: string;
  description: string;
};

export type WhyChooseUsSectionProps = {
  id: string; // The document ID from Firestore
  component: 'WhyChooseUsSection';
  title: string;
  subtitle: string;
  features: Feature[];
};

export function WhyChooseUsSection({ id, title, subtitle, features }: WhyChooseUsSectionProps) {
  return (
    <section data-studio-id={id} className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto px-4">
        <h2 data-studio-id={`${id}/title`} className="text-3xl md:text-4xl font-bold text-center mb-4">{title}</h2>
        <p data-studio-id={`${id}/subtitle`} className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">{subtitle}</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {features.map((feature, index) => {
            const IconComponent = LucideIcons[feature.icon] as ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>> | undefined;
            return (
              <div key={index} className="p-6" data-studio-id={`${id}/features/${index}`}>
                {IconComponent && <IconComponent className="w-12 h-12 mx-auto text-primary mb-4" />}
                <h3 data-studio-id={`${id}/features/${index}/title`} className="text-xl font-bold mb-2">{feature.title}</h3>
                <p data-studio-id={`${id}/features/${index}/description`} className="text-muted-foreground">{feature.description}</p>
              </div>
            )
           })}
        </div>
      </div>
    </section>
  );
}
