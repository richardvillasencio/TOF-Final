import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/product-card';
import { ArrowRight } from 'lucide-react';

const hotTubs = [
    { name: 'M-Series M9', category: 'Bullfrog Spas', imageUrl: 'https://placehold.co/600x400.png', imageHint: 'luxury spa night', href: '/hot-tubs/bullfrog-spas/m-series', price: 'Call for Price' },
    { name: 'Star Series Spa', category: 'QCA Spas', imageUrl: 'https://placehold.co/600x400.png', imageHint: 'round hot tub', href: '/hot-tubs/qca-spas/star', price: 'Call for Price' },
    { name: 'Model Ultra', category: 'Premium Series', imageUrl: 'https://placehold.co/600x400.png', imageHint: 'modern hot tub', href: '/hot-tubs/models/ultra', price: 'View Details' },
    { name: 'Model Aquarius', category: 'Premium Series', imageUrl: 'https://placehold.co/600x400.png', imageHint: 'family hot tub', href: '/hot-tubs/models/aquarius', price: 'View Details' },
    { name: 'Majestic Series Spa', category: 'QCA Spas', imageUrl: 'https://placehold.co/600x400.png', imageHint: 'patio spa', href: '/hot-tubs/qca-spas/majestic', price: 'Call for Price' },
    { name: 'Jewel Series Spa', category: 'QCA Spas', imageUrl: 'https://placehold.co/600x400.png', imageHint: 'compact hot tub', href: '/hot-tubs/qca-spas/jewel', price: 'Call for Price' },
    { name: 'Model Pisces', category: 'Premium Series', imageUrl: 'https://placehold.co/600x400.png', imageHint: 'relaxing spa', href: '/hot-tubs/models/pisces', price: 'View Details' },
];

export default function HotTubsPage() {
  return (
    <div>
      <section className="relative bg-cover bg-center py-24 sm:py-32" style={{ backgroundImage: "url('https://placehold.co/1920x600.png')" }} data-ai-hint="hot tub sunset">
         <div className="absolute inset-0 bg-black/50" />
         <div className="container mx-auto px-4 relative z-10 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold">Discover Your Perfect Hot Tub</h1>
          <p className="mt-4 text-lg max-w-3xl mx-auto">Melt away stress, soothe muscles, and reconnect with loved ones in your own backyard oasis.</p>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="pr-8">
                <p className="text-primary font-semibold mb-2">PREMIUM BRANDS</p>
                <h2 className="text-3xl font-bold mb-4">Featuring Bullfrog & QCA Spas</h2>
                <p className="text-muted-foreground mb-4">
                    We exclusively carry the most innovative and reliable brands in the industry. Bullfrog Spas offer the patented JetPak Therapy System™ for a personalized massage experience. QCA Spas are renowned for their quality craftsmanship and energy efficiency.
                </p>
                <div className="flex space-x-4">
                    <Button asChild>
                        <Link href="/hot-tubs/bullfrog-spas">Explore Bullfrog Spas</Link>
                    </Button>
                    <Button asChild variant="secondary">
                        <Link href="/hot-tubs/qca-spas">Explore QCA Spas</Link>
                    </Button>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <Image src="https://placehold.co/400x300.png" alt="Bullfrog Spas Logo" width={400} height={300} className="rounded-lg" data-ai-hint="brand logo"/>
                <Image src="https://placehold.co/400x300.png" alt="QCA Spas Logo" width={400} height={300} className="rounded-lg" data-ai-hint="brand logo 2"/>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Hot Tub Collection</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {hotTubs.map((tub) => (
              <ProductCard key={tub.name} {...tub} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-16 text-center">
            <h2 className="text-3xl font-bold">Ready to Upgrade Your Spa?</h2>
            <p className="mt-2 mb-6 max-w-2xl mx-auto">Explore our range of alterations and upgrades to enhance your spa experience.</p>
            <Button asChild variant="accent" size="lg">
                <Link href="/spa-upgrades">View Upgrades <ArrowRight className="ml-2 h-5 w-5"/></Link>
            </Button>
        </div>
      </section>
    </div>
  );
}
