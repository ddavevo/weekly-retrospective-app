import { IDENTITIES } from '../../utils/deriveIdentity'
import MiniViz from './MiniViz'

export default function WeekCard({ week }) {
  const identityMeta = IDENTITIES[week.identity] || {}

  return (
    <div className="week-card bg-[--color-surface-elevated] rounded-[--radius-card] border border-[--color-border] shadow-[--shadow-card] p-6">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <p className="text-xs text-[--color-text-secondary] mb-1">{week.weekLabel}</p>
          <span
            className="inline-block text-sm font-semibold px-3 py-1 rounded-full border"
            style={{
              color: identityMeta.color,
              borderColor: `${identityMeta.color}40`,
              backgroundColor: `${identityMeta.color}12`,
            }}
          >
            {week.identity}
          </span>
        </div>
        <MiniViz topTags={week.topTags} stats={week.stats} />
      </div>

      <p className="text-sm text-[--color-text-secondary] leading-relaxed mb-4">
        {week.keyInsight}
      </p>

      <div className="flex flex-wrap gap-1.5">
        {week.topTags?.map((tag) => (
          <span
            key={tag}
            className="text-xs px-2 py-0.5 rounded-full bg-stone-50 border border-[--color-border] text-[--color-text-secondary]"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-[--color-border] grid grid-cols-3 gap-3 text-center">
        <div>
          <p className="text-xs text-[--color-text-secondary] mb-0.5">Avg Value</p>
          <p className="text-sm font-semibold text-[--color-text-primary]">
            {week.stats.avgValue.toFixed(1)}
          </p>
        </div>
        <div>
          <p className="text-xs text-[--color-text-secondary] mb-0.5">Retention</p>
          <p className="text-sm font-semibold text-[--color-text-primary]">
            {week.stats.topRetention}
          </p>
        </div>
        <div>
          <p className="text-xs text-[--color-text-secondary] mb-0.5">Intent</p>
          <p className="text-sm font-semibold text-[--color-text-primary]">
            {week.stats.dominantIntent}
          </p>
        </div>
      </div>
    </div>
  )
}
