import {
  configureStore,
  combineReducers,
  type Reducer,
  type ReducersMapObject,
} from '@reduxjs/toolkit';
import { headerSlice } from './redux/headerSlice';
import { authSlice } from '@miniecommerce-sysco/mfe-domain-auth';

const baseReducers: ReducersMapObject = {
  header: headerSlice.reducer,
  auth: authSlice.reducer,
};

const dynamicReducers: ReducersMapObject = {};

const buildRootReducer = () =>
  combineReducers({ ...baseReducers, ...dynamicReducers });

export const store = configureStore({
  reducer: buildRootReducer(),
  middleware: (getDefault) =>
    getDefault({
      // MFEs may dispatch from non-serializable contexts.
      serializableCheck: false,
    }),
});

export const injectReducer = (key: string, reducer: Reducer): void => {
  if (dynamicReducers[key]) return;
  dynamicReducers[key] = reducer;
  store.replaceReducer(buildRootReducer());
};

window.reduxStore = store as unknown as Window['reduxStore'];
window.injectReducer = injectReducer as Window['injectReducer'];

export {
  setHeaderVisibility,
  updateHeaderFields,
  toggleHeaderField,
  resetHeader,
  selectHeader,
} from './redux/headerSlice';

export {
  setUser,
  clearUser,
  setLoading as setAuthLoading,
  setError as setAuthError,
  selectUser,
  selectIsAuthenticated,
} from '@miniecommerce-sysco/mfe-domain-auth';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
