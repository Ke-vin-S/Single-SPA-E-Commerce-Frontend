import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { AuthState, User } from '@miniecommerce-sysco/shared-types';

const initialState: AuthState = {
  token: null,
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

interface SetAuthPayload {
  token: string;
  user: User;
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<SetAuthPayload>) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.error = null;
    },
    clearAuth: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setAuth, clearAuth, setLoading, setError } = authSlice.actions;

export const selectAuth = (state: { auth?: AuthState }): AuthState | undefined =>
  state?.auth;
