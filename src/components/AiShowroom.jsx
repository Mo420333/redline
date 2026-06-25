import { useEffect, useRef, useState } from 'react'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import { fetchUnsplash, photoApiEnabled } from '../lib/carImage'

const W = (p) => {
  const [d1, d2, file] = p.split('/')
  return `https://upload.wikimedia.org/wikipedia/commons/thumb/${d1}/${d2}/${file}/1280px-${file}`
}

const CARS = [
  { name: 'Pagani Huayra', kw: 'Pagani Huayra', img: W('3/36/Pagani%2C_GIMS_2019%2C_Le_Grand-Saconnex_%28GIMS0023%29.jpg/1024px-Pagani%2C_GIMS_2019%2C_Le_Grand-Saconnex_%28GIMS0023%29.jpg') },
  { name: 'Lamborghini Huracán', kw: 'Lamborghini Huracan', img: W('c/ca/2017_Lamborghini_Huracan_LP610.jpg/1024px-2017_Lamborghini_Huracan_LP610.jpg') },
  { name: 'Ferrari 488', kw: 'Ferrari 488', img: W('0/0d/2018_Ferrari_488_GTB_4.jpg/1024px-2018_Ferrari_488_GTB_4.jpg') },
  { name: 'McLaren 720S', kw: 'McLaren 720S', img: W('2/23/2018_McLaren_720S_V8_S-A_4.0.jpg/1024px-2018_McLaren_720S_V8_S-A_4.0.jpg') },
  { name: 'BMW M4', kw: 'BMW M4', img: W('e/e2/2021_BMW_M4_Competition_Automatic_3.0_Front.jpg/1024px-2021_BMW_M4_Competition_Automatic_3.0_Front.jpg') },
  { name: 'Nissan GT-R', kw: 'Nissan GT-R', img: W('0/06/Nissan_Skyline_GT-R_R34_V_Spec_II.jpg/1024px-Nissan_Skyline_GT-R_R34_V_Spec_II.jpg') },
  { name: 'Porsche 911', kw: 'Porsche 911', img: W('a/a2/Porsche_911_No_1000000%2C_70_Years_Porsche_Sports_Car%2C_Berlin_%281X7A3888%29.jpg/1024px-Porsche_911_No_1000000%2C_70_Years_Porsche_Sports_Car%2C_Berlin_%281X7A3888%29.jpg') },
  { name: 'Corvette C8', kw: 'Chevrolet Corvette', img: W('4/4b/Chevrolet_Corvette_C8_IAA_2021_1X7A0156.jpg/1024px-Chevrolet_Corvette_C8_IAA_2021_1X7A0156.jpg') },
  { name: 'Mustang GT', kw: 'Ford Mustang', img: W('9/9c/Ford_Mustang_VII_GT_Rutesheimer_Autoschau_2025_DSC_9234.jpg/1024px-Ford_Mustang_VII_GT_Rutesheimer_Autoschau_2025_DSC_9234.jpg') },
  { name: 'Mazda RX-7', kw: 'Mazda RX-7', img: W('8/8c/1994_Mazda_RX-7_R2_in_Vintage_Red%2C_front_left_%28Lime_Rock%29.jpg/1024px-1994_Mazda_RX-7_R2_in_Vintage_Red%2C_front_left_%28Lime_Rock%29.jpg') },
  { name: 'Toyota Supra', kw: 'Toyota Supra', img: W('e/e5/2020_Toyota_GR_Supra_%28United_States%29.png/1024px-2020_Toyota_GR_Supra_%28United_States%29.png') },
  { name: 'Audi R8', kw: 'Audi R8', img: W('d/d2/2018_Audi_R8_Coupe_V10_plus_Front.jpg/1024px-2018_Audi_R8_Coupe_V10_plus_Front.jpg') },
]

const SCENES = [
  { key: 'studio', name: 'Studio White', emoji: '🏢', bg: 'radial-gradient(ellipse at 50% 20%, #e5e7eb, #94a3b8 55%, #334155)', deco: null },
  { key: 'neon', name: 'Neon Garage', emoji: '🟣', bg: 'linear-gradient(180deg, #0b0f1a, #2e1065)', deco: 'neon' },
  { key: 'tokyo', name: 'Tokyo Night', emoji: '🌃', bg: 'linear-gradient(180deg, #0b1026, #3b0764)', deco: 'skyline' },
  { key: 'canyon', name: 'Canyon Sunset', emoji: '🌄', bg: 'linear-gradient(180deg, #7c2d12, #dc2626 45%, #f59e0b)', deco: 'sun' },
  { key: 'miami', name: 'Miami Beach', emoji: '🌴', bg: 'linear-gradient(180deg, #0ea5e9, #f472b6 70%, #fde68a)', deco: 'palms' },
  { key: 'mountain', name: 'Mountain Pass', emoji: '🏔️', bg: 'linear-gradient(180deg, #1e293b, #0f766e)', deco: 'mountains' },
  { key: 'cyber', name: 'Cyber Grid', emoji: '🟦', bg: 'linear-gradient(180deg, #020617, #1e1b4b)', deco: 'grid' },
  { key: 'snow', name: 'Snow Peak', emoji: '❄️', bg: 'linear-gradient(180deg, #cbd5e1, #475569)', deco: 'snow' },
]

