'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, Phone, MapPin } from 'lucide-react';
import { Logo } from '@/components/ui/logo';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSubTrigger,
  MenubarSubContent,
  MenubarTrigger,
} from '@/components/ui/menubar';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

import { navLinks, type NavLink } from '@/lib/nav-links';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';


export function Header() {
  const isMobile = useIsMobile();

  return (
    <header className="bg-background/95 backdrop-blur-sm sticky top-0 z-50 border-b">
      <div className="container mx-auto px-4">
        {/* Top bar with contact info */}
        <div className="flex justify-end items-center h-10 text-sm text-muted-foreground space-x-6">
          <a href="tel:701-234-7727" className="flex items-center gap-2 hover:text-primary transition-colors">
            <Phone size={14}/>
            <span className="hidden sm:inline">Fargo: (701) 234-7727</span>
          </a>
          <a href="tel:952-435-4096" className="flex items-center gap-2 hover:text-primary transition-colors">
            <Phone size={14}/>
            <span className="hidden sm:inline">Lakeville: (952) 435-4096</span>
          </a>
           <Link href="/contact" className="flex items-center gap-2 hover:text-primary transition-colors">
            <MapPin size={14}/>
            <span className="hidden sm:inline">Locations</span>
          </Link>
        </div>

        <div className="flex justify-between items-center py-4">
          <Link href="/" aria-label="TubClone Home">
            <Logo />
          </Link>
          <nav className="hidden lg:flex items-center space-x-2">
            <DesktopNav />
          </nav>
          <div className="lg:hidden">
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
}

const DesktopNav = () => {
    const pathname = usePathname();
  
    const renderSubLinks = (subLinks: NavLink[]) => (
      <MenubarContent>
        {subLinks.map((subLink) => (
          subLink.subLinks ? (
            <MenubarMenu key={subLink.href}>
                <MenubarSubTrigger className={cn(
                    "flex justify-between w-full",
                    pathname.startsWith(subLink.href) && "bg-accent/10"
                )}>
                    {subLink.label} <ChevronDown className="h-4 w-4 transform -rotate-90" />
                </MenubarSubTrigger>
                <MenubarSubContent>
                  {renderSubLinks(subLink.subLinks)}
                </MenubarSubContent>
            </MenubarMenu>
          ) : (
            <MenubarItem key={subLink.href} asChild>
                <Link href={subLink.href} className={cn(pathname === subLink.href && "font-bold")}>
                    {subLink.label}
                </Link>
            </MenubarItem>
          )
        ))}
      </MenubarContent>
    );
  
    return (
      <Menubar className="border-none bg-transparent p-0">
        {navLinks.map((link) => (
          <MenubarMenu key={link.href}>
            <MenubarTrigger asChild>
              <Button
                variant="ghost"
                className={cn(
                  "font-medium",
                  pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href)) ? 'bg-muted text-primary' : '',
                  'hover:bg-muted/50'
                )}
              >
                <Link href={link.href}>{link.label}</Link>
                {link.subLinks && <ChevronDown className="h-4 w-4 ml-1" />}
              </Button>
            </MenubarTrigger>
            {link.subLinks && renderSubLinks(link.subLinks)}
          </MenubarMenu>
        ))}
      </Menubar>
    );
  };
  

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full max-w-sm p-0">
        <div className="flex flex-col h-full">
            <div className="p-4 flex justify-between items-center border-b">
                <Logo />
                 <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                    <X className="h-6 w-6" />
                    <span className="sr-only">Close menu</span>
                </Button>
            </div>
          <div className="flex-grow overflow-y-auto p-4">
            <MobileNavLinks onLinkClick={() => setIsOpen(false)} />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

const MobileNavLinks = ({ onLinkClick }: { onLinkClick: () => void }) => {
    const pathname = usePathname();
  
    const renderLinks = (links: NavLink[], isSubmenu: boolean = false) => {
      return links.map((link) => {
        if (link.subLinks) {
          return (
            <Accordion type="single" collapsible key={link.href} className="w-full">
              <AccordionItem value={link.href} className="border-b-0">
                <AccordionTrigger className={cn("py-3 text-lg font-medium hover:no-underline", isSubmenu && "py-2 text-base")}>
                    {link.label}
                </AccordionTrigger>
                <AccordionContent className="pl-4">
                  <Link
                    href={link.href}
                    onClick={onLinkClick}
                    className={cn(
                        "block py-2 text-base font-medium text-primary",
                        pathname === link.href && "text-accent"
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
              "block py-3 text-lg font-medium",
              isSubmenu && "py-2 text-base",
              pathname === link.href ? 'text-primary' : 'text-foreground'
            )}
          >
            {link.label}
          </Link>
        );
      });
    };
  
    return <div className="flex flex-col space-y-2">{renderLinks(navLinks)}</div>;
  };
  
  const NavItem = ({ href, children, onLinkClick }: { href: string, children: React.ReactNode, onLinkClick: () => void }) => {
    const pathname = usePathname();
    const isActive = pathname === href;
  
    return (
      <Link href={href} onClick={onLinkClick}>
        <span className={cn('block px-4 py-2 rounded-md', isActive ? 'bg-primary text-primary-foreground' : 'hover:bg-muted')}>
          {children}
        </span>
      </Link>
    );
  };
  
  const NestedNavItem = ({ label, children }: { label: string, children: React.ReactNode }) => {
    return (
      <div>
        <h3 className="px-4 py-2 font-semibold">{label}</h3>
        <div className="pl-4 border-l ml-4">
          {children}
        </div>
      </div>
    );
  };
