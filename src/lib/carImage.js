// Optional Unsplash integration. Set VITE_UNSPLASH_KEY to upgrade the seeded
// keyword images to higher-quality, precise Unsplash photos. Without a key the
// app keeps using each post's existing `img` URL.
const UNSPLASH_KEY = import.meta.env.VITE_UNSPLASH_KEY
export const photoApiEnabled = Boolean(UNSPLASH_KEY)

export async function fetchUnsplash(query) {
  if (!UNSPLASH_KEY || !query) return null
  try {
    const res = await fetch(
      `https://api.unsplash.com/photos/random?query=${encodeURIComponent(
        query,
      )}&orientation=landscape&content_filter=high&client_id=${UNSPLASH_KEY}`,
    )
    if (!res.ok) return null
    const data = await res.json()
    return data?.urls?.regular ?? null
  } catch {
    return null
  }
}
