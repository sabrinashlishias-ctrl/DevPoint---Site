import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, Sparkles, Maximize2, Minimize2, ChevronDown, ArrowRight, X } from 'lucide-react';
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
Você é Aron, o agente de IA da DevPoint.
Seu objetivo é guiar o usuário de forma breve e direta até o agendamento.
Mantenha as respostas curtas (máximo 2 parágrafos).
Se o usuário perguntar sobre planos, resuma as diferenças.
Se o usuário quiser agendar, envie o link ou peça para clicar no botão de agendamento.
`;

const AronChatSection: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'aron',
      content: 'Olá! Sou o Aron. Posso te ajudar a escolher o plano ideal para o seu negócio?'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentSuggestions, setCurrentSuggestions] = useState<string[]>(SUGGESTIONS_MAP.start);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatSessionRef = useRef<Chat | null>(null);

  // Reliable scroll locking
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
          console.warn("API_KEY not found.");
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
        console.error("Failed to initialize chat:", error);
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
      let responseText = "Um momento, estou verificando...";
      if (chatSessionRef.current) {
        const result = await chatSessionRef.current.sendMessage({ message: text });
        if (result.text) responseText = result.text;
      } else {
        await new Promise(resolve => setTimeout(resolve, 1000));
        responseText = "Para te dar detalhes precisos, preciso da minha conexão. Mas posso te adiantar que nossos planos começam em R$ 3.000.";
      }

      const aronMsg: Message = { id: (Date.now() + 1).toString(), role: 'aron', content: responseText };
      setMessages(prev => [...prev, aronMsg]);
      updateSuggestions(text);

    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'aron', content: "Tive um erro de conexão. Tente novamente." }]);
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
      {/* Background Decor - Disabled on mobile for performance */}
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
              
              {/* Header - Solid background on mobile */}
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
                  <div className="flex gap-2 relative">
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Digite sua mensagem..."
                      disabled={isTyping}
                      className="w-full bg-dark-surface/50 border border-dark-border rounded-full pl-4 pr-12 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-royal-500 focus:border-royal-500 placeholder-slate-600 transition-all disabled:opacity-50"
                    />
                    <button 
                      type="submit"
                      disabled={!inputValue.trim() || isTyping}
                      className="absolute right-1.5 top-1.5 bottom-1.5 w-9 h-9 bg-royal-600 hover:bg-royal-500 text-white rounded-full flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed transition-colors shadow-lg touch-manipulation"
                    >
                      <Send size={16} />
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