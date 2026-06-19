import CreateCourseForm from "../CreateCourse";

export default function CreateCourseModal({ open, onClose }: any) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-2xl bg-white dark:bg-[#0F2C28] rounded-2xl p-6">
        {/* HEADER */}

        <div className="flex justify-between mb-4">
          <h2 className="text-lg font-bold text-white">Create Course</h2>

          <button onClick={onClose}>✕</button>
        </div>

        {/* FORM */}
        <CreateCourseForm onSuccess={onClose} />
      </div>
    </div>
  );
}
