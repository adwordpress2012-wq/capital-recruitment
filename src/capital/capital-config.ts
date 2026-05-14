/** Server-side Supabase + admin auth env (read only inside server function handlers). */

export type CapitalServerEnv = {
  supabaseUrl: string;
  supabaseAnonKey: string;
  supabaseServiceRoleKey: string;
  adminPassword: string;
  adminSessionSecret: string;
};

export function readCapitalServerEnv(): CapitalServerEnv {
  const supabaseUrl =
    process.env.SUPABASE_URL ||
    process.env.VITE_SUPABASE_URL ||
    process.env.VITE_PUBLIC_SUPABASE_URL ||
    process.env.PUBLIC_SUPABASE_URL ||
    "";
  const supabaseAnonKey =
    process.env.SUPABASE_ANON_KEY ||
    process.env.VITE_SUPABASE_ANON_KEY ||
    process.env.VITE_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.PUBLIC_SUPABASE_ANON_KEY ||
    "";
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
  const adminPassword = process.env.CAPITAL_ADMIN_PASSWORD || "";
  const adminSessionSecret =
    process.env.CAPITAL_ADMIN_SESSION_SECRET || process.env.SUPABASE_JWT_SECRET || "";

  return {
    supabaseUrl,
    supabaseAnonKey,
    supabaseServiceRoleKey,
    adminPassword,
    adminSessionSecret,
  };
}

export function isSupabaseBackendConfigured(env: CapitalServerEnv): boolean {
  return Boolean(env.supabaseUrl && env.supabaseAnonKey && env.supabaseServiceRoleKey);
}

export function isAdminAuthConfigured(env: CapitalServerEnv): boolean {
  return Boolean(env.adminPassword && env.adminSessionSecret);
}
