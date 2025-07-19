"use client";

import type { LucideProps } from 'lucide-react';
import type { ForwardRefExoticComponent, RefAttributes } from 'react';
import * as LucideIcons from 'lucide-react';
import { usePathname } from 'next/navigation';

type Feature = {
  icon: keyof typeof LucideIcons; // Icon name as a string
  title: string;
  description: string;
};

export type WhyChooseUsSectionProps = {
  id: string; // The document ID from Firestore
  title: string;
  subtitle: string;
  features: Feature[];
};

export function WhyChooseUsSection({ id, title, subtitle, features }: WhyChooseUsSectionProps) {
  const pathname = usePathname();
  // Determine page slug from pathname for constructing doc path
  const pageSlug = pathname.substring(1) || 'home';
  const docPath = `pages/${pageSlug}/sections/${id}`;

  return (
    <section data-studio-id={docPath} className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto px-4">
        <h2 data-studio-id={`${docPath}/title`} className="text-3xl md:text-4xl font-bold text-center mb-4">{title}</h2>
        <p data-studio-id={`${docPath}/subtitle`} className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">{subtitle}</p>
        <div data-studio-id={`${docPath}/features`} data-studio-id-mode="reorder" className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {features.map((feature, index) => {
            const IconComponent = LucideIcons[feature.icon] as ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>> | undefined;
            return (
              <div key={index} className="p-6" data-studio-id={`${docPath}/features/${index}`}>
                {IconComponent && <IconComponent className="w-12 h-12 mx-auto text-primary mb-4" />}
                <h3 data-studio-id={`${docPath}/features/${index}/title`} className="text-xl font-bold mb-2">{feature.title}</h3>
                <p data-studio-id={`${docPath}/features/${index}/description`} className="text-muted-foreground">{feature.description}</p>
              </div>
            )
           })}
        </div>
      </div>
    </section>
  );
}
