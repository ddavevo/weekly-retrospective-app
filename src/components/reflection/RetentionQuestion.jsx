const OPTIONS = ['Yes', 'Vaguely', 'No']

export default function RetentionQuestion({ value, onChange }) {
  return (
    <div>
      <p className="text-xs font-medium text-[--color-text-secondary] uppercase tracking-wider mb-3">
        Do you remember this?
      </p>
      <div className="flex gap-2">
        {OPTIONS.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={`flex-1 py-2.5 text-sm font-medium rounded-xl border transition-all duration-150 hover:scale-[1.03] active:scale-[0.97] cursor-pointer ${
              value === opt
                ? 'bg-[--color-brand] text-white border-[--color-brand] shadow-sm'
                : 'bg-white border-[--color-border] text-[--color-text-secondary] hover:border-stone-400 hover:text-[--color-text-primary]'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  )
}
