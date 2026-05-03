import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { Layout } from './layout/Layout';
import { AuthInitializer } from './components/AuthInitializer';

export const App: React.FC = () => (
  <Provider store={store}>
    <AuthInitializer />
    <Layout />
  </Provider>
);
