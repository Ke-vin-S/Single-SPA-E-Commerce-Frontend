import React from 'react';
import { Provider } from 'react-redux';
import { ToastProvider } from '@miniecommerce-sysco/mfe-design-system';
import { OrdersPage } from './pages/OrdersPage';
import './styles/orders.css';

export const App: React.FC = () => {
  const store = window.reduxStore as unknown as Parameters<typeof Provider>[0]['store'];
  return (
    <Provider store={store}>
      <ToastProvider>
        <OrdersPage />
      </ToastProvider>
    </Provider>
  );
};
