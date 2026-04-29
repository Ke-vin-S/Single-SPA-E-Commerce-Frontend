import React from 'react';
import type { FormProps } from '../types';

const cls = (...parts: (string | false | null | undefined)[]) =>
  parts.filter(Boolean).join(' ');

export const Form: React.FC<FormProps> = ({ children, className, ...rest }) => (
  <form {...rest} className={cls('ds-form', className)}>
    {children}
  </form>
);
