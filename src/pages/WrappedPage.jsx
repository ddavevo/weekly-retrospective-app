import { useNavigate } from 'react-router-dom'
import { useAppStore } from '../store/useAppStore'
import { deriveIdentity, deriveInsight, deriveClusters } from '../utils/deriveIdentity'
import WrappedReveal from '../components/wrapped/WrappedReveal'
import NavBar from '../components/shared/NavBar'

export default function WrappedPage() {
  const { state } = useAppStore()
  const navigate = useNavigate()
  const { responses, currentWeek, pastWeeks } = state

  if (!currentWeek) return null

  const items = currentWeek.items
  const identity = deriveIdentity(responses, items)
  const insight = deriveInsight(responses, items)
  const clusters = deriveClusters(responses, items)

  const answeredValues = Object.values(responses).map((r) => r.value ?? 5)
  const currentAvgValue =
    answeredValues.length > 0
      ? answeredValues.reduce((a, b) => a + b, 0) / answeredValues.length
      : 5

  const identityColor = identity.color

  return (
    <div
      className="relative min-h-screen"
      style={{
        background: `radial-gradient(ellipse at 50% 0%, ${identityColor}30 0%, #0f0e0e 60%)`,
      }}
    >
      <NavBar />
      <div className="pt-16">
        <WrappedReveal
          identity={identity}
          clusters={clusters}
          insight={insight}
          currentAvgValue={currentAvgValue}
          pastWeeks={pastWeeks}
        />
      </div>

      <div className="pb-16 flex justify-center gap-4">
        <button
          onClick={() => navigate('/timeline')}
          className="text-sm text-white/60 hover:text-white/90 underline underline-offset-4 transition-colors cursor-pointer"
        >
          View Timeline
        </button>
        <button
          onClick={() => navigate('/visualize')}
          className="text-sm text-white/60 hover:text-white/90 underline underline-offset-4 transition-colors cursor-pointer"
        >
          Explore Visualization
        </button>
      </div>
    </div>
  )
}
