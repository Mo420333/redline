import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { SHOWROOM } from './data'
import { supabase, backendEnabled } from './lib/supabase'

const POSTS_KEY = 'redline-showroom-posts'
const LIKES_KEY = 'redline-showroom-likes'

const load = (key, fallback) => {
  try {
    const v = localStorage.getItem(key)
    return v ? JSON.parse(v) : fallback
  } catch {
    return fallback
  }
}

const ShowroomContext = createContext(null)

export function ShowroomProvider({ children }) {
  const [userPosts, setUserPosts] = useState(() => load(POSTS_KEY, []))
  const [remotePosts, setRemotePosts] = useState([])
  const [liked, setLiked] = useState(() => new Set(load(LIKES_KEY, [])))

  // Persist local posts + likes (used when no backend is configured).
  useEffect(() => {
    try {
      localStorage.setItem(POSTS_KEY, JSON.stringify(userPosts))
    } catch {
      /* ignore */
    }
  }, [userPosts])

  useEffect(() => {
    try {
      localStorage.setItem(LIKES_KEY, JSON.stringify([...liked]))
    } catch {
      /* ignore */
    }
  }, [liked])

  // When Supabase is configured, load shared rides + subscribe to new ones.
  useEffect(() => {
    if (!backendEnabled) return
    let channel
    supabase
      .from('rides')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        if (data) setRemotePosts(data)
      })
    channel = supabase
      .channel('rides-feed')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'rides' },
        (payload) => setRemotePosts((prev) => [payload.new, ...prev]),
      )
      .subscribe()
    return () => {
      if (channel) supabase.removeChannel(channel)
    }
  }, [])

  const posts = useMemo(
    () => (backendEnabled ? [...remotePosts, ...SHOWROOM] : [...userPosts, ...SHOWROOM]),
    [remotePosts, userPosts],
  )

  const getPost = useCallback((id) => posts.find((p) => p.id === id), [posts])

  const addPost = useCallback(async (post) => {
    if (backendEnabled) {
      // Only write columns that exist in the `rides` table (see supabase/schema.sql).
      const row = {
        id: post.id,
        owner: post.owner,
        car: post.car,
        category: post.category ?? null,
        brand: post.brand ?? null,
        caption: post.caption ?? null,
        img: post.img ?? null,
        color: post.color ?? null,
        sky: post.sky ?? null,
        loves: post.loves ?? 0,
      }
      const { data, error } = await supabase.from('rides').insert(row).select().single()
      if (!error && data) setRemotePosts((prev) => [data, ...prev])
      return
    }
    setUserPosts((prev) => [post, ...prev])
  }, [])

  const toggleLove = useCallback((id) => {
    setLiked((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }, [])

  const isLiked = useCallback((id) => liked.has(id), [liked])
  const lovesFor = useCallback(
    (post) => (post.loves || 0) + (liked.has(post.id) ? 1 : 0),
    [liked],
  )

  const value = useMemo(
    () => ({ posts, getPost, addPost, toggleLove, isLiked, lovesFor, backendEnabled }),
    [posts, getPost, addPost, toggleLove, isLiked, lovesFor],
  )

  return <ShowroomContext.Provider value={value}>{children}</ShowroomContext.Provider>
}

export function useShowroom() {
  const ctx = useContext(ShowroomContext)
  if (!ctx) throw new Error('useShowroom must be used within ShowroomProvider')
  return ctx
}
