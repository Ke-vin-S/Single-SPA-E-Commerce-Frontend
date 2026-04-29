export const SYSCO_COLORS = {
  primary: '#1e40af',
  primaryLight: '#3b82f6',
  primaryDark: '#1e3a8a',

  secondary: '#7c3aed',
  accent: '#dc2626',

  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',

  neutral: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
} as const;

export type SyscoColors = typeof SYSCO_COLORS;
