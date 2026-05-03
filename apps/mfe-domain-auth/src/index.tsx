export { bootstrap, mount, unmount } from './bootstrap';

export { AuthManager, authManager } from './managers/AuthManager';
export { useAuth } from './hooks/useAuth';
export { authSlice, authReducer } from './redux/authReducer';
export {
  setUser,
  clearUser,
  setLoading,
  setError,
  selectAuth,
  selectUser,
  selectIsAuthenticated,
} from './redux/authReducer';
export { LoginPage } from './pages/LoginPage';
export { RegisterPage } from './pages/RegisterPage';

export type { User, AuthState, LoginRequest, LoginResponse, RegisterRequest } from '@miniecommerce-sysco/shared-types';
export { UserRole } from '@miniecommerce-sysco/shared-types';
