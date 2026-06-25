import { Link, useParams } from 'react-router-dom'
import { useShowroom } from '../showroomStore'
import CarImage from './CarImage'
import Roundel from './Roundel'

export default function CarDetail() {
  const { id } = useParams()
  const { getPost, posts, isLiked, toggleLove, lovesFor } = useShowroom()
  const post = getPost(id)

  if (!post) {
    return (
      <section className="mx-auto max-w-3xl px-5 py-32 text-center">
        <p className="text-5xl">🤷</p>
        <h1 className="mt-4 text-2xl font-bold text-white">Ride not found</h1>
        <p className="mt-2 text-slate-400">It may have been removed, or the link is off.</p>
        <Link to="/" className="mt-6 inline-block rounded-xl bg-redline px-6 py-3 font-semibold text-white transition hover:bg-redline-dark">
          Back to Redline
        </Link>
      </section>
    )
  }

  const liked = isLiked(post.id)
  const related = posts.filter((p) => p.category === post.category && p.id !== post.id).slice(0, 3)

  return (
    <section className="mx-auto max-w-6xl px-5 py-12 sm:py-16">
      <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-white">
        ← Back to Redline
      </Link>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        {/* Photo */}
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-ink-soft">
          <div className="aspect-[4/3] w-full">
            <CarImage post={post} className="h-full w-full object-cover" />
          </div>
          {post.brand === 'bmw' && (
            <span className="absolute right-4 top-4 rounded-full bg-black/50 p-1.5 backdrop-blur-sm">
              <Roundel className="h-7 w-7" />
            </span>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col">
          {post.category && (
            <span className="w-fit rounded-full bg-redline/15 px-3 py-1 text-xs font-bold uppercase tracking-wide text-red-glow">
              {post.category}
            </span>
          )}
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">{post.car}</h1>

          <div className="mt-4 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-redline/20 text-lg font-bold text-red-glow">
              {post.owner[0]}
            </div>
            <div>
              <p className="font-semibold text-white">{post.owner}</p>
              <p className="text-sm text-slate-500">Owner</p>
            </div>
          </div>

          {post.caption && <p className="mt-6 text-lg leading-relaxed text-slate-300">“{post.caption}”</p>}

          <div className="mt-6 flex items-center gap-4">
            <button
              onClick={() => toggleLove(post.id)}
              className={`flex items-center gap-2 rounded-xl px-6 py-3 font-semibold transition ${
                liked ? 'bg-redline text-white' : 'border border-white/15 text-white hover:bg-white/5'
              }`}
              aria-pressed={liked}
            >
              <span>{liked ? '❤️' : '🤍'}</span>
              {lovesFor(post).toLocaleString()} {liked ? 'loved' : 'love'}
            </button>
            <span className="text-sm text-slate-500">Tap to show some love</span>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 border-t border-white/10 pt-6 text-sm">
            <div>
              <p className="text-slate-500">Category</p>
              <p className="font-semibold text-white">{post.category || '—'}</p>
            </div>
            <div>
              <p className="text-slate-500">Total love</p>
              <p className="font-semibold text-white">{lovesFor(post).toLocaleString()} ❤️</p>
            </div>
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="mb-6 text-xl font-bold text-white">More {post.category} rides</h2>
          <div className="grid gap-5 sm:grid-cols-3">
            {related.map((r) => (
              <Link
                key={r.id}
                to={`/car/${r.id}`}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-ink-card transition hover:-translate-y-1 hover:border-redline/50"
              >
                <div className="h-40 overflow-hidden bg-ink-soft">
                  <CarImage post={r} />
                </div>
                <div className="p-4">
                  <p className="truncate text-sm font-semibold text-white">{r.car}</p>
                  <p className="truncate text-xs text-slate-400">{r.owner} · {lovesFor(r).toLocaleString()} ❤️</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
