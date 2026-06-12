import { BsLightningChargeFill } from "react-icons/bs";
import { IoIosPeople, IoMdTime } from "react-icons/io";
import { IoNewspaper } from "react-icons/io5";
import { TfiMedall } from "react-icons/tfi";

const Features = () => {
    return ( <div className="bg-[#fef7ff] dark:bg-[#0f172a] p-5 md:p-15 " id="features">
    <div className="mb-20 flex justify-center items-center flex-col"> 
        <h2 className="text-3xl mb-2 md:mb-4 lg:text-4xl font-semibold text-gray-900 dark:text-white">Everything you need to <span className="text-[#6D28D9] underline dark:text-[#d3bbff]">Succeed</span></h2>
        <p className="text-gray-600 text-lg text-start md:text-center md:w-[50%] lg:text-xl dark:text-[#cac4cf] ">Access a premium suite of learning tools designed to help you master new domains quickly and effectively.</p>
    </div>
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-5 lg:flex-row">
        <div className="bg-white dark:card-border shadow dark:bg-[#1b2337] text-black rounded-3xl md:p-5 p-5 shadow  flex flex-col md:flex-row duration-300 hover:translate-y-[-4px] ">
            <div className="flex md:pl-10 items-center md:items-start mb-10 flex-col md:justify-center">
                <div className="w-12 h-12 rounded-xl mb-4 text-2xl bg-[#5300b7]/10 dark:bg-[#d3bbff]/10 dark:text-[#d3bbff] flex items-center justify-center text-[#5300b7]"><IoIosPeople /></div>
                <h3 className="text-2xl md:text-3xl mb-4 font-semibold dark:text-white bg-gray-900">Expert-led courses</h3>
                <p className=" text-center md:text-start  text-lg text-gray-700 dark:text-[#cac4cf]">Learn directly from industry veterans and academic leaders who bring real-world experience into every lesson.</p>
            </div>
            <div className="md:w-[100%] lg:w-[70%]"><img className="md:h-[200px] h-[250px] md:flex-1 rounded-2xl w-full object-cover dark:bg-[#0b1236]" src="/images/lap-1.png" alt="" /></div>
        </div>
        <div className="bg-[#5300b7]  text-white rounded-3xl p-5 md:p-10 shadow flex flex-col duration-300 hover:translate-y-[-4px] ">
            <div className="w-12 h-12   rounded-2xl mb-4 text-xl bg-white/20 flex items-center justify-center text-white"><IoMdTime /></div>
            <h3 className="text-2xl md:text-3xl dark:text-white mb-4 font-semibold text-black">Self-paced learning</h3>
            <p className=" text-lg text-gray-300 ">Life is busy. Study whenever and wherever it suits you, without any fixed deadlines.</p>
        </div>
        </div>  
      <div  className="flex flex-col lg:flex-row gap-4">

        <div className="bg-white dark:bg-[#1b2337]  text-black rounded-3xl p-5 md:p-10 shadow  flex flex-col duration-300 hover:translate-y-[-4px]   ">
            <div className="w-12 h-12 mb-4 text-2xl  rounded-xl bg-[#5d3900]/10 flex items-center justify-center text-[#5d3900] dark:bg-[ffb95f]/20 dark:text-[#ffb95f]"><IoNewspaper /></div>
            <h3 className="text-2xl dark:text-white text-black md:text-3xl mb-4 font-semibold">Online assessments</h3>
            <p className=" text-lg text-gray-700 dark:text-[#cac4cf]">Validate your knowledge with rigorous, comprehensive exams designed to test deep understanding.</p>
        </div>
        <div className="bg-white dark:bg-[#1b2337] text-black rounded-3xl p-5 md:p-10 shadow  flex flex-col duration-300 hover:translate-y-[-4px] ">
            <div className="w-12 h-12 mb-4 rounded-xl text-2xl bg-[#006c49]/10 dark:bg-[#4edea3]/20  dark:text-[#4edea3] flex items-center justify-center text-[#006c49]"><BsLightningChargeFill /></div>
            <h3 className="text-2xl dark:text-white text-black md:text-3xl mb-4 font-semibold">Instant results</h3>
            <p className=" text-lg text-gray-700 dark:text-[#cac4cf]">Get graded immediately. No more waiting days to find out how you performed on your certification exam.</p>
        </div>
        <div className="bg-white dark:text-white dark:bg-[#1b2337] text-black rounded-3xl p-5 md:p-10 shadow  flex flex-col duration-300 hover:translate-y-[-4px] ">
            <div className="w-12 mb-4 h-12 rounded-xl text-2xl bg-[#5300b7]/10 dark:bg-[#d3bbff]/20 dark:text-[#d3bbff] flex items-center justify-center text-[#5300b7]"><TfiMedall /></div>
            <h3 className="text-2xl md:text-3xl mb-4 font-semibold">Global Recognition</h3>
            <p className=" text-lg text-gray-700 dark:text-[#cac4cf]">Our certificates are recognized by leading Fortune 500 companies and global tech firms.</p>
        </div>
      </div>
    </div>
    </div> );
}
 
export default Features;