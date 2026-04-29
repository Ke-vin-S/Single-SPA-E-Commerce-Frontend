import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { Layout } from './layout/Layout';

export const App: React.FC = () => (
  <Provider store={store}>
    <Layout />
  </Provider>
);
