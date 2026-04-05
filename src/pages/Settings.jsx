import { useState } from 'react'
import { useApp } from '../context/AppContext'

function Toggle({ on, onChange }) {
  return (
    <button onClick={() => onChange(!on)}
      className={`relative inline-flex w-12 h-6 rounded-full transition-colors ${on ? 'bg-indigo-600' : 'bg-gray-300'}`}>
      <span className={`inline-block w-5 h-5 mt-0.5 ml-0.5 rounded-full bg-white shadow transition-transform ${on ? 'translate-x-6' : ''}`}/>
    </button>
  )
}

export default function Settings() {
  const { darkMode, setDarkMode } = useApp()
  const dm = darkMode
  const [name, setName] = useState('John Doe')
  const [email, setEmail] = useState('john.doe@example.com')
  const [notifs, setNotifs] = useState({ email: true, push: false, sms: false })
  const [saved, setSaved] = useState(false)

  const inp = `w-full px-4 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-indigo-300
    ${dm ? 'bg-[#141824] border-white/10 text-white' : 'bg-white border-gray-200 text-gray-900'}`
  const card = `rounded-2xl p-6 border ${dm ? 'bg-[#1e2535] border-white/10' : 'bg-white border-gray-100 shadow-sm'}`
  const lbl = `block text-sm font-medium mb-1.5 ${dm ? 'text-gray-300' : 'text-gray-700'}`
  const title = `font-bold text-base ${dm ? 'text-white' : 'text-gray-900'}`
  const sub = `text-xs mt-0.5 ${dm ? 'text-gray-400' : 'text-gray-500'}`

  function handleSave() {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="p-6 space-y-5 max-w-2xl">

      {/* profile */}
      <div className={card}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5"><path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/></svg>
          </div>
          <h3 className={title}>Profile Settings</h3>
        </div>
        <div className="space-y-4">
          <div>
            <label className={lbl}>Full Name</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} className={inp}/>
          </div>
          <div>
            <label className={lbl}>Email Address</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} className={inp}/>
          </div>
          <button onClick={handleSave}
            className={`px-6 py-2.5 rounded-xl text-sm font-medium transition-all
              ${saved ? 'bg-emerald-500 text-white' : 'bg-indigo-600 hover:bg-indigo-700 text-white'}`}>
            {saved ? '✓ Saved!' : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* appearance */}
      <div className={card}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-purple-500 flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-5 h-5"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
          </div>
          <h3 className={title}>Appearance</h3>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className={`text-sm font-medium ${dm ? 'text-white' : 'text-gray-900'}`}>Theme</p>
            <p className={sub}>Choose your preferred color scheme</p>
          </div>
          <button onClick={() => setDarkMode(!dm)}
            className={`px-4 py-2 rounded-xl text-sm font-medium border
              ${dm ? 'bg-[#141824] border-white/10 text-gray-300' : 'bg-gray-50 border-gray-200 text-gray-700'}`}>
            {dm ? 'Dark Mode' : 'Light Mode'}
          </button>
        </div>
      </div>

      {/* notifications */}
      <div className={card}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-teal-500 flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-5 h-5"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0"/></svg>
          </div>
          <h3 className={title}>Notifications</h3>
        </div>
        <div className="space-y-5">
          {[
            { key: 'email', label: 'Email Notifications', desc: 'Receive updates via email' },
            { key: 'push',  label: 'Push Notifications',  desc: 'Receive push notifications' },
            { key: 'sms',   label: 'SMS Notifications',   desc: 'Receive updates via SMS' },
          ].map(({ key, label, desc }) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${dm ? 'text-white' : 'text-gray-900'}`}>{label}</p>
                <p className={sub}>{desc}</p>
              </div>
              <Toggle on={notifs[key]} onChange={v => setNotifs({ ...notifs, [key]: v })}/>
            </div>
          ))}
        </div>
      </div>

      {/* security */}
      <div className={card}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-red-500 flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-5 h-5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          </div>
          <h3 className={title}>Security</h3>
        </div>
        <div className="flex flex-wrap gap-3">
          {['Change Password', 'Enable Two-Factor Authentication'].map(label => (
            <button key={label}
              className={`px-4 py-2 rounded-xl text-sm font-medium border transition-colors
                ${dm ? 'border-teal-400/30 text-teal-400 hover:bg-teal-400/10' : 'border-teal-200 text-teal-600 hover:bg-teal-50'}`}>
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* payment */}
      <div className={card}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-5 h-5"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
          </div>
          <h3 className={title}>Payment Methods</h3>
        </div>
        <div className={`flex items-center justify-between p-4 rounded-xl border mb-4
          ${dm ? 'border-white/10 bg-white/5' : 'border-gray-100 bg-gray-50'}`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-7 rounded bg-indigo-600 flex items-center justify-center">
              <span className="text-white text-xs font-bold">VISA</span>
            </div>
            <div>
              <p className={`text-sm font-medium ${dm ? 'text-white' : 'text-gray-900'}`}>•••• 4242</p>
              <p className={sub}>Expires 12/25</p>
            </div>
          </div>
          <button className={`text-sm ${dm ? 'text-red-400' : 'text-red-500'}`}>Remove</button>
        </div>
        <button className={`text-sm font-medium px-4 py-2 rounded-xl border
          ${dm ? 'border-teal-400/30 text-teal-400 hover:bg-teal-400/10' : 'border-teal-200 text-teal-600 hover:bg-teal-50'}`}>
          Add New Card
        </button>
      </div>

    </div>
  )
}
