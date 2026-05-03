import { Link, useLocation } from 'react-router-dom'

export default function NavBar() {
  const { pathname } = useLocation()

  const links = [
    { to: '/wrapped', label: 'Wrapped' },
    { to: '/timeline', label: 'Timeline' },
    { to: '/visualize', label: 'Visualize' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-4 bg-[--color-surface]/80 backdrop-blur-md border-b border-[--color-border]">
      <Link to="/" className="text-sm font-semibold text-[--color-text-primary] tracking-tight">
        Reflect
      </Link>
      <div className="flex items-center gap-1">
        {links.map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            className={`text-sm px-3 py-1.5 rounded-lg transition-colors duration-150 ${
              pathname === to
                ? 'bg-stone-100 text-[--color-text-primary] font-medium'
                : 'text-[--color-text-secondary] hover:text-[--color-text-primary] hover:bg-stone-50'
            }`}
          >
            {label}
          </Link>
        ))}
      </div>
    </nav>
  )
}
