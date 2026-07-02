import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';

const app = express();
const PORT = 3000;

app.use(express.json());

// File paths for persistence
const isVercel = !!process.env.VERCEL;
const storageDir = isVercel ? '/tmp' : process.cwd();
const APPOINTMENTS_FILE = path.join(storageDir, 'appointments.json');
const NOTIFICATIONS_FILE = path.join(storageDir, 'notifications.json');

// Copy preloaded files to /tmp in serverless environment if they don't exist yet
if (isVercel) {
  const originalAppointments = path.join(process.cwd(), 'appointments.json');
  const originalNotifications = path.join(process.cwd(), 'notifications.json');
  
  try {
    if (!fs.existsSync(APPOINTMENTS_FILE) && fs.existsSync(originalAppointments)) {
      fs.copyFileSync(originalAppointments, APPOINTMENTS_FILE);
    }
  } catch (err) {
    console.error('Error copying appointments.json to /tmp:', err);
  }

  try {
    if (!fs.existsSync(NOTIFICATIONS_FILE) && fs.existsSync(originalNotifications)) {
      fs.copyFileSync(originalNotifications, NOTIFICATIONS_FILE);
    }
  } catch (err) {
    console.error('Error copying notifications.json to /tmp:', err);
  }
}

// Preloaded mock services
const DENTAL_SERVICES = [
  { id: '1', name: 'Limpieza Dental Profunda', description: 'Eliminación de sarro, placa bacteriana y pulido de dientes para una higiene óptima.', price: '$60.000 COP', duration: '45 min', iconName: 'Sparkles' },
  { id: '2', name: 'Ortodoncia Invisible / Tradicional', description: 'Estudio y colocación de brackets o alineadores transparentes para corregir tu sonrisa.', price: '$1.200.000 COP', duration: '60 min', iconName: 'Activity' },
  { id: '3', name: 'Blanqueamiento Dental LED', description: 'Tratamiento estético avanzado para aclarar el tono de tus dientes de forma rápida y segura.', price: '$250.000 COP', duration: '60 min', iconName: 'Smile' },
  { id: '4', name: 'Diseño de Sonrisa', description: 'Carillas estéticas de alta calidad en resina o cerámica para perfeccionar la forma y color.', price: '$2.000.000 COP', duration: '90 min', iconName: 'Crown' },
  { id: '5', name: 'Implantes & Prótesis', description: 'Reemplazo permanente de dientes perdidos con materiales biocompatibles de alta duración.', price: '$1.500.000 COP', duration: '90 min', iconName: 'Shield' },
  { id: '6', name: 'Odontopediatría', description: 'Atención especializada, cariñosa y divertida para el cuidado bucal de los más pequeños.', price: '$50.000 COP', duration: '30 min', iconName: 'Heart' }
];

