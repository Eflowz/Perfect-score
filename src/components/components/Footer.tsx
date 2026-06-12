const Fotter = () => {
    return ( <>
    <footer className="bg-white dark:bg-[#060e20] p-5 md:p-15">
 <div className="max-w-7xl mx-auto  ">
 <div className="flex flex-col md:flex-row justify-between gap-8">
 
 {/* Brand */}
 <div>
 <h2 className="text-2xl font-bold text-black dark:text-white">Perfect Score</h2>
 <p className="mt-2 text-gray-700 max-w-sm dark:text-[#cac4cf]">
 Learn in-demand skills, take assessments, and achieve your academic and career goals.
 </p>
 </div>

 {/* Quick Links */}
 <div>
 <h3 className="font-semibold mb-3 text-black dark:text-white ">Quick Links</h3>
 <ul className="space-y-2 text-gray-700 dark:text-[#cac4cf]">
 <li><a href="#features">   Features</a></li>
 <li><a href="#courses">Courses</a></li>
 <li><a href="#HowItWork">HowItWorks</a></li>
 <li><a href="#FAQ">FAQ</a></li>
 <li><a href="#Testimonial">Testimonial</a></li>
 </ul>
 </div>

 {/* Courses */}
 <div>
 <h3 className="font-semibold mb-3 text-black dark:text-white ">Courses</h3>
 <ul className="space-y-2 text-gray-700 dark:text-[#cac4cf]">
 <li>Python</li>
 <li>DevOps</li>
 <li>Data Analysis</li>
 <li>Cloud Computing</li>
 <li>Software Engineering</li>
 
 </ul>
 </div>
 </div>

 {/* Bottom Bar */}
 <div className="border-t border-gray-300 dark:text-[#cac4cf] dark:border-[#514e53] mt-8 pt-6 text-center text-gray-500 text-sm">
 © {new Date().getFullYear()} Perfect Score. All rights reserved.
 </div>
 </div>
</footer>
    </> );
}
 
export default Fotter;