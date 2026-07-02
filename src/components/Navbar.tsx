import React, { useState } from 'react';
import { Menu, X, Calendar, Activity, ShieldAlert, LogOut, User as UserIcon } from 'lucide-react';
import { User } from 'firebase/auth';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  user: User | null;
  onLogin: () => void;
  onLogout: () => void;
}

export default function Navbar({ currentTab, setCurrentTab, user, onLogin, onLogout }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'servicios', label: 'Servicios' },
    { id: 'sobre-nosotros', label: 'Sobre nosotros' },
    { id: 'tu-cita', label: 'Tu cita' },
    { id: 'contacto', label: 'Contacto' }
  ];

  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-teal-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <span 
              onClick={() => setCurrentTab('inicio')}
              className="text-2xl font-bold tracking-tight text-teal-900 cursor-pointer flex items-center gap-2 font-sans"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-teal-600 to-emerald-400 flex items-center justify-center text-white font-black text-sm shadow-sm">
                D
              </div>
              Dental
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentTab(item.id);
                    setIsOpen(false);
                  }}
                  className={`text-[15px] font-medium transition-colors duration-200 relative py-2 ${
                    isActive 
                      ? 'text-teal-700 font-semibold' 
                      : 'text-gray-600 hover:text-teal-600'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-600 rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-500 hover:text-teal-600 p-2 rounded-lg focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-teal-50 bg-white shadow-lg animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="px-2 pt-3 pb-4 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentTab(item.id);
                  setIsOpen(false);
                }}
                className={`w-full text-left block px-4 py-3 rounded-xl text-base font-medium transition-all ${
                  currentTab === item.id
                    ? 'bg-teal-50 text-teal-800 font-semibold'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-teal-700'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
