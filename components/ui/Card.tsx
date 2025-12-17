import React from 'react';
import { cn } from '../../utils/cn';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: 'sm' | 'md' | 'lg';
}

const paddings = {
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export const Card: React.FC<CardProps> = ({ className, children, padding = 'md', ...props }) => (
  <div
    className={cn(
      'bg-white dark:bg-zinc-900 rounded-[32px] border border-zinc-100 dark:border-zinc-800 shadow-soft dark:shadow-none',
      paddings[padding],
      className,
    )}
    {...props}
  >
    {children}
  </div>
);

