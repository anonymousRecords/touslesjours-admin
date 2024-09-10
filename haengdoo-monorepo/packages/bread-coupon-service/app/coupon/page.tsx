'use client';
import React, { useEffect, useState } from 'react';
import { CouponModal } from '@/components/common';
import { CouponItem } from '@/components/coupon';
import { DefaultLayout } from '@/components/layout';

interface Coupon {
  id: number;
  isUsed: boolean;
}

export default function CouponPage() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'available' | 'used'>('available');
  const [selectedCouponId, setSelectedCouponId] = useState<number | null>(null);
  const [modalError, setModalError] = useState<string>('');

  useEffect(() => {
    const fetchCoupons = async () => {
      const mockCoupons: Coupon[] = [
        { id: 1, isUsed: false },
        { id: 2, isUsed: false },
        { id: 3, isUsed: true },
      ];
      setCoupons(mockCoupons);
    };

    fetchCoupons();
  }, []);

  const handleUseButtonClick = (couponId: number) => {
    setSelectedCouponId(couponId);
    setIsModalOpen(true);
  };

  const handlePasswordSubmit = () => {
    if (password === '1234' && selectedCouponId !== null) {
      setCoupons(
        coupons.map((coupon) =>
          coupon.id === selectedCouponId ? { ...coupon, isUsed: true } : coupon,
        ),
      );
      setIsModalOpen(false);
      setPassword('');
      setSelectedCouponId(null);
    } else {
      setModalError('암호가 일치하지 않습니다.');
    }
  };

  const filteredCoupons = coupons.filter((coupon) =>
    activeTab === 'available' ? !coupon.isUsed : coupon.isUsed,
  );

  return (
    <DefaultLayout appBarVisible={false} navigationBarVisible={true}>
      <h2 className="text-2xl font-bold mt-10 mb-4">쿠폰함</h2>
      <div className="flex space-x-4 mb-4">
        <button
          className={`px-4 py-2 rounded ${activeTab === 'available' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800 border-solid border-1 border-gray-100'}`}
          onClick={() => setActiveTab('available')}
        >
          사용 가능한 쿠폰
        </button>
        <button
          className={`px-4 py-2 rounded ${activeTab === 'used' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800 border-solid border-1 border-gray-100'}`}
          onClick={() => setActiveTab('used')}
        >
          이미 사용한 쿠폰
        </button>
      </div>
      <div className="flex flex-col gap-4">
        {filteredCoupons.map((coupon) => (
          <CouponItem
            key={coupon.id}
            isUsed={coupon.isUsed}
            handleUseButtonClick={() => handleUseButtonClick(coupon.id)}
          />
        ))}
      </div>

      <CouponModal
        type="use"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handlePasswordSubmit}
        error={modalError}
      />
    </DefaultLayout>
  );
}
