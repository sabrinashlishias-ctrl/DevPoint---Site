
import { Plan, FaqItem, NavItem, ProcessStep } from './types';

export const PLANS: Plan[] = [
  {
    id: 'porta-de-entrada',
    name: 'Porta de Entrada',
    priceImplementation: 'R$ 1.000',
    priceMaintenance: 'R$ 350/mês',
    description: 'Automação essencial para não perder nenhum lead no WhatsApp. A manutenção inclui os custos dos aplicativos e APIs necessárias.',
    targetAudience: 'Pequenos negócios, consultórios e prestadores de serviço que não podem perder leads.',
    includes: [
      'Robô 24/7 respondendo mensagens automaticamente',
      'Interpretação da intenção do lead (ex: orçamento, agendamento)',
      'Etiquetagem automática de contatos',
      'Encaminhamento organizado para atendimento humano',
      'Estrutura pensada para não perder leads, inclusive fora do horário'
    ],
    excludes: [
      'Agendamento automático direto no calendário (apenas encaminha)',
      'Integrações complexas via API',
      'Dashboards personalizados'
    ],
    limits: [
      '1 canal (WhatsApp)',
      'Até 1 agenda/calendário (visualização)',
      'Foco em retenção de lead'
    ],
    estimatedTime: '5 a 10 dias úteis',
    highlight: false,
  },
  {
    id: 'profissional',
    name: 'Profissional',
    priceImplementation: 'R$ 3.000',
    priceMaintenance: 'R$ 700/mês',
    description: 'Automação completa com agendamento automático e integração com sistemas do cliente.',
    targetAudience: 'Clínicas, escritórios de advocacia, imobiliárias e agências.',
    includes: [
      'Tudo do plano Porta de Entrada',
      'Fluxos com ramificações inteligentes (confirmar/reagendar/cancelar)',
      'Agendamento automático sem intervenção humana',
      'Integração com CRMs (Pipedrive, HubSpot, Monday, etc.)',
      'Logs estruturados de execução (sucesso/falha)',
      'Uso de IA para interpretação de mensagens e respostas curtas',
      '2 lembretes automáticos (ex.: 24h e 2h antes)'
    ],
    excludes: [
      'Banco de dados dedicado',
      'Painel administrativo próprio'
    ],
    limits: [
      'Até 2 calendários',
      'Até 3 integrações no total',
      'Escopo de IA limitado a atendimento/triagem'
    ],
    estimatedTime: '15 a 20 dias úteis',
    highlight: true,
  },
  {
    id: 'premium',
    name: 'Premium',
    priceImplementation: 'R$ 8.000',
    priceMaintenance: 'R$ 700/mês',
    description: 'Automação completa com banco de dados, retentativas e IA avançada.',
    targetAudience: 'Médias empresas e operações com alto volume de agendamento.',
    includes: [
      'Tudo do plano Profissional',
      'Agente de IA com tomada de decisão (regras e guardrails)',
      'Integrações avançadas via API (múltiplos sistemas)',
      'Banco de dados (Postgres/Supabase) para histórico',
      'Fila e retentativas (retries) para robustez',
      'Observabilidade básica (logs, alertas)',
      'Documentação completa (fluxo + diagrama + handoff)',
      'SLA e rotina de melhorias mensais'
    ],
    excludes: [
      'Desenvolvimento de app mobile nativo',
      'Suporte 24/7 humano (apenas monitoramento)'
    ],
    limits: [
      'Escopo definido via diagnóstico',
      'Funcionalidades extras sob orçamento'
    ],
    estimatedTime: '30 a 45 dias úteis',
    highlight: false,
  }
];

export const FAQS: FaqItem[] = [
  {
    question: "O que acontece se o WhatsApp cair?",
    answer: "Nossas automações possuem tratamento de erro. Se a API oficial do WhatsApp instabilizar, o sistema segura a mensagem ou notifica um humano para assumir."
  },
  {
    question: "Preciso pagar a API do WhatsApp a parte?",
    answer: "Depende do volume. Para a maioria dos pequenos negócios, utilizamos soluções que se enquadram em faixas gratuitas ou de baixo custo. Isso é detalhado no diagnóstico."
  },
  {
    question: "A IA atende qualquer tipo de pergunta?",
    answer: "Nos planos com IA, treinamos o agente com uma base de conhecimento específica da sua empresa. Perguntas fora do escopo são direcionadas para um humano."
  },
  {
    question: "Como funciona a manutenção mensal?",
    answer: "A taxa de R$ 700 cobre monitoramento dos servidores, pequenos ajustes nos textos do fluxo e suporte técnico para garantir que as integrações continuem funcionando."
  },
  {
    question: "Posso cancelar a manutenção?",
    answer: "Sim, porém sem a manutenção não garantimos o funcionamento contínuo das integrações, pois APIs de terceiros (Google, CRM) mudam com frequência."
  },
  {
    question: "Vocês atendem quais nichos?",
    answer: "Somos especialistas em negócios baseados em agenda: clínicas, consultórios, barbearias, salões de beleza, escritórios de advocacia e consultoria."
  }
];

export const NAV_ITEMS: NavItem[] = [
  { label: 'Início', path: '/' },
  { label: 'Planos', path: '/#planos' },
  { label: 'Como funciona', path: '/como-funciona' },
  { label: 'Contato', path: '/contato' },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    iconName: 'search',
    title: "1. Diagnóstico e Alinhamento",
    description: "Primeiro, entendemos como você atende hoje. Mapeamos as perguntas frequentes, os horários de pico e onde os leads se perdem."
  },
  {
    iconName: 'code',
    title: "2. Implementação e Integração",
    description: "Nossa equipe configura o fluxo no WhatsApp, conecta com seu Google Calendar e CRM. Configuramos a IA e testamos todos os cenários."
  },
  {
    iconName: 'check-circle',
    title: "3. Validação e Treinamento",
    description: "Entregamos o sistema para você testar. Fazemos ajustes finos nos textos e ensinamos sua equipe a assumir o atendimento quando necessário."
  },
  {
    iconName: 'sliders',
    title: "4. Manutenção Contínua",
    description: "Após o 'Go Live', entramos no modo manutenção. Monitoramos a estabilidade 24/7 e realizamos ajustes mensais conforme seu negócio evolui."
  }
];
