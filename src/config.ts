import { createClient, SupabaseClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config();

class SupabaseSingleton {
  private static instance: SupabaseClient | null = null

  private constructor() {}

  public static getInstance(): SupabaseClient {
    if (!SupabaseSingleton.instance) {
      SupabaseSingleton.instance = createClient(
        process.env.SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
      )
    }
    return SupabaseSingleton.instance
  }
}

export const supabase = SupabaseSingleton.getInstance()