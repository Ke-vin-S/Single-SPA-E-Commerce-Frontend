# Shared API Client - Claude Code Context

## Purpose
Centralized HTTP client **published as npm package**:
- axios instance
- Request/response interceptors
- Auth token injection
- 401 error handling
- API endpoints configuration

**Used ONLY by domain managers** (never in components)

## Folder Structure
```
libs/shared-api/src/
├── client.ts              ← axios instance
├── interceptors.ts        ← Request/response middleware
├── constants.ts           ← API endpoints
└── index.ts
```

## client.ts

```typescript
import axios from 'axios';
import { setupInterceptors } from './interceptors';

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

setupInterceptors(apiClient);

export default apiClient;
```

## interceptors.ts

```typescript
export const setupInterceptors = (client) => {
  // Request interceptor
  client.interceptors.request.use((config) => {
    // Add auth token
    const token = window.reduxStore?.getState?.()?.auth?.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  // Response interceptor
  client.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response?.status === 401) {
        // Token expired, try refresh
        try {
          const refreshResponse = await client.post('/auth/refresh');
          const { token } = refreshResponse.data;

          window.reduxStore.dispatch(setAuth(token));

          // Retry original request
          error.config.headers.Authorization = `Bearer ${token}`;
          return client(error.config);
        } catch {
          window.reduxStore.dispatch(clearAuth());
        }
      }
      return Promise.reject(error);
    }
  );
};
```

## constants.ts

```typescript
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    REGISTER: '/auth/register',
  },
  CART: {
    GET: '/cart',
    ADD: '/cart/add',
    REMOVE: '/cart/remove/:id',
    UPDATE: '/cart/update/:id',
    CLEAR: '/cart/clear',
  },
  PRODUCTS: {
    LIST: '/products',
    GET: '/products/:id',
    SEARCH: '/products/search',
  },
  USER: {
    PROFILE: '/user/profile',
    UPDATE_PROFILE: '/user/profile',
    ADDRESSES: '/user/addresses',
    ADD_ADDRESS: '/user/addresses',
    UPDATE_ADDRESS: '/user/addresses/:id',
  },
};
```

## Usage (Only in Domain Managers)

```typescript
import { apiClient } from '@myapp/shared-api';

// In AuthManager
export class AuthManager {
  async login(email, password) {
    const response = await apiClient.post('/auth/login', {
      email,
      password
    });
    return response.data;
  }
}

// In CartManager
export class CartManager {
  async addItem(product) {
    const response = await apiClient.post('/cart/add', {
      productId: product.id
    });
    return response.data;
  }
}
```

## NOT in Components (WRONG)

```typescript
// ❌ WRONG - don't do this in feature MFEs
import { apiClient } from '@shared/api';

const Component = () => {
  useEffect(() => {
    apiClient.get('/products'); // NO!
  }, []);
};

// ✅ RIGHT - use domain hooks
const { products } = useProducts(); // From domain
```

## Publishing

```bash
npm run build -w shared-api
npm publish -w shared-api

# In domain packages
npm install @myapp/shared-api@1.0.0
```

## Key Rules
- ✅ Used by domain managers
- ✅ Handles auth tokens
- ✅ Handles 401 refresh
- ✅ Configurable endpoints
- ❌ Never in components
- ❌ Never in feature MFEs

## Dependencies
- axios
- (optional) react-redux (for accessing store)
