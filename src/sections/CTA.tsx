import { Link } from "react-router-dom";

const CTA = () => {
    return ( <div className="bg-[#f9f1ff] dark:bg-[#060e20]   p-5 md:p-15">
    <div className="flex justify-center shadow bg-[#f3ebf9] dark:bg-[#272f43]  p-5 md:p-10 rounded-4xl items-center gap-5 md:gap-10 flex-col">
        <h1 className="text-4xl text-gray-900 md:text-6xl head dark:text-white font-semibold text-center">Ready to Advance Your Career?</h1>
        <p className="text-lg lg:w-[50%] dark:text-[#cac4cf] text-gray-700 md:text-xl text-center">Join thousands of learners today and get access to high-quality education and globally recognized certifications.</p>
        <div>
            <div className="flex cursor-pointer items-center gap-4 shadow-b-lg flex-gap-2 text-white w-fit rounded-4xl bg-[#5300b7] font-semibold px-8 py-4 md:py-4 dark:text-[#381e72] dark:bg-[#d3bbff]"><Link to="/register" >Sign Up Now</Link></div>
           
        </div>
    </div>
    </div> );
}
 
export default CTA;