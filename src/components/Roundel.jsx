/** A BMW-style quartered roundel (brand-flavored, not a licensed logo). */
export default function Roundel({ className = 'h-6 w-6' }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-label="BMW-style badge">
      <circle cx="20" cy="20" r="19" fill="#0a0a0a" />
      <circle cx="20" cy="20" r="15" fill="#ffffff" />
      {/* blue quarters: top-right and bottom-left */}
      <path d="M20 20 L20 5 A15 15 0 0 1 35 20 Z" fill="#1d4ed8" />
      <path d="M20 20 L20 35 A15 15 0 0 1 5 20 Z" fill="#1d4ed8" />
      <circle cx="20" cy="20" r="15" fill="none" stroke="#0a0a0a" strokeWidth="1.5" />
      <circle cx="20" cy="20" r="19" fill="none" stroke="#1f2937" strokeWidth="1" />
    </svg>
  )
}
