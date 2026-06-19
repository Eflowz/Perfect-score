import {
  MdMap,
  MdCheckCircle,
  MdPlayCircleFilled,
  MdLock,
} from "react-icons/md";


const Roadmap = () => {
  const milestones = [
    {
      id: 1,
      title: "Python Fundamentals",
      desc: "Syntax, variables, control flow, functions, basic I/O",
      status: "completed",
    },
    {
      id: 2,
      title: "Data Structures",
      desc: "Lists, dicts, stacks, queues, trees, BST traversals",
      status: "active",
    },
    {
      id: 3,
      title: "Algorithms & Complexities",
      desc: "Sorting, searching, recursion, Big O analysis",
      status: "locked",
    },
    {
      id: 4,
      title: "Backend Web & Databases",
      desc: "HTTP, REST APIs, SQL, Django framework",
      status: "locked",
    },
    {
      id: 5,
      title: "System Design & Deployment",
      desc: "Scaling, caching, Docker, cloud deployment",
      status: "locked",
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <MdMap className="text-[#16423C] dark:text-[#E2FB6C]" /> My Learning
          Roadmap
        </h1>
        <p className="text-sm text-gray-500 dark:text-[#6B8A85] mt-1">
          Track your progress through the curriculum and view upcoming
          milestones.
        </p>
      </div>

      <div className="relative border-l border-gray-200 dark:border-white/10 pl-6 ml-4 space-y-8">
        {milestones.map((milestone) => (
          <div key={milestone.id} className="relative group">
            {/* Status node icon */}
            <span className="absolute -left-[35px] top-1 bg-white dark:bg-gray-950 p-1 rounded-full border border-gray-200 dark:border-white/10 flex items-center justify-center">
              {milestone.status === "completed" && (
                <MdCheckCircle
                  className="text-emerald-600 dark:text-[#E2FB6C]"
                  size={20}
                />
              )}
              {milestone.status === "active" && (
                <div className="relative flex items-center justify-center w-5 h-5">
                  <MdPlayCircleFilled
                    className="text-[#16423C] dark:text-[#E2FB6C] animate-pulse z-10"
                    size={20}
                  />
                  <span className="absolute w-4 h-4 bg-[#16423C]/20 dark:bg-[#E2FB6C]/20 rounded-full animate-ping" />
                </div>
              )}
              {milestone.status === "locked" && (
                <MdLock
                  className="text-gray-400 dark:text-gray-600"
                  size={16}
                />
              )}
            </span>

            <div
              className={`p-5 rounded-2xl border transition-all duration-200 ${
                milestone.status === "active"
                  ? "bg-white dark:bg-[#16423C] border-[#16423C]/30 dark:border-[#E2FB6C]/30 shadow-md"
                  : "bg-white/50 dark:bg-white/5 border-gray-200/60 dark:border-white/5"
              }`}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  Step {milestone.id}: {milestone.title}
                  {milestone.status === "active" && (
                    <span className="text-[10px] font-mono font-bold bg-[#16423C] dark:bg-[#E2FB6C] text-white dark:text-[#16423C] px-2 py-0.5 rounded-full uppercase tracking-wider">
                      In Progress
                    </span>
                  )}
                </h3>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 font-medium">
                {milestone.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Roadmap;
