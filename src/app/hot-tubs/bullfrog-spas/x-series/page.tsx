
'use client';

import Image from 'next/image';
import { FadeInOnScroll } from '@/components/animations/fade-in-on-scroll';
import { Check } from 'lucide-react';

const trimLevels = [
  {
    name: 'X Series Choice',
    image: 'https://firebasestorage.googleapis.com/v0/b/tubclone.firebasestorage.app/o/BullfrogSpa%2Fxseries%2FX%20Series.webp?alt=media&token=6a0c1c0e-74cf-4208-b79b-e6b2f3eaaf1f',
    dataAiHint: 'hot tub side',
    features: [
      'Premium interior lighting',
      'Choice standard interior lighting',
      'Choice standard jets (x series design)',
      'Choice standard pump-size norms',
    ]
  },
  {
    name: 'X Series Select',
    image: 'https://firebasestorage.googleapis.com/v0/b/tubclone.firebasestorage.app/o/BullfrogSpa%2Fxseries%2FX%20Series%20Select.png?alt=media&token=489e2f69-f831-4822-995b-7b1a1361732a',
    dataAiHint: 'hot tub side wood',
    features: [
      'Premium exterior lighting',
      'Select premium interior lighting',
      'Select premium Graphite w/ SS & Black finishes (x series design)',
      'Select premium size (ie: when available Series, jets are attached to horsepower)',
      'Premium touch-screen control',
    ]
  },
];

const xSeriesModels = [
  {
    name: 'X8',
    image: 'https://firebasestorage.googleapis.com/v0/b/tubclone.firebasestorage.app/o/BullfrogSpa%2Fxseries%2FX8.png?alt=media&token=82d2ce3f-e5d5-43f3-9ff3-abcff7b1ec29',
    dataAiHint: 'spa layout',
    specs: {
      seats: '8',
      jetCount: '44',
      dimensions: "7'10\" (2.39m) x 7'10\" (2.39m) x 38\" (.97m)",
    },
    description: "The X8 is the classic 8-person hot tub that has something for everyone. With varied seating depths and jet configurations, there's a favorite seat for people of all shapes and sizes. Enjoy the company of friends and family or simply relax on your own. The X8 provides the versatile hydrotherapy experience you're looking for, all at a price you'll love."
  },
  {
    name: 'X8L',
    image: 'https://firebasestorage.googleapis.com/v0/b/tubclone.firebasestorage.app/o/BullfrogSpa%2Fxseries%2FX8L.png?alt=media&token=1d2efe96-126a-439f-a707-f04cb2118a4b',
    dataAiHint: 'spa layout',
    specs: {
      seats: '6',
      jetCount: '45',
      dimensions: "7'10\" (2.39m) x 7'10\" (2.39m) x 38\" (.97m)",
    },
    description: "In addition to a playing-style open seating area, the spacious X8L includes a relaxing lounge seat. This variety gives you the flexibility you're looking for. Enjoy a rejuvenating soak in the targeted therapy seats or get a full-body massage in the lounge. The X8L is the ultimate hot tub for the person who wants it all, with a price you can afford."
  },
  {
    name: 'X7',
    image: 'https://firebasestorage.googleapis.com/v0/b/tubclone.firebasestorage.app/o/BullfrogSpa%2Fxseries%2FX7.png?alt=media&token=5463ec18-d731-482a-a9a3-d021f11e9f45',
    dataAiHint: 'spa layout',
    specs: {
      seats: '8',
      jetCount: '38',
      dimensions: "7'4\" (2.24m) x 7'4\" (2.24m) x 36\" (.91m)",
    },
    description: "Designed to be spacious, therapeutic, and comfortable, the X7 is a well-rounded hot tub with a variety of seating options. It comes with an assortment of jets that are perfectly aligned to massage your tired muscles. In comparison, the X7 is similar to the X8 but with a slightly smaller footprint. You will find that this spa is perfect for spending time with family and will be a great addition to your yard."
  },
  {
    name: 'X7L',
    image: 'https://firebasestorage.googleapis.com/v0/b/tubclone.firebasestorage.app/o/BullfrogSpa%2Fxseries%2FX7L.png?alt=media&token=b7ee9ae5-faf9-4bc7-8523-bc798d9f9adf',
    dataAiHint: 'spa layout',
    specs: {
      seats: '6',
      jetCount: '41',
      dimensions: "7'4\" (2.24m) x 7'4\" (2.24m) x 36\" (.91m)",
    },
    description: "When it comes to creating a tranquil environment in a home, there are few things that provide the immediate comfort and therapy like the X7L hot tub. With its comfortable lounge and premium captain seats, you and your guests can enjoy a variety of massages. Designed with eight seats, the X7L allows you to enjoy the company of friends and family or just get some much-needed alone time."
  },
  {
    name: 'X6L',
    image: 'https://firebasestorage.googleapis.com/v0/b/tubclone.firebasestorage.app/o/BullfrogSpa%2Fxseries%2FX6L.png?alt=media&token=9b88cf46-3472-4713-a79f-676bbe679a76',
    dataAiHint: 'spa layout',
    specs: {
      seats: '6',
      jetCount: '28',
      dimensions: "6'8\" (2.03m) x 7'4\" (2.24m) x 34\" (.86m)",
    },
    description: "For comprehensive hydrotherapy, the X6L is the ideal hot tub for recovery or for just relaxing. You can ease your muscles in the lounger after a long day or spend time with your loved ones in this compact, yet spacious, hot tub. Feel a sense of relief after a long evening relaxing with your family and friends."
  },
  {
    name: 'X6R',
    image: 'https://firebasestorage.googleapis.com/v0/b/tubclone.firebasestorage.app/o/BullfrogSpa%2Fxseries%2FX6R.png?alt=media&token=ecfed272-c384-4e4d-a80a-667816e300b0',
    dataAiHint: 'spa layout',
    specs: {
      seats: '6',
      jetCount: '21',
      dimensions: "dia. 6'6\" (1.98m) x 36\" (.91m)",
    },
    description: "The X6R is the new therapy experience from Bullfrog Spas. Ideal for enjoying a single life, but also for those family moments with children. Its circular shape will make it easier to fit into your backyard decor. Sit back comfortably in your spa and enjoy a state of maximum well being. Sit back comfortably in your spa and enjoy a state of maximum wellbeing, and create an aesthetically adaptable space for work."
  },
  {
    name: 'X5L',
    image: 'https://firebasestorage.googleapis.com/v0/b/tubclone.firebasestorage.app/o/BullfrogSpa%2Fxseries%2FX5L.png?alt=media&token=a42478e2-30e4-49ec-a9b0-e423fbba2771',
    dataAiHint: 'spa layout',
    specs: {
      seats: '4',
      jetCount: '21',
      dimensions: "5'8\" (1.73m) x 7' (2.13m) x 31\" (.79m)",
    },
    description: "If you're a person who wants to experience all the benefits of a hot tub, or enjoy a simple life with your loved ones, the X5L is the perfect spa for you. Compact and relaxing, this hot tub mobility allows you to create a comfortable space in your home without worrying about space. Sit down and enjoy a comfortable hydrotherapy session after the affordable hydrotherapy experience from your home available today."
  },
];

