import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ErrorBoundary } from 'react-error-boundary'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import Page404 from './pages/404/404.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter basename="/">
    <StrictMode>
      <ErrorBoundary FallbackComponent={Page404}>
        <App />
      </ErrorBoundary>
    </StrictMode>
  </BrowserRouter>,
)
