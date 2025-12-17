import React from 'react';
import { cn } from '../../utils/cn';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'ghost' | 'solid';
  size?: 'sm' | 'md';
}

export const IconButton: React.FC<IconButtonProps> = ({
  children,
  variant = 'ghost',
  size = 'md',
  className,
  ...props
}) => {
  const variants = {
    ghost: 'hover:bg-zinc-100 text-zinc-600 dark:hover:bg-zinc-800 dark:text-zinc-400',
    solid: 'bg-zinc-900 text-white hover:bg-black dark:bg-white dark:text-black',
  };
  const sizes = {
    sm: 'p-2 rounded-full',
    md: 'p-3 rounded-full',
  };

  return (
    <button
      className={cn(
        'transition-colors inline-flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};

