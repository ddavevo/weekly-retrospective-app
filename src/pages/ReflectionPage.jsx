import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppStore } from '../store/useAppStore'
import { useReflectionSession } from '../hooks/useReflectionSession'
import LoadingScreen from '../components/loading/LoadingScreen'
import ReflectionLayout from '../components/reflection/ReflectionLayout'
import ProgressBar from '../components/reflection/ProgressBar'

export default function ReflectionPage() {
  const { state, dispatch } = useAppStore()
  const { saveResponse } = useReflectionSession()
  const navigate = useNavigate()

  const { phase, currentItemIndex, currentWeek } = state
  const items = currentWeek?.items ?? []
  const currentItem = items[currentItemIndex]

  const handleLoadComplete = useCallback(() => {
    dispatch({ type: 'SET_PHASE', payload: 'reflecting' })
  }, [dispatch])

  function handleSubmit(response) {
    saveResponse(currentItem.id, response)

    if (currentItemIndex >= items.length - 1) {
      dispatch({ type: 'SET_PHASE', payload: 'wrapped' })
      navigate('/wrapped')
    } else {
      dispatch({ type: 'SET_CURRENT_ITEM', payload: currentItemIndex + 1 })
    }
  }

  if (phase === 'loading' || phase === 'entry') {
    return <LoadingScreen onComplete={handleLoadComplete} />
  }

  if (!currentItem) return null

  return (
    <div className="min-h-screen bg-[--color-surface] flex flex-col">
      <div className="max-w-5xl mx-auto w-full px-6 pt-6 pb-2">
        <ProgressBar current={currentItemIndex + 1} total={items.length} />
      </div>
      <div className="flex-1 max-w-5xl mx-auto w-full px-6 py-4">
        <ReflectionLayout
          item={currentItem}
          itemIndex={currentItemIndex}
          totalItems={items.length}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  )
}
