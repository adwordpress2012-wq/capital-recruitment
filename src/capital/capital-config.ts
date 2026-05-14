/**
 * Server-only Supabase and admin configuration (read inside TanStack Start server function handlers).
 *
 * **Client vs server env**
 * - `VITE_*` vars are embedded in the browser bundle by Vite; use them only for the public Supabase URL and anon key.
 * - `SUPABASE_SERVICE_ROLE_KEY`, `CAPITAL_ADMIN_PASSWORD`, and `CAPITAL_ADMIN_SESSION_SECRET` must never use a `VITE_` prefix
 *   so they stay server-only on Vercel and local dev.
 *
 * **Fallback URL/key names**
 * - `readCapitalServerEnv` accepts several env names so deployments can align with other DOS stacks (`SUPABASE_URL`, etc.).
 *
 * **Service role**
 * - `SUPABASE_SERVICE_ROLE_KEY` is only read here for server functions in `capital-fns.ts` (writes, storage, admin reads).
 */

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
  /** Server-only; do not use VITE_* or NEXT_PUBLIC_* for this key. */
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
