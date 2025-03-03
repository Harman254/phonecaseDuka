'use server'

import { createClient } from '@supabase/supabase-js'
import { revalidatePath } from 'next/cache'
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

export async function uploadImage(formData: FormData) {
  try {
    console.log('Starting upload process...')
    
    const { getUser } = getKindeServerSession()
    const user = await getUser()

    if (!user?.id) {
      console.log('No user found')
      throw new Error('User not authenticated')
    }

    const file = formData.get('file')
    if (!file || !(file instanceof File)) {
      throw new Error('No file provided')
    }

    // Create unique filename
    const fileExt = file.name.split('.').pop()
    const fileName = `${user.id}/${Date.now()}_${Math.random().toString(36).substring(2, 9)}.${fileExt}`

    // Convert File to Buffer for server-side upload
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from('cases')
      .upload(fileName, buffer, {
        contentType: file.type,
        cacheControl: '3600',
        upsert: false
      })

    if (error) {
      console.error('Storage upload error:', error)
      throw error
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('cases')
      .getPublicUrl(fileName)

    console.log('Attempting database insert with:', {
      user_id: user.id,
      image_url: publicUrl,
      file_path: fileName
    })

    // Save to database with correct types
    const { error: dbError } = await supabase
      .from('case_images')
      .insert({
        user_id: user.id.toString(),
        image_url: publicUrl,
        file_path: fileName,
        created_at: new Date().toISOString()
      })

    if (dbError) {
      console.error('Database insert error:', dbError)
      throw dbError
    }

    revalidatePath('/dashboard')
    return { success: true, url: publicUrl }
  } catch (error: any) {
    console.error('Upload process error:', error)
    return { success: false, error: error.message }
  }
}

export async function deleteImage(filePath: string) {
  try {
    const { getUser } = getKindeServerSession()
    const user = await getUser()

    if (!user?.id) {
      throw new Error('User not authenticated')
    }

    const { error } = await supabase.storage
      .from('cases')
      .remove([filePath])

    if (error) throw error

    revalidatePath('/dashboard')
    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
} 