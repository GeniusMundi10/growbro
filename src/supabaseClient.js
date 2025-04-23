import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl) {
  throw new Error('supabaseUrl is required. Check your .env file and restart the dev server.');
}
if (!supabaseAnonKey) {
  throw new Error('supabaseAnonKey is required. Check your .env file and restart the dev server.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);