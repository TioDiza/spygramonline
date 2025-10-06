import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

// Anti-clone: Desabilita o menu de contexto (clique direito)
document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});

// Anti-clone: Desabilita a tecla F12 e atalhos de ferramentas de desenvolvedor
document.addEventListener('keydown', (e) => {
  if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I') || (e.ctrlKey && e.shiftKey && e.key === 'J')) {
    e.preventDefault();
  }
  // Anti-clone: Desabilita o atalho de impressão (Ctrl+P / Cmd+P)
  if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
    e.preventDefault();
  }
});

// Anti-clone: Desabilita o evento de cópia
document.addEventListener('copy', (e) => {
  e.preventDefault();
});

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);