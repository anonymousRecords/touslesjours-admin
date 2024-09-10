'use client';
import Image from 'next/image';
import { Button } from '../common';

interface CouponItemProps {
  isUsed: boolean;
  handleUseButtonClick: () => void;
}

export function CouponItem({ isUsed, handleUseButtonClick }: CouponItemProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex items-center space-x-4">
        <Image src="/image/bread.avif" alt="coupon" width={50} height={50} />
        <div>
          <h3 className="font-bold">우유 식빵 무료 쿠폰</h3>
          <p>우유 식빵과 교환이 가능합니다.</p>
        </div>
      </div>
      <div className="mt-4">
        <Button onClick={handleUseButtonClick} disabled={isUsed} className="w-full">
          {isUsed ? '사용 완료' : '쿠폰 사용하기'}
        </Button>
      </div>
    </div>
  );
}
