import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaBookOpen, FaLayerGroup } from "react-icons/fa";

import { useCourse } from "../../context/course/useCourse";
import ModuleCard from "../../components/courses/ModuleCard";
import ModuleCardSkeleton from "../../components/courses/ModuleCardSkeleton";
import Skeleton from "../../components/common/Skeleton";
import EmptyModulesState from "../../components/courses/EmptyModulesState";
import { useAuth } from "../../context/auth/useAuth";
import Modal from "../../components/common/Modal";
import CreateModules from "../admin/CreateModules";



export default function CourseDetails() {
  const { id } = useParams();
  const params=useParams()
 
  console.log("course-id:", params)
  console.log("params ID:", id); // 👈 PUT IT HERE
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const {user}= useAuth()
  
const isAdmin= user?.role === "SUPER_ADMIN"
  const { selectedCourse, fetchCourseById, loading } = useCourse();

useEffect(() => {
    if (id) {
      fetchCourseById(id);
    }
    console.log("Fetching course details for ID:", id);
  }, [id]);

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
        <div className="mb-5">
          <h2
            className="
            text-xl
            font-bold

            text-gray-900
            dark:text-white
            "
          >
            Course Modules
          </h2>

          <p
            className="
            text-sm
            text-gray-500
            dark:text-gray-400
            mt-1
            "
          >
            Follow these lessons step by step to complete the course.
          </p>
        </div>

        <div className="space-y-4">
          {selectedCourse.modules?.length ? (
            selectedCourse.modules.map((module, index) => (
              <ModuleCard
                key={module.id}
                module={module}
                index={index}
                courseId={selectedCourse.id}
              />
            ))
          ) : (
            <EmptyModulesState
            title={isAdmin ? "No modules yet" :"No modules available"}
            description={isAdmin ? "This cpourse doesn't have any modules. Start building and learning content.": "This course doesn't have any modules yet. Plesase check back later."}
           actionText="Create Modules"
            onAction={() => setOpenCreateModal(true)}
            >
              
            </EmptyModulesState>

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
    </div>
  );
}
