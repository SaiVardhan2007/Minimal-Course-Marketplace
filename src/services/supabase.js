import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://mzhjeejewybmapwjiftn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im16aGplZWpld3libWFwd2ppZnRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEwMTE4NDcsImV4cCI6MjA2NjU4Nzg0N30.EyEzuksdEI1lF8OdKmyxQnkPtQGh_EM0N8Xp5eJNnrM';
export const supabase = createClient(supabaseUrl, supabaseAnonKey);