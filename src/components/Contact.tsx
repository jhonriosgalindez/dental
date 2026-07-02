import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, Heart, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [msg, setMsg] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSent(true);
      setName('');
      setEmail('');
      setPhone('');
      setMsg('');
    }, 1200);
  };

  return (
    <div className="bg-white min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-sans">
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <span className="px-3 py-1 bg-teal-50 text-teal-800 text-xs font-semibold rounded-full border border-teal-100 uppercase tracking-wider">
          Canales de atención
        </span>
        <h2 className="text-4xl font-extrabold text-teal-950 tracking-tight">
          Estamos aquí para atenderte
        </h2>
        <p className="text-gray-500 text-base leading-relaxed">
          ¿Tienes dudas sobre un tratamiento, costos o facilidades de pago? Escríbenos o llámanos directamente. Te responderemos en menos de 2 horas hábiles.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
        
        {/* Info Sidebar (5 Columns) */}
        <div className="lg:col-span-5 space-y-8 flex flex-col justify-between">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-teal-950">Contacto directo</h3>
            <p className="text-gray-500 text-sm">
              Puedes visitarnos de forma presencial o contactarnos a través de cualquiera de nuestros canales habilitados.
            </p>

            <div className="space-y-4">
              <div className="flex gap-4 items-start p-4 bg-stone-50 border border-stone-100 rounded-2xl">
                <MapPin size={20} className="text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-teal-950 text-sm">Ubicación de la clínica</h4>
                  <p className="text-xs text-gray-500 mt-1">Calle 100 #15-30, Oficina 402, Bogotá</p>
                </div>
              </div>

              <div className="flex gap-4 items-start p-4 bg-stone-50 border border-stone-100 rounded-2xl">
                <Phone size={20} className="text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-teal-950 text-sm">Central telefónica / WhatsApp</h4>
                  <p className="text-xs text-gray-500 mt-1">+57 (300) 123-4567 • (601) 456-7890</p>
                </div>
              </div>

              <div className="flex gap-4 items-start p-4 bg-stone-50 border border-stone-100 rounded-2xl">
                <Mail size={20} className="text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-teal-950 text-sm">Correo de soporte</h4>
                  <p className="text-xs text-gray-500 mt-1">contacto@clinicadental.com • soporte@clinicadental.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form (7 Columns) */}
        <div className="lg:col-span-7 bg-stone-50/50 rounded-3xl border border-stone-200/60 p-8 sm:p-10 shadow-sm flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex justify-between items-start">
              <h3 className="text-2xl font-bold text-teal-950">Envíanos un mensaje</h3>
            </div>

            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center space-y-4"
              >
                <div className="mx-auto w-14 h-14 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                  <CheckCircle2 size={28} />
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-bold text-teal-950 text-lg">¡Mensaje enviado con éxito!</h4>
                  <p className="text-gray-500 text-xs max-w-sm mx-auto leading-relaxed">
                    Hemos recibido tus comentarios. Uno de nuestros asesores de servicio te contactará al correo proporcionado en breve.
                  </p>
                </div>
                <button
                  onClick={() => setSent(false)}
                  className="px-5 py-2.5 bg-teal-950 text-white font-semibold rounded-xl text-xs hover:bg-teal-900 cursor-pointer"
                >
                  Enviar otro mensaje
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Nombre completo</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-teal-500 bg-white"
                      placeholder="Ej: Sofía Rojas"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Número de celular</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-teal-500 bg-white"
                      placeholder="Ej: +57 310 999 8888"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Correo electrónico</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-teal-500 bg-white"
                    placeholder="Ej: sofia.rojas@email.com"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">¿En qué podemos ayudarte?</label>
                  <textarea
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-teal-500 bg-white resize-none"
                    placeholder="Describe brevemente tus dudas o síntomas..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-teal-950 hover:bg-teal-900 text-white font-bold rounded-xl text-xs shadow hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {loading ? (
                    'Enviando...'
                  ) : (
                    <>
                      <Send size={14} />
                      Enviar mensaje seguro
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
