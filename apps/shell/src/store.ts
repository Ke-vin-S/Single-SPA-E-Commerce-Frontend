import {
  configureStore,
  combineReducers,
  type Reducer,
  type ReducersMapObject,
} from '@reduxjs/toolkit';
import { headerSlice } from './redux/headerSlice';

const baseReducers: ReducersMapObject = {
  header: headerSlice.reducer,
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

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
