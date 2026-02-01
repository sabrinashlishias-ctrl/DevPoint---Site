import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, Sparkles, Maximize2, Minimize2, ChevronDown } from 'lucide-react';
import { GoogleGenAI, Chat } from "@google/genai";

interface Message {
  id: string;
  role: 'aron' | 'user';
  content: string;
}

const SUGGESTIONS_MAP: Record<string, string[]> = {
  start: ["Conhecer os planos", "Já quero agendar"],
  plans: ["Ver valores", "Diferença MVP vs Pro"],
  details: ["Como funciona a IA?", "Prazos de entrega"],
  closing: ["Agendar Reunião", "Falar no WhatsApp"],
  default: ["Ver Planos", "Agendar Conversa"]
};

const SYSTEM_INSTRUCTION = `
Você é Aron, agente especialista da DevPoint.

PERSONALIDADE:
- Profissional, direto, educado e confiante.
- Fala como um consultor humano, não como um robô.
- Nunca usa termos técnicos internos (API, key, backend, erro, sistema, conexão).

REGRAS ABSOLUTAS:
1) NUNCA falar que criamos software, apps ou produtos digitais.
2) NUNCA usar termos como "transformar sua ideia", "desenvolvimento de sistemas", "programação sob medida".
3) SEMPRE deixar claro que vendemos AUTOMAÇÃO DE ATENDIMENTO.
4) NUNCA mencionar API, backend, chave, erro técnico ou limitações internas.
5) NUNCA dizer que "não consegue responder".

O QUE OFERECEMOS:
- Agente de IA humanizado no WhatsApp
- Atendimento automático 24/7
- Qualificação do lead
- Agendamento automático integrado ao sistema do cliente
- Redução de perda de leads

PLANOS:
- MVP: implantação base da automação (WhatsApp + IA + agendamento) — a partir de R$3.000
- Profissional: fluxos mais avançados, personalização e integrações — a partir de R$5.000
- Premium: automação completa, múltiplos fluxos, maior complexidade — a partir de R$8.000

COMPORTAMENTO EM PERGUNTAS DE PREÇO:
- Nunca dizer "depende de API".
- Sempre responder algo como: "Consigo te orientar sim. Os projetos começam em R$3.000. Posso te ajudar a entender qual plano faz mais sentido."

ENCERRAMENTO PADRÃO:
- Sempre oferecer: "Quer que eu te ajude a escolher o plano ideal?" ou "Posso te explicar como funciona na prática."
`;

