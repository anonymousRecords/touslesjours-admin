import type { Metadata } from 'next';
import './globals.css';
import localFont from 'next/font/local';

const pretendardFont = localFont({
  src: './fonts/PretendardVariable.woff2',
  display: 'swap',
});

export const metadata: Metadata = {
  title: '뚜레쥬르',
  description: '행복한 뚜둥이 생활을 위하여',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={pretendardFont.className}>{children}</body>
    </html>
  );
}
