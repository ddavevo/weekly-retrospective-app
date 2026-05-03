export default function Button({ variant = 'primary', onClick, disabled, children, className = '', type = 'button' }) {
  const base = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-150 cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2'
  const hover = disabled ? '' : 'hover:scale-[1.03] active:scale-[0.97]'

  const variants = {
    primary: 'bg-[--color-brand] text-white px-6 py-3 text-sm shadow-sm hover:bg-indigo-600 focus-visible:ring-indigo-500',
    ghost: 'border border-[--color-border] text-[--color-text-secondary] px-6 py-3 text-sm hover:border-stone-400 hover:text-[--color-text-primary]',
    text: 'text-[--color-text-secondary] text-sm px-3 py-2 hover:text-[--color-text-primary]',
    danger: 'bg-red-500 text-white px-6 py-3 text-sm hover:bg-red-600',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${hover} ${variants[variant]} ${disabled ? 'opacity-40 cursor-not-allowed' : ''} ${className}`}
    >
      {children}
    </button>
  )
}
