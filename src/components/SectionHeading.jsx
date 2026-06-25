import Reveal from './Reveal'

export default function SectionHeading({ eyebrow, title, subtitle, tone = 'dark' }) {
  const titleColor = tone === 'light' ? 'text-slate-900' : 'text-white'
  const subColor = tone === 'light' ? 'text-slate-600' : 'text-slate-400'
  return (
    <Reveal className="mx-auto mb-12 max-w-2xl text-center">
      {eyebrow && (
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-redline">
          {eyebrow}
        </span>
      )}
      <h2 className={`mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl ${titleColor}`}>
        {title}
      </h2>
      {subtitle && <p className={`mt-4 ${subColor}`}>{subtitle}</p>}
    </Reveal>
  )
}
