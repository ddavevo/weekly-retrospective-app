import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function CardTransition({ children, itemIndex }) {
  const containerRef = useRef(null)
  const isFirst = useRef(true)

  useEffect(() => {
    if (!containerRef.current) return

    if (isFirst.current) {
      isFirst.current = false
      gsap.fromTo(
        containerRef.current,
        { x: 0, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.3, ease: 'power2.out' }
      )
      return
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        { x: 40, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.3, ease: 'power2.out' }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [itemIndex])

  return (
    <div ref={containerRef} className="h-full">
      {children}
    </div>
  )
}
