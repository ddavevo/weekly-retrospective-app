import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import SvgTooltip from '../shared/SvgTooltip'

const CLUSTER_POSITIONS = [
  { cx: 150, cy: 120 },
  { cx: 330, cy: 80 },
  { cx: 500, cy: 130 },
  { cx: 100, cy: 240 },
  { cx: 270, cy: 260 },
  { cx: 450, cy: 250 },
  { cx: 180, cy: 350 },
  { cx: 390, cy: 340 },
]

export default function ClusterMap({ items, responses }) {
  const svgRef = useRef(null)

  const groups = {}
  items.forEach((item) => {
    const tag = item.tags?.[0] || 'other'
    if (!groups[tag]) groups[tag] = []
    groups[tag].push(item)
  })
  const clusters = Object.entries(groups)

  const nodes = []
  clusters.forEach(([tag, clusterItems], ci) => {
    const pos = CLUSTER_POSITIONS[ci % CLUSTER_POSITIONS.length]
    clusterItems.forEach((item, ei) => {
      const angle = (ei / clusterItems.length) * Math.PI * 2 - Math.PI / 2
      const dist = 45
      const r = responses[item.id]
      const valueR = 5 + ((r?.value ?? 5) / 10) * 12
      const opacity = r ? ({ Yes: 1, Vaguely: 0.5, No: 0.2 }[r.retention] ?? 0.5) : 0.4
      nodes.push({
        x: pos.cx + Math.cos(angle) * dist,
        y: pos.cy + Math.sin(angle) * dist,
        r: valueR,
        opacity,
        item,
        response: r,
        tag,
        pos,
      })
    })
  })

  useEffect(() => {
    if (!svgRef.current) return
    const ctx = gsap.context(() => {
      gsap.from('.viz-node', {
        scale: 0,
        transformOrigin: 'center',
        stagger: 0.04,
        duration: 0.4,
        ease: 'back.out(1.6)',
      })
    }, svgRef)
    return () => ctx.revert()
  }, [])

  return (
    <svg ref={svgRef} viewBox="0 0 600 420" className="w-full max-h-[420px]">
      {clusters.map(([tag, clusterItems], ci) => {
        const pos = CLUSTER_POSITIONS[ci % CLUSTER_POSITIONS.length]
        return (
          <g key={tag}>
            <circle cx={pos.cx} cy={pos.cy} r={32} fill="#6366f1" fillOpacity={0.08} stroke="#6366f1" strokeOpacity={0.2} strokeWidth={1} />
            <text x={pos.cx} y={pos.cy} textAnchor="middle" dominantBaseline="middle" fill="#6366f1" fontSize={10} fontWeight={600}>
              {tag}
            </text>
          </g>
        )
      })}

      {nodes.map((node, i) => (
        <SvgTooltip
          key={node.item.id}
          cx={node.x}
          cy={node.y}
          content={`${node.item.title.slice(0, 32)}…`}
        >
          <circle
            className="viz-node cursor-pointer"
            cx={node.x}
            cy={node.y}
            r={node.r}
            fill="#6366f1"
            fillOpacity={node.opacity}
            stroke="#6366f1"
            strokeOpacity={0.3}
            strokeWidth={1}
          />
        </SvgTooltip>
      ))}
    </svg>
  )
}
