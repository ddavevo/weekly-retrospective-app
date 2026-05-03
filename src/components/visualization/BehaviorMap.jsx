import SvgTooltip from '../shared/SvgTooltip'

const INTENT_X = { Habit: 0.1, Bored: 0.25, Curious: 0.7, Intentional: 0.9 }
const QUADRANTS = [
  { x: 0.5, y: 0.08, label: 'Deep Learning', align: 'middle' },
  { x: 0.08, y: 0.08, label: 'Comfortable Habit', align: 'start' },
  { x: 0.08, y: 0.92, label: 'Mindless Loop', align: 'start' },
  { x: 0.92, y: 0.92, label: 'Exploration', align: 'end' },
]

export default function BehaviorMap({ items, responses }) {
  const W = 560
  const H = 380
  const pad = 48

  const plotW = W - pad * 2
  const plotH = H - pad * 2

  const nodes = items.map((item) => {
    const r = responses[item.id]
    const xRatio = INTENT_X[r?.intent] ?? 0.5
    const yRatio = 1 - (r?.value ?? 5) / 10
    return {
      cx: pad + xRatio * plotW,
      cy: pad + yRatio * plotH,
      item,
      response: r,
    }
  })

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-h-[380px]">
      {/* grid lines */}
      <line x1={pad + plotW / 2} y1={pad} x2={pad + plotW / 2} y2={pad + plotH} stroke="#e7e5e4" strokeWidth={1} strokeDasharray="4 4" />
      <line x1={pad} y1={pad + plotH / 2} x2={pad + plotW} y2={pad + plotH / 2} stroke="#e7e5e4" strokeWidth={1} strokeDasharray="4 4" />

      {/* axis labels */}
      <text x={pad} y={H - 12} fill="#94a3b8" fontSize={10} fontWeight={500}>← Passive</text>
      <text x={W - pad} y={H - 12} fill="#94a3b8" fontSize={10} fontWeight={500} textAnchor="end">Intentional →</text>
      <text x={12} y={pad} fill="#94a3b8" fontSize={10} fontWeight={500} transform={`rotate(-90, 12, ${pad})`} textAnchor="end">High Value</text>
      <text x={12} y={pad + plotH} fill="#94a3b8" fontSize={10} fontWeight={500} transform={`rotate(-90, 12, ${pad + plotH})`} textAnchor="start">Low Value</text>

      {/* quadrant labels */}
      {QUADRANTS.map((q) => (
        <text
          key={q.label}
          x={pad + q.x * plotW}
          y={pad + q.y * plotH}
          fill="#d4d0cd"
          fontSize={9}
          textAnchor={q.align}
        >
          {q.label}
        </text>
      ))}

      {/* nodes */}
      {nodes.map((node, i) => (
        <SvgTooltip
          key={node.item.id}
          cx={node.cx}
          cy={node.cy}
          content={`${node.item.title.slice(0, 28)}… · ${node.response?.intent ?? '?'}`}
        >
          <circle
            cx={node.cx}
            cy={node.cy}
            r={7}
            fill="#6366f1"
            fillOpacity={0.7}
            stroke="#6366f1"
            strokeWidth={1}
            strokeOpacity={0.3}
            className="cursor-pointer"
          />
        </SvgTooltip>
      ))}
    </svg>
  )
}
