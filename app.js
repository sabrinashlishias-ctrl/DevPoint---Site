import { GoogleGenAI } from "@google/genai";

// Polyfill process.env for static deploy
if (typeof process === 'undefined') {
    window.process = { env: { API_KEY: '' } }; 
}

// --- CONSTANTS ---
const PLANS = [
  {
    id: 'mvp',
    name: 'MVP',
    priceImplementation: 'R$ 3.000',
    priceMaintenance: 'R$ 700/mês',
    description: 'Ideal para validar processos e organizar o atendimento inicial.',
    includes: ['Atendimento automático inicial', 'Coleta de dados essenciais', 'Agendamento no Calendar', 'Mensagens de confirmação'],
    highlight: false,
  },
  {
    id: 'profissional',
    name: 'Profissional',
    priceImplementation: 'R$ 5.000',
    priceMaintenance: 'R$ 700/mês',
    description: 'Para empresas que precisam de integração com CRM e mais robustez.',
    includes: ['Tudo do plano MVP', 'Fluxo com ramificações', 'Integração com CRM', 'IA para interpretação'],
    highlight: true,
  },
  {
    id: 'premium',
    name: 'Premium',
    priceImplementation: 'R$ 8.000',
    priceMaintenance: 'R$ 700/mês',
    description: 'Automação completa com banco de dados, retentativas e IA avançada.',
    includes: ['Tudo do plano Profissional', 'Agente de IA com decisão', 'Banco de dados histórico', 'SLA prioritário'],
    highlight: false,
  }
];

const FAQS = [
  { q: "O que acontece se o WhatsApp cair?", a: "Nossas automações possuem tratamento de erro para segurar a mensagem ou notificar humanos." },
  { q: "Preciso pagar a API do WhatsApp?", a: "Depende do volume. Para pequenos negócios, usamos soluções que se enquadram em faixas gratuitas." },
  { q: "A IA atende qualquer pergunta?", a: "Treinamos o agente com sua base de conhecimento. Fora do escopo, ele direciona para humano." }
];

const PROCESS_STEPS = [
  { iconName: 'search', title: "1. Diagnóstico", description: "Mapeamos perguntas frequentes e gargalos." },
  { iconName: 'code', title: "2. Implementação", description: "Configuramos WhatsApp, IA e integrações." },
  { iconName: 'check-circle', title: "3. Validação", description: "Testes e treinamento da equipe." },
  { iconName: 'sliders', title: "4. Manutenção", description: "Monitoramento 24/7 e melhorias." }
];

// --- ROUTER & APP LOGIC ---
const routes = {
    '/': renderHome,
    '/planos': () => {
        // Render Home first
        const app = document.getElementById('app');
        app.innerHTML = renderHome();
        
        // RE-ATTACH OBSERVERS & ICONS since we overwrote innerHTML
        setTimeout(observeElements, 50);
        if (window.lucide) window.lucide.createIcons();
        initAronChat();

        // Scroll to the #planos section with a slight delay
        setTimeout(() => {
            const section = document.getElementById('planos');
            if (section) section.scrollIntoView({ behavior: 'smooth' });
        }, 150);
    },
    '/como-funciona': renderHowItWorks,
    '/contato': renderContact,
};

function router() {
    const hash = window.location.hash;
    // Extract path from hash (e.g. #/planos -> /planos)
    // Default to / if empty
    let path = hash ? hash.slice(1) : '/';
    if (!path.startsWith('/')) path = '/' + path;

    const app = document.getElementById('app');
    
    // Check for Plan Detail Dynamic Route
    if (path.startsWith('/planos/')) {
        const planId = path.split('/')[2];
        app.innerHTML = renderPlanDetail(planId);
    } else {
        const renderer = routes[path] || renderHome;
        // Basic render
        app.innerHTML = renderer();
    }
    
    // Re-initialize Lucide icons and Observers after render
    if (window.lucide) window.lucide.createIcons();
    
    // Only scroll to top if NOT going to #planos via the router special case
    if (path !== '/planos') {
        window.scrollTo(0, 0);
    }
    
    setTimeout(observeElements, 100);
    
    // If on Home (or #planos which renders home), mount the Aron Chat
    if (path === '/' || path === '' || path === '/planos') initAronChat();
    
    updateActiveLink(path);
}

