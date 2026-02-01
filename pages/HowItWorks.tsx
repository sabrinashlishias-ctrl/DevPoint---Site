import React, { useEffect, useRef } from 'react';
import Button from '../components/Button';
import { Search, Code, CheckCircle, Sliders, ArrowRight } from 'lucide-react';
import { PROCESS_STEPS } from '../constants';

const iconMap = {
  'search': <Search className="w-6 h-6 text-royal-400" />,
  'code': <Code className="w-6 h-6 text-teal-400" />,
  'check-circle': <CheckCircle className="w-6 h-6 text-royal-400" />,
  'sliders': <Sliders className="w-6 h-6 text-teal-400" />
};

const HowItWorks: React.FC = () => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // CAMADA 2: JS Progressive Enhancement
    // Se não houver suporte ou ocorrer erro, elementos já estão visíveis por padrão (sem classe opacity-0 no HTML inicial)
    if (!('IntersectionObserver' in window)) return;

    try {
        observerRef.current = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add('opacity-100', 'translate-y-0');
                entry.target.classList.remove('opacity-0', 'translate-y-12');
              }
            });
          },
          { threshold: 0.1, rootMargin: '0px 0px -10% 0px' }
        );

        const elements = document.querySelectorAll('.animate-on-scroll');
        elements.forEach((el) => {
            // APLICAR estado inicial de animação SOMENTE AQUI
            // Se JS falhar antes, o elemento fica visível (fallback)
            el.classList.add('opacity-0', 'translate-y-12', 'transition-all', 'duration-700', 'ease-out');
            observerRef.current?.observe(el);
        });
    } catch (e) {
        console.warn("Animation observer failed, fallback to static content", e);
    }

    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <div className="min-h-[100dvh] bg-dark-bg pb-24">
      {/* Header */}
      <div className="bg-dark-surface/50 backdrop-blur-md border-b border-dark-border py-20 md:py-28 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
             <div className="absolute top-0 right-1/4 w-96 h-96 bg-royal-600/10 rounded-full blur-[100px] opacity-60"></div>
             <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-teal-600/10 rounded-full blur-[100px] opacity-60"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">Como funciona o processo</h1>
          <p className="text-lg md:text-xl text-dark-muted max-w-2xl mx-auto leading-relaxed">
             Da primeira conversa até a automação rodando, prezamos pela transparência, rapidez e alinhamento total.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-20 max-w-5xl">
         <div className="relative">
            {/* Central Axis Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-slate-700 to-transparent md:-translate-x-1/2 z-0"></div>

            <div className="space-y-16 md:space-y-24 pb-20">
              {PROCESS_STEPS.map((step, idx) => (
                <div 
                    key={idx} 
                    // Removido classes de estado inicial do HTML. JS adiciona 'opacity-0' depois.
                    className={`
                        animate-on-scroll
                        relative flex flex-col md:flex-row items-center md:justify-between w-full
                        ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''}
                    `}
                    style={{ transitionDelay: `${idx * 100}ms` }}
                >
                    
                    {/* Desktop Spacer (Keeps symmetry) */}
                    <div className="hidden md:block w-[calc(50%-3rem)]"></div>

                    {/* Marker (Centered on Axis) */}
                    <div className="absolute left-8 md:left-1/2 -translate-x-1/2 flex items-center justify-center z-20 top-0 md:top-1/2 md:-translate-y-1/2">
                       <div className={`
                           w-14 h-14 rounded-full bg-[#070B14] border border-dark-border shadow-2xl flex items-center justify-center relative z-10
                           group-hover:scale-110 transition-transform duration-300
                       `}>
                           <div className={`absolute inset-0 rounded-full opacity-20 ${idx % 2 === 0 ? 'bg-royal-500 blur-md' : 'bg-teal-500 blur-md'} pointer-events-none`}></div>
                           <span className={`text-lg font-bold ${idx % 2 === 0 ? 'text-royal-400' : 'text-teal-400'}`}>{idx + 1}</span>
                       </div>
                    </div>

                    {/* Content Card */}
                    <div className={`
                        w-full pl-24 md:pl-0 
                        md:w-[calc(50%-3rem)]
                        ${idx % 2 === 0 ? 'md:pr-0' : 'md:pl-0'}
                    `}>
                       <div className={`
                           group relative p-8 bg-dark-surface/60 backdrop-blur-sm border border-dark-border rounded-2xl 
                           shadow-lg hover:shadow-2xl hover:border-white/10 transition-all duration-300
                           hover:-translate-y-1 z-10
                       `}>
                          {/* Top Highlight Line - Pointer events none */}
                          <div className={`absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent ${idx % 2 === 0 ? 'via-royal-500/50' : 'via-teal-500/50'} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}></div>

                          <div className="mb-5 inline-flex items-center justify-center p-3 rounded-xl bg-dark-bg border border-dark-border shadow-inner relative z-30">
                             {iconMap[step.iconName]}
                          </div>
                          
                          <h3 className="text-xl font-bold text-white mb-3 tracking-tight leading-snug relative z-30 break-words">{step.title}</h3>
                          <p className="text-dark-muted leading-relaxed text-sm md:text-base relative z-30">
                            {step.description}
                          </p>
                       </div>
                    </div>

                </div>
              ))}
            </div>
         </div>

         {/* CTA Final */}
         <div className="animate-on-scroll mt-8">
             <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0B1221] p-10 md:p-16 text-center shadow-2xl group">
                
                {/* Background Decor - Pointer events none */}
                <div className="absolute inset-0 bg-gradient-to-b from-royal-900/5 to-transparent pointer-events-none"></div>
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-royal-500/10 blur-[80px] rounded-full pointer-events-none group-hover:bg-royal-500/20 transition-colors duration-700"></div>
                <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-teal-500/10 blur-[80px] rounded-full pointer-events-none group-hover:bg-teal-500/20 transition-colors duration-700"></div>

                <div className="relative z-10 max-w-2xl mx-auto space-y-8">
                    <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                        Pronto para transformar <br/> seu atendimento?
                    </h3>
                    <p className="text-lg text-slate-400 leading-relaxed">
                        Não deixe mais clientes esperando. Agende agora um diagnóstico gratuito e descubra onde sua operação pode ganhar eficiência.
                    </p>
                    <div className="pt-2 flex justify-center">
                        <Button 
                            size="lg" 
                            onClick={() => window.open('https://wa.me/5500000000000', '_blank')}
                            className="group relative overflow-hidden active:scale-95 transition-transform duration-150 pl-8 pr-8"
                        >
                            <span className="relative z-10 flex items-center gap-2 font-semibold">
                                Iniciar Diagnóstico Gratuito <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform"/>
                            </span>
                        </Button>
                    </div>
                </div>
             </div>
         </div>
      </div>
    </div>
  );
};

export default HowItWorks;