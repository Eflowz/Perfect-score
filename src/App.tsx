import './index.css';
import { Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/common/ScrollToTop';

import { ProtectedRoute } from './routes/ProtectedRoutes';

import Home from './pages/landingPage/Home';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';

import Dashboard from './pages/dashboard/Dashboard';
import DashboardHome from './pages/dashboard/DashboardHome';
import Roadmap from './pages/dashboard/Roadmap';
import Projects from './pages/dashboard/Projects';
import Sandbox from './pages/dashboard/Sandbox';
import Certificates from './pages/dashboard/Certificates';
import Settings from './pages/dashboard/Settings';
import Courses from './pages/courses/Courses';
import CourseDetails from './pages/courses/CourseDetails';
import LessonPage from './context/course/LessonPage';

import CreateCourse from './pages/admin/CreateCourse';
import CreateModule from './pages/admin/CreateModules';
import Contact from './pages/landingPage/Contact';

function App() {
  return (
    <>
      <ScrollToTop />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Protected User Routes */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        >
          <Route index element={<DashboardHome />} />
          <Route path="roadmap" element={<Roadmap />} />
          <Route path="projects" element={<Projects />} />
          <Route path="ide" element={<Sandbox />} />
          <Route path="certificates" element={<Certificates />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        
        <Route 
          path="/courses" 
          element={
            <ProtectedRoute>
              <Courses />
            </ProtectedRoute>
          } 
        />
        
        <Route
          path="/courses/:id"
          element={
            <ProtectedRoute>
              <CourseDetails />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/courses/:courseId/modules/:moduleId"
          element={
            <ProtectedRoute>
              <LessonPage />
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        <Route 
          path="/admin/courses/new" 
          element={<CreateCourse />} 
        />
        
        <Route 
          path="/admin/modules/new" 
          element={<CreateModule />} 
        />
        <Route 
          path="/contact" 
          element={<Contact />} 
        />
      </Routes>
      
    </>
  );
}

export default App;