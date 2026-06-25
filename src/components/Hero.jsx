import { STAT_TICKER } from '../data'

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="glow pointer-events-none absolute inset-0" />
      <div className="absolute -top-20 left-1/2 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-redline/20 blur-[130px]" />

      <div className="relative mx-auto max-w-7xl px-5 pt-20 pb-16 text-center sm:pt-28">
        <span className="inline-flex items-center gap-2 rounded-full border border-redline/40 bg-redline/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-red-glow">
          <span className="pulse-ring inline-block h-2 w-2 rounded-full bg-redline" />
          18,000+ meets worldwide
        </span>

        <h1 className="mx-auto mt-7 max-w-4xl text-5xl font-extrabold leading-[1.03] tracking-tight text-white sm:text-6xl lg:text-7xl">
          Find your people.
          <br />
          Find your{' '}
          <span className="bg-gradient-to-r from-red-glow to-redline-dark bg-clip-text text-transparent">
            meet.
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-lg text-slate-400">
          The home base for car culture. Discover meets across every state and
          country, win giveaways, grab merch, link up in group chats, and host
          your own meets — all in one place.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#events"
            className="w-full rounded-xl bg-redline px-7 py-3.5 text-center font-semibold text-white shadow-lg shadow-redline/30 transition hover:bg-redline-dark sm:w-auto"
          >
            Explore Meets Near You
          </a>
          <a
            href="#share"
            className="w-full rounded-xl border border-white/15 px-7 py-3.5 text-center font-semibold text-white transition hover:bg-white/5 sm:w-auto"
          >
            Create Your Garage Pass
          </a>
        </div>

        <div className="mt-10 flex items-center justify-center gap-6 text-sm text-slate-500">
          <span>🌎 92 countries</span>
          <span>·</span>
          <span>🏁 50 states</span>
          <span>·</span>
          <span>👥 240k members</span>
        </div>
      </div>

      {/* Location marquee */}
      <div className="relative border-y border-white/10 bg-ink-soft py-3">
        <div className="flex w-max animate-marquee gap-10 whitespace-nowrap px-5 text-sm font-semibold uppercase tracking-widest text-slate-600">
          {[...STAT_TICKER, ...STAT_TICKER].map((c, i) => (
            <span key={i} className="flex items-center gap-10">
              {c} <span className="text-redline">●</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
