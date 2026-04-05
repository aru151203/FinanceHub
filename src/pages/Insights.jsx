import { useApp } from '../context/AppContext'
import { CATEGORY_COLORS } from '../data/transactions'

export default function Insights() {
  const { transactions, darkMode: dm } = useApp()

  const expenses = transactions.filter(t => t.type === 'expense')
  const totalIncome = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0)
  const totalExp = expenses.reduce((s, t) => s + t.amount, 0)

  const catMap = {}
  expenses.forEach(t => { catMap[t.category] = (catMap[t.category] || 0) + t.amount })
  const sorted = Object.entries(catMap).sort((a, b) => b[1] - a[1])
  const top = sorted[0]

  const aprExp = expenses.filter(t => t.date.startsWith('2026-04')).reduce((s, t) => s + t.amount, 0)
  const marExp = expenses.filter(t => t.date.startsWith('2026-03')).reduce((s, t) => s + t.amount, 0)
  const monthChange = marExp > 0 ? (((aprExp - marExp) / marExp) * 100).toFixed(1) : 0
  const savingsRate = totalIncome > 0 ? (((totalIncome - totalExp) / totalIncome) * 100).toFixed(1) : 0
  const avgDaily = Math.round(totalExp / 30)

  const fmt = v => `₹${v.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`
  const fmts = v => `₹${v.toLocaleString('en-IN')}`
  const card = `rounded-2xl p-6 border ${dm ? 'bg-[#1e2535] border-white/10' : 'bg-white border-gray-100 shadow-sm'}`

  const alerts = [
    {
      bg: dm ? 'bg-blue-500/10' : 'bg-blue-50',
      iconBg: 'bg-blue-500',
      icon: <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12" stroke="white" strokeWidth="2"/><line x1="12" y1="16" x2="12.01" y2="16" stroke="white" strokeWidth="2"/></svg>,
      title: 'Food Spending Alert',
      desc: `You spent 20% more on food this month (${fmts(catMap['Food'] || 0)}) compared to last month. Consider meal prepping to reduce dining out costs.`,
    },
    {
      bg: dm ? 'bg-emerald-500/10' : 'bg-emerald-50',
      iconBg: 'bg-emerald-500',
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-5 h-5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
      title: 'Great Saving Habit!',
      desc: `You saved ${savingsRate}% of your income this month. Keep up the excellent work!`,
    },
    {
      bg: dm ? 'bg-purple-500/10' : 'bg-purple-50',
      iconBg: 'bg-purple-500',
      icon: <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6" stroke="white" strokeWidth="2"/><line x1="8" y1="2" x2="8" y2="6" stroke="white" strokeWidth="2"/><line x1="3" y1="10" x2="21" y2="10" stroke="white" strokeWidth="2"/></svg>,
      title: 'Bill Payment Reminder',
      desc: `Your regular bills total ${fmts(catMap['Bills'] || 0)} this month. All bills have been paid on time.`,
    },
  ]

  return (
    <div className="p-6 space-y-6">
      {/* top 3 metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className={card}>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-500 flex items-center justify-center flex-shrink-0">
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-6 h-6">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
              </svg>
            </div>
            <div>
              <p className={`text-xs mb-0.5 ${dm ? 'text-gray-400' : 'text-gray-500'}`}>Highest Spending Category</p>
              <p className={`text-xl font-bold ${dm ? 'text-white' : 'text-gray-900'}`}>{top?.[0] || 'N/A'}</p>
              <p className={`text-xs mt-1 ${dm ? 'text-gray-400' : 'text-gray-500'}`}>
                You spent {fmts(top?.[1] || 0)} on {(top?.[0] || '').toLowerCase()} this month
              </p>
            </div>
          </div>
        </div>

        <div className={card}>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-orange-500 flex items-center justify-center flex-shrink-0">
              <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6">
                <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6" stroke="white" strokeWidth="2"/><line x1="8" y1="2" x2="8" y2="6" stroke="white" strokeWidth="2"/>
              </svg>
            </div>
            <div>
              <p className={`text-xs mb-0.5 ${dm ? 'text-gray-400' : 'text-gray-500'}`}>Monthly Comparison</p>
              <p className={`text-xl font-bold ${parseFloat(monthChange) > 0 ? 'text-red-500' : 'text-emerald-500'}`}>
                {parseFloat(monthChange) > 0 ? '+' : ''}{monthChange}%
              </p>
              <p className={`text-xs mt-1 ${dm ? 'text-gray-400' : 'text-gray-500'}`}>
                Your expenses {parseFloat(monthChange) > 0 ? 'increased' : 'decreased'} compared to last month
              </p>
            </div>
          </div>
        </div>

        <div className={card}>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-teal-500 flex items-center justify-center flex-shrink-0">
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-6 h-6">
                <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
              </svg>
            </div>
            <div>
              <p className={`text-xs mb-0.5 ${dm ? 'text-gray-400' : 'text-gray-500'}`}>Average Daily Spending</p>
              <p className={`text-xl font-bold ${dm ? 'text-white' : 'text-gray-900'}`}>{fmts(avgDaily)}</p>
              <p className={`text-xs mt-1 ${dm ? 'text-gray-400' : 'text-gray-500'}`}>Based on your recent transactions</p>
            </div>
          </div>
        </div>
      </div>

      {/* alerts */}
      <div className={card}>
        <h3 className={`font-bold text-base mb-4 ${dm ? 'text-white' : 'text-gray-900'}`}>Spending Insights</h3>
        <div className="space-y-3">
          {alerts.map((a, i) => (
            <div key={i} className={`flex items-start gap-4 p-4 rounded-xl ${a.bg}`}>
              <div className={`w-10 h-10 rounded-xl ${a.iconBg} flex items-center justify-center flex-shrink-0`}>{a.icon}</div>
              <div>
                <p className={`text-sm font-semibold ${dm ? 'text-white' : 'text-gray-900'}`}>{a.title}</p>
                <p className={`text-sm mt-0.5 ${dm ? 'text-gray-400' : 'text-gray-500'}`}>{a.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* category bars */}
      <div className={card}>
        <h3 className={`font-bold text-base mb-5 ${dm ? 'text-white' : 'text-gray-900'}`}>Category Breakdown</h3>
        {sorted.length === 0
          ? <p className={`text-sm text-center py-8 ${dm ? 'text-gray-500' : 'text-gray-400'}`}>No data yet</p>
          : (
            <div className="space-y-4">
              {sorted.map(([cat, val]) => {
                const pct = ((val / totalExp) * 100).toFixed(1)
                return (
                  <div key={cat}>
                    <div className="flex justify-between mb-1.5">
                      <span className={`text-sm font-medium ${dm ? 'text-white' : 'text-gray-800'}`}>{cat}</span>
                      <span className={`text-sm ${dm ? 'text-gray-400' : 'text-gray-500'}`}>{fmt(val)} ({pct}%)</span>
                    </div>
                    <div className={`h-2 rounded-full overflow-hidden ${dm ? 'bg-white/10' : 'bg-gray-100'}`}>
                      <div className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${pct}%`, backgroundColor: CATEGORY_COLORS[cat] || '#6b7280' }}/>
                    </div>
                  </div>
                )
              })}
            </div>
          )
        }
      </div>
    </div>
  )
}
