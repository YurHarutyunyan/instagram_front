// The dashboard and the API share one host in production (nginx proxies /api); `npm run dev`
// proxies /api to the backend too (vite.config.ts).
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '/api'

export const LOGIN_URL = `${API_BASE_URL}/auth/login?next=dashboard`

export class ApiError extends Error {
  status: number

  constructor(status: number, message: string) {
    super(message)
    this.status = status
  }
}

export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    ...init,
  })

  if (!response.ok) {
    const body = await response.text()
    let message = body || response.statusText
    try {
      message = (JSON.parse(body) as { error?: string }).error ?? message
    } catch {
      // not JSON — keep the raw text
    }
    throw new ApiError(response.status, message)
  }

  if (response.status === 204) return undefined as T
  return response.json() as Promise<T>
}
