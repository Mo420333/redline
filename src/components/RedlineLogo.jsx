export default function RedlineLogo({ className = 'h-7 w-7' }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      {/* Tachometer needle past the redline */}
      <circle cx="16" cy="16" r="14" fill="none" stroke="#1f2937" strokeWidth="3" />
      <path
        d="M16 16 L26 9"
        stroke="#dc2626"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M4 11 A14 14 0 0 1 9 5"
        fill="none"
        stroke="#dc2626"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="16" cy="16" r="3" fill="#dc2626" />
    </svg>
  )
}
