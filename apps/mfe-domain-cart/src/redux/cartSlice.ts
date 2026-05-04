import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CartItem, CartState, Order } from '@miniecommerce-sysco/shared-types';

const initialState: CartState = {
  cartId: null,
  items: [],
  total: 0,
  itemCount: 0,
  isLoading: false,
  error: null,
  orders: [],
  ordersLoading: false,
  ordersError: null,
};

const recompute = (items: CartItem[]) => ({
  total: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
  itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
});

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartId: (state, action: PayloadAction<string | null>) => {
      state.cartId = action.payload;
    },
    setCart: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
      const totals = recompute(action.payload);
      state.total = totals.total;
      state.itemCount = totals.itemCount;
    },
    addItemLocal: (state, action: PayloadAction<CartItem>) => {
      const existing = state.items.find(
        (item) => item.productId === action.payload.productId
      );
      if (existing) {
        existing.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
      const totals = recompute(state.items);
      state.total = totals.total;
      state.itemCount = totals.itemCount;
    },
    removeItemLocal: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      const totals = recompute(state.items);
      state.total = totals.total;
      state.itemCount = totals.itemCount;
    },
    updateQuantityLocal: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
      const totals = recompute(state.items);
      state.total = totals.total;
      state.itemCount = totals.itemCount;
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      state.itemCount = 0;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setOrders: (state, action: PayloadAction<Order[]>) => {
      state.orders = action.payload;
    },
    setOrdersLoading: (state, action: PayloadAction<boolean>) => {
      state.ordersLoading = action.payload;
    },
    setOrdersError: (state, action: PayloadAction<string | null>) => {
      state.ordersError = action.payload;
    },
  },
});

export const {
  setCartId,
  setCart,
  addItemLocal,
  removeItemLocal,
  updateQuantityLocal,
  clearCart,
  setLoading,
  setError,
  setOrders,
  setOrdersLoading,
  setOrdersError,
} = cartSlice.actions;

export const selectCart = (state: { cart?: CartState }): CartState | undefined =>
  state?.cart;
