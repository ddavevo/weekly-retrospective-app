import Tag from '../shared/Tag'

const TYPE_COLORS = {
  video: '#ef4444',
  article: '#6366f1',
  podcast: '#f59e0b',
}

export default function ContentCard({ item }) {
  const typeColor = TYPE_COLORS[item.type] || '#94a3b8'

  return (
    <div className="h-full flex flex-col bg-white rounded-[--radius-card] shadow-[--shadow-card] overflow-hidden border border-[--color-border]">
      <div className="relative flex-shrink-0">
        <img
          src={item.thumbnail}
          alt={item.title}
          className="w-full aspect-video object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <div className="absolute bottom-3 left-3">
          <Tag label={item.type} color={typeColor} />
        </div>
      </div>

      <div className="flex-1 p-5 flex flex-col gap-3">
        <div>
          <p className="text-xs text-[--color-text-secondary] mb-1">
            {item.source}
          </p>
          <h3 className="text-base font-semibold text-[--color-text-primary] leading-snug">
            {item.title}
          </h3>
        </div>

        <div className="flex items-center gap-3 text-xs text-[--color-text-secondary]">
          <span>{item.estimatedTime}</span>
          <span>·</span>
          <span>{new Date(item.dateViewed).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
        </div>

        <div className="flex flex-wrap gap-1.5 mt-auto">
          {item.tags?.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs text-[--color-text-secondary] bg-stone-50 border border-[--color-border] px-2 py-0.5 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
