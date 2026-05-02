// Client Config
import { createAuthClient } from "better-auth/react"

const baseURL = typeof window !== "undefined"
  ? window.location.origin
  : process.env.NEXT_PUBLIC_BETTER_AUTH_URL || process.env.BETTER_AUTH_URL

export const authClient = createAuthClient({
  baseURL
})

export const { signIn, signUp, useSession, signOut } = authClient