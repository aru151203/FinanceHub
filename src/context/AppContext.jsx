import { createContext, useContext, useState, useEffect } from 'react'
import { initialTransactions } from '../data/transactions'

const AppContext = createContext()

function loadTransactions() {
  try {
    const saved = localStorage.getItem('fh_transactions')
    if (!saved) return initialTransactions
    const parsed = JSON.parse(saved)
    // sanity check - make sure it's an array with valid items
    if (!Array.isArray(parsed) || parsed.length === 0) return initialTransactions
    if (!parsed[0].id || !parsed[0].description) return initialTransactions
    return parsed
  } catch {
    return initialTransactions
  }
}

export function AppProvider({ children }) {
  const [role, setRole] = useState(localStorage.getItem('fh_role') || 'Admin')
  const [darkMode, setDarkMode] = useState(localStorage.getItem('fh_dark') === 'true')
  const [transactions, setTransactions] = useState(loadTransactions)
  const [page, setPage] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(true)

  useEffect(() => { localStorage.setItem('fh_role', role) }, [role])
  useEffect(() => { localStorage.setItem('fh_dark', darkMode) }, [darkMode])
  useEffect(() => { localStorage.setItem('fh_transactions', JSON.stringify(transactions)) }, [transactions])

  function addTx(tx) {
    setTransactions(prev => [{ ...tx, id: Date.now(), amount: parseFloat(tx.amount) }, ...prev])
  }

  function editTx(id, data) {
    setTransactions(prev =>
      prev.map(t => t.id === id ? { ...t, ...data, amount: parseFloat(data.amount) } : t)
    )
  }

  function deleteTx(id) {
    setTransactions(prev => prev.filter(t => t.id !== id))
  }

  return (
    <AppContext.Provider value={{
      role, setRole,
      darkMode, setDarkMode,
      transactions, addTx, editTx, deleteTx,
      page, setPage,
      sidebarOpen, setSidebarOpen,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => useContext(AppContext)
