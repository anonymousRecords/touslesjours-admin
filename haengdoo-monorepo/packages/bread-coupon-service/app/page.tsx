import { Button } from '@/components/common';
import { DefaultLayout } from '@/components/layout';

function page() {
  return (
    <DefaultLayout appBarVisible={false}>
      <h1 className="w-full h-[300px] bg-yellow-200 mt-[250px]">식빵 쿠폰</h1>
      <div className="w-full flex flex-col gap-2 mt-auto mb-10">
        <Button navigateTo={'/login'}>로그인하기</Button>
        <Button navigateTo={'/signup'}>가입하기</Button>
      </div>
    </DefaultLayout>
  );
}

export default page;
