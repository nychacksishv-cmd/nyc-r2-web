import { auth } from '@clerk/nextjs/server'

/**
 * Server-side helper to call the FastAPI backend with the current user's
 * Clerk session token attached. Use this from Server Components / Route
 * Handlers.
 */
export async function callBackend(path: string, init: RequestInit = {}) {
  const { getToken } = await auth()
  const token = await getToken()

  if (!token) {
    throw new Error('Clerk session token is missing. Sign in before calling the backend.')
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, {
    ...init,
    headers: {
      ...init.headers,
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-store',
  })

  if (!res.ok) {
    throw new Error(`Backend request failed: ${res.status}`)
  }
  return res.json()
}
