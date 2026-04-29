import React from 'react';

export type BadgeVariant = 'default' | 'accent' | 'success' | 'warning' | 'danger' | 'outline';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  count?: boolean;
  className?: string;
}

const cls = (...parts: (string | false | null | undefined)[]) =>
  parts.filter(Boolean).join(' ');

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  count = false,
  className,
}) => (
  <span
    className={cls(
      'ds-badge',
      variant !== 'default' && `ds-badge--${variant}`,
      count && 'ds-badge--count',
      className
    )}
  >
    {children}
  </span>
);
