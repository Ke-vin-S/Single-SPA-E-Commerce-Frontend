import { useSelector } from 'react-redux';
import type { AuthState, LoginResponse, RegisterRequest, User } from '@miniecommerce-sysco/shared-types';
import { authManager } from '../managers/AuthManager';

interface UseAuthReturn {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<LoginResponse>;
  register: (payload: RegisterRequest) => Promise<LoginResponse>;
  logout: () => Promise<void>;
}

export const useAuth = (): UseAuthReturn => {
  const auth = useSelector((state: { auth?: AuthState }) => state.auth);

  return {
    token: auth?.token ?? null,
    user: auth?.user ?? null,
    isAuthenticated: auth?.isAuthenticated ?? false,
    isLoading: auth?.isLoading ?? false,
    error: auth?.error ?? null,
    login: (email, password) => authManager.login(email, password),
    register: (payload) => authManager.register(payload),
    logout: () => authManager.logout(),
  };
};
