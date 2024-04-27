import Image from "next/image";

export default function Navbar() {
  const navItems = [
    {
      name: '냉판 담당자',
      href: '/',
    },
  ];

  return (
    <>
      <nav className="shadow-sm  sticky top-0 left-0 z-50 bg-[#0C4630]">
        <div className="h-[80px]     w-full    flex   justify-between items-center  max-w-7xl px-3 mx-auto">
          <p className="flex items-center justify-center gap-2  ">
            <Image src="/svg/logo.svg" alt="logo" width={200} height={50} />
          </p>
          {/*  */}
          <section className="flex gap-2 items-center">
            {navItems.map((item) => (
              <button key={item.name} className="text-white hover:font-bold">
                {item.name}
              </button>
            ))}
          </section>
        </div>
      </nav>
    </>
  );
}
