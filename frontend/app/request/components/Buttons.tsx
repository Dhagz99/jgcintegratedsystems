'use client';

import { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

type ButtonProps = {
  type?: "button" | "submit" | "reset";
  label: string;
  variant?: 'success' | 'info' | 'danger' | 'secondary';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function ButtonComponents({
  type = 'button',
  label,
  variant = 'success',
  size = 'md',
  icon,
  className,
  ...props
}: ButtonProps) {
  const baseStyle =
    'inline-flex items-center justify-center rounded-md font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed';

  const sizeStyles = {
    xs: 'px-2 py-1 text-[0.6rem]',
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-5 py-3 text-base',
  };

  const variantStyles = {
    success: 'bg-[#32B695] text-white hover:bg-green-600',
    info: 'bg-blue-600 text-white hover:bg-blue-700',
    danger: 'bg-red-800 text-white hover:bg-red-900',
    secondary: 'bg-gray-100 text-black hover:bg-gray-200',
  };

  return (
    <button
      type={type}
      className={clsx(
        baseStyle,
        sizeStyles[size],
        variantStyles[variant],
        className
      )}
      {...props} // includes onClick, disabled, etc.
    >
      {icon && <span className="mr-2">{icon}</span>}
      {label}
    </button>
  );
}
