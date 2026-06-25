import { useMemo, useState } from 'react'
import { EVENTS, REGIONS, EVENT_TYPES } from '../data'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import HostMeetModal from './HostMeetModal'
import EventImage from './EventImage'

export default function Events() {
  const [events, setEvents] = useState(EVENTS)
  const [region, setRegion] = useState('All')
  const [type, setType] = useState('All Types')
  const [query, setQuery] = useState('')
  const [rsvped, setRsvped] = useState(() => new Set())
  const [modalOpen, setModalOpen] = useState(false)

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    return events.filter((e) => {
      if (region !== 'All' && e.region !== region) return false
      if (type !== 'All Types' && e.type !== type) return false
      if (q && !`${e.title} ${e.city} ${e.country}`.toLowerCase().includes(q))
        return false
      return true
    })
  }, [events, region, type, query])

  const toggleRsvp = (id) =>
    setRsvped((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })

  const addEvent = (event) => {
    setEvents((prev) => [event, ...prev])
    setRsvped((prev) => new Set(prev).add(event.id))
    setRegion('All')
    setType('All Types')
    setQuery('')
  }

  const field =
    'rounded-lg border border-white/15 bg-ink-card px-4 py-2.5 text-sm text-white outline-none focus:border-redline'

  return (
    <section id="events" className="mx-auto max-w-7xl px-5 py-20 sm:py-28">
      <SectionHeading
        eyebrow="Discover"
        title="Meets & events everywhere"
        subtitle="From local Cars & Coffee to Nürburgring track days. Filter by region and type, or search a city."
      />

      {/* Controls */}
      <Reveal className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="🔍 Search city, country, or meet…"
          className={`${field} w-full lg:max-w-xs`}
        />
        <div className="flex flex-wrap gap-3">
          <select value={region} onChange={(e) => setRegion(e.target.value)} className={field}>
            {REGIONS.map((r) => (
              <option key={r}>{r === 'All' ? 'All Regions' : r}</option>
            ))}
          </select>
          <select value={type} onChange={(e) => setType(e.target.value)} className={field}>
            {EVENT_TYPES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
          <button
            onClick={() => setModalOpen(true)}
            className="rounded-lg bg-redline px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-redline-dark"
          >
            + Host a Meet
          </button>
        </div>
      </Reveal>

      {/* Grid */}
      {visible.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-white/15 py-16 text-center text-slate-500">
          No meets match that. Try another region — or host your own.
        </p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((e, idx) => {
            const going = rsvped.has(e.id)
            return (
              <Reveal
                key={e.id}
                delay={(idx % 3) * 80}
                className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-ink-card transition hover:-translate-y-1 hover:border-redline/50"
              >
                <div className="carbon relative h-36 overflow-hidden">
                  <EventImage event={e} />
                  {/* Legibility overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-card via-black/30 to-black/10" />
                  <span className="absolute right-3 top-3 rounded-full bg-redline/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                    {e.tag}
                  </span>
                  <span className="absolute left-3 top-3 rounded-md bg-black/60 px-2 py-1 text-[10px] font-semibold text-slate-100 backdrop-blur-sm">
                    {e.type}
                  </span>
                  <div className="absolute bottom-3 left-3 flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black/55 text-lg backdrop-blur-sm">
                      {e.emoji}
                    </span>
                    <span className="rounded-md bg-black/55 px-2 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                      📍 {e.city}
                    </span>
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-bold text-white">{e.title}</h3>
                  <p className="mt-1 text-sm text-slate-400">📍 {e.city}</p>
                  <div className="mt-3 flex items-center gap-3 text-xs text-slate-500">
                    <span>📅 {e.date}</span>
                    <span>🕐 {e.time}</span>
                  </div>
                  <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
                    <span className="text-xs text-slate-400">
                      👥 {(e.attendees + (going && !e.mine ? 1 : 0)).toLocaleString()} going
                    </span>
                    <button
                      onClick={() => toggleRsvp(e.id)}
                      className={`rounded-lg px-4 py-1.5 text-sm font-semibold transition ${
                        going
                          ? 'bg-redline text-white'
                          : 'border border-white/15 text-white hover:bg-white/5'
                      }`}
                    >
                      {going ? "You're in ✓" : 'RSVP'}
                    </button>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      )}

      <HostMeetModal open={modalOpen} onClose={() => setModalOpen(false)} onCreate={addEvent} />
    </section>
  )
}
