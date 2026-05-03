import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function ProgressBar({ current, total }) {
  const barRef = useRef(null)
  const prevRef = useRef(current)

  useEffect(() => {
    if (!barRef.current) return
    const segments = barRef.current.querySelectorAll('.progress-segment')
    const currentSegment = segments[current - 1]

    if (currentSegment && current > prevRef.current) {
      gsap.fromTo(
        currentSegment,
        { scaleX: 0, transformOrigin: 'left center' },
        { scaleX: 1, duration: 0.35, ease: 'back.out(1.7)' }
      )

      if (current === total) {
        gsap.to(barRef.current, {
          y: -5,
          duration: 0.18,
          yoyo: true,
          repeat: 1,
          ease: 'power2.out',
          delay: 0.2,
        })
      }
    }
    prevRef.current = current
  }, [current, total])

  return (
    <div className="flex items-center gap-3">
      <div ref={barRef} className="flex gap-1 flex-1">
        {Array.from({ length: total }).map((_, i) => (
          <div key={i} className="flex-1 h-1 rounded-full bg-stone-100 overflow-hidden">
            <div
              className={`progress-segment h-full rounded-full bg-[--color-brand] ${
                i < current ? '' : 'scale-x-0 origin-left'
              }`}
              style={{ transform: i < current ? 'scaleX(1)' : 'scaleX(0)' }}
            />
          </div>
        ))}
      </div>
      <span className="text-xs text-[--color-text-secondary] tabular-nums whitespace-nowrap">
        {current} / {total}
      </span>
    </div>
  )
}
