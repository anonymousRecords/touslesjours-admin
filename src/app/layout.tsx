import type { Metadata } from 'next';
import './styles/globals.css';
import { Suspense } from 'react';
import { ServerNavigation } from '@/components/Navigation';
import Loading from '@/loading';
import AuthProvider from './context/AuthProvider';

export const metadata: Metadata = {
  title: '뚜레쥬르',
  description: '행복한 뚜둥이 생활을 위하여',
  icons: {
    icon: './favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
        <Suspense fallback={<Loading />} />
        <body className="flex flex-col">
          <ServerNavigation />
          <main>{children}</main>
        </body>
      </AuthProvider>
    </html>
  );
}
