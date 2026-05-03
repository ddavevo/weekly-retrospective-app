import { AppProvider } from './store/useAppStore'
import { Outlet } from 'react-router-dom'

export default function App() {
  return (
    <AppProvider>
      <Outlet />
    </AppProvider>
  )
}
