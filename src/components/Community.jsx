import { useEffect, useRef, useState } from 'react'
import { CHANNELS, SEED_MESSAGES } from '../data'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

const REPLIES = [
  'For sure 🙌',
  'See you there!',
  'Pulling up 🏎️',
  'What time we rolling?',
  'Save me a spot 🔥',
]

export default function Community() {
  const [channels, setChannels] = useState(CHANNELS)
  const [active, setActive] = useState(CHANNELS[0].id)
  const [threads, setThreads] = useState(SEED_MESSAGES)
  const [draft, setDraft] = useState('')
  const scrollRef = useRef(null)

  const messages = threads[active] || []

  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages, active])

  const send = (e) => {
    e.preventDefault()
    const text = draft.trim()
    if (!text) return
    const channelId = active
    setThreads((prev) => ({
      ...prev,
      [channelId]: [
        ...(prev[channelId] || []),
        { id: Date.now(), user: 'You', text, me: true },
      ],
    }))
    setDraft('')
    // Simulated crew reply
    const reply = REPLIES[Math.floor(text.length % REPLIES.length)]
    setTimeout(() => {
      setThreads((prev) => ({
        ...prev,
        [channelId]: [
          ...(prev[channelId] || []),
          { id: Date.now() + 1, user: 'Crew', text: reply, me: false },
        ],
      }))
    }, 900)
  }

  const newChat = () => {
    const name = window.prompt('Name your group chat')
    if (!name || !name.trim()) return
    const id = `c-${Date.now()}`
    setChannels((prev) => [...prev, { id, name: name.trim(), members: 1, emoji: '💬' }])
    setThreads((prev) => ({ ...prev, [id]: [] }))
    setActive(id)
  }

  const activeChannel = channels.find((c) => c.id === active)

  return (
    <section id="community" className="bg-ink-soft py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeading
          eyebrow="Link Up"
          title="Group chats & crews"
          subtitle="Join crews by scene or city, talk builds and meetups, and start your own group chat."
        />

        <Reveal className="grid gap-4 overflow-hidden rounded-3xl border border-white/10 bg-ink-card md:grid-cols-[260px_1fr]">
          {/* Channel list */}
          <div className="border-white/10 p-4 md:border-r">
            <button
              onClick={newChat}
              className="mb-3 w-full rounded-lg bg-redline px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-redline-dark"
            >
              + New group chat
            </button>
            <div className="flex gap-2 overflow-x-auto md:flex-col md:gap-1 md:overflow-visible">
              {channels.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setActive(c.id)}
                  className={`flex shrink-0 items-center gap-3 rounded-xl px-3 py-2.5 text-left transition md:w-full ${
                    active === c.id ? 'bg-redline/15 ring-1 ring-redline/40' : 'hover:bg-white/5'
                  }`}
                >
                  <span className="text-xl">{c.emoji}</span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-semibold text-white">{c.name}</span>
                    <span className="block text-xs text-slate-500">{c.members.toLocaleString()} members</span>
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Thread */}
          <div className="flex h-[26rem] flex-col">
            <div className="flex items-center gap-3 border-b border-white/10 px-5 py-3">
              <span className="text-xl">{activeChannel?.emoji}</span>
              <div>
                <p className="text-sm font-bold text-white">{activeChannel?.name}</p>
                <p className="text-xs text-slate-500">{activeChannel?.members.toLocaleString()} members · online now</p>
              </div>
            </div>

            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
              {messages.length === 0 ? (
                <p className="py-12 text-center text-sm text-slate-600">
                  No messages yet. Say hey 👋
                </p>
              ) : (
                messages.map((m) => (
                  <div key={m.id} className={`flex ${m.me ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[78%] rounded-2xl px-4 py-2 text-sm ${
                      m.me ? 'bg-redline text-white' : 'bg-white/10 text-slate-200'
                    }`}>
                      {!m.me && <span className="mb-0.5 block text-xs font-semibold text-redline">{m.user}</span>}
                      {m.text}
                    </div>
                  </div>
                ))
              )}
            </div>

            <form onSubmit={send} className="flex gap-2 border-t border-white/10 p-3">
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder={`Message ${activeChannel?.name}…`}
                className="flex-1 rounded-xl border border-white/15 bg-ink-soft px-4 py-2.5 text-sm text-white outline-none placeholder:text-slate-500 focus:border-redline"
              />
              <button type="submit" className="rounded-xl bg-redline px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-redline-dark">
                Send
              </button>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
