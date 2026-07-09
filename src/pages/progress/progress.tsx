import { completeModule } from "../../api/progress.api";
import { useState, useEffect } from "react";
import { MdCheckCircle, MdSchool } from "react-icons/md";

interface CompleteButtonProps {
  moduleId: string;
  initialCompleted?: boolean;
  onComplete?: () => void;
}

const CompleteButton = ({ moduleId, initialCompleted = false, onComplete }: CompleteButtonProps) => {
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(initialCompleted);

  useEffect(() => {
    setCompleted(initialCompleted);
  }, [initialCompleted]);

  const handleComplete = async () => {
    try {
      setLoading(true);

      const progress = await completeModule(moduleId, 120);
      setCompleted(true);
      onComplete?.();

      console.log("Progress updated:", progress);
    } catch (err) {
      console.log("Complete module error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      disabled={loading || completed}
      onClick={handleComplete}
      className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all shadow-sm ${
        completed
          ? "bg-emerald-600 text-white"
          : "bg-[#16423C] text-white hover:bg-[#0F2C28] dark:bg-[#E2FB6C] dark:text-[#16423C] dark:hover:bg-[#d5ee55]"
      }`}
    >
      {loading ? (
        "Completing..."
      ) : completed ? (
        <>
          <MdCheckCircle size={16} /> Lesson Complete
        </>
      ) : (
        <>
          <MdSchool size={16} /> Complete Lesson
        </>
      )}
    </button>
  );
};

export default CompleteButton;