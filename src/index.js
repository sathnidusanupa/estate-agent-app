import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* We added basename="/estate-agent-app" so GitHub knows where the site starts */}
    <BrowserRouter basename="/estate-agent-app">
      <App />
    </BrowserRouter>
  </React.StrictMode>
);