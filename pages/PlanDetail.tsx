import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PLANS } from '../constants';
import Button from '../components/Button';
import { Check, X, Clock, MessageSquare, ArrowLeft } from 'lucide-react';
import { useChat } from '../context/ChatContext';

const PlanDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { openChat } = useChat();
  
  const plan = PLANS.find(p => p.id === id);

  useEffect(() => {
    window.scrollTo(0,0);
  }, [id]);

  if (!plan) {
    return (
      <div className="min-h-[100dvh] flex flex-col items-center justify-center bg-dark-bg">
        <h2 className="text-2xl font-bold text-white mb-4">Plano não encontrado</h2>
        <Button onClick={() => navigate('/')}>Voltar para Início</Button>
      </div>
    );
  }

  return (
    <div className="bg-dark-bg min-h-[100dvh] pb-20">
      {/* Header Info */}
      <div className="bg-dark-surface border-b border-dark-border pt-10 pb-16">
        <div className="container mx-auto px-4 md:px-6">
           <button onClick={() => navigate('/#planos')} className="flex items-center text-dark-muted hover:text-royal-400 mb-6 text-sm transition-colors">
             <ArrowLeft size={16} className="mr-1"/> Voltar para planos
           </button>
           <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
             <div>
               <h1 className="text-4xl font-bold text-white mb-2">Plano {plan.name}</h1>
               <p className="text-xl text-dark-muted max-w-2xl">{plan.description}</p>
             </div>
             <div className="text-left md:text-right">
                <div className="text-3xl font-bold text-royal-400">{plan.priceImplementation}</div>
                <div className="text-sm text-slate-500">Implementação única</div>
                <div className="text-lg font-medium text-slate-300 mt-2">+ {plan.priceMaintenance}</div>
                <div className="text-xs text-slate-500">Taxa mensal de manutenção</div>
             </div>
           </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 -mt-8">
         <div className="bg-dark-surface rounded-2xl shadow-xl shadow-black/40 border border-dark-border p-8 grid lg:grid-cols-3 gap-12">
            
            {/* Main Content (2 cols) */}
            <div className="lg:col-span-2 space-y-12">
               
               {/* Target Audience */}
               <section>
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <span className="w-8 h-1 bg-royal-500 rounded-full"></span> Para quem é
                  </h3>
                  <p className="text-slate-300 leading-relaxed bg-royal-900/10 p-4 rounded-lg border border-royal-500/20">
                    {plan.targetAudience}
                  </p>
               </section>

               {/* Includes */}
               <section>
                  <h3 className="text-lg font-bold text-white mb-6">O que está incluso</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {plan.includes.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors border border-transparent hover:border-dark-border">
                        <div className="mt-1 w-5 h-5 rounded-full bg-teal-900/30 border border-teal-500/30 flex items-center justify-center flex-shrink-0">
                           <Check size={12} className="text-teal-400" />
                        </div>
                        <span className="text-sm text-slate-300">{item}</span>
                      </div>
                    ))}
                  </div>
               </section>

               {/* Excludes & Limits */}
               <div className="grid md:grid-cols-2 gap-8">
                  <section>
                    <h3 className="text-lg font-bold text-white mb-4">O que não inclui</h3>
                    <ul className="space-y-3">
                      {plan.excludes.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-slate-500">
                          <X size={16} className="text-red-900/80 mt-0.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                  <section>
                    <h3 className="text-lg font-bold text-white mb-4">Limites do escopo</h3>
                    <ul className="space-y-3">
                       {plan.limits.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-dark-muted bg-dark-bg border border-dark-border p-2 rounded">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-600 mt-1.5 shrink-0"></span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
               </div>
            </div>

            {/* Sidebar (1 col) */}
            <div className="lg:col-span-1 space-y-8">
               <div className="bg-dark-bg p-6 rounded-xl border border-dark-border shadow-inner">
                  <div className="flex items-center gap-2 text-white font-semibold mb-2">
                    <Clock size={20} className="text-royal-400"/> Prazo estimado
                  </div>
                  <p className="text-dark-muted">{plan.estimatedTime}</p>
                  <p className="text-xs text-slate-500 mt-2">Contados após a entrega dos acessos.</p>
               </div>

               <div className="sticky top-24 space-y-4">
                 <Button fullWidth size="lg" onClick={() => window.open(`https://wa.me/5500000000000?text=Quero contratar o plano ${plan.name}`, '_blank')}>
                   Agendar Reunião
                 </Button>
                 <p className="text-center text-xs text-slate-500">
                   Faremos um diagnóstico rápido antes de fechar contrato.
                 </p>
                 
                 <div className="border-t border-dark-border pt-6 mt-6">
                    <h4 className="font-semibold text-white mb-2">Ainda tem dúvidas?</h4>
                    <p className="text-sm text-dark-muted mb-4">Converse com nosso agente virtual para entender melhor se este plano atende sua necessidade.</p>
                    <Button variant="ghost" fullWidth onClick={openChat} className="flex items-center gap-2 border border-dark-border hover:bg-white/5 hover:border-slate-500">
                       <MessageSquare size={16} /> Pergunte ao agente
                    </Button>
                 </div>
               </div>
            </div>

         </div>
      </div>
    </div>
  );
};

export default PlanDetail;