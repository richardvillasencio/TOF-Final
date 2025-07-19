import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

type ButtonLink = {
  href: string;
  text: string;
};

export type CtaSectionProps = {
  id: string;
  title: string;
  subtitle: string;
  button: ButtonLink;
};

export function CtaSection({ id, title, subtitle, button }: CtaSectionProps) {
  return (
    <section data-studio-id={id} className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16 text-center">
          <h2 data-studio-id={`${id}/title`} className="text-3xl font-bold">{title}</h2>
          <p data-studio-id={`${id}/subtitle`} className="mt-2 mb-6 max-w-2xl mx-auto">{subtitle}</p>
          <Button asChild variant="accent" size="lg">
              <Link href={button.href}>{button.text} <ArrowRight className="ml-2 h-5 w-5"/></Link>
          </Button>
      </div>
    </section>
  );
}
