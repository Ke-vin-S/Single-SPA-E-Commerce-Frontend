import React from 'react';
import type { InputProps } from '../types';

const cls = (...parts: (string | false | null | undefined)[]) =>
  parts.filter(Boolean).join(' ');

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  className,
  id,
  ...rest
}) => {
  const inputId = id ?? rest.name ?? `input-${Math.random().toString(36).slice(2, 8)}`;
  const describedBy = error
    ? `${inputId}-error`
    : helperText
    ? `${inputId}-helper`
    : undefined;

  return (
    <div className="ds-field">
      {label && (
        <label htmlFor={inputId} className="ds-field__label">
          {label}
        </label>
      )}
      <input
        id={inputId}
        {...rest}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={cls('ds-input', error && 'ds-input--error', className)}
      />
      {error && (
        <span id={`${inputId}-error`} className="ds-field__error" role="alert">
          {error}
        </span>
      )}
      {!error && helperText && (
        <span id={`${inputId}-helper`} className="ds-field__helper">
          {helperText}
        </span>
      )}
    </div>
  );
};
