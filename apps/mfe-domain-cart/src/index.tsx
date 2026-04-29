export { bootstrap, mount, unmount } from './bootstrap';

export { CartManager, cartManager } from './managers/CartManager';
export { useCart } from './hooks/useCart';
export {
  cartReducer,
  setCart,
  addItemLocal,
  removeItemLocal,
  updateQuantityLocal,
  clearCart,
  setLoading,
  setError,
  selectCart,
} from './redux/cartReducer';

export type { Cart, CartItem, CartState } from '@miniecommerce-sysco/shared-types';
