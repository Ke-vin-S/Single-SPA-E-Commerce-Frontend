import { useEffect } from 'react';
import { apiClient } from '@miniecommerce-sysco/shared-api';
import type { User } from '@miniecommerce-sysco/shared-types';

const setUser = (payload: User) => ({ type: 'auth/setUser', payload });
const clearUser = () => ({ type: 'auth/clearUser' });

export const AuthInitializer: React.FC = () => {
  useEffect(() => {
    apiClient
      .get<{ user: User }>('/auth/me')
      .then((res) => {
        window.reduxStore?.dispatch?.(setUser(res.data.user));
      })
      .catch((err) => {
        if (err.response?.status === 401) {
          window.reduxStore?.dispatch?.(clearUser());
        }
      });
  }, []);

  return null;
};
