import Image from 'next/image';
import { Users, Target, Eye, ShieldCheck } from 'lucide-react';

const teamMembers = [
  { name: 'John Doe', role: 'Founder & CEO', image: 'https://placehold.co/400x400.png', dataAiHint: 'professional portrait man' },
  { name: 'Jane Smith', role: 'Head of Sales', image: 'https://placehold.co/400x400.png', dataAiHint: 'professional portrait woman' },
  { name: 'Mike Johnson', role: 'Lead Technician', image: 'https://placehold.co/400x400.png', dataAiHint: 'friendly worker' },
  { name: 'Emily Brown', role: 'Customer Relations', image: 'https://placehold.co/400x400.png', dataAiHint: 'customer service representative' },
];

export default function AboutPage() {
  return (
    <div>
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold">About TubClone</h1>
          <p className="mt-4 text-lg max-w-3xl mx-auto text-blue-100">Your trusted partner in home relaxation and recreation for over 20 years.</p>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Our Story</h2>
              <p className="text-muted-foreground mb-4">
                Founded in 2003, TubClone started as a small family business with a simple mission: to bring the joy and therapeutic benefits of hot tubs to our community. With a passion for quality and a commitment to our customers, we've grown to become the region's leading provider of hot tubs, swim spas, and backyard leisure products.
              </p>
              <p className="text-muted-foreground">
                From our humble beginnings in Fargo, we expanded to our second location in Lakeville to better serve our growing family of customers. Despite our growth, our core values remain the same: integrity, quality, and unparalleled customer service.
              </p>
            </div>
            <div>
              <Image src="https://placehold.co/600x400.png" alt="Family enjoying a hot tub" width={600} height={400} className="rounded-lg shadow-xl" data-ai-hint="company history family"/>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <Target className="w-12 h-12 mx-auto text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Our Mission</h3>
              <p className="text-muted-foreground">To enhance our customers' lives by providing high-quality relaxation and recreation products, backed by expert knowledge and exceptional service.</p>
            </div>
            <div className="p-6">
              <Eye className="w-12 h-12 mx-auto text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Our Vision</h3>
              <p className="text-muted-foreground">To be the most trusted and respected name in home and backyard leisure, creating lasting relationships with our customers and communities.</p>
            </div>
            <div className="p-6">
              <ShieldCheck className="w-12 h-12 mx-auto text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Our Commitment</h3>
              <p className="text-muted-foreground">We stand behind every product we sell, offering comprehensive warranties and a dedicated service team to ensure your peace of mind.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <div key={member.name} className="text-center">
                <Image src={member.image} alt={member.name} width={200} height={200} className="rounded-full mx-auto mb-4 shadow-lg" data-ai-hint={member.dataAiHint}/>
                <h3 className="text-lg font-bold">{member.name}</h3>
                <p className="text-primary">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