function updateActiveLink(path) {
    document.querySelectorAll('.nav-link').forEach(link => {
        const href = link.getAttribute('href');
        // Simple logic to highlight active link
        // Check if href matches #/path
        const target = '#' + path;
        
        if (href === target || (path === '/' && href === '#/') || (path === '/planos' && href === '#/planos')) {
            link.classList.add('text-royal-400', 'text-white');
            link.classList.remove('text-dark-muted');
        } else {
            link.classList.remove('text-royal-400', 'text-white');
            link.classList.add('text-dark-muted');
        }
    });
}

// --- ENTRY POINT ---
window.addEventListener('hashchange', router);
window.addEventListener('load', () => {
    router();
    initChatWidget();
    initMobileMenu();
});

// --- UTILS ---
function observeElements() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.classList.add('opacity-100', 'translate-y-0');
                entry.target.classList.remove('opacity-0', 'translate-y-12');
            }
        });
    }, { threshold: 0.1 });
    elements.forEach(el => observer.observe(el));
}

// --- RENDER FUNCTIONS ---

function renderHome() {
    return `
    <section class="relative pt-12 pb-20 md:pt-24 md:pb-32 overflow-hidden bg-dark-bg">
        <div class="hidden md:block absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-royal-900/30 rounded-full blur-3xl opacity-40 z-0 pointer-events-none"></div>
        <div class="hidden md:block absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-teal-900/30 rounded-full blur-3xl opacity-30 z-0 pointer-events-none"></div>
        <div class="container mx-auto px-4 md:px-6 relative z-10 text-center">
            <div class="max-w-4xl mx-auto mb-16">
                <div class="inline-flex items-center px-3 py-1 rounded-full bg-royal-900/20 border border-royal-500/20 text-royal-300 text-xs font-semibold tracking-wide uppercase mb-6 shadow-sm shadow-royal-900/20">
                  <span class="w-2 h-2 rounded-full bg-teal-400 mr-2 animate-pulse shadow-[0_0_8px_rgba(45,212,191,0.6)]"></span> Automação Inteligente 2.0
                </div>
                <h1 class="text-4xl md:text-6xl font-bold text-white leading-tight mb-6 glow-text">Automação de atendimento e <br class="hidden md:block"/><span class="text-transparent bg-clip-text bg-gradient-to-r from-royal-400 to-teal-400">agendamento que não falha.</span></h1>
                <p class="text-lg md:text-xl text-dark-muted mb-10 max-w-2xl mx-auto leading-relaxed">WhatsApp com IA, integrações robustas e rotinas automatizadas para negócios que dependem de uma agenda organizada.</p>
                <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button onclick="window.open('https://wa.me/5500000000000', '_blank')" class="bg-royal-600 hover:bg-royal-500 text-white px-8 py-3.5 text-lg rounded-lg shadow-lg shadow-royal-900/50 transition-all font-medium">Agendar uma reunião</button>
                  <button onclick="window.toggleChat()" class="bg-transparent border border-royal-500/30 text-royal-400 hover:bg-royal-500/10 px-8 py-3.5 text-lg rounded-lg transition-all font-medium">Tirar dúvidas com o agente</button>
                </div>
            </div>
        </div>
        <!-- Visuals -->
        <div class="relative mx-auto max-w-5xl px-4">
             <div class="bg-[#05080F] rounded-3xl border border-dark-border shadow-2xl overflow-hidden relative group">
                <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-royal-900/10 blur-[100px] rounded-full pointer-events-none"></div>
                <div class="relative z-10 py-16 md:py-24 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-0">
                    <div class="hidden md:block absolute top-1/2 left-[25%] right-[25%] h-[1px] bg-gradient-to-r from-transparent via-royal-500/20 to-transparent -translate-y-1/2 z-0"></div>
                    <div class="relative w-72 h-80 bg-dark-surface/50 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden z-10 transform hover:-translate-y-1 transition-transform duration-500">
                        <div class="h-12 border-b border-white/5 flex items-center px-4 gap-3 bg-white/5"><div class="flex gap-1.5"><div class="w-2.5 h-2.5 rounded-full bg-white/10"></div><div class="w-2.5 h-2.5 rounded-full bg-white/10"></div></div></div>
                        <div class="p-5 flex flex-col gap-4 flex-1 justify-center">
                            <div class="self-start bg-slate-800/50 border border-white/5 text-slate-300 px-4 py-3 rounded-2xl rounded-tl-none text-sm max-w-[85%]">Gostaria de agendar para quinta-feira.</div>
                            <div class="self-end bg-royal-600/90 text-white px-4 py-3 rounded-2xl rounded-tr-none text-sm max-w-[85%] shadow-lg">Confirmado. O horário das 15:30 está livre?</div>
                        </div>
                    </div>
                    <div class="relative z-20 mx-6 md:mx-12">
                        <div class="absolute inset-0 bg-teal-500/10 blur-2xl rounded-full animate-pulse"></div>
                        <div class="w-16 h-16 md:w-20 md:h-20 bg-[#0B1221] border border-royal-500/30 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(59,130,246,0.15)] relative">
                             <i data-lucide="sparkles" class="w-8 h-8 text-royal-400 fill-royal-400/10"></i>
                        </div>
                    </div>
                    <div class="relative w-72 h-80 bg-dark-surface/50 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden z-10 transform hover:-translate-y-1 transition-transform duration-500">
                        <div class="h-12 border-b border-white/5 flex items-center justify-between px-4 bg-white/5"><span class="text-white text-sm font-medium flex items-center gap-2"><i data-lucide="calendar" class="w-3.5 h-3.5 text-teal-400"></i> Outubro</span></div>
                        <div class="p-5 space-y-3 flex-1">
                            <div class="flex items-center justify-between gap-3 p-3 rounded-xl bg-royal-500/10 border border-royal-500/30 relative overflow-hidden group"><div class="absolute left-0 top-0 bottom-0 w-1 bg-royal-500"></div><div class="flex items-center gap-3 z-10"><span class="text-xs text-white font-bold font-mono">15:30</span><span class="text-xs text-royal-200 font-medium">Reunião</span></div><div class="bg-royal-500 rounded-full p-1 z-10 shadow-lg"><i data-lucide="check" class="w-2.5 h-2.5 text-white"></i></div></div>
                             <div class="mt-auto bg-[#0F172A] border border-white/10 p-3 rounded-xl flex items-center gap-3 shadow-lg"><div class="bg-teal-500/20 p-1.5 rounded-lg"><i data-lucide="clock" class="w-3 h-3 text-teal-400"></i></div><div><div class="text-[10px] text-white font-medium leading-tight">Sincronizado</div><div class="text-[9px] text-slate-400 leading-tight">Agenda atualizada</div></div></div>
                        </div>
                    </div>
                </div>
             </div>
        </div>
    </section>

    <!-- How it Works (Short) -->
    <section class="py-20 bg-dark-bg">
        <div class="container mx-auto px-4 md:px-6">
            <div class="text-center mb-16"><h2 class="text-3xl font-bold text-white mb-4">Como a DevPoint funciona</h2><p class="text-dark-muted max-w-2xl mx-auto">Processo simplificado.</p></div>
            <div class="grid md:grid-cols-3 gap-8">
                ${PROCESS_STEPS.slice(0,3).map((step, i) => `
                <div class="group p-8 rounded-2xl bg-dark-surface border border-dark-border hover:border-royal-500/30 hover:shadow-xl transition-all duration-300">
                    <div class="flex items-center justify-between mb-6"><span class="text-4xl font-bold text-slate-800 group-hover:text-royal-900/50 transition-colors">0${i+1}</span><div class="p-3 bg-dark-bg rounded-lg border border-dark-border shadow-inner text-white"><i data-lucide="${step.iconName}" class="w-8 h-8 text-royal-400"></i></div></div>
                    <h3 class="text-xl font-bold text-white mb-3">${step.title}</h3><p class="text-dark-muted leading-relaxed">${step.description}</p>
                </div>`).join('')}
            </div>
        </div>
    </section>

    <!-- Plans -->
    <!-- Added scroll-mt-24 and id="planos" for scroll fixing -->
    <section id="planos" class="py-24 bg-[#05080F] scroll-mt-24">
        <div class="container mx-auto px-4 md:px-6">
            <div class="text-center mb-16"><h2 class="text-3xl font-bold text-white mb-4">Escolha o plano ideal</h2><p class="text-dark-muted">Investimento único de implementação.</p></div>
            <div class="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                ${PLANS.map(plan => `
                    <div class="relative flex flex-col p-8 rounded-2xl bg-dark-surface border ${plan.highlight ? 'border-royal-500 ring-4 ring-royal-500/10 scale-105 z-10 shadow-2xl' : 'border-dark-border hover:border-royal-500/30'} transition-all">
                        ${plan.highlight ? '<div class="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-royal-600 text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider shadow-lg">Mais Popular</div>' : ''}
                        <div class="mb-6"><h3 class="text-2xl font-bold text-white">${plan.name}</h3><div class="mt-4 flex items-baseline gap-2"><span class="text-3xl font-bold text-white">${plan.priceImplementation}</span><span class="text-sm text-dark-muted font-medium uppercase">IMPL.</span></div><div class="text-sm text-royal-400 font-medium mt-1">+ ${plan.priceMaintenance} (manutenção)</div><p class="mt-4 text-dark-muted text-sm">${plan.description}</p></div>
                        <ul class="flex-grow mb-8 space-y-3">${plan.includes.map(item => `<li class="flex items-start gap-3 text-sm text-slate-300"><i data-lucide="check" class="w-4 h-4 text-teal-400 mt-0.5"></i> ${item}</li>`).join('')}</ul>
                        <div class="space-y-3"><a href="#/planos/${plan.id}" class="block w-full text-center py-2.5 rounded-lg border border-royal-500/30 text-royal-400 hover:bg-royal-500/10 transition-colors">Ver detalhes</a><button onclick="window.open('https://wa.me/5500000000000?text=Plano ${plan.name}', '_blank')" class="block w-full text-center py-2.5 rounded-lg text-dark-muted hover:text-white transition-colors group flex items-center justify-center gap-2">Agendar agora <i data-lucide="arrow-right" class="w-4 h-4 group-hover:translate-x-1"></i></button></div>
                    </div>`).join('')}
            </div>
        </div>
    </section>

    <!-- Aron Chat Section (Mount Point) -->
    <div id="aron-chat-mount"></div>

    <!-- FAQ -->
    <section class="py-20 bg-dark-bg">
        <div class="container mx-auto px-4 max-w-4xl">
            <h2 class="text-3xl font-bold text-white mb-12 text-center">Dúvidas Frequentes</h2>
            <div class="space-y-4">
                ${FAQS.map(faq => `<details class="group bg-dark-surface rounded-xl border border-dark-border"><summary class="flex items-center justify-between p-6 cursor-pointer list-none font-medium text-white hover:text-royal-400 transition-colors">${faq.q}<i data-lucide="chevron-right" class="transition-transform group-open:rotate-90"></i></summary><div class="px-6 pb-6 text-dark-muted text-sm border-t border-dark-border pt-4">${faq.a}</div></details>`).join('')}
            </div>
        </div>
    </section>
    `;
}

