export { bootstrap, mount, unmount } from './bootstrap';

export { AuthManager, authManager } from './managers/AuthManager';
export { useAuth } from './hooks/useAuth';
export {
  authReducer,
  setAuth,
  clearAuth,
  setLoading,
  setError,
  selectAuth,
} from './redux/authReducer';
export { LoginPage } from './pages/LoginPage';
export { RegisterPage } from './pages/RegisterPage';

export type { User, AuthState, LoginRequest, LoginResponse, RegisterRequest } from '@miniecommerce-sysco/shared-types';
export { UserRole } from '@miniecommerce-sysco/shared-types';
