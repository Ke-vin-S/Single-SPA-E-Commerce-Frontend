import React from 'react';
import { PlusIcon, MinusIcon } from './Icons';

interface QuantityStepperProps {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  'aria-label'?: string;
}

const cls = (...parts: (string | false | null | undefined)[]) =>
  parts.filter(Boolean).join(' ');

export const QuantityStepper: React.FC<QuantityStepperProps> = ({
  value,
  onChange,
  min = 1,
  max,
  size = 'md',
  'aria-label': ariaLabel = 'Quantity',
}) => {
  const dec = () => onChange(Math.max(min, value - 1));
  const inc = () => onChange(max != null ? Math.min(max, value + 1) : value + 1);

  return (
    <div className={cls('ds-stepper', `ds-stepper--${size}`)} role="group" aria-label={ariaLabel}>
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={dec}
        disabled={value <= min}
      >
        <MinusIcon />
      </button>
      <span className="ds-stepper__value" aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={inc}
        disabled={max != null && value >= max}
      >
        <PlusIcon />
      </button>
    </div>
  );
};
