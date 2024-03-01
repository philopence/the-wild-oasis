import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://njagkilqndcxzvosenkj.supabase.co";
export const storageUrl = `${supabaseUrl}/storage/v1/object/public`;
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5qYWdraWxxbmRjeHp2b3NlbmtqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg3NTc3OTgsImV4cCI6MjAyNDMzMzc5OH0._zg6RsmL4XcbakVXJ_vAk0PPvWMtJLXspaPc8x5iKAw";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
