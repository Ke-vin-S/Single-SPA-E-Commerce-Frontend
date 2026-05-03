import { cartSlice } from './cartSlice';

export const cartReducer = cartSlice.reducer;

export {
  setCart,
  addItemLocal,
  removeItemLocal,
  updateQuantityLocal,
  clearCart,
  setLoading,
  setError,
  selectCart,
  setOrders,
  setOrdersLoading,
  setOrdersError,
} from './cartSlice';
