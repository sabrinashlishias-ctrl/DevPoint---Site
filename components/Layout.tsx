import React, { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, Instagram, Linkedin, Mail, MessageCircle } from 'lucide-react';
import { NAV_ITEMS } from '../constants';
import ChatWidget from './ChatWidget';
import Button from './Button';
import { useChat } from '../context/ChatContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { openChat } = useChat();

  // Smart Navigation Handler
  // Intercepts anchor links (#) to provide smooth scrolling if on the correct page
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    // If it's an anchor link for the home page (e.g., /#planos)
    if (path.startsWith('/#')) {
      const hash = path.substring(2); // remove "/#"
      
      // If we are already on the home page (or root), prevent default router nav and scroll
      if (location.pathname === '/') {
        e.preventDefault();
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          // Optionally update URL without reload
          window.history.pushState(null, '', `/#${hash}`);
        }
        setIsMobileMenuOpen(false);
        return;
      }
    }
    
    // Default behavior for other links (change route, scroll top)
    setIsMobileMenuOpen(false);
    if (!path.includes('#')) {
      window.scrollTo(0, 0);
    }
  };

  const isHome = location.pathname === '/';

  return (
    <div className="min-h-screen flex flex-col bg-dark-bg text-dark-text">
      {/* Header */}
      {/* Mobile Optimization: Solid background on mobile, blur only on desktop to prevent scroll lag */}
      <header className={`fixed top-0 w-full z-40 transition-all duration-300 ${isHome ? 'bg-dark-bg md:bg-dark-bg/80 md:backdrop-blur-md border-b border-dark-border' : 'bg-dark-bg border-b border-dark-border'}`}>
        <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" onClick={(e) => handleSmoothScroll(e, '/')} className="flex items-center gap-2 group relative z-50">
            <div className="w-8 h-8 bg-royal-600 rounded-lg flex items-center justify-center shadow-lg shadow-royal-500/20 group-hover:scale-105 transition-transform">
              <span className="text-white font-bold text-lg">D</span>
            </div>
            <span className="text-xl font-bold text-white tracking-tight">DevPoint<span className="text-teal-400">.</span></span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {NAV_ITEMS.map((item) => (
              <NavLink 
                key={item.path} 
                to={item.path}
                onClick={(e) => handleSmoothScroll(e, item.path)}
                className={({ isActive }) => 
                  `text-sm font-medium transition-colors hover:text-white ${isActive && item.path !== '/#planos' ? 'text-royal-400' : 'text-dark-muted'}`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <Button size="sm" onClick={() => window.open('https://wa.me/5500000000000', '_blank')}>
              Agendar Reunião
            </Button>
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            type="button"
            className="md:hidden text-dark-muted hover:text-white p-2 relative z-50 touch-manipulation"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 top-20 bg-dark-bg z-40 md:hidden flex flex-col p-4 space-y-4 overflow-y-auto animate-fade-in-down">
            {NAV_ITEMS.map((item) => (
              <NavLink 
                key={item.path} 
                to={item.path} 
                onClick={(e) => handleSmoothScroll(e, item.path)}
                className="text-lg text-dark-muted hover:text-white font-medium py-4 border-b border-dark-border block"
              >
                {item.label}
              </NavLink>
            ))}
            <div className="pt-4">
              <Button fullWidth size="lg" onClick={() => {
                window.open('https://wa.me/5500000000000', '_blank');
                setIsMobileMenuOpen(false);
              }}>
                Agendar Reunião
              </Button>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-20">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-[#05080F] text-slate-400 py-12 border-t border-dark-border relative z-10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-royal-600 rounded flex items-center justify-center">
                  <span className="text-white font-bold text-xs">D</span>
                </div>
                <span className="text-lg font-bold text-white tracking-tight">DevPoint.</span>
              </div>
              <p className="text-sm text-dark-muted mb-4">
                Automação inteligente para negócios que valorizam o tempo e a eficiência.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-royal-400 transition-colors"><Instagram size={20} /></a>
                <a href="#" className="hover:text-royal-400 transition-colors"><Linkedin size={20} /></a>
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Empresa</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/como-funciona" className="hover:text-royal-400 transition-colors">Como funciona</Link></li>
                <li><a href="/#planos" onClick={(e) => handleSmoothScroll(e, '/#planos')} className="hover:text-royal-400 transition-colors cursor-pointer">Planos e Preços</a></li>
                <li><Link to="/contato" className="hover:text-royal-400 transition-colors">Trabalhe conosco</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-royal-400 transition-colors">Termos de Uso</a></li>
                <li><a href="#" className="hover:text-royal-400 transition-colors">Política de Privacidade</a></li>
                <li><a href="#" className="hover:text-royal-400 transition-colors">SLA</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Contato</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2">
                  <MessageCircle size={16} className="text-teal-400" />
                  <span>(11) 99999-9999</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail size={16} className="text-teal-400" />
                  <span>contato@devpoint.com.br</span>
                </li>
                <li>
                  <button type="button" onClick={openChat} className="text-royal-400 hover:text-white flex items-center gap-1 group transition-colors touch-manipulation">
                    Falar com IA <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform"/>
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-dark-border pt-8 text-center text-xs text-dark-muted">
            &copy; {new Date().getFullYear()} DevPoint Automações. Todos os direitos reservados.
          </div>
        </div>
      </footer>

      <ChatWidget />
    </div>
  );
};

export default Layout;