function renderHowItWorks() {
    return `
    <div class="min-h-screen bg-dark-bg pb-24">
      <div class="bg-dark-surface/50 backdrop-blur-md border-b border-dark-border py-20 md:py-28 relative overflow-hidden">
        <div class="container mx-auto px-4 text-center relative z-10"><h1 class="text-4xl md:text-5xl font-bold text-white mb-6">Como funciona o processo</h1><p class="text-lg md:text-xl text-dark-muted max-w-2xl mx-auto">Transparência e rapidez.</p></div>
      </div>
      <div class="container mx-auto px-4 mt-20 max-w-5xl">
         <div class="relative">
            <div class="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-slate-700 to-transparent md:-translate-x-1/2 z-0"></div>
            <div class="space-y-16 md:space-y-24 pb-20">
              ${PROCESS_STEPS.map((step, idx) => `
                <div class="animate-on-scroll opacity-0 translate-y-12 transition-all duration-700 ease-out relative flex flex-col md:flex-row items-center md:justify-between w-full ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''}">
                    <div class="hidden md:block w-[calc(50%-3rem)]"></div>
                    <div class="absolute left-8 md:left-1/2 -translate-x-1/2 flex items-center justify-center z-20 top-0 md:top-1/2 md:-translate-y-1/2"><div class="w-14 h-14 rounded-full bg-[#070B14] border border-dark-border shadow-2xl flex items-center justify-center relative z-10"><span class="text-lg font-bold ${idx % 2 === 0 ? 'text-royal-400' : 'text-teal-400'}">${idx + 1}</span></div></div>
                    <div class="w-full pl-24 md:pl-0 md:w-[calc(50%-3rem)] ${idx % 2 === 0 ? 'md:pr-0' : 'md:pl-0'}"><div class="group relative p-8 bg-dark-surface/60 backdrop-blur-sm border border-dark-border rounded-2xl shadow-lg z-10"><div class="mb-5 inline-flex items-center justify-center p-3 rounded-xl bg-dark-bg border border-dark-border shadow-inner relative z-30"><i data-lucide="${step.iconName}" class="w-6 h-6 ${idx % 2 === 0 ? 'text-royal-400' : 'text-teal-400'}"></i></div><h3 class="text-xl font-bold text-white mb-3 leading-snug break-words relative z-30">${step.title}</h3><p class="text-dark-muted text-sm md:text-base leading-relaxed relative z-30">${step.description}</p></div></div>
                </div>`).join('')}
            </div>
         </div>
      </div>
    </div>`;
}

