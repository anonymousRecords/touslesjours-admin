'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

type ButtonVariant = 'primary' | 'secondary' | 'disabled';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  fullWidth?: boolean;
  navigateTo?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-green-600 hover:bg-green-700 text-white',
  secondary: 'bg-green-400 hover:bg-green-600 text-white',
  disabled: 'bg-gray-400 cursor-not-allowed text-white',
};

export function Button({
  children,
  variant = 'primary',
  fullWidth = false,
  navigateTo,
  disabled,
  onClick,
  className = '',
  ...props
}: ButtonProps) {
  const router = useRouter();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(event);
    }
    if (navigateTo && !disabled) {
      router.push(navigateTo);
    }
  };

  return (
    <button
      className={`
        py-3 px-4 rounded-md transition-colors duration-200
        ${variantStyles[disabled ? 'disabled' : variant]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      disabled={disabled}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
}
