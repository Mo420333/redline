import { useState } from 'react'

/** An <img> that fades in once loaded — avoids jarring pop-in across the site. */
export default function Img({ src, alt, className = '', onError, ...rest }) {
  const [loaded, setLoaded] = useState(false)
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onLoad={() => setLoaded(true)}
      onError={onError}
      className={`${className} transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}
      {...rest}
    />
  )
}
