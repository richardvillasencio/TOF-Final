
import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: 'West Fargo Hot Tubs & Saunas | TubClone | Your Local Spa Dealer',
  description: 'Your premier destination for high-quality hot tubs, saunas, and swim spas in West Fargo, ND. Visit our showroom for the best selection and expert service.',
  keywords: ['hot tubs West Fargo', 'saunas West Fargo', 'swim spas Fargo', 'pool installation', 'hot tub repair', 'Bullfrog Spas', 'QCA Spas'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'TubClone',
    description: 'The premier dealer of hot tubs, saunas, and swim spas in the West Fargo and Fargo-Moorhead area.',
    telephone: '+1-701-234-0705',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '601 Main Ave W',
      addressLocality: 'West Fargo',
      addressRegion: 'ND',
      postalCode: '58708',
      addressCountry: 'US'
    },
    image: 'https://storage.googleapis.com/msgsndr/Q8i1yKqsccON1uqGARTN/media/67f93f9a71384b7dddafb553.png',
    url: 'https://tubclone.com', // Replace with your actual domain
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '46.8732', // Approximate coordinates for West Fargo
      longitude: '-96.8997'
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday'
        ],
        opens: '09:00',
        closes: '18:00'
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '09:00',
        closes: '14:00'
      }
    ],
    priceRange: '$$'
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;900&family=PT+Sans:wght@400;700&family=Abril+Fatface&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-body antialiased">
          <Header />
          <main className="flex-grow bg-background">
            {children}
          </main>
          <Footer />
          <Toaster />
      </body>
    </html>
  );
}
