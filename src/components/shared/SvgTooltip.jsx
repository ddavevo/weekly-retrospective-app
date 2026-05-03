import { useState } from 'react'

export default function SvgTooltip({ content, children, cx, cy }) {
  const [visible, setVisible] = useState(false)

  return (
    <g
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      style={{ cursor: 'pointer' }}
    >
      {children}
      {visible && content && (
        <g>
          <rect
            x={cx - 70}
            y={cy - 36}
            width={140}
            height={22}
            rx={4}
            fill="#1c1917"
            fillOpacity={0.9}
          />
          <text
            x={cx}
            y={cy - 22}
            textAnchor="middle"
            fill="white"
            fontSize={9}
            dominantBaseline="middle"
          >
            {content.length > 28 ? content.slice(0, 28) + '…' : content}
          </text>
        </g>
      )}
    </g>
  )
}
