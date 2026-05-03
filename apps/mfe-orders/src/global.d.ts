import type { Store } from 'redux';

declare global {
  interface Window {
    reduxStore?: Store;
    injectReducer?: (key: string, reducer: unknown) => void;
  }
}

export {};
