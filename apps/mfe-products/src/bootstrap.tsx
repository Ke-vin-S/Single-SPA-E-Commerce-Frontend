import React from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { productManager } from './managers/ProductManager';
import { App } from './App';

interface MountProps {
  domElement?: HTMLElement;
}

let root: Root | null = null;

export async function bootstrap(): Promise<void> {
  // Feature MFE — no reducer to inject.
  // Preload products catalogue.
  try {
    await productManager.getProducts();
  } catch {
    // Products will be fetched on mount if preload fails.
  }
}

export async function mount(props: MountProps): Promise<void> {
  const target =
    props.domElement ??
    document.getElementById('mfe-content') ??
    document.body;
  root = createRoot(target);
  root.render(<App />);
}

export async function unmount(): Promise<void> {
  root?.unmount();
  root = null;
}
