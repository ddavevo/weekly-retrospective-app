const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const TYPE_COLORS = { video: '#ef4444', article: '#6366f1', podcast: '#f59e0b' }

function getDayOfWeek(dateStr) {
  const d = new Date(dateStr)
  return (d.getDay() + 6) % 7
}

export default function TimeDistribution({ items }) {
  const byDay = Array.from({ length: 7 }, () => ({ video: 0, article: 0, podcast: 0, total: 0 }))

  items.forEach((item) => {
    const day = getDayOfWeek(item.dateViewed)
    byDay[day][item.type] = (byDay[day][item.type] || 0) + 1
    byDay[day].total++
  })

  const maxTotal = Math.max(...byDay.map((d) => d.total), 1)
  const W = 560
  const H = 200
  const pad = 32
  const barAreaW = W - pad * 2
  const barAreaH = H - pad - 24
  const barW = Math.floor(barAreaW / 7) - 8

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-h-[200px]">
      {byDay.map((day, i) => {
        const x = pad + i * (barW + 8)
        let yOffset = H - 24

        return (
          <g key={i}>
            {Object.entries(TYPE_COLORS).map(([type, color]) => {
              if (!day[type]) return null
              const barH = (day[type] / maxTotal) * barAreaH
              yOffset -= barH
              return (
                <rect
                  key={type}
                  x={x}
                  y={yOffset}
                  width={barW}
                  height={barH}
                  rx={3}
                  fill={color}
                  fillOpacity={0.75}
                />
              )
            })}
            <text x={x + barW / 2} y={H - 8} textAnchor="middle" fill="#94a3b8" fontSize={10}>
              {DAYS[i]}
            </text>
          </g>
        )
      })}

      {/* legend */}
      {Object.entries(TYPE_COLORS).map(([type, color], i) => (
        <g key={type} transform={`translate(${pad + i * 70}, 8)`}>
          <rect width={10} height={10} rx={2} fill={color} fillOpacity={0.75} />
          <text x={14} y={9} fill="#94a3b8" fontSize={9} textTransform="capitalize">{type}</text>
        </g>
      ))}
    </svg>
  )
}
