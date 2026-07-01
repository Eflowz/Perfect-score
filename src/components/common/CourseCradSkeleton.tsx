const CourseCardSkeleton = () => {
 return (
 <div
 className="
 relative overflow-hidden

 bg-white
 dark:bg-[hashtag#0F2C28]

 border
 border-gray-200/80
 dark:border-white/5

 rounded-2xl

 p-5

 shadow-sm

 h-64

 animate-pulse
 "
 >


 {/* Top Header */}

 <div className="
 flex
 items-start
 justify-between
 gap-4
 ">


 {/* Icon */}

 <div
 className="
 w-11
 h-11

 rounded-xl

 bg-gray-200
 dark:bg-white/10
 "
 />



 {/* Category badge */}

 <div
 className="
 w-20
 h-5

 rounded-full

 bg-gray-200
 dark:bg-white/10
 "
 />


 </div>






 {/* Content */}

 <div className="mt-5 space-y-3">


 {/* Title */}

 <div
 className="
 h-5
 w-3/4

 rounded-lg

 bg-gray-200
 dark:bg-white/10
 "
 />



 {/* Description */}

 <div className="space-y-2">


 <div
 className="
 h-3
 w-full

 rounded

 bg-gray-200
 dark:bg-white/10
 "
 />


 <div
 className="
 h-3
 w-5/6

 rounded

 bg-gray-200
 dark:bg-white/10
 "
 />


 </div>


 </div>







 {/* Footer */}

 <div
 className="
 absolute
 bottom-5
 left-5
 right-5

 border-t
 border-gray-100
 dark:border-white/5

 pt-4

 flex
 items-center
 justify-between
 "
 >


 {/* Module count */}

 <div className="space-y-2">


 <div
 className="
 h-2
 w-16

 rounded

 bg-gray-200
 dark:bg-white/10
 "
 />


 <div
 className="
 h-4
 w-20

 rounded

 bg-gray-200
 dark:bg-white/10
 "
 />


 </div>






 {/* Button */}

 <div
 className="
 h-9
 w-28

 rounded-xl

 bg-gray-200
 dark:bg-white/10
 "
 />


 </div>


 </div>
 );
};


export default CourseCardSkeleton;