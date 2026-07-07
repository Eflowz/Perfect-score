import { useEffect, useState } from "react";
import { updateModule } from "../../api/admin.modules.api";
import { getAccessToken } from "../../utlis/storage";
import { MdAdd, MdRemove, MdClose } from "react-icons/md";
import { useCourse } from "../../context/course/useCourse";
import type { Module } from "../../types/courses.types";

type Props = {
  open: boolean;
  onClose: () => void;
  courseId: string;
  module: Module | null;
  onSuccess: () => void;
};

export default function EditModuleDrawer({
  open,
  onClose,
  courseId,
  module,
  onSuccess,
}: Props) {
  const { fetchCourseById } = useCourse();

  const [title, setTitle] = useState("");
  const [contentType, setContentType] = useState<"text" | "video">("text");
  const [content, setContent] = useState("");
  const [order, setOrder] = useState(1);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const isVideoUrl = (str: string) => {
    if (!str) return false;
    const trimmed = str.trim();
    if (trimmed.includes("\n")) return false;
    const isYoutube = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/i.test(trimmed);
    const isDirectVideo = /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(trimmed);
    return isYoutube || isDirectVideo;
  };

  useEffect(() => {
    if (module) {
      setTitle(module.title);
      setOrder(module.order);
      const isVideo = isVideoUrl(module.content);
      setContentType(isVideo ? "video" : "text");
      setContent(module.content);
      setError("");
      setSuccess("");
    }
  }, [module, open]);

  if (!open || !module) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!courseId) {
      setError("Course ID missing");
      return;
    }

    if (!content.trim()) {
      setError(contentType === "video" ? "Please enter a video URL" : "Please enter module content");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      await updateModule(
        courseId,
        module.id,
        {
          title,
          content: content.trim(),
          order,
        },
        getAccessToken() as string,
      );

      await fetchCourseById(courseId);
      setSuccess("Module updated successfully 🎉");
      setTimeout(() => {
        onSuccess();
        onClose();
      }, 800);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to update module");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/50 backdrop-blur-sm transition-opacity">
      {/* BACKGROUND DISMISS */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* DRAWER CONTAINER */}
      <div className="relative w-full max-w-lg h-full bg-white dark:bg-[#0d1a17] shadow-2xl p-6 overflow-y-auto flex flex-col justify-between animate-fade-in border-l border-gray-100 dark:border-white/10">
        <div>
          {/* HEADER */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Edit Module
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Modify course lesson properties and content
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 text-gray-500 dark:text-gray-400 transition"
            >
              <MdClose size={20} />
            </button>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* TITLE */}
            <div>
              <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                Module Title
              </label>
              <input
                className="mt-2 w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#16423C] transition"
                placeholder="e.g. Variables and Data Types"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            {/* CONTENT TYPE */}
            <div>
              <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                Content Type
              </label>
              <div className="mt-2 grid grid-cols-2 gap-2 p-1 bg-gray-100 dark:bg-white/5 border border-gray-200/50 dark:border-white/5 rounded-xl">
                <button
                  type="button"
                  onClick={() => {
                    setContentType("text");
                  }}
                  className={`py-2 text-xs font-semibold rounded-lg transition-all ${
                    contentType === "text"
                      ? "bg-white dark:bg-[#16423C] text-gray-900 dark:text-white shadow-sm"
                      : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  }`}
                >
                  HTML / Markdown Text
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setContentType("video");
                  }}
                  className={`py-2 text-xs font-semibold rounded-lg transition-all ${
                    contentType === "video"
                      ? "bg-white dark:bg-[#16423C] text-gray-900 dark:text-white shadow-sm"
                      : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  }`}
                >
                  Video Link (YouTube)
                </button>
              </div>
            </div>

            {/* CONDITIONAL FIELD */}
            {contentType === "video" ? (
              <div>
                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                  Video URL
                </label>
                <input
                  type="url"
                  className="mt-2 w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#16423C] transition"
                  placeholder="e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>
            ) : (
              <div>
                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                  Module Content
                </label>
                <textarea
                  rows={6}
                  className="mt-2 w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#16423C] transition resize-none"
                  placeholder="Write HTML or Markdown content..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>
            )}

            {/* ORDER */}
            <div>
              <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                Order
              </label>
              <div className="mt-2 flex items-center justify-between w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10">
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  {order}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setOrder((prev) => Math.max(1, prev - 1))}
                    className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-white/10 transition text-gray-600 dark:text-gray-300"
                  >
                    <MdRemove size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setOrder((prev) => prev + 1)}
                    className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-white/10 transition text-gray-600 dark:text-gray-300"
                  >
                    <MdAdd size={18} />
                  </button>
                </div>
              </div>
            </div>

            {error && (
              <p className="text-sm text-red-600 dark:text-red-400 font-medium">
                {error}
              </p>
            )}
            {success && (
              <p className="text-sm text-green-600 dark:text-green-400 font-medium">
                {success}
              </p>
            )}

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 py-3 rounded-xl bg-[#16423C] hover:bg-[#1d6158] text-white font-semibold transition disabled:opacity-50"
            >
              {loading ? "Saving Changes..." : "Save Changes"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
