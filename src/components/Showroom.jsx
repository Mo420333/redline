import { useEffect, useMemo, useState } from 'react'
import { SHOWROOM, CATEGORIES } from '../data'

const POSTS_KEY = 'redline-showroom-posts'
const LIKES_KEY = 'redline-showroom-likes'

const loadJSON = (key, fallback) => {
  try {
    const v = localStorage.getItem(key)
    return v ? JSON.parse(v) : fallback
  } catch {
    return fallback
  }
}
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import CarImage from './CarImage'
import Roundel from './Roundel'
import ShareRideModal from './ShareRideModal'

export default function Showroom() {
  // User-posted rides are kept in localStorage; seeds always come from data.
  const [posts, setPosts] = useState(() => [...loadJSON(POSTS_KEY, []), ...SHOWROOM])
  const [liked, setLiked] = useState(() => new Set(loadJSON(LIKES_KEY, [])))
  const [cat, setCat] = useState('All')
  const [sort, setSort] = useState('recent') // recent | top
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    try {
      localStorage.setItem(POSTS_KEY, JSON.stringify(posts.filter((p) => p.mine)))
    } catch {
      /* quota / private mode — ignore */
    }
  }, [posts])

  useEffect(() => {
    try {
      localStorage.setItem(LIKES_KEY, JSON.stringify([...liked]))
    } catch {
      /* ignore */
    }
  }, [liked])

  const toggleLove = (id) => {
    setLiked((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const lovesFor = (post) => post.loves + (liked.has(post.id) ? 1 : 0)

  const visible = useMemo(() => {
    let list = posts.filter(
      (p) => cat === 'All' || p.category === cat || p.mine,
    )
    if (sort === 'top') list = [...list].sort((a, b) => lovesFor(b) - lovesFor(a))
    return list
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [posts, cat, sort, liked])

  const addPost = (post) => {
    setPosts((prev) => [post, ...prev])
    setCat('All')
    setSort('recent')
  }

  return (
    <section id="showroom" className="mx-auto max-w-7xl px-5 py-20 sm:py-28">
      <SectionHeading
        eyebrow="The Showroom"
        title="Show your ride. Get the love."
        subtitle="Post a photo of your car, browse by category, and rack up ❤️ from the community."
      />

      <Reveal className="mb-8 space-y-4">
        {/* Category tabs */}
        <div className="flex flex-wrap justify-center gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                cat === c ? 'bg-redline text-white' : 'border border-white/15 text-slate-300 hover:bg-white/5'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        {/* Sort + share */}
        <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
          <div className="flex gap-2">
            {[
              { k: 'recent', label: 'Recent' },
              { k: 'top', label: '🔥 Top Loved' },
            ].map((s) => (
              <button
                key={s.k}
                onClick={() => setSort(s.k)}
                className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${
                  sort === s.k ? 'bg-white/10 text-white' : 'text-slate-400 hover:bg-white/5'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="rounded-lg bg-redline px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-redline-dark"
          >
            📸 Share your ride
          </button>
        </div>
      </Reveal>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((post, idx) => {
          const isLiked = liked.has(post.id)
          return (
            <Reveal
              key={post.id}
              delay={(idx % 3) * 70}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-ink-card transition hover:-translate-y-1 hover:border-redline/50"
            >
              <div className="relative h-48 overflow-hidden bg-ink-soft">
                <CarImage post={post} />
                {post.mine && (
                  <span className="absolute left-3 top-3 rounded-full bg-redline px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                    Your ride
                  </span>
                )}
                {post.category && !post.mine && (
                  <span className="absolute left-3 top-3 rounded-full bg-black/55 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-slate-100 backdrop-blur-sm">
                    {post.category}
                  </span>
                )}
                {post.brand === 'bmw' && (
                  <span className="absolute right-3 top-3 rounded-full bg-black/50 p-1 backdrop-blur-sm">
                    <Roundel className="h-5 w-5" />
                  </span>
                )}
              </div>

              <div className="p-5">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-redline/20 text-sm font-bold text-red-glow">
                    {post.owner[0]}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-white">{post.owner}</p>
                    <p className="truncate text-xs text-slate-400">{post.car}</p>
                  </div>
                </div>

                {post.caption && (
                  <p className="mt-3 text-sm leading-relaxed text-slate-300">{post.caption}</p>
                )}

                <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
                  <button
                    onClick={() => toggleLove(post.id)}
                    className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-semibold transition ${
                      isLiked ? 'bg-redline/15 text-red-glow' : 'text-slate-300 hover:bg-white/5'
                    }`}
                    aria-pressed={isLiked}
                  >
                    <span className={isLiked ? 'scale-110' : ''}>{isLiked ? '❤️' : '🤍'}</span>
                    {lovesFor(post).toLocaleString()}
                  </button>
                  <span className="text-xs text-slate-500">
                    {isLiked ? 'You love this' : 'Show some love'}
                  </span>
                </div>
              </div>
            </Reveal>
          )
        })}
      </div>

      {visible.length === 0 && (
        <p className="rounded-2xl border border-dashed border-white/15 py-16 text-center text-slate-500">
          No rides in this category yet — be the first to post one.
        </p>
      )}

      <ShareRideModal open={modalOpen} onClose={() => setModalOpen(false)} onCreate={addPost} />
    </section>
  )
}
