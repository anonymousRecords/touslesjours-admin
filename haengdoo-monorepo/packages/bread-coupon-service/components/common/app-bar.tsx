'use client';
import { useRouter } from 'next/navigation';

export type AppBarProps = {
  title?: string;
  LeftComp?: React.ReactNode;
  RightComp?: React.ReactNode;
};

export function BackButton() {
  const router = useRouter();
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 cursor-pointer"
      fill="none"
      viewBox="0 0 24 24"
      stroke="black"
      onClick={() => router.back()}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10 19l-7-7m0 0l7-7m-7 7h18"
      />
    </svg>
  );
}

export function AppBar({ title, LeftComp = <BackButton />, RightComp }: AppBarProps) {
  return (
    <header className={`h-[60px] w-full flex items-center`}>
      <div className="w-full flex justify-between items-center p-4 border-b-2">
        <div className="w-10">{LeftComp}</div>
        <h1 className="text-center font-semibold text-black text-lg">{title}</h1>
        <div className="w-10">{RightComp}</div>
      </div>
    </header>
  );
}
