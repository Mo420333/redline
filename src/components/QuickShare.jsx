import { useState } from 'react'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import ScanCode from './ScanCode'
import RedlineLogo from './RedlineLogo'

export default function QuickShare() {
  const [profile, setProfile] = useState({
    name: 'Your Name',
    car: '2000 Honda S2000',
    handle: '@your_garage',
  })
  const [copied, setCopied] = useState(false)

  const set = (k) => (e) => setProfile((p) => ({ ...p, [k]: e.target.value }))

  const shareUrl = `https://redline.app/u/${profile.handle.replace(/^@/, '') || 'driver'}`

  const share = async () => {
    const payload = {
      title: `${profile.name} on Redline`,
      text: `${profile.name} · ${profile.car} · ${profile.handle}`,
      url: shareUrl,
    }
    try {
      if (navigator.share) {
        await navigator.share(payload)
        return
      }
      await navigator.clipboard.writeText(`${payload.text} — ${shareUrl}`)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      /* user cancelled */
    }
  }

  const field =
    'w-full rounded-lg border border-white/15 bg-ink-soft px-4 py-2.5 text-white outline-none placeholder:text-slate-500 focus:border-redline focus:ring-2 focus:ring-redline/20'

  return (
    <section id="share" className="mx-auto max-w-7xl px-5 py-20 sm:py-28">
      <SectionHeading
        eyebrow="Met Someone Cool?"
        title="Swap info in one tap"
        subtitle="Your Garage Pass holds your name, your build, and your socials. Let someone scan the code or hit share — no typing numbers at the meet."
      />

      <div className="grid items-center gap-10 lg:grid-cols-2">
        {/* Editor */}
        <Reveal className="order-2 space-y-4 lg:order-1">
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-400">Name</label>
            <input className={field} value={profile.name} onChange={set('name')} />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-400">Your build</label>
            <input className={field} value={profile.car} onChange={set('car')} />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-400">Social handle</label>
            <input className={field} value={profile.handle} onChange={set('handle')} />
          </div>
          <button
            onClick={share}
            className="w-full rounded-xl bg-redline px-5 py-3 font-semibold text-white transition hover:bg-redline-dark"
          >
            {copied ? 'Copied to clipboard ✓' : '📲 Share my Garage Pass'}
          </button>
          <p className="text-center text-xs text-slate-500">
            Uses your device’s native share sheet when available.
          </p>
        </Reveal>

        {/* Live card preview */}
        <Reveal className="order-1 lg:order-2" delay={120}>
          <div className="mx-auto max-w-sm overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-ink-card to-ink-soft shadow-2xl">
            <div className="carbon flex items-center justify-between border-b border-white/10 px-6 py-4">
              <div className="flex items-center gap-2">
                <RedlineLogo className="h-5 w-5" />
                <span className="text-sm font-extrabold tracking-tight text-white">
                  RED<span className="text-redline">LINE</span>
                </span>
              </div>
              <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">
                Garage Pass
              </span>
            </div>

            <div className="flex items-center gap-5 p-6">
              <ScanCode value={`${profile.name}|${profile.car}|${profile.handle}`} />
              <div className="min-w-0">
                <p className="truncate text-lg font-bold text-white">{profile.name || 'Your Name'}</p>
                <p className="mt-1 truncate text-sm text-slate-400">🏎️ {profile.car || 'Your build'}</p>
                <p className="mt-1 truncate text-sm text-redline">{profile.handle || '@handle'}</p>
                <span className="mt-3 inline-block rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-semibold text-slate-300">
                  Tap or scan to connect
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
