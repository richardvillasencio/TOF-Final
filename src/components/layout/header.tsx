// src/components/layout/header.tsx
// Step 3: Integrate the Bubbles component and apply the final styles to the Header.
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent,
  MenubarTrigger,
} from '@/components/ui/menubar';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

import { type NavLink, type HeaderContent, headerContent } from '@/lib/content/header';
import { cn } from '@/lib/utils';
import { useState } from 'react';
// We import the Bubbles component we just created.
import { Bubbles } from './bubbles';


export function Header() {
  
  return (
    // Here we apply the core styling for the header:
    // - `bg-gradient-to-r...`: This creates the beautiful blue-to-orange gradient.
    // - `sticky top-0 z-50`: This makes the header stick to the top of the screen on scroll.
    // - `backdrop-blur-lg`: This adds the frosted-glass effect to blur content behind it.
    <header className="bg-gradient-to-r from-[#33BFF3]/80 to-[#F36E0E]/80 text-white shadow-md sticky top-0 z-50 backdrop-blur-lg">
      {/* We place the Bubbles component inside a container with `overflow-hidden`.
          This ensures the bubbles are contained within the header and don't spill out. */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <Bubbles />
      </div>

      {/* Top Bar - relative z-10 makes sure it sits on top of the bubbles */}
      <div className="py-2 border-b border-white/20 relative z-10">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
            <div className="flex items-center gap-2 md:gap-4">
                 <Image src={headerContent.veteranOwnedLogoUrl} alt="Veteran Owned Business" width={60} height={60} className="w-12 h-12 md:w-20 md:h-20" />
                 <div className='flex flex-col'>
                    <div className="flex items-center gap-2">
                        <Phone size={16} />
                        <span>{headerContent.phoneNumber}</span>
                    </div>
                    <div className="hidden md:flex items-center gap-2">
                        <MapPin size={16} />
                        <span>{headerContent.address}</span>
                    </div>
                 </div>
            </div>
            <div className="hidden lg:flex items-center space-x-4">
                <DesktopNav links={headerContent.topNavLinks || []} />
                 <Link href="/">
                    <Image src={headerContent.mascotImageUrl} alt="Special Offer" width={40} height={40} />
                </Link>
            </div>
             <div className="flex items-center gap-2 lg:hidden">
                <MobileNav topNavLinks={headerContent.topNavLinks || []} mainNavLinks={headerContent.mainNavLinks || []} />
            </div>
        </div>
      </div>

      {/* Main Navigation - relative z-10 makes sure it sits on top of the bubbles */}
      <div className="container mx-auto px-4 flex justify-between items-center py-2 relative z-10">
          <Link href="/" aria-label="TubClone Home">
              <Image
                  src={headerContent.logoImageUrl}
                  alt="Company Logo"
                  width={200}
                  height={51}
                  className="object-contain"
                  priority
              />
          </Link>
          
          <div className="hidden lg:flex items-center space-x-2">
            <DesktopNav links={headerContent.mainNavLinks || []} isMain />
          </div>

          <div className="lg:hidden flex items-center gap-2">
            {/* Mobile nav trigger is now in the top bar */}
          </div>
      </div>
    </header>
  );
}

const DesktopNav = ({ links, isMain }: { links: NavLink[], isMain?: boolean }) => {
  const pathname = usePathname();

  const renderSubLinks = (subLinks: NavLink[]) => (
    <MenubarContent className="bg-background text-foreground">
      {subLinks.map((subLink) =>
        subLink.subLinks && subLink.subLinks.length > 0 ? (
          <MenubarSub key={subLink.id}>
            <MenubarSubTrigger
              className={cn(
                'flex justify-between w-full',
                pathname.startsWith(subLink.href) && 'bg-accent/10'
              )}
            >
              {subLink.label} <ChevronDown className="h-4 w-4 transform -rotate-90" />
            </MenubarSubTrigger>
            <MenubarSubContent className="bg-background text-foreground">
              {renderSubLinks(subLink.subLinks)}
            </MenubarSubContent>
          </MenubarSub>
        ) : (
          <MenubarItem key={subLink.id} asChild>
            <Link href={subLink.href} className={cn(pathname === subLink.href && 'font-bold')}>
              {subLink.label}
            </Link>
          </MenubarItem>
        )
      )}
    </MenubarContent>
  );

  return (
    <Menubar className="border-none bg-transparent p-0">
      {links.map((link) =>
        (
          <MenubarMenu key={link.id}>
            <MenubarTrigger asChild>
               <Button
                asChild
                variant="ghost"
                className={cn(
                  'font-semibold text-white uppercase',
                   isMain ? 'text-base' : 'text-sm',
                  pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
                    ? 'bg-white/20'
                    : '',
                  'hover:bg-white/20 hover:text-white'
                )}
              >
                <Link href={link.href}>
                  {link.label}
                  {link.subLinks && link.subLinks.length > 0 && <ChevronDown className="h-4 w-4 ml-1" />}
                </Link>
              </Button>
            </MenubarTrigger>
            {link.subLinks && link.subLinks.length > 0 && renderSubLinks(link.subLinks)}
          </MenubarMenu>
        )
      )}
    </Menubar>
  );
};

const MobileNav = ({ topNavLinks, mainNavLinks }: { topNavLinks: NavLink[], mainNavLinks: NavLink[]}) => {
  const [isOpen, setIsOpen] = useState(false);
  const allNavLinks = [...mainNavLinks, ...topNavLinks.filter((l) => l.href !== '/')];

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 hover:text-white">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full max-w-sm p-0 bg-background text-foreground">
        <SheetHeader className="p-4 border-b flex flex-row justify-between items-center">
           <Link href="/" onClick={() => setIsOpen(false)}>
              <Image
                  src={headerContent.logoImageUrl}
                  alt="Company Logo"
                  width={150}
                  height={30}
                  className="object-contain"
              />
          </Link>
          <SheetTitle className="sr-only">Mobile Navigation Menu</SheetTitle>
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
            <X className="h-6 w-6" />
            <span className="sr-only">Close menu</span>
          </Button>
        </SheetHeader>
        <div className="flex flex-col h-full overflow-y-auto p-4">
          <MobileNavLinks links={allNavLinks} onLinkClick={() => setIsOpen(false)} />
        </div>
      </SheetContent>
    </Sheet>
  );
};

