import "./index.css";
import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/common/ScrollToTop";
import { useTokenRefresh } from "./hooks/useTokenRefresh";

import { ProtectedRoute } from "./routes/ProtectedRoutes";
import { PublicRoute } from "./routes/PublicRoute";
// ... (rest of imports unchanged)

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
import LessonPage from "./pages/courses/LessonPage";
import VerifyCertificate from "./pages/dashboard/verifyCertificate";
import Contact from "./pages/landingPage/Contact";
import Discussions  from "./pages/discussions/Discussions";
import Bookmarks from "./pages/bookmarks/Bookmarks";
import Achievements from "./pages/achievements/Achievements";
import Submissions from "./pages/submissions/Submissions";
import Leaderboard from "./pages/dashboard/components/Leaderboard";
import AdminDashBoard from "./pages/admin/AdminDashboard";
import AdminPanel from "./pages/admin/AminPanel";
import CreateCourse from "./pages/admin/CreateCourse";
import AdminCourses from "./pages/admin/AdminCourse";
import AdminUsers from "./pages/admin/AdminUsers";
import CreateQuiz from "./pages/admin/CreateQuiz";
import QuizManagement from "./pages/admin/Adminsection/QuizManagement";
import QuizPage from "./pages/admin/Adminsection/QuizPage";

function App() {
  useTokenRefresh();

  return (
    <>
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

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
          <Route path="discussions" element={<Discussions />} />
          <Route path="leaderboard" element={<Leaderboard />} />
          <Route path="bookmarks" element={<Bookmarks />} />
          <Route path="achievements" element={<Achievements />} />
          <Route path="submissions" element={<Submissions />} />

          <Route path="courses" element={<Courses />} />
          <Route path="courses/:id" element={<CourseDetails />} />
          <Route path="quiz/:id" element={<QuizPage />} />
          <Route
            path="courses/:courseId/modules/:moduleId"
            element={<LessonPage />}
          />
          <Route path="verify-certificate" element={<VerifyCertificate />} />
        </Route>
        <Route path="/courses/:courseId/discussions" element={<Discussions />} />

        <Route path="/contact" element={<Contact />} />

        {/* Protected Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly>
              <AdminDashBoard />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminPanel />} />
          <Route path="courses" element={<AdminCourses />} />
          <Route path="courses/new" element={<CreateCourse />} />
          <Route path="courses/:id" element={<CourseDetails />} />
          <Route path="courses/:id/create-quiz" element={<CreateQuiz />} />
          <Route path="quiz/:id" element={<QuizPage />} />
          <Route path="quizzes" element={<QuizManagement />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        <Route path="courses/:id" element={<CourseDetails />} />
      </Routes>
    </>
  );
}

export default App;