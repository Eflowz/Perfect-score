import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './context/auth/AuthProvider.tsx'
import { BrowserRouter } from 'react-router-dom'
import { ToastProvider } from './context/toast/ToastProvider.tsx'
import { CourseProvider } from './context/course/CourseProvider.tsx'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <ToastProvider>
      <CourseProvider>
    <AuthProvider>
     <App />
    </AuthProvider>
    </CourseProvider>
    </ToastProvider>
    </BrowserRouter>
  </StrictMode>,
)
