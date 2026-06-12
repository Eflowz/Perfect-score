import { FaArrowRight, FaCheck } from "react-icons/fa";

export default function Hero(){
return(<div className=" bg-[#f9f1ff] dark:bg-[#0f172a] p-5 md:p-15  ">
<div className="flex flex-col lg:flex-row gap-20 mb-20 mt-20">
    <div className="flex flex-col md:mb-0 gap-10 md:gap-15 md:flex-1">
        <div className="flex items-center gap-2 px-6 w-fit rounded-full bg-[#5300b7]/10 dark:bg-[#d3bbff]/10 border border-[#5300b7]/20">
            <p className="w-2 h-2 bg-[#5300b7] rounded-full dark:bg-[#d3bbff]"></p>
            <p className="text-[#5300b7] dark:text-[#d3bbff]  font-semibold whitespace-nowrap">Next Enrollment: Starts Today</p>
        </div>
        <div className=" flex gap-7 md:gap-10 flex-col">
            <h1 className="text-3xl md:text-5xl text-black head font-bold tracking-wide dark:text-white">Master New Skills with <span className="text-[#5300b7] dark:text-[#d3bbff]">Industry-Recognized </span> Certifications</h1>
            <p className="text-gray-700 dark:text-gray-300  tracking-wide leading-7  text-lg md:text-xl">Learn from experts, take assessments at your own pace, and earn verified certificates that boost your career journey in the digital economy.</p>
        </div> 
        <div className="flex flex-col md:flex-row gap-4">
            <div className="flex items-center gap-4 shadow-b-lg whitespace-nowrap flex-gap-2 text-white dark:text-[#381e72] w-fit rounded-4xl bg-[#5300b7] dark:bg-[#d3bbff] dark:shadow-[#d3bbff]/25 dark:shadow-lg  font-semibold px-8 py-4">
                <button className="text-lg cursor-pointer">Start Learning</button>
                <FaArrowRight />
            </div>
            <div className="flex items-center gap-4 flex-gap-2 whitespace-nowrap  w-fit rounded-4xl text-[#5300b7] border-2 border-[#5300b7]/20 dark:border-[#d3bbff]/20 dark:text-[#d3bbff] bg-inherit  font-semibold px-12 py-4">
                <button>Browse Courses</button>
             
            </div>
        </div>
    </div>

    <div className="relative md:flex-1 ">
        <img src="/images/group-1.avif" alt="" className="rounded-2xl lg:rounded-4xl h-[350px] md:h-[500px] lg:h-[550px] w-full object-cover" />
        <div className="absolute bottom-4  z-0 flex gap-2 items-center right-4  left-4 bg-white/90 dark:bg-[#1b2337]/90 dark:border dark:border-white/10 p-5 rounded-2xl">
            <div className="w-12 h-12 mb-4 rounded-xl text-2xl bg-[#006c49]/10 dark:bg-[#4edea3]/20 flex items-center justify-center text-[#006c49] dark:text-[#4edea3]"><FaCheck /></div>
            <div >
                 
                <p className="font-semibold text-gray-800 text-lg dark:text-white">Verified Certificates</p>
                <p className="dark:text-[#cac4cf] text-gray-800 text-sm md:text-md">Endorsed by top universities & companies</p>
    
            </div>
        </div>
    </div>
</div>






</div>)
}
