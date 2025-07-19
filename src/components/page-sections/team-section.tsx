import Image from 'next/image';

type TeamMember = {
  name: string;
  role: string;
  image: string;
  dataAiHint: string;
};

export type TeamSectionProps = {
  id: string;
  title: string;
  members: TeamMember[];
};

export function TeamSection({ id, title, members }: TeamSectionProps) {
  return (
    <section data-studio-id={id} className="py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <h2 data-studio-id={`${id}/title`} className="text-3xl md:text-4xl font-bold text-center mb-12">{title}</h2>
        <div data-studio-id-mode="reorder" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {members.map((member, index) => (
            <div key={member.name} data-studio-id={`${id}/members/${index}`} className="text-center">
              <Image 
                src={member.image} 
                alt={member.name} 
                width={200} 
                height={200} 
                className="rounded-full mx-auto mb-4 shadow-lg" 
                data-ai-hint={member.dataAiHint}
                data-studio-id={`${id}/members/${index}/image`}
              />
              <h3 data-studio-id={`${id}/members/${index}/name`} className="text-lg font-bold">{member.name}</h3>
              <p data-studio-id={`${id}/members/${index}/role`} className="text-primary">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
