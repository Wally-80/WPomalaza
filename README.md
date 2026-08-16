# WPomalaza - Portafolio Profesional PWA

**Live site:** [wpomalaza.com](https://wpomalaza.com)

A bilingual (English/Spanish) portfolio and services site built with Next.js 16,
TypeScript, Tailwind CSS, and Firebase. Installable as a Progressive Web App,
with a custom admin portal for managing content.

## Features

- **Progressive Web App** — installable on any device, works offline once loaded
- **Bilingual (EN/ES)** — full internationalization
- **Admin portal** — authenticated dashboard for managing projects and content
- **Responsive** — mobile, tablet, and desktop
- **Next.js 16** — App Router
- **TypeScript** — static typing throughout
- **Tailwind CSS** — utility-first styling
- **Firebase** — Authentication, Firestore database, and image storage
- **SEO optimized** — configured metadata

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (React, App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Backend | Firebase (Auth, Firestore, Storage) |
| Hosting | Vercel |

## Getting Started

```bash
git clone https://github.com/Wally-80/WPomalaza.git
cd WPomalaza/wpomalaza
npm install
npm run dev
```

Copy `.env.example` to `.env.local` and add your Firebase config values.
Open [http://localhost:3000](http://localhost:3000).

## Author

**Walter Pomalaza** — [wpomalaza.com](https://wpomalaza.com) ·
[LinkedIn](https://www.linkedin.com/in/walter-pomalaza-05927b140) ·
[GitHub](https://github.com/Wally-80)

---

## Español

Portafolio profesional bilingüe construido con Next.js 16, TypeScript,
Tailwind CSS y Firebase. Incluye Progressive Web App (PWA), portal de
administración, diseño responsivo y optimización SEO.

Sitio en vivo: [wpomalaza.com](https://wpomalaza.com)
Portafolio moderno y ligero construido con Next.js, TypeScript, Tailwind CSS y Supabase. Incluye funcionalidades de Progressive Web App (PWA) para una experiencia de usuario optimizada.

## 🚀 Características

- ✨ **Progressive Web App (PWA)** - Instalable en cualquier dispositivo
- 🎨 **Diseño Responsivo** - Funciona perfectamente en móviles, tablets y desktop
- ⚡ **Next.js 16** - Framework React moderno con App Router
- 🎯 **TypeScript** - Tipado estático para mayor seguridad
- 💅 **Tailwind CSS** - Estilos modernos y personalizables
- 🗄️ **Firebase** - Autenticación, Firestore y almacenamiento de imágenes
- 📱 **SEO Optimizado** - Metadatos configurados para mejor posicionamiento

## 📁 Estructura del Proyecto

```
wpomalaza/
├── app/                      # App Router de Next.js
│   ├── layout.tsx           # Layout principal con metadata
│   ├── page.tsx             # Página principal
│   └── globals.css          # Estilos globales
├── components/              # Componentes React
│   ├── Navbar.tsx          # Barra de navegación
│   ├── Hero.tsx            # Sección hero
│   ├── Projects.tsx        # Sección de proyectos
│   ├── About.tsx           # Sección sobre mí
│   ├── Contact.tsx         # Formulario de contacto
│   └── Footer.tsx          # Pie de página
├── config/                  # Configuraciones
│   └── site.ts             # Configuración del sitio
├── hooks/                   # Custom React Hooks
│   ├── useMediaQuery.ts    # Hook para responsive design
│   └── useImageUpload.ts   # Hook para subir imágenes
├── lib/                     # Librerías y utilidades
│   ├── supabase/           # Configuración de Supabase
│   │   ├── client.ts       # Cliente de Supabase
│   │   ├── storage.ts      # Funciones de almacenamiento
│   │   └── database.types.ts # Tipos de base de datos
│   └── utils.ts            # Funciones utilitarias
├── public/                  # Archivos estáticos
│   ├── manifest.json       # Manifiesto PWA
│   └── icons/              # Iconos de la PWA (crear esta carpeta)
├── .env.local              # Variables de entorno (no en Git)
├── next.config.ts          # Configuración de Next.js
└── package.json            # Dependencias del proyecto
```

## 🛠️ Instalación

1. **Clona el repositorio:**
```bash
git clone https://github.com/Wally-80/WPomalaza.git
cd WPomalaza/wpomalaza
```

2. **Instala las dependencias:**
```bash
npm install
```

3. **Configura las variables de entorno:**

El archivo `.env.local` ya está configurado con tus credenciales de Supabase. Si necesitas cambiarlas:
```env
NEXT_PUBLIC_SUPABASE_URL=https://qzcjiswshnawchksudqo.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_api_key
```

4. **Configura Supabase:**

Sigue las instrucciones en `SUPABASE_SETUP.md` para crear las tablas necesarias.

5. **Genera iconos para la PWA:**

Crea una carpeta `public/icons/` y genera iconos en los siguientes tamaños:
- 72x72, 96x96, 128x128, 144x144, 152x152, 192x192, 384x384, 512x512
- También crea versiones maskable: 192x192 y 512x512

Puedes usar herramientas como [PWA Asset Generator](https://www.pwabuilder.com/imageGenerator).

## 🚀 Desarrollo

Inicia el servidor de desarrollo:

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📦 Construcción para Producción

```bash
npm run build
npm start
```

## 🗄️ Configuración de Supabase

### Estructura de Datos

El proyecto maneja:
- **Proyectos**: Portafolio de trabajo
- **Experiencias**: Historial laboral
- **Habilidades**: Tecnologías y herramientas
- **Contactos**: Mensajes de visitantes

Ver `SUPABASE_SETUP.md` para instrucciones detalladas.

### Almacenamiento de Imágenes

Para subir imágenes a Supabase Storage:

```typescript
import { uploadImage } from '@/lib/supabase/storage'

const { url, error } = await uploadImage('portfolio-images', file)
```

## 🎨 Personalización

### Configuración del Sitio

Edita `config/site.ts` para cambiar:
- Nombre del sitio
- Descripción
- Enlaces sociales
- Información del autor

### Estilos

Los estilos usan Tailwind CSS. Personaliza en:
- `tailwind.config.ts` - Configuración de Tailwind
- `app/globals.css` - Estilos globales

## 📱 Progressive Web App

La aplicación incluye:
- **Manifest**: Configurado en `public/manifest.json`
- **Service Worker**: Generado automáticamente por next-pwa
- **Instalable**: Los usuarios pueden instalar la app
- **Offline**: Funciona sin conexión una vez cargada

## 🚀 Despliegue

### Vercel (Recomendado)

1. Conecta tu repositorio con Vercel
2. Configura las variables de entorno
3. Despliega automáticamente

### Otros Servicios

También funciona en Netlify, Railway, DigitalOcean App Platform, etc.

## 📝 Consejos de Mantenimiento

1. **Organización del Código**
   - Mantén componentes pequeños y enfocados
   - Usa TypeScript para prevenir errores
   - Comenta código complejo

2. **Base de Datos**
   - Usa migraciones para cambios
   - Mantén backups regulares
   - Implementa RLS para seguridad

3. **Performance**
   - Optimiza imágenes antes de subirlas
   - Usa Next.js Image para lazy loading
   - Minimiza dependencias

## 🔗 Enlaces

- [Repositorio GitHub](https://github.com/Wally-80/WPomalaza)
- [Next.js Documentation](https://nextjs.org/docs)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

Desarrollado con ❤️ por WPomalaza

