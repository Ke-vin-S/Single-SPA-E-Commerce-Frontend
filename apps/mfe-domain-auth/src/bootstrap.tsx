import React from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { authReducer } from './redux/authReducer';
import { App } from './App';

interface MountProps {
  domElement?: HTMLElement;
}

let root: Root | null = null;

export async function bootstrap(): Promise<void> {
  if (window.injectReducer) {
    window.injectReducer('auth', authReducer);
    // eslint-disable-next-line no-console
    console.log('[mfe-domain-auth] auth reducer injected');
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
