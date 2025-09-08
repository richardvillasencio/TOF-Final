
'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
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
      <section className="relative h-[50vh] w-full flex items-end justify-center text-white text-center overflow-hidden">
        <Image
          src="https://firebasestorage.googleapis.com/v0/b/tubclone.firebasestorage.app/o/BullfrogSpa%2Fmseries%2Fmseriesbanner.png?alt=media&token=153fac53-56c5-4d35-8315-e9a9c21446f2"
          alt="Couple relaxing in a Bullfrog M-Series Spa"
          fill
          className="object-cover"
          priority
          data-ai-hint="couple relaxing spa"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="relative z-10 p-8 md:p-12 w-full bg-gray-800/70 backdrop-blur-sm">
          <FadeInOnScroll>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              M SERIES™
            </h1>
            <p className="text-lg text-gray-300">Elite Class</p>
          </FadeInOnScroll>
        </div>
      </section>

      {/* JetPak Therapy Section */}
      <section className="bg-white py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <FadeInOnScroll>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="text-center md:text-left">
                <h2 className="text-4xl font-bold text-gray-800 mb-4">JetPak Therapy System™</h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Combining captivating aesthetics with unmatched versatility and ease of use, M Series™ spas are the pathway to a peaceful body, peaceful mind, and peaceful home.
                </p>
                <div className="flex items-center gap-4 justify-center md:justify-start">
                   <div className="flex items-center gap-2">
                        <button className="p-1.5 rounded-full border border-gray-300 hover:bg-gray-100 disabled:opacity-50" disabled>
                            <ChevronLeft className="h-4 w-4 text-gray-500" />
                        </button>
                         <button className="p-1.5 rounded-full border border-gray-300 hover:bg-gray-100">
                            <ChevronRight className="h-4 w-4 text-gray-500" />
                        </button>
                   </div>
                   <div className="flex items-center gap-2">
                        <div className="w-8 h-1 bg-red-500 rounded-full"></div>
                        <div className="w-8 h-1 bg-gray-300 rounded-full"></div>
                        <div className="w-8 h-1 bg-gray-300 rounded-full"></div>
                   </div>
                </div>
              </div>
              <div className="flex justify-center">
                <Image
                  src="https://firebasestorage.googleapis.com/v0/b/tubclone.firebasestorage.app/o/BullfrogSpa%2Fjetpak-therapy.webp?alt=media&token=c199587a-b50a-48d5-b04f-124b81cd7097"
                  alt="Bullfrog Spas JetPak Therapy System"
                  width={500}
                  height={400}
                  className="object-contain"
                  data-ai-hint="spa jets"
                />
              </div>
            </div>
          </FadeInOnScroll>
        </div>
      </section>

      {/* Spa Models Section */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <FadeInOnScroll>
            <h2 className="text-3xl font-bold text-center text-primary mb-2">M Series™ Spa Models</h2>
            <div className="w-16 h-1 bg-accent mx-auto mb-12"></div>
          </FadeInOnScroll>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {mSeriesModels.map((model) => (
              <FadeInOnScroll key={model.name} className="flex flex-col">
                <Card className="flex flex-col flex-grow text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <Image 
                        src={model.image}
                        alt={model.alt}
                        width={300}
                        height={300}
                        className="mx-auto"
                        data-ai-hint={model.dataAiHint}
                      />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">{model.name}</h3>
                    <div className="text-sm text-gray-500 mt-4 space-y-1">
                      <p><b>AVAILABLE SEATS:</b> {model.specs.seats}</p>
                      <p><b>JETPAKS:</b> {model.specs.jetpaks}</p>
                      <p><b>DIMENSIONS:</b><br/>{model.specs.dimensions}</p>
                    </div>
                    <p className="text-gray-600 mt-4 text-sm leading-relaxed text-left flex-grow">{model.description}</p>
                  </CardContent>
                </Card>
              </FadeInOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-800 py-12">
        <div className="container mx-auto px-4 text-center">
            <h3 className="text-2xl font-semibold text-white">FOR MORE INFORMATION PLEASE DON&apos;T HESITATE TO</h3>
            <h3 className="text-2xl font-semibold text-white">TALK WITH US IN THE CHATBOX!</h3>
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

    

    