import { useAppStore } from '../store/useAppStore'
import TimelineList from '../components/timeline/TimelineList'
import NavBar from '../components/shared/NavBar'

export default function TimelinePage() {
  const { state } = useAppStore()
  const { pastWeeks } = state

  return (
    <div className="min-h-screen bg-[--color-surface]">
      <NavBar />
      <div className="max-w-2xl mx-auto px-6 pt-24 pb-16">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-[--color-text-primary] mb-1">Timeline</h1>
          <p className="text-sm text-[--color-text-secondary]">
            Your past {pastWeeks.length} weeks of reflection
          </p>
        </div>
        <TimelineList weeks={pastWeeks} />
      </div>
    </div>
  )
}