function renderContact() {
    return `<div class="min-h-screen bg-dark-bg py-20 container mx-auto px-4"><div class="text-center mb-16"><h1 class="text-4xl font-bold text-white mb-4">Fale Conosco</h1></div><div class="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto bg-dark-surface rounded-3xl border border-dark-border overflow-hidden"><div class="bg-royal-700 p-10 text-white"><h3 class="text-2xl font-bold mb-6">Contatos</h3><div class="space-y-6"><div class="flex items-start gap-4"><i data-lucide="phone" class="w-5 h-5 text-teal-300"></i><div><p>WhatsApp</p><p class="text-royal-100">(11) 99999-9999</p></div></div><div class="flex items-start gap-4"><i data-lucide="mail" class="w-5 h-5 text-teal-300"></i><div><p>E-mail</p><p>contato@devpoint.com.br</p></div></div></div></div><div class="p-10"><form onsubmit="event.preventDefault(); alert('Enviado!');" class="space-y-5"><div><label class="block text-sm text-slate-300 mb-1">Nome</label><input type="text" class="w-full px-4 py-2 bg-dark-bg border border-dark-border text-white rounded-lg focus:border-royal-500 outline-none" required /></div><button type="submit" class="w-full bg-royal-600 hover:bg-royal-500 text-white px-8 py-3.5 rounded-lg font-medium">Enviar</button></form></div></div></div>`;
}

