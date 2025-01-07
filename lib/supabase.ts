import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://kgsvxncdillljdftiqsa.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtnc3Z4bmNkaWxsbGpkZnRpcXNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU5MTIxMDksImV4cCI6MjA1MTQ4ODEwOX0.nFwAW1Xm5Iw7EftlhR9Kd0zJyzExcg6PPk3max8O-XE";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
