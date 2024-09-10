import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '뚜쥬 식빵 쿠폰',
  description: '뚜쥬 식빵 쿠폰',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
