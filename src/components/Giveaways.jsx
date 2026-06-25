import { useState } from 'react'
import { GIVEAWAYS } from '../data'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

export default function Giveaways() {
  const [entered, setEntered] = useState(() => new Set())

  const enter = (id) => setEntered((prev) => new Set(prev).add(id))

  return (
    <section id="giveaways" className="bg-ink-soft py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeading
          eyebrow="Win Big"
          title="Live giveaways"
          subtitle="Free to enter. Members win wheels, gear, and gift cards every week."
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {GIVEAWAYS.map((g, idx) => {
            const isIn = entered.has(g.id)
            const urgent = g.endsInDays <= 2
            return (
              <Reveal
                key={g.id}
                delay={idx * 90}
                className={`relative flex flex-col overflow-hidden rounded-3xl border p-7 ${
                  g.featured
                    ? 'border-redline/60 bg-gradient-to-br from-redline/15 to-ink-card ring-1 ring-redline/30 lg:col-span-3'
                    : 'border-white/10 bg-ink-card'
                }`}
              >
                <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-redline/20 blur-2xl" />
                <div className="relative flex items-start justify-between">
                  <span className="text-5xl">{g.emoji}</span>
                  <div className="flex items-center gap-2">
                    {g.featured && (
                      <span className="rounded-full bg-redline px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                        ⭐ Grand Prize
                      </span>
                    )}
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${
                        urgent ? 'bg-redline text-white' : 'bg-white/10 text-slate-300'
                      }`}
                    >
                      {g.endsInDays === 1 ? 'Ends today' : `Ends in ${g.endsInDays}d`}
                    </span>
                  </div>
                </div>

                <h3 className="relative mt-5 text-lg font-bold text-white">{g.prize}</h3>
                <p className="relative text-sm text-slate-400">{g.sponsor}</p>

                <div className="relative mt-4 flex items-center gap-4 text-xs text-slate-500">
                  <span>💰 Value {g.value}</span>
                  <span>🎟️ {g.entries.toLocaleString()} entries</span>
                </div>

                <button
                  onClick={() => enter(g.id)}
                  disabled={isIn}
                  className={`relative mt-6 rounded-xl px-5 py-3 font-semibold transition ${
                    isIn
                      ? 'cursor-default border border-redline/40 bg-redline/10 text-red-glow'
                      : 'bg-redline text-white hover:bg-redline-dark'
                  }`}
                >
                  {isIn ? "You're entered ✓ — good luck!" : 'Enter giveaway — free'}
                </button>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
