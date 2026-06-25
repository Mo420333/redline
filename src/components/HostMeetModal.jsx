import { useState } from 'react'
import { REGIONS, EVENT_TYPES } from '../data'

const TYPE_EMOJI = {
  'Cars & Coffee': '☕',
  Cruise: '🌙',
  'Car Show': '🏆',
  'Track Day': '🏁',
}

export default function HostMeetModal({ open, onClose, onCreate }) {
  const [form, setForm] = useState({
    title: '',
    type: 'Cars & Coffee',
    city: '',
    region: 'West',
    date: '',
    time: '',
  })

  if (!open) return null

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const submit = (e) => {
    e.preventDefault()
    if (!form.title.trim() || !form.city.trim()) return
    onCreate({
      id: `user-${Date.now()}`,
      title: form.title.trim(),
      type: form.type,
      city: form.city.trim(),
      region: form.region,
      country: '—',
      date: form.date || 'TBD',
      time: form.time || 'TBD',
      attendees: 1,
      emoji: TYPE_EMOJI[form.type] || '🚗',
      tag: 'Yours',
      mine: true,
    })
    setForm({ title: '', type: 'Cars & Coffee', city: '', region: 'West', date: '', time: '' })
    onClose()
  }

  const field =
    'w-full rounded-lg border border-white/15 bg-ink-soft px-4 py-2.5 text-white outline-none placeholder:text-slate-500 focus:border-redline focus:ring-2 focus:ring-redline/20'

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-2xl border border-white/10 bg-ink-card p-7 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-white">Host your own meet 🏁</h3>
          <button onClick={onClose} className="text-2xl text-slate-500 hover:text-white" aria-label="Close">
            ×
          </button>
        </div>
        <p className="mt-1 text-sm text-slate-400">
          Set it up, then invite everyone you’ve met.
        </p>

        <form onSubmit={submit} className="mt-6 space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-400">
              Meet name
            </label>
            <input className={field} placeholder="e.g. Friday Night Cars & Coffee" value={form.title} onChange={set('title')} required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-400">Type</label>
              <select className={field} value={form.type} onChange={set('type')}>
                {EVENT_TYPES.filter((t) => t !== 'All Types').map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-400">Region</label>
              <select className={field} value={form.region} onChange={set('region')}>
                {REGIONS.filter((r) => r !== 'All').map((r) => (
                  <option key={r}>{r}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-400">City</label>
            <input className={field} placeholder="e.g. Phoenix, AZ" value={form.city} onChange={set('city')} required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-400">Date</label>
              <input className={field} placeholder="e.g. Aug 15" value={form.date} onChange={set('date')} />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-400">Time</label>
              <input className={field} placeholder="e.g. 7:00 PM" value={form.time} onChange={set('time')} />
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-redline px-5 py-3 font-semibold text-white transition hover:bg-redline-dark"
          >
            Create meet & invite crew
          </button>
        </form>
      </div>
    </div>
  )
}
