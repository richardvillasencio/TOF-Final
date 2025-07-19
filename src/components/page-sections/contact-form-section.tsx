import { ContactForm } from '@/components/contact-form';

export type ContactFormSectionProps = {
  id: string;
  title: string;
  subtitle: string;
};

export function ContactFormSection({ id, title, subtitle }: ContactFormSectionProps) {
  const docPath = `pages/contact/sections/${id}`;
  return (
    <section data-studio-id={docPath} className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto px-4">
        <h2 data-studio-id={`${docPath}/props/title`} className="text-3xl font-bold mb-2 text-center">{title}</h2>
        <p data-studio-id={`${docPath}/props/subtitle`} className="text-muted-foreground mb-12 text-center max-w-2xl mx-auto">{subtitle}</p>
        <div className="max-w-3xl mx-auto">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
