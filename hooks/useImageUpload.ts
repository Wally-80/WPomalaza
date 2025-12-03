import { useState } from 'react'
import { uploadImage as uploadToSupabase, deleteImage as deleteFromSupabase } from '@/lib/supabase/storage'

interface UseImageUploadReturn {
  uploading: boolean
  error: string | null
  uploadImage: (file: File, bucket: string, path?: string) => Promise<string | null>
  deleteImage: (bucket: string, path: string) => Promise<void>
}

/**
 * Hook para subir y eliminar imágenes en Supabase
 */
export function useImageUpload(): UseImageUploadReturn {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const uploadImage = async (
    file: File,
    bucket: string,
    path?: string
  ): Promise<string | null> => {
    setUploading(true)
    setError(null)

    const { url, error: uploadError } = await uploadToSupabase(bucket, file, path)

    if (uploadError) {
      setError(uploadError.message)
      setUploading(false)
      return null
    }

    setUploading(false)
    return url
  }

  const deleteImage = async (bucket: string, path: string): Promise<void> => {
    const { error: deleteError } = await deleteFromSupabase(bucket, path)
    if (deleteError) {
      setError(deleteError.message)
    }
  }

  return { uploading, error, uploadImage, deleteImage }
}
