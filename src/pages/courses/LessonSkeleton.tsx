const LessonSkeleton = () => {
 return (
 <div className="
w-full
 flex
 space-y-6
 animate-pulse
 ">







 {/* Main Lesson Content */}
 <div className="
 bg-white
 dark:bg-[#0F2C28]
 border
 border-gray-200
 dark:border-white/10
 rounded-3xl
 p-6
 w-[50%]
 space-y-5
 ">


 <div className="
 h-6
 w-1/3
 rounded-lg
 bg-gray-200
 dark:bg-white/10
 "/>


 {/* Content blocks */}
 <div className="space-y-4">

 <div className="
 h-20
 rounded-2xl
 bg-gray-100
 dark:bg-white/5
 "/>


 <div className="
 h-20
 rounded-2xl
 bg-gray-100
 dark:bg-white/5
 "/>


 <div className="
 h-32
 rounded-2xl
 bg-gray-100
 dark:bg-white/5
 "/>


 </div>


 </div>







 {/* Terminal Section */}
 <div className="
 overflow-hidden
 rounded-3xl
 border
 w-[50%]
 border-gray-200
 dark:border-white/10
 bg-[#111827]
 p-5
 space-y-4
 ">


 {/* Terminal header */}
 <div className="
 flex
 items-center
 gap-2
 ">

 <div className="
 w-3
 h-3
 rounded-full
 bg-white/20
 "/>

 <div className="
 w-3
 h-3
 rounded-full
 bg-white/20
 "/>

 <div className="
 w-3
 h-3
 rounded-full
 bg-white/20
 "/>

 <div className="
 ml-3
 h-4
 w-32
 rounded
 bg-white/10
 "/>

 </div>




 {/* Terminal lines */}
 <div className="space-y-3">


 <div className="
 h-4
 w-4/5
 rounded
 bg-white/10
 "/>


 <div className="
 h-4
 w-3/5
 rounded
 bg-white/10
 "/>


 <div className="
 h-4
 w-full
 rounded
 bg-white/10
 "/>


 <div className="
 h-4
 w-2/3
 rounded
 bg-white/10
 "/>


 <div className="
 h-4
 w-1/2
 rounded
 bg-white/10
 "/>


 </div>


 </div>



 </div>
 );
};


export default LessonSkeleton;