// Preloaded mock dentists
const DENTISTS = [
  { id: 'd1', name: 'Dr. Alejandro Ruiz', role: 'Implantólogo & Rehabilitador', imageUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300', specialty: 'Implantes y Rehabilitación Oral', availableDays: [1, 2, 3, 4, 5] },
  { id: 'd2', name: 'Dra. Sofía Mendoza', role: 'Ortodoncista Clínica', imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300', specialty: 'Ortodoncia Invisible y Estética', availableDays: [1, 2, 4, 5, 6] },
  { id: 'd3', name: 'Dr. Carlos Estrada', role: 'Odontopediatra Especialista', imageUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=300', specialty: 'Odontología Infantil', availableDays: [2, 3, 5, 6] }
];

// Helper to read JSON database files safely
function readDbFile(filePath: string, defaultContent: any): any {
  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error);
  }
  return defaultContent;
}

// Helper to write JSON database files
function writeDbFile(filePath: string, content: any): boolean {
  try {
    fs.writeFileSync(filePath, JSON.stringify(content, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error(`Error writing ${filePath}:`, error);
    return false;
  }
}

// Ensure files are initialized with realistic items if empty
if (!fs.existsSync(APPOINTMENTS_FILE)) {
  const initialAppointments = [
    {
      id: 'apt-101',
      patientName: 'Juan Sebastián Gómez',
      patientEmail: 'juan.gomez@example.com',
      patientPhone: '+57 312 456 7890',
      serviceId: '1',
      serviceName: 'Limpieza Dental Profunda',
      dentistId: 'd1',
      dentistName: 'Dr. Alejandro Ruiz',
      date: '2026-07-02',
      timeSlot: '09:00',
      notes: 'Paciente con encías sensibles al frío.',
      status: 'confirmed',
      createdAt: new Date().toISOString()
    },
    {
      id: 'apt-102',
      patientName: 'Gabriela Silva Castro',
      patientEmail: 'gaby.silva@example.com',
      patientPhone: '+57 320 987 6543',
      serviceId: '3',
      serviceName: 'Blanqueamiento Dental LED',
      dentistId: 'd2',
      dentistName: 'Dra. Sofía Mendoza',
      date: '2026-07-03',
      timeSlot: '14:30',
      notes: 'Desea aclarar hasta 3 tonos.',
      status: 'pending',
      createdAt: new Date().toISOString()
    }
  ];
  writeDbFile(APPOINTMENTS_FILE, initialAppointments);
}

if (!fs.existsSync(NOTIFICATIONS_FILE)) {
  const initialNotifications = [
    {
      id: 'notif-1',
      recipient: 'juan.gomez@example.com',
      recipientRole: 'client',
      subject: 'Confirmación de tu Cita Dental - Dental Spa',
      htmlBody: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; padding: 24px;">
          <h2 style="color: #134e4a; font-size: 20px; border-bottom: 2px solid #0f766e; padding-bottom: 8px;">¡Tu cita está confirmada!</h2>
          <p>Hola <strong>Juan Sebastián Gómez</strong>,</p>
          <p>Queremos confirmar que tu cita de odontología ha sido agendada con éxito.</p>
          <div style="background-color: #f0fdfa; padding: 16px; border-radius: 6px; margin: 20px 0;">
            <p style="margin: 4px 0;"><strong>Servicio:</strong> Limpieza Dental Profunda</p>
            <p style="margin: 4px 0;"><strong>Odontólogo:</strong> Dr. Alejandro Ruiz</p>
            <p style="margin: 4px 0;"><strong>Fecha:</strong> Jueves, 2 de Julio de 2026</p>
            <p style="margin: 4px 0;"><strong>Hora:</strong> 09:00 AM</p>
          </div>
          <p>Si necesitas reprogramar o cancelar, por favor comunícate con nosotros con al menos 24 horas de anticipación.</p>
          <p style="color: #64748b; font-size: 12px; margin-top: 30px; text-align: center;">Clínica Dental Spa & Estética • Calle 100 #15-30, Bogotá</p>
        </div>
      `,
      sentAt: new Date().toISOString(),
      type: 'booking_confirmation'
    }
  ];
  writeDbFile(NOTIFICATIONS_FILE, initialNotifications);
}

// API Routes

// Get preloaded dentists and services
app.get('/api/services', (req, res) => {
  res.json(DENTAL_SERVICES);
});

app.get('/api/dentists', (req, res) => {
  res.json(DENTISTS);
});

// Get all appointments
app.get('/api/appointments', (req, res) => {
  const appointments = readDbFile(APPOINTMENTS_FILE, []);
  res.json(appointments);
});

// Create a new appointment and schedule email notifications
app.post('/api/appointments', (req, res) => {
  const {
    patientName,
    patientEmail,
    patientPhone,
    serviceId,
    dentistId,
    date,
    timeSlot,
    notes,
    googleEventId
  } = req.body;

  if (!patientName || !patientEmail || !patientPhone || !serviceId || !dentistId || !date || !timeSlot) {
    return res.status(400).json({ error: 'Faltan campos obligatorios para agendar la cita.' });
  }

  const appointments = readDbFile(APPOINTMENTS_FILE, []);
  const services = DENTAL_SERVICES;
  const dentists = DENTISTS;

  const service = services.find(s => s.id === serviceId);
  const dentist = dentists.find(d => d.id === dentistId);

  if (!service || !dentist) {
    return res.status(404).json({ error: 'Servicio o Dentista no encontrado.' });
  }

  // Double booking validation
  const slotConflict = appointments.find(
    (apt: any) => apt.dentistId === dentistId && apt.date === date && apt.timeSlot === timeSlot && apt.status !== 'cancelled'
  );

  if (slotConflict) {
    return res.status(409).json({ error: 'Este horario ya está reservado con el odontólogo seleccionado.' });
  }

  const newApt = {
    id: `apt-${Date.now()}`,
    patientName,
    patientEmail,
    patientPhone,
    serviceId,
    serviceName: service.name,
    dentistId,
    dentistName: dentist.name,
    date,
    timeSlot,
    notes: notes || '',
    googleEventId: googleEventId || '',
    status: 'confirmed', // confirm directly in this friendly dental portal
    createdAt: new Date().toISOString()
  };

  appointments.push(newApt);
  writeDbFile(APPOINTMENTS_FILE, appointments);

  // Trigger automated email notifications
  const notifications = readDbFile(NOTIFICATIONS_FILE, []);

  // 1. Email for the Patient
  const clientNotification = {
    id: `notif-${Date.now()}-client`,
    recipient: patientEmail,
    recipientRole: 'client',
    subject: `Confirmación de tu Cita Dental - ${service.name}`,
    htmlBody: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; padding: 24px; color: #1e293b;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h1 style="color: #0f766e; margin: 0; font-size: 24px;">Dental Spa</h1>
          <p style="color: #64748b; font-size: 14px; margin: 4px 0 0 0;">Tu sonrisa en manos de expertos</p>
        </div>
        <hr style="border: 0; border-top: 1px solid #e2e8f0; margin-bottom: 20px;" />
        <h2 style="color: #0f766e; font-size: 18px; margin-top: 0;">¡Hola ${patientName}!</h2>
        <p>Tu cita odontológica ha sido agendada y confirmada satisfactoriamente en nuestro sistema.</p>
        <div style="background-color: #f0fdfa; border-left: 4px solid #14b8a6; padding: 16px; border-radius: 4px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #0f766e; font-size: 16px;">Detalles de la Cita</h3>
          <p style="margin: 6px 0;"><strong>Procedimiento:</strong> ${service.name}</p>
          <p style="margin: 6px 0;"><strong>Odontólogo:</strong> ${dentist.name}</p>
          <p style="margin: 6px 0;"><strong>Fecha:</strong> ${date}</p>
          <p style="margin: 6px 0;"><strong>Hora:</strong> ${timeSlot}</p>
          ${notes ? `<p style="margin: 6px 0;"><strong>Notas/Síntomas:</strong> ${notes}</p>` : ''}
        </div>
        <p><strong>Recomendaciones para tu cita:</strong></p>
        <ul style="padding-left: 20px; line-height: 1.6;">
          <li>Llega 10 minutos antes de la hora acordada para el registro.</li>
          <li>Si tienes radiografías recientes, por favor tráelas contigo.</li>
          <li>Si necesitas cancelar o reprogramar, avísanos con mínimo 24 horas de anticipación.</li>
        </ul>
        <div style="margin-top: 30px; padding: 15px; background-color: #f8fafc; border-radius: 6px; text-align: center; font-size: 14px;">
          <p style="margin: 0; font-weight: 600;">¿Tienes alguna duda?</p>
          <p style="margin: 4px 0 0 0; color: #64748b;">Llámanos o escríbenos al +57 300 123 4567 • soporte@dentalspa.com</p>
        </div>
      </div>
    `,
    sentAt: new Date().toISOString(),
    type: 'booking_confirmation'
  };

  // 2. Email for the Admin/Dentist
  const adminNotification = {
    id: `notif-${Date.now()}-admin`,
    recipient: 'r.jhonf@gmail.com', // User Email in context
    recipientRole: 'admin',
    subject: `🚨 Nueva Cita Agendada: ${patientName} - ${service.name}`,
    htmlBody: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; padding: 24px; color: #1e293b; border-top: 4px solid #0f766e;">
        <h2 style="color: #0f766e; font-size: 18px; margin-top: 0;">Nueva Cita Recibida</h2>
        <p>Estimado Administrador,</p>
        <p>Se ha registrado una nueva cita en la plataforma en línea. Los detalles se presentan a continuación:</p>
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <tr style="background-color: #f8fafc;">
            <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-weight: bold; width: 35%;">Paciente:</td>
            <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">${patientName}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Correo:</td>
            <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">${patientEmail}</td>
          </tr>
          <tr style="background-color: #f8fafc;">
            <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Teléfono:</td>
            <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">${patientPhone}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Servicio:</td>
            <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">${service.name} (${service.duration})</td>
          </tr>
          <tr style="background-color: #f8fafc;">
            <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Odontólogo:</td>
            <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">${dentist.name}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Fecha:</td>
            <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">${date}</td>
          </tr>
          <tr style="background-color: #f8fafc;">
            <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Hora:</td>
            <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">${timeSlot}</td>
          </tr>
          ${notes ? `
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Notas:</td>
            <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-style: italic;">${notes}</td>
          </tr>` : ''}
        </table>
        <div style="margin-top: 25px; text-align: center;">
          <span style="background-color: #0f766e; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; font-weight: bold; font-size: 14px;">Cita Registrada en Google Calendar</span>
        </div>
      </div>
    `,
    sentAt: new Date().toISOString(),
    type: 'admin_alert'
  };

  notifications.push(clientNotification);
  notifications.push(adminNotification);
  writeDbFile(NOTIFICATIONS_FILE, notifications);

  res.status(201).json({
    message: 'Cita agendada con éxito',
    appointment: newApt,
    notificationsSent: [clientNotification.id, adminNotification.id]
  });
});

// Update appointment status (confirm/cancel)
app.patch('/api/appointments/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status || !['confirmed', 'cancelled', 'pending'].includes(status)) {
    return res.status(400).json({ error: 'Estado inválido.' });
  }

  const appointments = readDbFile(APPOINTMENTS_FILE, []);
  const index = appointments.findIndex((apt: any) => apt.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Cita no encontrada.' });
  }

  appointments[index].status = status;
  writeDbFile(APPOINTMENTS_FILE, appointments);

  // If appointment cancelled, save notification log as well
  if (status === 'cancelled') {
    const notifications = readDbFile(NOTIFICATIONS_FILE, []);
    const cancelNotification = {
      id: `notif-${Date.now()}-cancel`,
      recipient: appointments[index].patientEmail,
      recipientRole: 'client',
      subject: `Cancelación de tu Cita Dental - Dental Spa`,
      htmlBody: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #f1f5f9; border-radius: 8px; padding: 24px; color: #1e293b;">
          <h2 style="color: #ef4444; font-size: 18px; margin-top: 0;">Cita Cancelada</h2>
          <p>Hola <strong>${appointments[index].patientName}</strong>,</p>
          <p>Te confirmamos que tu cita de odontología para el <strong>${appointments[index].date}</strong> a las <strong>${appointments[index].timeSlot}</strong> ha sido cancelada.</p>
          <p>Si deseas reprogramar, por favor visita nuestro portal web para elegir un nuevo horario.</p>
          <p>Sentimos los inconvenientes causados.</p>
          <p style="color: #64748b; font-size: 12px; margin-top: 30px; text-align: center;">Clínica Dental Spa • Teléfono +57 300 123 4567</p>
        </div>
      `,
      sentAt: new Date().toISOString(),
      type: 'booking_confirmation'
    };
    notifications.push(cancelNotification);
    writeDbFile(NOTIFICATIONS_FILE, notifications);
  }

  res.json({ message: 'Estado de cita actualizado', appointment: appointments[index] });
});

// Delete appointment
app.delete('/api/appointments/:id', (req, res) => {
  const { id } = req.params;
  const appointments = readDbFile(APPOINTMENTS_FILE, []);
  const index = appointments.findIndex((apt: any) => apt.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Cita no encontrada.' });
  }

  appointments.splice(index, 1);
  writeDbFile(APPOINTMENTS_FILE, appointments);

  res.json({ message: 'Cita eliminada permanentemente.' });
});

// Get sent notifications (acts as our mail simulator display)
app.get('/api/notifications', (req, res) => {
  const notifications = readDbFile(NOTIFICATIONS_FILE, []);
  res.json(notifications);
});

// Clear all database data (for easy resets)
app.post('/api/reset', (req, res) => {
  fs.writeFileSync(APPOINTMENTS_FILE, JSON.stringify([], null, 2));
  fs.writeFileSync(NOTIFICATIONS_FILE, JSON.stringify([], null, 2));
  res.json({ message: 'Base de datos de demostración restablecida.' });
});

// Integrate Vite middleware in development or serve static build in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  if (!process.env.VERCEL) {
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Dental server running on port ${PORT}`);
    });
  }
}

startServer();

export default app;
