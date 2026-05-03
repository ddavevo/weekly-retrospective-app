import { useState, useRef } from 'react'
import { useEffect } from 'react'
import { gsap } from 'gsap'
import ClusterMap from './ClusterMap'
import BehaviorMap from './BehaviorMap'
import TimeDistribution from './TimeDistribution'

const VIEWS = [
  { id: 'cluster', label: 'Cluster Map' },
  { id: 'behavior', label: 'Behavior Map' },
  { id: 'time', label: 'Time Distribution' },
]

export default function VisualizationCanvas({ items, responses }) {
  const [activeView, setActiveView] = useState('cluster')
  const canvasRef = useRef(null)

  function handleSwitch(viewId) {
    if (viewId === activeView) return
    gsap.fromTo(canvasRef.current, { opacity: 0.2 }, { opacity: 1, duration: 0.25, ease: 'power2.out' })
    setActiveView(viewId)
  }

  return (
    <div>
      <div className="flex gap-1 p-1 bg-stone-100 rounded-xl mb-6 w-fit">
        {VIEWS.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => handleSwitch(id)}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-150 cursor-pointer ${
              activeView === id
                ? 'bg-white text-[--color-text-primary] shadow-sm'
                : 'text-[--color-text-secondary] hover:text-[--color-text-primary]'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div ref={canvasRef} className="bg-white rounded-[--radius-card] border border-[--color-border] shadow-[--shadow-card] p-6">
        {activeView === 'cluster' && <ClusterMap items={items} responses={responses} />}
        {activeView === 'behavior' && <BehaviorMap items={items} responses={responses} />}
        {activeView === 'time' && <TimeDistribution items={items} />}
      </div>

      <div className="mt-4 flex gap-6 text-xs text-[--color-text-secondary]">
        {activeView === 'cluster' && (
          <>
            <span>Circle size = value rating</span>
            <span>Opacity = retention</span>
          </>
        )}
        {activeView === 'behavior' && (
          <>
            <span>X axis: passive → intentional</span>
            <span>Y axis: low → high value</span>
          </>
        )}
        {activeView === 'time' && (
          <>
            <span>Items by day of week</span>
            <span>Colored by content type</span>
          </>
        )}
      </div>
    </div>
  )
}
