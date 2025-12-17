import React from 'react';
import { cn } from '../../utils/cn';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: 'neutral' | 'info' | 'warning' | 'success' | 'danger';
}

const tones: Record<NonNullable<BadgeProps['tone']>, string> = {
  neutral: 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200',
  info: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-200',
  warning: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200',
  success: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200',
  danger: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200',
};

export const Badge: React.FC<BadgeProps> = ({ children, className, tone = 'neutral', ...props }) => (
  <span
    className={cn(
      'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider',
      tones[tone],
      className,
    )}
    {...props}
  >
    {children}
  </span>
);

