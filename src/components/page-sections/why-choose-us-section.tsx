import type { LucideProps } from 'lucide-react';
import type { ForwardRefExoticComponent, RefAttributes } from 'react';

type Feature = {
  Icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
  title: string;
  description: string;
};

export type WhyChooseUsSectionProps = {
  title: string;
  subtitle: string;
  features: Feature[];
};

export function WhyChooseUsSection({ title, subtitle, features }: WhyChooseUsSectionProps) {
  return (
    <section className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">{title}</h2>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">{subtitle}</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {features.map((feature, index) => (
            <div key={index} className="p-6">
              <feature.Icon className="w-12 h-12 mx-auto text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
