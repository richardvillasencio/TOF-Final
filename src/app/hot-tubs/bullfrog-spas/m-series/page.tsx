
'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FadeInOnScroll } from '@/components/animations/fade-in-on-scroll';

const mSeriesModels = [
  {
    name: 'M9',
    image: 'https://firebasestorage.googleapis.com/v0/b/tubclone.firebasestorage.app/o/BullfrogSpa%2FM%20SERIES%E2%84%A2%20SPAS%2FM9.webp?alt=media&token=c19b33a7-5421-4d37-8395-58e1c6622416',
    alt: 'Top-down view of the M9 Spa layout',
    dataAiHint: 'spa layout',
    specs: {
      seats: 10,
      jetpaks: 7,
      dimensions: "9'2\" (2.79m) x 7'10\" (2.39m) x 38\" (.97m)"
    },
    description: "Enjoy more space, more JetPak therapy options, more variety in seating options, more comfort, more simple water care, more intuitive operation, more lighting, and the most capacity of any spa its size. Combine all this with a stunning aesthetic sure to enhance your backyard environment (and more) and it all adds up: you simply get more of everything with the M9 spa by Bullfrog Spas."
  },
  {
    name: 'M8',
    image: 'https://firebasestorage.googleapis.com/v0/b/tubclone.firebasestorage.app/o/BullfrogSpa%2FM%20SERIES%E2%84%A2%20SPAS%2FM8.webp?alt=media&token=0b6016b8-648b-4b2a-89aa-e0bf79bb5037',
    alt: 'Top-down view of the M8 Spa layout',
    dataAiHint: 'spa layout',
    specs: {
      seats: 8,
      jetpaks: 6,
      dimensions: "7'10\" (2.39m) x 7'10\" (2.39m) x 38\" (.97m)"
    },
    description: "With the most flexible seating array ever offered in a spa this size you’re sure to love stretching out, lounging, splashing with the kids, sitting up for a chat, or simply closing your eyes and escaping the world, all in the same place, your M8 hot tub. Combine this amazing versatility with simple water care, easy operation, not to mention the gorgeous design, and you may never want to leave your new M8 by Bullfrog Spas."
  },
  {
    name: 'M7',
    image: 'https://firebasestorage.googleapis.com/v0/b/tubclone.firebasestorage.app/o/BullfrogSpa%2FM%20SERIES%E2%84-A2%20SPAS%2FM7.webp?alt=media&token=1e52467d-9488-466d-9686-218f4a35cd3c',
    alt: 'Top-down view of the M7 Spa layout',
    dataAiHint: 'spa layout',
    specs: {
      seats: 9,
      jetpaks: 5,
      dimensions: "7'7\" (2.31m) x 7'7\" (2.31m) x 37\" (.94m)"
    },
    description: "Enjoy two first-of-their-kind Adirondack-inspired premium therapy seats. The incredible double JetPak love seat, or any of several other comfortable and versatile seating options in your new M7 hot tub. With intuitive controls, simple water care, the renowned JetPak Therapy System, amazing aesthetics, and more, all in a mid-size footprint, your M7 by Bullfrog Spas will absolutely delight."
  },
  {
    name: 'M6',
    image: 'https://firebasestorage.googleapis.com/v0/b/tubclone.firebasestorage.app/o/BullfrogSpa%2FM%20SERIES%E2%84-A2%20SPAS%2FM6.webp?alt=media&token=b71c7752-bfb2-4d2b-b6fd-8d297d025175',
    alt: 'Top-down view of the M6 Spa layout',
    dataAiHint: 'spa layout',
    specs: {
      seats: 7,
      jetpaks: 4,
      dimensions: "7'7\" (2.31m) x 6'8\" (2.03m) x 34\" (.86m)"
    },
    description: "Take a deep breath and unwind in this premium-level, space-saving spa. You'll treasure the experience of your four custom-chosen JetPaks, which are backed up by two therapy pumps—offering the ultimate in powerful hydrotherapy. This luxury spa is fitted with a multi-function auxiliary control and includes more seating and premium features than any space-saving spa on the market."
  },
];

export default function MSeriesPage() {
  return (
    <div className="bg-white text-gray-800">

      {/* Hero Section */}
      <section className="relative w-full text-white text-center">
        <Image
          src="https://firebasestorage.googleapis.com/v0/b/tubclone.firebasestorage.app/o/BullfrogSpa%2Fmseries%2Fmseriesbanner.png?alt=media&token=153fac53-56c5-4d35-8315-e9a9c21446f2"
          alt="Man relaxing in a Bullfrog M-Series Spa"
          width={1920}
          height={1080}
          className="object-cover w-full h-auto"
          priority
          data-ai-hint="man relaxing spa"
        />
        <div className="w-full bg-gray-800 py-6">
          <FadeInOnScroll>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              M SERIES™
            </h1>
            <p className="text-lg text-gray-300">Elite Class</p>
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
                    Combining captivating aesthetics with unmatched versatility and ease of use, M Series™ spas are the pathway to a peaceful body, peaceful mind, and peaceful home.
                </p>
            </FadeInOnScroll>
        </div>
      </section>

      {/* Spa Models Section */}
      <section className="bg-white pb-16 sm:pb-24">
        <div className="container mx-auto px-4">
          <FadeInOnScroll>
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">M Series™ Spa Models</h2>
            <div className="w-24 h-1 bg-gray-300 mx-auto mb-12"></div>
          </FadeInOnScroll>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {mSeriesModels.map((model) => (
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
                  <p>JETPAKS: {model.specs.jetpaks}</p>
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
