import Skeleton from "../common/Skeleton";

export default function CourseCardSkeleton() {
 return (
 <div className="border rounded-xl p-5 space-y-4">

 <Skeleton className="h-6 w-3/4" />

 <Skeleton className="h-4 w-full" />
 <Skeleton className="h-4 w-5/6" />

 <div className="flex justify-between items-center mt-4">

 <Skeleton className="h-4 w-16" />

 <Skeleton className="h-8 w-24" />

 </div>

 </div>
 );
}