export default function XSeriesPage() {
  return (
    <div className="bg-white text-gray-800">

      {/* Hero Section */}
      <section className="relative w-full text-white text-center">
        <Image
          src="https://firebasestorage.googleapis.com/v0/b/tubclone.firebasestorage.app/o/BullfrogSpa%2Fxseries%2FBullfrog-Spas-2022-X-Series-Lifestyle-Couple-in-Spa-with-Dog-01-scaled.jpg?alt=media&token=86d70a4c-5353-43f6-93a8-4228c2e64627"
          alt="Couple relaxing in a Bullfrog X-Series Spa"
          width={1920}
          height={800}
          className="object-cover w-full h-auto max-h-[70vh]"
          priority
          data-ai-hint="couple relaxing spa"
        />
        <div className="w-full bg-[#4A555A] py-6">
          <FadeInOnScroll>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              X SERIES™
            </h1>
            <p className="text-lg text-gray-200">Comfort Class</p>
          </FadeInOnScroll>
        </div>
      </section>

      {/* Trim Levels Section */}
      <section className="bg-white py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <FadeInOnScroll>
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">X Series Trim Level Quick Comparison</h2>
             <p className="text-gray-600 leading-relaxed max-w-3xl mx-auto text-center mb-12">
                Built with a pleasing design you will love that provides you a better value. Enjoy the premium series. Select your Trim level and then customize with your choice of options, upgrades, and accessories.
            </p>
          </FadeInOnScroll>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12 max-w-4xl mx-auto">
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
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">X Series Spa Models</h2>
            <p className="text-center text-gray-500 mb-4">Models shown in newest Trim-Level Packages</p>
            <div className="w-24 h-1 bg-gray-300 mx-auto mb-12"></div>
          </FadeInOnScroll>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {xSeriesModels.map((model) => (
              <FadeInOnScroll key={model.name} className="flex flex-col text-center">
                <div className="mb-6">
                    <Image 
                        src={model.image}
                        alt={`Top-down view of the ${model.name} Spa layout`}
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
