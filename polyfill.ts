// Polyfill process for browser environments
// This must run before any other code to prevent crashes in libraries relying on process.env
if (typeof window !== 'undefined') {
  if (typeof (window as any).process === 'undefined') {
    (window as any).process = { env: {} };
  }
  if (typeof (window as any).process.env === 'undefined') {
    (window as any).process.env = {};
  }
  // Safely inject VITE env vars if available
  const meta = import.meta as any;
  if (meta && meta.env) {
    (window as any).process.env.API_KEY = meta.env.VITE_API_KEY || '';
  }
}

export {}; // Make it a module