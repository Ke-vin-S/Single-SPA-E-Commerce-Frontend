import { useSelector } from 'react-redux';
import type { CartItem, CartState, Product } from '@miniecommerce-sysco/shared-types';
import { cartManager } from '../managers/CartManager';

interface UseCartReturn {
  items: CartItem[];
  total: number;
  itemCount: number;
  isLoading: boolean;
  error: string | null;
  addItem: (product: Product, quantity?: number) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  updateQuantity: (id: string, quantity: number) => Promise<void>;
  clear: () => Promise<void>;
  fetchCart: () => Promise<void>;
}

export const useCart = (): UseCartReturn => {
  const cart = useSelector((state: { cart?: CartState }) => state.cart);

  return {
    items: cart?.items ?? [],
    total: cart?.total ?? 0,
    itemCount: cart?.itemCount ?? 0,
    isLoading: cart?.isLoading ?? false,
    error: cart?.error ?? null,
    addItem: (product, quantity) => cartManager.addItem(product, quantity),
    removeItem: (id) => cartManager.removeItem(id),
    updateQuantity: (id, quantity) => cartManager.updateQuantity(id, quantity),
    clear: () => cartManager.clear(),
    fetchCart: async () => {
      await cartManager.fetchCart();
    },
  };
};
