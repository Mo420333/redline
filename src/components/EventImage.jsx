import { useEffect, useState } from 'react'
import Img from './Img'
import { fetchUnsplash, photoApiEnabled } from '../lib/carImage'

/**
 * City background photo for an event card. Uses Unsplash when VITE_UNSPLASH_KEY
 * is set, else the keyword image service. If nothing loads it renders nothing,
 * letting the card's textured background show through.
 */
export default function EventImage({ event }) {
  const [src, setSrc] = useState(event.img || null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    let active = true
    if (photoApiEnabled && event.kw) {
      fetchUnsplash(event.kw).then((url) => {
        if (active && url) setSrc(url)
      })
    }
    return () => {
      active = false
    }
  }, [event.kw])

  if (!src || failed) return null

  return (
    <Img
      src={src}
      alt={event.city}
      onError={() => setFailed(true)}
      className="absolute inset-0 h-full w-full object-cover"
    />
  )
}
