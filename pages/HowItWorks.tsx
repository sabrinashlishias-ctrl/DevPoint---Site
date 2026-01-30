import React from 'react';
import Button from '../components/Button';
import { Search, Code, CheckCircle, Sliders } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: <Search className="w-8 h-8 text-royal-400" />,
      title: "1. Diagnóstico e Alinhamento",
      desc: "Primeiro, entendemos como você atende hoje. Mapeamos as perguntas frequentes, os horários de pico e onde os leads se perdem. Definimos juntos qual plano se encaixa melhor."
    },
    {
      icon: <Code className="w-8 h-8 text-teal-400" />,
      title: "2. Implementação e Integração",
      desc: "Nossa equipe configura o fluxo no WhatsApp, conecta com seu Google Calendar e CRM. Configuramos a IA (se aplicável) e testamos todos os cenários de erro."
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-royal-400" />,
      title: "3. Validação e Treinamento",
      desc: "Entregamos o sistema para você testar. Fazemos ajustes finos nos textos e ensinamos sua equipe a assumir o atendimento quando a automação transferir."
    },
    {
      icon: <Sliders className="w-8 h-8 text-teal-400" />,
      title: "4. Manutenção Contínua",
      desc: "Após o 'Go Live', entramos no modo manutenção. Monitoramos a estabilidade 24/7 e realizamos ajustes mensais conforme seu negócio evolui."
    }
  ];

  return (
    <div className="min-h-screen bg-dark-bg pb-20">
      <div className="bg-dark-surface border-b border-dark-border py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Como funciona o processo</h1>
          <p className="text-xl text-dark-muted max-w-2xl mx-auto">
             Da primeira conversa até a automação rodando, prezamos pela transparência e rapidez.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-16 max-w-4xl">
         <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-slate-800 before:z-0">
            {steps.map((step, idx) => (
              <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                  
                  {/* Icon Marker */}
                  <div className="absolute left-0 md:left-1/2 -translate-x-1/2 flex items-center justify-center w-10 h-10 rounded-full bg-dark-bg border-2 border-slate-700 shadow z-10 group-hover:border-royal-500 group-hover:scale-110 transition-all">
                     <div className="w-3 h-3 bg-slate-600 rounded-full group-hover:bg-royal-500 transition-colors"></div>
                  </div>

                  {/* Content Card */}
                  <div className="w-full md:w-[45%] pl-14 md:pl-0 p-6 bg-dark-surface border border-dark-border rounded-2xl shadow-sm hover:shadow-lg hover:border-royal-500/30 transition-all">
                     <div className="mb-4 p-3 bg-dark-bg border border-dark-border inline-block rounded-lg shadow-inner">
                        {step.icon}
                     </div>
                     <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                     <p className="text-dark-muted leading-relaxed">{step.desc}</p>
                  </div>
              </div>
            ))}
         </div>

         <div className="mt-20 text-center p-10 bg-royal-900/10 border border-royal-500/20 rounded-3xl">
            <h3 className="text-2xl font-bold text-white mb-4">Pronto para começar?</h3>
            <p className="text-royal-200/80 mb-8 max-w-lg mx-auto">Não deixe mais clientes esperando. Agende agora o diagnóstico do seu negócio.</p>
            <Button size="lg" onClick={() => window.open('https://wa.me/5500000000000', '_blank')}>
              Iniciar Diagnóstico Gratuito
            </Button>
         </div>
      </div>
    </div>
  );
};

export default HowItWorks;