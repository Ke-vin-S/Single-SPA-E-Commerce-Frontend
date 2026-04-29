import { apiClient, API_ENDPOINTS } from '@miniecommerce-sysco/shared-api';
import type { LoginResponse, RegisterRequest, User } from '@miniecommerce-sysco/shared-types';
import {
  setAuth,
  clearAuth,
  setLoading,
  setError,
} from '../redux/authReducer';

const dispatch = (action: { type: string; payload?: unknown }): void => {
  window.reduxStore?.dispatch?.(action);
};

export class AuthManager {
  async login(email: string, password: string): Promise<LoginResponse> {
    dispatch(setLoading(true));
    try {
      const response = await apiClient.post<LoginResponse>(
        API_ENDPOINTS.AUTH.LOGIN,
        { email, password }
      );
      const { token, user } = response.data;
      dispatch(setAuth({ token, user }));
      return { token, user };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Login failed';
      dispatch(setError(message));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }

  async register(payload: RegisterRequest): Promise<LoginResponse> {
    dispatch(setLoading(true));
    try {
      const response = await apiClient.post<LoginResponse>(
        API_ENDPOINTS.AUTH.REGISTER,
        payload
      );
      const { token, user } = response.data;
      dispatch(setAuth({ token, user }));
      return { token, user };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Registration failed';
      dispatch(setError(message));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }

  async logout(): Promise<void> {
    try {
      await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
    } catch (error) {
      console.error('Logout request failed:', error);
    } finally {
      dispatch(clearAuth());
    }
  }

  async fetchCurrentUser(): Promise<User | null> {
    try {
      const response = await apiClient.get<User>(API_ENDPOINTS.AUTH.ME);
      return response.data;
    } catch {
      return null;
    }
  }
}

export const authManager = new AuthManager();
