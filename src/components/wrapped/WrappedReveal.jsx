import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import IdentitySnapshot from './IdentitySnapshot'
import ContentClusters from './ContentClusters'
import BehavioralInsight from './BehavioralInsight'
import TrendCompare from './TrendCompare'

export default function WrappedReveal({ identity, clusters, insight, currentAvgValue, pastWeeks }) {
  const containerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } })

      tl
        .fromTo(containerRef.current, { opacity: 0 }, { opacity: 1, duration: 0.4 })
        .fromTo('.identity-reveal', { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.2)' }, '-=0.1')
        .fromTo('.cluster-nodes', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.1')
        .fromTo('.viz-node', { scale: 0, transformOrigin: 'center' }, { scale: 1, stagger: 0.05, duration: 0.35, ease: 'back.out(1.4)' }, '-=0.3')
        .fromTo('.behavioral-insight', { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45 }, '-=0.1')
        .fromTo('.trend-compare', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.4 }, '-=0.1')
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={containerRef}
      className="min-h-screen flex flex-col items-center justify-center gap-12 py-16 px-6 opacity-0"
    >
      <IdentitySnapshot identity={identity} />
      <ContentClusters clusters={clusters} />
      <BehavioralInsight insight={insight} />
      {pastWeeks?.length > 0 && (
        <TrendCompare currentAvgValue={currentAvgValue} pastWeeks={pastWeeks} />
      )}
    </div>
  )
}
