import { authSlice } from './authSlice';

export const authReducer = authSlice.reducer;

export {
  setAuth,
  clearAuth,
  setLoading,
  setError,
  selectAuth,
} from './authSlice';
