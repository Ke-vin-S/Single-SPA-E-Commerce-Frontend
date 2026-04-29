import type { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';

interface AuthSlice {
  token?: string | null;
}

interface RefreshResponse {
  token: string;
}

const SET_AUTH = 'auth/setAuth';
const CLEAR_AUTH = 'auth/clearAuth';

const getToken = (): string | undefined => {
  try {
    const state = window.reduxStore?.getState?.() as { auth?: AuthSlice } | undefined;
    return state?.auth?.token ?? undefined;
  } catch {
    return undefined;
  }
};

export const setupInterceptors = (client: AxiosInstance): void => {
  client.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = getToken();
    if (token) {
      config.headers.set('Authorization', `Bearer ${token}`);
    }
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
          const refreshResponse = await client.post<RefreshResponse>('/auth/refresh');
          const { token } = refreshResponse.data;

          window.reduxStore?.dispatch?.({
            type: SET_AUTH,
            payload: { token },
          });

          originalRequest.headers.set('Authorization', `Bearer ${token}`);
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
