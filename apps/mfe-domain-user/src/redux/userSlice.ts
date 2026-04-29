import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type {
  Address,
  UserPreferences,
  UserProfile,
  UserState,
} from '@miniecommerce-sysco/shared-types';

const initialState: UserState = {
  profile: null,
  addresses: [],
  preferences: {
    newsletter: false,
    notifications: true,
    theme: 'light',
  },
  isLoading: false,
  error: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<UserProfile | null>) => {
      state.profile = action.payload;
    },
    setAddresses: (state, action: PayloadAction<Address[]>) => {
      state.addresses = action.payload;
    },
    addAddress: (state, action: PayloadAction<Address>) => {
      state.addresses.push(action.payload);
    },
    updateAddress: (state, action: PayloadAction<Address>) => {
      const index = state.addresses.findIndex((a) => a.id === action.payload.id);
      if (index >= 0) state.addresses[index] = action.payload;
    },
    removeAddress: (state, action: PayloadAction<string>) => {
      state.addresses = state.addresses.filter((a) => a.id !== action.payload);
    },
    setPreferences: (state, action: PayloadAction<Partial<UserPreferences>>) => {
      state.preferences = { ...state.preferences, ...action.payload };
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearUser: () => initialState,
  },
});

export const {
  setProfile,
  setAddresses,
  addAddress,
  updateAddress,
  removeAddress,
  setPreferences,
  setLoading,
  setError,
  clearUser,
} = userSlice.actions;

export const selectUser = (state: { user?: UserState }): UserState | undefined =>
  state?.user;
