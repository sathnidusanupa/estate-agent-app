import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // This enables the routing
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* We wrap the whole App in BrowserRouter so the "Manager" can control navigation */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);