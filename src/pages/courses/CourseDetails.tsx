import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaBookOpen, FaLayerGroup, FaPlus } from "react-icons/fa";

import { useCourse } from "../../context/course/useCourse";
import { getCourseQuizzes } from "../../api/quiz.api";
import { getCourseProgress } from "../../api/progress.api";
import ModuleCard from "../../components/courses/ModuleCard";
import ModuleCardSkeleton from "../../components/courses/ModuleCardSkeleton";
import Skeleton from "../../components/common/Skeleton";
import EmptyModulesState from "../../components/courses/EmptyModulesState";
import { useAuth } from "../../context/auth/useAuth";
import Modal from "../../components/common/Modal";
import CreateModules from "../admin/CreateModules";
import EditModuleDrawer from "../admin/EditModuleDrawer";
import { deleteModule } from "../../api/admin.modules.api";
import { deleteQuiz } from "../../api/admin.quiz.api";
import { getAccessToken } from "../../utlis/storage";
import type { Module as ModuleType } from "../../types/courses.types";




export default function CourseDetails() {
  const { id } = useParams();
  const params = useParams();
  const navigate = useNavigate();
 
  console.log("course-id:", params);
  console.log("params ID:", id); // 👈 PUT IT HERE
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openEditDrawer, setOpenEditDrawer] = useState(false);
  const [editingModule, setEditingModule] = useState<ModuleType | null>(null);
  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);
  const [completedModuleIds, setCompletedModuleIds] = useState<string[]>([]);
  const { user } = useAuth();
  
  const isAdmin = user?.role === "SUPER_ADMIN";
  const { selectedCourse, fetchCourseById, loading } = useCourse();

  useEffect(() => {
    if (id) {
      fetchCourseById(id);
    }
    console.log("Fetching course details for ID:", id);
  }, [id]);

  const loadQuizzes = async () => {
    if (!id) return;
    try {
      const data = await getCourseQuizzes(id);
      setQuizzes(data || []);
    } catch (error) {
      console.error("Failed to load course quizzes:", error);
    }
  };

  useEffect(() => {
    loadQuizzes();
  }, [id]);

  useEffect(() => {
    const loadProgress = async () => {
      if (!id) return;

      try {
        const progressData = await getCourseProgress(id);
        const items = Array.isArray(progressData)
          ? progressData
          : progressData?.data || progressData?.progress || [];

        const completedIds = items
          .filter((item: any) => item?.completed)
          .map((item: any) => item?.moduleId)
          .filter(Boolean);

        setCompletedModuleIds(completedIds);
      } catch (error) {
        console.error("Failed to load course progress:", error);
      }
    };

    loadProgress();
  }, [id]);

  const handleEditModule = (module: ModuleType) => {
    setEditingModule(module);
    setOpenEditDrawer(true);
  };

  const handleDeleteModule = async (module: ModuleType) => {
    const confirm = window.confirm(`Are you sure you want to delete the module "${module.title}"?`);
    if (!confirm) return;

    try {
      await deleteModule(id!, module.id, getAccessToken()!);
      alert("Module deleted successfully");
      await fetchCourseById(id!);
    } catch (err) {
      console.error("Delete module failed:", err);
      alert("Failed to delete module (simulating local change).");
      // Fallback local update
      if (selectedCourse) {
        selectedCourse.modules = selectedCourse.modules.filter(m => m.id !== module.id);
      }
      await fetchCourseById(id!);
    }
  };

  const handleDeleteQuiz = async (moduleId: string) => {
    const quiz = quizzes.find((q) => q.moduleId === moduleId);
    if (!quiz) return;

    const confirm = window.confirm("Are you sure you want to delete the quiz/exercise for this module?");
    if (!confirm) return;

    try {
      await deleteQuiz(quiz.id, getAccessToken()!);
      alert("Quiz deleted successfully");
      await loadQuizzes();
    } catch (err) {
      console.error("Delete quiz failed:", err);
      alert("Failed to delete quiz (simulating local change).");
      // Fallback local update
      setQuizzes((prev) => prev.filter((q) => q.id !== quiz.id));
    }
  };

  const handleManageQuiz = (module: ModuleType) => {
    navigate(`/admin/courses/${id}/create-quiz?moduleId=${module.id}`);
  };


  const hasQuizForModule = (moduleId: string) =>
    quizzes.some((quiz) => quiz.moduleId === moduleId);

  if (loading) {
    return (
      <div className="mt-8 space-y-8">
        {/* COURSE HEADER SKELETON */}
        <div
          className="
          rounded-3xl p-6 md:p-8
          border border-gray-200/60 dark:border-white/10
          bg-white/70 dark:bg-white/5
          space-y-4
          "
        >
          <Skeleton className="h-5 w-32" />

          <Skeleton className="h-10 w-2/3" />

          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />

          <div className="flex gap-3 mt-4">
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-24 rounded-full" />
          </div>
        </div>

        {/* MODULE TITLE SKELETON */}
        <div className="space-y-3">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-4 w-60" />
        </div>

        {/* MODULE LIST */}
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <ModuleCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (!selectedCourse) {
    return (
      
       <EmptyModulesState
 title={isAdmin ? "No modules yet" : "No modules available"}
 description={
 isAdmin
 ? "This course doesn't have any modules. Start building your learning content."
 : "This course does not have any learning modules yet. Please check back later."
 }
 onAction={
 isAdmin
 ? () => setOpenCreateModal(true)
 : undefined
 }
 actionText="Create Module"
 />
    );
  }

  return (
    <div className="mt-8 space-y-8">
      {/* COURSE HEADER */}

      <section
        className="
        relative overflow-hidden
        bg-white/80 dark:bg-white/5
        border border-gray-200/60 dark:border-white/10
        rounded-3xl
        p-6 md:p-8
        animate-fade-in
        "
      >
        {/* background glow */}
        <div
          className="
          absolute -right-20 -top-20
          w-48 h-48
          rounded-full
          bg-[#16423C]/10
          blur-3xl
          "
        />

        <div className="relative">
          {/* badge row */}

          <div className="flex items-center gap-3 mb-4">
            <span
              className="
              px-3 py-1
              rounded-full
              text-xs font-semibold

              bg-[#16423C]/10
              text-[#16423C]

              dark:bg-[#dcf36c]/10
              dark:text-[#dcf36c]
              "
            >
              {selectedCourse.level}
            </span>

            <span
              className="
              text-xs
              text-gray-400
              "
              >
              Step {selectedCourse.order}
            </span>
          </div>

          <h1
            className="
 text-2xl md:text-3xl
 font-bold

 text-gray-900
 dark:text-white
 "
          >
            {selectedCourse.title}
          </h1>

          <p
            className="
 mt-3
 max-w-2xl

 text-sm md:text-base
 leading-relaxed

 text-gray-500
 dark:text-gray-400
 "
          >
            {selectedCourse.description}
          </p>

          {/* stats */}

          <div
            className="
 flex flex-wrap gap-4
 mt-6
 "
          >
            <div
              className="
 flex items-center gap-2
 text-xs

 text-gray-500
 dark:text-gray-400
 "
            >
              <FaLayerGroup />
              {selectedCourse.modules.length} Modules
            </div>

            <div
              className="
                flex items-center gap-2
                text-xs

                text-gray-500
                dark:text-gray-400
                "
            >
              <FaBookOpen />
              Learning Path
            </div>
          </div>
        </div>
      </section>

      {/* MODULE SECTION */}

      <section>
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Course Modules
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Follow these lessons step by step to complete the course.
            </p>
          </div>
          {isAdmin && (
            <button
              onClick={() => setOpenCreateModal(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#16423C] hover:bg-[#1d6158] text-white font-semibold text-xs transition shadow-sm animate-fade-in"
            >
              <FaPlus size={12} /> Add Module
            </button>
          )}
        </div>

        <div className="space-y-4">
          {selectedCourse.modules?.length ? (
            selectedCourse.modules.map((module, index) => (
              <ModuleCard
                key={module.id}
                module={module}
                index={index}
                courseId={selectedCourse.id}
                quizAvailable={hasQuizForModule(module.id)}
                isAdmin={isAdmin}
                isActive={selectedModuleId === module.id}
                isCompleted={completedModuleIds.includes(module.id)}
                onSelect={() => setSelectedModuleId(module.id)}
                onEdit={() => handleEditModule(module)}
                onDelete={() => handleDeleteModule(module)}
                onManageQuiz={() => handleManageQuiz(module)}
                onDeleteQuiz={() => handleDeleteQuiz(module.id)}
              />
            ))
          ) : (
            <EmptyModulesState
              title={isAdmin ? "No modules yet" : "No modules available"}
              description={
                isAdmin
                  ? "This course doesn't have any modules. Start building your learning content."
                  : "This course doesn't have any modules yet. Please check back later."
              }
              actionText="Create Module"
              onAction={() => setOpenCreateModal(true)}
            />
          )}
        </div>
      </section>

      {isAdmin && (
        <Modal
          open={openCreateModal}
          onClose={() => setOpenCreateModal(false)}
        >
          <CreateModules
            courseId={selectedCourse?.id}
            onSuccess={() => {
              setOpenCreateModal(false);
              fetchCourseById(selectedCourse.id);
            }}
          />
        </Modal>
      )}

      {isAdmin && (
        <EditModuleDrawer
          open={openEditDrawer}
          onClose={() => setOpenEditDrawer(false)}
          courseId={selectedCourse.id}
          module={editingModule}
          onSuccess={() => {
            fetchCourseById(selectedCourse.id);
          }}
        />
      )}
    </div>
  );
}
