import React from 'react';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Required for accessibility — describes the action. */
  'aria-label': string;
}

const cls = (...parts: (string | false | null | undefined)[]) =>
  parts.filter(Boolean).join(' ');

export const IconButton: React.FC<IconButtonProps> = ({
  children,
  className,
  ...rest
}) => (
  <button {...rest} className={cls('ds-icon-button', className)} type={rest.type ?? 'button'}>
    {children}
  </button>
);
