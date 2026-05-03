import type { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';

const CLEAR_AUTH = 'auth/clearUser';

export const setupInterceptors = (client: AxiosInstance): void => {
  client.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    // Cookies are sent automatically via withCredentials.
    // No need to manually set Authorization header.
    return config;
  });

  client.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as
        | (InternalAxiosRequestConfig & { _retried?: boolean })
        | undefined;

      if (
        error.response?.status === 401 &&
        originalRequest &&
        !originalRequest._retried &&
        !originalRequest.url?.includes('/auth/refresh')
      ) {
        originalRequest._retried = true;
        try {
          await client.post('/auth/refresh');
          return client(originalRequest);
        } catch (refreshError) {
          window.reduxStore?.dispatch?.({ type: CLEAR_AUTH });
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );
};
