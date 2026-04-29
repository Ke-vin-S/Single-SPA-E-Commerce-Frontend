import React, { useSyncExternalStore } from 'react';
import { Provider } from 'react-redux';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import './styles/auth.css';

const subscribe = (callback: () => void) => {
  window.addEventListener('popstate', callback);
  window.addEventListener('single-spa:routing-event', callback);
  return () => {
    window.removeEventListener('popstate', callback);
    window.removeEventListener('single-spa:routing-event', callback);
  };
};

const getPathname = () => window.location.pathname;

export const App: React.FC = () => {
  const pathname = useSyncExternalStore(subscribe, getPathname, getPathname);
  const store = window.reduxStore as unknown as Parameters<typeof Provider>[0]['store'];

  let content: React.ReactNode = null;
  if (pathname === '/auth/register') {
    content = <RegisterPage />;
  } else if (pathname.startsWith('/auth')) {
    content = <LoginPage />;
  }

  if (!content) return null;

  return <Provider store={store}>{content}</Provider>;
};
