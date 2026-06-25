import { useEffect, useState } from 'react'
import CarArt from './CarArt'
import { fetchUnsplash, photoApiEnabled } from '../lib/carImage'

/**
 * Shows the best available photo for a car:
 *   1. an Unsplash photo (if VITE_UNSPLASH_KEY is set and `kw` matches),
 *   2. else the post's existing `img` (keyword image service),
 *   3. else the SVG car art (offline / load failure).
 */
export default function CarImage({ post, className = 'h-full w-full object-cover' }) {
  const [src, setSrc] = useState(post.img || null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    let active = true
    // Uploaded photos (data URLs) are already final — don't override them.
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
  return <CarArt color={post.color} sky={post.sky} brand={post.brand} />
}
