
'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FadeInOnScroll } from '@/components/animations/fade-in-on-scroll';

const xSeriesModels = [
  {
    name: 'X8',
    image: 'https://picsum.photos/300/300?random=11',
    alt: 'Top-down view of the X8 Spa layout',
    dataAiHint: 'spa layout',
    specs: {
      seats: 8,
      jetCount: 44,
      dimensions: "7'10\" (2.39m) x 7'10\" (2.39m) x 38\" (.97m)"
    },
    description: "The X8 is a spacious and comfortable hot tub perfect for families and entertaining. It offers a variety of seating options and a powerful jet system for a relaxing hydrotherapy experience."
  },
  {
    name: 'X7',
    image: 'https://picsum.photos/300/300?random=12',
    alt: 'Top-down view of the X7 Spa layout',
    dataAiHint: 'spa layout',
    specs: {
      seats: 7,
      jetCount: 38,
      dimensions: "7'4\" (2.24m) x 7'4\" (2.24m) x 36\" (.91m)"
    },
    description: "A popular model, the X7 provides a great balance of features and value. It includes a comfortable lounge seat and a variety of jets to target key muscle groups."
  },
  {
    name: 'X6L',
    image: 'https://picsum.photos/300/300?random=13',
    alt: 'Top-down view of the X6L Spa layout',
    dataAiHint: 'spa layout',
    specs: {
      seats: 6,
      jetCount: 28,
      dimensions: "6'8\" (2.03m) x 7'4\" (2.24m) x 34\" (.86m)"
    },
    description: "The X6L is designed for smaller spaces without sacrificing comfort. It features a lounge seat and provides a soothing hydrotherapy experience for up to 6 adults."
  },
  {
    name: 'X5L',
    image: 'https://picsum.photos/300/300?random=14',
    alt: 'Top-down view of the X5L Spa layout',
    dataAiHint: 'spa layout',
    specs: {
      seats: 4,
      jetCount: 21,
      dimensions: "5'8\" (1.73m) x 7' (2.13m) x 31\" (.79m)"
    },
    description: "The most compact spa in the X Series, the X5L is perfect for balconies and small patios. It's a great entry-level hot tub that still offers the quality and reliability of Bullfrog Spas."
  },
];

export default function XSeriesPage() {
  return (
    <div className="bg-white text-gray-800">

      {/* Hero Section */}
      <section className="relative w-full text-white text-center">
        <Image
          src="https://picsum.photos/1920/1080?random=15"
          alt="Friends enjoying a Bullfrog X-Series Spa"
          width={1920}
          height={1080}
          className="object-cover w-full h-auto"
          priority
          data-ai-hint="friends relaxing spa"
        />
        <div className="w-full bg-gray-800 py-6">
          <FadeInOnScroll>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              X SERIES™
            </h1>
            <p className="text-lg text-gray-300">Comfort Class</p>
          </FadeInOnScroll>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="bg-white py-16 sm:py-24">
        <div className="container mx-auto px-4 text-center">
            <FadeInOnScroll>
                <div className="aspect-w-16 aspect-h-9 mx-auto max-w-4xl rounded-lg overflow-hidden shadow-xl">
                  <iframe 
                    src="https://www.youtube.com/embed/gHB0YcNOscc" 
                    title="YouTube video player" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                </div>
                <p className="text-gray-600 leading-relaxed max-w-3xl mx-auto mt-8">
                    X Series™ spas offer the legendary engineering and reliability of Bullfrog Spas in a value-packed comfort-class line. Enjoy a luxurious spa experience at a price you'll love.
                </p>
            </FadeInOnScroll>
        </div>
      </section>

      {/* Spa Models Section */}
      <section className="bg-white pb-16 sm:pb-24">
        <div className="container mx-auto px-4">
          <FadeInOnScroll>
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">X Series™ Spa Models</h2>
            <div className="w-24 h-1 bg-gray-300 mx-auto mb-12"></div>
          </FadeInOnScroll>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {xSeriesModels.map((model) => (
              <FadeInOnScroll key={model.name} className="flex flex-col text-center">
                 <div className="mb-6">
                    <Image 
                        src={model.image}
                        alt={model.alt}
                        width={300}
                        height={300}
                        className="mx-auto"
                        data-ai-hint={model.dataAiHint}
                    />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{model.name}</h3>
                <div className="text-sm text-gray-600 font-semibold uppercase space-y-2 mb-4">
                  <p>AVAILABLE SEATS: {model.specs.seats}</p>
                  <p>JET COUNT: {model.specs.jetCount}</p>
                  <p>DIMENSIONS:<br/>{model.specs.dimensions}</p>
                </div>
                <p className="text-gray-600 mt-4 text-sm leading-relaxed text-left flex-grow">{model.description}</p>
              </FadeInOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white py-12 border-t border-b border-gray-200">
        <div className="container mx-auto px-4">
           <FadeInOnScroll>
            <div className="flex items-center justify-center gap-8">
                <Image
                    src="https://firebasestorage.googleapis.com/v0/b/tubclone.firebasestorage.app/o/tmpw_imh3fc.webp?alt=media&token=49a0cdfb-d711-4eea-a4b5-3713bc4da3be"
                    alt="Tubs of Fun Mascot"
                    width={150}
                    height={150}
                    className="flex-shrink-0"
                    data-ai-hint="company mascot"
                />
                <h3 className="text-2xl font-semibold text-gray-700">FOR MORE INFORMATION PLEASE DON'T HESITATE TO <br/>TALK WITH US IN THE CHATBOX!</h3>
            </div>
           </FadeInOnScroll>
        </div>
      </section>

      <section className="bg-gray-100 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600">
            Experience the ultimate in personalized relaxation with Bullfrog Spas—where innovative design, powerful hydrotherapy, and customizable comfort come together to create the perfect spa experience, just for you.
          </p>
        </div>
      </section>

    </div>
  );
}
