
import type { HeroSectionProps } from '@/components/page-sections/hero-section';
import type { ContactFormSectionProps } from '@/components/page-sections/contact-form-section';
import type { LocationsSectionProps } from '@/components/page-sections/locations-section';
import placeholderImages from './placeholder-images.json';

export type PageSection = 
  | { component: 'HeroSection'; props: Omit<HeroSectionProps, 'id'>, id: string }
  | { component: 'ContactFormSection'; props: Omit<ContactFormSectionProps, 'id'>, id: string }
  | { component: 'LocationsSection'; props: Omit<LocationsSectionProps, 'id'>, id: string };

export const contactContent: PageSection[] = [
    {
        id: 'hero',
        component: 'HeroSection',
        props: {
            backgroundImage: placeholderImages.contact.hero.src,
            backgroundHint: 'customer service representative smiling',
            title: 'Get In Touch',
            subtitle: "We're here to help! Contact us with any questions or visit one of our showrooms.",
            buttons: {
                primary: { href: 'tel:701-234-7727', text: 'Call Fargo' },
                secondary: { href: 'tel:952-435-4096', text: 'Call Lakeville' },
            },
        },
    },
    {
        id: 'contact-form',
        component: 'ContactFormSection',
        props: {
            title: 'Send Us a Message',
            subtitle: "Fill out the form below and we'll get back to you as soon as possible.",
        },
    },
    {
        id: 'locations',
        component: 'LocationsSection',
        props: {
            title: 'Our Locations',
            locations: [
                {
                    name: 'Fargo, ND',
                    address: '1234 Main St\nFargo, ND 58103',
                    phone: '(701) 234-7727',
                    email: 'fargo@tubclone.com',
                    hours: [
                        'Mon-Fri: 9am - 6pm',
                        'Saturday: 10am - 4pm',
                        'Sunday: Closed'
                    ],
                    cityForMap: 'Fargo'
                },
                {
                    name: 'Lakeville, MN',
                    address: '5678 Market Ave\nLakeville, MN 55044',
                    phone: '(952) 435-4096',
                    email: 'lakeville@tubclone.com',
                    hours: [
                        'Mon-Fri: 10am - 7pm',
                        'Saturday: 10am - 5pm',
                        'Sunday: 12pm - 4pm'
                    ],
                    cityForMap: 'Lakeville'
                }
            ]
        }
    }
];
