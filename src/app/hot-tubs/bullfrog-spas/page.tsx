
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const spaSeries = [
  {
    name: 'M Series™ Spas',
    tagline: 'Elite Class',
    description: "M Series™ spas combine intuitive functionality, gorgeous aesthetics, and the most versatile layouts ever seen in portable spas, together with Bullfrog Spas' legendary JetPak Therapy System™, to create the most elite spa experience available today. Enjoy JetPaks in all premium seat locations, Simplicity™ water care, multi-functional controls throughout the spa, smart sensor technology, and layouts designed to be enjoyed by people of various sizes and body types.",
    image: {
      src: 'https://firebasestorage.googleapis.com/v0/b/tubclone.firebasestorage.app/o/BullfrogSpa%2FM%20SERIES%E2%84%A2%20SPAS.webp?alt=media&token=2c64a282-a2c9-436d-919f-2ceb8d763523',
      alt: 'Bullfrog M-Series Spa in a luxurious backyard setting',
      hint: 'luxury hot tub',
    },
    logo: 'https://firebasestorage.googleapis.com/v0/b/tubclone.firebasestorage.app/o/BullfrogSpa%2FM%20SERIES%20logo.webp?alt=media&token=23c07b49-258c-451f-a9a6-f4c305830d69',
    specs: [
        { label: 'Available Seats', value: '7-10' },
        { label: 'JetPaks', value: '4-7' },
        { label: 'Spa Models', value: '4' },
        { label: 'Starting MSRP', value: '$21,995-$27,495' },
    ],
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
    logo: 'https://firebasestorage.googleapis.com/v0/b/tubclone.firebasestorage.app/o/BullfrogSpa%2FA%20SERIES%20logo.webp?alt=media&token=9b3285c9-d73d-4be5-93e4-2fec4ab6d1b3',
    specs: [
        { label: 'Available Seats', value: '3-9' },
        { label: 'JetPaks', value: '2-7' },
        { label: 'Spa Models', value: '9' },
        { label: 'Starting MSRP', value: '$10,495-$24,995' },
    ],
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
    logo: 'https://firebasestorage.googleapis.com/v0/b/tubclone.firebasestorage.app/o/BullfrogSpa%2FX%20SERIES%20logo.webp?alt=media&token=749c53a5-a3f8-4593-87c6-9b1a0bc15a43',
    specs: [
        { label: 'Available Seats', value: '3-8' },
        { label: 'Jet Count', value: '21-44' },
        { label: 'Spa Models', value: '7' },
        { label: 'Starting MSRP', value: '$7,995-$13,995' },
    ],
    href: '#', // Placeholder link
  },
];

export default function BullfrogSpasPage() {
  return (
    <div className="bg-white text-gray-800">
      
      {/* Hero Section */}
      <section className="w-full">
        <Image
          src="https://firebasestorage.googleapis.com/v0/b/tubclone.firebasestorage.app/o/Gallery%2Fcouple-in-spa-banner.webp?alt=media&token=8d76a0d3-35a9-466c-859a-14f7b4dc5a9c"
          alt="Couple relaxing in a Bullfrog Spa"
          width={1920}
          height={800}
          className="w-full h-auto object-cover max-h-[60vh]"
          data-ai-hint="couple relaxing spa"
          priority
        />
      </section>

      {/* Intro Section */}
      <section className="py-12 md:py-20 text-center container mx-auto px-4">
        <h2 className="text-xl font-semibold text-gray-500 tracking-widest">BULLFROG SPAS</h2>
        <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mt-2">HOT TUB SELECTION</h1>
        <p className="max-w-4xl mx-auto mt-6 text-gray-600 leading-relaxed">
            Bullfrog Spas is a premium hot tub manufacturer that focuses on providing a customizable, high-quality, and innovative spa experience. The company was founded on the idea of offering a spa that can be tailored to individual needs, and they achieved this with their JetPak Therapy System. This system allows users to customize their spa's jet configurations by swapping out different JetPaks, which each offer a variety of massage styles. Whether you want a deep tissue massage, a relaxing soak, or a gentle hydromassage, the flexibility of the JetPak system ensures that the spa experience meets your specific preferences.
        </p>
      </section>

      {/* Spa Series Sections */}
      <div className="bg-gray-50/70">
        <div className="container mx-auto px-4 py-16 sm:py-24 space-y-20">
          {spaSeries.map((series) => (
            <div key={series.name} className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
              
              {/* Image & Specs Column */}
              <div className="flex flex-col gap-4">
                <div className="relative w-full aspect-w-4 aspect-h-3">
                  <Image
                    src={series.image.src}
                    alt={series.image.alt}
                    fill
                    className="object-cover rounded-lg shadow-lg"
                    data-ai-hint={series.image.hint}
                  />
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-700">
                    {series.specs.map(spec => (
                        <div key={spec.label}>
                            <span className="font-bold">{spec.label}:</span> {spec.value}
                        </div>
                    ))}
                </div>
              </div>
              
              {/* Details Column */}
              <div className="flex flex-col justify-center text-center md:text-left items-center md:items-start">
                 <div className="relative h-20 w-40 mb-4">
                    <Image
                        src={series.logo}
                        alt={`${series.name} Logo`}
                        fill
                        className="object-contain"
                    />
                 </div>
                <h2 className="text-3xl font-bold text-gray-800">{series.name}</h2>
                <h3 className="text-primary text-xl font-semibold tracking-wider uppercase mt-1 mb-4">{series.tagline}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{series.description}</p>
                <Button asChild size="lg" className="bg-gray-800 hover:bg-gray-900 text-white shadow-lg transform hover:-translate-y-1 transition-transform px-10">
                  <Link href={series.href}>Select {series.name.split(' ')[0]}</Link>
                </Button>
              </div>

            </div>
          ))}
        </div>
      </div>

       {/* Final CTA Section */}
       <section className="py-12 bg-blue-50">
            <div className="container mx-auto px-4 text-center">
                <p className="text-lg text-gray-700 max-w-5xl mx-auto">
                    Experience the ultimate in personalized relaxation with Bullfrog Spas - where innovative design, powerful hydrotherapy, and customizable comfort come together to create the perfect spa experience, just for you.
                </p>
            </div>
       </section>

    </div>
  );
}
