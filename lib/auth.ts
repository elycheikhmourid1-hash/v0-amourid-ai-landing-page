import { cookies } from "next/headers"
import { createHmac, timingSafeEqual } from "crypto"

const COOKIE_NAME = "aicore_admin"
const SESSION_VALUE = "authenticated"
const MAX_AGE = 60 * 60 * 24 * 7 // 7 days

function getSecret(): string {
  const secret = process.env.DASHBOARD_SECRET
  if (!secret) throw new Error("DASHBOARD_SECRET is not set")
  return secret
}

/** Sign a value with HMAC-SHA256 -> `value.signature` */
function sign(value: string): string {
  const sig = createHmac("sha256", getSecret()).update(value).digest("hex")
  return `${value}.${sig}`
}

/** Verify a signed token in constant time. Returns true if valid. */
function verify(token: string | undefined): boolean {
  if (!token) return false
  const idx = token.lastIndexOf(".")
  if (idx === -1) return false
  const value = token.slice(0, idx)
  const sig = token.slice(idx + 1)
  const expected = createHmac("sha256", getSecret()).update(value).digest("hex")
  const a = Buffer.from(sig)
  const b = Buffer.from(expected)
  if (a.length !== b.length) return false
  return timingSafeEqual(a, b) && value === SESSION_VALUE
}

/** Validate a plaintext password against DASHBOARD_PASSWORD in constant time. */
export function checkPassword(input: string): boolean {
  const expected = process.env.DASHBOARD_PASSWORD
  if (!expected) return false
  const a = Buffer.from(input)
  const b = Buffer.from(expected)
  if (a.length !== b.length) return false
  return timingSafeEqual(a, b)
}

/** Set the signed session cookie (call from a Server Action / Route Handler). */
export async function createSession(): Promise<void> {
  const store = await cookies()
  store.set(COOKIE_NAME, sign(SESSION_VALUE), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE,
  })
}

/** Clear the session cookie. */
export async function destroySession(): Promise<void> {
  const store = await cookies()
  store.delete(COOKIE_NAME)
}

/** Returns true if the current request has a valid admin session. */
export async function isAuthenticated(): Promise<boolean> {
  const store = await cookies()
  return verify(store.get(COOKIE_NAME)?.value)
}
