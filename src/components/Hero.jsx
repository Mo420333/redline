import { useEffect, useState } from 'react'
import { STAT_TICKER } from '../data'
import { fetchUnsplash, photoApiEnabled } from '../lib/carImage'

const FALLBACK = 'https://loremflickr.com/1600/900/pagani,hypercar?lock=7'

export default function Hero() {
  const [src, setSrc] = useState(FALLBACK)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    let active = true
    if (photoApiEnabled) {
      fetchUnsplash('Pagani Huayra hypercar').then((u) => {
        if (active && u) setSrc(u)
      })
    }
    return () => {
      active = false
    }
  }, [])

  return (
    <section id="top" className="relative overflow-hidden">
      {/* Pagani background */}
      {!failed && (
        <img
          src={src}
          alt="Pagani hypercar"
          onError={() => setFailed(true)}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
      {/* Cinematic overlays for legibility + brand tint */}
      <div className="absolute inset-0 bg-ink/60" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-ink/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-redline/15 via-transparent to-electric/15" />
      <div className="pointer-events-none absolute -top-24 left-1/3 h-80 w-[34rem] -translate-x-1/2 rounded-full bg-redline/25 blur-[140px]" />
      <div className="pointer-events-none absolute -top-10 right-1/4 h-72 w-80 rounded-full bg-electric/20 blur-[130px]" />

      <div className="relative mx-auto max-w-7xl px-5 pt-24 pb-20 text-center sm:pt-36 sm:pb-32">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/30 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-slate-200 backdrop-blur-sm">
          <span className="inline-block h-2 w-2 rounded-full bg-redline" />
          18,000+ meets worldwide
        </span>

        <h1 className="mx-auto mt-7 max-w-4xl text-5xl font-extrabold leading-[1.02] tracking-tight text-white drop-shadow-2xl sm:text-6xl lg:text-7xl">
          Find your people.
          <br />
          Find your{' '}
          <span className="bg-gradient-to-r from-red-glow via-redline to-electric bg-clip-text text-transparent">
            meet.
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-lg text-slate-200/90 drop-shadow">
          The home base for car culture. Discover meets across every state and
          country, win giveaways, grab merch, link up in group chats, and host
          your own meets — all in one place.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#events"
            className="w-full rounded-xl bg-redline px-7 py-3.5 text-center font-semibold text-white shadow-lg shadow-redline/40 transition hover:bg-redline-dark sm:w-auto"
          >
            Explore Meets Near You
          </a>
          <a
            href="#share"
            className="w-full rounded-xl border border-white/25 bg-white/5 px-7 py-3.5 text-center font-semibold text-white backdrop-blur-sm transition hover:bg-white/10 sm:w-auto"
          >
            Create Your Garage Pass
          </a>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-300">
          <span>🌎 92 countries</span>
          <span className="text-slate-600">·</span>
          <span>🏁 50 states</span>
          <span className="text-slate-600">·</span>
          <span>👥 240k members</span>
        </div>
      </div>

      {/* Location marquee */}
      <div className="relative border-y border-white/10 bg-ink/80 py-3 backdrop-blur-sm">
        <div className="flex w-max animate-marquee gap-8 whitespace-nowrap px-5 text-sm font-semibold uppercase tracking-widest text-slate-500">
          {[...STAT_TICKER, ...STAT_TICKER].map((t, i) => (
            <span key={i} className="flex items-center gap-8">
              {t} <span className={i % 2 ? 'text-electric' : 'text-redline'}>●</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
