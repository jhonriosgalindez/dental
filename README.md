# Clínica Dental DentalCare - Plataforma de Gestión y Citas en Línea

Una plataforma web full-stack moderna, intuitiva y de alto rendimiento diseñada para una clínica dental contemporánea. Permite a los pacientes conocer el equipo, explorar los servicios especializados de odontología, revisar las tecnologías avanzadas de la clínica, contactar directamente y agendar citas médicas en tiempo real con integración de autenticación. Incluye un completo panel de administración para la gestión clínica de las citas.

---

## 🚀 Características Principales

### 📅 Sistema Inteligente de Citas (`AppointmentBooker`)
- **Agendamiento Paso a Paso**: Selección de tratamiento, selección de dentista de preferencia con disponibilidad personalizada, fecha interactiva y slots de hora disponibles en tiempo real.
- **Autenticación Integrada**: Compatible con flujos de inicio de sesión seguros para guardar el historial de citas.

### 🛡️ Panel de Administración (`AdminPanel`)
- **Consola de Control**: Panel exclusivo para los profesionales clínicos y administradores.
- **Gestión de Estados**: Permite filtrar, aprobar, reprogramar o cancelar citas registradas en tiempo real.
- **Monitoreo de Notificaciones**: Registro integrado de alertas y eventos del sistema.

---

## 🛠️ Stack Tecnológico

El proyecto utiliza tecnologías de última generación para garantizar la velocidad, escalabilidad y una experiencia de usuario sobresaliente:

- **Frontend**:
  - **React 19** como librería de UI reactiva.
  - **Tailwind CSS v4** para un sistema de diseño moderno con clases utilitarias de alta velocidad.
  - **Motion** (`motion/react`) para microinteracciones fluidas y animaciones refinadas.
  - **Lucide React** para un set unificado de iconos vectoriales de alta definición.

- **Backend (Full-stack)**:
  - **Express** para el servidor web y proxy de APIs robusto.
  - **Vite 6** para el empaquetado ultra rápido y el entorno de desarrollo HMR.
  - **TypeScript** en todo el espectro (Frontend y Backend) para máxima seguridad de tipos.
  - **tsx** para la ejecución directa de TypeScript en el entorno de desarrollo.
  - **esbuild** para empaquetar el servidor web en un solo archivo optimizado de producción.

- **Persistencia**:
  - Base de datos local ligera (`appointments.json`, `notifications.json`) con estructura extensible para integraciones en la nube (Firestore / Firebase).

---

## 📁 Estructura del Proyecto

```bash
├── server.ts                  # Servidor Express y API del backend (Full-stack Router)
├── package.json               # Dependencias del sistema y scripts de automatización
├── tsconfig.json              # Configuración de compilación de TypeScript
├── vite.config.ts             # Configuración del bundle de Vite
├── metadata.json              # Metadatos del aplicativo e integraciones de la plataforma
├── src/
│   ├── main.tsx               # Punto de entrada principal de React
│   ├── App.tsx                # Layout principal, gestión de rutas y estados globales
│   ├── index.css              # Estilos globales y configuración de variables de tema Tailwind v4
│   └── components/            # Módulos y componentes visuales reutilizables
│       ├── Home.tsx           # Página de inicio con banner principal, bento grid de valor, paso a paso y tecnología
│       ├── Services.tsx       # Sección detallada de especialidades y tratamientos odontológicos
│       ├── AboutUs.tsx        # Información sobre la clínica, testimonios y perfiles detallados de los odontólogos
│       ├── AppointmentBooker.tsx # Formulario dinámico para agendamiento de citas
│       ├── Contact.tsx        # Sección de contacto con formulario interactivo y mapa de ubicación
│       ├── AdminPanel.tsx     # Consola de administración para la gestión de citas y logs de notificaciones
│       ├── Navbar.tsx         # Barra de navegación receptiva con estados interactivos
│       └── Footer.tsx         # Pie de página profesional con información legal, redes sociales y horarios
```

---

## ⚙️ Instalación y Configuración

Sigue estos pasos para ejecutar el proyecto de forma local:

### 1. Clonar el repositorio e instalar dependencias
Instala los módulos requeridos usando npm:
```bash
npm install
```

### 2. Modo de Desarrollo
Inicia el servidor Express de desarrollo con soporte para recarga automática:
```bash
npm run dev
```
El servidor estará accesible en: `http://localhost:3000`

### 3. Compilación para Producción
Para compilar tanto el bundle del frontend con Vite como el servidor Express usando esbuild:
```bash
npm run build
```
Este comando generará el bundle optimizado en la carpeta `/dist` y creará el ejecutable compilado del backend en `/dist/server.cjs`.

### 4. Iniciar en Producción
Para correr la versión compilada y optimizada de producción:
```bash
npm run start
```

---

## 🦷 Catálogo de Dentistas Pre-cargados
La plataforma incluye perfiles reales de especialistas con roles y agendas de disponibilidad dinámicas:
1. **Dr. Alejandro Ruiz** — *Implantólogo & Rehabilitador* (Especialidad en Implantes y Rehabilitación Oral)
2. **Dra. Sofía Mendoza** — *Ortodoncista Clínica* (Especialidad en Ortodoncia Invisible y Estética)
3. **Dr. Carlos Estrada** — *Odontopediatra Especialista* (Especialidad en Odontología Infantil)

---

## 📖 Contrato de Diseño y Accesibilidad
La aplicación se construyó siguiendo estrictas normas estéticas y operativas:
- **Contraste y Legibilidad**: Uso de colores suaves como hueso (`stone-50`), verde azulado profundo (`teal-950`) y acentos orgánicos de arena para una navegación relajante.
- **Layout Fluido**: Diseño adaptado tanto a pantallas ultra anchas (con límites de lectura en contenedores de `max-w-7xl`) como a pantallas móviles táctiles mediante objetivos interactivos de al menos `44px`.
- **Ausencia de Animaciones Innecesarias**: Las transiciones se aplican de forma estratégica para guiar el flujo visual del usuario.
