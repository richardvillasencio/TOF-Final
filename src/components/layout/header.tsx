// src/components/layout/header.tsx
'use client';

import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, Phone, MapPin, Pencil, GripVertical, PlusCircle, Trash2 } from 'lucide-react';
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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { type NavLink, type HeaderContent, headerContent as initialHeaderContent } from '@/lib/content/header';
import { cn } from '@/lib/utils';
import { useEditableContent } from '@/hooks/use-editable-content';
import { ImageUploader } from '../image-uploader';


export function Header() {
  const { content, isAuth, setContent, saveContent } = useEditableContent<HeaderContent>({
    docPath: 'globals/header',
    initialContent: initialHeaderContent
  });
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  return (
    <header className="relative bg-gradient-to-r from-[#44a9c6] to-[#d68b5a] text-white sticky top-0 z-50">
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
      <EditHeaderDialog
        isOpen={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        currentContent={content}
        onSave={saveContent}
      />
    </header>
  );
}

const DesktopNav = ({ links }: { links: NavLink[] }) => {
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
        link.href === '/' ? (
          <Button
            key={link.id}
            variant="ghost"
            asChild
            className="font-semibold text-white hover:bg-white/20 hover:text-white"
          >
            <Link href={link.href}>{link.label}</Link>
          </Button>
        ) : (
          <MenubarMenu key={link.id}>
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

// --- Editing Dialog ---
interface EditHeaderDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  currentContent: HeaderContent;
  onSave: (newContent: HeaderContent) => void;
}

function EditHeaderDialog({ isOpen, onOpenChange, currentContent, onSave }: EditHeaderDialogProps) {
    const [content, setContent] = useState<HeaderContent>(currentContent);
    const sensors = useSensors(useSensor(PointerSensor));

    useEffect(() => {
        setContent(currentContent);
    }, [currentContent, isOpen]);

    const handleContentChange = useCallback((field: keyof HeaderContent, value: any) => {
        setContent(prev => ({...prev, [field]: value}));
    }, []);

    const handleDragEnd = useCallback((event: DragEndEvent, listKey: 'topNavLinks' | 'mainNavLinks') => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            setContent(prev => {
                const oldList = prev[listKey];
                const oldIndex = oldList.findIndex(item => item.id === active.id);
                const newIndex = oldList.findIndex(item => item.id === over.id);
                return { ...prev, [listKey]: arrayMove(oldList, oldIndex, newIndex) };
            });
        }
    }, []);

    const handleSave = useCallback(() => {
        onSave(content);
        onOpenChange(false);
    }, [content, onSave, onOpenChange]);

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Edit Header</DialogTitle>
                    <DialogDescription>
                        Manage your site's logo, contact info, and navigation links.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-4">
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">General Info</h3>
                        <ImageUploader
                            label="Company Logo"
                            currentImageUrl={content.logoImageUrl}
                            onUploadComplete={url => handleContentChange('logoImageUrl', url)}
                            storagePath="globals/header"
                        />
                        <ImageUploader
                            label="Mascot Image"
                            currentImageUrl={content.mascotImageUrl}
                            onUploadComplete={url => handleContentChange('mascotImageUrl', url)}
                            storagePath="globals/header"
                        />
                         <div>
                            <Label>Phone Number</Label>
                            <Input value={content.phoneNumber} onChange={e => handleContentChange('phoneNumber', e.target.value)} />
                        </div>
                         <div>
                            <Label>Address</Label>
                            <Input value={content.address} onChange={e => handleContentChange('address', e.target.value)} />
                        </div>
                    </div>
                    <div className="space-y-6">
                       <div>
                         <h3 className="text-lg font-semibold mb-2">Top Navigation</h3>
                         <SortableNavList
                            links={content.topNavLinks}
                            onDragEnd={(e) => handleDragEnd(e, 'topNavLinks')}
                            sensors={sensors}
                         />
                       </div>
                       <div>
                         <h3 className="text-lg font-semibold mb-2">Main Navigation</h3>
                         <SortableNavList
                            links={content.mainNavLinks}
                            onDragEnd={(e) => handleDragEnd(e, 'mainNavLinks')}
                            sensors={sensors}
                         />
                       </div>
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
                    <Button onClick={handleSave}>Save Changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

function SortableNavList({ links, sensors, onDragEnd }: { links: NavLink[], sensors: any, onDragEnd: (e: DragEndEvent) => void }) {
    return (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
            <SortableContext items={links.map(l => l.id)} strategy={verticalListSortingStrategy}>
                <div className="space-y-2 rounded-md border p-2">
                    {links.map(link => (
                        <SortableNavLinkItem key={link.id} link={link} />
                    ))}
                </div>
            </SortableContext>
        </DndContext>
    );
}

function SortableNavLinkItem({ link }: { link: NavLink }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: link.id });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1 : 'auto',
    opacity: isDragging ? 0.8 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="flex items-center gap-2 bg-muted p-2 rounded-md">
       <div {...attributes} {...listeners} className="cursor-grab p-1">
            <GripVertical className="h-5 w-5" />
       </div>
       <div className="flex-grow">
        <Input value={link.label} readOnly className="bg-background" />
        {link.subLinks && link.subLinks.length > 0 && (
            <div className="pl-4 mt-1 space-y-1">
                {link.subLinks.map(subLink => (
                    <Input key={subLink.id} value={subLink.label} readOnly className="bg-background h-8" />
                ))}
            </div>
        )}
       </div>
    </div>
  );
}
