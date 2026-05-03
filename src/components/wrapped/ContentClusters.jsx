import SvgTooltip from '../shared/SvgTooltip'

const POSITIONS = [
  { cx: 160, cy: 110 },
  { cx: 340, cy: 90 },
  { cx: 480, cy: 150 },
  { cx: 100, cy: 220 },
  { cx: 280, cy: 230 },
  { cx: 430, cy: 260 },
  { cx: 190, cy: 310 },
  { cx: 380, cy: 320 },
]

const JITTER_X = [0, 0, -28, 28, 0, -20, 20, 0, -15, 15]
const JITTER_Y = [0, -25, 10, 10, 25, -10, -10, 0, 5, -5]

export default function ContentClusters({ clusters }) {
  const nodes = []

  clusters.forEach((cluster, ci) => {
    const pos = POSITIONS[ci % POSITIONS.length]
    const r = 14 + cluster.count * 5

    cluster.entries.forEach((entry, ei) => {
      const angle = (ei / cluster.entries.length) * Math.PI * 2 - Math.PI / 2
      const dist = r + 20
      const nx = pos.cx + Math.cos(angle) * dist + (JITTER_X[ei] || 0)
      const ny = pos.cy + Math.sin(angle) * dist + (JITTER_Y[ei] || 0)
      const valueR = 4 + ((entry.response?.value ?? 5) / 10) * 10
      const opacity = entry.response
        ? ({ Yes: 1, Vaguely: 0.55, No: 0.2 }[entry.response.retention] ?? 0.55)
        : 0.4

      nodes.push({ x: nx, y: ny, r: valueR, opacity, entry, cluster })
    })
  })

  return (
    <div className="cluster-nodes w-full">
      <svg viewBox="0 0 580 400" className="w-full max-w-2xl mx-auto">
        {clusters.map((cluster, ci) => {
          const pos = POSITIONS[ci % POSITIONS.length]
          return (
            <g key={cluster.topic}>
              <circle
                cx={pos.cx}
                cy={pos.cy}
                r={14 + cluster.count * 5}
                fill="white"
                fillOpacity={0.06}
                stroke="white"
                strokeOpacity={0.15}
                strokeWidth={1}
              />
              <text
                x={pos.cx}
                y={pos.cy}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="white"
                fillOpacity={0.7}
                fontSize={10}
                fontWeight={500}
              >
                {cluster.topic}
              </text>
            </g>
          )
        })}

        {nodes.map((node, i) => (
          <SvgTooltip
            key={i}
            cx={node.x}
            cy={node.y}
            content={node.entry.item.title}
          >
            <circle
              cx={node.x}
              cy={node.y}
              r={node.r}
              fill="white"
              fillOpacity={node.opacity}
              className="viz-node"
            />
          </SvgTooltip>
        ))}
      </svg>
    </div>
  )
}
