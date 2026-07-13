import { auth } from '@clerk/nextjs/server'

export class BackendError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message)
    this.name = 'BackendError'
  }
}

/**
 * Server-side helper to call the FastAPI backend with the current user's
 * Clerk session token attached. Use this from Server Components / Route
 * Handlers.
 */
export async function callBackend<T = unknown>(path: string, init: RequestInit = {}): Promise<T> {
  const { getToken } = await auth()
  const token = await getToken()

  if (!token) {
    throw new Error('Clerk session token is missing. Sign in before calling the backend.')
  }

  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  if (!apiUrl) {
    throw new Error('NEXT_PUBLIC_API_URL is not configured.')
  }

  const headers = new Headers(init.headers)
  headers.set('Authorization', `Bearer ${token}`)

  const res = await fetch(`${apiUrl.replace(/\/$/, '')}${path}`, {
    ...init,
    headers,
    cache: 'no-store',
  })

  if (!res.ok) {
    const detail = await res.text()
    throw new BackendError(detail || `Backend request failed: ${res.status}`, res.status)
  }

  if (res.status === 204) {
    return undefined as T
  }

  return res.json()
}

export function jsonRequest<TBody>(body: TBody, init: RequestInit = {}): RequestInit {
  const headers = new Headers(init.headers)
  headers.set('Content-Type', 'application/json')
  return {
    ...init,
    method: init.method ?? 'POST',
    headers,
    body: JSON.stringify(body),
  }
}
