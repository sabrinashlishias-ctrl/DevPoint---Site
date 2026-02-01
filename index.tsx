import './polyfill'; // MUST BE THE FIRST IMPORT
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';

const rootElement = document.getElementById('root');

if (!rootElement) {
  // Fallback if root is missing (rare but fatal)
  document.body.innerHTML = '<div style="color:white; padding:20px;">System Error: Root element not found.</div>';
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);

try {
  root.render(
    <React.StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </React.StrictMode>
  );
} catch (e) {
  console.error("Critical Render Error:", e);
  // Last resort fallback
  rootElement.innerHTML = '<div style="display:flex;height:100vh;align-items:center;justify-content:center;color:#94A3B8;background:#070B14;">Estamos atualizando nossos sistemas...</div>';
}