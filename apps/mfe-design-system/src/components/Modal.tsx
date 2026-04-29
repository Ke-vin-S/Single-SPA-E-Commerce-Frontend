import React, { useEffect, useId, useRef } from 'react';
import type { ModalProps } from '../types';
import { CloseIcon } from './Icons';

const cls = (...parts: (string | false | null | undefined)[]) =>
  parts.filter(Boolean).join(' ');

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md',
  className,
}) => {
  const titleId = useId();
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    previouslyFocused.current = document.activeElement as HTMLElement | null;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    dialogRef.current?.focus();
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = overflow;
      previouslyFocused.current?.focus?.();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="ds-modal-backdrop"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        tabIndex={-1}
        className={cls('ds-modal', `ds-modal--${size}`, className)}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div className="ds-modal__header">
            <h2 id={titleId} className="ds-modal__title">
              {title}
            </h2>
            <button
              type="button"
              className="ds-icon-button"
              aria-label="Close dialog"
              onClick={onClose}
            >
              <CloseIcon />
            </button>
          </div>
        )}
        <div className="ds-modal__body">{children}</div>
        {footer && <div className="ds-modal__footer">{footer}</div>}
      </div>
    </div>
  );
};
