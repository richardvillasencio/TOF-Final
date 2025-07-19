// src/components/layout/header.tsx
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, Phone, MapPin, Pencil, Trash2, GripVertical, PlusCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from '@/components/ui/sheet';
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { ThemeToggle } from '../theme-toggle';
import { useEditableContent } from '@/hooks/use-editable-content';
import { type NavLink, headerContent as initialHeaderContent } from '@/lib/content/header';
import { cn } from '@/lib/utils';
import { ImageUploader } from '../image-uploader';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SortableItem } from '@/components/ui/sortable-item';
import { Skeleton } from '../ui/skeleton';


export function Header() {
  const { content, loading, isAuth, updateContent } = useEditableContent({
    collectionName: 'globals',
    docId: 'header',
    initialContent: initialHeaderContent,
  });

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  return (
    <header className="relative bg-gradient-to-r from-[rgb(81,158,172)] to-[rgb(231,121,49)] text-white sticky top-0 z-50">
      {isAuth && (
        <Button
          variant="outline"
          size="icon"
          className="absolute top-2 right-2 z-50 text-black"
          onClick={() => setIsEditDialogOpen(true)}
        >
          <Pencil className="h-4 w-4" />
        </Button>
      )}
      <div className="container mx-auto px-4">
        {/* Top Section */}
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center gap-4">
            <Link href="/" aria-label="Tubs of Fun Home">
              {loading || !content.logoImageUrl ? (
                <Skeleton className="h-[43px] w-[200px]" />
              ) : (
                <Image
                    src={content.logoImageUrl}
                    alt="Company Logo"
                    width={200}
                    height={43}
                    className="object-contain"
                    priority
                />
              )}
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
            <DesktopNav links={content.topNavLinks} />
            <ThemeToggle />
          </div>
          {content.mascotImageUrl && (
            <Image
              src={content.mascotImageUrl}
              alt="Tubs of Fun Mascot"
              width={80}
              height={100}
              className="hidden lg:block"
            />
          )}

          <div className="lg:hidden flex items-center gap-2">
            <ThemeToggle />
            <MobileNav topNavLinks={content.topNavLinks} mainNavLinks={content.mainNavLinks} />
          </div>
        </div>

        {/* Separator */}
        <hr className="border-t border-white/50" />

        {/* Bottom Navigation */}
        <div className="hidden lg:flex justify-center items-center py-2">
          <DesktopNav links={content.mainNavLinks} />
        </div>
      </div>
      <EditHeaderDialog
        isOpen={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        currentContent={content}
        onSave={updateContent}
      />
    </header>
  );
}

const DesktopNav = ({ links }: { links: NavLink[] }) => {
  const pathname = usePathname();

  const renderSubLinks = (subLinks: NavLink[]) => (
    <MenubarContent className="bg-background text-foreground">
      {subLinks.map((subLink) =>
        subLink.subLinks ? (
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
                {link.subLinks ? (
                  <span>{link.label}</span>
                ) : (
                  <Link href={link.href}>{link.label}</Link>
                )}

                {link.subLinks && <ChevronDown className="h-4 w-4 ml-1" />}
              </Button>
            </MenubarTrigger>
            {link.subLinks && renderSubLinks(link.subLinks)}
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
        <SheetHeader className="p-4 border-b">
          <div className="flex justify-between items-center">
             <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X className="h-6 w-6" />
              <span className="sr-only">Close menu</span>
            </Button>
          </div>
          <SheetTitle className="sr-only">Main Menu</SheetTitle>
          <SheetDescription className="sr-only">Website navigation links</SheetDescription>
        </SheetHeader>
        <div className="flex flex-col h-full">
          <div className="flex-grow overflow-y-auto p-4">
            <MobileNavLinks links={allNavLinks} onLinkClick={() => setIsOpen(false)} />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

const MobileNavLinks = ({ links, onLinkClick }: { links: NavLink[]; onLinkClick: () => void }) => {
  const pathname = usePathname();

  const renderLinks = (links: NavLink[], isSubmenu: boolean = false) => {
    return links.map((link) => {
      if (link.subLinks) {
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


// --- Editing Dialog ---
interface EditHeaderDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  currentContent: typeof initialHeaderContent;
  onSave: (newContent: Partial<typeof initialHeaderContent>) => void;
}

function EditHeaderDialog({ isOpen, onOpenChange, currentContent, onSave }: EditHeaderDialogProps) {
  const [editedContent, setEditedContent] = useState(currentContent);

  useEffect(() => {
    // When the dialog is opened, sync its internal state with the current prop from the parent.
    // This ensures that we always start editing with the latest data.
    if (isOpen) {
      setEditedContent(currentContent);
    }
  }, [isOpen, currentContent]);

  const handleSave = () => {
    onSave(editedContent);
    onOpenChange(false);
  };
  
  const handleContentChange = <K extends keyof typeof initialHeaderContent>(
    key: K,
    value: (typeof initialHeaderContent)[K]
  ) => {
    setEditedContent(prev => ({ ...prev, [key]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Edit Header Content</DialogTitle>
          <DialogDescription>
            Update contact information, logos, and navigation links.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 overflow-y-auto p-1 pr-4 flex-grow">
          {/* Left Column: General Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">General Information</h3>
            <div>
              <Label>Phone Number</Label>
              <Input
                value={editedContent.phoneNumber}
                onChange={e => handleContentChange('phoneNumber', e.target.value)}
              />
            </div>
             <div>
              <Label>Address</Label>
              <Input
                value={editedContent.address}
                onChange={e => handleContentChange('address', e.target.value)}
              />
            </div>
            <div>
              <Label>Company Logo</Label>
              <ImageUploader 
                currentImageUrl={editedContent.logoImageUrl}
                onUploadComplete={url => handleContentChange('logoImageUrl', url)}
                storagePath="globals/header"
              />
            </div>
             <div>
              <Label>Mascot Image</Label>
              <ImageUploader 
                currentImageUrl={editedContent.mascotImageUrl}
                onUploadComplete={url => handleContentChange('mascotImageUrl', url)}
                storagePath="globals/header"
              />
            </div>
          </div>

          {/* Right Column: Navigation */}
          <div className="space-y-4">
             <h3 className="text-lg font-medium">Top Navigation</h3>
             <EditableNavMenu 
                links={editedContent.topNavLinks}
                onLinksChange={newLinks => handleContentChange('topNavLinks', newLinks)}
             />
             <hr className="my-4"/>
             <h3 className="text-lg font-medium">Main Navigation</h3>
              <EditableNavMenu 
                links={editedContent.mainNavLinks}
                onLinksChange={newLinks => handleContentChange('mainNavLinks', newLinks)}
             />
          </div>
        </div>
        <DialogFooter className="pt-4 border-t">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// --- Editable Navigation Menu ---
interface EditableNavMenuProps {
    links: NavLink[];
    onLinksChange: (links: NavLink[]) => void;
    depth?: number;
}

function EditableNavMenu({ links, onLinksChange, depth = 0 }: EditableNavMenuProps) {
    const sensors = useSensors(useSensor(PointerSensor));

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            const oldIndex = links.findIndex(link => link.id === active.id);
            const newIndex = links.findIndex(link => link.id === over.id);
            onLinksChange(arrayMove(links, oldIndex, newIndex));
        }
    };

    const handleLinkChange = (id: string, field: 'label' | 'href', value: string) => {
        onLinksChange(links.map(link => link.id === id ? { ...link, [field]: value } : link));
    };

    const handleSublinksChange = (id: string, subLinks: NavLink[]) => {
        onLinksChange(links.map(link => link.id === id ? { ...link, subLinks } : link));
    };
    
    const addLink = () => {
        const newLink: NavLink = { id: crypto.randomUUID(), label: 'New Link', href: '/' };
        onLinksChange([...links, newLink]);
    };

    const deleteLink = (id: string) => {
        onLinksChange(links.filter(link => link.id !== id));
    };

    return (
        <div className={cn("space-y-2", depth > 0 && "pl-4 mt-2 border-l")}>
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={links} strategy={verticalListSortingStrategy}>
                    {links.map(link => (
                        <SortableItem key={link.id} id={link.id}>
                            <div className="bg-muted p-3 rounded-md space-y-2">
                                <div className="flex items-center gap-2">
                                    <GripVertical className="h-5 w-5 text-muted-foreground flex-shrink-0 cursor-grab" />
                                    <div className="flex-grow grid grid-cols-2 gap-2">
                                        <Input 
                                            placeholder="Label" 
                                            value={link.label}
                                            onChange={e => handleLinkChange(link.id, 'label', e.target.value)}
                                        />
                                        <Input 
                                            placeholder="URL (e.g., /about)" 
                                            value={link.href}
                                            onChange={e => handleLinkChange(link.id, 'href', e.target.value)}
                                        />
                                    </div>
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button variant="ghost" size="icon">
                                                <Trash2 className="h-4 w-4 text-destructive" />
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    This will delete the link and all its sub-links. This action cannot be undone.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <AlertDialogAction onClick={() => deleteLink(link.id)}>Delete</AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </div>
                                {depth < 2 && (
                                    <EditableNavMenu 
                                        links={link.subLinks || []}
                                        onLinksChange={(newSublinks) => handleSublinksChange(link.id, newSublinks)}
                                        depth={depth + 1}
                                    />
                                )}
                            </div>
                        </SortableItem>
                    ))}
                </SortableContext>
            </DndContext>
            <Button variant="outline" size="sm" onClick={addLink}>
                <PlusCircle className="mr-2 h-4 w-4" /> Add Link
            </Button>
        </div>
    );
}
