/** Browser-safe Supabase public config (Vite-injected). */

export function getBrowserSupabaseConfig(): { url: string; anonKey: string } | null {
  const url =
    (typeof import.meta !== "undefined" && import.meta.env?.VITE_SUPABASE_URL) ||
    (typeof import.meta !== "undefined" && import.meta.env?.VITE_PUBLIC_SUPABASE_URL) ||
    (typeof import.meta !== "undefined" && import.meta.env?.PUBLIC_SUPABASE_URL) ||
    "";
  const anonKey =
    (typeof import.meta !== "undefined" && import.meta.env?.VITE_SUPABASE_ANON_KEY) ||
    (typeof import.meta !== "undefined" && import.meta.env?.VITE_PUBLIC_SUPABASE_ANON_KEY) ||
    (typeof import.meta !== "undefined" && import.meta.env?.PUBLIC_SUPABASE_ANON_KEY) ||
    "";
  if (!url || !anonKey) return null;
  return { url, anonKey };
}
