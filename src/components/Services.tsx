import React from 'react';
import { Sparkles, Activity, Smile, Crown, Shield, Heart, ArrowRight, Clock, DollarSign } from 'lucide-react';
import { motion } from 'motion/react';
import { DentalService } from '../types';

interface ServicesProps {
  services: DentalService[];
  onSelectService: (serviceId: string) => void;
}

const iconMap: Record<string, any> = {
  Sparkles,
  Activity,
  Smile,
  Crown,
  Shield,
  Heart
};

export default function Services({ services, onSelectService }: ServicesProps) {
  return (
    <div className="bg-white min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-sans">
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <span className="px-3 py-1 bg-teal-50 text-teal-800 text-xs font-semibold rounded-full border border-teal-100 uppercase tracking-wider">
          Nuestras especialidades
        </span>
        <h2 className="text-4xl font-extrabold text-teal-950 tracking-tight">
          Tratamientos diseñados para tu bienestar
        </h2>
        <p className="text-gray-500 text-base leading-relaxed">
          Ofrecemos soluciones integrales y estéticas para pacientes de todas las edades, garantizando resultados duraderos y una experiencia sin estrés.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => {
          const IconComponent = iconMap[service.iconName] || Sparkles;
          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="bg-stone-50/40 rounded-2xl p-8 border border-stone-100 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300 group hover:border-teal-100"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center text-teal-700 mb-6 group-hover:bg-teal-600 group-hover:text-white transition-colors duration-300 border border-teal-100/50">
                  <IconComponent size={22} />
                </div>
                
                <h3 className="text-xl font-bold text-teal-950 group-hover:text-teal-900 transition-colors">
                  {service.name}
                </h3>
                
                <p className="text-sm text-gray-500 mt-3 leading-relaxed">
                  {service.description}
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100/80 flex flex-col gap-4">
                <div className="flex justify-between text-xs text-gray-500 font-medium">
                  <span className="flex items-center gap-1">
                    <Clock size={14} className="text-teal-600" />
                    Duración: {service.duration}
                  </span>
                  <span className="flex items-center gap-0.5 text-teal-950 font-semibold">
                    Valor aprox: {service.price}
                  </span>
                </div>

                <button
                  onClick={() => onSelectService(service.id)}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-teal-950 text-white rounded-xl text-xs font-bold hover:bg-teal-900 shadow-sm hover:shadow transition-all group-hover:translate-y-[-2px] duration-300 cursor-pointer"
                >
                  Agendar cita
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1 duration-200" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Special Offer card */}
      <div className="mt-20 bg-gradient-to-tr from-amber-50 to-stone-50 border border-amber-200/50 rounded-2xl p-8 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-8">
        <div className="space-y-2 max-w-xl text-center sm:text-left">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2.5 py-1 rounded-full">
            Primera visita
          </span>
          <h3 className="text-2xl font-bold text-teal-950">
            Valoración odontológica básica gratis
          </h3>
          <p className="text-sm text-stone-600 leading-relaxed">
            Incluye diagnóstico general, diagnóstico con cámara intraoral y plan de tratamiento personalizado sin ningún compromiso de pago inicial.
          </p>
        </div>
        <button
          onClick={() => onSelectService('1')} // default to deep cleaning/consultation
          className="px-6 py-3.5 bg-amber-900 text-white font-bold rounded-xl text-sm hover:bg-amber-950 shadow-md cursor-pointer shrink-0 transition-transform hover:scale-[1.02]"
        >
          Solicitar valoración gratis
        </button>
      </div>
    </div>
  );
}
