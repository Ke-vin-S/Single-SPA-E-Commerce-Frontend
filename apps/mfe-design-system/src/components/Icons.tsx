import React from 'react';

interface IconProps extends React.SVGAttributes<SVGElement> {
  size?: number;
}

const base = (size: number): React.SVGAttributes<SVGElement> => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
});

export const SearchIcon: React.FC<IconProps> = ({ size = 18, ...rest }) => (
  <svg {...base(size)} {...rest}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
);

export const BagIcon: React.FC<IconProps> = ({ size = 20, ...rest }) => (
  <svg {...base(size)} {...rest}>
    <path d="M5 8h14l-1.2 11.2a2 2 0 0 1-2 1.8H8.2a2 2 0 0 1-2-1.8L5 8Z" />
    <path d="M9 8V6a3 3 0 1 1 6 0v2" />
  </svg>
);

export const UserIcon: React.FC<IconProps> = ({ size = 18, ...rest }) => (
  <svg {...base(size)} {...rest}>
    <circle cx="12" cy="8" r="3.5" />
    <path d="M5 20c1.5-3.5 4.5-5 7-5s5.5 1.5 7 5" />
  </svg>
);

export const BellIcon: React.FC<IconProps> = ({ size = 18, ...rest }) => (
  <svg {...base(size)} {...rest}>
    <path d="M6 16V11a6 6 0 1 1 12 0v5l1.5 2.5h-15L6 16Z" />
    <path d="M10 20a2 2 0 0 0 4 0" />
  </svg>
);

export const SunIcon: React.FC<IconProps> = ({ size = 18, ...rest }) => (
  <svg {...base(size)} {...rest}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4" />
  </svg>
);

export const MoonIcon: React.FC<IconProps> = ({ size = 18, ...rest }) => (
  <svg {...base(size)} {...rest}>
    <path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z" />
  </svg>
);

export const CloseIcon: React.FC<IconProps> = ({ size = 18, ...rest }) => (
  <svg {...base(size)} {...rest}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export const PlusIcon: React.FC<IconProps> = ({ size = 16, ...rest }) => (
  <svg {...base(size)} {...rest}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const MinusIcon: React.FC<IconProps> = ({ size = 16, ...rest }) => (
  <svg {...base(size)} {...rest}>
    <path d="M5 12h14" />
  </svg>
);

export const CheckIcon: React.FC<IconProps> = ({ size = 18, ...rest }) => (
  <svg {...base(size)} {...rest}>
    <path d="m4 12 5 5 11-11" />
  </svg>
);

export const ArrowRightIcon: React.FC<IconProps> = ({ size = 16, ...rest }) => (
  <svg {...base(size)} {...rest}>
    <path d="M5 12h14M13 5l7 7-7 7" />
  </svg>
);

export const ChevronDownIcon: React.FC<IconProps> = ({ size = 16, ...rest }) => (
  <svg {...base(size)} {...rest}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export const PackageIcon: React.FC<IconProps> = ({ size = 24, ...rest }) => (
  <svg {...base(size)} {...rest}>
    <path d="M3 7.5 12 3l9 4.5v9L12 21l-9-4.5v-9Z" />
    <path d="m3 7.5 9 4.5 9-4.5M12 12v9" />
  </svg>
);

export const HeartIcon: React.FC<IconProps> = ({ size = 18, ...rest }) => (
  <svg {...base(size)} {...rest}>
    <path d="M12 20s-7-4.35-7-10a4 4 0 0 1 7-2.65A4 4 0 0 1 19 10c0 5.65-7 10-7 10Z" />
  </svg>
);
