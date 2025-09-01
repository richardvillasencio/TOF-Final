
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const spaSeries = [
  {
    name: 'M Series™ Spas',
    tagline: 'Elite Class',
    description: "M Series™ spas combine intuitive functionality, gorgeous aesthetics, and the most versatile layouts ever seen in portable spas, together with Bullfrog Spas' legendary JetPak Therapy System™, to create the most elite spa experience available today. Enjoy JetPaks in all premium seat locations, Simplicity™ water care, multi-functional controls throughout the spa, smart sensor technology, and layouts designed to be enjoyed in a variety of positions by people of various sizes and body types.",
    image: {
      src: 'https://firebasestorage.googleapis.com/v0/b/tubclone.firebasestorage.app/o/BullfrogSpa%2FM%20SERIES%E2%84%A2%20SPAS.webp?alt=media&token=2c64a282-a2c9-436d-919f-2ceb8d763523',
      alt: 'Bullfrog M-Series Spa in a luxurious backyard setting',
      hint: 'luxury hot tub',
    },
    logo: 'https://firebasestorage.googleapis.com/v0/b/tubclone.firebasestorage.app/o/BullfrogSpa%2FM%20SERIES%20logo.webp?alt=media&token=23c07b49-258c-451f-a9a6-f4c305830d69',
    specs: {
      seats: '7-10',
      jetPaks: '4-7',
      models: '4',
      msrp: '$21,995-$27,495',
    },
    href: '/hot-tubs/bullfrog-spas/m-series',
  },
  {
    name: 'A Series™ Spas',
    tagline: 'Luxury Class',
    description: 'Available in three trim levels, the A Series is an advanced and stylish collection of premium hot tubs that set an elevated standard for luxury and performance. The elegantly styled A Series spas allow you to design your ultimate personal experience. Each trim level features the JetPak Therapy System™, a thoughtful mix of seat depths, improved seating ergonomics, headrests, and water features. The three trim level options truly raise the bar for maximum personalization of your hot tub.',
    image: {
      src: 'https://firebasestorage.googleapis.com/v0/b/tubclone.firebasestorage.app/o/BullfrogSpa%2FA%20SERIES%E2%84%A2%20SPAS.webp?alt=media&token=7d6c41cb-f7fb-4697-bdee-a105f97b2bff',
      alt: 'Bullfrog A-Series Spa on a clean patio',
      hint: 'modern hot tub',
    },
    logo: 'https://firebasestorage.googleapis.com/v0/b/tubclone.firebasestorage.app/o/a-series-logo.svg?alt=media&token=9629b35b-11c5-430c-99f5-74898de5973e',
    specs: {
      seats: '3-9',
      jetPaks: '2-7',
      models: '9',
      msrp: '$10,495-$24,995',
    },
    href: '#', // Placeholder link
  },
  {
    name: 'X Series™ Spas',
    tagline: 'Comfort Class',
    description: "X Series™ brings you the legendary engineering and reliability of Bullfrog Spas in a value-packed, comfort-class spa line. The remarkable set of features include the long-lasting, wood-free EnduraFrame™, the solid one-piece spa base, full-foam insulation, impressive lighting and water features, and superior-quality components, to create a luxurious spa experience that rivals competitors' high-end offerings but at a price you'll love. Discover X Series for yourself and enjoy the life-changing benefits.",
    image: {
      src: 'https://firebasestorage.googleapis.com/v0/b/tubclone.firebasestorage.app/o/BullfrogSpa%2FX%20SERIES%E2%84%A2%20SPAS.webp?alt=media&token=79cbac66-dbd2-4557-90fa-3fabecac17d4',
      alt: 'Bullfrog X-Series Spa in a backyard',
      hint: 'family hot tub',
    },
    logo: 'https://firebasestorage.googleapis.com/v0/b/tubclone.firebasestorage.app/o/x-series-logo.svg?alt=media&token=ac24c653-e96e-4734-92ca-49d799014bd6',
    specs: {
      seats: '3-8',
      jetPaks: 'N/A', // Not specified in OCR for this model
      models: '7',
      msrp: '$7,995-$13,995',
    },
    href: '#', // Placeholder link
  },
];

export default function BullfrogSpasPage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16">
        
        {/* Page Header */}
        <div className="text-center max-w-4xl mx-auto mb-12">
          <h2 className="text-primary font-semibold tracking-wider">BULLFROG SPAS</h2>
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mt-2">HOT TUB SELECTION</h1>
          <div className="w-24 h-1 bg-accent mx-auto my-6"></div>
          <p className="text-lg text-muted-foreground">
            Bullfrog Spas is a premium hot tub manufacturer that focuses on providing a customizable, high-quality, and innovative spa experience. The company was founded on the idea of offering a spa that can be tailored to individual needs, and they achieved this with their JetPak Therapy System™. This system allows users to customize their spa's jet configurations by swapping out different JetPaks, which each offer a variety of massage styles. Whether you want a deep tissue massage, a relaxing soak, or a gentle hydromassage, the flexibility of the JetPak system ensures that the spa experience meets your specific preferences.
          </p>
        </div>

        {/* Spa Series Sections */}
        <div className="space-y-16">
          {spaSeries.map((series) => (
            <div key={series.name} className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              
              {/* Image and Specs Column */}
              <div className="flex flex-col gap-4">
                <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src={series.image.src}
                    alt={series.image.alt}
                    fill
                    className="object-cover"
                    data-ai-hint={series.image.hint}
                  />
                </div>
                <Card className="bg-muted border-none shadow-sm">
                  <CardContent className="p-4 text-sm text-center">
                    <p><strong>Available Seats:</strong> {series.specs.seats}</p>
                    <p><strong>JetPaks:</strong> {series.specs.jetPaks}</p>
                    <p><strong>Spa Models:</strong> {series.specs.models}</p>
                    <p><strong>Starting MSRP:</strong> {series.specs.msrp}</p>
                  </CardContent>
                </Card>
              </div>

              {/* Details Column */}
              <div className="text-center md:text-left">
                <div className="relative h-16 w-48 mx-auto md:mx-0 mb-4">
                    <Image
                        src={series.logo}
                        alt={`${series.name} Logo`}
                        fill
                        className="object-contain"
                    />
                </div>
                <h3 className="text-3xl font-bold text-foreground">{series.name}</h3>
                <p className="text-xl text-muted-foreground mb-4">{series.tagline}</p>
                <p className="mb-6">{series.description}</p>
                <Button asChild size="lg">
                  <Link href={series.href}>Select {series.name.split(' ')[0]}</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Banner */}
        <div className="text-center mt-20 py-10 border-t border-b border-border">
          <p className="text-lg text-primary font-semibold">
            Experience the ultimate in personalized relaxation with Bullfrog Spas - where innovative design, powerful hydrotherapy, and customizable comfort come together to create the perfect spa experience, just for you.
          </p>
        </div>
      </div>
    </div>
  );
}
