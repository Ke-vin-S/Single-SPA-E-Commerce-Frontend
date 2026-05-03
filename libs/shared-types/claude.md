# Shared Types - Claude Code Context

## Purpose
TypeScript interfaces **published as npm package**:
- API response types
- Domain types
- **Header types (NEW)**
- Enums

## Folder Structure
```
libs/shared-types/src/
├── api.types.ts
├── header.types.ts         ← NEW: Header state types
├── auth.types.ts
├── cart.types.ts
├── user.types.ts
├── common.types.ts
└── index.ts
```

## NEW: Header Types

```typescript
// header.types.ts
export interface HeaderState {
  isVisible: boolean;
  showSearch: boolean;
  showNotifications: boolean;
  showCart: boolean;
  showUser: boolean;
  fields: {
    title: string;
    subtitle: string;
  };
}

export interface UpdateHeaderFieldsPayload {
  title?: string;
  subtitle?: string;
}

export interface HeaderField {
  showSearch: boolean;
  showNotifications: boolean;
  showCart: boolean;
  showUser: boolean;
}
```

## Core Types

```typescript
// api.types.ts
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: ApiError;
}

export interface ApiError {
  code: string;
  message: string;
  details?: any;
}

// auth.types.ts
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

// cart.types.ts
export interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  price: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
}

// common.types.ts
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image?: string;
  inStock: boolean;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
}

// Enums
export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
  MODERATOR = 'moderator',
}

export enum OrderStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
}
```

## Usage

```typescript
import type {
  HeaderState,
  User,
  Product,
  Cart
} from '@myapp/shared-types';

const header: HeaderState = useSelector(state => state?.header);
const { user }: { user: User } = useAuth();
const products: Product[] = await apiClient.get('/products');
```

## Exports (index.ts)

```typescript
export type { ApiResponse, ApiError } from './api.types';
export type { HeaderState, UpdateHeaderFieldsPayload } from './header.types';
export type { User, LoginRequest, LoginResponse } from './auth.types';
export type { CartItem, Cart } from './cart.types';
export type { Product, Order } from './common.types';
export { UserRole, OrderStatus } from './auth.types';
```

## Publishing

```bash
npm run build -w shared-types
npm publish -w shared-types

# In other packages
npm install @myapp/shared-types@1.0.0
```

## Key Rules
- ✅ Interfaces only
- ✅ Enums for fixed values
- ✅ Type exports only
- ✅ Used everywhere
- ❌ No logic
- ❌ No functions
- ❌ No default values

## Dependencies
- typescript
