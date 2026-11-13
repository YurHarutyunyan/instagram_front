import { useEffect, useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { getAccount } from '../api/account'
import type { Account } from '../types/account'

const navItems = [
  { to: '/', label: 'Dashboard', end: true },
  { to: '/comments', label: 'Comments' },
  { to: '/messages', label: 'Messages' },
]

export function Layout() {
  const [account, setAccount] = useState<Account | null>(null)

  useEffect(() => {
    let cancelled = false
    getAccount().then((result) => {
      if (!cancelled) setAccount(result)
    })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className="flex min-h-screen bg-red-50 text-blue-900">
      <aside className="w-56 shrink-0 border-r border-blue-200 bg-red-100">
        <div className="px-5 py-5 text-lg font-semibold">IG Automation</div>
        <nav className="flex flex-col gap-1 px-3">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isActive ? 'bg-blue-900 text-white' : 'text-blue-700 hover:bg-blue-200'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <div className="flex flex-1 flex-col">
        <header className="flex items-center gap-3 border-b border-blue-200 bg-white px-8 py-3">
          {account ? (
            <>
              <img
                src={account.avatarUrl}
                alt={account.name}
                className="h-9 w-9 rounded-full object-cover"
              />
              <div className="leading-tight">
                <p className="text-sm font-medium">{account.name}</p>
                <p className="text-xs text-blue-500">@{account.username}</p>
              </div>
            </>
          ) : (
            <div className="h-9" />
          )}
        </header>
        <main className="flex-1 px-8 py-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
