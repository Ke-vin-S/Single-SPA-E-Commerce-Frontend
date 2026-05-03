import { authSlice } from './authSlice';

export const authReducer = authSlice.reducer;

export { authSlice } from './authSlice';
export {
  setUser,
  clearUser,
  setLoading,
  setError,
  selectAuth,
  selectUser,
  selectIsAuthenticated,
} from './authSlice';
