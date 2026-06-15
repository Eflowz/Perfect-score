import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App.tsx';

// Context Providers
import { AuthProvider } from './context/auth/AuthProvider.tsx';
import { CourseProvider } from './context/course/CourseProvider.tsx';
import { ToastProvider } from './context/toast/ToastProvider.tsx';

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
  </StrictMode>
);