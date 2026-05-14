export const CAPITAL_ADMIN_TOKEN_KEY = "capital_admin_token";

export function readAdminToken(): string {
  if (typeof window === "undefined") return "";
  try {
    return sessionStorage.getItem(CAPITAL_ADMIN_TOKEN_KEY) ?? "";
  } catch {
    return "";
  }
}

export function writeAdminToken(token: string): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(CAPITAL_ADMIN_TOKEN_KEY, token);
}

export function clearAdminToken(): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(CAPITAL_ADMIN_TOKEN_KEY);
}
