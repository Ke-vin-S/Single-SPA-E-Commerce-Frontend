# Shared Code - Claude Code Context

## Purpose
Utility functions **published as npm package**:
- Validation functions
- Formatting utilities
- Custom React hooks
- Local storage helpers
- Constants

## NOT Redux, NOT UI Components

Just pure functions and hooks.

## Folder Structure
```
libs/shared-code/src/
├── utils/
│   ├── validation.ts       (email, phone, card, etc)
│   ├── formatting.ts       (currency, date, number)
│   ├── constants.ts        (API URLs, timeouts)
│   └── index.ts
├── hooks/
│   ├── useDebounce.ts
│   ├── useLocalStorage.ts
│   ├── useFetch.ts
│   └── index.ts
├── services/
│   ├── localStorage.ts
│   ├── cache.ts
│   └── index.ts
└── index.ts
```

## Usage Everywhere

```typescript
import {
  validateEmail,
  validatePhone,
  formatCurrency,
  formatDate,
  useDebounce,
  useLocalStorage,
  API_ENDPOINTS,
} from '@myapp/shared-code';
```

## Examples

```typescript
// Validation
export const validateEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const validatePhone = (phone: string): boolean => {
  return /^\d{10}$/.test(phone.replace(/\D/g, ''));
};

// Formatting
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
};

// Custom Hook
export const useDebounce = (value: any, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};

// Constants
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
  },
  CART: {
    GET: '/cart',
    ADD: '/cart/add',
    REMOVE: '/cart/remove',
  },
  PRODUCTS: {
    LIST: '/products',
    GET: '/products/:id',
  },
};
```

## Publishing

```bash
# Build and publish
npm run build -w shared-code
npm publish -w shared-code

# In other packages
npm install @myapp/shared-code@1.0.0
```

## Key Rules
- ✅ Pure functions
- ✅ Custom hooks
- ✅ No business logic
- ✅ Independently versioned
- ✅ Used by ALL MFEs
- ❌ No Redux
- ❌ No API calls
- ❌ No UI components

## Dependencies
- typescript
- react (for hooks)
- react-dom (for hooks)

