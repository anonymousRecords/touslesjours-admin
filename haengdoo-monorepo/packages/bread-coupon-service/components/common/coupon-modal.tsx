'use client';
import { useState } from 'react';
import { FormField } from '../auth';
import { Button } from '../common';

interface CouponModalProps {
  type: 'use' | 'add';
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (password: string) => void;
  error: string;
}

export function CouponModal({ type, isOpen, onClose, onSubmit, error }: CouponModalProps) {
  const [password, setPassword] = useState<string>('');

  if (!isOpen) {
    return null;
  }

  const title = type === 'add' ? '쿠폰 적립하기' : '쿠폰 사용하기';
  const description =
    type === 'add' ? '직원에게 쿠폰 적립을 요청해주세요.' : '직원에게 쿠폰 사용을 요청해주세요.';
  const buttonText = type === 'add' ? '적립하기' : '사용하기';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white min-w-[300px] p-6 rounded-lg">
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="text-sm mb-4">{description}</p>
        <FormField
          label="암호"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="암호를 입력하세요"
          error={error}
        />
        <div className="flex justify-end space-x-2">
          <Button
            onClick={() => {
              onClose();
              setPassword('');
            }}
          >
            취소
          </Button>
          <Button
            onClick={() => {
              onSubmit(password);
            }}
          >
            {buttonText}
          </Button>
        </div>
      </div>
    </div>
  );
}
