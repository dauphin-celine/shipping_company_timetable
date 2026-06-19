//файл для подключения к Supabase

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qfexnxzgsvbjaozaxide.supabase.co'
const supabaseAnonKey = 'sb_publishable_55vNOa1SGFrmN8rJLPeYmQ_funrA5eV'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)