function renderPlanDetail(id) {
    const plan = PLANS.find(p => p.id === id);
    if (!plan) return `<div class="min-h-screen flex items-center justify-center text-white"><h2>Plano não encontrado</h2></div>`;
    return `<div class="bg-dark-bg min-h-screen pb-20"><div class="bg-dark-surface border-b border-dark-border pt-10 pb-16"><div class="container mx-auto px-4"><button onclick="window.history.back()" class="text-dark-muted hover:text-white mb-6 flex items-center gap-1"><i data-lucide="arrow-left" class="w-4 h-4"></i> Voltar</button><h1 class="text-4xl font-bold text-white">${plan.name}</h1><p class="text-xl text-dark-muted mt-2">${plan.description}</p></div></div><div class="container mx-auto px-4 -mt-8"><div class="bg-dark-surface rounded-2xl border border-dark-border p-8"><h3 class="text-lg font-bold text-white mb-6">Incluso</h3><div class="grid sm:grid-cols-2 gap-4">${plan.includes.map(i => `<div class="flex items-start gap-3 p-3 rounded-lg border border-dark-border"><i data-lucide="check" class="w-4 h-4 text-teal-400 mt-1"></i><span class="text-slate-300 text-sm">${i}</span></div>`).join('')}</div></div></div></div>`;
}

