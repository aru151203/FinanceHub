import { Component } from 'react'
import { AppProvider, useApp } from './context/AppContext'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import Dashboard from './pages/Dashboard'
import Transactions from './pages/Transactions'
import Insights from './pages/Insights'
import Settings from './pages/Settings'

// catches render crashes and shows an error instead of blank screen
class ErrorBoundary extends Component {
  state = { error: null }

  static getDerivedStateFromError(err) {
    return { error: err.message }
  }

  render() {
    if (this.state.error) {
      return (
        <div className="flex flex-col items-center justify-center h-64 gap-3 p-8">
          <p className="text-red-500 font-semibold">Something went wrong</p>
          <p className="text-gray-400 text-sm text-center">{this.state.error}</p>
          <button
            onClick={() => {
              localStorage.removeItem('fh_transactions')
              window.location.reload()
            }}
            className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm mt-2"
          >
            Reset & Reload
          </button>
        </div>
      )
    }
    return this.props.children
  }
}

function Layout() {
  const { page, darkMode, sidebarOpen } = useApp()

  const pages = {
    dashboard: <Dashboard />,
    transactions: <Transactions />,
    insights: <Insights />,
    settings: <Settings />,
  }

  return (
    <div className={`min-h-screen flex ${darkMode ? 'bg-[#141824]' : 'bg-[#f8f9fc]'}`}>
      <Sidebar />
      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : ''}`}>
        <Topbar />
        <main className="flex-1 overflow-y-auto">
          <ErrorBoundary key={page}>
            {pages[page]}
          </ErrorBoundary>
        </main>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <AppProvider>
      <Layout />
    </AppProvider>
  )
}
