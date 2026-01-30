import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, ChevronRight, BarChart2, Zap, Settings, ArrowRight } from 'lucide-react';
import Button from '../components/Button';
import { PLANS, FAQS } from '../constants';
import { useChat } from '../context/ChatContext';
import AronChatSection from '../components/AronChatSection';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { openChat } = useChat();

  const scrollToPlans = () => {
    const element = document.getElementById('planos');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 md:pt-24 md:pb-32 overflow-hidden bg-dark-bg">
        {/* Mobile Opt: Hide blobs on small screens */}
        <div className="hidden md:block absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-royal-900/30 rounded-full blur-3xl opacity-40 z-0 pointer-events-none"></div>
        <div className="hidden md:block absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-teal-900/30 rounded-full blur-3xl opacity-30 z-0 pointer-events-none"></div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
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

          {/* Abstract Tech Graphic */}
          <div className="mt-16 relative mx-auto max-w-5xl">
             <div className="bg-dark-surface rounded-2xl shadow-2xl shadow-black/50 border border-dark-border p-2 md:p-4 overflow-hidden pointer-events-none">
                <div className="bg-[#05080F] rounded-xl border border-dark-border aspect-[16/7] relative overflow-hidden flex items-center justify-center">
                   {/* Mock UI graphic */}
                   <div className="grid grid-cols-3 gap-8 w-full max-w-3xl px-8 opacity-90">
                      <div className="bg-dark-surface p-4 rounded-lg shadow-lg border border-dark-border flex flex-col gap-3">
                        <div className="h-2 w-20 bg-slate-800 rounded"></div>
                        <div className="h-8 w-full bg-royal-900/20 rounded border-l-4 border-royal-500"></div>
                        <div className="h-2 w-full bg-slate-800/50 rounded"></div>
                      </div>
                      <div className="bg-dark-surface p-4 rounded-lg shadow-lg border border-dark-border flex flex-col gap-3 mt-8">
                        <div className="flex justify-between">
                          <div className="h-2 w-16 bg-slate-800 rounded"></div>
                          <div className="h-4 w-4 bg-teal-500 rounded-full shadow-[0_0_10px_rgba(20,184,166,0.5)]"></div>
                        </div>
                        <div className="h-2 w-full bg-slate-800/50 rounded"></div>
                        <div className="h-2 w-2/3 bg-slate-800/50 rounded"></div>
                      </div>
                       <div className="bg-dark-surface p-4 rounded-lg shadow-lg border border-dark-border flex flex-col gap-3">
                        <div className="h-2 w-20 bg-slate-800 rounded"></div>
                        <div className="space-y-2">
                           <div className="flex items-center gap-2">
                              <div className="w-4 h-4 rounded-full border border-slate-700"></div>
                              <div className="h-2 w-24 bg-slate-800/50 rounded"></div>
                           </div>
                           <div className="flex items-center gap-2">
                              <div className="w-4 h-4 rounded-full bg-royal-600 shadow-sm"></div>
                              <div className="h-2 w-20 bg-slate-800/50 rounded"></div>
                           </div>
                        </div>
                      </div>
                   </div>
                   {/* Connecting lines */}
                   <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30" xmlns="http://www.w3.org/2000/svg">
                      <path d="M200 150 Q 400 50 600 150" stroke="#3b82f6" strokeWidth="2" fill="none" strokeDasharray="5,5"/>
                   </svg>
                   {/* Gradient overlay */}
                   <div className="absolute inset-0 bg-gradient-to-t from-[#05080F] to-transparent opacity-60 pointer-events-none"></div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
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

      {/* Plans */}
      <section id="planos" className="py-24 bg-[#05080F]">
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
                    ? 'border border-royal-500 ring-4 ring-royal-500/10 shadow-2xl shadow-royal-900/20 scale-105 z-10' 
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

      {/* Aron Chat Section */}
      <AronChatSection />

      {/* Cases Section Placeholder */}
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