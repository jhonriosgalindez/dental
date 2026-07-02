import React from 'react';
import { Mail, Phone, MapPin, Sparkles, Clock } from 'lucide-react';

interface FooterProps {
  setCurrentTab: (tab: string) => void;
}

export default function Footer({ setCurrentTab }: FooterProps) {
  return (
    <footer className="bg-gray-950 text-gray-400 py-16 border-t border-gray-900 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <span 
              onClick={() => setCurrentTab('inicio')}
              className="text-2xl font-bold tracking-tight text-white cursor-pointer flex items-center gap-2"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-teal-500 to-emerald-400 flex items-center justify-center text-white font-black text-sm">
                D
              </div>
              Dental
            </span>
            <p className="text-sm text-gray-400 leading-relaxed">
              Creando sonrisas saludables y estéticas con tratamientos personalizados de última tecnología. Tu salud bucal es nuestra prioridad.
            </p>
            <div className="flex space-x-4 pt-2">
              {['facebook', 'instagram', 'twitter', 'linkedin'].map((social) => (
                <a
                  key={social}
                  href={`#${social}`}
                  className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center hover:bg-teal-600 hover:text-white transition-colors duration-200"
                >
                  <span className="sr-only">{social}</span>
                  <span className="text-xs font-bold uppercase">{social[0]}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Navegación</h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { id: 'inicio', label: 'Inicio' },
                { id: 'servicios', label: 'Servicios' },
                { id: 'sobre-nosotros', label: 'Sobre nosotros' },
                { id: 'tu-cita', label: 'Tu cita' },
                { id: 'contacto', label: 'Contacto' }
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => setCurrentTab(link.id)}
                    className="hover:text-teal-400 transition-colors duration-200 text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
              <li className="pt-2 border-t border-gray-900/60 mt-2">
                <button
                  onClick={() => setCurrentTab('admin')}
                  className="text-gray-500 hover:text-teal-400 font-medium transition-colors duration-200 text-left text-xs flex items-center gap-1"
                >
                  Administrador
                </button>
              </li>
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Contacto</h3>
            <ul className="space-y-3.5 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="text-teal-500 shrink-0 mt-0.5" size={16} />
                <span>Calle 100 #15-30, Oficina 402<br />Bogotá, Colombia</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-teal-500 shrink-0" size={16} />
                <span>+57 (300) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-teal-500 shrink-0" size={16} />
                <span>contacto@clinicadental.com</span>
              </li>
            </ul>
          </div>

          {/* Working hours */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Horarios</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <Clock className="text-teal-500 shrink-0 mt-0.5" size={16} />
                <div>
                  <p className="font-semibold text-gray-200">Lunes a Viernes</p>
                  <p className="text-xs text-gray-400">8:00 AM - 7:00 PM</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="text-teal-500 shrink-0 mt-0.5" size={16} />
                <div>
                  <p className="font-semibold text-gray-200">Sábados</p>
                  <p className="text-xs text-gray-400">9:00 AM - 2:00 PM</p>
                </div>
              </li>

            </ul>
          </div>
        </div>

        <div className="border-t border-gray-900 mt-12 pt-8 text-center text-xs text-gray-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 Clínica Dental. Todos los derechos reservados.</p>
          <p className="flex items-center gap-1">
            Diseñado con precisión minimalista y tecnología full stack • Google Calendar Sync
          </p>
        </div>
      </div>
    </footer>
  );
}
