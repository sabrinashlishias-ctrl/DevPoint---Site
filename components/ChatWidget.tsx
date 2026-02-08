import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, ChevronRight } from 'lucide-react';
import { useChat } from '../context/ChatContext';
import { ChatMessage } from '../types';

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: '1',
    sender: 'agent',
    text: 'Olá! Sou o agente virtual da PIPECODE. Como posso ajudar você a automatizar seu negócio hoje?',
    type: 'options',
    options: ['Quero agendar', 'Planos e valores', 'Como funciona', 'Manutenção']
  }
];

const ChatWidget: React.FC = () => {
  const { isChatOpen, toggleChat } = useChat();
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isChatOpen]);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    // Add User Message
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: text
    };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Mock Response Logic
    setTimeout(() => {
      let botResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'agent',
        text: 'Desculpe, não entendi. Pode escolher uma das opções abaixo?',
        type: 'options',
        options: ['Quero agendar', 'Ver Planos', 'Falar com humano']
      };

      const lowerText = text.toLowerCase();

      if (lowerText.includes('agendar') || lowerText.includes('reunião')) {
        botResponse.text = 'Ótimo! Agendar uma reunião é o primeiro passo para transformar seu atendimento. Por favor, clique no botão abaixo para escolher o melhor horário.';
        botResponse.type = 'text'; // In a real app, this would be a link or form
        setTimeout(() => {
           setMessages(prev => [...prev, {
             id: Date.now().toString(),
             sender: 'agent',
             text: 'Ou deixe seu WhatsApp aqui que entramos em contato.',
             type: 'text'
           }]);
        }, 1000);
      } else if (lowerText.includes('plano') || lowerText.includes('valor') || lowerText.includes('preço')) {
        botResponse.text = 'Temos planos a partir de R$ 1.000 para implementação. O "Porta de Entrada" é ideal para começar, e o Profissional integra tudo. Gostaria de ver detalhes de qual?';
        botResponse.options = ['Porta de Entrada', 'Profissional', 'Premium'];
      } else if (lowerText.includes('mvp') || lowerText.includes('porta')) {
        botResponse.text = 'O plano Porta de Entrada custa R$ 1.000 + R$ 350/mês. Inclui automação de WhatsApp e encaminhamento inteligente de leads, garantindo que você não perca vendas.';
        botResponse.options = ['Quero esse', 'Ver outros', 'Agendar Reunião'];
      } else if (lowerText.includes('profissional')) {
        botResponse.text = 'O plano Profissional custa R$ 3.000 + R$ 700/mês. Inclui agendamento 100% automático e integração com seu CRM e Calendar.';
        botResponse.options = ['Quero esse', 'Ver outros', 'Agendar Reunião'];
      } else if (lowerText.includes('manutenção') || lowerText.includes('manutencao')) {
        botResponse.text = 'A manutenção (R$ 350 ou R$ 700) cobre os custos de APIs, servidores e garante que suas integrações continuem funcionando mesmo se o WhatsApp mudar algo.';
      } else if (lowerText.includes('como funciona')) {
         botResponse.text = 'Trabalhamos em 3 etapas: 1. Diagnóstico, 2. Implementação, 3. Manutenção. Quer agendar um diagnóstico gratuito?';
         botResponse.options = ['Sim, agendar', 'Dúvidas técnicas'];
      }

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSendMessage(inputValue);
  };

  return (
    // FIX: Added w-auto h-auto and max-w-full to ensure container doesn't block clicks outside itself
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none w-auto h-auto max-w-[calc(100vw-2rem)]">
      {/* Chat Window */}
      <div 
        className={`
          mb-4 w-[90vw] md:w-96 bg-dark-surface rounded-2xl shadow-2xl shadow-black/50 border border-dark-border overflow-hidden transition-all duration-300 origin-bottom-right pointer-events-auto
          ${isChatOpen 
            ? 'scale-100 opacity-100 visible' 
            : 'scale-90 opacity-0 translate-y-10 pointer-events-none invisible delay-200'
          }
        `}
        style={{ maxHeight: '600px', height: '70vh', overscrollBehavior: 'contain' }}
      >
        {/* Header */}
        <div className="bg-royal-700 p-4 flex justify-between items-center text-white border-b border-royal-600">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
              <MessageSquare size={16} />
            </div>
            <div>
              <h3 className="font-semibold text-sm">Agente PIPECODE</h3>
              <p className="text-xs text-royal-200 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-teal-400 block animate-pulse"></span>
                Online agora
              </p>
            </div>
          </div>
          <button type="button" onClick={toggleChat} className="text-white/70 hover:text-white transition-colors p-1 touch-manipulation">
            <X size={20} />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 p-4 overflow-y-auto bg-[#0A0F1A] h-[calc(100%-8rem)] touch-auto">
          <div className="space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`
                    max-w-[80%] rounded-2xl px-4 py-3 text-sm
                    ${msg.sender === 'user' 
                      ? 'bg-royal-600 text-white rounded-tr-none' 
                      : 'bg-dark-surface text-slate-200 border border-dark-border shadow-sm rounded-tl-none'
                    }
                  `}
                >
                  <p>{msg.text}</p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-dark-surface border border-dark-border rounded-2xl rounded-tl-none px-4 py-3 shadow-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Quick Replies */}
          {messages.length > 0 && messages[messages.length - 1].sender === 'agent' && messages[messages.length - 1].options && (
            <div className="mt-4 flex flex-wrap gap-2 relative z-10">
              {messages[messages.length - 1].options?.map((opt) => (
                <button
                  type="button"
                  key={opt}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleSendMessage(opt);
                  }}
                  className="bg-royal-900/30 text-royal-300 text-xs px-3 py-2 rounded-full border border-royal-800 hover:bg-royal-800 hover:text-white transition-colors touch-manipulation cursor-pointer select-none"
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="absolute bottom-0 w-full bg-dark-surface border-t border-dark-border p-3 flex gap-2 z-20">
          <input
            type="text"
            placeholder="Digite sua dúvida..."
            className="flex-1 bg-dark-bg border border-dark-border rounded-lg px-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-royal-500 transition-colors"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <button 
            type="button"
            onClick={() => handleSendMessage(inputValue)}
            className="bg-royal-600 hover:bg-royal-500 text-white p-2 rounded-lg transition-colors flex items-center justify-center w-10 h-10 touch-manipulation"
          >
            <Send size={18} />
          </button>
        </div>
      </div>

      {/* Floating Button */}
      <button 
        type="button"
        onClick={toggleChat}
        className="bg-royal-600 hover:bg-royal-500 text-white p-4 rounded-full shadow-lg shadow-royal-900/50 transition-all hover:scale-110 group pointer-events-auto flex items-center gap-2 border border-royal-400/20 touch-manipulation"
        aria-label="Falar com agente"
      >
        <MessageSquare size={24} />
        {!isChatOpen && (
          <span className="hidden group-hover:block whitespace-nowrap text-sm font-medium pr-2 animate-fade-in">
            Falar com agente
          </span>
        )}
      </button>
    </div>
  );
};

export default ChatWidget;