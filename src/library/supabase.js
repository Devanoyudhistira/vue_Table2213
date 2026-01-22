import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
const supabaseServiceRole = import.meta.env.VITE_SERVICE_ROLE_KEY
const supabase = createClient(supabaseUrl,supabaseServiceRole)

export default supabase 