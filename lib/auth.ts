import { cookies } from "next/headers"
import { createHmac, timingSafeEqual } from "crypto"

const COOKIE_NAME = "aicore_admin"
const SESSION_VALUE = "authenticated"

function getSecret(): string {
  return process.env.DASHBOARD_SECRET || "fallback-dev-secret-change-me"
}

/** Sign a value with HMAC-SHA256 so the cookie cannot be forged. */
function sign(value: string): string {
  const sig = createHmac("sha256", getSecret()).update(value).digest("hex")
  return `${value}.${sig}`
}

/** Verify a signed cookie value in constant time. */
function verify(signed: string | undefined): boolean {
  if (!signed) return false
  const idx = signed.lastIndexOf(".")
  if (idx === -1) return false
  const value = signed.slice(0, idx)
  const sig = signed.slice(idx + 1)
  const expected = createHmac("sha256", getSecret()).update(value).digest("hex")
  try {
    const a = Buffer.from(sig, "hex")
    const b = Buffer.from(expected, "hex")
    if (a.length !== b.length) return false
    return timingSafeEqual(a, b) && value === SESSION_VALUE
  } catch {
    return false
  }
}

/** Check the submitted password against the env password (constant time). */
export function isValidPassword(submitted: string): boolean {
  const real = process.env.DASHBOARD_PASSWORD || ""
  if (!real) return false
  const a = Buffer.from(submitted)
  const b = Buffer.from(real)
  if (a.length !== b.length) return false
  try {
    return timingSafeEqual(a, b)
  } catch {
    return false
  }
}

export async function createSession(): Promise<void> {
  const store = await cookies()
  store.set(COOKIE_NAME, sign(SESSION_VALUE), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })
}

export async function destroySession(): Promise<void> {
  const store = await cookies()
  store.delete(COOKIE_NAME)
}

export async function isAuthenticated(): Promise<boolean> {
  const store = await cookies()
  return verify(store.get(COOKIE_NAME)?.value)
}
