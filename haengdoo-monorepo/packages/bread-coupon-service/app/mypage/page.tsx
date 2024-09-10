'use client';
import { Pencil, Check, X } from 'lucide-react';
import React, { useState } from 'react';
import { Dialog } from '@/components/common';
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
  const [isEditing, setIsEditing] = useState<'name' | 'phoneNumber' | null>(null);
  const [tempInfo, setTempInfo] = useState<UserInfo>(userInfo);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);

  const handleEdit = (field: 'name' | 'phoneNumber') => {
    setIsEditing(field);
    setTempInfo(userInfo);
  };

  const handleSave = () => {
    setUserInfo(tempInfo);
    setIsEditing(null);
  };

  const handleCancel = () => {
    setTempInfo(userInfo);
    setIsEditing(null);
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

  const renderEditableField = (field: 'name' | 'phoneNumber', label: string) => (
    <div className="mb-4">
      <label className="font-bold">{label}</label>
      <div className="flex items-center relative">
        {isEditing === field ? (
          <>
            <input
              type="text"
              name={field}
              value={tempInfo[field]}
              onChange={(e) => setTempInfo({ ...tempInfo, [field]: e.target.value })}
              className="pr-16 border-b-2 border-gray-400 focus:outline-none"
            />
            <div className="absolute right-0 flex">
              <Check className="w-6 h-6 cursor-pointer text-green-600 mr-2" onClick={handleSave} />
              <X className="w-6 h-6 cursor-pointer text-red-500" onClick={handleCancel} />
            </div>
          </>
        ) : (
          <>
            <span className="mr-2">{userInfo[field]}</span>
            <Pencil className="w-4 h-4 cursor-pointer" onClick={() => handleEdit(field)} />
          </>
        )}
      </div>
    </div>
  );

  return (
    <DefaultLayout appBarVisible={false} navigationBarVisible={true}>
      <h1 className="text-2xl font-bold mb-6 mt-10">마이페이지</h1>
      <h3 className="text-xl font-semibold mb-3">회원 정보</h3>
      {renderEditableField('name', '이름')}
      {renderEditableField('phoneNumber', '전화번호')}

      <div className="flex flex-col gap-3 text-gray-300">
        <button className="hover:text-gray-800" onClick={() => setIsLogoutModalOpen(true)}>
          로그아웃
        </button>
        <button className="" onClick={() => setIsWithdrawModalOpen(true)}>
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
