import { BsLightningChargeFill } from "react-icons/bs";
import { IoIosPeople, IoMdTime } from "react-icons/io";
import { IoNewspaper } from "react-icons/io5";
import { TfiMedall } from "react-icons/tfi";
import { FiArrowUpRight,FiCpu } from "react-icons/fi"; 

const Features = () => {
  return (
    <div className="bg-[#16423C] p-6 md:p-16" id="features">
      <div className="mb-12 flex justify-center items-center flex-col text-center">
        <p className="text-gray-100 text-base md:text-lg max-w-2xl dark:text-gray-100">
          Access a premium suite of learning tools designed to help you master new domains quickly and effectively.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">        
        <div className="group bg-white dark:bg-slate-800/40 border border-gray-100 dark:border-slate-700/30 rounded-3xl p-8 shadow-xs flex flex-col justify-between duration-300 hover:-translate-y-1 hover:shadow-md">
          <div>
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 rounded-2xl text-2xl bg-[#16423C]/10 dark:bg-[#16423C]/20 text-[#16423C] dark:text-[#a9f5a8] flex items-center justify-center">
                <IoIosPeople />
              </div>
              <FiArrowUpRight className="text-gray-400 opacity-0 group-hover:opacity-100  dark:group-hover:text-[#a9f5a8] transition-all text-xl" />
            </div>
            <h3 className="text-xl font-bold dark:text-white text-gray-900 mb-3">Expert-led courses</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
              Learn directly from industry veterans and academic leaders who bring real-world experience into every lesson.
            </p>
          </div>
        </div>

        {/* Card 2: Self-paced learning */}
        <div className="group bg-white dark:bg-slate-800/40 border border-gray-100 dark:border-slate-700/30 rounded-3xl p-8 shadow-xs flex flex-col justify-between duration-300 hover:-translate-y-1 hover:shadow-md">
          <div>
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 rounded-2xl text-xl bg-[#16423C]/10 dark:bg-[#16423C]/20  dark:text-[#a9f5a8] flex items-center justify-center">
                <IoMdTime />
              </div>
              <FiArrowUpRight className="text-gray-400 opacity-0 group-hover:opacity-100  dark:group-hover:text-[#a9f5a8] transition-all text-xl" />
            </div>
            <h3 className="text-xl font-bold dark:text-white text-gray-900 mb-3">Self-paced learning</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
              Life is busy. Study whenever and wherever it suits you, without any fixed deadlines or rigid attendance blocks.
            </p>
          </div>
        </div>

        {/* Card 3: Online assessments */}
        <div className="group bg-white dark:bg-slate-800/40 border border-gray-100 dark:border-slate-700/30 rounded-3xl p-8 shadow-xs flex flex-col justify-between duration-300 hover:-translate-y-1 hover:shadow-md">
          <div>
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 rounded-2xl text-xl bg-[#16423C]/10 dark:bg-[#16423C]/20  dark:text-[#a9f5a8] flex items-center justify-center">
                <IoNewspaper />
              </div>
              <FiArrowUpRight className="text-gray-400 opacity-0 group-hover:opacity-100  dark:group-hover:text-[#a9f5a8] transition-all text-xl" />
            </div>
            <h3 className="text-xl font-bold dark:text-white text-gray-900 mb-3">Online assessments</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
              Validate your knowledge with rigorous, comprehensive exams designed to test deep situational understanding.
            </p>
          </div>
        </div>

        {/* Card 4: Instant results */}
        <div className="group bg-white dark:bg-slate-800/40 border border-gray-100 dark:border-slate-700/30 rounded-3xl p-8 shadow-xs flex flex-col justify-between duration-300 hover:-translate-y-1 hover:shadow-md">
          <div>
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 rounded-2xl text-xl bg-[#16423C]/10 dark:bg-[#16423C]/20  dark:text-[#a9f5a8] flex items-center justify-center">
                <BsLightningChargeFill />
              </div>
              <FiArrowUpRight className="text-gray-400 opacity-0 group-hover:opacity-100  dark:group-hover:text-[#a9f5a8] transition-all text-xl" />
            </div>
            <h3 className="text-xl font-bold dark:text-white text-gray-900 mb-3">Instant results</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
              Get graded immediately. No more waiting days to find out how you performed on your certification exam.
            </p>
          </div>
        </div>

        {/* Card 5: Global Recognition */}
        <div className="group bg-white dark:bg-slate-800/40 border border-gray-100 dark:border-slate-700/30 rounded-3xl p-8 shadow-xs flex flex-col justify-between duration-300 hover:-translate-y-1 hover:shadow-md">
          <div>
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 rounded-2xl text-xl bg-[#16423C]/10 dark:bg-[#16423C]/20 text-[#16423C] dark:text-[#a9f5a8] flex items-center justify-center">
                <TfiMedall />
              </div>
              <FiArrowUpRight className="text-gray-400 opacity-0 group-hover:opacity-100  dark:group-hover:text-[#a9f5a8] transition-all text-xl" />
            </div>
            <h3 className="text-xl font-bold dark:text-white text-gray-900 mb-3">Global Recognition</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
              Our certificates are recognized by leading Fortune 500 companies and global engineering tech firms.
            </p>
          </div>
        </div>

       {/* Card 6: Future-Proof Skills */}
        <div className="group bg-white dark:bg-slate-800/40 border border-gray-100 dark:border-slate-700/30 rounded-3xl p-8 shadow-xs flex flex-col justify-between duration-300 hover:-translate-y-1 hover:shadow-md">
        <div>
            <div className="flex justify-between items-start mb-6">
            <div className="w-12 h-12 rounded-2xl text-xl bg-[#16423C]/10 dark:bg-[#16423C]/20 text-[#16423C] dark:text-[#a9f5a8] flex items-center justify-center">
                <FiCpu />
            </div>
            <FiArrowUpRight className="text-gray-400 opacity-0 group-hover:opacity-100 dark:group-hover:text-[#a9f5a8] transition-all text-xl" />
            </div>
            <h3 className="text-xl font-bold dark:text-white text-gray-900 mb-3">Future-Proof Skills</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
            Stay ahead of the curve with curriculum updated weekly to cover cutting-edge AI integrations, cloud architecture, and modern tech stacks.
            </p>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Features;