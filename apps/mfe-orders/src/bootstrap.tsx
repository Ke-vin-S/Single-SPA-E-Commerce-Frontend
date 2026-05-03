import React from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { App } from './App';

interface MountProps {
  domElement?: HTMLElement;
}

let root: Root | null = null;

export async function bootstrap(): Promise<void> {
  // Feature MFE — no reducer to inject.
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
