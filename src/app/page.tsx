import dynamic from 'next/dynamic';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { options } from './api/auth/[...nextauth]/options';

const ClientShaderGradient = dynamic(() => import('../components/ShaderGradient/ShaderGradient'), {
  ssr: false,
});

export default async function Home() {
  const session = await getServerSession(options);

  if (!session) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-center text-gray-700">
          로그인이 필요합니다.
          <Link href="/auth" className="ml-2 text-[#FFBF00] hover:underline">
            로그인 하기
          </Link>
        </p>
      </div>
    );
  }

  return (
    <main className="relative w-screen h-screen overflow-hidden">
      <ClientShaderGradient />
      <div className="absolute top-8 left-8 md:top-16 md:left-16 text-white">
        <p className="text-2xl md:text-4xl lg:text-5xl font-bold leading-tight md:leading-tight lg:leading-tight">
          행복한 뚜레쥬르에서의
          <br />
          아르바이트 생활을
          <br />
          위하여
        </p>
      </div>
      <div className="absolute bottom-8 right-8 md:bottom-16 md:right-16 text-white">
        <h1 className="text-4xl md:text-8xl lg:text-8xl font-bold">행뚜</h1>
      </div>
    </main>
  );
}
