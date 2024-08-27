'use client';

import { Dialog, DialogPanel, DialogTitle, Description } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { useState } from 'react';
import { navigationItems } from '@/constants';

function ClientNavigation({ session }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="h-10 p-8">
      <Bars3Icon className="w-8 h-8 text-white cursor-pointer" onClick={() => setIsOpen(true)} />

      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 flex w-screen justify-right">
          <DialogPanel className="max-w-lg space-y-4 border bg-white p-10 pr-20">
            <button onClick={() => setIsOpen(false)}>
              <XMarkIcon className="md:w-8 md:h-8 w-6 h-6 text-black cursor-pointer" />
            </button>

            <DialogTitle className="md:text-xl text-lg font-bold">
              {session ? <p>안녕하세요 $$님</p> : <p>로그인이 필요합니다.</p>}
            </DialogTitle>

            <Description className="flex flex-col gap-4 md:text-lg text-base">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="hover:text-green-600 hover:font-bold"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </Description>

            {session ? <button className="fixed bottom-10">로그아웃</button> : null}
          </DialogPanel>
        </div>
      </Dialog>
    </header>
  );
}

export default ClientNavigation;
