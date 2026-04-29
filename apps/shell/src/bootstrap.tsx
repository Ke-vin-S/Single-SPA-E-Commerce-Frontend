import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles/tokens.css';
import './styles/globals.css';
import './styles/layout.css';
import './store';
import { App } from './App';
import { registerMicroFrontends } from './mfe-registration';

const container = document.getElementById('shell-root');
if (!container) {
  throw new Error('Shell root element #shell-root not found');
}

const root = createRoot(container);
root.render(<App />);

registerMicroFrontends();
