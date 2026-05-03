import React from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { userReducer } from './redux/userReducer';
import { userManager } from './managers/UserManager';
import { App } from './App';

interface MountProps {
  domElement?: HTMLElement;
}

let root: Root | null = null;

export async function bootstrap(): Promise<void> {
  if (window.injectReducer) {
    window.injectReducer('user', userReducer);
    // eslint-disable-next-line no-console
    console.log('[mfe-domain-user] user reducer injected');
  }
  try {
    await userManager.fetchProfile();
  } catch {
    // User may not be authenticated.
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
