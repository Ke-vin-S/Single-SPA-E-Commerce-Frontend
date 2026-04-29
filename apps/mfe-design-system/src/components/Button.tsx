import React from 'react';
import type { ButtonProps } from '../types';

const cls = (...parts: (string | false | null | undefined)[]) =>
  parts.filter(Boolean).join(' ');

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  fullWidth = false,
  disabled,
  className,
  children,
  ...rest
}) => (
  <button
    {...rest}
    disabled={disabled || isLoading}
    aria-busy={isLoading || undefined}
    className={cls(
      'ds-button',
      `ds-button--${variant}`,
      `ds-button--${size}`,
      fullWidth && 'ds-button--full',
      className
    )}
  >
    {isLoading && <span className="ds-button__spinner" aria-hidden="true" />}
    {children}
  </button>
);
