import React from 'react';
import { cn } from '../../utils/cn';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
}

export const Select: React.FC<SelectProps> = ({ label, id, className, children, ...props }) => (
  <div className="space-y-2 relative">
    {label && (
      <label htmlFor={id} className="block text-[10px] font-black text-zinc-400 uppercase tracking-widest">
        {label}
      </label>
    )}
    <select
      id={id}
      className={cn(
        'w-full px-5 py-4 bg-zinc-100 dark:bg-zinc-900 border-none rounded-2xl focus:ring-0 focus:bg-zinc-200 dark:focus:bg-zinc-800 text-zinc-900 dark:text-white font-bold appearance-none cursor-pointer transition-all',
        className,
      )}
      {...props}
    >
      {children}
    </select>
    <span className="pointer-events-none absolute right-4 top-[50%] -translate-y-1/2 text-zinc-400">▾</span>
  </div>
);

