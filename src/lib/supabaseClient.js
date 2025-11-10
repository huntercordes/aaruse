import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://zhgfmsrkchixzzunnste.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpoZ2Ztc3JrY2hpeHp6dW5uc3RlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA1MTgxMzUsImV4cCI6MjA3NjA5NDEzNX0.VhyMYhD6YHmv9H8cGtDVuL8fdggsfVreeqqBEc285A4";

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});
