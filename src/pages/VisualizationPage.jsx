import { useAppStore } from '../store/useAppStore'
import VisualizationCanvas from '../components/visualization/VisualizationCanvas'
import NavBar from '../components/shared/NavBar'

export default function VisualizationPage() {
  const { state } = useAppStore()
  const { responses, currentWeek } = state

  const items = currentWeek?.items ?? []
  const hasData = Object.keys(responses).length > 0

  return (
    <div className="min-h-screen bg-[--color-surface]">
      <NavBar />
      <div className="max-w-3xl mx-auto px-6 pt-24 pb-16">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-[--color-text-primary] mb-1">Visualization</h1>
          <p className="text-sm text-[--color-text-secondary]">
            {hasData
              ? 'Your content patterns visualized three ways'
              : 'Complete your weekly reflection to see your patterns'}
          </p>
        </div>

        {hasData ? (
          <VisualizationCanvas items={items} responses={responses} />
        ) : (
          <div className="text-center py-16 text-[--color-text-secondary]">
            <p className="text-4xl mb-4">◯</p>
            <p className="text-sm">No reflection data yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}
