import { useState } from 'react'
import { useApp } from '../context/AppContext'

const titles = { dashboard: 'Dashboard', transactions: 'Transactions', insights: 'Insights', settings: 'Settings' }

export default function Topbar() {
  const { role, setRole, darkMode, setDarkMode, page, sidebarOpen, setSidebarOpen } = useApp()
  const [open, setOpen] = useState(false)
  const dm = darkMode

  return (
    <header className={`flex items-center justify-between px-6 py-4 border-b sticky top-0 z-10
      ${dm ? 'bg-[#141824] border-white/10' : 'bg-white border-gray-100'}`}
    >
      <div className="flex items-center gap-4">
        {!sidebarOpen && (
          <button
            onClick={() => setSidebarOpen(true)}
            className={`p-2 rounded-lg transition-colors ${dm ? 'text-gray-400 hover:bg-white/10' : 'text-gray-500 hover:bg-gray-100'}`}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
              <line x1="3" y1="6" x2="21" y2="6"/>
              <line x1="3" y1="12" x2="21" y2="12"/>
              <line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>
        )}
        <h1 className={`text-xl font-bold ${dm ? 'text-white' : 'text-gray-900'}`}>{titles[page]}</h1>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => setDarkMode(!dm)}
          className={`p-2 rounded-lg transition-colors ${dm ? 'text-yellow-400 hover:bg-white/10' : 'text-gray-500 hover:bg-gray-100'}`}
        >
          {dm ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
              <circle cx="12" cy="12" r="5"/>
              <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
              <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
          )}
        </button>

        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border
              ${dm ? 'bg-[#1e2535] border-white/10 text-white' : 'bg-gray-50 border-gray-200 text-gray-700'}`}
          >
            {role}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </button>

          {open && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
              <div className={`absolute right-0 mt-2 w-36 rounded-xl shadow-lg border z-50 overflow-hidden
                ${dm ? 'bg-[#1e2535] border-white/10' : 'bg-white border-gray-100'}`}
              >
                {['Viewer', 'Admin'].map(r => (
                  <button
                    key={r}
                    onClick={() => { setRole(r); setOpen(false) }}
                    className={`w-full text-left px-4 py-3 text-sm transition-colors
                      ${role === r
                        ? dm ? 'text-indigo-400 bg-indigo-500/10' : 'text-indigo-600 bg-indigo-50'
                        : dm ? 'text-gray-300 hover:bg-white/5' : 'text-gray-700 hover:bg-gray-50'
                      }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center cursor-pointer">
          <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
            <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
          </svg>
        </div>
      </div>
    </header>
  )
}
