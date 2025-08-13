// src/components/layout/footer.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';
import { Bubbles } from './bubbles';


export function Footer() {

  return (
    <footer className="relative bg-gradient-to-r from-[#33BFF3]/80 to-[#F36E0E]/80 text-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none z-0">
            <Bubbles />
        </div>
      {/* Main Footer Content */}
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Logo and About Section */}
            <div className="md:col-span-5 space-y-4">
              <Link href="/">
                  <Image src="https://storage.googleapis.com/msgsndr/Q8i1yKqsccON1uqGARTN/media/67f93f9a71384b7dddafb553.png" alt="Tubs of Fun Logo" width={200} height={50} className="object-contain" />
              </Link>
              <p className="text-sm max-w-md">
                Tubs of Fun! is a home and backyard leisure dealership committed to serving the residents of FARGO and SURROUNDING AREAS with quality products and services. We specialize in high-quality hot tubs, swim spas, above and in-ground swimming pool installations, saunas, and game room essentials.
              </p>
            </div>

            {/* Links and Hours Section */}
            <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div className="space-y-4">
                <h3 className="font-bold text-lg">SHOW ROOM HOURS</h3>
                <ul className="space-y-2 text-sm">
                  <li>Mon - Fri: 9:00 am - 6:00 pm</li>
                  <li>Sat: 9:00 am - 2:00 pm</li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-bold text-lg">SERVICE HOURS</h3>
                <ul className="space-y-2 text-sm">
                    <li>Mon - Fri: 8:00 am - 5:00 pm</li>
                    <li>Saturday and Sunday by appointment only.</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-lg">Contact info</h3>
                <ul className="space-y-2 text-sm">
                    <li>Main: (701) 234 0705</li>
                    <li>601 Main Ave W. West Fargo, ND 58708</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating Action Button */}
      <Button
        variant="default"
        size="icon"
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg bg-blue-600 hover:bg-blue-700 z-20"
      >
        <MessageSquare className="h-7 w-7" />
        <span className="sr-only">Chat</span>
      </Button>

      {/* Copyright Bar */}
      <div className="bg-gray-800 text-gray-400 py-3 relative z-10">
        <div className="container mx-auto px-4 text-center text-xs">
          <p>&copy; {new Date().getFullYear()} TubClone. All Rights Reserved. A Fictional Website.</p>
        </div>
      </div>
    </footer>
  );
}
