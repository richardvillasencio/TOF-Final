import { ContactForm } from '@/components/contact-form';

export type ContactFormSectionProps = {
  id: string;
  title: string;
  subtitle: string;
};

export function ContactFormSection({ id, title, subtitle }: ContactFormSectionProps) {
  return (
    <section data-studio-id={id} className="py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <h2 data-studio-id={`${id}/title`} className="text-3xl font-bold mb-2">{title}</h2>
        <p data-studio-id={`${id}/subtitle`} className="text-muted-foreground mb-6">{subtitle}</p>
        <ContactForm />
      </div>
    </section>
  );
}
