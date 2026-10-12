import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md';

const base =
  'inline-flex min-h-[44px] select-none items-center justify-center gap-2 rounded-full font-medium transition-[background-color,border-color,color,transform] duration-200 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50';

const variants: Record<Variant, string> = {
  primary: 'bg-accent-600 text-white hover:bg-accent-700 shadow-[0_1px_0_rgb(255_255_255/0.15)_inset,0_8px_24px_-12px_rgb(47_95_232/0.8)]',
  secondary:
    'border border-white/[0.12] bg-white/[0.03] text-ink-200 hover:border-white/25 hover:bg-white/[0.07] hover:text-white',
  ghost: 'text-ink-300 hover:bg-white/[0.06] hover:text-white',
};

const sizes: Record<Size, string> = {
  sm: 'px-4 text-sm',
  md: 'px-6 text-[0.95rem]',
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  iconPosition?: 'start' | 'end';
  children: ReactNode;
}

export function buttonClasses(variant: Variant = 'primary', size: Size = 'md', className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}

export function ButtonLink({
  variant,
  size,
  icon,
  iconPosition = 'end',
  className,
  children,
  ...props
}: CommonProps & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a className={buttonClasses(variant, size, className)} {...props}>
      {iconPosition === 'start' && icon}
      {children}
      {iconPosition === 'end' && icon}
    </a>
  );
}

export function Button({
  variant,
  size,
  icon,
  iconPosition = 'end',
  className,
  children,
  type = 'button',
  ...props
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type={type} className={buttonClasses(variant, size, className)} {...props}>
      {iconPosition === 'start' && icon}
      {children}
      {iconPosition === 'end' && icon}
    </button>
  );
}
