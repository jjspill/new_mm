import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navigation from './components/Navigation';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    template: '%s | James Spillmann',
    default: 'James Spillmann - Software Engineer and Developer',
  },
  description:
    'James Spillmann is a software engineer based in New York, specializing in building modern, responsive websites and applications using Next.js, React, and cutting-edge web technologies.',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: 'James Spillmann - Software Engineer and Developer',
    type: 'website',
    locale: 'en_US',
    url: 'https://www.jamesspillmann.com',
    siteName: 'James Spillmann',
    description:
      'Discover the professional world of James Spillmann, a New York-based software engineer specializing in Next.js and React.',
  },
  twitter: {
    card: 'summary_large_image',
    description:
      'Explore the projects and skills of James Spillmann, software engineer specialized in Next.js and React technologies.',
  },
  alternates: {
    canonical: 'https://www.jamesspillmann.com',
  },
  metadataBase: new URL('https://www.jamesspillmann.com'),
  icons: {
    icon: [
      {
        url: '/favicon.ico',
        type: 'image/x-icon',
      },
      {
        url: '/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
      // add favicon-32x32.png, favicon-96x96.png, android-chrome-192x192.png
    ],
    shortcut: [
      {
        url: '/favicon.ico',
        type: 'image/x-icon',
      },
    ],
    apple: [
      {
        url: '/twitter-image.jpg',
        sizes: '57x57',
        type: 'image/png',
      },
      {
        url: '/apple-icon-57x57.png',
        sizes: '60x60',
        type: 'image/png',
      },
      // add apple-icon-72x72.png, apple-icon-76x76.png, apple-icon-114x114.png, apple-icon-120x120.png, apple-icon-144x144.png, apple-icon-152x152.png, apple-icon-180x180.png
    ],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#FFFFFF',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Navigation />
          {children}
        </Providers>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
