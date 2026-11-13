import { mockAccount } from '../mocks/fixtures'
import type { Account } from '../types/account'
import { sleep } from './client'

// MOCK: backend has no GET /account endpoint yet — swap this body for
// apiFetch<Account>('/account') once it exists.
export async function getAccount(): Promise<Account> {
  await sleep(150)
  return mockAccount
}
