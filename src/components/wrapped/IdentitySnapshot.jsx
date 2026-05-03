import { useRef } from 'react'

export default function IdentitySnapshot({ identity }) {
  const ref = useRef(null)

  return (
    <div ref={ref} className="identity-reveal text-center px-6 py-12">
      <p className="text-xs uppercase tracking-[0.2em] text-white/60 mb-4">
        This week, you were a
      </p>
      <h1
        className="text-6xl md:text-8xl font-bold tracking-tight mb-6 leading-none"
        style={{ color: identity.color }}
      >
        {identity.name}
      </h1>
      <p className="text-base text-white/70 max-w-sm mx-auto leading-relaxed">
        {identity.description}
      </p>
    </div>
  )
}
