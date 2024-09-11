'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Button } from '@/components/common';
import { CouponModal } from '@/components/common';
import { DefaultLayout } from '@/components/layout';

export default function HomePage() {
  const [userName, setUserName] = useState('사용자');
  const [coupons, setCoupons] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalError, setModalError] = useState<string>('');

  useEffect(() => {
    setUserName('김식빵');
    setCoupons(3);
  }, []);

  const handleCouponSubmit = (password: string) => {
    if (password === '1234') {
      setCoupons((prev) => prev + 1);
      setIsModalOpen(false);
    } else {
      setModalError('암호가 일치하지 않습니다.');
    }
  };

  return (
    <DefaultLayout appBarVisible={false} navigationBarVisible={true}>
      <h1 className="text-2xl font-bold text-start mt-20 mb-2">안녕하세요 {userName}님</h1>
      <h3 className="text-md text-start mb-20">지금까지 {coupons}개의 쿠폰을 모았어요</h3>

      <div className="flex justify-center">
        <div className="animate-float">
          <Image src="/image/bread.avif" alt="bread" objectFit="contain" width={300} height={300} />
        </div>
      </div>

      <div className="flex justify-center my-10">
        <div className="grid grid-cols-5 gap-10">
          {[...Array(10)].map((_, i) => (
            <svg
              key={i}
              width="30px"
              height="30px"
              viewBox="0 0 24 24"
              fill={i < coupons ? '#ebaf61' : 'none'}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.6281 19H3.30189V10.3701C2.01113 9.07564 2.01112 8.64414 2.01112 8.64414C1.58355 4.12261 13.6256 3.61587 14.9188 8.21265C15.2558 9.4105 14.4886 10.2263 13.6281 10.8016V19ZM13.6281 19L16 19H20.6281V10.8016M20.6281 10.8016C21.4886 10.2263 22.2558 9.41051 21.9188 8.21265C21.3535 6.20313 18.7339 5.16893 16 5.0191H8.5M20.6281 10.8016H18"
                stroke={i < coupons ? '#d7943d' : '#D3D3D3'}
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          ))}
        </div>
      </div>

      <Button onClick={() => setIsModalOpen(true)}>쿠폰 적립하기</Button>

      <CouponModal
        type="add"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={(password) => handleCouponSubmit(password)}
        error={modalError}
      />
    </DefaultLayout>
  );
}
