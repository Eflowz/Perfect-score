import "./index.css";
import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/common/ScrollToTop";

//import { ProtectedRoute } from './routes/ProtectedRoutes';

import Home from "./pages/landingPage/Home";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";

import Dashboard from "./pages/dashboard/Dashboard";
import DashboardHome from "./pages/dashboard/DashboardHome";
import Roadmap from "./pages/dashboard/Roadmap";
import Projects from "./pages/dashboard/Projects";
import Sandbox from "./pages/dashboard/Sandbox";
import Certificates from "./pages/dashboard/Certificates";
import Settings from "./pages/dashboard/Settings";
import Courses from "./pages/courses/Courses";
import CourseDetails from "./pages/courses/CourseDetails";
import LessonPage from "./context/course/LessonPage";
import VerifyCertificate from "./pages/dashboard/verifyCertificate";
//import CreateCourse from './pages/admin/CreateCourse';
//import CreateModule from './pages/admin/CreateModules';
import Contact from "./pages/landingPage/Contact";
//import AdminDashboard from './pages/admin/AdminDashboard';
import AdminLayout from "./pages/admin/AdminDashboard";
import AdminPanel from "./pages/admin/AminPanel";
import AdminDashBoard from "./pages/admin/AdminDashboard";
//
// import CreateModule from "./pages/admin/CreateModules";
import CreateCourse from "./pages/admin/CreateCourse";
//import { useAuth } from "./context/auth/useAuth";
import AdminCourses from "./pages/admin/AdminCourse";

function App() {
 
  return (
    <>
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Protected User Routes */}
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<DashboardHome />} />
          <Route path="roadmap" element={<Roadmap />} />
          <Route path="projects" element={<Projects />} />
          <Route path="ide" element={<Sandbox />} />
          <Route path="certificates" element={<Certificates />} />
          <Route path="settings" element={<Settings />} />

          <Route path="courses" element={<Courses />} />
          <Route path="courses/:id" element={<CourseDetails />} />
          
          <Route
            path="courses/:courseId/modules/:moduleId"
            element={<LessonPage />}
          />
          <Route
          path="verify-certificate"
          element={<VerifyCertificate />}
          />
        </Route>

        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminPanel />} />
          <Route index element={<AdminDashBoard />} />
          <Route index element={<Courses />} />
          <Route path="courses" element={<AdminCourses />} />
          <Route path="courses/new" element={<CreateCourse />} />
          <Route path="courses/:id" element={<CourseDetails />} />

        </Route>
        <Route path="courses/:id" element={<CourseDetails />} />
          
      </Routes>
    </>
  );
}

export default App;
