import React from 'react';

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  variant?: 'rect' | 'text' | 'circle';
  style?: React.CSSProperties;
  className?: string;
}

const cls = (...parts: (string | false | null | undefined)[]) =>
  parts.filter(Boolean).join(' ');

export const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = '1em',
  variant = 'rect',
  style,
  className,
}) => (
  <span
    aria-hidden="true"
    className={cls(
      'ds-skeleton',
      variant === 'text' && 'ds-skeleton--text',
      variant === 'circle' && 'ds-skeleton--circle',
      className
    )}
    style={{ width, height, ...style }}
  />
);
