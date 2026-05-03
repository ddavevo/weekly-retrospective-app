import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppStore } from '../store/useAppStore'

const RESPONSES_KEY_PREFIX = 'reflect_responses_'

export function getResponsesKey(weekId) {
  return `${RESPONSES_KEY_PREFIX}${weekId}`
}

export function useReflectionSession() {
  const { state, dispatch } = useAppStore()
  const navigate = useNavigate()

  // Hydrate from localStorage on mount
  useEffect(() => {
    const weekId = state.currentWeek?.weekId
    if (!weekId) return

    const key = getResponsesKey(weekId)
    try {
      const stored = window.localStorage.getItem(key)
      if (!stored) return
      const responses = JSON.parse(stored)
      const completedCount = Object.keys(responses).length
      const totalItems = state.currentWeek.items.length

      if (completedCount >= totalItems) {
        dispatch({ type: 'LOAD_RESPONSES', payload: responses, index: totalItems - 1 })
        navigate('/wrapped', { replace: true })
      } else if (completedCount > 0) {
        dispatch({ type: 'LOAD_RESPONSES', payload: responses, index: completedCount })
        dispatch({ type: 'SET_PHASE', payload: 'reflecting' })
      }
    } catch {
      // ignore malformed data
    }
  }, [])

  function saveResponse(itemId, response) {
    const weekId = state.currentWeek?.weekId
    dispatch({ type: 'SAVE_RESPONSE', itemId, response })

    const key = getResponsesKey(weekId)
    try {
      const stored = window.localStorage.getItem(key)
      const existing = stored ? JSON.parse(stored) : {}
      window.localStorage.setItem(key, JSON.stringify({ ...existing, [itemId]: response }))
    } catch {
      // ignore
    }
  }

  function clearSession() {
    const weekId = state.currentWeek?.weekId
    if (weekId) window.localStorage.removeItem(getResponsesKey(weekId))
    dispatch({ type: 'RESET_SESSION' })
  }

  return { saveResponse, clearSession }
}
