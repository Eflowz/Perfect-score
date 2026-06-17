import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useCourse } from "../../context/course/useCourse";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { 
  MdMap, MdCheckCircle, MdPlayCircleFilled, MdLock, MdArrowBack,
  MdPlayArrow, MdCached, MdAssignmentTurnedIn, MdCheck, MdLightbulbOutline
} from "react-icons/md";

export default function LessonPage() {
  const { courseId, moduleId } = useParams();
  const navigate = useNavigate();
  const { selectedCourse, fetchCourseById, loading } = useCourse();

  // Sandbox State
  const [sandboxCode, setSandboxCode] = useState("");
  const [sandboxOutput, setSandboxOutput] = useState("Run your script to see outputs here...");
  const [isRunning, setIsRunning] = useState(false);

  // Exercise State
  const [exerciseAnswer, setExerciseAnswer] = useState("");
  const [exerciseSubmitted, setExerciseSubmitted] = useState(false);
  const [exerciseError, setExerciseError] = useState(false);

  useEffect(() => {
    if (courseId) {
      fetchCourseById(courseId);
    }
  }, [courseId]);

  // Load default script on module change
  useEffect(() => {
    if (selectedCourse && moduleId) {
      const module = selectedCourse.modules?.find((m) => m.id === moduleId);
      if (module) {
        // Look for code in module content or load a default
        const match = /```python([\s\S]*?)```/.exec(module.content);
        if (match && match[1]) {
          setSandboxCode(match[1].trim());
        } else {
          setSandboxCode(`# Write your Python code here\nprint("Welcome to ${module.title}!")\n`);
        }
        // Reset exercise
        setExerciseAnswer("");
        setExerciseSubmitted(false);
        setExerciseError(false);
        setSandboxOutput("Run your script to see outputs here...");
      }
    }
  }, [selectedCourse, moduleId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-t-transparent border-[#16423C] dark:border-t-transparent dark:border-[#E2FB6C] rounded-full animate-spin"></div>
          <p className="text-xs font-mono text-gray-500">Loading lesson workspace...</p>
        </div>
      </div>
    );
  }

  if (!selectedCourse) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col items-center justify-center p-6 text-center">
        <p className="text-sm font-bold text-gray-800 dark:text-white">Course not found</p>
        <Link to="/courses" className="mt-4 text-xs font-semibold text-[#16423C] dark:text-[#E2FB6C] hover:underline">
          Back to Courses
        </Link>
      </div>
    );
  }

  const modules = selectedCourse.modules || [];
  const currentIndex = modules.findIndex((m) => m.id === moduleId);
  const currentNumber = currentIndex + 1;
  const totalModules = modules.length;

  const prevModule = modules[currentIndex - 1];
  const nextModule = modules[currentIndex + 1];
  const currentModule = modules[currentIndex];

  if (currentIndex === -1 || !currentModule) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col items-center justify-center p-6 text-center">
        <p className="text-sm font-bold text-gray-800 dark:text-white">Module not found</p>
        <Link to={`/courses/${courseId}`} className="mt-4 text-xs font-semibold text-[#16423C] dark:text-[#E2FB6C] hover:underline">
          Back to Course
        </Link>
      </div>
    );
  }

  // Load clicked snippet into right editor
  const handleLoadToSandbox = (codeText: string) => {
    setSandboxCode(codeText);
    setSandboxOutput("Code loaded successfully! Press Run to test.");
  };

  // Run python script simulation
  const runSandboxCode = () => {
    setIsRunning(true);
    setSandboxOutput("Executing script on backend server...");
    setTimeout(() => {
      setIsRunning(false);
      // Basic mock output generator
      if (sandboxCode.includes("print(")) {
        const matches = [...sandboxCode.matchAll(/print\(([^)]+)\)/g)];
        const outputs = matches.map(m => {
          const content = m[1].trim();
          if ((content.startsWith('"') && content.endsWith('"')) || (content.startsWith("'") && content.endsWith("'"))) {
            return content.slice(1, -1);
          }
          return content;
        });
        setSandboxOutput(outputs.join("\n") + "\n\n[Process completed successfully]");
      } else {
        setSandboxOutput("[Process completed successfully with no output]");
      }
    }, 1000);
  };

  // Determine exercise based on module name
  const getExerciseData = () => {
    const title = currentModule.title.toLowerCase();
    if (title.includes("variable") || title.includes("basic")) {
      return {
        question: 'Create a variable named `score` and assign it the integer value `100`:',
        template: 'score = ______',
        correct: '100',
        hint: 'Use the number 100 directly without quotes.'
      };
    }
    if (title.includes("function") || title.includes("method")) {
      return {
        question: 'Define a function header named `calculate` that accepts no arguments:',
        template: '______ calculate():',
        correct: 'def',
        hint: 'Use the Python keyword for definition.'
      };
    }
    if (title.includes("loop") || title.includes("iteration")) {
      return {
        question: 'Write a loop header that repeats 5 times using `range`:',
        template: 'for i in ______(5):',
        correct: 'range',
        hint: 'The range function generates a sequence.'
      };
    }
    // Fallback/Default
    return {
      question: 'Call the built-in function to display "Success" on the screen:',
      template: '______("Success")',
      correct: 'print',
      hint: 'The standard Python function for printing output.'
    };
  };

  const exercise = getExerciseData();

  const handleVerifyExercise = () => {
    if (exerciseAnswer.trim() === exercise.correct) {
      setExerciseSubmitted(true);
      setExerciseError(false);
    } else {
      setExerciseError(true);
    }
  };

  // Customize markdown components to show "Try it Yourself" buttons
  const markdownRenderers = {
    code({ node, inline, className, children, ...props }: any) {
      const match = /language-(\w+)/.exec(className || '');
      const codeString = String(children).replace(/\n$/, '');
      
      return !inline && match ? (
        <div className="relative group my-4 rounded-xl overflow-hidden border border-gray-200/50 dark:border-white/5 bg-gray-50 dark:bg-black/40">
          <div className="flex items-center justify-between px-4 py-2 bg-gray-100 dark:bg-black/60 border-b border-gray-200/50 dark:border-white/5 text-[10px] font-mono text-gray-400">
            <span>{match[1]}</span>
            <button 
              onClick={() => handleLoadToSandbox(codeString)}
              className="px-2 py-0.5 rounded bg-[#16423C] dark:bg-[#E2FB6C] text-white dark:text-[#16423C] font-semibold text-[10px] hover:opacity-90 cursor-pointer transition-all"
            >
              Load into Sandbox 🚀
            </button>
          </div>
          <pre className="p-4 overflow-auto text-xs leading-relaxed font-mono text-gray-800 dark:text-gray-200">
            <code>{children}</code>
          </pre>
        </div>
      ) : (
        <code className={`${className} px-1.5 py-0.5 rounded bg-gray-100 dark:bg-black/30 text-purple-600 dark:text-[#E2FB6C] font-mono text-xs`} {...props}>
          {children}
        </code>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-gray-100 flex flex-col transition-colors duration-200">
      
      {/* Workspace Sub Header */}
      <header className="h-14 border-b border-gray-200/80 dark:border-white/5 bg-white dark:bg-[#0F2C28] px-6 flex items-center justify-between z-10 shrink-0">
        <div className="flex items-center gap-3">
          <Link 
            to={`/courses/${courseId}`} 
            className="p-1.5 rounded-lg border border-gray-200 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/5 text-gray-500 dark:text-gray-300 transition-colors"
          >
            <MdArrowBack size={16} />
          </Link>
          <span className="text-xs font-bold font-mono text-gray-400 dark:text-[#6B8A85] uppercase">
            {selectedCourse.title}
          </span>
        </div>
        
        <div className="flex items-center gap-4">
          <span className="text-xs font-mono text-gray-400 dark:text-[#6B8A85]">
            Module {currentNumber} of {totalModules}
          </span>
          <div className="w-32 h-1.5 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
            <div 
              style={{ width: `${(currentNumber / totalModules) * 100}%` }}
              className="h-full bg-[#16423C] dark:bg-[#E2FB6C]"
            />
          </div>
        </div>
      </header>

      {/* Main Workspace Body */}
      <div className="flex-1 flex overflow-hidden min-h-0">
        
        {/* Left Pane: Course Syllabus Sidebar */}
        <aside className="w-64 border-r border-gray-200/80 dark:border-white/5 bg-white dark:bg-[#0F2C28] overflow-y-auto hidden md:block shrink-0">
          <div className="p-4 border-b border-gray-100 dark:border-white/5">
            <h3 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <MdMap className="text-[#16423C] dark:text-[#E2FB6C]" /> Course Outline
            </h3>
          </div>
          <nav className="p-2 space-y-1">
            {modules.map((m, idx) => {
              const isActive = m.id === moduleId;
              const isPast = idx < currentIndex;
              return (
                <button
                  key={m.id}
                  onClick={() => navigate(`/courses/${courseId}/modules/${m.id}`)}
                  className={`w-full flex items-center justify-between text-left p-3 rounded-xl transition-all ${
                    isActive
                      ? "bg-[#16423C] dark:bg-[#16423C] text-white dark:text-[#E2FB6C] font-semibold"
                      : "hover:bg-gray-100 dark:hover:bg-white/5 text-gray-600 dark:text-gray-400"
                  }`}
                >
                  <span className="text-xs truncate max-w-[160px]">{m.title}</span>
                  {isPast ? (
                    <MdCheckCircle className="text-emerald-600 dark:text-[#E2FB6C]" size={16} />
                  ) : isActive ? (
                    <MdPlayCircleFilled className="text-white dark:text-[#E2FB6C]" size={16} />
                  ) : (
                    <MdLock className="text-gray-300 dark:text-gray-600" size={14} />
                  )}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Center Pane: Markdown Reading panel */}
        <main className="flex-1 flex flex-col overflow-y-auto bg-white dark:bg-[#0F2D29] border-r border-gray-200/80 dark:border-white/5 p-6 lg:p-8">
          <div className="flex-1 space-y-6 max-w-2xl mx-auto w-full">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white leading-snug">
                {currentModule.title}
              </h1>
            </div>

            {/* Markdown Text */}
            <div className="prose prose-sm dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                components={markdownRenderers}
              >
                {currentModule.content}
              </ReactMarkdown>
            </div>

            {/* Inline Micro Exercise */}
            <div className="p-6 bg-gray-50 dark:bg-black/20 border border-gray-200/60 dark:border-white/5 rounded-2xl space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-gray-200/50 dark:border-white/5">
                <MdAssignmentTurnedIn className="text-[#16423C] dark:text-[#E2FB6C]" size={18} />
                <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">Quick Exercise Check</h4>
              </div>

              <div className="space-y-3">
                <p className="text-xs text-gray-600 dark:text-gray-300 font-medium">
                  {exercise.question}
                </p>

                <div className="flex items-center gap-2 font-mono text-xs p-3 bg-white dark:bg-black/40 border border-gray-200/50 dark:border-white/5 rounded-xl">
                  <span>{exercise.template.split("______")[0]}</span>
                  <input
                    type="text"
                    value={exerciseAnswer}
                    disabled={exerciseSubmitted}
                    onChange={(e) => setExerciseAnswer(e.target.value)}
                    placeholder="fill this in"
                    className="bg-gray-100 dark:bg-white/10 px-2 py-1 rounded focus:outline-none w-28 text-center text-purple-600 dark:text-[#E2FB6C] font-bold"
                  />
                  <span>{exercise.template.split("______")[1]}</span>
                </div>

                <div className="flex items-center justify-between gap-4 pt-1">
                  <div className="flex items-center gap-1 text-[10px] text-gray-400 dark:text-[#6B8A85]">
                    <MdLightbulbOutline />
                    <span>Hint: {exercise.hint}</span>
                  </div>

                  {!exerciseSubmitted ? (
                    <button
                      onClick={handleVerifyExercise}
                      className="px-4 py-1.5 bg-[#16423C] dark:bg-[#E2FB6C] text-white dark:text-[#16423C] rounded-xl text-xs font-bold hover:opacity-90 transition-opacity cursor-pointer shadow-sm"
                    >
                      Submit Answer
                    </button>
                  ) : (
                    <span className="flex items-center gap-1 text-emerald-600 dark:text-[#E2FB6C] text-xs font-bold">
                      <MdCheck size={16} /> Correct! Lesson Completed.
                    </span>
                  )}
                </div>

                {exerciseError && (
                  <p className="text-[10px] text-rose-500 font-medium animate-pulse">Incorrect. Please check the syntax or try the hint!</p>
                )}
              </div>
            </div>
          </div>

          {/* Sequential Footer Nav Controls */}
          <div className="flex justify-between items-center border-t border-gray-200/80 dark:border-white/5 pt-6 mt-8 max-w-2xl mx-auto w-full">
            <button
              onClick={() => {
                if (prevModule) navigate(`/courses/${courseId}/modules/${prevModule.id}`);
              }}
              disabled={!prevModule}
              className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                prevModule
                  ? "text-gray-700 dark:text-gray-200 border-gray-200 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/5"
                  : "text-gray-300 dark:text-gray-600 border-transparent cursor-not-allowed"
              }`}
            >
              ← Previous
            </button>

            <button
              onClick={() => {
                if (nextModule) navigate(`/courses/${courseId}/modules/${nextModule.id}`);
              }}
              disabled={!nextModule || !exerciseSubmitted}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${
                nextModule && exerciseSubmitted
                  ? "bg-[#16423C] dark:bg-[#E2FB6C] text-white dark:text-[#16423C] hover:opacity-90"
                  : "bg-gray-100 dark:bg-white/5 text-gray-400 dark:text-gray-600 border border-gray-200/50 dark:border-white/5 cursor-not-allowed"
              }`}
            >
              Next Lesson →
            </button>
          </div>
        </main>

        {/* Right Pane: Live Python Sandbox */}
        <section className="w-[30rem] border-l border-gray-200/80 dark:border-white/5 bg-gray-900 dark:bg-[#081816] flex flex-col justify-between hidden lg:flex shrink-0">
          
          {/* Header toolbar */}
          <div className="h-12 border-b border-gray-800/80 dark:border-white/5 px-4 flex items-center justify-between text-xs text-gray-400 font-mono">
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 bg-emerald-500 rounded-full" /> Sandbox Playground</span>
            
            <button
              onClick={runSandboxCode}
              disabled={isRunning}
              className="flex items-center gap-1 px-3 py-1 bg-emerald-600/20 text-[#E2FB6C] rounded-lg hover:bg-emerald-600/30 transition-all font-semibold disabled:opacity-50"
            >
              {isRunning ? <MdCached className="animate-spin" size={14} /> : <MdPlayArrow size={14} />}
              Run Code
            </button>
          </div>

          {/* Editor body */}
          <textarea
            value={sandboxCode}
            onChange={(e) => setSandboxCode(e.target.value)}
            className="flex-1 p-4 bg-transparent text-white font-mono text-xs focus:outline-none resize-none leading-relaxed"
            spellCheck="false"
          />

          {/* Terminal output box */}
          <div className="h-44 bg-black/50 border-t border-gray-800/80 dark:border-white/5 flex flex-col font-mono text-[11px] text-gray-300">
            <div className="bg-black/70 px-4 py-1.5 border-b border-gray-800/40 text-gray-500 select-none">
              Console Output
            </div>
            <pre className="flex-1 p-4 overflow-y-auto whitespace-pre-wrap leading-relaxed select-text selection:bg-[#E2FB6C]/20">
              {sandboxOutput}
            </pre>
          </div>

        </section>

      </div>
    </div>
  );
}