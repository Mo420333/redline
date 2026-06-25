/**
 * A deterministic QR-style matrix derived from `value`. Not a real scannable
 * QR code — a stylized stand-in for the prototype's quick-share card.
 */
export default function ScanCode({ value = '', size = 132 }) {
  const N = 21
  // Simple deterministic hash → bit for each cell.
  const seedAt = (i) => {
    let h = 2166136261
    const s = `${value}#${i}`
    for (let k = 0; k < s.length; k++) {
      h ^= s.charCodeAt(k)
      h = Math.imul(h, 16777619)
    }
    return (h >>> 0) % 100 < 48
  }

  const isFinder = (r, c) => {
    const inBox = (br, bc) => r >= br && r < br + 7 && c >= bc && c < bc + 7
    return inBox(0, 0) || inBox(0, N - 7) || inBox(N - 7, 0)
  }

  const cells = []
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      if (isFinder(r, c)) continue
      if (seedAt(r * N + c)) cells.push([r, c])
    }
  }

  const unit = size / N

  const Finder = ({ x, y }) => (
    <>
      <rect x={x * unit} y={y * unit} width={unit * 7} height={unit * 7} rx={unit} fill="#fff" />
      <rect x={(x + 1) * unit} y={(y + 1) * unit} width={unit * 5} height={unit * 5} rx={unit * 0.6} fill="#07070a" />
      <rect x={(x + 2) * unit} y={(y + 2) * unit} width={unit * 3} height={unit * 3} rx={unit * 0.4} fill="#fff" />
    </>
  )

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="rounded-lg bg-white p-1.5">
      <rect width={size} height={size} fill="#fff" />
      {cells.map(([r, c], i) => (
        <rect key={i} x={c * unit} y={r * unit} width={unit} height={unit} rx={unit * 0.25} fill="#07070a" />
      ))}
      <Finder x={0} y={0} />
      <Finder x={N - 7} y={0} />
      <Finder x={0} y={N - 7} />
    </svg>
  )
}
