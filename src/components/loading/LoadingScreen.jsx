import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import ContentCardSkeleton from './ContentCardSkeleton'

const MESSAGES = [
  'Gathering your week…',
  'Identifying patterns…',
  'Almost ready…',
]

export default function LoadingScreen({ onComplete }) {
  const containerRef = useRef(null)
  const textRef = useRef(null)
  const [msgIndex, setMsgIndex] = useState(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline()

      tl.to('.card-skeleton', {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 0.4,
        ease: 'power2.out',
        from: { y: 20, opacity: 0 },
      })
    }, containerRef)

    const msgInterval = setInterval(() => {
      setMsgIndex((i) => (i + 1) % MESSAGES.length)
    }, 700)

    const timer = setTimeout(() => {
      clearInterval(msgInterval)
      ctx.revert()
      onComplete()
    }, 2500)

    return () => {
      clearTimeout(timer)
      clearInterval(msgInterval)
      ctx.revert()
    }
  }, [onComplete])

  return (
    <div
      ref={containerRef}
      className="flex flex-col items-center justify-center min-h-screen gap-6 px-6"
    >
      <div className="w-full max-w-sm space-y-3">
        <ContentCardSkeleton index={0} />
        <ContentCardSkeleton index={1} />
        <ContentCardSkeleton index={2} />
      </div>
      <p
        ref={textRef}
        key={msgIndex}
        className="text-sm text-[--color-text-secondary] animate-pulse"
      >
        {MESSAGES[msgIndex]}
      </p>
    </div>
  )
}
