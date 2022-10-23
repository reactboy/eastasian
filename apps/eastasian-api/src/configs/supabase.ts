import { createClient } from '@supabase/supabase-js';

const options = {};

export const supabase = createClient(
  process.env['SUPABASE_PROJECT_URL'],
  process.env['SUPABASE_API_KEY'],
  options
);
