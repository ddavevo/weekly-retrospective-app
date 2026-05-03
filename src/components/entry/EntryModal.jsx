import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Button from '../shared/Button'

export default function EntryModal({ onStart, onRemindLater, weekLabel }) {
  const modalRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        modalRef.current,
        { scale: 0.94, opacity: 0, y: 12 },
        { scale: 1, opacity: 1, y: 0, duration: 0.3, ease: 'back.out(1.4)' }
      )
    }, modalRef)
    return () => ctx.revert()
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px]" />
      <div
        ref={modalRef}
        className="relative bg-[--color-surface-elevated] rounded-[--radius-modal] shadow-[--shadow-modal] p-8 w-full max-w-sm border border-[--color-border]"
      >
        <div className="flex items-center gap-2 mb-6">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
        </div>

        <p className="text-xs text-[--color-text-secondary] uppercase tracking-widest mb-3">
          Weekly Reflection
        </p>
        <h2 className="text-xl font-semibold text-[--color-text-primary] mb-1">
          Your week is ready to reflect on
        </h2>
        {weekLabel && (
          <p className="text-sm text-[--color-text-secondary] mb-6">{weekLabel}</p>
        )}
        <p className="text-sm text-[--color-text-secondary] leading-relaxed mb-8">
          10 things you consumed this week. A few questions each. Takes about 5 minutes.
        </p>

        <div className="flex flex-col gap-3">
          <Button onClick={onStart} className="w-full">
            Start Reflection
          </Button>
          <Button variant="ghost" onClick={onRemindLater} className="w-full">
            Remind me in 3 hours
          </Button>
        </div>
      </div>
    </div>
  )
}
