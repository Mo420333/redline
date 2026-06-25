import { useRef, useState } from 'react'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import CarArt from './CarArt'

const SCENES = [
  { key: 'studio', name: 'Studio White', emoji: '🏢', bg: 'radial-gradient(ellipse at 50% 25%, #e5e7eb, #94a3b8 55%, #334155)', glow: '#ffffff' },
  { key: 'neon', name: 'Neon Garage', emoji: '🟣', bg: 'linear-gradient(180deg, #0b0f1a, #2e1065)', glow: '#dc2626', neon: true },
  { key: 'tokyo', name: 'Tokyo Night', emoji: '🌃', bg: 'linear-gradient(180deg, #0b1026, #3b0764)', glow: '#22d3ee', skyline: true },
  { key: 'canyon', name: 'Canyon Sunset', emoji: '🌄', bg: 'linear-gradient(180deg, #7c2d12, #dc2626 45%, #f59e0b)', glow: '#fbbf24', sun: true },
]

const COLORS = ['#dc2626', '#2563eb', '#e5e7eb', '#f97316', '#10b981', '#0a0a0a']

export default function AiShowroom() {
  const [scene, setScene] = useState(SCENES[1])
  const [color, setColor] = useState('#1d4ed8')
  const [brand, setBrand] = useState('bmw')
  const [photo, setPhoto] = useState(null)
  const [phase, setPhase] = useState('ready') // ready | generating
  const fileRef = useRef(null)

  const regenerate = (nextScene) => {
    if (nextScene) setScene(nextScene)
    setPhase('generating')
    setTimeout(() => setPhase('ready'), 1100)
  }

  const pickFile = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      setPhoto(URL.createObjectURL(file))
      regenerate()
    }
  }

  const surprise = () => {
    const kw = brand === 'bmw' ? 'bmw,car' : 'sportscar,car'
    setPhoto(`https://loremflickr.com/1200/675/${kw}?lock=${Math.floor(Math.random() * 60) + 1}`)
    regenerate()
  }

  return (
    <section id="ai-showroom" className="bg-ink-soft py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeading
          eyebrow="AI Showroom"
          title="Drop your ride into a dream scene"
          subtitle="Pick a backdrop, set your color or upload a photo, and stage your car in a studio-grade AI scene — ready to post."
        />

        <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
          {/* Stage */}
          <Reveal className="overflow-hidden rounded-3xl border border-white/10">
            <div className="relative aspect-video w-full" style={{ background: scene.bg }}>
              {/* Scene deco */}
              {scene.neon && (
                <>
                  <div className="absolute left-[12%] top-0 h-full w-1.5 bg-magenta/70 blur-[2px]" />
                  <div className="absolute right-[12%] top-0 h-full w-1.5 bg-cyan/70 blur-[2px]" />
                  <div className="absolute inset-x-0 top-8 mx-auto h-1 w-2/3 bg-white/40 blur-[3px]" />
                </>
              )}
              {scene.sun && (
                <div className="absolute left-1/2 top-[18%] h-28 w-28 -translate-x-1/2 rounded-full bg-yellow-200/80 blur-xl" />
              )}
              {scene.skyline && (
                <div className="absolute bottom-[30%] left-0 right-0 flex items-end justify-center gap-1 opacity-40">
                  {[24, 40, 30, 56, 36, 48, 28, 44, 32].map((h, i) => (
                    <div key={i} className="w-5 bg-black" style={{ height: h }} />
                  ))}
                </div>
              )}

              {/* Floor glow */}
              <div
                className="absolute inset-x-0 bottom-0 h-1/3"
                style={{ background: `linear-gradient(to top, ${scene.glow}22, transparent)` }}
              />

              {/* Car + reflection */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="relative h-1/2 w-3/4">
                  <div
                    className="absolute -inset-6 rounded-full blur-3xl"
                    style={{ background: `${scene.glow}33` }}
                  />
                  <div className="relative h-full w-full">
                    {photo ? (
                      <img src={photo} alt="Your car" className="h-full w-full object-contain" />
                    ) : (
                      <CarArt bare color={color} brand={brand} />
                    )}
                  </div>
                </div>
                {/* Reflection */}
                <div className="h-1/4 w-3/4 origin-top scale-y-[-1] opacity-25 blur-[2px]" aria-hidden="true">
                  {photo ? (
                    <img src={photo} alt="" className="h-full w-full object-contain" />
                  ) : (
                    <CarArt bare color={color} brand={brand} />
                  )}
                </div>
              </div>

              {/* Generating overlay */}
              {phase === 'generating' && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/60 backdrop-blur-sm">
                  <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/20 border-t-redline" />
                  <p className="text-sm font-semibold text-white">✨ Styling your ride…</p>
                </div>
              )}

              {/* Badge */}
              <span className="absolute right-3 top-3 rounded-full bg-black/50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-slate-200">
                AI-styled preview
              </span>
            </div>
          </Reveal>

          {/* Controls */}
          <Reveal delay={120} className="space-y-6 rounded-3xl border border-white/10 bg-ink-card p-6">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">Scene</p>
              <div className="grid grid-cols-2 gap-2">
                {SCENES.map((s) => (
                  <button
                    key={s.key}
                    onClick={() => regenerate(s)}
                    className={`rounded-xl border px-3 py-2.5 text-left text-sm font-medium transition ${
                      scene.key === s.key
                        ? 'border-redline bg-redline/10 text-white'
                        : 'border-white/10 text-slate-300 hover:bg-white/5'
                    }`}
                  >
                    <span className="mr-1.5">{s.emoji}</span>
                    {s.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">Body style</p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { k: 'bmw', label: 'BMW' },
                  { k: undefined, label: 'Generic' },
                ].map((b) => (
                  <button
                    key={b.label}
                    onClick={() => {
                      setPhoto(null)
                      setBrand(b.k)
                      regenerate()
                    }}
                    className={`rounded-xl border px-3 py-2.5 text-sm font-medium transition ${
                      brand === b.k && !photo
                        ? 'border-redline bg-redline/10 text-white'
                        : 'border-white/10 text-slate-300 hover:bg-white/5'
                    }`}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                Car color {photo && <span className="text-slate-600">(using your photo)</span>}
              </p>
              <div className="flex flex-wrap gap-2.5">
                {COLORS.map((c) => (
                  <button
                    key={c}
                    onClick={() => {
                      setPhoto(null)
                      setColor(c)
                      regenerate()
                    }}
                    aria-label={`Color ${c}`}
                    className={`h-8 w-8 rounded-full border-2 transition ${
                      color === c && !photo ? 'border-white scale-110' : 'border-white/20'
                    }`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-2.5">
              <button
                onClick={() => fileRef.current?.click()}
                className="w-full rounded-xl border border-white/15 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/5"
              >
                📷 Use my own photo
              </button>
              <input ref={fileRef} type="file" accept="image/*" onChange={pickFile} className="hidden" />
              <button
                onClick={surprise}
                className="w-full rounded-xl border border-white/15 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/5"
              >
                🎲 Surprise me (real car)
              </button>
              <button
                onClick={() => regenerate()}
                className="w-full rounded-xl bg-redline px-4 py-3 font-semibold text-white transition hover:bg-redline-dark"
              >
                ✨ Generate scene
              </button>
              <button className="w-full rounded-xl border border-white/15 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/5">
                Post to Showroom
              </button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
