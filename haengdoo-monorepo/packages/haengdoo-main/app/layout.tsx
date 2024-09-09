import { SupabaseProvider } from 'core/src/supabase/supabase-provider';
import type { Metadata } from 'next';
import { ServerNavigation } from '../components/Navigation';

import './global.css';
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
      <body className="flex flex-col">
        <SupabaseProvider>
          <ServerNavigation />
          <main>{children}</main>
        </SupabaseProvider>
      </body>
    </html>
  );
}
