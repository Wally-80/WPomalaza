export type Language = 'en' | 'es'

export interface Translations {
  // Navigation
  nav: {
    home: string
    about: string
    services: string
    projects: string
    contact: string
  }
  // Hero Section
  hero: {
    greeting: string
    title: string
    subtitle: string
    cta: {
      primary: string
      secondary: string
    }
  }
  // About Section
  about: {
    title: string
    description: string
    stats: {
      experience: string
      projects: string
      clients: string
    }
    skillsTitle: string
  }
  // Services Section
  services: {
    title: string
    subtitle: string
    items: {
      webDev: {
        title: string
        description: string
      }
      pwa: {
        title: string
        description: string
      }
      uiux: {
        title: string
        description: string
      }
      optimization: {
        title: string
        description: string
      }
      maintenance: {
        title: string
        description: string
      }
      cloud: {
        title: string
        description: string
      }
    }
  }
  // Projects Section
  projects: {
    title: string
    subtitle: string
    viewDemo: string
    viewCode: string
    noProjects: string
  }
  // Contact Section
  contact: {
    title: string
    subtitle: string
    info: {
      location: {
        title: string
        value: string
      }
      email: {
        title: string
        value: string
      }
      availability: {
        title: string
        value: string
      }
    }
    form: {
      name: string
      email: string
      message: string
      submit: string
      sending: string
      success: string
      error: string
      errorRequired: string
      errorInvalidEmail: string
    }
  }
  // Footer
  footer: {
    rights: string
    builtWith: string
  }
}

export const translations: Record<Language, Translations> = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      services: 'Services',
      projects: 'Projects',
      contact: 'Contact',
    },
    hero: {
      greeting: 'Hello, I\'m',
      title: 'Walter Pomalaza',
      subtitle: 'Developer',
      cta: {
        primary: 'View Projects',
        secondary: 'Contact Me',
      },
    },
    about: {
      title: 'About Me',
      description: 'I\'m a passionate Full Stack Developer with experience in building modern and scalable web applications. I specialize in React, Next.js, Node.js, and cloud technologies.',
      stats: {
        experience: 'Years Experience',
        projects: 'Projects Completed',
        clients: 'Happy Clients',
      },
      skillsTitle: 'My Skills',
    },
    services: {
      title: 'Services',
      subtitle: 'I offer a wide range of web development services to help take your project to the next level.',
      items: {
        webDev: {
          title: 'Web Development',
          description: 'Modern web applications with React, Next.js and the latest technologies.',
        },
        pwa: {
          title: 'PWA Applications',
          description: 'Installable Progressive Web Apps that work offline.',
        },
        uiux: {
          title: 'UI/UX Design',
          description: 'Attractive and functional user interfaces focused on user experience.',
        },
        optimization: {
          title: 'Optimization',
          description: 'Performance improvement and SEO optimization for existing websites.',
        },
        maintenance: {
          title: 'Maintenance',
          description: 'Ongoing support and maintenance for your web applications.',
        },
        cloud: {
          title: 'Cloud Deploy',
          description: 'Cloud deployment and configuration on platforms like Vercel, AWS.',
        },
      },
    },
    projects: {
      title: 'Projects',
      subtitle: 'Some of my recent work',
      viewDemo: 'View Demo',
      viewCode: 'View Code',
      noProjects: 'No projects available yet.',
    },
    contact: {
      title: 'Contact',
      subtitle: 'Let\'s work together on your next project',
      info: {
        location: {
          title: 'Location',
          value: 'Lima, Peru',
        },
        email: {
          title: 'Email',
          value: 'contact@wpomalaza.com',
        },
        availability: {
          title: 'Availability',
          value: 'Available for freelance',
        },
      },
      form: {
        name: 'Your Name',
        email: 'Your Email',
        message: 'Your Message',
        submit: 'Send Message',
        sending: 'Sending...',
        success: 'Message sent successfully!',
        error: 'Error sending message. Please try again.',
        errorRequired: 'All fields are required',
        errorInvalidEmail: 'Invalid email address',
      },
    },
    footer: {
      rights: 'All rights reserved',
      builtWith: 'Built with Next.js & Supabase',
    },
  },
  es: {
    nav: {
      home: 'Inicio',
      about: 'Sobre mí',
      services: 'Servicios',
      projects: 'Proyectos',
      contact: 'Contacto',
    },
    hero: {
      greeting: 'Hola, soy',
      title: 'Walter Pomalaza',
      subtitle: 'Soy Desarrollador Frontend and Backend',
      cta: {
        primary: 'Ver Proyectos',
        secondary: 'Contáctame',
      },
    },
    about: {
      title: 'Sobre Mí',
      description: 'Soy un Desarrollador Full Stack apasionado con experiencia en la creación de aplicaciones web modernas y escalables. Me especializo en React, Next.js, Node.js y tecnologías en la nube.',
      stats: {
        experience: 'Años de Experiencia',
        projects: 'Proyectos Completados',
        clients: 'Clientes Satisfechos',
      },
      skillsTitle: 'Mis Habilidades',
    },
    services: {
      title: 'Servicios',
      subtitle: 'Ofrezco una amplia gama de servicios de desarrollo web para ayudarte a llevar tu proyecto al siguiente nivel.',
      items: {
        webDev: {
          title: 'Desarrollo Web',
          description: 'Aplicaciones web modernas con React, Next.js y las últimas tecnologías.',
        },
        pwa: {
          title: 'Aplicaciones PWA',
          description: 'Progressive Web Apps instalables que funcionan offline.',
        },
        uiux: {
          title: 'Diseño UI/UX',
          description: 'Interfaces de usuario atractivas y funcionales enfocadas en la experiencia del usuario.',
        },
        optimization: {
          title: 'Optimización',
          description: 'Mejora del rendimiento y optimización SEO para sitios web existentes.',
        },
        maintenance: {
          title: 'Mantenimiento',
          description: 'Soporte y mantenimiento continuo para tus aplicaciones web.',
        },
        cloud: {
          title: 'Deploy en la Nube',
          description: 'Despliegue y configuración en la nube en plataformas como Vercel, AWS.',
        },
      },
    },
    projects: {
      title: 'Proyectos',
      subtitle: 'Algunos de mis trabajos recientes',
      viewDemo: 'Ver Demo',
      viewCode: 'Ver Código',
      noProjects: 'No hay proyectos disponibles aún.',
    },
    contact: {
      title: 'Contacto',
      subtitle: 'Trabajemos juntos en tu próximo proyecto',
      info: {
        location: {
          title: 'Ubicación',
          value: 'Lima, Perú',
        },
        email: {
          title: 'Correo',
          value: 'contact@wpomalaza.com',
        },
        availability: {
          title: 'Disponibilidad',
          value: 'Disponible para freelance',
        },
      },
      form: {
        name: 'Tu Nombre',
        email: 'Tu Correo',
        message: 'Tu Mensaje',
        submit: 'Enviar Mensaje',
        sending: 'Enviando...',
        success: '¡Mensaje enviado con éxito!',
        error: 'Error al enviar el mensaje. Por favor intenta de nuevo.',
        errorRequired: 'Todos los campos son requeridos',
        errorInvalidEmail: 'Correo electrónico inválido',
      },
    },
    footer: {
      rights: 'Todos los derechos reservados',
      builtWith: 'Hecho con Next.js y Supabase',
    },
  },
}
