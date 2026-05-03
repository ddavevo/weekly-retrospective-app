import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import EntryModal from '../components/entry/EntryModal'
import { useAppStore } from '../store/useAppStore'

const REMIND_KEY = 'reflect_remind_at'

export default function EntryPage() {
  const { state, dispatch } = useAppStore()
  const navigate = useNavigate()

  const reminded = (() => {
    try {
      const val = window.localStorage.getItem(REMIND_KEY)
      return val && Number(val) > Date.now()
    } catch {
      return false
    }
  })()

  function handleStart() {
    dispatch({ type: 'SET_PHASE', payload: 'loading' })
    navigate('/reflect')
  }

  function handleRemindLater() {
    const at = Date.now() + 3 * 60 * 60 * 1000
    try { window.localStorage.setItem(REMIND_KEY, String(at)) } catch {}
    dispatch({ type: 'SET_REMIND', payload: at })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[--color-surface]">
      {reminded ? (
        <div className="text-center">
          <p className="text-[--color-text-secondary] text-sm">
            Your reflection is waiting.{' '}
            <button
              onClick={handleStart}
              className="text-[--color-brand] underline underline-offset-2 cursor-pointer"
            >
              Start now
            </button>
          </p>
        </div>
      ) : (
        <EntryModal
          weekLabel={state.currentWeek?.weekLabel}
          onStart={handleStart}
          onRemindLater={handleRemindLater}
        />
      )}
    </div>
  )
}
