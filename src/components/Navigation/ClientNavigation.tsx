'use client';

import { Dialog, DialogPanel, DialogTitle, Description } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { navigationItems } from '@/constants';
import { useSupabase } from '@/utils/supabase/supabase-provider';

function ClientNavigation() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [user, setUser] = useState(null);
  const { supabase } = useSupabase();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data } = await supabase.from('users').select('*').eq('username', username).single();

    if (data && data.password === password) {
      setUser(data);
      setUsername(data.username);
      localStorage.setItem('user', JSON.stringify(data));
      setIsOpen(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    setIsOpen(false);
  };

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
              {user && <p>안녕하세요 {username}님</p>}
            </DialogTitle>

            {!user ? (
              <>
                <DialogTitle className="md:text-xl text-lg font-bold">
                  로그인을 해주세요
                </DialogTitle>
                <form onSubmit={handleLogin} className="space-y-4">
                  <input
                    type="text"
                    placeholder="아이디"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="password"
                    placeholder="비밀번호"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                  <button type="submit" className="w-full p-2 bg-green-600 text-white rounded">
                    로그인
                  </button>
                </form>
              </>
            ) : (
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
            )}

            {user && (
              <button onClick={handleLogout} className="fixed bottom-10 p-2 text-gray-800">
                로그아웃
              </button>
            )}
          </DialogPanel>
        </div>
      </Dialog>
    </header>
  );
}

export default ClientNavigation;
