import type { Account } from '../types/account'
import { apiFetch } from './client'

export function getAccount(): Promise<Account> {
  return apiFetch<Account>('/dashboard/me')
}

export function logout(): Promise<void> {
  return apiFetch<void>('/dashboard/logout', { method: 'POST' })
}
