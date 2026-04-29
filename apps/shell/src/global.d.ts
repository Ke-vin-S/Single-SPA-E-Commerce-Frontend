declare global {
  interface Window {
    reduxStore: {
      getState: () => Record<string, unknown>;
      dispatch: (action: { type: string; payload?: unknown }) => unknown;
      subscribe: (listener: () => void) => () => void;
      replaceReducer: (nextReducer: unknown) => void;
    };
    injectReducer: (key: string, reducer: unknown) => void;
  }
}

declare module '@miniecommerce-sysco/mfe-design-system';
declare module '@miniecommerce-sysco/mfe-domain-auth';
declare module '@miniecommerce-sysco/mfe-domain-cart';
declare module '@miniecommerce-sysco/mfe-domain-user';
declare module '@miniecommerce-sysco/mfe-products';
declare module '@miniecommerce-sysco/mfe-checkout';
declare module '@miniecommerce-sysco/mfe-admin';

export {};
