export default function Tag({ label, color }) {
  return (
    <span
      className="inline-block text-xs font-medium px-2.5 py-0.5 rounded-full border"
      style={color ? { borderColor: `${color}40`, color, backgroundColor: `${color}15` } : {}}
    >
      {label}
    </span>
  )
}
