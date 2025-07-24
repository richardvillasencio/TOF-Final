
// src/components/layout/header.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
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

import { type NavLink, headerContent } from '@/lib/content/header';
import { cn } from '@/lib/utils';


export function Header() {
  const [content] = useState(headerContent);

  return (
    <header className="bg-primary text-white sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center gap-4">
            <Link href="/" aria-label="TubClone Home">
                <Image
                    src={content.logoImageUrl}
                    alt="Company Logo"
                    width={200}
                    height={43}
                    className="object-contain"
                    priority
                />
            </Link>
          </div>
          <div className="hidden lg:flex flex-col items-end text-sm">
            <div className="flex items-center gap-2">
              <Phone size={16} />
              <span>{content.phoneNumber}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={16} />
              <span>{content.address}</span>
            </div>
          </div>
          <div className="hidden lg:flex items-center space-x-2">
            <DesktopNav links={content.topNavLinks || []} />
          </div>
          {content.mascotImageUrl && (
            <Image
              src={content.mascotImageUrl}
              alt="TubClone Mascot"
              width={80}
              height={100}
              className="hidden lg:block"
            />
          )}

          <div className="lg:hidden flex items-center gap-2">
            <MobileNav topNavLinks={content.topNavLinks || []} mainNavLinks={content.mainNavLinks || []} />
          </div>
        </div>

        <hr className="border-t border-white/50" />

        <div className="hidden lg:flex justify-center items-center py-2">
          <DesktopNav links={content.mainNavLinks || []} />
        </div>
      </div>
    </header>
  );
}

const DesktopNav = ({ links }: { links: NavLink[] }) => {
  const pathname = usePathname();

  const renderSubLinks = (subLinks: NavLink[]) => (
    <MenubarContent className="bg-background text-foreground">
      {subLinks.map((subLink) =>
        subLink.subLinks && subLink.subLinks.length > 0 ? (
          <MenubarSub key={subLink.href}>
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
          <MenubarItem key={subLink.href} asChild>
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
        link.href === '/' ? (
          <Button
            key={link.href}
            variant="ghost"
            asChild
            className="font-semibold text-white hover:bg-white/20 hover:text-white"
          >
            <Link href={link.href}>{link.label}</Link>
          </Button>
        ) : (
          <MenubarMenu key={link.href}>
            <MenubarTrigger asChild>
              <Button
                variant="ghost"
                className={cn(
                  'font-semibold text-white',
                  pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
                    ? 'bg-white/20'
                    : '',
                  'hover:bg-white/20 hover:text-white'
                )}
              >
                {link.subLinks && link.subLinks.length > 0 ? (
                  <span>{link.label}</span>
                ) : (
                  <Link href={link.href}>{link.label}</Link>
                )}

                {link.subLinks && link.subLinks.length > 0 && <ChevronDown className="h-4 w-4 ml-1" />}
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
  const allNavLinks = [...topNavLinks, ...mainNavLinks.filter((l) => l.href !== '/')];

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 hover:text-white">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full max-w-sm p-0 bg-background text-foreground">
        <div className="p-4 border-b">
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
            <X className="h-6 w-6" />
            <span className="sr-only">Close menu</span>
          </Button>
        </div>
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
          <Accordion type="single" collapsible key={link.href} className="w-full">
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
          key={link.href}
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
