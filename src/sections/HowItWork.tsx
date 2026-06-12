const HowItWork = () => {
    return ( <div id='HowItWork' className="bg-[#f9f1ff] dark:bg-[#131b2e] mt-10 p-5 md:p-15">
    <div className=" flex flex-col md:flex-row mb-10 gap-5 md:mb-20">
    <div className="flex gap-4 flex-col">
        <h2 className="text-3xl lg:text-4xl font-semibold text-gray-900 dark:text-white">Your Path to <span className="text-[#6D28D9] dark:text-[#d3bbff]">Success</span></h2>
        <p className="text-gray-700 text-lg lg:text-xl dark:text-[#cac4cf]">We've streamlined the learning journey to make career advancement as efficient as possible</p>
    </div>
    <hr className="text-gray-200 dark:text-gray-800"/>
    
</div>


<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8 lg:flex-row ">

   <div className="flex flex-col gap-3 md:gap-6">
    <div className="flex justify-center items-center bg-[#6D28D9]   dark:bg-[#d3bbff]  w-12 h-12 lg:w-15 lg:h-15 rounded-full">
        <p className=" text-white dark:text-[#381e72]  font-bold text-lg lg:text-xl">1</p>
    </div>
    
    <div className="flex flex-col gap-2 md:gap-4">
        <p className="text-2xl lg:text-3xl text-gray-900 font-semibold tracking-normal dark:text-white">Choose a course</p>
        <p className="text-gray-700  text-md lg:text-lg dark:text-[#cac4cf]">Browse our catalog of 500+ specialized tracks curated for modern industries.</p>
    </div>
   </div> 

   <div className="flex flex-col gap-3 md:gap-6">
  <div className="flex justify-center items-center bg-[#6D28D9] dark:bg-[#d3bbff]  w-12 h-12 lg:w-15 lg:h-15 rounded-full">
        <p className=" text-white dark:text-[#381e72] font-bold text-lg lg:text-xl">2</p>
    </div>
    <div className="flex flex-col gap-2 md:gap-4">
        <p className="text-2xl lg:text-3xl text-gray-900 font-semibold tracking-normal dark:text-white">Learn and complete</p>
        <p className="text-gray-700 text-md lg:text-lg dark:text-[#cac4cf]">Dive into high-quality video lessons, interactive labs, and practical assignments.

</p>
    </div>
   </div> 

   <div className="flex flex-col gap-3 md:gap-6">
   <div className="flex justify-center items-center bg-[#6D28D9] dark:bg-[#d3bbff]  w-12 h-12 lg:w-15 lg:h-15 rounded-full">
        <p className=" text-white font-bold dark:text-[#381e72] text-lg lg:text-xl">3</p>
    </div>
    <div className="flex flex-col gap-2 md:gap-4">
        <p className="text-2xl lg:text-3xl text-gray-900 font-semibold tracking-normal dark:text-white">Take the exam</p>
        <p className="text-gray-700 text-md lg:text-lg dark:text-[#cac4cf]">Schedule your assessment when you feel ready. Proctored and secure.</p>
    </div>
   </div> 

   <div className="flex flex-col gap-3 md:gap-6">
   <div className="flex justify-center items-center bg-[#6D28D9] dark:bg-[#d3bbff]  w-12 h-12 lg:w-15 lg:h-15 rounded-full">
        <p className=" text-white font-bold text-lg lg:text-xl dark:text-[#381e72]">4</p>
    </div>
    <div className="flex flex-col gap-2 md:gap-4">
        <p className="text-2xl lg:text-3xl text-gray-900 font-semibold tracking-normal dark:text-white">Get certified</p>
        <p className="text-gray-700 text-md lg:text-lg dark:text-[#cac4cf]">Download your verified digital credentials and share them with your network.</p>
    </div>
   </div> 
</div>
    </div> );
}
 
export default HowItWork;