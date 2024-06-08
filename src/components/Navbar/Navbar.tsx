'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { navElements } from '@/constants';

export default function Navbar() {
  const pathname = usePathname();
  const [clickedLink, setClickedLink] = useState<string | null>(null);

  const isActive = (name: string) => {
    // "/" 경로는 예외 처리
    if (name === 'home' && pathname === '/') {
      return true;
    }
    return pathname.includes(name);
  };

  const handleClick = (name: string) => {
    setClickedLink(name);
    setTimeout(() => {
      setClickedLink(null);
    }, 500); // Duration of the animation
  };

  return (
    <>
      <nav className="sticky top-0 left-0 z-50 bg-[#0C4630] font-['HSSanTokki20-Regular'] px-10 md:px-20">
        <div className="h-[100px] w-full flex flex-col gap-2 justify-center items-center px-3">
          {/* 로고 */}
          <h1 className="text-xl text-white md:text-2xl">뚜레쥬르</h1>
          {/* 네비게이션 */}
          <section className="flex gap-4 items-center">
            {navElements.map((elem) => (
              <Link
                href={elem.href}
                key={elem.name}
                onClick={() => handleClick(elem.name)}
                className={`${isActive(elem.name) ? 'text-[#FFBF00]' : 'text-white'} ${clickedLink === elem.name ? 'animate-bounce' : ''} text-xs md:text-sm`}
              >
                {elem.label}
              </Link>
            ))}
          </section>
        </div>
      </nav>
    </>
  );
}
