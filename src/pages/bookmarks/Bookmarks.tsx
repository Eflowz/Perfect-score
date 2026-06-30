import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { removeBookmark } from "../../api/bookmarks.api";
// Mock tracking array based on your endpoint definitions
// import { getDiscussionsByCourse } from "../../api/discussions.api"; 
import { MdBookmark, MdArrowForward, MdSchool, MdOutlineExplore } from "react-icons/md";

interface BookmarkedCourse {
  id: string;
  title: string;
  description: string;
  category: string;
}

export default function Bookmarks() {
  const [savedCourses, setSavedCourses] = useState<BookmarkedCourse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mimics reading user bookmarks data payload records
    const fetchBookmarks = async () => {
      try {
        setLoading(true);
        // Replace with your endpoint data grab if you create a getBookmarks route
       
        
        setSavedCourses([]);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBookmarks();
  }, []);

  const handleRemove = async (courseId: string) => {
    try {
      await removeBookmark(courseId);
      setSavedCourses(prev => prev.filter(c => c.id !== courseId));
    } catch (err) {
      console.error("Failed to release course bookmark alignment:", err);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-xs font-mono text-gray-400 animate-pulse">Querying saved data registers...</div>;
  }

  return (
    <div className="space-y-6 text-left font-sans animate-in fade-in duration-300">
      <div className="space-y-6">
        
        {/* Header Title block */}
        <div className="space-y-1">
          <h1 className="text-base font-bold uppercase tracking-tight text-gray-900 dark:text-white font-mono flex items-center gap-2">
            <MdBookmark className="text-[#16423C] dark:text-[#E2FB6C]" size={20} /> Your Saved Tracks
          </h1>
          <p className="text-xs text-gray-500 dark:text-[#6B8A85]">
            Quick access control vaults to your bookmarked curriculum environments.
          </p>
        </div>

        {savedCourses.length === 0 ? (
          <div className="bg-white dark:bg-[#16423C] border border-dashed border-gray-200 dark:border-white/5 rounded-2xl p-12 text-center flex flex-col items-center justify-center gap-3 shadow-sm dark:shadow-xl">
            <MdOutlineExplore size={32} className="text-gray-300 dark:text-emerald-950" />
            <p className="text-xs text-gray-400 font-mono">No bookmarked environments found inside your active index profile.</p>
            <Link to="/courses" className="px-4 py-2 bg-[#16423C] dark:bg-[#C2FFC1] text-white dark:text-[#0F2C28] text-xs font-bold rounded-xl transition-all">
              Explore Available Cohorts
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {savedCourses.map((course) => (
              <div 
                key={course.id}
                className="p-5 bg-white dark:bg-[#16423C] border border-gray-200/60 dark:border-white/5 rounded-2xl shadow-sm dark:shadow-xl flex flex-col justify-between transition-all"
              >
                <div>
                  <div className="flex justify-between items-start gap-4">
                    <span className="text-[9px] font-bold px-2 py-0.5 bg-gray-100 dark:bg-black/30 rounded-md font-mono text-gray-500 dark:text-[#E2FB6C] uppercase tracking-wider">
                      {course.category}
                    </span>
                    <button 
                      onClick={() => handleRemove(course.id)}
                      className="text-xs text-red-500 hover:underline font-mono tracking-tight cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white mt-3 tracking-tight">
                    {course.title}
                  </h3>
                  <p className="text-[11px] text-gray-500 dark:text-gray-300 mt-1 leading-relaxed line-clamp-2">
                    {course.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-gray-100 dark:border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-gray-400 font-mono text-[10px]">
                    <MdSchool size={14} /> Sandbox IDE Ready
                  </div>
                  <Link 
                    to={`/courses/${course.id}/track`}
                    className="flex items-center gap-1 text-xs font-bold text-[#16423C] dark:text-[#E2FB6C] hover:underline"
                  >
                    Enter Workspace <MdArrowForward size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
