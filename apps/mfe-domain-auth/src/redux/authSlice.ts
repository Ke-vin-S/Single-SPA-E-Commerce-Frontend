import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { AuthState, User } from '@miniecommerce-sysco/shared-types';

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    },
    clearUser: (state) => {
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

export const { setUser, clearUser, setLoading, setError } = authSlice.actions;

export const selectAuth = (state: { auth?: AuthState }): AuthState | undefined =>
  state?.auth;

export const selectUser = (state: { auth?: AuthState }): User | null | undefined =>
  state?.auth?.user;

export const selectIsAuthenticated = (state: { auth?: AuthState }): boolean =>
  state?.auth?.isAuthenticated ?? false;
