const OPTIONS = ['Curious', 'Bored', 'Habit', 'Intentional']

export default function IntentQuestion({ value, onChange }) {
  return (
    <div>
      <p className="text-xs font-medium text-[--color-text-secondary] uppercase tracking-wider mb-3">
        Why did you engage?
      </p>
      <div className="grid grid-cols-2 gap-2">
        {OPTIONS.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={`py-2.5 text-sm font-medium rounded-xl border transition-all duration-150 hover:scale-[1.03] active:scale-[0.97] cursor-pointer ${
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