// --- CHAT WIDGET & ARON CHAT ---
let isChatOpen = false;
window.toggleChat = () => {
    isChatOpen = !isChatOpen;
    const win = document.getElementById('chat-window');
    if (win) {
        if (isChatOpen) {
            win.classList.remove('scale-90', 'opacity-0', 'translate-y-10', 'pointer-events-none');
            win.classList.add('scale-100', 'opacity-100', 'pointer-events-auto');
        } else {
            win.classList.add('scale-90', 'opacity-0', 'translate-y-10', 'pointer-events-none');
            win.classList.remove('scale-100', 'opacity-100', 'pointer-events-auto');
        }
    }
};

function initChatWidget() {
    const container = document.getElementById('chat-container');
    if(container) container.innerHTML = `
    <div class="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
      <div id="chat-window" class="mb-4 w-[90vw] md:w-96 bg-dark-surface rounded-2xl shadow-2xl border border-dark-border overflow-hidden transition-all duration-300 origin-bottom-right scale-90 opacity-0 translate-y-10 pointer-events-none h-[70vh] max-h-[600px] flex flex-col">
        <div class="bg-royal-700 p-4 flex justify-between items-center text-white border-b border-royal-600 shrink-0">
          <div class="flex items-center space-x-3"><div class="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center"><i data-lucide="message-square" class="w-4 h-4"></i></div><div><h3 class="font-semibold text-sm">Agente DevPoint</h3><p class="text-xs text-royal-200">Online</p></div></div>
          <button onclick="window.toggleChat()" class="text-white/70 hover:text-white p-1"><i data-lucide="x" class="w-5 h-5"></i></button>
        </div>
        <div id="chat-messages" class="flex-1 p-4 overflow-y-auto bg-[#0A0F1A] space-y-4"><div class="flex justify-start"><div class="max-w-[80%] rounded-2xl px-4 py-3 text-sm bg-dark-surface text-slate-200 border border-dark-border rounded-tl-none">Olá! Sou o agente virtual. Como posso ajudar?</div></div></div>
        <div class="p-3 bg-dark-surface border-t border-dark-border flex gap-2 shrink-0"><input type="text" id="chat-input" placeholder="Digite..." class="flex-1 bg-dark-bg border border-dark-border rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-royal-500"><button onclick="sendUserMsg()" class="bg-royal-600 text-white p-2 rounded-lg w-10 h-10 flex items-center justify-center"><i data-lucide="send" class="w-4 h-4"></i></button></div>
      </div>
      <button onclick="window.toggleChat()" class="bg-royal-600 hover:bg-royal-500 text-white p-4 rounded-full shadow-lg transition-all hover:scale-110 pointer-events-auto border border-royal-400/20 flex items-center justify-center"><i data-lucide="message-square" class="w-6 h-6"></i></button>
    </div>`;
    document.getElementById('chat-input')?.addEventListener('keypress', (e) => { if(e.key === 'Enter') sendUserMsg(); });
}

window.sendUserMsg = () => {
    const input = document.getElementById('chat-input');
    const txt = input.value.trim();
    if(!txt) return;
    const box = document.getElementById('chat-messages');
    box.innerHTML += `<div class="flex justify-end"><div class="max-w-[80%] rounded-2xl px-4 py-3 text-sm bg-royal-600 text-white rounded-tr-none">${txt}</div></div>`;
    input.value = '';
    box.scrollTop = box.scrollHeight;
    setTimeout(() => {
        box.innerHTML += `<div class="flex justify-start"><div class="max-w-[80%] rounded-2xl px-4 py-3 text-sm bg-dark-surface text-slate-200 border border-dark-border rounded-tl-none">Entendi. Posso te ajudar a agendar uma reunião?</div></div>`;
        box.scrollTop = box.scrollHeight;
    }, 1000);
};

