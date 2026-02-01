import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const { openChat } = useChat();

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // CAMADA 2: Motion/Behavior
  // Lógica segura de scroll que não quebra a navegação se o elemento não existir
  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault(); // Take control

    // Fechar menu mobile imediatamente
    setIsMobileMenuOpen(false);

    // Se for link de âncora (#)
    if (path.includes('#')) {
      const [route, hash] = path.split('#');
      
      // Se já estamos na rota correta, apenas scrola
      if (location.pathname === (route || '/')) {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          // Atualiza URL sem reload
          window.history.pushState(null, '', `/#${hash}`);
        } else {
            // Fallback: se elemento não existe, topo da página
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      } else {
        // Se estamos em outra página, navega para a rota com o hash
        navigate(path);
      }
    } else {
      // Navegação normal de rota
      navigate(path);
      window.scrollTo(0, 0);
    }
  };

  const isHome = location.pathname === '/';

  // CAMADA 1: Layout Base
  // Use overflow-x-hidden on the wrapper to prevent horizontal scrollbars from animations
  // But ensure NO overflow-y restriction is applied here
  // FIX: Added relative and z-1 to main to ensure content is above background decorations
  return (
    <div className="flex flex-col min-h-[100dvh] w-full bg-dark-bg text-dark-text relative selection:bg-royal-500/30">
      {/* Header - Z-Index 40 para ficar acima do conteúdo mas abaixo de modais críticos */}
      <header className={`fixed top-0 w-full z-40 transition-all duration-300 ${isHome ? 'bg-dark-bg/90 backdrop-blur-md border-b border-dark-border' : 'bg-dark-bg border-b border-dark-border'}`}>
        <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            onClick={(e) => handleNavigation(e, '/')} 
            className="flex items-center gap-2 group relative z-50 select-none"
          >
            <div className="w-8 h-8 bg-royal-600 rounded-lg flex items-center justify-center shadow-lg shadow-royal-500/20 group-hover:scale-105 transition-transform">
              <span className="text-white font-bold text-lg">D</span>
            </div>
            <span className="text-xl font-bold text-white tracking-tight">DevPoint<span className="text-teal-400">.</span></span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {NAV_ITEMS.map((item) => (
              <a 
                key={item.path} 
                href={item.path} // Fallback nativo
                onClick={(e) => handleNavigation(e, item.path)}
                className={`text-sm font-medium transition-colors hover:text-white cursor-pointer ${location.pathname === item.path || (item.path.includes('#') && location.hash === `#${item.path.split('#')[1]}`) ? 'text-royal-400' : 'text-dark-muted'}`}
              >
                {item.label}
              </a>
            ))}
            <Button size="sm" onClick={() => window.open('https://wa.me/5500000000000', '_blank')}>
              Agendar Reunião
            </Button>
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            type="button"
            className="md:hidden text-dark-muted hover:text-white p-2 relative z-50 touch-manipulation active:bg-white/5 rounded-lg"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Fechar Menu" : "Abrir Menu"}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu - Z-Index 39 (logo é 50) */}
        {/* Usando display condicional para não interferir na DOM quando fechado */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 top-20 bg-dark-bg z-39 md:hidden flex flex-col p-4 space-y-4 overflow-y-auto animate-fade-in scroll-touch overscroll-contain pb-24 border-t border-dark-border">
            {NAV_ITEMS.map((item) => (
              <a 
                key={item.path} 
                href={item.path}
                onClick={(e) => handleNavigation(e, item.path)}
                className="text-lg text-dark-muted hover:text-white font-medium py-4 border-b border-dark-border block active:bg-dark-surface px-2 rounded transition-colors"
              >
                {item.label}
              </a>
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

      {/* Main Content - Z-Index 1 to sit above background decorations */}
      <main className="flex-grow pt-20 w-full relative z-1">
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
                <a href="#" className="hover:text-royal-400 transition-colors pointer-events-auto p-1"><Instagram size={20} /></a>
                <a href="#" className="hover:text-royal-400 transition-colors pointer-events-auto p-1"><Linkedin size={20} /></a>
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Empresa</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/como-funciona" className="hover:text-royal-400 transition-colors pointer-events-auto block py-1">Como funciona</Link></li>
                <li><a href="/#planos" onClick={(e) => handleNavigation(e, '/#planos')} className="hover:text-royal-400 transition-colors cursor-pointer pointer-events-auto block py-1">Planos e Preços</a></li>
                <li><Link to="/contato" className="hover:text-royal-400 transition-colors pointer-events-auto block py-1">Trabalhe conosco</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-royal-400 transition-colors pointer-events-auto block py-1">Termos de Uso</a></li>
                <li><a href="#" className="hover:text-royal-400 transition-colors pointer-events-auto block py-1">Política de Privacidade</a></li>
                <li><a href="#" className="hover:text-royal-400 transition-colors pointer-events-auto block py-1">SLA</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Contato</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2">
                  <MessageCircle size={16} className="text-teal-400 flex-shrink-0" />
                  <span>(11) 99999-9999</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail size={16} className="text-teal-400 flex-shrink-0" />
                  <span>contato@devpoint.com.br</span>
                </li>
                <li>
                  <button type="button" onClick={openChat} className="text-royal-400 hover:text-white flex items-center gap-1 group transition-colors touch-manipulation pointer-events-auto py-1">
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