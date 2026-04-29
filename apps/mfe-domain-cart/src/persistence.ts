import type { CartItem, CartState } from '@miniecommerce-sysco/shared-types';
import { setCart } from './redux/cartReducer';

const STORAGE_KEY = 'miniecommerce-sysco.cart.items';

const isCartItem = (v: unknown): v is CartItem => {
  if (!v || typeof v !== 'object') return false;
  const o = v as Record<string, unknown>;
  return (
    typeof o.id === 'string' &&
    typeof o.productId === 'string' &&
    typeof o.name === 'string' &&
    typeof o.price === 'number' &&
    typeof o.quantity === 'number'
  );
};

const readItems = (): CartItem[] => {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isCartItem);
  } catch {
    return [];
  }
};

const writeItems = (items: CartItem[]): void => {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    /* quota / private mode — silent */
  }
};

/**
 * Hydrate the cart from localStorage and subscribe so future changes persist.
 * Idempotent — safe to call once at bootstrap.
 */
export const setupCartPersistence = (): void => {
  if (typeof window === 'undefined' || !window.reduxStore) return;

  const initial = readItems();
  if (initial.length > 0) {
    window.reduxStore.dispatch(setCart(initial));
  }

  let lastItems: CartItem[] | undefined;
  window.reduxStore.subscribe(() => {
    const state = window.reduxStore?.getState() as
      | { cart?: CartState }
      | undefined;
    const items = state?.cart?.items;
    if (!items || items === lastItems) return;
    lastItems = items;
    writeItems(items);
  });
};
