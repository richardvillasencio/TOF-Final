// src/components/layout/footer.tsx
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Facebook, Instagram, Youtube, Phone } from 'lucide-react';
import Image from 'next/image';
import { useEditableContent } from '@/hooks/use-editable-content';
import { type HeaderContent, headerContent as initialHeaderContent } from '@/lib/content/header';


const socialLinks = [
  { icon: Facebook, href: '#', name: 'Facebook' },
  { icon: Instagram, href: '#', name: 'Instagram' },
  { icon: Youtube, href: '#', name: 'YouTube' },
];

export function Footer() {
  const { content: headerContent } = useEditableContent<HeaderContent>({
    docPath: 'globals/header',
    initialContent: initialHeaderContent,
  });

  return (
    <footer className="bg-muted text-muted-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <Link href="/">
               <Image
                    src={headerContent.logoImageUrl}
                    alt="Company Logo"
                    width={200}
                    height={43}
                    className="object-contain"
                />
            </Link>
            <p className="text-sm">
              Your premier destination for relaxation and recreation. We offer top-quality hot tubs, swim spas, and more to enhance your lifestyle.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  <social.icon className="w-6 h-6" />
                  <span className="sr-only">{social.name}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg text-foreground">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/hot-tubs" className="hover:text-primary transition-colors">Hot Tubs</Link></li>
              <li><Link href="/swim-spas" className="hover:text-primary transition-colors">Swim Spas</Link></li>
              <li><Link href="/saunas" className="hover:text-primary transition-colors">Saunas</Link></li>
              <li><Link href="/service-repair" className="hover:text-primary transition-colors">Service & Repair</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          {/* Locations */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg text-foreground">Our Locations</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-foreground">Fargo, ND</h4>
                <p className="text-sm">1234 Main St, Fargo, ND 58103</p>
                <a href="tel:701-234-7727" className="text-sm flex items-center gap-2 mt-1 hover:text-primary transition-colors"><Phone size={14} /> (701) 234-7727</a>
              </div>
              <div>
                <h4 className="font-semibold text-foreground">Lakeville, MN</h4>
                <p className="text-sm">5678 Market Ave, Lakeville, MN 55044</p>
                <a href="tel:952-435-4096" className="text-sm flex items-center gap-2 mt-1 hover:text-primary transition-colors"><Phone size={14} /> (952) 435-4096</a>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg text-foreground">Stay Updated</h3>
            <p className="text-sm">Subscribe to our newsletter for the latest deals and news.</p>
            <form className="flex gap-2">
              <Input type="email" placeholder="Enter your email" className="bg-background" />
              <Button type="submit" variant="accent">Subscribe</Button>
            </form>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm">
          <p>&copy; {new Date().getFullYear()} TubClone. All Rights Reserved. A Fictional Website.</p>
        </div>
      </div>
    </footer>
  );
}
