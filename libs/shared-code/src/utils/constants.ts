export const DEFAULT_TIMEOUT_MS = 10_000;
export const DEFAULT_DEBOUNCE_MS = 300;
export const DEFAULT_PAGE_SIZE = 20;

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  CART: 'cart_v1',
  USER_PREFERENCES: 'user_preferences',
} as const;

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
} as const;
