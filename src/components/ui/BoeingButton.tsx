import { cn } from '@heroui/theme';
import React from 'react';
interface BoeingButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

export const BoeingButton = ({
  children,
  onClick,
  className = '',
  disabled = false
}: BoeingButtonProps) => {
  const cnClass = cn(
    'relative uppercase flex items-center justify-center py-4 px-8 min-w-[21.6875rem] h-[4rem] font-[400]',
    'bg-transparent border-2 border-white rounded-full',
    'transition-all duration-300',
    'hover:bg-white/10 active:bg-white/20 hover:border-white active:border-white',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    'text-[1.5625rem]',  
    'text-white', 
    className
  )
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cnClass}
    >
      {children}
    </button>
  );
}; 