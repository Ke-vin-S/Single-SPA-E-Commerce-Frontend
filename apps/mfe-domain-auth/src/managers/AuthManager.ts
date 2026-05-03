import { apiClient, API_ENDPOINTS } from '@miniecommerce-sysco/shared-api';
import type { LoginResponse, RegisterRequest, User } from '@miniecommerce-sysco/shared-types';

const dispatch = (action: { type: string; payload?: unknown }): void => {
  window.reduxStore?.dispatch?.(action);
};

export class AuthManager {
  async login(email: string, password: string): Promise<LoginResponse> {
    dispatch({ type: 'auth/setLoading', payload: true });
    try {
      const response = await apiClient.post<LoginResponse>(
        API_ENDPOINTS.AUTH.LOGIN,
        { email, password }
      );
      const { user } = response.data;
      dispatch({ type: 'auth/setUser', payload: user });
      return { user };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Login failed';
      dispatch({ type: 'auth/setError', payload: message });
      throw error;
    } finally {
      dispatch({ type: 'auth/setLoading', payload: false });
    }
  }

  async register(email: string, password: string, firstName: string, lastName: string): Promise<LoginResponse> {
    dispatch({ type: 'auth/setLoading', payload: true });
    try {
      const response = await apiClient.post<LoginResponse>(
        API_ENDPOINTS.AUTH.REGISTER,
        { email, password, firstName, lastName }
      );
      const { user } = response.data;
      dispatch({ type: 'auth/setUser', payload: user });
      return { user };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Registration failed';
      dispatch({ type: 'auth/setError', payload: message });
      throw error;
    } finally {
      dispatch({ type: 'auth/setLoading', payload: false });
    }
  }

  async logout(): Promise<void> {
    try {
      await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
    } catch (error) {
      console.error('Logout request failed:', error);
    } finally {
      dispatch({ type: 'auth/clearUser' });
    }
  }

  async getMe(): Promise<User | null> {
    try {
      const response = await apiClient.get<{ user: User }>(API_ENDPOINTS.AUTH.ME);
      const user = response.data.user;
      dispatch({ type: 'auth/setUser', payload: user });
      return user;
    } catch {
      dispatch({ type: 'auth/clearUser' });
      return null;
    }
  }
}

export const authManager = new AuthManager();
