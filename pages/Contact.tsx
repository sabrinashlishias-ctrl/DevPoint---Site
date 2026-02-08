import React, { useState } from 'react';
import Button from '../components/Button';
import { Mail, Phone, MapPin } from 'lucide-react';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    niche: '',
    objective: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    alert(`Obrigado, ${formData.name}! Recebemos seu contato. Em breve um consultor chamará no WhatsApp.`);
    setFormData({ name: '', email: '', whatsapp: '', niche: '', objective: '' });
  };

  return (
    <div className="min-h-[100dvh] bg-dark-bg py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
           <h1 className="text-4xl font-bold text-white mb-4">Fale Conosco</h1>
           <p className="text-dark-muted max-w-xl mx-auto">Tem dúvidas específicas ou quer um projeto personalizado? Preencha o formulário ou chame direto no WhatsApp.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto bg-dark-surface rounded-3xl shadow-xl shadow-black/40 border border-dark-border overflow-hidden">
           {/* Info Side */}
           <div className="bg-royal-700 p-10 text-white flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-royal-500 rounded-full blur-3xl opacity-20 z-0 pointer-events-none"></div>
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-6">Informações de Contato</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                     <Phone className="mt-1 text-teal-300" />
                     <div>
                        <p className="font-medium">WhatsApp</p>
                        <p className="text-royal-100">(11) 99999-9999</p>
                     </div>
                  </div>
                  <div className="flex items-start gap-4">
                     <Mail className="mt-1 text-teal-300" />
                     <div>
                        <p className="font-medium">E-mail</p>
                        <p className="text-royal-100">contato@pipecode.com.br</p>
                     </div>
                  </div>
                  <div className="flex items-start gap-4">
                     <MapPin className="mt-1 text-teal-300" />
                     <div>
                        <p className="font-medium">Escritório</p>
                        <p className="text-royal-100">Av. Paulista, 1000 - SP</p>
                     </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-12 relative z-10">
                 <p className="text-sm text-royal-200">
                    Atendimento de Segunda a Sexta, das 9h às 18h.
                 </p>
              </div>
           </div>

           {/* Form Side */}
           <div className="p-10">
              <form onSubmit={handleSubmit} className="space-y-5">
                 <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Nome Completo</label>
                    <input 
                      required
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      type="text" 
                      className="w-full px-4 py-2 bg-dark-bg border border-dark-border text-white rounded-lg focus:ring-2 focus:ring-royal-500 focus:border-royal-500 outline-none transition-all placeholder-slate-600"
                      placeholder="Seu nome"
                    />
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">WhatsApp</label>
                        <input 
                          required
                          name="whatsapp"
                          value={formData.whatsapp}
                          onChange={handleChange}
                          type="tel" 
                          className="w-full px-4 py-2 bg-dark-bg border border-dark-border text-white rounded-lg focus:ring-2 focus:ring-royal-500 focus:border-royal-500 outline-none transition-all placeholder-slate-600"
                          placeholder="(00) 00000-0000"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Nicho</label>
                        <select 
                          name="niche"
                          value={formData.niche}
                          onChange={handleChange}
                          className="w-full px-4 py-2 bg-dark-bg border border-dark-border text-white rounded-lg focus:ring-2 focus:ring-royal-500 focus:border-royal-500 outline-none transition-all"
                        >
                           <option value="" className="text-slate-500">Selecione...</option>
                           <option value="saude">Saúde / Clínica</option>
                           <option value="advocacia">Advocacia</option>
                           <option value="beleza">Beleza / Estética</option>
                           <option value="outro">Outro</option>
                        </select>
                    </div>
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">E-mail Corporativo</label>
                    <input 
                      required
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      type="email" 
                      className="w-full px-4 py-2 bg-dark-bg border border-dark-border text-white rounded-lg focus:ring-2 focus:ring-royal-500 focus:border-royal-500 outline-none transition-all placeholder-slate-600"
                      placeholder="nome@empresa.com"
                    />
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Objetivo principal</label>
                    <textarea 
                      name="objective"
                      value={formData.objective}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-4 py-2 bg-dark-bg border border-dark-border text-white rounded-lg focus:ring-2 focus:ring-royal-500 focus:border-royal-500 outline-none transition-all placeholder-slate-600"
                      placeholder="Ex: Quero reduzir o tempo de resposta no WhatsApp..."
                    ></textarea>
                 </div>
                 <Button type="submit" fullWidth size="lg">
                    Agendar Consultoria
                 </Button>
              </form>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;