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
    ADD: (cartId: string) => `/cart/${cartId}/items`,
    REMOVE: (cartId: string, id: string) => `/cart/${cartId}/items/${id}`,
    UPDATE: (cartId: string, id: string) => `/cart/${cartId}/items/${id}`,
    CLEAR: (cartId: string) => `/cart/${cartId}/clear`,
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
