import React from 'react';
import ReactDOM from 'react-dom/client';
import './output.css'; // Must import Tailwind CSS
import './index.css';  // ✅ Global CSS import
import "katex/dist/katex.min.css";
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <HelmetProvider>
    <BrowserRouter basename="/">
      <App />
    </BrowserRouter>
  </HelmetProvider>
);
