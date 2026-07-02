import { DentalService, Dentist } from './types';

export const FALLBACK_SERVICES: DentalService[] = [
  { id: '1', name: 'Limpieza Dental Profunda', description: 'Eliminación de sarro, placa bacteriana y pulido de dientes para una higiene óptima.', price: '$60.000 COP', duration: '45 min', iconName: 'Sparkles' },
  { id: '2', name: 'Ortodoncia Invisible / Tradicional', description: 'Estudio y colocación de brackets o alineadores transparentes para corregir tu sonrisa.', price: '$1.200.000 COP', duration: '60 min', iconName: 'Activity' },
  { id: '3', name: 'Blanqueamiento Dental LED', description: 'Tratamiento estético avanzado para aclarar el tono de tus dientes de forma rápida y segura.', price: '$250.000 COP', duration: '60 min', iconName: 'Smile' },
  { id: '4', name: 'Diseño de Sonrisa', description: 'Carillas estéticas de alta calidad en resina o cerámica para perfeccionar la forma y color.', price: '$2.000.000 COP', duration: '90 min', iconName: 'Crown' },
  { id: '5', name: 'Implantes & Prótesis', description: 'Reemplazo permanente de dientes perdidos con materiales biocompatibles de alta duración.', price: '$1.500.000 COP', duration: '90 min', iconName: 'Shield' },
  { id: '6', name: 'Odontopediatría', description: 'Atención especializada, cariñosa y divertida para el cuidado bucal de los más pequeños.', price: '$50.000 COP', duration: '30 min', iconName: 'Heart' }
];

export const FALLBACK_DENTISTS: Dentist[] = [
  { id: 'd1', name: 'Dr. Alejandro Ruiz', role: 'Implantólogo & Rehabilitador', imageUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300', specialty: 'Implantes y Rehabilitación Oral', availableDays: [1, 2, 3, 4, 5] },
  { id: 'd2', name: 'Dra. Sofía Mendoza', role: 'Ortodoncista Clínica', imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300', specialty: 'Ortodoncia Invisible y Estética', availableDays: [1, 2, 4, 5, 6] },
  { id: 'd3', name: 'Dr. Carlos Estrada', role: 'Odontopediatra Especialista', imageUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=300', specialty: 'Odontología Infantil', availableDays: [2, 3, 5, 6] }
];
