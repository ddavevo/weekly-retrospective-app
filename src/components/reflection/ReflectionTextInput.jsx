const MAX = 200

export default function ReflectionTextInput({ value, onChange }) {
  return (
    <div>
      <p className="text-xs font-medium text-[--color-text-secondary] uppercase tracking-wider mb-3">
        What stuck with you? <span className="normal-case font-normal">(optional)</span>
      </p>
      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value.slice(0, MAX))}
          placeholder="One thing that made an impression…"
          rows={3}
          className="w-full text-sm text-[--color-text-primary] placeholder:text-stone-300 border border-[--color-border] rounded-xl px-4 py-3 resize-none focus:outline-none focus:border-[--color-brand] focus:ring-1 focus:ring-[--color-brand]/30 transition-colors duration-150 bg-white"
        />
        <span className="absolute bottom-3 right-3 text-xs text-stone-300 tabular-nums">
          {value.length}/{MAX}
        </span>
      </div>
    </div>
  )
}
