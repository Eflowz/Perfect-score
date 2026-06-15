import { LogoutButton } from "../auth/Logout";
import { useAuth } from "../../context/auth/useAuth";
import { Link } from "react-router-dom";
import CreateCourse from "../admin/CreateCourse";
import Courses from "../courses/Courses";

const DashBoard = () => {

 const { user } = useAuth();

 return (
 <div className="pt-30">

 <p className="text-xl font-semibold">
 Welcome, {user?.name}
 </p>

 <div className="mt-4">
 <Link to="/courses">
 My Courses
 </Link>
 </div>

 <div className="mt-4">
 <LogoutButton />
 </div>
<CreateCourse />
<Courses />
 </div>
 );
};

export default DashBoard;