import { AnimatedTitle } from "@/components/AnimatedTitle";

export default function Home() {
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
