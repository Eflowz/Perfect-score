const Rating = () => {
    return ( <>
    <div className=" max-w-7xl mx-auto py-10 dark:bg-[#060e20]  ">
<div className="grid grid-cols-2 gap-5 bg-white dark:bg-[#060e20] dark:border-y dark:border-white/5 py-2xl  md:grid-cols-4 px-10 md:py-20">

<div className="text-center flex flex-col gap-2">

        <p className="text-[#5300b7] dark:text-[#d3bbff] text-center font-bold text-4xl md:text-5xl">100K+</p>
        
    <p className="text-[#4a4455] dark:text-[#cac4cf] text-center font-semibold md:text-lg">Active Learners</p>
</div>
<div className="flex flex-col gap-2">

        <p className="text-[#5300b7] dark:text-[#d3bbff] text-center font-bold text-4xl md:text-5xl">500+</p>
        
    <p className="text-[#4a4455] dark:text-[#cac4cf] text-center  font-semibold md:text-lg">Expert Courses</p>
</div>
<div className="flex flex-col gap-2"> 
    
        <p className="text-[#5300b7] dark:text-[#d3bbff] text-center  font-bold text-4xl md:text-5xl">250K+</p>
      
    <p className="text-[#4a4455] dark:text-[#cac4cf] text-center font-semibold md:text-lg">Certs Issued</p>
</div>
<div className="flex flex-col gap-2">
  
        <p className="text-[#5300b7] dark:text-[#d3bbff] text-center font-bold text-4xl md:text-5xl">98%</p>
    <p className="text-[#4a4455] dark:text-[#cac4cf] text-center font-semibold md:text-lg">Exam Pass Rate</p>
</div>
</div>
</div>
    </> );
}
 
export default Rating;