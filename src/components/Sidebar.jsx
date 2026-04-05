import { useApp } from '../context/AppContext'

const nav = [
  {
    id: 'dashboard', label: 'Dashboard',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
      <rect x="3" y="3" width="7" height="7" rx="1"/>
      <rect x="14" y="3" width="7" height="7" rx="1"/>
      <rect x="3" y="14" width="7" height="7" rx="1"/>
      <rect x="14" y="14" width="7" height="7" rx="1"/>
    </svg>
  },
  {
    id: 'transactions', label: 'Transactions',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
      <rect x="2" y="5" width="20" height="14" rx="2"/>
      <line x1="2" y1="10" x2="22" y2="10"/>
    </svg>
  },
  {
    id: 'insights', label: 'Insights',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
      <polyline points="17 6 23 6 23 12"/>
    </svg>
  },
  {
    id: 'settings', label: 'Settings',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
      <circle cx="12" cy="12" r="3"/>
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
    </svg>
  },
]

export default function Sidebar() {
  const { page, setPage, sidebarOpen, setSidebarOpen, darkMode } = useApp()
  const dm = darkMode

  return (
    <>
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/30 z-20 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <aside className={`fixed top-0 left-0 h-full z-30 w-64 flex flex-col transition-transform duration-300
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        ${dm ? 'bg-[#1a1f2e] border-r border-white/10' : 'bg-white border-r border-gray-100'}
        shadow-xl lg:shadow-none`}
      >
        <div className={`flex items-center justify-between px-5 py-5 border-b ${dm ? 'border-white/10' : 'border-gray-100'}`}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center shadow-lg">
              <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
              </svg>
            </div>
            <span className={`font-bold text-lg tracking-tight ${dm ? 'text-white' : 'text-gray-900'}`}>FinanceHub</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className={`p-1.5 rounded-lg transition-colors ${dm ? 'text-gray-400 hover:bg-white/10' : 'text-gray-400 hover:bg-gray-100'}`}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {nav.map(item => {
            const active = page === item.id
            return (
              <button
                key={item.id}
                onClick={() => {
                  setPage(item.id)
                  if (window.innerWidth < 1024) setSidebarOpen(false)
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors
                  ${active
                    ? 'bg-indigo-50 text-indigo-600'
                    : dm
                      ? 'text-gray-400 hover:bg-white/5 hover:text-white'
                      : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                  }`}
              >
                <span className={active ? 'text-indigo-600' : ''}>{item.icon}</span>
                {item.label}
              </button>
            )
          })}
        </nav>
      </aside>
    </>
  )
}
