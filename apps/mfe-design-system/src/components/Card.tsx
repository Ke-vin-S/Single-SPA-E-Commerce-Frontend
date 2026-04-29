import React from 'react';
import type { CardProps } from '../types';

interface CardSubProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const cls = (...parts: (string | false | null | undefined)[]) =>
  parts.filter(Boolean).join(' ');

interface CardComponentProps extends CardProps {
  interactive?: boolean;
}

const CardComponent: React.FC<CardComponentProps> = ({
  children,
  className,
  style,
  interactive,
}) => (
  <div
    className={cls('ds-card', interactive && 'ds-card--interactive', className)}
    style={style}
  >
    {children}
  </div>
);

const Header: React.FC<CardSubProps> = ({ children, className, style }) => (
  <div className={cls('ds-card__header', className)} style={style}>
    {children}
  </div>
);

const Title: React.FC<CardSubProps> = ({ children, className, style }) => (
  <h3 className={cls('ds-card__title', className)} style={style}>
    {children}
  </h3>
);

const Content: React.FC<CardSubProps> = ({ children, className, style }) => (
  <div className={cls('ds-card__content', className)} style={style}>
    {children}
  </div>
);

const Footer: React.FC<CardSubProps> = ({ children, className, style }) => (
  <div className={cls('ds-card__footer', className)} style={style}>
    {children}
  </div>
);

type CardCompound = React.FC<CardComponentProps> & {
  Header: typeof Header;
  Title: typeof Title;
  Content: typeof Content;
  Footer: typeof Footer;
};

export const Card = CardComponent as CardCompound;
Card.Header = Header;
Card.Title = Title;
Card.Content = Content;
Card.Footer = Footer;
