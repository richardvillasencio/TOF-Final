
'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { FadeInOnScroll } from '@/components/animations/fade-in-on-scroll';
import { Check } from 'lucide-react';

const trimLevels = [
  {
    name: 'A Series Choice',
    image: 'https://firebasestorage.googleapis.com/v0/b/tubclone.firebasestorage.app/o/BullfrogSpa%2Faseries%2FA%20Series%20Choice.webp?alt=media&token=6c6fb5e2-fb98-455e-8a89-00ad8c5b2afb',
    dataAiHint: 'hot tub side',
    features: [
      'Choice standard 3-tone JetPaks',
      'Choice standard 3-tone headrests',
      'Choice standard interior lighting',
      'Choice standard exterior lighting',
      'Choice standard JetPak count',
      'Premium headrests',
      'Premium touch-screen control'
    ]
  },
  {
    name: 'A Series Choice w/ Luxury Pkg.',
    image: 'https://firebasestorage.googleapis.com/v0/b/tubclone.firebasestorage.app/o/BullfrogSpa%2Faseries%2FA%20Series%20Luxury%20Pkg..webp?alt=media&token=1e41ec55-30c5-4ba5-a713-b8e5dc05492f',
    dataAiHint: 'hot tub side wood',
    features: [
      'Select premium 2-tone cabinetry',
      'Select premium Tungsten metallic jet faces',
      'Premium interior lighting',
      'Premium exterior lighting',
      'Choice standard water feature',
      'Choice standard JetPak count',
      'Premium headrests',
      'Premium 2-function auxiliary controls (jets, lights)',
      'Premium touch-screen control'
    ]
  },
  {
    name: 'A Series Select',
    image: 'https://firebasestorage.googleapis.com/v0/b/tubclone.firebasestorage.app/o/BullfrogSpa%2Faseries%2FA%20Series%20Selc.webp?alt=media&token=4cb889c3-62c1-419a-b1c8-d57d9333e9fe',
    dataAiHint: 'hot tub side dark',
    features: [
      'Select premium 2-tone cabinetry',
      'Select premium Tungsten metallic jet faces',
      'Select premium JetPak insert design',
      'Premium interior lighting',
      'Premium exterior lighting',
      'Select premium water feature',
      'Max JetPak count',
      'Premium headrests',
      'Premium 2-function auxiliary controls (jets, lighting, water feature)',
      'Premium touch-screen control'
    ]
  }
];

const aSeriesModels = [
  { name: 'A9L', seats: 9, jetpaks: 7, dimensions: "9'4\" (2.84m) x 7'10\" (2.39m) x 38\" (.97m)" },
  { name: 'A8', seats: 8, jetpaks: 6, dimensions: "7'10\" (2.39m) x 7'10\" (2.39m) x 38\" (.97m)" },
  { name: 'A7', seats: 7, jetpaks: 5, dimensions: "7'4\" (2.24m) x 7'4\" (2.24m) x 36\" (.91m)" },
  { name: 'A7L', seats: 6, jetpaks: 5, dimensions: "7'4\" (2.24m) x 7'4\" (2.24m) x 36\" (.91m)" },
  { name: 'A8L', seats: 8, jetpaks: 6, dimensions: "7'10\" (2.39m) x 7'10\" (2.39m) x 38\" (.97m)" },
  { name: 'A6L', seats: 5, jetpaks: 4, dimensions: "6'8\" (2.03m) x 7'4\" (2.24m) x 34\" (.86m)" },
];

export default function ASeriesPage() {
  return (
    <div className="bg-white text-gray-800">

      {/* Hero Section */}
      <section className="relative w-full text-white text-center">
        <Image
          src="https://firebasestorage.googleapis.com/v0/b/tubclone.firebasestorage.app/o/BullfrogSpa%2Faseries%2FAseries.jpeg?alt=media&token=2a9cc36c-ca23-4e4d-8de4-f23dfc147526"
          alt="Man relaxing in a Bullfrog A-Series Spa"
          width={1920}
          height={800}
          className="object-cover w-full h-auto max-h-[70vh]"
          priority
          data-ai-hint="man relaxing spa"
        />
        <div className="w-full bg-[#007AB8] py-6">
          <FadeInOnScroll>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              A SERIES™
            </h1>
            <p className="text-lg text-gray-200">Luxury Class</p>
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
                    Engineered with the JetPak Therapy System, and outfitted with industry-best features and available in three trim and options packages to suit your lifestyle, the A Series™ sets an elevated standard for luxury, performance, efficiency, and personalization.
                </p>
            </FadeInOnScroll>
        </div>
      </section>

      {/* Trim Levels Section */}
      <section className="bg-white pb-16 sm:pb-24">
        <div className="container mx-auto px-4">
          <FadeInOnScroll>
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Trim Level Quick Comparison</h2>
            <div className="w-24 h-1 bg-gray-300 mx-auto mb-12"></div>
          </FadeInOnScroll>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {trimLevels.map((level) => (
              <FadeInOnScroll key={level.name} className="flex flex-col text-center">
                 <div className="mb-6 flex-shrink-0">
                    <Image 
                        src={level.image}
                        alt={`Bullfrog Spa ${level.name}`}
                        width={350}
                        height={233}
                        className="mx-auto"
                        data-ai-hint={level.dataAiHint}
                    />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">{level.name}</h3>
                <ul className="space-y-3 text-left text-sm text-gray-600 flex-grow">
                  {level.features.map(feature => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check className="w-4 h-4 mt-0.5 text-blue-600 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </FadeInOnScroll>
            ))}
          </div>
        </div>
      </section>
      
      {/* Spa Models Section */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <FadeInOnScroll>
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">A Series Spa Models</h2>
            <p className="text-center text-gray-500 mb-4">Models shown in newest Trim-Level Packages</p>
            <div className="w-24 h-1 bg-gray-300 mx-auto mb-12"></div>
          </FadeInOnScroll>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-12">
            {aSeriesModels.map((model) => (
              <FadeInOnScroll key={model.name} className="flex flex-col text-center">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{model.name}</h3>
                <div className="text-sm text-gray-600 font-semibold uppercase space-y-2 mb-4">
                  <p>AVAILABLE SEATS: {model.seats}</p>
                  <p>JETPAKS: {model.jetpaks}</p>
                  <p>DIMENSIONS:<br/>{model.dimensions}</p>
                </div>
              </FadeInOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-800 py-12">
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
                <h3 className="text-2xl font-semibold text-white">FOR MORE INFORMATION PLEASE DON'T HESITATE TO <br/>TALK WITH US IN THE CHATBOX!</h3>
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
