import React from 'react';
import ReactDOM from 'react-dom/client';
import './output.css'; // Must import Tailwind CSS
import './index.css';  // ✅ Global CSS import
import "katex/dist/katex.min.css";
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';

// Prevent Monaco AMD loader from intercepting stackframe / error-stack-parser and 404ing
if (typeof window !== "undefined") {
  let _define = window.define;
  Object.defineProperty(window, "define", {
    get() {
      return _define;
    },
    set(newDefine) {
      _define = newDefine;
      if (_define && typeof _define === "function" && _define.amd) {
        try {
          _define("stackframe", [], () => ({}));
          _define("error-stack-parser", [], () => ({}));
        } catch (e) {
          void e;
        }
      }
    },
    configurable: true,
    enumerable: true
  });
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <HelmetProvider>
    <BrowserRouter basename="/">
      <App />
    </BrowserRouter>
  </HelmetProvider>
);