// --- ARON CHAT ---
function initAronChat() {
    const mount = document.getElementById('aron-chat-mount');
    if(!mount) return;
    mount.innerHTML = `
    <section class="py-12 lg:py-20 bg-[#0A0F1A] border-y border-dark-border relative overflow-hidden">
      <div class="container mx-auto px-4 md:px-6 relative z-10">
        <div class="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-6xl mx-auto">
          <div class="space-y-6">
            <div class="inline-flex items-center px-3 py-1 rounded-full bg-royal-900/30 border border-royal-500/30 text-royal-300 text-xs font-semibold uppercase tracking-wider"><i data-lucide="sparkles" class="w-3 h-3 mr-2 text-teal-400"></i> IA Specialist</div>
            <h2 class="text-3xl md:text-4xl font-bold text-white leading-tight">Ainda em dúvida?<br/><span class="text-transparent bg-clip-text bg-gradient-to-r from-royal-400 to-teal-400">Fale com o Aron.</span></h2>
            <p class="text-lg text-dark-muted">Nosso especialista virtual está pronto para explicar qual plano se encaixa no seu momento.</p>
          </div>
          <div id="aron-interface" class="w-full relative h-[500px] z-10">
             <div class="w-full h-full bg-dark-surface border border-dark-border shadow-2xl rounded-2xl flex flex-col overflow-hidden">
                <div class="px-5 py-3 bg-dark-bg border-b border-dark-border flex items-center gap-3"><div class="w-8 h-8 rounded-full bg-gradient-to-br from-royal-600 to-royal-900 flex items-center justify-center border border-white/10"><i data-lucide="bot" class="text-white w-4 h-4"></i></div><div><span class="font-bold text-white text-sm block">Aron</span><span class="text-[10px] text-royal-300 font-medium">DevPoint AI</span></div></div>
                <div id="aron-messages" class="flex-1 overflow-y-auto p-4 space-y-4 bg-[#080C14]">
                    <div class="flex justify-start"><div class="max-w-[85%] px-4 py-3 text-sm rounded-2xl bg-dark-surface border border-dark-border text-slate-200 rounded-tl-sm">Olá! Sou o Aron, especialista em automação da DevPoint. Como posso ajudar seu negócio a não perder mais leads?</div></div>
                </div>
                <div class="bg-dark-bg border-t border-dark-border p-4 relative z-30">
                   <div id="aron-suggestions" class="flex flex-wrap gap-2 justify-end mb-3">
                      <button onclick="aronSend('Ver valores')" class="px-3 py-2 bg-dark-surface border border-royal-500/30 rounded-full text-xs text-white touch-manipulation noselect">Ver valores</button>
                      <button onclick="aronSend('Como funciona?')" class="px-3 py-2 bg-dark-surface border border-royal-500/30 rounded-full text-xs text-white touch-manipulation noselect">Como funciona?</button>
                   </div>
                   <div class="relative w-full group">
                      <input type="text" id="aron-input" placeholder="Digite..." class="w-full h-12 bg-dark-surface/80 border border-dark-border group-focus-within:border-royal-500/50 rounded-full pl-5 pr-14 text-sm text-white focus:outline-none transition-all placeholder-slate-500">
                      <button onclick="aronClickSend()" class="absolute right-1.5 top-1/2 -translate-y-1/2 w-9 h-9 bg-royal-600 hover:bg-royal-500 text-white rounded-full flex items-center justify-center transition-all shadow-md hover:shadow-lg active:scale-95 touch-manipulation z-10"><i data-lucide="send" class="w-4 h-4 ml-0.5"></i></button>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>`;
    if (window.lucide) window.lucide.createIcons();
    document.getElementById('aron-input')?.addEventListener('keypress', (e) => { if(e.key === 'Enter') aronClickSend(); });
}

function initMobileMenu() {
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    const links = document.querySelectorAll('.mobile-nav-link');
    btn.addEventListener('click', () => {
        if (menu.classList.contains('hidden')) {
            menu.classList.remove('hidden'); menu.classList.add('flex'); document.body.style.overflow = 'hidden';
        } else {
            menu.classList.add('hidden'); menu.classList.remove('flex'); document.body.style.overflow = '';
        }
    });
    links.forEach(link => link.addEventListener('click', () => {
        menu.classList.add('hidden'); menu.classList.remove('flex'); document.body.style.overflow = '';
    }));
}