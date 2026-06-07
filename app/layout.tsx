import type { Metadata } from 'next';
import { SmoothScrollProvider } from '@/components/SmoothScrollProvider';
import '@/app/globals.css';

export const metadata: Metadata = {
  title: 'Cinematic Experience',
  description: 'Premium landing page with scroll-synced video playback',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  openGraph: {
    title: 'Cinematic Experience',
    description: 'Premium landing page with scroll-synced video playback',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style>{`
          html {
            scroll-behavior: auto;
          }
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            background-color: #0a0a0a;
            color: #ffffff;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            overflow-x: hidden;
          }
        `}</style>
      </head>
      <body className="bg-dark text-white">
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
