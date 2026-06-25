import { useEffect, useState } from 'react'
import RedlineLogo from './RedlineLogo'
import { useCart } from '../store'

const LINKS = [
  { href: '#events', label: 'Meets' },
  { href: '#showroom', label: 'Showroom' },
  { href: '#ai-showroom', label: 'AI Studio' },
  { href: '#giveaways', label: 'Giveaways' },
  { href: '#merch', label: 'Merch' },
  { href: '#community', label: 'Community' },
  { href: '#share', label: 'Garage Pass' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { count } = useCart()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors ${
        scrolled
          ? 'border-white/10 bg-ink/85 backdrop-blur-lg'
          : 'border-transparent bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <a href="#top" className="flex items-center gap-2">
          <RedlineLogo />
          <span className="text-xl font-extrabold tracking-tight text-white">
            RED<span className="text-redline">LINE</span>
          </span>
        </a>

        <div className="hidden items-center gap-7 lg:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-slate-300 transition hover:text-white"
            >
              {l.label}
            </a>
          ))}
          <a href="#merch" className="relative text-slate-200 transition hover:text-white" aria-label="Cart">
            🛒
            {count > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-redline px-1 text-[10px] font-bold text-white">
                {count}
              </span>
            )}
          </a>
          <a
            href="#events"
            className="rounded-lg bg-redline px-4 py-2 text-sm font-semibold text-white transition hover:bg-redline-dark"
          >
            Find a Meet
          </a>
        </div>

        <div className="flex items-center gap-4 lg:hidden">
          <a href="#merch" className="relative text-slate-200" aria-label="Cart">
            🛒
            {count > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-redline px-1 text-[10px] font-bold text-white">
                {count}
              </span>
            )}
          </a>
          <button
            onClick={() => setOpen((o) => !o)}
            className="rounded-md p-2 text-slate-200"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <div className="space-y-1.5">
              <span className={`block h-0.5 w-6 bg-current transition ${open ? 'translate-y-2 rotate-45' : ''}`} />
              <span className={`block h-0.5 w-6 bg-current transition ${open ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 w-6 bg-current transition ${open ? '-translate-y-2 -rotate-45' : ''}`} />
            </div>
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-white/10 bg-ink/95 px-5 py-4 lg:hidden">
          <div className="flex flex-col gap-1">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-base font-medium text-slate-200 transition hover:bg-white/5"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#events"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-lg bg-redline px-4 py-3 text-center font-semibold text-white"
            >
              Find a Meet
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
