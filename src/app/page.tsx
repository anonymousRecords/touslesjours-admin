import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { AnimatedTitle } from '@/components/AnimatedTitle';
import { options } from './api/auth/[...nextauth]/options';

export default async function Home() {
  const session = await getServerSession(options);

  if (!session) {
    return (
      <p className="text-center text-gray-700 mt-4">
        로그인이 필요합니다.
        <Link href="/auth" className="ml-2 text-[#FFBF00] hover:underline">
          로그인 하기
        </Link>
      </p>
    );
  }

  return (
    <main>
      <div>홈 페이지입니다.</div>
      <div>
        <AnimatedTitle direction="rtl" />
        <AnimatedTitle direction="ltr" />
      </div>
    </main>
  );
}
