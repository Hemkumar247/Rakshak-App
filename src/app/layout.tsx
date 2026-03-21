import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { AppLayout } from '@/components/app-layout';
import { LanguageProvider } from '@/lib/i18n';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider';

export const metadata: Metadata = {
  title: 'Rakshak',
  description: 'AI-powered crop advisory for modern farming.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&family=PT+Sans:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={cn('font-body antialiased min-h-screen')}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <LanguageProvider>
            <AppLayout>{children}</AppLayout>
            <Toaster />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
