import dynamic from 'next/dynamic';

const ClientShaderGradient = dynamic(() => import('../components/ShaderGradient/ShaderGradient'), {
  ssr: false,
});

export default async function Home() {
  return (
    <div className="relative h-[calc(100vh-5rem)]">
      <ClientShaderGradient />

      <div className="absolute top-8 left-8 text-white">
        <p className="text-2xl md:text-4xl lg:text-5xl font-bold leading-tight md:leading-tight lg:leading-tight">
          행복한 뚜레쥬르에서의
          <br />
          아르바이트 생활을
          <br />
          위하여
        </p>
      </div>

      <div className="absolute bottom-8 right-8 text-white">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold">행뚜</h1>
      </div>
    </div>
  );
}
