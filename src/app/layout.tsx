
import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { FavoritesProvider } from '@/context/favorites-provider';
import { ThemeProvider } from '@/context/theme-provider';
import { LocaleProvider } from '@/context/locale-provider';
import { cn } from '@/lib/utils';
import { FirebaseClientProvider } from '@/firebase/client-provider';

export const metadata: Metadata = {
  title: 'K-Square Quotes',
  description: 'Passez votre journée avec des moments inspirés',
  manifest: '/manifest.json',
  themeColor: '#000000',
};

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
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Source+Code+Pro&display=swap" rel="stylesheet" />
        <link rel="apple-touch-icon" href="/icon-192x192.png"></link>
      </head>
      <body className={cn('font-body antialiased', 'min-h-screen bg-background')}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <FirebaseClientProvider>
                <FavoritesProvider>
                  <LocaleProvider>
                    {children}
                    <Toaster />
                  </LocaleProvider>
                </FavoritesProvider>
            </FirebaseClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
