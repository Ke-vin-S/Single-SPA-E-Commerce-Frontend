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

export {};
