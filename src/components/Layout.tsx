import { NavLink, Outlet } from 'react-router-dom'

const navItems = [
  { to: '/', label: 'Dashboard', end: true },
  { to: '/posts', label: 'Posts' },
  { to: '/comments', label: 'Comments' },
  { to: '/messages', label: 'Messages' },
]

export function Layout() {
  return (
    <div className="flex min-h-screen bg-blue-50 text-blue-900">
      <aside className="w-56 shrink-0 border-r border-blue-200 bg-blue-100">
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
      <main className="flex-1 px-8 py-6">
        <Outlet />
      </main>
    </div>
  )
}
