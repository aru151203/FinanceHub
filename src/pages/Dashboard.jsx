import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { balanceTrend, CATEGORY_COLORS } from '../data/transactions'

function SummaryCard({ label, value, icon, change, up, iconBg }) {
  const { darkMode: dm } = useApp()
  return (
    <div className={`rounded-2xl p-6 flex items-start justify-between border
      ${dm ? 'bg-[#1e2535] border-white/10' : 'bg-white border-gray-100 shadow-sm'}`}>
      <div>
        <p className={`text-sm mb-1 ${dm ? 'text-gray-400' : 'text-gray-500'}`}>{label}</p>
        <p className={`text-2xl font-bold tracking-tight ${dm ? 'text-white' : 'text-gray-900'}`}>{value}</p>
        <p className={`text-xs mt-1 font-medium ${up ? 'text-emerald-500' : 'text-red-500'}`}>
          {up ? '↗' : '↘'} {change}
        </p>
      </div>
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg ${iconBg}`}>
        {icon}
      </div>
    </div>
  )
}

function LineChart() {
  const { darkMode: dm } = useApp()
  const [tooltip, setTooltip] = useState(null)

  const W = 500, H = 220, pl = 55, pr = 20, pt = 20, pb = 40
  const cW = W - pl - pr
  const cH = H - pt - pb
  const max = Math.max(...balanceTrend.map(d => d.balance))
  const min = Math.min(...balanceTrend.map(d => d.balance))
  const range = max - min || 1

  const x = i => pl + (i / (balanceTrend.length - 1)) * cW
  const y = v => pt + cH - ((v - min) / range) * cH
  const fmt = v => `₹${(v / 100000).toFixed(0)}L`

  const line = balanceTrend.map((d, i) => `${i === 0 ? 'M' : 'L'} ${x(i)} ${y(d.balance)}`).join(' ')
  const area = `${line} L ${x(balanceTrend.length - 1)} ${pt + cH} L ${pl} ${pt + cH} Z`
  const grids = [0, 400000, 800000, 1200000, 1600000]

  return (
    <div className={`rounded-2xl p-6 border ${dm ? 'bg-[#1e2535] border-white/10' : 'bg-white border-gray-100 shadow-sm'}`}>
      <h3 className={`font-bold text-base mb-4 ${dm ? 'text-white' : 'text-gray-900'}`}>Balance Trend</h3>
      <div className="relative w-full" style={{ paddingBottom: '44%' }}>
        <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.18"/>
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0"/>
            </linearGradient>
          </defs>

          {grids.map(v => {
            if (v < min - range * 0.1 || v > max + range * 0.1) return null
            return (
              <g key={v}>
                <line x1={pl} y1={y(v)} x2={W - pr} y2={y(v)}
                  stroke={dm ? '#ffffff18' : '#e5e7eb'} strokeWidth="1" strokeDasharray="4,4"/>
                <text x={pl - 6} y={y(v) + 4} textAnchor="end" fontSize="10" fill={dm ? '#6b7280' : '#9ca3af'}>{fmt(v)}</text>
              </g>
            )
          })}

          <path d={area} fill="url(#grad)"/>
          <path d={line} fill="none" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>

          {balanceTrend.map((d, i) => (
            <g key={i}>
              <circle cx={x(i)} cy={y(d.balance)} r="4" fill="#6366f1" stroke="white" strokeWidth="2"/>
              <rect x={x(i) - 30} y={pt} width="60" height={cH} fill="transparent"
                onMouseEnter={() => setTooltip({ d, x: x(i), y: y(d.balance) })}
                onMouseLeave={() => setTooltip(null)}
              />
            </g>
          ))}

          {balanceTrend.map((d, i) => (
            <text key={i} x={x(i)} y={H - 8} textAnchor="middle" fontSize="11" fill={dm ? '#6b7280' : '#9ca3af'}>{d.month}</text>
          ))}

          {tooltip && (() => {
            const tx = Math.min(Math.max(tooltip.x - 55, 5), W - 115)
            const ty = Math.max(tooltip.y - 52, 5)
            return (
              <g>
                <rect x={tx} y={ty} width="110" height="40" rx="8"
                  fill={dm ? '#1e2535' : 'white'} stroke="#e5e7eb" strokeWidth="1"
                  style={{ filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.15))' }}/>
                <text x={tx + 55} y={ty + 14} textAnchor="middle" fontSize="11" fill={dm ? '#9ca3af' : '#6b7280'}>
                  {tooltip.d.month}
                </text>
                <text x={tx + 55} y={ty + 30} textAnchor="middle" fontSize="12" fontWeight="600" fill="#6366f1">
                  Balance: {fmt(tooltip.d.balance)}
                </text>
              </g>
            )
          })()}
        </svg>
      </div>
    </div>
  )
}

function DonutChart({ data }) {
  const { darkMode: dm } = useApp()
  const [hovered, setHovered] = useState(null)

  const total = data.reduce((s, d) => s + d.value, 0)
  const CX = 100, CY = 100, R = 75, IR = 48
  let angle = -Math.PI / 2

  const slices = data.map(d => {
    const a = (d.value / total) * 2 * Math.PI
    const x1 = CX + R * Math.cos(angle), y1 = CY + R * Math.sin(angle)
    const x2 = CX + R * Math.cos(angle + a), y2 = CY + R * Math.sin(angle + a)
    const ix1 = CX + IR * Math.cos(angle), iy1 = CY + IR * Math.sin(angle)
    const ix2 = CX + IR * Math.cos(angle + a), iy2 = CY + IR * Math.sin(angle + a)
    const lg = a > Math.PI ? 1 : 0
    const path = `M ${ix1} ${iy1} L ${x1} ${y1} A ${R} ${R} 0 ${lg} 1 ${x2} ${y2} L ${ix2} ${iy2} A ${IR} ${IR} 0 ${lg} 0 ${ix1} ${iy1} Z`
    const mid = angle + a / 2
    const s = { ...d, path, mid, startAngle: angle }
    angle += a
    return s
  })

  const fmt = v => `₹${v.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`

  return (
    <div className={`rounded-2xl p-6 border ${dm ? 'bg-[#1e2535] border-white/10' : 'bg-white border-gray-100 shadow-sm'}`}>
      <h3 className={`font-bold text-base mb-4 ${dm ? 'text-white' : 'text-gray-900'}`}>Spending by Category</h3>
      <div className="flex flex-col items-center">
        <svg viewBox="0 0 200 200" width="200" height="200">
          {slices.map((s, i) => {
            const scale = hovered === i ? 1.04 : 1
            const mx = CX + (R + IR) / 2 * Math.cos(s.startAngle + (s.value / total) * Math.PI)
            const my = CY + (R + IR) / 2 * Math.sin(s.startAngle + (s.value / total) * Math.PI)
            return (
              <path key={i} d={s.path} fill={s.color}
                stroke={dm ? '#1e2535' : 'white'} strokeWidth="2"
                style={{ transform: `scale(${scale})`, transformOrigin: `${mx}px ${my}px`, transition: 'transform 0.15s', cursor: 'pointer' }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              />
            )
          })}
          {hovered !== null && (
            <g>
              <rect x={CX - 60} y={CY - 20} width="120" height="38" rx="8"
                fill={dm ? '#0f1420' : 'white'} stroke="#e5e7eb" strokeWidth="1"
                style={{ filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.15))' }}/>
              <text x={CX} y={CY - 4} textAnchor="middle" fontSize="11" fontWeight="600"
                fill={dm ? '#d1d5db' : '#374151'}>{slices[hovered]?.label}</text>
              <text x={CX} y={CY + 12} textAnchor="middle" fontSize="11" fill={slices[hovered]?.color}>
                {fmt(slices[hovered]?.value)}
              </text>
            </g>
          )}
        </svg>

        <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 mt-2 w-full">
          {data.map((d, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: d.color }}/>
              <span className={`text-xs truncate ${dm ? 'text-gray-400' : 'text-gray-500'}`}>
                {d.label} ({fmt(d.value)})
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Dashboard() {
  const { transactions, darkMode: dm } = useApp()

  const income = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0)
  const expenses = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0)
  const fmt = v => `₹${v.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`

  const catMap = {}
  transactions.filter(t => t.type === 'expense').forEach(t => {
    catMap[t.category] = (catMap[t.category] || 0) + t.amount
  })
  const donutData = Object.entries(catMap)
    .map(([label, value]) => ({ label, value, color: CATEGORY_COLORS[label] || '#6b7280' }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 7)

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <SummaryCard label="Total Balance" value={fmt(1570000)} change="3.9% from last month" up={true} iconBg="bg-indigo-500"
          icon={<svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-6 h-6"><path d="M3 22V9m6 13V9m6 13V9m6 13V9M1 9l11-7 11 7H1zM21 22H3"/></svg>}
        />
        <SummaryCard label="Total Income" value={fmt(income)} change="2.5% from last month" up={true} iconBg="bg-emerald-500"
          icon={<svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-6 h-6"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>}
        />
        <SummaryCard label="Total Expenses" value={fmt(expenses)} change="1.2% from last month" up={false} iconBg="bg-red-500"
          icon={<svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-6 h-6"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/></svg>}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LineChart />
        <DonutChart data={donutData} />
      </div>
    </div>
  )
}
