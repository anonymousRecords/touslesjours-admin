'use client';
import React, { useState } from 'react';
import { Dialog } from '@/components/common';
import { EditableField } from '@/components/common';
import { DefaultLayout } from '@/components/layout';

interface UserInfo {
  name: string;
  phoneNumber: string;
}

export default function MyPage() {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: '홍길동',
    phoneNumber: '010-1234-5678',
  });
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);

  const handleInfoChange = (field: keyof UserInfo, value: string) => {
    setUserInfo((prevInfo) => ({ ...prevInfo, [field]: value }));
  };

  const handleLogout = () => {
    // 로그아웃 로직 구현
    console.log('로그아웃');
    setIsLogoutModalOpen(false);
  };

  const handleWithdraw = () => {
    // 회원탈퇴 로직 구현
    console.log('회원탈퇴');
    setIsWithdrawModalOpen(false);
  };

  return (
    <DefaultLayout appBarVisible={false} navigationBarVisible={true}>
      <h1 className="text-2xl font-bold mb-6 mt-10">마이페이지</h1>
      <h3 className="text-xl font-semibold mb-3">회원 정보</h3>

      <EditableField
        label="이름"
        value={userInfo.name}
        onChange={(value: string) => handleInfoChange('name', value)}
      />
      <EditableField
        label="전화번호"
        value={userInfo.phoneNumber}
        onChange={(value: string) => handleInfoChange('phoneNumber', value)}
      />

      <div className="flex flex-col gap-3 text-gray-300">
        <button className="hover:text-gray-800" onClick={() => setIsLogoutModalOpen(true)}>
          로그아웃
        </button>
        <button className="hover:text-gray-800" onClick={() => setIsWithdrawModalOpen(true)}>
          회원탈퇴
        </button>
      </div>

      <Dialog
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
        title="로그아웃"
        message="정말로 로그아웃 하시겠습니까?"
      />

      <Dialog
        isOpen={isWithdrawModalOpen}
        onClose={() => setIsWithdrawModalOpen(false)}
        onConfirm={handleWithdraw}
        title="회원탈퇴"
        message="정말로 탈퇴하시겠습니까? 이 작업은 되돌릴 수 없습니다."
        confirmText="탈퇴하기"
        isDangerous={true}
      />
    </DefaultLayout>
  );
}
