import './index.css';

import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import DashBoard from './pages/dashboard/Dashboard';
import { ProtectedRoute } from './routes/ProtectedRoutes';
import ScrollToTop from './components/common/ScrollToTop';
import Courses from './pages/courses/Courses';
import CourseDetails from './pages/courses/CourseDetails';
import LessonPage from './context/course/LessonPage';
import CreateCourse from './pages/admin/CreateCourse';
import CreateModule from './pages/admin/CreateModules';
function App() {

 return (
 <>

<ScrollToTop/>
 <Routes>

 <Route 
 path="/" 
 element={<Home />} 
 />

 <Route 
 path="/register" 
 element={<Register />} 
 />

<Route 
 path="/login" 
 element={< Login />} 
 />
 <Route 
 path="/dashboard" 
 element={
 <ProtectedRoute>
<DashBoard />
 </ProtectedRoute>
 } 
 />
 
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
<Route
 path="/admin/modules/new"
 element={<CreateModule />}
/>
<Route path="/admin/courses/new" element={<CreateCourse />} />
 </Routes>

 </>
 );
}

export default App;