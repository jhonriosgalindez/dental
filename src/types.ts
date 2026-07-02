export interface Appointment {
  id: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  serviceId: string;
  serviceName: string;
  dentistId: string;
  dentistName: string;
  date: string; // YYYY-MM-DD
  timeSlot: string; // HH:MM
  notes?: string;
  googleEventId?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}

export interface DentalService {
  id: string;
  name: string;
  description: string;
  price: string;
  duration: string;
  iconName: string;
}

export interface Dentist {
  id: string;
  name: string;
  role: string;
  imageUrl: string;
  specialty: string;
  availableDays: number[]; // 0-6 (Sunday-Saturday)
}

export interface EmailNotification {
  id: string;
  recipient: string;
  recipientRole: 'client' | 'admin';
  subject: string;
  htmlBody: string;
  sentAt: string;
  type: 'booking_confirmation' | 'admin_alert' | 'reminder';
}
