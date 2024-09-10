'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

interface IconProps {
  isActive: boolean;
}

function HomeIcon({ isActive }: IconProps) {
  const strokeColor = isActive ? '#16a34a' : 'currentColor';

  return (
    <svg
      width="24px"
      height="24px"
      viewBox="0 -0.5 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.10572 9.36198C4.75336 9.57974 4.64425 10.0419 4.862 10.3943C5.07976 10.7466 5.54193 10.8557 5.89428 10.638L5.10572 9.36198ZM7.89428 9.40198C8.24664 9.18422 8.35575 8.72205 8.138 8.3697C7.92024 8.01734 7.45807 7.90823 7.10572 8.12598L7.89428 9.40198ZM8.25 8.76398C8.25 8.34977 7.91421 8.01398 7.5 8.01398C7.08579 8.01398 6.75 8.34977 6.75 8.76398H8.25ZM10.5 17.75C10.9142 17.75 11.25 17.4142 11.25 17C11.25 16.5858 10.9142 16.25 10.5 16.25V17.75ZM7.10562 8.12604C6.7533 8.34385 6.64425 8.80604 6.86206 9.15836C7.07987 9.51068 7.54206 9.61973 7.89438 9.40192L7.10562 8.12604ZM11.662 6.19098L11.337 5.51504C11.3132 5.52648 11.2901 5.53916 11.2676 5.55304L11.662 6.19098ZM13.338 6.19098L13.7324 5.55304C13.7099 5.53916 13.6868 5.52648 13.663 5.51504L13.338 6.19098ZM17.1056 9.40192C17.4579 9.61973 17.9201 9.51068 18.1379 9.15836C18.3557 8.80604 18.2467 8.34385 17.8944 8.12604L17.1056 9.40192ZM9.75 17C9.75 17.4142 10.0858 17.75 10.5 17.75C10.9142 17.75 11.25 17.4142 11.25 17H9.75ZM13.75 17C13.75 17.4142 14.0858 17.75 14.5 17.75C14.9142 17.75 15.25 17.4142 15.25 17H13.75ZM10.5 16.25C10.0858 16.25 9.75 16.5858 9.75 17C9.75 17.4142 10.0858 17.75 10.5 17.75V16.25ZM14.5 17.75C14.9142 17.75 15.25 17.4142 15.25 17C15.25 16.5858 14.9142 16.25 14.5 16.25V17.75ZM14.5 16.25C14.0858 16.25 13.75 16.5858 13.75 17C13.75 17.4142 14.0858 17.75 14.5 17.75V16.25ZM18.25 8.76398C18.25 8.34977 17.9142 8.01398 17.5 8.01398C17.0858 8.01398 16.75 8.34977 16.75 8.76398H18.25ZM17.8943 8.12598C17.5419 7.90823 17.0798 8.01734 16.862 8.3697C16.6442 8.72205 16.7534 9.18422 17.1057 9.40198L17.8943 8.12598ZM19.1057 10.638C19.4581 10.8557 19.9202 10.7466 20.138 10.3943C20.3558 10.0419 20.2466 9.57974 19.8943 9.36198L19.1057 10.638ZM5.89428 10.638L7.89428 9.40198L7.10572 8.12598L5.10572 9.36198L5.89428 10.638ZM6.75 8.76398V15.5H8.25V8.76398H6.75ZM6.75 15.5C6.75 16.1176 6.90676 16.7486 7.43266 17.1962C7.92874 17.6184 8.61023 17.75 9.35 17.75V16.25C8.73977 16.25 8.49626 16.1317 8.40484 16.0538C8.34324 16.0014 8.25 15.8824 8.25 15.5H6.75ZM9.35 17.75H10.5V16.25H9.35V17.75ZM7.89438 9.40192L12.0564 6.82892L11.2676 5.55304L7.10562 8.12604L7.89438 9.40192ZM11.987 6.86692C12.3112 6.71103 12.6888 6.71103 13.013 6.86692L13.663 5.51504C12.9279 5.16165 12.0721 5.16165 11.337 5.51504L11.987 6.86692ZM12.9436 6.82892L17.1056 9.40192L17.8944 8.12604L13.7324 5.55304L12.9436 6.82892ZM11.25 17V16H9.75V17H11.25ZM11.25 16C11.25 15.3096 11.8096 14.75 12.5 14.75V13.25C10.9812 13.25 9.75 14.4812 9.75 16H11.25ZM12.5 14.75C13.1904 14.75 13.75 15.3096 13.75 16H15.25C15.25 14.4812 14.0188 13.25 12.5 13.25V14.75ZM13.75 16V17H15.25V16H13.75ZM10.5 17.75H14.5V16.25H10.5V17.75ZM14.5 17.75H15.65V16.25H14.5V17.75ZM15.65 17.75C16.3898 17.75 17.0713 17.6184 17.5673 17.1962C18.0932 16.7486 18.25 16.1176 18.25 15.5H16.75C16.75 15.8824 16.6568 16.0014 16.5952 16.0538C16.5037 16.1317 16.2602 16.25 15.65 16.25V17.75ZM18.25 15.5V8.76398H16.75V15.5H18.25ZM17.1057 9.40198L19.1057 10.638L19.8943 9.36198L17.8943 8.12598L17.1057 9.40198Z"
        fill={strokeColor}
      />
    </svg>
  );
}

