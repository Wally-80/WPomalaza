# Cómo Agregar el Proyecto EZQizy.com a tu Portafolio

## Opción 1: Usando Supabase SQL Editor (Recomendado)

1. **Abre Supabase Dashboard:**
   - Ve a: https://supabase.com/dashboard
   - Selecciona tu proyecto: `qzcjiswshnawchksudqo`

2. **Abre el SQL Editor:**
   - En el menú lateral, haz clic en **SQL Editor**
   - Haz clic en **New Query**

3. **Ejecuta el Script:**
   - Copia todo el contenido del archivo `supabase-add-ezqizy-project.sql`
   - Pégalo en el editor
   - Haz clic en **Run** o presiona `Ctrl+Enter`

4. **Verifica el Resultado:**
   - Deberías ver: "Success. 1 row(s) affected."
   - Ve a **Table Editor** → **projects** para ver el nuevo proyecto

## Opción 2: Usando Supabase Table Editor

1. **Abre Supabase Dashboard:**
   - Ve a: https://supabase.com/dashboard
   - Selecciona tu proyecto

2. **Abre Table Editor:**
   - En el menú lateral, haz clic en **Table Editor**
   - Selecciona la tabla **projects**

3. **Inserta Nueva Fila:**
   - Haz clic en **Insert** → **Insert row**
   - Llena los campos:
     - **title:** `EZQizy.com`
     - **description:** `Interactive quiz platform with real-time scoring, customizable templates, and analytics for educators. Built with modern web technologies for optimal performance and user experience.`
     - **image_url:** `https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?q=80&w=2070`
     - **technologies:** `["Next.js", "React", "TypeScript", "Tailwind CSS", "Supabase", "PostgreSQL"]`
     - **github_url:** (déjalo vacío si no quieres mostrar el código)
     - **live_url:** `https://ezqizy.com`
     - **featured:** `true`

4. **Guarda:**
   - Haz clic en **Save**

## Verificar en tu Portafolio

Después de agregar el proyecto, ve a tu portafolio:
- http://localhost:3000/#projects

Deberías ver la tarjeta de EZQizy.com con:
- ✅ Imagen de fondo
- ✅ Título y descripción
- ✅ Tecnologías usadas
- ✅ Botón "View Demo" que lleva a https://ezqizy.com

## Personalizar la Imagen

Si quieres usar una captura de pantalla real de EZQizy.com:

1. Toma un screenshot del sitio
2. Súbelo a Supabase Storage:
   - Ve a **Storage** → **portfolio-images**
   - Haz clic en **Upload file**
   - Sube tu imagen
3. Copia la URL pública
4. Actualiza el proyecto en Supabase con la nueva URL

## Notas

- El campo `technologies` es un array, asegúrate de usar la sintaxis correcta
- `featured: true` hace que el proyecto se destaque
- Puedes agregar más proyectos siguiendo el mismo proceso
