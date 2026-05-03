import { createContext, useContext, useReducer, useEffect } from 'react'
import currentWeekData from '../data/currentWeek.json'
import pastWeeksData from '../data/pastWeeks.json'

const initialState = {
  phase: 'entry',
  currentItemIndex: 0,
  responses: {},
  currentWeek: currentWeekData,
  pastWeeks: pastWeeksData,
  remindAt: null,
}

function reducer(state, action) {
  switch (action.type) {
    case 'SET_PHASE':
      return { ...state, phase: action.payload }
    case 'SET_CURRENT_ITEM':
      return { ...state, currentItemIndex: action.payload }
    case 'SAVE_RESPONSE':
      return {
        ...state,
        responses: { ...state.responses, [action.itemId]: action.response },
      }
    case 'LOAD_RESPONSES':
      return { ...state, responses: action.payload, currentItemIndex: action.index }
    case 'SET_REMIND':
      return { ...state, remindAt: action.payload }
    case 'RESET_SESSION':
      return { ...state, responses: {}, currentItemIndex: 0, phase: 'entry' }
    default:
      return state
  }
}

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}

export function useAppStore() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useAppStore must be used inside AppProvider')
  return ctx
}
