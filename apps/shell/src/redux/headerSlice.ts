import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type {
  HeaderState,
  ToggleableHeaderField,
  UpdateHeaderFieldsPayload,
} from '@miniecommerce-sysco/shared-types';

const initialState: HeaderState = {
  isVisible: true,
  showSearch: true,
  showNotifications: true,
  showCart: true,
  showUser: true,
  fields: {
    title: '',
    subtitle: '',
  },
};

export const headerSlice = createSlice({
  name: 'header',
  initialState,
  reducers: {
    setHeaderVisibility: (state, action: PayloadAction<boolean>) => {
      state.isVisible = action.payload;
    },
    updateHeaderFields: (state, action: PayloadAction<UpdateHeaderFieldsPayload>) => {
      state.fields = { ...state.fields, ...action.payload };
    },
    toggleHeaderField: (state, action: PayloadAction<ToggleableHeaderField>) => {
      const field = action.payload;
      state[field] = !state[field];
    },
    resetHeader: () => initialState,
  },
});

export const {
  setHeaderVisibility,
  updateHeaderFields,
  toggleHeaderField,
  resetHeader,
} = headerSlice.actions;

export const selectHeader = (state: { header: HeaderState }): HeaderState =>
  state.header;
