import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App'
import EntryPage from './pages/EntryPage'
import ReflectionPage from './pages/ReflectionPage'
import WrappedPage from './pages/WrappedPage'
import TimelinePage from './pages/TimelinePage'
import VisualizationPage from './pages/VisualizationPage'

const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <EntryPage /> },
      { path: 'reflect', element: <ReflectionPage /> },
      { path: 'wrapped', element: <WrappedPage /> },
      { path: 'timeline', element: <TimelinePage /> },
      { path: 'visualize', element: <VisualizationPage /> },
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
