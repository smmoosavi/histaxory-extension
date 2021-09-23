import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';

export function main() {
  const rootElement = document.createElement('div');
  rootElement.id = 'histaxory-root';
  document.body.appendChild(rootElement);

  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
}
