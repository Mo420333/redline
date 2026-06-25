import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { CATEGORIES } from '../data'
import { useShowroom } from '../showroomStore'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import CarImage from './CarImage'
import Roundel from './Roundel'
import ShareRideModal from './ShareRideModal'

export default function Showroom() {
  const { posts, addPost, toggleLove, isLiked, lovesFor } = useShowroom()
  const [cat, setCat] = useState('All')
  const [sort, setSort] = useState('recent') // recent | top
  const [modalOpen, setModalOpen] = useState(false)

  const visible = useMemo(() => {
    let list = posts.filter((p) => cat === 'All' || p.category === cat || p.mine)
    if (sort === 'top') list = [...list].sort((a, b) => lovesFor(b) - lovesFor(a))
    return list
  }, [posts, cat, sort, lovesFor])

  return (
    <section id="showroom" className="mx-auto max-w-7xl px-5 py-20 sm:py-28">
      <SectionHeading
        eyebrow="The Showroom"
        title="Show your ride. Get the love."
        subtitle="Post a photo of your car, browse by category, tap a ride for the full story, and rack up ❤️ from the community."
      />

      <Reveal className="mb-8 space-y-4">
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
          const liked = isLiked(post.id)
          return (
            <Reveal
              key={post.id}
              delay={(idx % 3) * 70}
              className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-ink-card transition hover:-translate-y-1 hover:border-redline/50"
            >
              <Link to={`/car/${post.id}`} className="block">
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
              </Link>

              <div className="flex flex-1 flex-col p-5">
                <Link to={`/car/${post.id}`} className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-redline/20 text-sm font-bold text-red-glow">
                    {post.owner[0]}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-white">{post.owner}</p>
                    <p className="truncate text-xs text-slate-400">{post.car}</p>
                  </div>
                </Link>

                {post.caption && (
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-300">{post.caption}</p>
                )}

                <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
                  <button
                    onClick={() => toggleLove(post.id)}
                    className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-semibold transition ${
                      liked ? 'bg-redline/15 text-red-glow' : 'text-slate-300 hover:bg-white/5'
                    }`}
                    aria-pressed={liked}
                  >
                    <span className={liked ? 'scale-110' : ''}>{liked ? '❤️' : '🤍'}</span>
                    {lovesFor(post).toLocaleString()}
                  </button>
                  <Link to={`/car/${post.id}`} className="text-xs text-slate-500 hover:text-slate-300">
                    View ride →
                  </Link>
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
