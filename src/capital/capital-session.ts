import { createHmac, timingSafeEqual } from "node:crypto";

const MAX_AGE_SEC = 60 * 60 * 24 * 7;

function sign(payload: string, secret: string): string {
  const h = createHmac("sha256", secret);
  h.update(payload);
  return h.digest("base64url");
}

export function createAdminSessionToken(secret: string): string {
  const exp = Math.floor(Date.now() / 1000) + MAX_AGE_SEC;
  const body = JSON.stringify({ exp, v: 1 });
  const b64 = Buffer.from(body, "utf8").toString("base64url");
  const sig = sign(b64, secret);
  return `${b64}.${sig}`;
}

/** Verifies signed admin session token (from sessionStorage). */
export function verifyAdminSessionToken(token: string, secret: string): boolean {
  if (!token || !secret) return false;
  const dot = token.lastIndexOf(".");
  if (dot <= 0) return false;
  const b64 = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  const expected = sign(b64, secret);
  try {
    if (sig.length !== expected.length || !timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) {
      return false;
    }
  } catch {
    return false;
  }
  let payload: { exp?: number };
  try {
    payload = JSON.parse(Buffer.from(b64, "base64url").toString("utf8")) as { exp?: number };
  } catch {
    return false;
  }
  if (typeof payload.exp !== "number") return false;
  if (payload.exp < Math.floor(Date.now() / 1000)) return false;
  return true;
}
