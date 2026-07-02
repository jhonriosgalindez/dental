import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Clock, ChevronRight, ChevronLeft, User, Mail, Phone, FileText, CheckCircle2, Sparkles, Loader2, AlertCircle } from 'lucide-react';
import { User as FirebaseUser } from 'firebase/auth';
import { DentalService, Dentist, Appointment } from '../types';

interface AppointmentBookerProps {
  user: FirebaseUser | null;
  accessToken: string | null;
  onLogin: () => void;
  services: DentalService[];
  dentists: Dentist[];
  selectedServiceId: string;
  onBookingSuccess: (info?: {
    serviceName?: string;
    dentistName?: string;
    date?: string;
    time?: string;
  }) => void;
}

const TIME_SLOTS = [
  '08:00', '09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00'
];

export default function AppointmentBooker({
  user,
  accessToken,
  onLogin,
  services,
  dentists,
  selectedServiceId,
  onBookingSuccess
}: AppointmentBookerProps) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Selection states
  const [selService, setSelService] = useState<string>(selectedServiceId || '');
  const [selDentist, setSelDentist] = useState<string>('');
  const [selDate, setSelDate] = useState<string>('');
  const [selTime, setSelTime] = useState<string>('');
  
  // Patient details state
  const [patientName, setPatientName] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientNotes, setPatientNotes] = useState('');

  // Existing booked appointments (to prevent double bookings)
  const [existingBookings, setExistingBookings] = useState<Appointment[]>([]);

  // Auto-populate patient details if user logged in
  useEffect(() => {
    if (user) {
      setPatientName(user.displayName || '');
      setPatientEmail(user.email || '');
    }
  }, [user]);

  // Set initial service if passed down
  useEffect(() => {
    if (selectedServiceId) {
      setSelService(selectedServiceId);
    }
  }, [selectedServiceId]);

  // Load existing bookings from backend
  const fetchBookings = async () => {
    try {
      const res = await fetch('/api/appointments');
      if (res.ok) {
        const data = await res.json();
        setExistingBookings(data);
      }
    } catch (err) {
      console.error('Error fetching bookings:', err);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [step]);

  // Determine if a specific slot is booked/unavailable
  const isSlotBooked = (date: string, dentistId: string, time: string) => {
    return existingBookings.some(
      (apt) => apt.date === date && 
               apt.dentistId === dentistId && 
               apt.timeSlot === time && 
               apt.status !== 'cancelled'
    );
  };

  const currentService = services.find(s => s.id === selService);
  const currentDentist = dentists.find(d => d.id === selDentist);

  // Validate current step
  const canGoNext = () => {
    if (step === 1) return !!selService;
    if (step === 2) return !!selDentist;
    if (step === 3) return !!selDate && !!selTime;
    if (step === 4) return !!patientName && !!patientEmail && !!patientPhone;
    return true;
  };

  const handleNext = () => {
    if (canGoNext()) {
      setStep(prev => prev + 1);
      setErrorMsg(null);
    }
  };

  const handlePrev = () => {
    setStep(prev => Math.max(1, prev - 1));
    setErrorMsg(null);
  };

  // Create Google Calendar Event
  const createGoogleCalendarEvent = async () => {
    if (!accessToken || !currentService || !currentDentist) return null;

    // Build event date times
    // Date: YYYY-MM-DD, Time: HH:MM
    const startDateTime = `${selDate}T${selTime}:00`;
    
    // Add duration (default 45 min)
    const [hours, minutes] = selTime.split(':').map(Number);
    let endMinutes = minutes + 45;
    let endHours = hours;
    if (endMinutes >= 60) {
      endHours += Math.floor(endMinutes / 60);
      endMinutes = endMinutes % 60;
    }
    const endHourStr = String(endHours).padStart(2, '0');
    const endMinStr = String(endMinutes).padStart(2, '0');
    const endDateTime = `${selDate}T${endHourStr}:${endMinStr}:00`;

    // Try to detect browser's timezone offset
    // Format: "2026-07-02T09:00:00-05:00"
    // For AI Studio demo, let's use standard Local Timezone offset
    const offsetMinutes = new Date().getTimezoneOffset();
    const absOffset = Math.abs(offsetMinutes);
    const offsetHoursStr = String(Math.floor(absOffset / 60)).padStart(2, '0');
    const offsetMinStr = String(absOffset % 60).padStart(2, '0');
    const offsetSign = offsetMinutes <= 0 ? '+' : '-';
    const timezoneOffset = `${offsetSign}${offsetHoursStr}:${offsetMinStr}`;

    const startISO = `${startDateTime}${timezoneOffset}`;
    const endISO = `${endDateTime}${timezoneOffset}`;

    const eventPayload = {
      summary: `Cita Dental: ${currentService.name} - ${patientName}`,
      description: `Cita de odontología programada con el ${currentDentist.name}.\nProcedimiento: ${currentService.name}\nPaciente: ${patientName}\nTeléfono: ${patientPhone}\nNotas: ${patientNotes || 'Ninguna'}`,
      start: {
        dateTime: startISO,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
      },
      end: {
        dateTime: endISO,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
      },
      attendees: [
        { email: patientEmail, responseStatus: 'accepted' }
      ],
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 },
          { method: 'popup', minutes: 60 }
        ]
      }
    };

    try {
      const response = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(eventPayload)
      });

      if (!response.ok) {
        const errorJson = await response.json();
        console.error('Google Calendar Error:', errorJson);
        throw new Error(errorJson.error?.message || 'Error al conectar con Google Calendar.');
      }

      const eventData = await response.json();
      return eventData.id as string;
    } catch (err: any) {
      console.error('Failed to create event in Google Calendar:', err);
      throw err;
    }
  };

  const handleConfirmBooking = async () => {
    if (!canGoNext()) return;
    setLoading(true);
    setErrorMsg(null);

    let googleEventId = '';

    try {
      // 1. Write event directly to Google Calendar using the token (User Consent assumed because of OAuth Login)
      if (accessToken) {
        try {
          const gId = await createGoogleCalendarEvent();
          if (gId) googleEventId = gId;
        } catch (calendarErr: any) {
          console.warn('Google Calendar creation failed but continuing to save locally:', calendarErr);
          // We can optionally block, or show error. Let's warn but proceed with local DB saving if requested,
          // or throw. Let's throw a clean message if they have a token but it fails.
          setErrorMsg(`Error de Google Calendar: ${calendarErr.message}. Continuando con reserva local...`);
        }
      }

      // 2. Submit booking to full-stack Express Backend (which registers DB record and triggers automatic emails)
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          patientName,
          patientEmail,
          patientPhone,
          serviceId: selService,
          dentistId: selDentist,
          date: selDate,
          timeSlot: selTime,
          notes: patientNotes,
          googleEventId
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'No se pudo guardar la cita en el servidor.');
      }

      // Success
      setStep(5);
      if (onBookingSuccess) {
        onBookingSuccess({
          serviceName: currentService?.name,
          dentistName: currentDentist?.name,
          date: selDate,
          time: selTime
        });
      }
    } catch (err: any) {
      console.error('Booking failed:', err);
      setErrorMsg(err.message || 'Ocurrió un error inesperado al agendar tu cita.');
    } finally {
      setLoading(false);
    }
  };

  // Reset booking form
  const handleResetForm = () => {
    setStep(1);
    setSelService('');
    setSelDentist('');
    setSelDate('');
    setSelTime('');
    setPatientNotes('');
    setErrorMsg(null);
  };

  // If user is not authenticated, show premium consent panel
  if (!user) {
    return (
      <div className="bg-white min-h-screen py-16 px-4 flex items-center justify-center font-sans">
        <div className="max-w-md w-full bg-stone-50 border border-stone-200/60 p-8 rounded-3xl shadow-sm text-center space-y-6">
          <div className="mx-auto w-16 h-16 rounded-full bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600">
            <CalendarIcon size={30} />
          </div>
          
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-teal-950">Agenda en línea</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Para garantizar que tu cita se guarde en tu calendario de Google y recibas recordatorios automáticos por correo, por favor inicia sesión primero.
            </p>
          </div>

          <div className="bg-white p-4.5 rounded-2xl border border-stone-100 text-left space-y-2 text-xs text-stone-600">
            <p className="font-semibold text-teal-950">¿Qué incluye la integración?</p>
            <ul className="list-disc pl-4 space-y-1">
              <li>Guardado automático en tu Google Calendar.</li>
              <li>Correo de confirmación con detalles y recomendaciones.</li>
              <li>Notificación directa al Odontólogo asignado.</li>
              <li>Panel para autogestionar o cancelar la cita.</li>
            </ul>
          </div>

          <button
            onClick={onLogin}
            className="w-full py-3.5 bg-teal-950 hover:bg-teal-900 text-white font-bold rounded-full shadow-md transition-all cursor-pointer inline-flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24">
              <path fill="currentColor" d="M21.35 11.1H12v2.7h5.3c-.2 1.2-.9 2.1-2 2.8v2.3h3.2c1.9-1.8 3-4.4 3-7.8c0-.3 0-.7-.1-1z" />
              <path fill="currentColor" d="M12 21c2.4 0 4.5-.8 6-2.2l-3.2-2.3c-.9.6-2 .9-2.8.9c-2.2 0-4-1.5-4.7-3.6H4v2.4C5.5 19.2 8.5 21 12 21z" />
              <path fill="currentColor" d="M7.3 13.8c-.2-.6-.3-1.2-.3-1.8s.1-1.2.3-1.8V7.8H4v2.4c-.6 1.3-1 2.8-1 4.3s.4 3 1 4.3l3.3-2.4z" />
              <path fill="currentColor" d="M12 6.8c1.3 0 2.5.5 3.4 1.3l2.5-2.5C16.3 4.2 14.3 3.5 12 3.5c-3.5 0-6.5 1.8-8 4.7l3.3 2.4c.7-2.1 2.5-3.8 4.7-3.8z" />
            </svg>
            Acceder con Google
          </button>
        </div>
      </div>
    );
  }

  // Get next 7 available dates (excluding Sundays)
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 1; i <= 10; i++) {
      const nextDate = new Date(today);
      nextDate.setDate(today.getDate() + i);
      
      // Exclude Sunday (0)
      if (nextDate.getDay() !== 0) {
        const year = nextDate.getFullYear();
        const month = String(nextDate.getMonth() + 1).padStart(2, '0');
        const day = String(nextDate.getDate()).padStart(2, '0');
        
        const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
        const dayName = daysOfWeek[nextDate.getDay()];
        
        dates.push({
          formatted: `${year}-${month}-${day}`,
          display: `${dayName} ${nextDate.getDate()}/${month}`,
          dayOfWeek: nextDate.getDay()
        });
      }
    }
    return dates;
  };

  const datesList = getAvailableDates();

  return (
    <div className="bg-white min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto font-sans">
      
      {/* Progress bar */}
      <div className="mb-12">
        <div className="flex justify-between text-xs text-teal-900 font-bold uppercase tracking-wider mb-3">
          <span>Paso {step} de 5</span>
          <span>
            {step === 1 && 'Seleccionar tratamiento'}
            {step === 2 && 'Seleccionar odontólogo'}
            {step === 3 && 'Fecha y hora'}
            {step === 4 && 'Datos del paciente'}
            {step === 5 && '¡Cita confirmada!'}
          </span>
        </div>
        <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-teal-600 transition-all duration-300"
            style={{ width: `${(step / 5) * 100}%` }}
          />
        </div>
      </div>

      {errorMsg && (
        <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-sm flex items-start gap-3">
          <AlertCircle size={18} className="shrink-0 mt-0.5" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* STEP 1: Select Service */}
      {step === 1 && (
        <div className="space-y-6">
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-teal-950">¿Qué procedimiento deseas realizarte?</h3>
            <p className="text-sm text-gray-500">Selecciona el tratamiento dental de tu preferencia para continuar.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {services.map((service) => (
              <button
                key={service.id}
                onClick={() => setSelService(service.id)}
                className={`p-6 rounded-2xl border text-left transition-all flex justify-between items-center cursor-pointer ${
                  selService === service.id
                    ? 'border-teal-600 bg-teal-50/20 shadow-sm'
                    : 'border-gray-200/60 hover:border-teal-100 bg-white hover:bg-stone-50/30'
                }`}
              >
                <div>
                  <h4 className="font-bold text-teal-950">{service.name}</h4>
                  <p className="text-xs text-gray-500 mt-1">{service.duration} • Valor: {service.price}</p>
                </div>
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                  selService === service.id ? 'border-teal-600 bg-teal-600 text-white' : 'border-gray-300'
                }`}>
                  {selService === service.id && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* STEP 2: Select Dentist */}
      {step === 2 && (
        <div className="space-y-6">
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-teal-950">Elige tu especialista de confianza</h3>
            <p className="text-sm text-gray-500">Nuestros odontólogos certificados están listos para atenderte.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {dentists.map((dentist) => (
              <button
                key={dentist.id}
                onClick={() => setSelDentist(dentist.id)}
                className={`rounded-2xl border overflow-hidden text-left transition-all cursor-pointer bg-white ${
                  selDentist === dentist.id
                    ? 'border-teal-600 ring-2 ring-teal-500/15'
                    : 'border-gray-200/60 hover:border-teal-100 shadow-sm'
                }`}
              >
                <div className="h-44 overflow-hidden relative">
                  <img src={dentist.imageUrl} alt={dentist.name} className="w-full h-full object-cover object-top" referrerPolicy="no-referrer" />
                  <div className="absolute top-2 right-2 px-2.5 py-0.5 bg-teal-950/90 rounded-full text-[9px] text-teal-50 font-bold uppercase tracking-wider">
                    {dentist.specialty.split(' ')[0]}
                  </div>
                </div>
                <div className="p-4 space-y-1">
                  <h4 className="font-bold text-teal-950 text-sm">{dentist.name}</h4>
                  <p className="text-[11px] text-gray-500 leading-tight">{dentist.role}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* STEP 3: Date and Time Selection */}
      {step === 3 && (
        <div className="space-y-8">
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-teal-950">Selecciona el día y la hora de tu preferencia</h3>
            <p className="text-sm text-gray-500">Los bloques ocupados se inhabilitan automáticamente en tiempo real.</p>
          </div>

          {/* Date Picker Grid */}
          <div className="space-y-3">
            <h4 className="font-semibold text-teal-950 text-sm flex items-center gap-2">
              <CalendarIcon size={16} className="text-teal-600" />
              1. Selecciona la fecha
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {datesList.map((dt) => {
                // Ensure dentist is available on this day of week
                const isDentistAvailable = currentDentist?.availableDays.includes(dt.dayOfWeek);
                const isSelected = selDate === dt.formatted;

                return (
                  <button
                    key={dt.formatted}
                    disabled={!isDentistAvailable}
                    onClick={() => {
                      setSelDate(dt.formatted);
                      setSelTime(''); // Reset selected time when date changes
                    }}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                      isSelected
                        ? 'border-teal-600 bg-teal-50/45 text-teal-950 font-semibold'
                        : isDentistAvailable
                          ? 'border-gray-200/60 hover:border-teal-100 hover:bg-stone-50 text-gray-700 bg-white'
                          : 'border-gray-100 bg-gray-50 text-gray-300 cursor-not-allowed text-xs'
                    }`}
                  >
                    <span className="block text-[11px] uppercase tracking-wider opacity-60">
                      {dt.display.split(' ')[0]}
                    </span>
                    <span className="block text-sm font-bold mt-1">
                      {dt.display.split(' ')[1]}
                    </span>
                    {!isDentistAvailable && (
                      <span className="block text-[8px] mt-1 text-red-400 font-medium">No disponible</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Time Picker Grid */}
          {selDate && (
            <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
              <h4 className="font-semibold text-teal-950 text-sm flex items-center gap-2">
                <Clock size={16} className="text-teal-600" />
                2. Selecciona la hora
              </h4>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                {TIME_SLOTS.map((time) => {
                  const isBooked = isSlotBooked(selDate, selDentist, time);
                  const isSelected = selTime === time;

                  return (
                    <button
                      key={time}
                      disabled={isBooked}
                      onClick={() => setSelTime(time)}
                      className={`py-3 px-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                        isSelected
                          ? 'border-teal-600 bg-teal-600 text-white font-bold shadow-sm'
                          : isBooked
                            ? 'border-red-100 bg-red-50/50 text-red-300 cursor-not-allowed line-through text-xs'
                            : 'border-gray-200/60 hover:border-teal-100 hover:bg-stone-50 text-gray-700 bg-white'
                      }`}
                    >
                      <span className="block text-sm">{time}</span>
                      {isBooked && (
                        <span className="block text-[8px] font-semibold text-red-400 mt-0.5">Reservado</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* STEP 4: Patient details */}
      {step === 4 && (
        <div className="space-y-6">
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-teal-950">Completa tus datos de contacto</h3>
            <p className="text-sm text-gray-500">Usaremos esta información para enviarte el correo de confirmación y el evento de Google Calendar.</p>
          </div>

          <div className="bg-stone-50 border border-stone-200/60 p-6 rounded-2xl flex flex-col md:flex-row gap-6 items-center justify-between mb-6">
            <div className="flex items-center gap-4 text-left">
              {user.photoURL ? (
                <img src={user.photoURL} alt={user.displayName || ''} className="w-12 h-12 rounded-full border-2 border-white shadow-sm shrink-0" referrerPolicy="no-referrer" />
              ) : (
                <div className="w-12 h-12 rounded-full bg-teal-600 flex items-center justify-center text-white text-lg font-bold shrink-0">
                  {user.displayName?.[0] || 'P'}
                </div>
              )}
              <div>
                <p className="font-bold text-teal-950 text-base">{user.displayName}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
            </div>
            <div className="px-3.5 py-1.5 bg-emerald-50 rounded-full border border-emerald-100 flex items-center gap-1.5 text-emerald-800 text-[11px] font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Google Calendar conectado
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700 flex items-center gap-1.5 uppercase tracking-wider">
                  <User size={13} className="text-teal-600" />
                  Nombre Completo
                </label>
                <input
                  type="text"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-teal-500 bg-white"
                  placeholder="Ej: Juan Pérez"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700 flex items-center gap-1.5 uppercase tracking-wider">
                  <Phone size={13} className="text-teal-600" />
                  Número de Teléfono
                </label>
                <input
                  type="tel"
                  value={patientPhone}
                  onChange={(e) => setPatientPhone(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-teal-500 bg-white"
                  placeholder="Ej: +57 300 123 4567"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700 flex items-center gap-1.5 uppercase tracking-wider">
                <Mail size={13} className="text-teal-600" />
                Correo Electrónico (Notificaciones)
              </label>
              <input
                type="email"
                value={patientEmail}
                onChange={(e) => setPatientEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-teal-500 bg-white"
                placeholder="Ej: juan.perez@email.com"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700 flex items-center gap-1.5 uppercase tracking-wider">
                <FileText size={13} className="text-teal-600" />
                Notas, Síntomas o Solicitudes (Opcional)
              </label>
              <textarea
                value={patientNotes}
                onChange={(e) => setPatientNotes(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-teal-500 bg-white resize-none"
                placeholder="Ej: Dolor en molar superior izquierdo, encías inflamadas, etc."
              />
            </div>
          </div>
        </div>
      )}

      {/* STEP 5: Success Display */}
      {step === 5 && (
        <div className="text-center py-8 space-y-6 animate-in zoom-in-95 duration-400">
          <div className="mx-auto w-20 h-20 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shadow-sm">
            <CheckCircle2 size={40} />
          </div>

          <div className="space-y-2">
            <h3 className="text-3xl font-black text-teal-950">¡Tu cita ha sido agendada con éxito!</h3>
            <p className="text-gray-500 text-sm max-w-lg mx-auto">
              Hemos registrado tu reserva y guardado el evento directamente en tu Google Calendar. Se han despachado correos automáticos de confirmación tanto para ti como para nuestro administrador.
            </p>
          </div>

          {/* Details recap card */}
          <div className="max-w-md mx-auto bg-stone-50 border border-stone-200/60 p-6 rounded-2xl text-left space-y-3 shadow-sm">
            <h4 className="font-bold text-teal-950 text-sm pb-2 border-b border-stone-200">Resumen del agendamiento</h4>
            <p className="text-xs text-gray-600"><strong className="text-teal-950">Procedimiento:</strong> {currentService?.name}</p>
            <p className="text-xs text-gray-600"><strong className="text-teal-950">Especialista:</strong> {currentDentist?.name}</p>
            <p className="text-xs text-gray-600"><strong className="text-teal-950">Fecha:</strong> {selDate}</p>
            <p className="text-xs text-gray-600"><strong className="text-teal-950">Hora:</strong> {selTime} AM/PM</p>
            <p className="text-xs text-gray-600"><strong className="text-teal-950">Paciente:</strong> {patientName} ({patientPhone})</p>
            {patientNotes && (
              <p className="text-xs text-gray-500 italic mt-2 bg-white p-2.5 rounded border border-stone-100">{patientNotes}</p>
            )}
          </div>

          <div className="pt-4 flex justify-center gap-4">
            <button
              onClick={handleResetForm}
              className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-xl text-sm hover:bg-gray-50 cursor-pointer"
            >
              Agendar otra cita
            </button>
            <button
              onClick={() => onBookingSuccess()}
              className="px-6 py-3 bg-teal-950 text-white font-semibold rounded-xl text-sm hover:bg-teal-900 shadow-md cursor-pointer"
            >
              Volver al inicio
            </button>
          </div>
        </div>
      )}

      {/* Button controls (For Steps 1-4) */}
      {step < 5 && (
        <div className="mt-12 pt-6 border-t border-gray-100 flex justify-between items-center">
          <button
            onClick={handlePrev}
            disabled={step === 1 || loading}
            className={`inline-flex items-center gap-1 px-5 py-3 rounded-xl text-sm font-semibold border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer ${
              (step === 1 || loading) ? 'opacity-30 cursor-not-allowed' : ''
            }`}
          >
            <ChevronLeft size={16} />
            Atrás
          </button>

          {step < 4 ? (
            <button
              onClick={handleNext}
              disabled={!canGoNext() || loading}
              className={`inline-flex items-center gap-1 px-6 py-3.5 rounded-xl text-sm font-bold bg-teal-950 text-white hover:bg-teal-900 transition-colors cursor-pointer shadow-sm ${
                !canGoNext() ? 'opacity-40 cursor-not-allowed' : ''
              }`}
            >
              Siguiente
              <ChevronRight size={16} />
            </button>
          ) : (
            <button
              onClick={handleConfirmBooking}
              disabled={!canGoNext() || loading}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold bg-teal-600 hover:bg-teal-700 text-white transition-all shadow-md cursor-pointer shrink-0"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Agendando cita...
                </>
              ) : (
                <>
                  <Sparkles size={16} />
                  Confirmar y agendar en Google Calendar
                </>
              )}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
