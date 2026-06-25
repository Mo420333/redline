import { useRef, useState } from 'react'

export default function ShareRideModal({ open, onClose, onCreate }) {
  const [form, setForm] = useState({ owner: '', car: '', caption: '' })
  const [photo, setPhoto] = useState(null) // object URL
  const fileRef = useRef(null)

  if (!open) return null

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const pickFile = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    // Read as a data URL so the photo persists in localStorage across refreshes.
    const reader = new FileReader()
    reader.onload = () => setPhoto(reader.result)
    reader.readAsDataURL(file)
  }

  const submit = (e) => {
    e.preventDefault()
    if (!form.car.trim()) return
    onCreate({
      id: `ride-${Date.now()}`,
      owner: form.owner.trim() || 'You',
      car: form.car.trim(),
      caption: form.caption.trim(),
      img: photo,
      color: '#dc2626',
      sky: '#1e293b',
      loves: 0,
      mine: true,
    })
    setForm({ owner: '', car: '', caption: '' })
    setPhoto(null)
    onClose()
  }

  const field =
    'w-full rounded-lg border border-white/15 bg-ink-soft px-4 py-2.5 text-white outline-none placeholder:text-slate-500 focus:border-redline focus:ring-2 focus:ring-redline/20'

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm" onClick={onClose}>
      <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-ink-card p-7 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-white">Share your ride 📸</h3>
          <button onClick={onClose} className="text-2xl text-slate-500 hover:text-white" aria-label="Close">×</button>
        </div>
        <p className="mt-1 text-sm text-slate-400">Show the crew what you’re working with.</p>

        <form onSubmit={submit} className="mt-6 space-y-4">
          {/* Photo upload */}
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-400">Photo</label>
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="flex h-40 w-full items-center justify-center overflow-hidden rounded-xl border border-dashed border-white/20 bg-ink-soft text-slate-400 transition hover:border-redline"
            >
              {photo ? (
                <img src={photo} alt="Your ride" className="h-full w-full object-cover" />
              ) : (
                <span className="flex flex-col items-center gap-1">
                  <span className="text-3xl">📷</span>
                  <span className="text-sm">Tap to upload a photo</span>
                </span>
              )}
            </button>
            <input ref={fileRef} type="file" accept="image/*" onChange={pickFile} className="hidden" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-400">Your name</label>
              <input className={field} placeholder="e.g. Alex" value={form.owner} onChange={set('owner')} />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-400">Car</label>
              <input className={field} placeholder="e.g. 2004 350Z" value={form.car} onChange={set('car')} required />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-400">Caption</label>
            <input className={field} placeholder="Say something about the build…" value={form.caption} onChange={set('caption')} />
          </div>

          <button type="submit" className="w-full rounded-xl bg-redline px-5 py-3 font-semibold text-white transition hover:bg-redline-dark">
            Post to the Showroom
          </button>
        </form>
      </div>
    </div>
  )
}
