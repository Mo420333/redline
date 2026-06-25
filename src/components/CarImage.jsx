import { useState } from 'react'
import CarArt from './CarArt'

/** Shows the post's real photo; falls back to the SVG car art if it fails to load. */
export default function CarImage({ post }) {
  const [failed, setFailed] = useState(false)

  if (post.img && !failed) {
    return (
      <img
        src={post.img}
        alt={post.car}
        loading="lazy"
        onError={() => setFailed(true)}
        className="h-full w-full object-cover"
      />
    )
  }
  return <CarArt color={post.color} sky={post.sky} brand={post.brand} />
}
