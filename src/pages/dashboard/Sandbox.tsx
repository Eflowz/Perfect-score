import { MdTerminal, MdPlayArrow, MdCached } from "react-icons/md";
import { useState } from "react";

const Sandbox = () => {
  const [code, setCode] = useState(`# Perfect Score IDE Sandbox
def greet(name):
    print(f"Hello, {name}!")

greet("Perfect Learner")
`);

  const [output, setOutput] = useState(
    "Run your script to see outputs here...",
  );
  const [isRunning, setIsRunning] = useState(false);

  const runCode = () => {
    setIsRunning(true);
    setOutput("Executing script...");
    setTimeout(() => {
      setIsRunning(false);
      setOutput(`Hello, Perfect Learner!\n\n[Process completed successfully]`);
    }, 1200);
  };

  return (
    <div className="space-y-6 flex flex-col h-[calc(100vh-140px)] animate-in fade-in duration-300">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <MdTerminal className="text-[#16423C] dark:text-[#E2FB6C]" /> IDE
            Sandbox
          </h1>
          <p className="text-sm text-gray-500 dark:text-[#6B8A85] mt-1">
            Test algorithms, write code snippets, and play around with
            interactive environments.
          </p>
        </div>

        <button
          onClick={runCode}
          disabled={isRunning}
          className="flex items-center gap-1.5 px-4 py-2 bg-[#16423C] dark:bg-[#E2FB6C] text-white dark:text-[#16423C] rounded-xl hover:opacity-90 disabled:opacity-50 transition-opacity font-semibold text-xs cursor-pointer shadow-sm"
        >
          {isRunning ? (
            <MdCached className="animate-spin" size={16} />
          ) : (
            <MdPlayArrow size={16} />
          )}
          Run Script
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 min-h-0">
        {/* Editor Area */}
        <div className="flex flex-col bg-gray-900 dark:bg-black border border-white/5 rounded-2xl overflow-hidden shadow-xl">
          <div className="bg-gray-950 dark:bg-black px-4 py-2 border-b border-white/5 flex items-center justify-between text-[11px] font-mono text-gray-400">
            <span>main.py</span>
            <span className="text-emerald-500 font-bold uppercase tracking-wider scale-90">
              Python 3.10
            </span>
          </div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="flex-1 p-4 bg-transparent text-white font-mono text-xs focus:outline-none resize-none leading-relaxed"
            spellCheck="false"
          />
        </div>

        {/* Output Console */}
        <div className="flex flex-col bg-gray-950 dark:bg-black/80 border border-white/5 rounded-2xl overflow-hidden shadow-xl font-mono text-xs">
          <div className="bg-gray-950 dark:bg-black px-4 py-2 border-b border-white/5 flex items-center text-[11px] text-gray-400">
            <span>Terminal Output</span>
          </div>
          <pre className="flex-1 p-4 text-gray-300 dark:text-gray-400 overflow-auto whitespace-pre-wrap leading-relaxed">
            {output}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default Sandbox;
