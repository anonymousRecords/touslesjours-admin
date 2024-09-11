'use client';

import { AuthForm } from '@/components/auth';
import { DefaultLayout } from '@/components/layout';

export default function Login() {
  return (
    <DefaultLayout appBarVisible={true} title="로그인하기">
      <AuthForm
        type="login"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      />
    </DefaultLayout>
  );
}
