import { completeModule } from "../../api/progress.api";
import { useState } from "react";

const CompleteButton = ({moduleId}: {moduleId:string}) => {

const [loading,setLoading] = useState(false);
const [completed, setCompleted]= useState(false)

const handleComplete = async () => {
 try {
 setLoading(true);

 const progress = await completeModule(
 moduleId,
 120
 );
 setCompleted(true)

 console.log("Progress updated:", progress);

 } catch(err){
 console.log("Complete module error:", err);
 } finally {
 setLoading(false);
 }
};


return (
<button 
disabled={loading || completed}
className="bg-green-900 px-4 py-2 rounded text-white"
onClick={handleComplete}>
 {loading ? "Completing..." :completed ? "completed" : "Complete Module"}
</button>
)

}

export default CompleteButton;