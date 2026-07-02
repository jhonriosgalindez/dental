import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import Services from './components/Services';
import AboutUs from './components/AboutUs';
import AppointmentBooker from './components/AppointmentBooker';
import Contact from './components/Contact';
import AdminPanel from './components/AdminPanel';
import { DentalService, Dentist } from './types';
import { FALLBACK_SERVICES, FALLBACK_DENTISTS } from './data';
import { initAuth, googleSignIn, logout } from './lib/firebase';
import { User as FirebaseUser } from 'firebase/auth';
import { motion } from 'motion/react';
import { CheckCircle2, Calendar, Clock, X, Sparkles } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('inicio');
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [lastBookingInfo, setLastBookingInfo] = useState<{
    serviceName?: string;
    dentistName?: string;
    date?: string;
    time?: string;
  } | null>(null);

  // Lists loaded from backend API with local robust fallbacks
  const [services, setServices] = useState<DentalService[]>(FALLBACK_SERVICES);
  const [dentists, setDentists] = useState<Dentist[]>(FALLBACK_DENTISTS);

  // Selection states for booking redirections
  const [selectedServiceId, setSelectedServiceId] = useState<string>('');

  // Fetch lists from backend
  useEffect(() => {
    const fetchApiData = async () => {
      try {
        const [resServices, resDentists] = await Promise.all([
          fetch('/api/services'),
          fetch('/api/dentists')
        ]);
        
        if (resServices.ok) {
          const data = await resServices.ok ? await resServices.json() : [];
          setServices(data);
        }
        if (resDentists.ok) {
          const data = await resDentists.ok ? await resDentists.json() : [];
          setDentists(data);
        }
      } catch (error) {
        console.error('Error fetching API data from express server:', error);
      }
    };
    fetchApiData();
  }, []);

  // Initialize auth listener
  useEffect(() => {
    initAuth(
      (currentUser, token) => {
        setUser(currentUser);
        setAccessToken(token);
      },
      () => {
        setUser(null);
        setAccessToken(null);
      }
    );
  }, []);

  const handleLogin = async () => {
    setIsLoggingIn(true);
    try {
      const result = await googleSignIn();
      if (result) {
        setUser(result.user);
        setAccessToken(result.accessToken);
      }
    } catch (err) {
      console.error('Google authorization failed:', err);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      setAccessToken(null);
      setCurrentTab('inicio');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  // Redirect from Services page to Appointment Booker with pre-selected service
  const handleSelectServiceFromServices = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    setCurrentTab('tu-cita');
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header Navigation */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={(tab) => {
          setCurrentTab(tab);
          // Reset pre-selected service when navigating away
          if (tab !== 'tu-cita') {
            setSelectedServiceId('');
          }
        }}
        user={user}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />

      {/* Main Page Layout Container */}
      <main className="flex-grow">
        {currentTab === 'inicio' && (
          <Home setCurrentTab={setCurrentTab} />
        )}
        
        {currentTab === 'servicios' && (
          <Services 
            services={services} 
            onSelectService={handleSelectServiceFromServices} 
          />
        )}
        
        {currentTab === 'sobre-nosotros' && (
          <AboutUs dentists={dentists} />
        )}
        
        {currentTab === 'tu-cita' && (
          <AppointmentBooker
            user={user}
            accessToken={accessToken}
            onLogin={handleLogin}
            services={services}
            dentists={dentists}
            selectedServiceId={selectedServiceId}
            onBookingSuccess={(info) => {
              if (info) {
                setLastBookingInfo(info);
              }
              setShowSuccessModal(true);
              setCurrentTab('inicio');
            }}
          />
        )}
        
        {currentTab === 'contacto' && (
          <Contact />
        )}

        {currentTab === 'admin' && (
          <AdminPanel />
        )}
      </main>

      {/* Footer Navigation */}
      <Footer setCurrentTab={setCurrentTab} />

      {/* Modal Popup on Successful Booking */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-teal-950/45 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl border border-teal-50 relative text-center space-y-6"
          >
            <button
              onClick={() => setShowSuccessModal(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>

            <div className="mx-auto w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shadow-sm">
              <CheckCircle2 size={32} />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-black text-teal-950 tracking-tight">¡Cita agendada con éxito!</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Tu cita ha sido agendada de forma segura, sincronizada con Google Calendar y hemos enviado un correo de confirmación.
              </p>
            </div>

            {lastBookingInfo && (
              <div className="bg-stone-50 border border-stone-200/55 p-5 rounded-2xl text-left space-y-3 shadow-sm text-sm">
                <h4 className="font-bold text-teal-950 text-xs uppercase tracking-wider pb-1.5 border-b border-stone-200 flex items-center gap-1.5">
                  <Sparkles size={14} className="text-teal-600" />
                  Detalles de tu reserva
                </h4>
                <div className="space-y-2 text-stone-700 text-xs">
                  {lastBookingInfo.serviceName && (
                    <p><strong className="text-teal-950">Procedimiento:</strong> {lastBookingInfo.serviceName}</p>
                  )}
                  {lastBookingInfo.dentistName && (
                    <p><strong className="text-teal-950">Especialista:</strong> {lastBookingInfo.dentistName}</p>
                  )}
                  {lastBookingInfo.date && (
                    <p className="flex items-center gap-1.5"><Calendar size={13} className="text-teal-600" /> <strong className="text-teal-950">Fecha:</strong> {lastBookingInfo.date}</p>
                  )}
                  {lastBookingInfo.time && (() => {
                    const parts = lastBookingInfo.time.split(':');
                    let displayTime = lastBookingInfo.time;
                    if (parts.length >= 2) {
                      const hour = parseInt(parts[0], 10);
                      const minute = parts[1];
                      const ampm = hour >= 12 ? 'PM' : 'AM';
                      const hour12 = hour % 12 === 0 ? 12 : hour % 12;
                      displayTime = `${hour12}:${minute} ${ampm}`;
                    }
                    return (
                      <p className="flex items-center gap-1.5">
                        <Clock size={13} className="text-teal-600" />
                        <strong className="text-teal-950">Hora:</strong> {displayTime}
                      </p>
                    );
                  })()}
                </div>
              </div>
            )}

            <button
              onClick={() => setShowSuccessModal(false)}
              className="w-full py-3.5 bg-teal-950 hover:bg-teal-900 text-white font-bold rounded-xl text-xs shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              Entendido, gracias
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}
