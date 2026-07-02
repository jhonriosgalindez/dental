import React from 'react';
import { Award, ShieldCheck, Heart, Sparkles, Smile, Star } from 'lucide-react';
import { motion } from 'motion/react';
import { Dentist } from '../types';

interface AboutUsProps {
  dentists: Dentist[];
}

export default function AboutUs({ dentists }: AboutUsProps) {
  return (
    <div className="bg-white min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-sans">
      
      {/* Introduction / Hero layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <span className="px-3 py-1 bg-teal-50 text-teal-800 text-xs font-semibold rounded-full border border-teal-100 uppercase tracking-wider">
            Nuestra historia y compromiso
          </span>
          <h2 className="text-4xl font-extrabold text-teal-950 tracking-tight leading-tight">
            Ofreciendo cuidado dental de calidad superior desde hace más de 12 años
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed">
            Fundada en 2014, nuestra clínica nació con la misión de redefinir la experiencia dental. Creemos que la salud oral no tiene por qué ser intimidante. Por ello, diseñamos un espacio relajante y acogedor, combinando tecnología médica de última generación con profesionales altamente empáticos.
          </p>
          <p className="text-gray-500 text-sm leading-relaxed">
            Nuestros especialistas asisten a constantes seminarios mundiales para garantizar que recibas los tratamientos estéticos, quirúrgicos y preventivos más seguros y modernos del mercado.
          </p>

          <div className="grid grid-cols-2 gap-6 pt-4 border-t border-gray-100">
            <div>
              <p className="text-3xl font-black text-teal-700">12K+</p>
              <p className="text-xs font-bold text-gray-700 uppercase tracking-wider mt-1">Sonrisas diseñadas</p>
            </div>
            <div>
              <p className="text-3xl font-black text-teal-700">99.8%</p>
              <p className="text-xs font-bold text-gray-700 uppercase tracking-wider mt-1">Satisfacción paciente</p>
            </div>
          </div>
        </motion.div>

        {/* Story Illustration Image */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl overflow-hidden shadow-lg h-[450px]"
        >
          <img
            src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=600"
            alt="Clínica dental equipamiento moderno"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-teal-950/20 to-transparent" />
        </motion.div>
      </div>

      {/* Values section */}
      <div className="bg-teal-50/20 rounded-3xl border border-teal-50 p-8 sm:p-12 mb-24">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h3 className="text-2xl font-bold text-teal-950">Nuestros valores fundamentales</h3>
          <p className="text-sm text-gray-500 mt-2">La base de nuestra excelencia médica radica en el respeto por tu bienestar.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center space-y-3">
            <div className="mx-auto w-10 h-10 rounded-full bg-white border border-teal-100 flex items-center justify-center text-teal-600">
              <Heart size={18} />
            </div>
            <h4 className="font-bold text-teal-950">Empatía humanizada</h4>
            <p className="text-xs text-gray-500 leading-relaxed px-4">
              Comprendemos tus temores y nos tomamos el tiempo de explicar cada paso para tu completa tranquilidad mental.
            </p>
          </div>

          <div className="text-center space-y-3">
            <div className="mx-auto w-10 h-10 rounded-full bg-white border border-teal-100 flex items-center justify-center text-teal-600">
              <Award size={18} />
            </div>
            <h4 className="font-bold text-teal-950">Excelencia científica</h4>
            <p className="text-xs text-gray-500 leading-relaxed px-4">
              Cada odontólogo en nuestro staff cuenta con especializaciones universitarias vigentes de primer nivel.
            </p>
          </div>

          <div className="text-center space-y-3">
            <div className="mx-auto w-10 h-10 rounded-full bg-white border border-teal-100 flex items-center justify-center text-teal-600">
              <ShieldCheck size={18} />
            </div>
            <h4 className="font-bold text-teal-950">Ética y transparencia</h4>
            <p className="text-xs text-gray-500 leading-relaxed px-4">
              Solo te recomendaremos los procedimientos clínicos necesarios para tu salud, sin sobrecostos ocultos ni falsas promesas.
            </p>
          </div>
        </div>
      </div>

      {/* Meet our Team */}
      <div className="space-y-12">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-600">Staff odontológico</span>
          <h3 className="text-3xl font-extrabold text-teal-950 tracking-tight mt-1">Conoce a tus especialistas</h3>
          <p className="text-gray-500 text-sm mt-3">Un equipo interdisciplinario que une talentos para darte la sonrisa que siempre deseaste.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {dentists.map((dentist, index) => (
            <motion.div
              key={dentist.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-stone-50 rounded-2xl overflow-hidden border border-stone-100 group hover:border-teal-100 transition-colors"
            >
              <div className="h-72 overflow-hidden relative">
                <img
                  src={dentist.imageUrl}
                  alt={dentist.name}
                  className="w-full h-full object-cover object-top group-hover:scale-103 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-3 left-3 bg-teal-950/85 backdrop-blur-md px-3 py-1 rounded-full text-[10px] text-teal-100 font-semibold tracking-wider uppercase">
                  {dentist.specialty}
                </div>
              </div>
              <div className="p-6 text-center space-y-1.5">
                <h4 className="font-bold text-lg text-teal-950">{dentist.name}</h4>
                <p className="text-xs text-gray-500 font-medium">{dentist.role}</p>
                <div className="flex justify-center text-amber-500 gap-0.5 pt-1.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
