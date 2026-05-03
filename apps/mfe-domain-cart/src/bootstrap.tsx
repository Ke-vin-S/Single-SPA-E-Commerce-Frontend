import React from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { cartReducer } from './redux/cartReducer';
import { cartManager } from './managers/CartManager';
import { App } from './App';

interface MountProps {
  domElement?: HTMLElement;
}

let root: Root | null = null;

export async function bootstrap(): Promise<void> {
  if (window.injectReducer) {
    window.injectReducer('cart', cartReducer);
    // eslint-disable-next-line no-console
    console.log('[mfe-domain-cart] cart reducer injected');
  }
  try {
    await cartManager.fetchCart();
  } catch {
    // Cart may be empty or user not authenticated.
  }
}

export async function mount(props: MountProps): Promise<void> {
  if (!props.domElement) return;
  root = createRoot(props.domElement);
  root.render(<App />);
}

export async function unmount(): Promise<void> {
  root?.unmount();
  root = null;
}
