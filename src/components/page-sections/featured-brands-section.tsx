import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

type Brand = {
    name: string;
    logoUrl: string;
    dataAiHint: string;
    href: string;
}

export type FeaturedBrandsSectionProps = {
    id: string;
    subtitle: string;
    title: string;
    description: string;
    brands: Brand[];
    buttons: {
        primary: { href: string; text: string };
        secondary: { href: string; text: string };
    }
};

export function FeaturedBrandsSection({ id, subtitle, title, description, brands, buttons }: FeaturedBrandsSectionProps) {
  return (
    <section data-studio-id={id} className="py-16 sm:py-24 bg-muted">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="pr-8">
            <p data-studio-id={`${id}/subtitle`} className="text-primary font-semibold mb-2">{subtitle}</p>
            <h2 data-studio-id={`${id}/title`} className="text-3xl font-bold mb-4">{title}</h2>
            <p data-studio-id={`${id}/description`} className="text-muted-foreground mb-4">
              {description}
            </p>
            <div className="flex space-x-4">
              <Button asChild>
                <Link href={buttons.primary.href} data-studio-id={`${id}/buttons/primary/text`}>{buttons.primary.text}</Link>
              </Button>
              <Button asChild variant="secondary">
                <Link href={buttons.secondary.href} data-studio-id={`${id}/buttons/secondary/text`}>{buttons.secondary.text}</Link>
              </Button>
            </div>
          </div>
          <div data-studio-id-mode="reorder" className="grid grid-cols-2 gap-4">
            {brands.map((brand, index) => (
                <Image 
                    key={brand.name}
                    src={brand.logoUrl} 
                    alt={`${brand.name} Logo`}
                    width={400} 
                    height={300} 
                    className="rounded-lg" 
                    data-ai-hint={brand.dataAiHint}
                    data-studio-id={`${id}/brands/${index}/logoUrl`}
                    data-studio-props='{ "logoUrl": "image" }'
                />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
