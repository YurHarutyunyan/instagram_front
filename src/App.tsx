import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { getAccount } from './api/account'
import { ApiError } from './api/client'
import { Layout } from './components/Layout'
import { CommentsPage } from './pages/CommentsPage'
import { DashboardPage } from './pages/DashboardPage'
import { LoginPage } from './pages/LoginPage'
import { MessagesPage } from './pages/MessagesPage'
import type { Account } from './types/account'

type AuthState = { kind: 'loading' } | { kind: 'signedOut' } | { kind: 'signedIn'; account: Account }

export default function App() {
  const [auth, setAuth] = useState<AuthState>({ kind: 'loading' })

  useEffect(() => {
    getAccount()
      .then((account) => setAuth({ kind: 'signedIn', account }))
      .catch((e) => {
        if (e instanceof ApiError && e.status === 401) setAuth({ kind: 'signedOut' })
        else setAuth({ kind: 'signedOut' })
      })
  }, [])

  if (auth.kind === 'loading') {
    return <p className="p-8 text-sm text-slate-500">Loading…</p>
  }
  if (auth.kind === 'signedOut') {
    return <LoginPage />
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout account={auth.account} onSignedOut={() => setAuth({ kind: 'signedOut' })} />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/messages" element={<MessagesPage account={auth.account} />} />
          <Route path="/comments" element={<CommentsPage account={auth.account} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
