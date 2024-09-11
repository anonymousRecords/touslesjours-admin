import { ReactNode } from 'react';
import { AppBar, AppBarProps, NavigationBar } from '../common';

type DefaultLayoutProps = AppBarProps & {
  appBarVisible?: boolean;
  navigationBarVisible?: boolean;
  children: ReactNode;
};

export function DefaultLayout({
  children,
  appBarVisible = true,
  navigationBarVisible = true,
  title,
  LeftComp,
  RightComp,
}: DefaultLayoutProps) {
  const paddingTop = appBarVisible ? '16px' : '0px';

  return (
    <div lang="en" className="bg-gray-100 min-h-screen flex justify-center">
      <div className="w-full max-w-[450px] min-h-screen flex flex-col bg-white">
        {appBarVisible && <AppBar title={title} LeftComp={LeftComp} RightComp={RightComp} />}
        <main className="flex-1 flex flex-col px-8" style={{ paddingTop }}>
          {children}
        </main>
        {navigationBarVisible && <NavigationBar />}
      </div>
    </div>
  );
}
