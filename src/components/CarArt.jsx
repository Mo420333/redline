/** A detailed side-profile car. `bare` drops the background (for the AI Showroom),
 *  `brand: 'bmw'` adds a roundel badge + signature grille so it reads as a BMW. */
export default function CarArt({ color = '#dc2626', sky = '#1e293b', bare = false, brand }) {
  const Wheel = ({ cx }) => (
    <g>
      <circle cx={cx} cy="94" r="19" fill="#0a0a0a" />
      <circle cx={cx} cy="94" r="12" fill="#cbd5e1" />
      <circle cx={cx} cy="94" r="12" fill="none" stroke="#64748b" strokeWidth="1" />
      {/* spokes */}
      {[0, 72, 144, 216, 288].map((a) => {
        const r = (a * Math.PI) / 180
        return (
          <line
            key={a}
            x1={cx}
            y1="94"
            x2={cx + Math.cos(r) * 11}
            y2={94 + Math.sin(r) * 11}
            stroke="#475569"
            strokeWidth="2"
          />
        )
      })}
      <circle cx={cx} cy="94" r="3.5" fill="#1e293b" />
    </g>
  )

  return (
    <svg viewBox="0 0 240 130" className="h-full w-full" preserveAspectRatio={bare ? 'xMidYMid meet' : 'xMidYMid slice'} aria-hidden="true">
      <defs>
        <linearGradient id={`sky-${color}-${sky}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={sky} />
          <stop offset="1" stopColor="#07070a" />
        </linearGradient>
        <linearGradient id={`body-${color}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.35" />
          <stop offset="0.18" stopColor={color} />
          <stop offset="1" stopColor="#000" stopOpacity="0.4" />
        </linearGradient>
      </defs>

      {!bare && (
        <>
          <rect width="240" height="130" fill={`url(#sky-${color}-${sky})`} />
          <rect y="104" width="240" height="26" fill="#000" opacity="0.45" />
          <line x1="0" y1="104" x2="240" y2="104" stroke={color} strokeOpacity="0.3" strokeWidth="1" />
        </>
      )}

      {/* Front headlight glow */}
      <ellipse cx="226" cy="74" rx="20" ry="7" fill={color} opacity="0.22" />

      {/* Body (front at right) */}
      <path
        d="M16 90 L15 75 C15 69 20 66 28 65 L60 61 L80 49 C86 46 92 45 100 45 L150 45 C160 45 166 49 172 56 L206 63 C220 65 230 71 233 81 L233 90 Z"
        fill={`url(#body-${color})`}
        stroke="#000"
        strokeOpacity="0.25"
        strokeWidth="1"
      />

      {/* Greenhouse / windows */}
      <path d="M84 52 C89 49 94 48 100 48 L146 48 C153 48 158 51 163 57 L150 60 L96 60 Z" fill="#0b1220" opacity="0.85" />
      {/* B-pillar */}
      <line x1="120" y1="49" x2="120" y2="59" stroke="#0b1220" strokeWidth="3" opacity="0.9" />

      {/* Beltline + door lines */}
      <path d="M30 66 L228 70" stroke="#fff" strokeOpacity="0.18" strokeWidth="1.5" />
      <path d="M120 60 L122 88" stroke="#000" strokeOpacity="0.25" strokeWidth="1.5" />
      <path d="M168 60 L172 86" stroke="#000" strokeOpacity="0.2" strokeWidth="1.5" />
      {/* Door handles */}
      <rect x="104" y="67" width="9" height="2.5" rx="1.2" fill="#000" opacity="0.4" />
      <rect x="150" y="68" width="9" height="2.5" rx="1.2" fill="#000" opacity="0.4" />
      {/* Side mirror */}
      <path d="M172 55 l8 -3 2 4 -8 2 z" fill={color} />

      {/* Taillight */}
      <rect x="16" y="70" width="6" height="7" rx="2" fill="#ef4444" opacity="0.85" />

      {/* BMW signature: twin-kidney grille + headlight */}
      {brand === 'bmw' && (
        <>
          <rect x="227" y="76" width="6" height="9" rx="1.5" fill="#0b1220" />
          <rect x="227" y="76" width="2.6" height="9" rx="1" fill="#1e293b" />
          <rect x="230.4" y="76" width="2.6" height="9" rx="1" fill="#1e293b" />
        </>
      )}
      <path d="M214 67 l16 1 0 4 -16 0 z" fill="#e0f2fe" opacity="0.85" />

      <Wheel cx="60" />
      <Wheel cx="180" />

      {/* Brand roundel on the front fender */}
      {brand === 'bmw' && (
        <g transform="translate(150, 74)">
          <circle r="7.5" fill="#0a0a0a" />
          <circle r="6" fill="#fff" />
          <path d="M0 0 L0 -6 A6 6 0 0 1 6 0 Z" fill="#1d4ed8" />
          <path d="M0 0 L0 6 A6 6 0 0 1 -6 0 Z" fill="#1d4ed8" />
        </g>
      )}
    </svg>
  )
}
