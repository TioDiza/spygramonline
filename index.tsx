import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ToastProvider from './src/components/ToastProvider'; // Importa o ToastProvider
import { ChristmasSnowfall } from './src/components/ui/ChristmasSnowfall'; // Importa ChristmasSnowfall

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <ChristmasSnowfall className="min-h-screen"> {/* Envolve toda a aplicação aqui */}
      <ToastProvider />
      <App />
    </ChristmasSnowfall>
  </React.StrictMode>
);