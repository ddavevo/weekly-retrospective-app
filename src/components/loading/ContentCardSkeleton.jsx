export default function ContentCardSkeleton({ index }) {
  return (
    <div
      className="card-skeleton bg-white rounded-2xl p-4 flex gap-4 items-center border border-[--color-border] shadow-sm"
      style={{ opacity: 0 }}
    >
      <div className="w-16 h-12 rounded-lg shimmer flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-3 rounded shimmer" style={{ width: `${70 + index * 8}%` }} />
        <div className="h-3 rounded shimmer w-1/3" />
      </div>
    </div>
  )
}
