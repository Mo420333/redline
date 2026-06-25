import { useState } from 'react'

/** Real product photo with a graceful emoji-on-gradient fallback. */
export default function ProductImage({ product, className = 'h-full w-full object-cover' }) {
  const [failed, setFailed] = useState(false)

  if (product.img && !failed) {
    return (
      <img
        src={product.img}
        alt={product.name}
        loading="lazy"
        onError={() => setFailed(true)}
        className={className}
      />
    )
  }

  return (
    <div
      className="flex h-full w-full items-center justify-center text-5xl"
      style={{ background: `radial-gradient(circle at 50% 40%, ${product.color}33, transparent 70%)` }}
    >
      {product.emoji}
    </div>
  )
}