function CouponIcon({ isActive }: IconProps) {
  const strokeColor = isActive ? '#16a34a' : 'currentColor';

  return (
    <svg
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M3.75 6.75L4.5 6H20.25L21 6.75V10.7812H20.25C19.5769 10.7812 19.0312 11.3269 19.0312 12C19.0312 12.6731 19.5769 13.2188 20.25 13.2188H21V17.25L20.25 18L4.5 18L3.75 17.25V13.2188H4.5C5.1731 13.2188 5.71875 12.6731 5.71875 12C5.71875 11.3269 5.1731 10.7812 4.5 10.7812H3.75V6.75ZM5.25 7.5V9.38602C6.38677 9.71157 7.21875 10.7586 7.21875 12C7.21875 13.2414 6.38677 14.2884 5.25 14.614V16.5L9 16.5L9 7.5H5.25ZM10.5 7.5V16.5L19.5 16.5V14.614C18.3632 14.2884 17.5312 13.2414 17.5312 12C17.5312 10.7586 18.3632 9.71157 19.5 9.38602V7.5H10.5Z"
        fill={strokeColor}
      />
    </svg>
  );
}

function MyPageIcon({ isActive }: IconProps) {
  const strokeColor = isActive ? '#16a34a' : 'currentColor';

  return (
    <svg
      width="24px"
      height="24px"
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      stroke-width="3"
      stroke={strokeColor}
      fill="none"
    >
      <circle cx="32" cy="18.14" r="11.14" />
      <path d="M54.55,56.85A22.55,22.55,0,0,0,32,34.3h0A22.55,22.55,0,0,0,9.45,56.85Z" />
    </svg>
  );
}

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

function NavItem({ href, icon, label }: NavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href;
  const activeClass = isActive ? 'text-green-600' : 'text-gray-600';

  return (
    <Link href={href} className={`flex flex-col justify-center items-center ${activeClass}`}>
      {React.cloneElement(icon as React.ReactElement, { isActive })}
      <span className="block text-xs">{label}</span>
    </Link>
  );
}

// NavigationBar 컴포넌트
export const NavigationBar: React.FC = () => {
  return (
    <nav className="w-full bg-white border-t border-gray-200">
      <div className="flex justify-around items-center h-16">
        <NavItem href="/coupon" icon={<CouponIcon isActive={false} />} label="쿠폰함" />
        <NavItem href="/home" icon={<HomeIcon isActive={false} />} label="홈" />
        <NavItem href="/mypage" icon={<MyPageIcon isActive={false} />} label="마이페이지" />
      </div>
    </nav>
  );
};