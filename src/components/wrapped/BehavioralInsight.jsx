export default function BehavioralInsight({ insight }) {
  return (
    <div className="behavioral-insight text-center px-6 max-w-xl mx-auto">
      <div className="w-8 h-px bg-white/30 mx-auto mb-6" />
      <p className="text-xl md:text-2xl font-medium text-white/90 leading-relaxed">
        "{insight}"
      </p>
    </div>
  )
}
