import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navigation from './components/Navigation';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { UserProvider } from './contexts/UserContext';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    template: ' %s | James Spillmann',
    default: 'James Spillmann',
  },
  description: 'James Spillmann Website and so much more',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
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
      </body>
    </html>
  );
}
