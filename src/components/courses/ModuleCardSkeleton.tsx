import Skeleton from "../common/Skeleton";

export default function ModuleCardSkeleton() {
 return (
 <div className="border rounded-lg p-4 space-y-3">

 <div className="flex items-center gap-3">

 <Skeleton className="w-6 h-6 rounded-full" />

 <Skeleton className="h-4 w-40" />

 </div>

 <Skeleton className="h-3 w-full" />
 <Skeleton className="h-3 w-5/6" />

 </div>
 );
}