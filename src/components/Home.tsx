import React from 'react';
import { ArrowRight, Sparkles, Star, ShieldCheck, Heart, User, Calendar, Award, Monitor, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface HomeProps {
  setCurrentTab: (tab: string) => void;
}

export default function Home({ setCurrentTab }: HomeProps) {
  return (
    <div className="bg-white text-gray-800 font-sans min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-10 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center text-center">
        
        {/* Background Watermark Elements (Tooth graphics as styled in the image) */}
        <div className="absolute top-[15%] left-[5%] opacity-5 pointer-events-none hidden lg:block select-none transform -rotate-12">
          <svg width="220" height="220" viewBox="0 0 24 24" fill="currentColor" className="text-teal-900">
            <path d="M12 2C9.5 2 7.5 4 7.5 6.5C7.5 7.8 8.1 9 9.1 9.8C6.1 11.2 4 14.2 4 17.8C4 18.2 4.1 18.5 4.3 18.8L6.5 22H17.5L19.7 18.8C19.9 18.5 20 18.2 20 17.8C20 14.2 17.9 11.2 14.9 9.8C15.9 9 16.5 7.8 16.5 6.5C16.5 4 14.5 2 12 2ZM12 4C13.4 4 14.5 5.1 14.5 6.5C14.5 7.9 13.4 9 12 9C10.6 9 9.5 7.9 9.5 6.5C9.5 5.1 10.6 4 12 4ZM12 11C15 11 17.6 13.2 18 16H6C6.4 13.2 9 11 12 11Z" />
          </svg>
        </div>
        <div className="absolute top-[18%] right-[5%] opacity-5 pointer-events-none hidden lg:block select-none transform rotate-12">
          <svg width="220" height="220" viewBox="0 0 24 24" fill="currentColor" className="text-teal-900">
            <path d="M12 2.248c-5.385 0-9.75 4.365-9.75 9.75 0 5.385 4.365 9.751 9.75 9.751 5.385 0 9.75-4.366 9.75-9.751 0-5.385-4.365-9.75-9.75-9.75zm0 17.918c-4.512 0-8.168-3.656-8.168-8.168 0-4.512 3.656-8.168 8.168-8.168 4.512 0 8.168 3.656 8.168 8.168 0 4.512-3.656 8.168-8.168 8.168zm1.096-11.396h-2.193v2.193H8.71v2.193h2.193v2.193h2.193v-2.193h2.193v-2.193h-2.193v-2.193z" />
          </svg>
        </div>

        {/* 20k+ Happy Patients Badge */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2.5 px-4.5 py-2 rounded-full border border-teal-100 bg-teal-50/40 text-teal-900 text-[14px] font-semibold mb-8 shadow-sm"
        >
          <div className="flex -space-x-2">
            <img className="w-6 h-6 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100" alt="patient 1" referrerPolicy="no-referrer" />
            <img className="w-6 h-6 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100" alt="patient 2" referrerPolicy="no-referrer" />
            <img className="w-6 h-6 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100" alt="patient 3" referrerPolicy="no-referrer" />
            <div className="w-6 h-6 rounded-full border-2 border-white bg-teal-600 flex items-center justify-center text-[9px] text-white font-black">
              +
            </div>
          </div>
          <span className="text-gray-700">20,000+ pacientes felices</span>
        </motion.div>

        {/* Title */}
        <motion.h1 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-teal-950 max-w-4xl leading-[1.15]"
        >
          Creando sonrisas saludables con atención dental personalizada
        </motion.h1>

        {/* Subtext */}
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-6 text-base sm:text-lg text-gray-500 max-w-2xl leading-relaxed font-normal"
        >
          Una sonrisa segura refleja tu bienestar general, comodidad y la alta calidad de atención que te brindamos todos los días.
        </motion.p>

        {/* Call to Action Button */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-10"
        >
          <button
            onClick={() => setCurrentTab('tu-cita')}
            className="inline-flex items-center gap-2 px-8 py-4 bg-teal-950 text-white rounded-full font-semibold text-base hover:bg-teal-900 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer"
          >
            Reservar cita
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1 duration-200" />
          </button>
        </motion.div>
      </section>

      {/* 3 Columns Section (Mirroring the image bottom section perfectly) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          
          {/* Card 1: Dentist treating a patient (Left card) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative rounded-3xl overflow-hidden shadow-md h-[400px] lg:h-[450px] group"
          >
            <img 
              src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=600" 
              alt="Odontólogo examinando paciente" 
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-teal-950/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-semibold uppercase tracking-wider">
                Cuidado experto
              </span>
              <h3 className="text-xl font-bold mt-2.5">Tratamientos integrales</h3>
              <p className="text-sm text-teal-100 mt-1 leading-relaxed">
                Tecnología de vanguardia para asegurar diagnósticos precisos y sin dolor.
              </p>
            </div>
          </motion.div>

          {/* Card 2: Aesthetic Image Card (Middle card) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="relative rounded-3xl overflow-hidden shadow-md h-[400px] lg:h-[450px] group"
          >
            <img 
              src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=600" 
              alt="Paciente sonriendo en clínica dental" 
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-teal-950/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-semibold uppercase tracking-wider">
                Dentistas especializados
              </span>
              <h3 className="text-xl font-bold mt-2.5">Tu salud y bienestar</h3>
              <p className="text-sm text-teal-100 mt-1 leading-relaxed">
                Tu salud bucal, tranquilidad y seguridad estética son nuestra máxima prioridad diaria.
              </p>
              {/* Bottom link */}
              <div className="mt-4 pt-4 border-t border-white/20">
                <button 
                  onClick={() => setCurrentTab('sobre-nosotros')}
                  className="inline-flex items-center gap-1.5 text-white font-bold text-[14px] hover:text-teal-200 transition-colors group cursor-pointer"
                >
                  Conócenos
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Card 3: Female Dental Assistant adjust light (Right card) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative rounded-3xl overflow-hidden shadow-md h-[400px] lg:h-[450px] group"
          >
            <img 
              src="https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&q=80&w=600" 
              alt="Higiene y bioseguridad en clínica dental" 
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-teal-950/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-semibold uppercase tracking-wider">
                Alta tecnología
              </span>
              <h3 className="text-xl font-bold mt-2.5">Higiene y bioseguridad</h3>
              <p className="text-sm text-teal-100 mt-1 leading-relaxed">
                Garantizamos protocolos rigurosos de esterilización para proteger tu vida y salud.
              </p>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Feature Bento Section */}
      <section className="bg-teal-50/30 py-20 border-y border-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-teal-950 tracking-tight">¿Por qué elegirnos?</h2>
            <p className="text-gray-500 mt-3">Combinamos experiencia médica de alto nivel con un trato humano, cálido y tecnológico.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-teal-100/50 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center text-teal-700">
                <Sparkles size={24} />
              </div>
              <h3 className="text-lg font-bold text-teal-950">Estética personalizada</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Diseñamos sonrisas únicas que complementan tu fisionomía y elevan tu autoestima de forma totalmente natural.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-teal-100/50 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center text-teal-700">
                <ShieldCheck size={24} />
              </div>
              <h3 className="text-lg font-bold text-teal-950">Garantía de bioseguridad</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Cumplimos con estrictas normas internacionales de bioseguridad, desinfección y esterilización de última gama.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-teal-100/50 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center text-teal-700">
                <Heart size={24} />
              </div>
              <h3 className="text-lg font-bold text-teal-950">Procedimientos sin dolor</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Nuestras técnicas de anestesia y relajación asisten a pacientes ansiosos para lograr una cita relajante y grata.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 1. Paso a Paso Section: Tu Camino a una Sonrisa Saludable */}
      <section className="py-20 bg-white border-t border-teal-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="px-3 py-1 bg-teal-50 text-teal-800 rounded-full text-xs font-semibold uppercase tracking-wider">
              Tu experiencia con nosotros
            </span>
            <h2 className="text-3xl font-bold text-teal-950 tracking-tight mt-3">
              Tu camino hacia una sonrisa saludable
            </h2>
            <p className="text-gray-500 mt-3">
              Diseñamos un proceso fluido y transparente para tu tranquilidad, desde el primer contacto hasta el alta clínica.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Connection Line (Desktop only) */}
            <div className="hidden md:block absolute top-16 left-[10%] right-[10%] h-[2px] bg-teal-100/30 -z-10" />

            {/* Step 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center text-center space-y-4 group"
            >
              <div className="w-16 h-16 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-900 font-bold text-xl shadow-sm group-hover:bg-teal-950 group-hover:text-white transition-colors duration-300">
                01
              </div>
              <h3 className="text-lg font-bold text-teal-950">Reserva de cita</h3>
              <p className="text-xs text-gray-500 leading-relaxed max-w-[200px]">
                Agenda tu cita online o por teléfono de forma rápida en tu horario preferido.
              </p>
            </motion.div>

            {/* Step 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-col items-center text-center space-y-4 group"
            >
              <div className="w-16 h-16 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-900 font-bold text-xl shadow-sm group-hover:bg-teal-950 group-hover:text-white transition-colors duration-300">
                02
              </div>
              <h3 className="text-lg font-bold text-teal-950">Evaluación integral</h3>
              <p className="text-xs text-gray-500 leading-relaxed max-w-[200px]">
                Nuestros especialistas realizan un diagnóstico minucioso y sin dolor en la primera visita.
              </p>
            </motion.div>

            {/* Step 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col items-center text-center space-y-4 group"
            >
              <div className="w-16 h-16 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-900 font-bold text-xl shadow-sm group-hover:bg-teal-950 group-hover:text-white transition-colors duration-300">
                03
              </div>
              <h3 className="text-lg font-bold text-teal-950">Tratamiento experto</h3>
              <p className="text-xs text-gray-500 leading-relaxed max-w-[200px]">
                Aplicamos tecnología avanzada y técnicas indoloras para solucionar tu caso clínico.
              </p>
            </motion.div>

            {/* Step 4 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col items-center text-center space-y-4 group"
            >
              <div className="w-16 h-16 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-900 font-bold text-xl shadow-sm group-hover:bg-teal-950 group-hover:text-white transition-colors duration-300">
                04
              </div>
              <h3 className="text-lg font-bold text-teal-950">Sonrisa radiante</h3>
              <p className="text-xs text-gray-500 leading-relaxed max-w-[200px]">
                ¡Listo! Disfruta de una dentadura fuerte, estética y un plan de prevención a largo plazo.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. Tecnología Section: Equipamiento Clínico Moderno */}
      <section className="py-20 bg-stone-50 border-t border-stone-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Column: Beautiful Imagery / Badges Grid */}
            <div className="space-y-6">
              <span className="px-3 py-1 bg-amber-50 text-amber-800 border border-amber-100 rounded-full text-xs font-semibold uppercase tracking-wider">
                Infraestructura Médica
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-teal-950 tracking-tight leading-tight">
                Inversión continua en tecnología dental avanzada
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Creemos que la precisión médica va de la mano con el confort. Por eso, equipamos nuestra clínica con dispositivos digitales certificados internacionalmente para ofrecerte un servicio de primer nivel, menos invasivo y más rápido.
              </p>
              
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="p-4 rounded-xl bg-white border border-stone-200/50 shadow-sm">
                  <div className="text-2xl font-black text-teal-900">100%</div>
                  <div className="text-xs text-gray-500 mt-1">Diagnóstico Digital</div>
                </div>
                <div className="p-4 rounded-xl bg-white border border-stone-200/50 shadow-sm">
                  <div className="text-2xl font-black text-teal-900">-80%</div>
                  <div className="text-xs text-gray-500 mt-1">Radiación de Rayos-X</div>
                </div>
              </div>
            </div>

            {/* Right Column: Technology list of cards */}
            <div className="space-y-6">
              {/* Tech item 1 */}
              <div className="flex gap-4 p-5 bg-white rounded-2xl border border-stone-200/60 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 shrink-0 rounded-xl bg-teal-50 flex items-center justify-center text-teal-850">
                  <Monitor size={22} />
                </div>
                <div>
                  <h4 className="text-base font-bold text-teal-950">Escáner Intraoral 3D</h4>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                    Modelamos tu boca digitalmente en 3 dimensiones en pocos segundos, evitando las molestas pastas tradicionales de molde de yeso.
                  </p>
                </div>
              </div>

              {/* Tech item 2 */}
              <div className="flex gap-4 p-5 bg-white rounded-2xl border border-stone-200/60 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 shrink-0 rounded-xl bg-teal-50 flex items-center justify-center text-teal-850">
                  <ShieldCheck size={22} />
                </div>
                <div>
                  <h4 className="text-base font-bold text-teal-950">Cámara Intraoral de Alta Definición</h4>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                    Te mostramos en pantalla gigante el estado exacto de cada una de tus piezas para una total transparencia médica.
                  </p>
                </div>
              </div>

              {/* Tech item 3 */}
              <div className="flex gap-4 p-5 bg-white rounded-2xl border border-stone-200/60 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 shrink-0 rounded-xl bg-teal-50 flex items-center justify-center text-teal-850">
                  <Award size={22} />
                </div>
                <div>
                  <h4 className="text-base font-bold text-teal-950">Sillones Ergonómicos de Confort</h4>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                    Disfruta de tu tratamiento en sillones equipados con espuma de memoria y sistemas integrados de sedación para reducir el estrés.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Call to action panel */}
      <section className="py-20 max-w-5xl mx-auto px-4 text-center">
        <div className="bg-gradient-to-tr from-teal-950 to-teal-900 rounded-3xl p-10 sm:p-16 text-white shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" />
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">¿Listo para transformar tu sonrisa?</h2>
          <p className="text-teal-100 text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed">
            Agenda tu valoración hoy mismo. Conecta tu cuenta de Google para agendar directamente en tu calendario y recibir notificaciones.
          </p>
          <button
            onClick={() => setCurrentTab('tu-cita')}
            className="px-8 py-3.5 bg-white text-teal-950 font-bold rounded-full hover:bg-teal-50 transition-colors shadow-md cursor-pointer inline-flex items-center gap-2"
          >
            Separar mi cita ahora
            <ArrowRight size={16} />
          </button>
        </div>
      </section>
    </div>
  );
}
