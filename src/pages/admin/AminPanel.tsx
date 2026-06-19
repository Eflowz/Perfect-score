//import CourseDetails from "../courses/CourseDetails";
import { useCourse } from "../../context/course/useCourse";
import AdminCoursesSection from "./Adminsection/AdminCourseSection";
import StatsGrid from "./Adminsection/StatGrid";

const AdminPanel = () => {
  const { courses } = useCourse();
  const totalModules = courses.reduce(
    (acc, course) => acc + (course.modules?.length || 0),
    0,
  );
  return (
    <>
      <StatsGrid
        totalCourses={courses.length}
        totalUsers={120} // placeholder for now
        totalModules={totalModules} // placeholder for now
        activeLearners={30} // placeholder for now
      />
      <AdminCoursesSection />
    </>
  );
};

export default AdminPanel;
