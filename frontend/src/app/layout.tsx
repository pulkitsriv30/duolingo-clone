import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import './globals.css';
import Sidebar from '@/components/Sidebar';
import MobileBottomBar from '@/components/MobileBottomBar';

// Nunito is the closest free font to Duolingo's rounded style
const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'Duolingo Clone',
  description: 'A functional Duolingo web app clone.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${nunito.className} bg-white`}>
        <div className="flex min-h-screen">
          {/* Desktop sidebar – hidden on mobile */}
          <Sidebar />

          {/* Main content area */}
          <div className="flex-1 flex flex-col min-h-screen pb-[80px] lg:pb-0">
            {children}
          </div>
        </div>

        {/* Mobile bottom navigation */}
        <MobileBottomBar />
      </body>
    </html>
  );
}
