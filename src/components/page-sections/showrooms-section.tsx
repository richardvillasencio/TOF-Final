import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

type ButtonLink = {
  href: string;
  text: string;
};

export type ShowroomsSectionProps = {
  id: string;
  backgroundImage: string;
  backgroundHint: string;
  title: string;
  subtitle: string;
  button: ButtonLink;
};

export function ShowroomsSection({ id, backgroundImage, backgroundHint, title, subtitle, button }: ShowroomsSectionProps) {
  const docPath = `pages/home/sections/${id}`;
  return (
     <section data-studio-id={docPath} className="bg-cover bg-center text-white" style={{backgroundImage: `url('${backgroundImage}')`}} data-ai-hint={backgroundHint} data-studio-id-prop="backgroundImage">
       <div className="bg-primary/80 py-24 sm:py-32">
        <div className="container mx-auto px-4 text-center">
            <h2 data-studio-id={`${docPath}/props/title`} className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
            <p data-studio-id={`${docPath}/props/subtitle`} className="max-w-2xl mx-auto text-lg text-blue-100 mb-8">{subtitle}</p>
            <Button asChild size="lg" variant="accent" className="text-lg px-8 py-6">
              <Link href={button.href} data-studio-id={`${docPath}/props/button`}>{button.text} <ArrowRight className="ml-2 h-5 w-5"/></Link>
            </Button>
          </div>
       </div>
    </section>
  );
}