const MobileNavLinks = ({ links, onLinkClick }: { links: NavLink[]; onLinkClick: () => void }) => {
  const pathname = usePathname();

  const renderLinks = (links: NavLink[], isSubmenu: boolean = false) => {
    return links.map((link) => {
      if (link.subLinks && link.subLinks.length > 0) {
        return (
          <Accordion type="single" collapsible key={link.id} className="w-full">
            <AccordionItem value={link.href} className="border-b-0">
              <AccordionTrigger
                className={cn('py-3 text-lg font-medium hover:no-underline', isSubmenu && 'py-2 text-base')}
              >
                {link.label}
              </AccordionTrigger>
              <AccordionContent className="pl-4">
                <Link
                  href={link.href}
                  onClick={onLinkClick}
                  className={cn(
                    'block py-2 text-base font-medium text-primary',
                    pathname === link.href && 'text-accent'
                  )}
                >
                  All {link.label}
                </Link>
                {renderLinks(link.subLinks, true)}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        );
      }
      return (
        <Link
          key={link.id}
          href={link.href}
          onClick={onLinkClick}
          className={cn(
            'block py-3 text-lg font-medium',
            isSubmenu && 'py-2 text-base',
            pathname === link.href ? 'text-primary' : 'text-foreground'
          )}
        >
          {link.label}
        </Link>
      );
    });
  };

  return <div className="flex flex-col space-y-2">{renderLinks(links)}</div>;
};
