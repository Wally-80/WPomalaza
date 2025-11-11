import { supabase } from './client'

/**
 * Sube una imagen a Supabase Storage
 * @param bucket - Nombre del bucket en Supabase
 * @param file - Archivo a subir
 * @param path - Ruta donde se guardará el archivo
 * @returns URL pública de la imagen subida
 */
export async function uploadImage(
  bucket: string,
  file: File,
  path?: string
): Promise<{ url: string | null; error: Error | null }> {
  try {
    const fileName = path || `${Date.now()}-${file.name}`
    
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (error) throw error

    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(data.path)

    return { url: publicUrl, error: null }
  } catch (error) {
    return { url: null, error: error as Error }
  }
}

/**
 * Elimina una imagen de Supabase Storage
 * @param bucket - Nombre del bucket
 * @param path - Ruta del archivo a eliminar
 */
export async function deleteImage(
  bucket: string,
  path: string
): Promise<{ error: Error | null }> {
  try {
    const { error } = await supabase.storage
      .from(bucket)
      .remove([path])

    if (error) throw error
    return { error: null }
  } catch (error) {
    return { error: error as Error }
  }
}

/**
 * Obtiene la URL pública de una imagen
 * @param bucket - Nombre del bucket
 * @param path - Ruta del archivo
 */
export function getImageUrl(bucket: string, path: string): string {
  const { data: { publicUrl } } = supabase.storage
    .from(bucket)
    .getPublicUrl(path)
  
  return publicUrl
}
