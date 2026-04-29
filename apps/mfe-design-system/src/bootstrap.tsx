import React from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { App } from './App';

interface MountProps {
  domElement: HTMLElement;
}

let root: Root | null = null;

export async function bootstrap(): Promise<void> {
  // Design system has no state to inject
}

export async function mount(props: MountProps): Promise<void> {
  root = createRoot(props.domElement);
  root.render(<App />);
}

export async function unmount(): Promise<void> {
  root?.unmount();
  root = null;
}
