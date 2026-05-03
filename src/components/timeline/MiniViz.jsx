export default function MiniViz({ topTags, stats }) {
  if (!topTags?.length) return null

  const maxLen = Math.max(...topTags.map((t) => t.length), 1)
  const W = 120
  const H = 40
  const barW = Math.floor((W - (topTags.length - 1) * 4) / topTags.length)

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-20 h-10">
      {topTags.slice(0, 4).map((tag, i) => {
        const barH = Math.max(8, (tag.length / maxLen) * (H - 4))
        const x = i * (barW + 4)
        const y = H - barH
        return (
          <rect
            key={tag}
            x={x}
            y={y}
            width={barW}
            height={barH}
            rx={2}
            fill="#6366f1"
            fillOpacity={0.3 + (i / (topTags.length - 1 || 1)) * 0.4}
          />
        )
      })}
    </svg>
  )
}
