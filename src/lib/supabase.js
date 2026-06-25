import { createClient } from '@supabase/supabase-js'

// Activated only when both env vars are set (see README). Until then the app
// runs fully on local/seed data, so the live demo never breaks.
const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = url && key ? createClient(url, key) : null
export const backendEnabled = Boolean(supabase)