const ACCENTS = ['#dc2626', '#2563eb', '#22d3ee', '#ec4899', '#f97316', '#22c55e', '#ffffff', '#facc15']

function Deco({ kind, accent }) {
  switch (kind) {
    case 'neon':
      return (
        <>
          <div className="absolute left-[10%] top-0 h-full w-1.5 blur-[2px]" style={{ background: accent }} />
          <div className="absolute right-[10%] top-0 h-full w-1.5 bg-cyan/70 blur-[2px]" />
          <div className="absolute inset-x-0 top-6 mx-auto h-1 w-2/3 bg-white/40 blur-[3px]" />
        </>
      )
    case 'skyline':
      return (
        <div className="absolute bottom-[28%] left-0 right-0 flex items-end justify-center gap-1 opacity-40">
          {[24, 40, 30, 56, 36, 48, 28, 44, 32, 50].map((h, i) => (
            <div key={i} className="w-5 bg-black" style={{ height: h }} />
          ))}
        </div>
      )
    case 'sun':
      return <div className="absolute left-1/2 top-[14%] h-28 w-28 -translate-x-1/2 rounded-full bg-yellow-200/80 blur-xl" />
    case 'palms':
      return (
        <div className="absolute bottom-[26%] left-0 right-0 flex justify-between px-6 text-4xl opacity-70">
          <span>🌴</span>
          <span>🌴</span>
        </div>
      )
    case 'mountains':
      return (
        <div className="absolute bottom-[26%] left-0 right-0 flex items-end justify-center">
          <div className="mx-[-10px] h-0 w-0 border-x-[70px] border-b-[90px] border-x-transparent border-b-slate-900/70" />
          <div className="mx-[-10px] h-0 w-0 border-x-[90px] border-b-[120px] border-x-transparent border-b-slate-900/80" />
          <div className="mx-[-10px] h-0 w-0 border-x-[70px] border-b-[80px] border-x-transparent border-b-slate-900/70" />
        </div>
      )
    case 'grid':
      return (
        <div
          className="absolute inset-x-0 bottom-0 h-1/2 opacity-50"
          style={{
            background:
              'repeating-linear-gradient(90deg, transparent 0 38px, rgba(34,211,238,0.5) 38px 40px), repeating-linear-gradient(0deg, transparent 0 38px, rgba(34,211,238,0.4) 38px 40px)',
            transform: 'perspective(300px) rotateX(60deg)',
            transformOrigin: 'bottom',
          }}
        />
      )
    case 'snow':
      return (
        <div className="absolute inset-0 opacity-70">
          {[12, 30, 48, 66, 84, 20, 40, 60, 80, 90].map((l, i) => (
            <div key={i} className="absolute h-1 w-1 rounded-full bg-white" style={{ left: `${l}%`, top: `${(i * 9 + 8) % 70}%` }} />
          ))}
        </div>
      )
    default:
      return null
  }
}

