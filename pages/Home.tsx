import React, { Suspense, lazy } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, ChevronRight, BarChart2, Zap, Settings, ArrowRight, Sparkles, Clock, Calendar } from 'lucide-react';
import Button from '../components/Button';
import { PLANS, FAQS } from '../constants';
import { useChat } from '../context/ChatContext';
import LoadingSpinner from '../components/LoadingSpinner';

// Lazy load seguro
const AronChatSection = lazy(() => import('../components/AronChatSection'));

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { openChat } = useChat();

  return (
    <>
      {/* CAMADA 1: Hero Section */}
      <section className="relative pt-12 pb-20 md:pt-24 md:pb-32 overflow-hidden bg-dark-bg">
        
        {/* Decorativo: Pointer Events None é crucial aqui */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-royal-900/30 rounded-full blur-3xl opacity-40 z-0 pointer-events-none select-none"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-teal-900/30 rounded-full blur-3xl opacity-30 z-0 pointer-events-none select-none"></div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-royal-900/20 border border-royal-500/20 text-royal-300 text-xs font-semibold tracking-wide uppercase mb-6 shadow-sm shadow-royal-900/20">
              <span className="w-2 h-2 rounded-full bg-teal-400 mr-2 animate-pulse shadow-[0_0_8px_rgba(45,212,191,0.6)]"></span>
              Automação Inteligente 2.0
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6 glow-text">
              Automação de atendimento e <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-royal-400 to-teal-400">
                agendamento que não falha.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-dark-muted mb-10 max-w-2xl mx-auto leading-relaxed">
              WhatsApp com IA, integrações robustas e rotinas automatizadas para negócios que dependem de uma agenda organizada.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" onClick={() => window.open('https://wa.me/5500000000000', '_blank')}>
                Agendar uma reunião
              </Button>
              <Button variant="outline" size="lg" onClick={openChat}>
                Tirar dúvidas com o agente
              </Button>
            </div>
          </div>

          {/* Visual Composition - Decorativo mas interativo visualmente */}
          <div className="relative mx-auto max-w-5xl px-4 pointer-events-none">
             {/* Main Container - Conteúdo interno volta a ter pointer events se necessário, mas aqui é só visual */}
             <div className="bg-[#05080F] rounded-3xl border border-dark-border shadow-2xl overflow-hidden relative group">
                
                {/* Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-royal-900/10 blur-[100px] rounded-full pointer-events-none"></div>

                <div className="relative z-10 py-16 md:py-24 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-0">
                    
                    {/* Beam */}
                    <div className="hidden md:block absolute top-1/2 left-[25%] right-[25%] h-[1px] bg-gradient-to-r from-transparent via-royal-500/20 to-transparent -translate-y-1/2 z-0"></div>

                    {/* Chat UI - Left */}
                    <div className="relative w-72 h-80 bg-dark-surface/50 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden z-10 transform transition-transform duration-500 md:group-hover:-translate-y-1">
                        <div className="h-12 border-b border-white/5 flex items-center px-4 gap-3 bg-white/5">
                            <div className="flex gap-1.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-white/10"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-white/10"></div>
                            </div>
                        </div>
                        <div className="p-5 flex flex-col gap-4 flex-1 justify-center">
                            <div className="self-start bg-slate-800/50 border border-white/5 text-slate-300 px-4 py-3 rounded-2xl rounded-tl-none text-sm max-w-[85%] leading-relaxed">
                                Gostaria de agendar para quinta-feira.
                            </div>
                            <div className="self-end bg-royal-600/90 text-white px-4 py-3 rounded-2xl rounded-tr-none text-sm max-w-[85%] leading-relaxed shadow-lg shadow-royal-900/20">
                                Confirmado. O horário das 15:30 está livre?
                            </div>
                            <div className="self-start bg-slate-800/50 border border-white/5 text-slate-300 px-4 py-3 rounded-2xl rounded-tl-none text-sm max-w-[85%] leading-relaxed">
                                Sim, perfeito.
                            </div>
                        </div>
                    </div>

                    {/* AI Node - Center */}
                    <div className="relative z-20 mx-6 md:mx-12">
                        <div className="absolute inset-0 bg-teal-500/10 blur-2xl rounded-full animate-pulse"></div>
                        <div className="w-16 h-16 md:w-20 md:h-20 bg-[#0B1221] border border-royal-500/30 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(59,130,246,0.15)] relative">
                             {/* Reduced motion media query handling handled by CSS/User Agent usually, but here is minimal css anim */}
                             <div className="absolute inset-1 border border-dashed border-royal-500/20 rounded-full animate-[spin_12s_linear_infinite]"></div>
                             <Sparkles className="w-8 h-8 text-royal-400 fill-royal-400/10" />
                        </div>
                    </div>

                    {/* Calendar UI - Right */}
                    <div className="relative w-72 h-80 bg-dark-surface/50 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden z-10 transform transition-transform duration-500 md:group-hover:-translate-y-1">
                        <div className="h-12 border-b border-white/5 flex items-center justify-between px-4 bg-white/5">
                            <span className="text-white text-sm font-medium flex items-center gap-2">
                                <Calendar size={14} className="text-teal-400"/> Outubro
                            </span>
                            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                                <span className="text-[10px] text-white font-bold">27</span>
                            </div>
                        </div>
                        <div className="p-5 space-y-3 flex-1">
                            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-transparent opacity-40">
                                <span className="text-xs text-slate-400 font-mono">14:00</span>
                                <div className="h-1.5 w-16 bg-slate-600 rounded-full"></div>
                            </div>
                            <div className="flex items-center justify-between gap-3 p-3 rounded-xl bg-royal-500/10 border border-royal-500/30 relative overflow-hidden">
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-royal-500"></div>
                                <div className="flex items-center gap-3 z-10">
                                    <span className="text-xs text-white font-bold font-mono">15:30</span>
                                    <span className="text-xs text-royal-200 font-medium">Reunião</span>
                                </div>
                                <div className="bg-royal-500 rounded-full p-1 z-10 shadow-lg shadow-royal-500/40">
                                    <Check size={10} className="text-white" strokeWidth={3} />
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-transparent opacity-40">
                                <span className="text-xs text-slate-400 font-mono">16:30</span>
                                <div className="h-1.5 w-12 bg-slate-600 rounded-full"></div>
                            </div>
                             <div className="mt-auto bg-[#0F172A] border border-white/10 p-3 rounded-xl flex items-center gap-3 shadow-lg">
                                <div className="bg-teal-500/20 p-1.5 rounded-lg"><Clock size={12} className="text-teal-400"/></div>
                                <div>
                                    <div className="text-[10px] text-white font-medium leading-tight">Sincronizado</div>
                                    <div className="text-[9px] text-slate-400 leading-tight">Agenda atualizada</div>
                                </div>
                             </div>
                        </div>
                    </div>

                </div>
             </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-20 bg-dark-bg">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Como a DevPoint funciona</h2>
            <p className="text-dark-muted max-w-2xl mx-auto">Processo simplificado para tirar sua automação do papel sem dor de cabeça.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                step: '01', 
                title: 'Diagnóstico', 
                desc: 'Analisamos seu fluxo atual de agendamento e identificamos gargalos.',
                icon: <BarChart2 className="w-8 h-8 text-royal-400" />
              },
              { 
                step: '02', 
                title: 'Implementação', 
                desc: 'Configuramos o WhatsApp, IA e integramos com seu calendário e CRM.',
                icon: <Zap className="w-8 h-8 text-teal-400" />
              },
              { 
                step: '03', 
                title: 'Manutenção', 
                desc: 'Monitoramos 24/7 e aplicamos melhorias contínuas no seu sistema.',
                icon: <Settings className="w-8 h-8 text-royal-400" />
              }
            ].map((item, idx) => (
              <div key={idx} className="group p-8 rounded-2xl bg-dark-surface border border-dark-border hover:border-royal-500/30 hover:shadow-xl hover:shadow-royal-900/10 transition-all duration-300">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-4xl font-bold text-slate-800 group-hover:text-royal-900/50 transition-colors">{item.step}</span>
                  <div className="p-3 bg-dark-bg rounded-lg border border-dark-border shadow-inner text-white">
                    {item.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-dark-muted leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Plans Section - Scroll Margin adjusted for Fixed Header */}
      <section id="planos" className="py-24 bg-[#05080F] scroll-mt-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Escolha o plano ideal</h2>
            <p className="text-dark-muted">Investimento único de implementação + taxa de manutenção para tranquilidade total.</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {PLANS.map((plan) => (
              <div 
                key={plan.id} 
                className={`
                  relative flex flex-col p-8 rounded-2xl bg-dark-surface transition-all duration-300
                  ${plan.highlight 
                    ? 'border border-royal-500 ring-4 ring-royal-500/10 shadow-2xl shadow-royal-900/20 scale-100 lg:scale-105 z-10' 
                    : 'border border-dark-border hover:border-royal-500/30 hover:shadow-xl hover:shadow-royal-900/10'
                  }
                `}
              >
                {plan.highlight && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-royal-600 text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider shadow-lg shadow-royal-900/50">
                    Mais Popular
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-white">{plan.priceImplementation}</span>
                    <span className="text-sm text-dark-muted uppercase font-medium">Implementação</span>
                  </div>
                  <div className="text-sm text-royal-400 font-medium mt-1">
                    + {plan.priceMaintenance} (manutenção)
                  </div>
                  <p className="mt-4 text-dark-muted text-sm">{plan.description}</p>
                </div>

                <div className="flex-grow mb-8 space-y-3">
                  {plan.includes.slice(0, 5).map((feature, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm text-slate-300">
                      <Check size={16} className="text-teal-400 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                  {plan.includes.length > 5 && (
                    <div className="text-xs text-slate-500 pl-7 pt-2 italic">
                      + {plan.includes.length - 5} outros itens...
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <Button 
                    fullWidth 
                    variant={plan.highlight ? 'primary' : 'outline'}
                    onClick={() => navigate(`/planos/${plan.id}`)}
                  >
                    Ver detalhes
                  </Button>
                  <Button 
                    fullWidth 
                    variant="ghost"
                    className="justify-between group"
                    onClick={() => {
                        window.open(`https://wa.me/5500000000000?text=Tenho interesse no plano ${plan.name}`, '_blank');
                    }}
                  >
                    Agendar agora <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform"/>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Aron Chat Section (Lazy Loaded) */}
      <Suspense fallback={<LoadingSpinner />}>
        <AronChatSection />
      </Suspense>

      {/* Cases Section */}
      <section className="py-20 bg-dark-bg border-y border-dark-border">
         <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">Resultados Reais</h2>
            <div className="grid md:grid-cols-2 gap-8">
               {/* Mock Case 1 */}
               <div className="flex flex-col md:flex-row gap-6 p-6 bg-dark-surface border border-dark-border rounded-2xl hover:border-royal-500/20 transition-colors">
                  <div className="w-full md:w-32 h-32 bg-royal-900/20 rounded-xl border border-royal-500/20 flex items-center justify-center text-royal-400 font-bold text-3xl shrink-0">
                    +40%
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-white mb-2">Clínica Odontológica Sorrir</h3>
                    <p className="text-dark-muted text-sm mb-4">
                       "Antes perdíamos muitos pacientes que chamavam fora do horário. Com a IA da DevPoint, triplicamos os agendamentos noturnos."
                    </p>
                    <span className="text-teal-400 text-sm font-medium">Plano Profissional</span>
                  </div>
               </div>
               {/* Mock Case 2 */}
               <div className="flex flex-col md:flex-row gap-6 p-6 bg-dark-surface border border-dark-border rounded-2xl hover:border-teal-500/20 transition-colors">
                  <div className="w-full md:w-32 h-32 bg-teal-900/20 rounded-xl border border-teal-500/20 flex items-center justify-center text-teal-400 font-bold text-3xl shrink-0">
                    -20h
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-white mb-2">Advocacia Martins</h3>
                    <p className="text-dark-muted text-sm mb-4">
                       "Economizamos 20 horas semanais da secretária apenas automatizando a confirmação de reuniões e coleta de documentos iniciais."
                    </p>
                    <span className="text-teal-400 text-sm font-medium">Plano MVP</span>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-dark-bg">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Dúvidas Frequentes</h2>
          <div className="space-y-4">
            {FAQS.map((faq, index) => (
              <details key={index} className="group bg-dark-surface rounded-xl shadow-sm border border-dark-border overflow-hidden">
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none font-medium text-white hover:text-royal-400 transition-colors">
                  {faq.question}
                  <ChevronRight className="transition-transform group-open:rotate-90 text-slate-500" />
                </summary>
                <div className="px-6 pb-6 text-dark-muted text-sm leading-relaxed border-t border-dark-border pt-4">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;