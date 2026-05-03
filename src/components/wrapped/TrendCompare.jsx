export default function TrendCompare({ currentAvgValue, pastWeeks }) {
  const allValues = [...pastWeeks.map((w) => w.stats.avgValue), currentAvgValue]
  const max = Math.max(...allValues, 10)
  const W = 280
  const H = 80
  const pad = 16

  const points = allValues.map((v, i) => ({
    x: pad + (i / (allValues.length - 1)) * (W - pad * 2),
    y: H - pad - ((v / max) * (H - pad * 2)),
    v,
    isCurrent: i === allValues.length - 1,
  }))

  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')

  return (
    <div className="trend-compare flex flex-col items-center gap-3">
      <p className="text-xs uppercase tracking-widest text-white/50">vs. last 4 weeks</p>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full max-w-xs sparkline-path"
        style={{ '--dash-offset': '300' }}
      >
        <path
          d={pathD}
          fill="none"
          stroke="white"
          strokeOpacity={0.35}
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="sparkline-path"
        />
        {points.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={p.isCurrent ? 5 : 3}
            fill={p.isCurrent ? '#ffffff' : 'white'}
            fillOpacity={p.isCurrent ? 1 : 0.4}
          />
        ))}
      </svg>
      <div className="flex gap-4 text-xs text-white/50">
        {pastWeeks.map((w) => (
          <span key={w.weekId}>{w.stats.avgValue.toFixed(1)}</span>
        ))}
        <span className="text-white font-medium">{currentAvgValue.toFixed(1)}</span>
      </div>
    </div>
  )
}
