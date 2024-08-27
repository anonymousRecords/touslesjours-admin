import type { Metadata } from 'next';
import './styles/globals.css';
import localFont from 'next/font/local';
import { Suspense } from 'react';
import Loading from '@/loading';
import AuthProvider from './context/AuthProvider';

const pretendardFont = localFont({
  src: '../fonts/PretendardVariable.woff2',
  display: 'swap',
});

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
        <body className={pretendardFont.className}>
          <div>{children}</div>
        </body>
      </AuthProvider>
    </html>
  );
}
