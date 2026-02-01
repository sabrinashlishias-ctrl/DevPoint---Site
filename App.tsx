import React, { useEffect, Suspense, lazy } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import { ChatProvider } from './context/ChatContext';
import LoadingSpinner from './components/LoadingSpinner';

// Lazy load pages to split bundles
const HomePage = lazy(() => import('./pages/Home'));
const PlanDetail = lazy(() => import('./pages/PlanDetail'));
const HowItWorks = lazy(() => import('./pages/HowItWorks'));
const ContactPage = lazy(() => import('./pages/Contact'));

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
};

const App: React.FC = () => {
  return (
    <ChatProvider>
      <Router>
        <ScrollToTop />
        <Layout>
          <Suspense fallback={<LoadingSpinner fullScreen />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/planos/:id" element={<PlanDetail />} />
              <Route path="/como-funciona" element={<HowItWorks />} />
              <Route path="/contato" element={<ContactPage />} />
            </Routes>
          </Suspense>
        </Layout>
      </Router>
    </ChatProvider>
  );
};

export default App;