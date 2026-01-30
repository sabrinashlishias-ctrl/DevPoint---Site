import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/Home';
import PlanDetail from './pages/PlanDetail';
import HowItWorks from './pages/HowItWorks';
import ContactPage from './pages/Contact';
import { ChatProvider } from './context/ChatContext';

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
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/planos/:id" element={<PlanDetail />} />
            <Route path="/como-funciona" element={<HowItWorks />} />
            <Route path="/contato" element={<ContactPage />} />
          </Routes>
        </Layout>
      </Router>
    </ChatProvider>
  );
};

export default App;