const AronChatSection: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'aron',
      content: 'Olá! Sou o Aron, especialista em automação da DevPoint. Como posso ajudar seu negócio a não perder mais leads?'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentSuggestions, setCurrentSuggestions] = useState<string[]>(SUGGESTIONS_MAP.start);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatSessionRef = useRef<Chat | null>(null);

  useEffect(() => {
    if (isExpanded) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [isExpanded]);

  useEffect(() => {
    const initChat = async () => {
      try {
        if (!process.env.API_KEY) {
          // Silent fail for static demo - fallback handled in handleSendMessage
          return;
        }
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        chatSessionRef.current = ai.chats.create({
          model: 'gemini-3-flash-preview',
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            temperature: 0.6, 
          },
        });
      } catch (error) {
        console.error("Chat init check:", error);
      }
    };
    initChat();
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping, isExpanded]);

  const updateSuggestions = (text: string) => {
    const lower = text.toLowerCase();
    if (lower.includes("agendar") || lower.includes("quero") || lower.includes("conversar")) {
      setCurrentSuggestions([]); 
    } else if (lower.includes("plano") || lower.includes("conhecer")) {
      setCurrentSuggestions(SUGGESTIONS_MAP.plans);
    } else if (lower.includes("valor") || lower.includes("preço") || lower.includes("diferença")) {
      setCurrentSuggestions(SUGGESTIONS_MAP.details);
    } else if (lower.includes("ia") || lower.includes("prazo") || lower.includes("funciona")) {
      setCurrentSuggestions(SUGGESTIONS_MAP.closing);
    } else {
      setCurrentSuggestions(SUGGESTIONS_MAP.default);
    }
  };

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    if (window.innerWidth < 1024) {
        setIsExpanded(true);
    }

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);
    
    const previousSuggestions = currentSuggestions;
    setCurrentSuggestions([]);

    try {
      let responseText = "";
      
      if (chatSessionRef.current) {
        const result = await chatSessionRef.current.sendMessage({ message: text });
        if (result.text) responseText = result.text;
      } else {
        // Fallback natural response (Mock personality)
        await new Promise(resolve => setTimeout(resolve, 1500));
        const lower = text.toLowerCase();
        
        if (lower.includes('preço') || lower.includes('valor') || lower.includes('quanto')) {
           responseText = "Consigo te orientar sim. Nossos projetos de automação começam em R$ 3.000 (Plano MVP). Se precisar de algo mais robusto com integrações complexas, temos o Plano Profissional a partir de R$ 5.000. Qual faz mais sentido para o seu momento?";
        } else if (lower.includes('agendar') || lower.includes('reunião')) {
           responseText = "Perfeito. Para agendarmos um diagnóstico e entendermos sua operação, basta clicar no botão 'Agendar Reunião' aqui no site. Vamos analisar seu fluxo atual.";
        } else {
           responseText = "Entendi. Como especialista em automação, posso te explicar como o agente de IA atende seus clientes 24/7 ou te ajudar a escolher o melhor plano. O que prefere?";
        }
      }

      const aronMsg: Message = { id: (Date.now() + 1).toString(), role: 'aron', content: responseText };
      setMessages(prev => [...prev, aronMsg]);
      updateSuggestions(text);

    } catch (error) {
      console.error(error);
      // Fallback error message (Natural language, no tech jargon)
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'aron', content: "Peço desculpas, tive um breve lapso de atenção. Poderia repetir sua pergunta, por favor?" }]);
      setCurrentSuggestions(previousSuggestions);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isTyping) handleSendMessage(inputValue);
  };

  return (
    <section className="py-12 lg:py-20 bg-[#0A0F1A] border-y border-dark-border relative overflow-hidden">
      {/* Background Decor */}
      <div className="hidden md:block absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-royal-900/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-teal-900/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-6xl mx-auto">
          
          <div className={`space-y-6 transition-opacity duration-300 ${isExpanded ? 'opacity-0 lg:opacity-100 hidden lg:block' : 'opacity-100'}`}>
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-royal-900/30 border border-royal-500/30 text-royal-300 text-xs font-semibold uppercase tracking-wider">
              <Sparkles size={14} className="mr-2 text-teal-400" />
              IA Specialist
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
              Ainda em dúvida? <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-royal-400 to-teal-400">
                Fale com o Aron.
              </span>
            </h2>
            <p className="text-lg text-dark-muted leading-relaxed max-w-lg">
              Nosso especialista virtual está pronto para explicar qual plano se encaixa no seu momento.
            </p>
          </div>

          <div className={`
             w-full mx-auto lg:ml-auto transition-all duration-300 ease-in-out
             ${isExpanded 
               ? 'fixed inset-0 z-[100] bg-[#0A0F1A] lg:relative lg:inset-auto lg:bg-transparent lg:z-0 lg:h-[600px]' 
               : 'relative h-[50vh] lg:h-[600px] z-10'
             }
          `}>
            <div className={`
              w-full h-full bg-dark-surface border border-dark-border shadow-2xl flex flex-col
              ${isExpanded ? 'rounded-none lg:rounded-2xl' : 'rounded-2xl'}
            `}>
              
              {/* Header */}
              <div className="px-5 py-3 bg-dark-bg border-b border-dark-border flex items-center justify-between sticky top-0 z-20">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-royal-600 to-royal-900 flex items-center justify-center border border-white/10">
                     <Bot size={16} className="text-white" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-white text-sm">Aron</span>
                    <span className="text-[10px] text-royal-300 font-medium">DevPoint AI</span>
                  </div>
                </div>
                
                <button 
                  type="button"
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="p-3 text-slate-400 hover:text-white rounded-full lg:hidden touch-manipulation active:bg-white/10"
                >
                  {isExpanded ? <Minimize2 size={24} /> : <Maximize2 size={24} />}
                </button>
              </div>

              {/* Messages */}
              <div 
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-4 space-y-5 bg-[#080C14] overscroll-contain"
              >
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`
                      max-w-[85%] px-4 py-3 text-sm rounded-2xl leading-relaxed shadow-sm
                      ${msg.role === 'user' 
                        ? 'bg-royal-600 text-white rounded-tr-sm' 
                        : 'bg-dark-surface border border-dark-border text-slate-200 rounded-tl-sm'
                      }
                    `}>
                      {msg.content}
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-dark-surface border border-dark-border px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce"></span>
                      <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce delay-75"></span>
                      <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce delay-150"></span>
                    </div>
                  </div>
                )}
                
                <div className="h-4"></div>
              </div>

              {/* Footer Actions */}
              <div className="bg-dark-bg border-t border-dark-border flex flex-col relative z-30 pb-4 md:pb-0">
                {!isTyping && currentSuggestions.length > 0 && (
                  <div className="px-4 py-3 flex flex-wrap gap-2 justify-end bg-dark-bg">
                     {currentSuggestions.slice(0, 3).map((suggestion, idx) => (
                       <button
                         key={idx}
                         type="button"
                         onClick={(e) => {
                             e.preventDefault();
                             e.stopPropagation();
                             handleSendMessage(suggestion);
                         }}
                         className="px-4 py-3 bg-dark-surface border border-royal-500/30 rounded-full text-xs font-medium text-white active:bg-royal-900 transition-colors shadow-sm touch-manipulation select-none"
                       >
                         {suggestion}
                       </button>
                     ))}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="px-4 pb-4 pt-1 relative z-40">
                  <div className="relative w-full group">
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Digite sua mensagem..."
                      disabled={isTyping}
                      className="w-full h-12 bg-dark-surface/80 border border-dark-border group-focus-within:border-royal-500/50 rounded-full pl-5 pr-14 text-sm text-white placeholder-slate-500 focus:outline-none transition-all disabled:opacity-50"
                    />
                    <button 
                      type="submit"
                      disabled={!inputValue.trim() || isTyping}
                      className="absolute right-1.5 top-1/2 -translate-y-1/2 w-9 h-9 bg-royal-600 hover:bg-royal-500 disabled:bg-slate-700 disabled:text-slate-500 text-white rounded-full flex items-center justify-center transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 touch-manipulation z-10"
                    >
                      <Send size={18} className="ml-0.5" />
                    </button>
                  </div>
                  
                  {isExpanded && (
                     <div className="mt-4 flex justify-center lg:hidden">
                        <button 
                          type="button"
                          onClick={() => setIsExpanded(false)} 
                          className="flex items-center gap-2 text-xs uppercase font-bold text-slate-500 py-3 px-6 rounded-full hover:bg-dark-surface transition-colors touch-manipulation border border-transparent active:border-dark-border"
                        >
                           <ChevronDown size={14}/> Recolher Chat
                        </button>
                     </div>
                  )}
                </form>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AronChatSection;