import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { CATEGORIES } from '../data/transactions'

function Badge({ type }) {
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold
      ${type === 'income' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-600'}`}>
      {type}
    </span>
  )
}

function Modal({ tx, onClose, onSave }) {
  const { darkMode: dm } = useApp()
  const [form, setForm] = useState({
    date: tx?.date || new Date().toISOString().split('T')[0],
    description: tx?.description || '',
    category: tx?.category || 'Food',
    type: tx?.type || 'expense',
    amount: tx?.amount || '',
  })

  const inp = `w-full px-3 py-2 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-indigo-400
    ${dm ? 'bg-[#141824] border-[#ffffff1a] text-white' : 'bg-gray-50 border-gray-200 text-gray-900'}`

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className={`w-full max-w-md rounded-2xl p-6 shadow-2xl ${dm ? 'bg-[#1e2535]' : 'bg-white'}`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-lg font-bold ${dm ? 'text-white' : 'text-gray-900'}`}>
            {tx ? 'Edit Transaction' : 'Add Transaction'}
          </h2>
          <button onClick={onClose} className={`p-1.5 rounded-lg ${dm ? 'text-gray-400 hover:bg-white/10' : 'text-gray-400 hover:bg-gray-100'}`}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className={`block text-xs font-medium mb-1 ${dm ? 'text-gray-400' : 'text-gray-600'}`}>Date</label>
            <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} className={inp} />
          </div>
          <div>
            <label className={`block text-xs font-medium mb-1 ${dm ? 'text-gray-400' : 'text-gray-600'}`}>Description</label>
            <input type="text" value={form.description} placeholder="e.g. Grocery Shopping"
              onChange={e => setForm({ ...form, description: e.target.value })} className={inp} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={`block text-xs font-medium mb-1 ${dm ? 'text-gray-400' : 'text-gray-600'}`}>Category</label>
              <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className={inp}>
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className={`block text-xs font-medium mb-1 ${dm ? 'text-gray-400' : 'text-gray-600'}`}>Type</label>
              <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} className={inp}>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>
          </div>
          <div>
            <label className={`block text-xs font-medium mb-1 ${dm ? 'text-gray-400' : 'text-gray-600'}`}>Amount (₹)</label>
            <input type="number" value={form.amount} placeholder="0.00"
              onChange={e => setForm({ ...form, amount: e.target.value })} className={inp} />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button onClick={onClose}
            className={`flex-1 py-2.5 rounded-xl text-sm font-medium border
              ${dm ? 'border-white/10 text-gray-300 hover:bg-white/5' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
            Cancel
          </button>
          <button
            onClick={() => {
              if (!form.description || !form.amount) return
              onSave(form)
              onClose()
            }}
            className="flex-1 py-2.5 rounded-xl text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700"
          >
            {tx ? 'Save Changes' : 'Add Transaction'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Transactions() {
  const { transactions, role, darkMode: dm, addTx, editTx, deleteTx } = useApp()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All Categories')
  const [typeFilter, setTypeFilter] = useState('All')
  const [sortBy, setSortBy] = useState('date')
  const [modal, setModal] = useState(null)

  const isAdmin = role === 'Admin'
  const fmt = v => Number(v).toLocaleString('en-IN', { minimumFractionDigits: 2 })
 const fmtDate = d => {
  const date = new Date(d)
  if (isNaN(date)) return d
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

  let list = transactions.filter(t => {
    const q = search.toLowerCase()
    const matchQ = t.description.toLowerCase().includes(q) || t.category.toLowerCase().includes(q)
    const matchCat = category === 'All Categories' || t.category === category
    const matchType = typeFilter === 'All' || t.type === typeFilter.toLowerCase()
    return matchQ && matchCat && matchType
  })

  if (sortBy === 'date') list.sort((a, b) => new Date(b.date) - new Date(a.date))
  if (sortBy === 'amount') list.sort((a, b) => b.amount - a.amount)

  const inp = `px-4 py-2.5 rounded-xl border text-sm outline-none
    ${dm ? 'bg-[#1e2535] border-[#ffffff1a] text-white' : 'bg-white border-gray-200 text-gray-700'}`

  return (
    <div className="p-6">
      <div className={`rounded-2xl border ${dm ? 'bg-[#1e2535] border-[#ffffff1a]' : 'bg-white border-gray-100 shadow-sm'}`}>

        {/* filters */}
        <div className={`p-5 flex flex-wrap gap-3 items-center border-b ${dm ? 'border-[#ffffff1a]' : 'border-gray-100'}`}>
          <div className="relative flex-1 min-w-48">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${dm ? 'text-gray-500' : 'text-gray-400'}`}>
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              type="text"
              placeholder="Search transactions..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className={`${inp} pl-9 w-full`}
            />
          </div>

          <div className="relative">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${dm ? 'text-gray-500' : 'text-gray-400'}`}>
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
            </svg>
            <select value={category} onChange={e => setCategory(e.target.value)} className={`${inp} pl-9 pr-8`}>
              <option>All Categories</option>
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>

          <div className={`flex rounded-xl border overflow-hidden ${dm ? 'border-[#ffffff1a]' : 'border-gray-200'}`}>
            {['All', 'Income', 'Expense'].map(t => (
              <button key={t} onClick={() => setTypeFilter(t)}
                className={`px-4 py-2 text-sm font-medium transition-colors
                  ${typeFilter === t
                    ? 'bg-indigo-600 text-white'
                    : dm ? 'text-gray-400 hover:bg-white/5 bg-[#1e2535]' : 'text-gray-600 hover:bg-gray-50 bg-white'}`}>
                {t}
              </button>
            ))}
          </div>

          {isAdmin && (
            <button
              onClick={() => setModal('add')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
                <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              Add Transaction
            </button>
          )}
        </div>

        {/* table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={`text-xs font-semibold uppercase tracking-wide ${dm ? 'text-gray-500' : 'text-gray-400'}`}>
                <th className="px-6 py-3 text-left cursor-pointer select-none hover:text-indigo-500"
                  onClick={() => setSortBy('date')}>
                  Date {sortBy === 'date' && '↓'}
                </th>
                <th className="px-6 py-3 text-left">Description</th>
                <th className="px-6 py-3 text-left">Category</th>
                <th className="px-6 py-3 text-left">Type</th>
                <th className="px-6 py-3 text-right cursor-pointer select-none hover:text-indigo-500"
                  onClick={() => setSortBy('amount')}>
                  Amount {sortBy === 'amount' && '↓'}
                </th>
                {isAdmin && <th className="px-6 py-3 text-right">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {list.length === 0 ? (
                <tr>
                  <td colSpan={isAdmin ? 6 : 5} className="py-16 text-center">
                    <p className={`text-sm ${dm ? 'text-gray-500' : 'text-gray-400'}`}>No transactions found</p>
                  </td>
                </tr>
              ) : list.map(tx => (
                <tr key={tx.id} className={`border-t ${dm ? 'border-white/5 hover:bg-white/[0.03]' : 'border-gray-50 hover:bg-gray-50/50'}`}>
                  <td className={`px-6 py-4 text-sm ${dm ? 'text-gray-400' : 'text-gray-500'}`}>{fmtDate(tx.date)}</td>
                  <td className={`px-6 py-4 text-sm font-semibold ${dm ? 'text-white' : 'text-gray-900'}`}>{tx.description}</td>
                  <td className={`px-6 py-4 text-sm ${dm ? 'text-gray-400' : 'text-gray-500'}`}>{tx.category}</td>
                  <td className="px-6 py-4"><Badge type={tx.type} /></td>
                  <td className={`px-6 py-4 text-sm font-semibold text-right ${tx.type === 'income' ? 'text-emerald-500' : 'text-red-500'}`}>
                    {tx.type === 'income' ? '+' : '-'}₹{fmt(tx.amount)}
                  </td>
                  {isAdmin && (
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => setModal(tx)}
                          className={`p-1.5 rounded-lg ${dm ? 'text-gray-400 hover:bg-white/10' : 'text-gray-400 hover:bg-gray-100'}`}>
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                          </svg>
                        </button>
                        <button onClick={() => deleteTx(tx.id)}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                            <polyline points="3 6 5 6 21 6"/>
                            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                            <path d="M10 11v6M14 11v6M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                          </svg>
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modal === 'add' && <Modal onClose={() => setModal(null)} onSave={addTx} />}
      {modal && modal !== 'add' && (
        <Modal tx={modal} onClose={() => setModal(null)} onSave={data => editTx(modal.id, data)} />
      )}
    </div>
  )
}
