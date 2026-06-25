import { useEffect, useState } from 'react'
import { fetchUnsplash, photoApiEnabled } from '../lib/carImage'

/**
 * Shows the best available real photo for a car:
 *   1. an Unsplash photo (if VITE_UNSPLASH_KEY is set and `kw` matches),
 *   2. else the post's existing `img` (keyword image service),
 *   3. else a neutral placeholder (never an illustration).
 */
export default function CarImage({ post, className = 'h-full w-full object-cover' }) {
  const [src, setSrc] = useState(post.img || null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    let active = true
    if (photoApiEnabled && post.kw && !post.mine) {
      fetchUnsplash(post.kw).then((url) => {
        if (active && url) setSrc(url)
      })
    }
    return () => {
      active = false
    }
  }, [post.kw, post.mine])

  if (src && !failed) {
    return (
      <img
        src={src}
        alt={post.car}
        loading="lazy"
        onError={() => setFailed(true)}
        className={className}
      />
    )
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-1 bg-gradient-to-br from-ink-card to-ink-soft text-slate-500">
      <span className="text-3xl">🏎️</span>
      <span className="px-2 text-center text-xs">{post.car}</span>
    </div>
  )
}
