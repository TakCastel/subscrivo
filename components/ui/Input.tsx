import React from 'react';
import { cn } from '../../utils/cn';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
}

export const Input: React.FC<InputProps> = ({ label, hint, id, className, ...props }) => (
  <div className="space-y-2">
    {label && (
      <label htmlFor={id} className="block text-[10px] font-black text-zinc-400 uppercase tracking-widest">
        {label}
      </label>
    )}
    <input
      id={id}
      className={cn(
        'w-full px-5 py-4 bg-zinc-100 dark:bg-zinc-900 border-none rounded-2xl focus:ring-0 focus:bg-zinc-200 dark:focus:bg-zinc-800 text-zinc-900 dark:text-white font-bold transition-all',
        className,
      )}
      {...props}
    />
    {hint && <p className="text-xs text-zinc-400">{hint}</p>}
  </div>
);

