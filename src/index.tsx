import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { EthereumProvider } from './hooks/useETH';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <EthereumProvider>
      <App />
    </EthereumProvider>
  </React.StrictMode>
);
