export default function ValueSlider({ value, onChange }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-medium text-[--color-text-secondary] uppercase tracking-wider">
          Did this add value?
        </p>
        <span className="text-sm font-semibold text-[--color-brand] tabular-nums">{value}/10</span>
      </div>
      <input
        type="range"
        min={0}
        max={10}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-stone-200
          [&::-webkit-slider-thumb]:appearance-none
          [&::-webkit-slider-thumb]:w-5
          [&::-webkit-slider-thumb]:h-5
          [&::-webkit-slider-thumb]:rounded-full
          [&::-webkit-slider-thumb]:bg-[--color-brand]
          [&::-webkit-slider-thumb]:shadow-md
          [&::-webkit-slider-thumb]:transition-transform
          [&::-webkit-slider-thumb]:duration-100
          [&::-webkit-slider-thumb]:hover:scale-110"
        style={{
          background: `linear-gradient(to right, var(--color-brand) ${value * 10}%, #e7e5e4 ${value * 10}%)`,
        }}
      />
      <div className="flex justify-between mt-1.5">
        <span className="text-xs text-[--color-text-secondary]">Forgettable</span>
        <span className="text-xs text-[--color-text-secondary]">Life-changing</span>
      </div>
    </div>
  )
}
