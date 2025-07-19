"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';

type ButtonLink = {
  href: string;
  text: string;
};

export type HeroSectionProps = {
  id: string; 
  backgroundImage: string;
  backgroundHint: string;
  title: string;
  subtitle: string;
  buttons: {
    primary: ButtonLink;
    secondary: ButtonLink;
  };
};

export function HeroSection({ id, backgroundImage, backgroundHint, title, subtitle, buttons }: HeroSectionProps) {
  const pathname = usePathname();
  const pageSlug = pathname.substring(1) || 'home';
  const docPath = `pages/${pageSlug}/sections/${id}`;

  return (
    <section 
      data-studio-id={docPath}
      className="relative h-[60vh] md:h-[70vh] bg-cover bg-center" 
      style={{ backgroundImage: `url('${backgroundImage}')` }} 
      data-ai-hint={backgroundHint}
      data-studio-id-prop="backgroundImage"
    >
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white p-4">
        <h1 
          data-studio-id={`${docPath}/props/title`}
          className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white drop-shadow-lg"
        >
          {title}
        </h1>
        <p 
          data-studio-id={`${docPath}/props/subtitle`}
          className="mt-4 max-w-2xl text-lg md:text-xl text-gray-200 drop-shadow-md"
        >
          {subtitle}
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Button asChild size="lg" variant="accent" className="text-lg px-8 py-6">
            <Link href={buttons.primary.href} data-studio-id={`${docPath}/props/buttons/primary`}>{buttons.primary.text}</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="text-lg px-8 py-6 bg-transparent text-white border-white hover:bg-white hover:text-primary">
            <Link href={buttons.secondary.href} data-studio-id={`${docPath}/props/buttons/secondary`}>{buttons.secondary.text}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
