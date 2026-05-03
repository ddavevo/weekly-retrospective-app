import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import WeekCard from './WeekCard'

export default function TimelineList({ weeks }) {
  const listRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.week-card',
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.5, ease: 'power2.out' }
      )
    }, listRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={listRef} className="space-y-4">
      {weeks.map((week) => (
        <WeekCard key={week.weekId} week={week} />
      ))}
    </div>
  )
}
