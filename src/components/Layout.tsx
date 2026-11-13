import { NavLink, Outlet } from 'react-router-dom'
import { logout } from '../api/account'
import type { Account } from '../types/account'

const navItems = [
  { to: '/', label: 'Overview', end: true },
  { to: '/messages', label: 'Messages' },
  { to: '/comments', label: 'Comments' },
]

export function Layout({ account, onSignedOut }: { account: Account; onSignedOut: () => void }) {
  async function handleLogout() {
    await logout().catch(() => undefined)
    onSignedOut()
  }

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900">
      <aside className="w-56 shrink-0 border-r border-slate-200 bg-white">
        <div className="px-5 py-5 text-lg font-semibold">Mango</div>
        <nav className="flex flex-col gap-1 px-3">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isActive ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <div className="flex flex-1 flex-col">
        <header className="flex items-center gap-3 border-b border-slate-200 bg-white px-8 py-3">
          {account.profilePictureUrl ? (
            <img src={account.profilePictureUrl} alt="" className="h-10 w-10 rounded-full object-cover" />
          ) : (
            <div className="h-10 w-10 rounded-full bg-slate-200" />
          )}
          <div className="leading-tight" title="Your Instagram account, read from Instagram (instagram_business_basic)">
            <p className="text-sm font-medium">{account.name ?? `@${account.username}`}</p>
            <p className="text-xs text-slate-500">
              @{account.username}
              {account.followersCount != null && ` · ${account.followersCount} followers`}
              {account.mediaCount != null && ` · ${account.mediaCount} posts`}
            </p>
          </div>
          <button
            type="button"
            onClick={() => void handleLogout()}
            className="ml-auto rounded-md px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-100"
          >
            Log out
          </button>
        </header>
        <main className="flex-1 px-8 py-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