export default function AiShowroom() {
  const [carIdx, setCarIdx] = useState(0)
  const [scene, setScene] = useState(SCENES[1])
  const [accent, setAccent] = useState('#dc2626')
  const [photo, setPhoto] = useState(null)
  const [src, setSrc] = useState(CARS[0].img)
  const [imgFailed, setImgFailed] = useState(false)
  const [phase, setPhase] = useState('ready') // ready | generating
  const fileRef = useRef(null)

  // Resolve the real-car image (Unsplash when keyed, else keyword service).
  useEffect(() => {
    setImgFailed(false)
    if (photo) {
      setSrc(photo)
      return
    }
    const car = CARS[carIdx]
    setSrc(car.img)
    let active = true
    if (photoApiEnabled) {
      fetchUnsplash(car.kw).then((u) => {
        if (active && u) setSrc(u)
      })
    }
    return () => {
      active = false
    }
  }, [carIdx, photo])

  const regenerate = () => {
    setPhase('generating')
    setTimeout(() => setPhase('ready'), 1000)
  }

  const pickCar = (i) => {
    setPhoto(null)
    setCarIdx(i)
    regenerate()
  }

  const pickFile = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      setPhoto(reader.result)
      regenerate()
    }
    reader.readAsDataURL(file)
  }

  const surprise = () => {
    setPhoto(null)
    setCarIdx((i) => (i + 1) % CARS.length)
    regenerate()
  }

  const carName = photo ? 'Your ride' : CARS[carIdx].name

  return (
    <section id="ai-showroom" className="bg-ink-soft py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeading
          eyebrow="AI Showroom"
          title="Stage a real car in a dream scene"
          subtitle="Pick from a dozen real cars, drop it into one of eight scenes, set the lighting — or upload your own ride."
        />

        <div className="grid gap-6 lg:grid-cols-[1fr_330px]">
          {/* Stage */}
          <Reveal className="overflow-hidden rounded-3xl border border-white/10">
            <div className="relative aspect-video w-full" style={{ background: scene.bg }}>
              <Deco kind={scene.deco} accent={accent} />

              {/* Floor light */}
              <div className="absolute inset-x-0 bottom-0 h-1/3" style={{ background: `linear-gradient(to top, ${accent}33, transparent)` }} />

              {/* Real car + reflection */}
              <div className="absolute inset-0 flex flex-col items-center justify-center px-[8%]">
                <div className="relative w-full" style={{ maxWidth: '78%' }}>
                  <div className="absolute -inset-6 rounded-full blur-3xl" style={{ background: `${accent}40` }} />
                  {imgFailed ? (
                    <div className="relative flex aspect-video w-full flex-col items-center justify-center gap-1 rounded-xl border border-white/15 bg-black/40 text-slate-300 shadow-2xl">
                      <span className="text-4xl">🏎️</span>
                      <span className="text-sm">{carName}</span>
                    </div>
                  ) : (
                    <img
                      src={src}
                      alt={carName}
                      onError={() => setImgFailed(true)}
                      className="relative aspect-video w-full rounded-xl border border-white/15 object-cover shadow-2xl"
                    />
                  )}
                </div>
                <div className="mt-1 w-full origin-top scale-y-[-1] opacity-25 blur-[2px]" style={{ maxWidth: '78%' }} aria-hidden="true">
                  <img src={src} alt="" className="aspect-video w-full rounded-xl object-cover" />
                </div>
              </div>

              {phase === 'generating' && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/60 backdrop-blur-sm">
                  <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/20 border-t-redline" />
                  <p className="text-sm font-semibold text-white">✨ Staging {carName}…</p>
                </div>
              )}

              <span className="absolute left-3 top-3 rounded-full bg-black/55 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                {carName} · {scene.name}
              </span>
              <span className="absolute right-3 top-3 rounded-full bg-black/50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-slate-200">
                AI-styled preview
              </span>
            </div>
          </Reveal>

          {/* Controls */}
          <Reveal delay={120} className="space-y-5 rounded-3xl border border-white/10 bg-ink-card p-6">
            {/* Car picker */}
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                Choose a car ({CARS.length})
              </p>
              <div className="grid max-h-44 grid-cols-2 gap-2 overflow-y-auto pr-1">
                {CARS.map((c, i) => (
                  <button
                    key={c.name}
                    onClick={() => pickCar(i)}
                    className={`rounded-lg border px-3 py-2 text-left text-xs font-medium transition ${
                      !photo && carIdx === i
                        ? 'border-redline bg-redline/10 text-white'
                        : 'border-white/10 text-slate-300 hover:bg-white/5'
                    }`}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Scene picker */}
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                Scene ({SCENES.length})
              </p>
              <div className="grid grid-cols-2 gap-2">
                {SCENES.map((s) => (
                  <button
                    key={s.key}
                    onClick={() => {
                      setScene(s)
                      regenerate()
                    }}
                    className={`rounded-lg border px-3 py-2 text-left text-xs font-medium transition ${
                      scene.key === s.key ? 'border-redline bg-redline/10 text-white' : 'border-white/10 text-slate-300 hover:bg-white/5'
                    }`}
                  >
                    <span className="mr-1">{s.emoji}</span>
                    {s.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Lighting color */}
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">Lighting</p>
              <div className="flex flex-wrap gap-2.5">
                {ACCENTS.map((c) => (
                  <button
                    key={c}
                    onClick={() => {
                      setAccent(c)
                      regenerate()
                    }}
                    aria-label={`Lighting ${c}`}
                    className={`h-8 w-8 rounded-full border-2 transition ${accent === c ? 'scale-110 border-white' : 'border-white/20'}`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2.5 border-t border-white/10 pt-4">
              <button onClick={() => fileRef.current?.click()} className="w-full rounded-xl border border-white/15 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/5">
                📷 Use my own photo
              </button>
              <input ref={fileRef} type="file" accept="image/*" onChange={pickFile} className="hidden" />
              <button onClick={surprise} className="w-full rounded-xl border border-white/15 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/5">
                🎲 Surprise me
              </button>
              <button onClick={regenerate} className="w-full rounded-xl bg-redline px-4 py-3 font-semibold text-white transition hover:bg-redline-dark">
                ✨ Generate scene
              </button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
