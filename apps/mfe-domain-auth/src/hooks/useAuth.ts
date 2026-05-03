import { useSelector } from 'react-redux';
import type { AuthState, LoginResponse, RegisterRequest, User } from '@miniecommerce-sysco/shared-types';
import { authManager } from '../managers/AuthManager';

interface UseAuthReturn {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<LoginResponse>;
  register: (email: string, password: string, firstName: string, lastName: string) => Promise<LoginResponse>;
  logout: () => Promise<void>;
  getMe: () => Promise<User | null>;
}

export const useAuth = (): UseAuthReturn => {
  const auth = useSelector((state: { auth?: AuthState }) => state.auth);

  return {
    user: auth?.user ?? null,
    isAuthenticated: auth?.isAuthenticated ?? false,
    isLoading: auth?.isLoading ?? false,
    error: auth?.error ?? null,
    login: (email, password) => authManager.login(email, password),
    register: (email, password, firstName, lastName) => authManager.register(email, password, firstName, lastName),
    logout: () => authManager.logout(),
    getMe: () => authManager.getMe(),
  };
};
