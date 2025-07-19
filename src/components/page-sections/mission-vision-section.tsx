import type { LucideProps } from 'lucide-react';
import type { ForwardRefExoticComponent, RefAttributes } from 'react';
import * as LucideIcons from 'lucide-react';

type Item = {
  icon: keyof typeof LucideIcons;
  title: string;
  description: string;
};

export type MissionVisionSectionProps = {
  id: string;
  items: Item[];
};

export function MissionVisionSection({ id, items }: MissionVisionSectionProps) {
  return (
    <section data-studio-id={id} className="py-16 sm:py-24 bg-muted">
      <div className="container mx-auto px-4">
        <div data-studio-id-mode="reorder" className="grid md:grid-cols-3 gap-8 text-center">
          {items.map((item, index) => {
             const IconComponent = LucideIcons[item.icon] as ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>> | undefined;
             return (
                <div key={index} data-studio-id={`${id}/items/${index}`} className="p-6">
                    {IconComponent && <IconComponent className="w-12 h-12 mx-auto text-primary mb-4" />}
                    <h3 data-studio-id={`${id}/items/${index}/title`} className="text-xl font-bold mb-2">{item.title}</h3>
                    <p data-studio-id={`${id}/items/${index}/description`} className="text-muted-foreground">{item.description}</p>
                </div>
             )
          })}
        </div>
      </div>
    </section>
  );
}
