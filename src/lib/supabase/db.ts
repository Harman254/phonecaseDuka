import { createClient } from '@supabase/supabase-js'
import { KindeUser } from '@kinde-oss/kinde-auth-nextjs/types'

// Make sure these environment variables are properly set in your .env.local file
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseKey)

export async function saveNewUser(user: KindeUser) {
  if (!user || !user.id) {
    console.log('No user data provided')
    return null
  }

  try {
    // First check if user exists
    const { data: existingUser, error: searchError } = await supabase
      .from('users')
      .select('id')
      .eq('id', user.id)
      .single()

    if (searchError && searchError.code !== 'PGRST116') { // PGRST116 is the "not found" error
      throw searchError
    }

    // If user doesn't exist, create new record
    if (!existingUser) {
      const { data, error: insertError } = await supabase
        .from('users')
        .insert({
          id: user.id,
          email: user.email || '',
          given_name: user.given_name || '',
          family_name: user.family_name || '',
          picture: user.picture || '',
          created_at: new Date().toISOString(),
        })
        .select()
        .single()

      if (insertError) throw insertError
      
      console.log('New user created:', user.id)
      return data
    }

    console.log('User already exists:', user.id)
    return existingUser
  } catch (error) {
    console.error('Error saving user:', error)
    return null // Return null instead of throwing to prevent app crashes
  }
} 