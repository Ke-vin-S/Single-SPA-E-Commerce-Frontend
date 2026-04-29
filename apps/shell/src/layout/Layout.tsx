import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

export const Layout: React.FC = () => (
  <div className="shell-layout">
    <Header />
    <main id="mfe-content" className="shell-main" />
    <Footer />
  </div>
);
