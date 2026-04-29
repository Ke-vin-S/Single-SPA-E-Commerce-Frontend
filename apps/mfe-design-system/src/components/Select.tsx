import React from 'react';
import type { SelectProps } from '../types';

const cls = (...parts: (string | false | null | undefined)[]) =>
  parts.filter(Boolean).join(' ');

export const Select: React.FC<SelectProps> = ({
  label,
  options,
  error,
  className,
  id,
  ...rest
}) => {
  const selectId =
    id ?? rest.name ?? `select-${Math.random().toString(36).slice(2, 8)}`;

  return (
    <div className="ds-field">
      {label && (
        <label htmlFor={selectId} className="ds-field__label">
          {label}
        </label>
      )}
      <select
        id={selectId}
        {...rest}
        aria-invalid={error ? true : undefined}
        className={cls('ds-select', error && 'ds-select--error', className)}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <span className="ds-field__error" role="alert">{error}</span>}
    </div>
  );
};
