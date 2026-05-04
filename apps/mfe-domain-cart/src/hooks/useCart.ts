import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import type { CartItem, CartState, Order, Product } from '@miniecommerce-sysco/shared-types';
import { cartManager } from '../managers/CartManager';

interface UseCartReturn {
  cartId: string | null;
  items: CartItem[];
  total: number;
  itemCount: number;
  isLoading: boolean;
  error: string | null;
  orders: Order[];
  ordersLoading: boolean;
  ordersError: string | null;
  addItem: (product: Product, quantity?: number) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  updateQuantity: (id: string, quantity: number) => Promise<void>;
  clear: () => Promise<void>;
  fetchCart: () => Promise<void>;
  fetchOrders: () => Promise<void>;
}

export const useCart = (): UseCartReturn => {
  const cart = useSelector((state: { cart?: CartState }) => state.cart);

  const addItem = useCallback(
    (product: Product, quantity?: number) => cartManager.addItem(product, quantity),
    []
  );
  const removeItem = useCallback((id: string) => cartManager.removeItem(id), []);
  const updateQuantity = useCallback(
    (id: string, quantity: number) => cartManager.updateQuantity(id, quantity),
    []
  );
  const clear = useCallback(() => cartManager.clear(), []);
  const fetchCart = useCallback(async () => {
    await cartManager.fetchCart();
  }, []);
  const fetchOrders = useCallback(async () => {
    await cartManager.fetchOrders();
  }, []);

  return {
    cartId: cart?.cartId ?? null,
    items: cart?.items ?? [],
    total: cart?.total ?? 0,
    itemCount: cart?.itemCount ?? 0,
    isLoading: cart?.isLoading ?? false,
    error: cart?.error ?? null,
    orders: cart?.orders ?? [],
    ordersLoading: cart?.ordersLoading ?? false,
    ordersError: cart?.ordersError ?? null,
    addItem,
    removeItem,
    updateQuantity,
    clear,
    fetchCart,
    fetchOrders,
  };
};
