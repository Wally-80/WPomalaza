-- =====================================================
-- SCRIPTS SQL PARA SUPABASE - PORTAFOLIO WPOMALAZA
-- =====================================================
-- Ejecuta estos scripts en orden en el SQL Editor de Supabase
-- Puedes ejecutar todo junto o sección por sección

-- =====================================================
-- 1. CREAR TABLAS
-- =====================================================

-- Tabla de proyectos
CREATE TABLE projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  technologies TEXT[] NOT NULL,
  github_url TEXT,
  live_url TEXT,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de experiencias
CREATE TABLE experiences (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company TEXT NOT NULL,
  position TEXT NOT NULL,
  description TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE,
  current BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de habilidades
CREATE TABLE skills (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  level INTEGER CHECK (level >= 1 AND level <= 5),
  icon TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de contactos
CREATE TABLE contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 2. CONFIGURAR STORAGE
-- =====================================================

-- Crear bucket para imágenes
INSERT INTO storage.buckets (id, name, public) 
VALUES ('portfolio-images', 'portfolio-images', true);

-- Política de lectura pública
CREATE POLICY "Public Access" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'portfolio-images');

-- Política de subida (autenticado o anónimo según prefieras)
CREATE POLICY "Authenticated users can upload" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'portfolio-images');

-- Política de eliminación (solo autenticados)
CREATE POLICY "Authenticated users can delete" 
ON storage.objects FOR DELETE 
USING (bucket_id = 'portfolio-images' AND auth.role() = 'authenticated');

-- =====================================================
-- 3. ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Habilitar RLS en todas las tablas
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Políticas de lectura pública
CREATE POLICY "Public can view projects" 
ON projects FOR SELECT 
USING (true);

CREATE POLICY "Public can view experiences" 
ON experiences FOR SELECT 
USING (true);

CREATE POLICY "Public can view skills" 
ON skills FOR SELECT 
USING (true);

-- Política para crear contactos (público puede enviar mensajes)
CREATE POLICY "Public can create contacts" 
ON contacts FOR INSERT 
WITH CHECK (true);

-- Políticas de administración (solo usuarios autenticados)
CREATE POLICY "Authenticated users can manage projects" 
ON projects FOR ALL 
USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage experiences" 
ON experiences FOR ALL 
USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage skills" 
ON skills FOR ALL 
USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can view contacts" 
ON contacts FOR SELECT 
USING (auth.role() = 'authenticated');

-- =====================================================
-- 4. TRIGGERS PARA UPDATED_AT
-- =====================================================

-- Función para actualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para projects
CREATE TRIGGER update_projects_updated_at 
BEFORE UPDATE ON projects
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- 5. DATOS DE EJEMPLO (OPCIONAL)
-- =====================================================

-- Insertar proyectos de ejemplo
INSERT INTO projects (title, description, technologies, featured, image_url) VALUES
('Portafolio Personal', 'Portafolio moderno con Next.js y Supabase', ARRAY['Next.js', 'React', 'TypeScript', 'Tailwind CSS'], true, null),
('E-commerce App', 'Tienda online con carrito de compras', ARRAY['React', 'Node.js', 'MongoDB', 'Stripe'], false, null);

-- Insertar habilidades de ejemplo
INSERT INTO skills (name, category, level) VALUES
('Next.js', 'Frontend', 5),
('React', 'Frontend', 5),
('TypeScript', 'Language', 4),
('Node.js', 'Backend', 4),
('PostgreSQL', 'Database', 4),
('Tailwind CSS', 'Styling', 5);

-- Insertar experiencia de ejemplo
INSERT INTO experiences (company, position, description, start_date, current) VALUES
('Freelance', 'Full Stack Developer', 'Desarrollo de aplicaciones web modernas usando React, Next.js y Node.js', '2023-01-01', true);

-- =====================================================
-- FIN DE LOS SCRIPTS
-- =====================================================
-- Las tablas y configuraciones están listas.
-- Ahora puedes iniciar tu aplicación con: npm run dev
