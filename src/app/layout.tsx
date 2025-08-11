
import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from '@/components/theme-provider';

export const metadata: Metadata = {
  title: 'TubClone - Your Oasis of Relaxation',
  description: 'High-quality hot tubs, swim spas, pools, and more.',
};

const Bubbles = () => (
  <div className="bubbles fixed inset-0 -z-10 pointer-events-none">
    {Array.from({ length: 20 }).map((_, i) => (
      <div key={i} className="bubble" style={{
        '--size': `${2 + Math.random() * 4}vw`,
        '--left-start': `${-10 + Math.random() * 120}vw`,
        '--left-end': `${-10 + Math.random() * 120}vw`,
        '--animation-delay': `-${Math.random() * 20}s`,
        '--animation-duration': `${15 + Math.random() * 15}s`,
      } as React.CSSProperties}></div>
    ))}
  </div>
);


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;900&family=PT+Sans:wght@400;700&family=Abril+Fatface&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow relative z-10">{children}</main>
            <Footer />
          </div>
          <Bubbles />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
