import React from 'react';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
}) => (
  <div className="ds-empty">
    {icon && <div className="ds-empty__icon">{icon}</div>}
    <h3 className="ds-empty__title">{title}</h3>
    {description && <p className="ds-empty__description">{description}</p>}
    {action}
  </div>
);
