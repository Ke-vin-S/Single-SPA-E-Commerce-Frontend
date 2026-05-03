export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    REGISTER: '/auth/register',
    ME: '/auth/me',
  },
  CART: {
    GET: '/cart',
    ADD: '/cart/items',
    REMOVE: (id: string) => `/cart/items/${id}`,
    UPDATE: (id: string) => `/cart/items/${id}`,
    CLEAR: '/cart/clear',
  },
  PRODUCTS: {
    LIST: '/products',
    GET: (id: string) => `/products/${id}`,
  },
  USER: {
    PROFILE: '/users/me',
    UPDATE_PROFILE: '/users/me',
  },
  ORDERS: {
    LIST: '/orders',
  },
} as const;
