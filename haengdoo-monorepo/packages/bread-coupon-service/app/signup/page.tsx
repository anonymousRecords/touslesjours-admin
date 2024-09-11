'use client';

import { AuthForm } from '@/components/auth';
import { DefaultLayout } from '@/components/layout';

export default function SignUp() {
  return (
    <DefaultLayout appBarVisible={true} title="가입하기">
      <AuthForm
        type="signup"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      />
    </DefaultLayout>
  );
}
