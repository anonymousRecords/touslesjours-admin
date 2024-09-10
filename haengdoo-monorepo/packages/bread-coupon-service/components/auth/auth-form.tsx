'use client';
import { useEffect, useState } from 'react';
import { FormField } from './form-field';
import { Button } from '@/components/common';

type AuthFormProps = {
  type: 'login' | 'signup';
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

export function AuthForm({ type, onSubmit }: AuthFormProps) {
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [nameError, setNameError] = useState<string>('');
  const [phoneError, setPhoneError] = useState<string>('');
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  const validateName = (value: string) => {
    if (value.length < 2) {
      setNameError('이름은 2글자 이상이어야 합니다.');
    } else {
      setNameError('');
    }
  };

  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/[^\d]/g, '');
    if (numbers.length <= 3) {
      return numbers;
    }
    if (numbers.length <= 7) {
      return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    }
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
  };

  const validatePhone = (value: string) => {
    const phoneRegex = /^010-\d{4}-\d{4}$/;
    if (!phoneRegex.test(value)) {
      setPhoneError('올바른 전화번호 형식이 아닙니다.');
    } else {
      setPhoneError('');
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedNumber = formatPhoneNumber(e.target.value);
    setPhone(formattedNumber);
    validatePhone(formattedNumber);
  };

  useEffect(() => {
    setIsFormValid(name.length >= 2 && phone.length === 13 && !nameError && !phoneError);
  }, [name, phone, nameError, phoneError]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isFormValid) {
      onSubmit(e);
    }
  };

  return (
    <section className="h-full relative">
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField
          label="이름"
          type="text"
          name="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            validateName(e.target.value);
          }}
          placeholder="이름을 입력하세요"
          error={nameError}
        />
        <FormField
          label="전화번호"
          type="tel"
          name="phone"
          value={phone}
          onChange={handlePhoneChange}
          placeholder="전화번호를 입력하세요"
          error={phoneError}
        />
        {type === 'signup' && (
          <div className="mb-4">
            <h3 className="font-medium mb-2">개인정보</h3>
            <p className="text-sm text-gray-600">전체 동의하기전체 동의하기전체 동의하기</p>
          </div>
        )}
      </form>
      <div className="absolute bottom-10 w-full">
        <Button
          type="submit"
          fullWidth
          disabled={!isFormValid}
          navigateTo={type === 'login' ? '/home' : '/login'}
        >
          {type === 'login' ? '로그인하기' : '가입하기'}
        </Button>
      </div>
    </section>
  );
}
