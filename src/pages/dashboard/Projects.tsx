import { MdAssignment, MdCheckCircleOutline, MdPlayCircleOutline, MdLockOutline } from "react-icons/md";

const Projects = () => {
  const projects = [
    { id: "P1", name: "Command-Line Calculator", desc: "Build a robust calculator with history features using basic Python arithmetic operations.", status: "completed" },
    { id: "P2", name: "Personal Contact Book", desc: "Design a CLI contact management system storing names, emails, and address logs.", status: "completed" },
    { id: "P3", name: "BST Implementation & Search", desc: "Create a BST with search, insert, and custom traversal nodes.", status: "active" },
    { id: "P4", name: "Dynamic Sorting Visualizer", desc: "Visualize bubble, quick, and merge sort in a web UI.", status: "locked" },
    { id: "P5", name: "Django API Blog Server", desc: "Write a REST API with models, views, and JWT authentication.", status: "locked" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <MdAssignment className="text-[#16423C] dark:text-[#E2FB6C]" /> Projects Portal
        </h1>
        <p className="text-sm text-gray-500 dark:text-[#6B8A85] mt-1">
          Apply your knowledge by building and submitting real-world portfolio projects.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className={`p-5 rounded-2xl border transition-all duration-200 flex flex-col justify-between h-48 ${
              project.status === "active"
                ? "bg-white dark:bg-[#16423C] border-[#16423C]/30 dark:border-[#E2FB6C]/30 shadow-md"
                : "bg-white/50 dark:bg-white/5 border-gray-200/60 dark:border-white/5"
            }`}
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-gray-100 dark:bg-black/20 text-gray-500 dark:text-gray-400">
                  {project.id}
                </span>
                <span className="text-xs">
                  {project.status === "completed" && <span className="text-emerald-600 dark:text-[#E2FB6C] font-semibold flex items-center gap-1"><MdCheckCircleOutline /> Completed</span>}
                  {project.status === "active" && <span className="text-amber-600 dark:text-[#E2FB6C] font-semibold flex items-center gap-1"><MdPlayCircleOutline className="animate-spin" /> In Progress</span>}
                  {project.status === "locked" && <span className="text-gray-400 dark:text-gray-600 font-semibold flex items-center gap-1"><MdLockOutline /> Locked</span>}
                </span>
              </div>
              <h3 className="text-sm font-bold text-gray-900 dark:text-white mt-3">{project.name}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 line-clamp-2">{project.desc}</p>
            </div>

            {project.status !== "locked" && (
              <button className={`mt-4 w-full py-2 rounded-xl text-xs font-semibold border transition-all ${
                project.status === "active"
                  ? "bg-[#16423C] dark:bg-[#E2FB6C] text-white dark:text-[#16423C] border-transparent hover:opacity-90"
                  : "bg-transparent text-gray-700 dark:text-gray-200 border-gray-200 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/5"
              }`}>
                {project.status === "active" ? "Continue Work" : "View Code Submission"}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
