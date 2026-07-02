import React, { useState, useEffect } from 'react';
import { Calendar, RefreshCw, Trash2, CheckCircle, Clock, ShieldCheck, XCircle, Search, ExternalLink, CalendarDays } from 'lucide-react';
import { Appointment } from '../types';

export default function AdminPanel() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Administrator login credentials states
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === '123') {
      setIsAuthorized(true);
      setLoginError('');
    } else {
      setLoginError('Credenciales incorrectas, intente nuevamente');
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const resApt = await fetch('/api/appointments');
      
      if (resApt.ok) {
        const apts = await resApt.json();
        // Sort appointments by date & time descending (latest first)
        setAppointments(apts.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
      }
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleStatusChange = async (id: string, status: 'confirmed' | 'cancelled') => {
    try {
      const res = await fetch(`/api/appointments/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });

      if (res.ok) {
        fetchData();
      }
    } catch (err) {
      console.error('Error changing status:', err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/appointments/${id}`, {
        method: 'DELETE'
      });

      if (res.ok) {
        setDeleteConfirmId(null);
        fetchData();
      }
    } catch (err) {
      console.error('Error deleting appointment:', err);
    }
  };

  const filteredAppointments = appointments.filter((apt) =>
    apt.status === 'confirmed' && (
      apt.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.patientEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.serviceName.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  if (!isAuthorized) {
    return (
      <div className="bg-stone-50 min-h-[80vh] py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center font-sans">
        <div className="max-w-md w-full bg-white rounded-3xl border border-stone-200/60 p-8 sm:p-10 shadow-sm space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-teal-50 flex items-center justify-center text-teal-600 mx-auto border border-teal-100">
              <ShieldCheck size={24} />
            </div>
            <h2 className="text-2xl font-extrabold text-teal-950 tracking-tight">Consola de administración</h2>
            <p className="text-xs text-gray-400">Acceso restringido únicamente para personal autorizado</p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            {loginError && (
              <div className="p-3.5 bg-red-50 border border-red-100 text-red-700 text-xs font-semibold rounded-xl text-center">
                {loginError}
              </div>
            )}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Usuario</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-teal-500 bg-white"
                placeholder="Ej: admin"
                required
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-teal-500 bg-white"
                placeholder="Ej: ••••••"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-teal-950 hover:bg-teal-900 text-white font-bold rounded-xl text-xs shadow hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              Iniciar sesión
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-stone-50/45 min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Block */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-stone-200/50 shadow-sm">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-600 animate-pulse" />
              <h2 className="text-2xl font-black text-teal-950 tracking-tight">Consola de operaciones dentales</h2>
            </div>
            <p className="text-xs text-gray-500">Supervisa en tiempo real las citas agendadas, integraciones con Google Calendar y notificaciones por correo.</p>
          </div>


        </div>

        {/* Searching field */}
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar cita por paciente o procedimiento..."
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-teal-500 bg-white"
          />
          <Search className="absolute left-3.5 top-3.5 text-gray-400" size={16} />
        </div>

        {/* Appointments List */}
        <div className="bg-white rounded-3xl border border-stone-200/50 shadow-sm overflow-hidden">
          {filteredAppointments.length === 0 ? (
            <div className="py-16 text-center text-gray-400 space-y-2">
              <CalendarDays size={40} className="mx-auto opacity-40 text-stone-300" />
              <p className="text-sm font-semibold">No se encontraron agendamientos registrados.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-stone-50 border-b border-stone-100 text-xs font-bold text-teal-900 uppercase tracking-wider">
                    <th className="py-4.5 px-6">Paciente</th>
                    <th className="py-4.5 px-6">Tratamiento</th>
                    <th className="py-4.5 px-6">Especialista</th>
                    <th className="py-4.5 px-6">Fecha y hora</th>
                    <th className="py-4.5 px-6">Google Calendar Sync</th>
                    <th className="py-4.5 px-6">Estado</th>
                    <th className="py-4.5 px-6 text-right">Acción</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 text-xs text-gray-700">
                  {filteredAppointments.map((apt) => (
                    <tr key={apt.id} className="hover:bg-stone-50/50 transition-colors">
                      <td className="py-4.5 px-6 font-semibold text-teal-950">
                        <div>
                          <p className="text-sm">{apt.patientName}</p>
                          <p className="text-[10px] text-gray-400 font-normal">{apt.patientEmail} • {apt.patientPhone}</p>
                        </div>
                      </td>
                      <td className="py-4.5 px-6">{apt.serviceName}</td>
                      <td className="py-4.5 px-6 font-medium text-teal-900">{apt.dentistName}</td>
                      <td className="py-4.5 px-6">
                        <div>
                          <p className="font-semibold">{apt.date}</p>
                          <p className="text-[10px] text-gray-400">{apt.timeSlot} AM/PM</p>
                        </div>
                      </td>
                      <td className="py-4.5 px-6">
                        {apt.googleEventId ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 text-emerald-800 rounded-full border border-emerald-100 font-bold text-[9px] uppercase">
                            <ShieldCheck size={10} /> Sincronizado
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-50 text-amber-700 rounded-full border border-amber-100 font-bold text-[9px] uppercase">
                            Sólo local
                          </span>
                        )}
                      </td>
                      <td className="py-4.5 px-6">
                        {apt.status === 'confirmed' && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-50 text-emerald-800 rounded font-semibold text-[10px]">
                            ● Confirmada
                          </span>
                        )}
                        {apt.status === 'pending' && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-50 text-amber-700 rounded font-semibold text-[10px]">
                            ● Pendiente
                          </span>
                        )}
                        {apt.status === 'cancelled' && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-red-50 text-red-700 rounded font-semibold text-[10px]">
                            ● Cancelada
                          </span>
                        )}
                      </td>
                      <td className="py-4.5 px-6 text-right">
                        <div className="flex justify-end gap-1.5">
                          {deleteConfirmId === apt.id ? (
                            <div className="flex items-center gap-2 bg-red-50 p-1 px-2.5 rounded-xl border border-red-100/60">
                              <span className="text-[10px] text-red-700 font-bold whitespace-nowrap">¿Seguro?</span>
                              <button
                                onClick={() => handleDelete(apt.id)}
                                className="px-2 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg text-[10px] font-bold cursor-pointer transition-all shadow-sm"
                              >
                                Sí, eliminar
                              </button>
                              <button
                                onClick={() => setDeleteConfirmId(null)}
                                className="px-2 py-1 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg text-[10px] font-semibold cursor-pointer transition-all"
                              >
                                No
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setDeleteConfirmId(apt.id)}
                              className="px-2.5 py-1.5 text-red-600 hover:bg-red-50 rounded-xl font-bold hover:text-red-700 transition-colors cursor-pointer flex items-center gap-1.5 border border-red-100"
                            >
                              <Trash2 size={13} /> Eliminar
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
