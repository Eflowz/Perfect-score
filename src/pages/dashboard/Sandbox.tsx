import { MdTerminal, MdPlayArrow, MdCached } from "react-icons/md";
import { useState, useEffect, useRef} from "react";
import { connectIDE } from "../../api/ide.api";
import { sendMessage } from "../../api/ide.api";
import { getAccessToken } from "../../utlis/storage";
//import { useCourse } from "../../context/course/useCourse";
import { executeCode } from "../../api/ide.api";
import { submitSolution } from "../../api/submission.api";
import { getSubmissionReview } from "../../api/submission.api";
import { useLocation, useParams } from "react-router-dom";


const Sandbox = () => {
  const location = useLocation();
  const [code, setCode] = useState(`# Perfect Score IDE Sandbox
def greet(name):
    print(f"Hello, {name}!")

greet("Perfect Learner")
`);

const [submissionId] = useState("");
const [review, setReview] = useState<any>(null);
  const [output, setOutput] = useState(
    "Run your script to see outputs here...",
  );
  const [isRunning, setIsRunning] = useState(false);
//dummy text handle
  /*
const runCode = async () => {
 try {
 setIsRunning(true);
 setOutput("Executing script...");
 
 const res = await executeCode({
 code,
 language: "python",
 });
 const data=res.data
console.log(res)
 if (data.success) {
 setOutput(data.stdout || "[No output]");
 } else {
 setOutput(data.stderr || "Execution failed");
 }

 } catch (err: any) {
 console.log("FULL ERROR:", err);
 console.log("STATUS:", err?.response?.status);
 console.log("DATA:", err?.response?.data);

 setOutput("Error executing code. Please try again.");
}finally {
 setIsRunning(false);
 }
};

useEffect(() => {
 const token = getAccessToken();

 const sessionId = "demo-session-1"; // later this will come from backend or URL
if(!token) return
 connectIDE(sessionId, token);
}, []);
*/
 const isRemoteUpdate = useRef(false);

 useEffect(() => {
   const params = new URLSearchParams(location.search);
   const prefilledCode = params.get("code");

   if (prefilledCode) {
     setCode(decodeURIComponent(prefilledCode));
     setOutput("Run the script to see outputs here...");
   }
 }, [location.search]);

 //CONNECT WEBSOCKET

 useEffect(() => {
 const token = getAccessToken();
 const sessionId = "demo-session-1";

 if (!token) return;

 connectIDE(
 sessionId,
 token,

 
 );
 }, []);

 // RUN CODE

 const runCode = async () => {
 try {
 setIsRunning(true);
 setOutput("Executing script...");

 const res = await executeCode({
 code,
 language: "python",
 });

 const data = res.data;

 if (data.success) {
 const lines = (data.stdout || "[No output]").split("\n");

 // 👇 show line by line
 setOutput(""); 

 lines.forEach((line: string, index: number) => {
 setTimeout(() => {
 setOutput((prev) => prev + line + "\n");
 }, index * 200); // 200ms per line
 });
 } else {
 setOutput(data.stderr || "Execution failed");
 }
 } catch (err) {
 setOutput("Error executing code. Please try again.");
 } finally {
 setIsRunning(false);
 }
};

//submission api call
const { id } = useParams<{ id: string }>();

const handleSubmit = async () => {
 try {
 if (!id) {
 console.log("❌ No course id found");
 return;
 }

 console.log("🚀 Submitting for course:", id);
 console.log("🧠 Code:", code);

 const res = await submitSolution({
 courseId: id,
 code,
 language: "python",
 });

 console.log("🎯 Submitted:", res);

 } catch (err: any) {
 console.log("❌ Submit error:", err);
 console.log("STATUS:", err?.response?.status);
 console.log("DATA:", err?.response?.data);
 }
};


// handle ai review
const handleReview = async () => {
 try {

 if (!submissionId) {

 console.log("No submission available yet");
 return;
 }

 const data = await getSubmissionReview(submissionId);

 console.log("🤖 AI Review:", data);

 setReview(data);

 } catch (err) {
 console.log("Review error:", err);
 }
};



  {/* 
    //dummy text replacement with real api
  const runCode = () => {
    setIsRunning(true);
    setOutput("Executing script...");
    setTimeout(() => {
      setIsRunning(false);
      setOutput(`Hello, Perfect Learner!\n\n[Process completed successfully]`);
    }, 1200);
  };
*/}
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

           <button
           onClick={handleSubmit}
           className="px-4 py-2 bg-green-900 text-white rounded"
          >
           Submit Solution
          </button>
          <button
            onClick={handleReview}
            className="px-4 py-2 bg-green-900/70 text-white rounded"
            >
            Get AI Review
          </button>
          {/* submission of ai review*/}
                 {review && (
                    <div className="mt-5 p-4 border rounded">

                    <h2 className="font-bold text-white">
                    AI Review
                    </h2>

                    <p>
                    Score: {review.score}/100
                    </p>

                    <p>
                    {review.aiReview.feedback}
                    </p>


                    <h3 className="font-semibold mt-3">
                    Suggestions
                    </h3>

                    <ul>
                    {review.aiReview.suggestions.map(
                    (item:string)=>(
                    <li key={item}>
                    - {item}
                    </li>
                    )
                    )}
                    </ul>

                    </div>
                  )}
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
            className="flex-1 p-4 bg-transparent text-white font-mono text-xs focus:outline-none resize-none leading-relaxed"
            spellCheck="false"
            onChange={(e) => {
            const newCode = e.target.value;
            
            setCode(newCode);
            
            // prevent echo loop
            if (isRemoteUpdate.current) {
            isRemoteUpdate.current = false;
            return;
            }
            sendMessage({
            type: "code-change",
            code: newCode,
            });
            }}
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
