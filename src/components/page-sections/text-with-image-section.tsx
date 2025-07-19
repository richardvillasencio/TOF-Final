import Image from 'next/image';

export type TextWithImageSectionProps = {
  id: string;
  title: string;
  paragraphs: string[];
  image: {
    src: string;
    alt: string;
    dataAiHint: string;
  };
  imagePosition: 'left' | 'right';
};

export function TextWithImageSection({ id, title, paragraphs, image, imagePosition }: TextWithImageSectionProps) {
  return (
    <section data-studio-id={id} className="py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <div className={`grid md:grid-cols-2 gap-12 items-center ${imagePosition === 'right' ? '' : 'md:grid-flow-col-dense'}`}>
          <div className={imagePosition === 'right' ? '' : 'md:col-start-2'}>
            <h2 data-studio-id={`${id}/title`} className="text-3xl font-bold mb-4">{title}</h2>
            <div data-studio-id-mode="reorder">
                {paragraphs.map((text, index) => (
                <p key={index} data-studio-id={`${id}/paragraphs/${index}`} className="text-muted-foreground mb-4">
                    {text}
                </p>
                ))}
            </div>
          </div>
          <div className={imagePosition === 'right' ? '' : 'md:col-start-1'}>
            <Image 
              src={image.src} 
              alt={image.alt} 
              width={600} 
              height={400} 
              className="rounded-lg shadow-xl" 
              data-ai-hint={image.dataAiHint}
              data-studio-id={`${id}/image/src`}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
