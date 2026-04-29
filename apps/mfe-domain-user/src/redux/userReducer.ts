import { userSlice } from './userSlice';

export const userReducer = userSlice.reducer;

export {
  setProfile,
  setAddresses,
  addAddress,
  updateAddress,
  removeAddress,
  setPreferences,
  setLoading,
  setError,
  clearUser,
  selectUser,
} from './userSlice';
